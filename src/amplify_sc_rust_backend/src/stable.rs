// NOTE: Converting and storing state like this should not be used in production.
// If the state becomes too large, it can prevent future upgrades. This
// is left in as a tool during development. If removed, native types
// can be used throughout, instead.

use std::collections::HashMap;

use candid::{CandidType, Nat, Principal};
use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, HashSet};
use ic_cdk::caller;
use ic_ledger_types::{
    AccountIdentifier, Memo, Tokens, DEFAULT_SUBACCOUNT, MAINNET_LEDGER_CANISTER_ID,
};

use crate::types::*;
use crate::utils::principal_to_subaccount;

const ICP_FEE: u64 = 10_000;

#[derive(CandidType, Deserialize, Serialize)]
pub struct StableState {
    pub owner: Option<Principal>,
    pub users: BTreeMap<Principal, UsersArgs>,
    pub campaigns: BTreeMap<u64, Campaign>,
    pub whitelisted_tokens: HashSet<Principal>,
    pub settings: Settings,
}

impl Default for StableState {
    fn default() -> Self {
        StableState {
            owner: Default::default(),
            users: BTreeMap::new(),
            campaigns: BTreeMap::new(),
            whitelisted_tokens: HashSet::new(),
            settings: Default::default(),
        }
    }
}

impl From<StateStorage> for StableState {
    fn from(input: StateStorage) -> StableState {
        StableState {
            owner: input.owner,
            users: input.users,
            campaigns: input.campaigns,
            whitelisted_tokens: input.whitelisted_tokens,
            settings: input.settings,
        }
    }
}

impl StableState {
    pub fn create_campaign(&mut self, args: CreateCampaignArgs) -> CampaignResult {
        // if !is_token_whitelisted(args.reward_token) {
        //     return CampaignResult::Err("Reward token is not whitelisted.".to_string());
        // }
        let campaign_id = self.campaigns.len() as u64;
        if self.campaigns.contains_key(&campaign_id) {
            return CampaignResult::Err("Campaign ID conflict. Try again.".to_string());
        }

        let settings = self.settings.clone();
        if args.reward.e8s < settings.min_reward_amount {
            return CampaignResult::Err("Reward amount is below the minimum allowed.".to_string());
        }
        if args.winners < settings.min_winners {
            return CampaignResult::Err("Number of winners is below the minimum allowed.".to_string());
        }
        if args.winners > settings.max_winners && settings.max_winners > 0 {
            return CampaignResult::Err("Number of winners is above the maximum allowed.".to_string());
        }

        let campaign = Campaign {
            reward: args.reward,
            reward_token: args.reward_token,
            winners: args.winners,
            campaign_id,
            project_name: args.project_name,
            tweet_id: args.tweet_id,
            starts_at: args.starts_at,
            ends_at: args.ends_at,
            user_id: args.user_id,
            participants: BTreeMap::new(),
            selected_winners: BTreeMap::new(),
        };

        self.campaigns.insert(campaign_id, campaign);
        CampaignResult::Ok(campaign_id)
    }
    pub fn participate_in_campaign(&mut self, campaign_id: u64) -> CommonResult {
        let current_time = ic_cdk::api::time();
        let caller = caller();
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

    pub fn register_user(&mut self, args: UsersArgs) -> CommonResult {
        let caller = caller();
        if self.users.contains_key(&caller) {
            return CommonResult::Err("User already registered.".to_string());
        }
        self.users.insert(caller, args);
        CommonResult::Ok(true)
    }

    pub fn check_if_owner(&mut self) -> CommonResult {
        let caller = caller();
        if Some(caller) != self.owner {
            return CommonResult::Err("Only the owner can update settings.".to_string());
        }
        CommonResult::Ok(true)
    }
    pub fn submit_participants(&mut self, campaign_id: u64, participants: Vec<Principal>) -> CommonResult {
        match self.check_if_owner() {
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


    pub fn update_settings(&mut self, name: &str, value: u64) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        if name == "min_reward_amount" {
            self.settings.min_reward_amount = value;
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
    pub fn whitelist_token(&mut self, token_canister_id: Principal) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        self.whitelisted_tokens.insert(token_canister_id);
        CommonResult::Ok(true)
    }
    pub fn remote_whitelist_token(&mut self, token_canister_id: Principal) -> CommonResult {
        match self.check_if_owner() {
            CommonResult::Err(e) => return CommonResult::Err(e),
            _ => {},
        }

        self.whitelisted_tokens.remove(&token_canister_id);
        CommonResult::Ok(true)
    }
    pub async fn transfer_icp(&mut self, amount: u64) -> CommonResult {
        let caller = caller();
        let canister_id = ic_cdk::api::id();
        let ledger_canister_id = MAINNET_LEDGER_CANISTER_ID;
        let account = AccountIdentifier::new(&canister_id, &principal_to_subaccount(&caller));
        let balance_args = ic_ledger_types::AccountBalanceArgs { account };
        let  transfer_amount = Tokens::from_e8s(amount);
        let balance = ic_ledger_types::account_balance(ledger_canister_id, balance_args)
            .await
            .map_err(|_| DepositErr::TransferFailure);

        let transfer_args = ic_ledger_types::TransferArgs {
            memo: Memo(0),
            amount: transfer_amount,
            fee: Tokens::from_e8s(ICP_FEE),
            from_subaccount: Some(principal_to_subaccount(&caller)),
            to: AccountIdentifier::new(&canister_id, &DEFAULT_SUBACCOUNT),
            created_at_time: None,
        };
        ic_ledger_types::transfer(ledger_canister_id, transfer_args)
            .await
            .map_err(|_| DepositErr::TransferFailure)
            .map_err(|_| DepositErr::TransferFailure);

        CommonResult::Ok(true)
    }
    pub async fn transfer_dip_token(&mut self, token: Principal, from: Principal, to: Principal, amount: u64) -> CommonResult {
        let call_result: Result<(TxReceipt,), _> =
            ic_cdk::api::call::call(token, "transferFrom", (from, to, amount)).await;

        CommonResult::Ok(true)
    }
}