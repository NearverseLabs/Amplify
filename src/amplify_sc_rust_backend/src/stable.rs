use std::collections::BTreeMap;

use candid::{CandidType, Principal};
use ic_cdk::trap;
use ic_ledger_types::Tokens;
use serde::{Deserialize, Serialize};
use crate::transfer::{deposit_icp, withdraw_icp};

use crate::types::*;
use crate::utils::caller;

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct StableState {
    pub owner: Option<Principal>,
    pub service_account: Option<Principal>,
    pub total_users: u64,
    pub total_campaigns: u64,
    pub ledger: Option<Principal>,
    pub users: BTreeMap<Principal, Users>,
    pub usernames: BTreeMap<String, Principal>,
    pub taggr_usernames: BTreeMap<String, Principal>,
    pub campaigns: BTreeMap<u64, Campaign>,
    pub whitelisted_tokens: BTreeMap<Principal, WhiteListedToken>,
    pub settings: Settings,
}

impl Default for StableState {
    fn default() -> Self {
        StableState {
            owner: Default::default(),
            service_account: Default::default(),
            total_users: Default::default(),
            total_campaigns: Default::default(),
            usernames: Default::default(),
            taggr_usernames: Default::default(),
            ledger: Default::default(),
            users: BTreeMap::new(),
            campaigns: BTreeMap::new(),
            whitelisted_tokens: BTreeMap::new(),
            settings: Settings {
                platform_fee_owner: Principal::anonymous(),
                platform_fees: Default::default(),
                min_winners: Default::default(),
                max_winners: Default::default(),
            },
        }
    }
}

impl From<StateStorage> for StableState {
    fn from(input: StateStorage) -> StableState {
        StableState {
            owner: input.owner,
            service_account: input.service_account,
            total_users: input.total_users,
            total_campaigns: input.total_campaigns,
            usernames: input.usernames,
            taggr_usernames: input.taggr_usernames,
            ledger: input.ledger,
            users: input.users,
            campaigns: input.campaigns,
            whitelisted_tokens: input.whitelisted_tokens,
            settings: input.settings,
        }
    }
}

impl StableState {
    pub fn create_campaign(&mut self, args: CreateCampaignArgs) -> CampaignResult {
        let token = self.whitelisted_tokens.get(&args.reward_token);
        if token.is_none() {
            return CampaignResult::Err("Reward token is not whitelisted.".to_string());
        }
        let campaign_id_number = self.total_campaigns.clone() + 1;
        let campaign_id = campaign_id_number;
        if self.campaigns.contains_key(&campaign_id) {
            return CampaignResult::Err("Campaign ID conflict. Try again.".to_string());
        }

        let settings = self.settings.clone();
        if args.reward < Tokens::from_e8s(token.unwrap().min_reward) {
            return CampaignResult::Err("Reward amount is below the minimum allowed.".to_string());
        }
        if args.winners < settings.min_winners {
            return CampaignResult::Err("Number of winners is below the minimum allowed.".to_string());
        }
        if args.winners > settings.max_winners && settings.max_winners > 0 {
            return CampaignResult::Err("Number of winners is above the maximum allowed.".to_string());
        }

        let campaign = Campaign {
            requirements: args.requirements,
            reward: args.reward,
            reward_token: args.reward_token,
            winners: args.winners,
            campaign_id: campaign_id.clone(),
            project_name: args.project_name,
            platform: args.platform,
            starts_at: args.starts_at,
            ends_at: args.ends_at,
            user_id: args.user_id,

            join_group: args.join_group,
            join_community: args.join_community,
            active_in_community_time: args.active_in_community_time,
            messages_in_community: args.messages_in_community,
            active_in_group_time: args.active_in_group_time,
            messages_in_group: args.messages_in_group,

            total_withdrawn: 0,
            is_verified: false,
            is_deposited: false,
            participants: BTreeMap::new(),
            selected_winners: BTreeMap::new(),
        };
        self.campaigns.insert(campaign_id.clone(), campaign);
        self.total_campaigns = campaign_id_number;
        CampaignResult::Ok(campaign_id.clone())
    }
    pub async fn deposit_campaign(&mut self, campaign_id: u64) -> CommonResult {
        let caller = caller().unwrap_or_else(|e| trap(&e));
        if let Some(campaign) = self.campaigns.get_mut(&campaign_id) {
            if !self.users.contains_key(&caller) {
                return CommonResult::Err("You are not registered.".to_string());
            }
            if campaign.user_id == caller {
                return CommonResult::Err("You are not the owner.".to_string());
            }
            //
            let transfer_amount = Tokens::from_e8s(campaign.reward.e8s() * campaign.winners);
            let result = deposit_icp(campaign.reward_token, transfer_amount, campaign.winners).await;

            return match result {
                Ok(value) => {
                    if !value {
                        return CommonResult::Err("Transfer Failed".to_string());
                    }
                    campaign.is_deposited = true;
                    CommonResult::Ok(true)
                }
                Err(e) => CommonResult::Err(e)
            };
        } else {
            CommonResult::Err("Campaign not found.".to_string())
        }
    }

    pub fn submit_participate_in_campaign(&mut self, campaign_id: u64) -> CommonResult {
        let current_time = ic_cdk::api::time();
        let caller = caller().unwrap_or_else(|e| trap(&e));
        if let Some(campaign) = self.campaigns.get_mut(&campaign_id) {
            if current_time < campaign.starts_at {
                return CommonResult::Err("The campaign has not started yet.".to_string());
            }

            // Check if the campaign has ended
            if current_time > campaign.ends_at {
                return CommonResult::Err("The campaign has already ended.".to_string());
            }
            if campaign.participants.contains_key(&caller) {
                return CommonResult::Err("You have already participated.".to_string());
            }
            if !self.users.contains_key(&caller) {
                return CommonResult::Err("You are not registered.".to_string());
            }

            campaign.participants.insert(caller, Participant {
                user_id: caller,
                is_verified: false,
                reward_claimed: false
            });
            CommonResult::Ok(true)
        } else {
            CommonResult::Err("Campaign not found.".to_string())
        }
    }

    pub fn register_user(&mut self, args: Users) -> CommonResult {
        // match self.check_if_service_account() {
        //     CommonResult::Err(e) => return CommonResult::Err(e),
        //     _ => {},
        // }
        if self.users.contains_key(&args.id) {
            return CommonResult::Err("User already registered.".to_string());
        }
        if(args.openchat_principal.is_some()) {
            let username = args.openchat_principal.clone().unwrap();
            if self.usernames.contains_key(&username.clone()) {
                return CommonResult::Err("OC Username already registered.".to_string());
            }
            self.usernames.insert(username.clone(), args.id);
        }
        if(args.taggr_principal.is_some()) {
            let username = args.taggr_principal.clone().unwrap();
            if self.taggr_usernames.contains_key(&username.clone()) {
                return CommonResult::Err("Taggr Username already registered.".to_string());
            }
            self.taggr_usernames.insert(username.clone(), args.id);
        }

        self.users.insert(args.id, args);
        self.total_users = self.total_users.clone() + 1;
        CommonResult::Ok(true)
    }
    pub fn update_user(&mut self, args: Users) -> CommonResult {
        // match self.check_if_service_account() {
        //     CommonResult::Err(e) => return CommonResult::Err(e),
        //     _ => {},
        // }
        if self.users.contains_key(&args.id.clone()) {
            if let Some(user) = self.users.get_mut(&args.id.clone()) {
                if(args.openchat_principal.is_some()) {
                    let username = args.openchat_principal.clone().unwrap();
                    if self.usernames.contains_key(&username.clone()) {
                        return CommonResult::Err("OC Username already registered.".to_string());
                    }
                    user.openchat_principal = args.openchat_principal.clone();
                    self.usernames.insert(username.clone(), args.id);
                }
                if(args.taggr_principal.is_some()) {
                    let username = args.taggr_principal.clone().unwrap();
                    if self.taggr_usernames.contains_key(&username.clone()) {
                        return CommonResult::Err("Taggr Username already registered.".to_string());
                    }
                    user.taggr_principal = args.taggr_principal.clone();
                    self.taggr_usernames.insert(username.clone(), args.id);
                }
            }
        }
        CommonResult::Ok(true)
    }
    pub fn get_user(&self, user_address: Principal) -> CommonResultUser {
        match self.users.get(&user_address) {
            Some(user) => {
                let res = Users {
                    taggr_principal: user.taggr_principal.clone(),
                    openchat_principal: user.openchat_principal.clone(),
                    name: user.name.clone(),
                    id: user_address,
                };
                CommonResultUser::Ok(res)
            },
            None => {
                CommonResultUser::Err("User not registered.".to_string())
            }
        }
    }
    pub fn paginate_campaigns(&self, args: PaginationArgs) -> Vec<Campaign> {
        let start_index = (args.page_number - 1) * args.page_size;
        let end_index = start_index + args.page_size;
        self.campaigns.values()
            .skip(start_index)
            .take(end_index - start_index)
            .cloned()
            .map(|campaign| campaign.without_participants_and_winners())
            .collect::<Vec<Campaign>>()
    }

    pub fn check_is_owner(&self) -> bool {
        let caller = caller().unwrap_or_else(|e| trap(&e));
        if Some(caller) != self.owner {
            return false;
        }
        return true;
    }
    pub fn is_token_whitelisted(&mut self, token: Principal) -> bool {
        return self.whitelisted_tokens.contains_key(&token);
    }
    pub fn check_if_owner(&mut self) -> CommonResult {
        let caller = caller().unwrap_or_else(|e| trap(&e));
        if Some(caller) != self.owner {
            return CommonResult::Err("Only the owner can update settings.".to_string());
        }
        CommonResult::Ok(true)
    }
    pub fn check_if_service_account(&mut self) -> CommonResult {
        let caller = caller().unwrap_or_else(|e| trap(&e));
        if Some(caller) == self.owner {
            return CommonResult::Ok(true);
        }
        if Some(caller) != self.service_account {
            return CommonResult::Err("Only the service account can update settings.".to_string());
        }
        CommonResult::Ok(true)
    }

    pub fn submit_participants(&mut self, campaign_id: u64, participants: Vec<Principal>) -> CommonResult {
        match self.check_if_service_account() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        if let Some(campaign) = self.campaigns.get_mut(&campaign_id) {
            for participant_id in participants.iter() {
                if let Some(participant) = campaign.participants.get_mut(participant_id) {
                    participant.is_verified = true;
                } else {
                    campaign.participants.insert(participant_id.clone(), Participant { user_id: participant_id.clone(), reward_claimed: false,  is_verified: true });
                }
            }
            CommonResult::Ok(true)
        } else {
            CommonResult::Err("Campaign not found".to_string())
        }
    }


    pub fn transfer_owner_setting(&mut self, value: Principal) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        if Principal::anonymous() == value {
            return CommonResult::Err("Invalid Account".to_string());
        }

        self.owner = Some(value);

        CommonResult::Ok(true)
    }
    pub fn transfer_service_account(&mut self, value: Principal) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        if Principal::anonymous() == value {
            return CommonResult::Err("Invalid Account".to_string());
        }

        self.service_account = Some(value);

        CommonResult::Ok(true)
    }
    pub fn update_settings(&mut self, name: &str, value: u64) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        if name == "min_winners" {
            self.settings.min_winners = value;
        }
        if name == "max_winners" {
            self.settings.max_winners = value;
        }
        if name == "platform_fees" {
            self.settings.platform_fees = value;
        }
        CommonResult::Ok(true)
    }
    pub fn update_platform_fee_owner_setting(&mut self, platform_fee_owner: Principal) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        self.settings.platform_fee_owner = platform_fee_owner;
        CommonResult::Ok(true)
    }
    pub fn update_min_reward_amount_settings(&mut self, token: Principal, amount: u64, token_type: String) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        self.whitelisted_tokens.insert(token, WhiteListedToken {
            token,
            min_reward: amount,
            token_type
        });
        CommonResult::Ok(true)
    }
    pub fn whitelist_token(&mut self, token_canister_id: Principal, min_amount: u64, token_type: String) -> WhiteListedTokenResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return WhiteListedTokenResult::Err(e),
            _ => {},
        }

        self.whitelisted_tokens.insert(token_canister_id, WhiteListedToken {
            token: token_canister_id,
            min_reward: min_amount,
            token_type
        });
        WhiteListedTokenResult::Ok(true)
    }
    pub fn remove_whitelist_token(&mut self, token_canister_id: Principal) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        self.whitelisted_tokens.remove(&token_canister_id);
        CommonResult::Ok(true)
    }
}