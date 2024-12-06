use std::cell::RefCell;
use std::collections::BTreeMap;
use std::convert::TryInto;

use candid::{export_service, Principal};
use ic_cdk::api::time;
use ic_cdk::trap;
use ic_cdk_macros::*;
use ic_ledger_types::{AccountIdentifier, Tokens};
use rand::{rngs::StdRng, SeedableRng, seq::SliceRandom};

use types::*;

use crate::stable::StableState;
use crate::transfer::{deposit_icp, withdraw_icp};
use crate::utils::{caller, principal_to_subaccount};

mod stable;
mod utils;

mod types;
mod transfer;

// Global state to store user details
thread_local! {
    static STATE: RefCell<StableState> = RefCell::default();
}

#[query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[update]
fn register_user(args: Users) -> CommonResult {
    STATE.with(|s| s.borrow_mut().register_user(args))
}

#[update]
fn update_user(args: Users) -> CommonResult {
    STATE.with(|s| s.borrow_mut().update_user(args))
}

#[query]
fn get_user(user_address: Principal) -> CommonResultUser {
    STATE.with(|s| s.borrow().get_user(user_address))
}

#[update(name = "getDepositAddress")]
pub fn get_deposit_address() -> String {
    let caller = caller().unwrap_or_else(|e| trap(&e));
    let canister_id = ic_cdk::api::id();
    let subaccount = principal_to_subaccount(&caller);

    AccountIdentifier::new(&canister_id, &subaccount).to_hex()
}

#[update]
fn create_campaign(args: CreateCampaignArgs) -> CampaignResult {
    STATE.with(|s| s.borrow_mut().create_campaign(args))
}

#[update]
async fn deposit_campaign(campaign_id: u64) -> CommonResult {
    let campaign_result = STATE.with(|state| {
        state.borrow().campaigns.get(&campaign_id)
            .cloned()
            .ok_or_else(|| "Campaign not found.".to_string())
    });

    let mut campaign = match campaign_result {
        Ok(c) => c,
        Err(e) => return CommonResult::Err(e),
    };
    let caller = caller().unwrap_or_else(|e| trap(&e));
    if campaign.user_id != caller {
        return CommonResult::Err("You are not the owner.".to_string());
    }
    let transfer_amount = Tokens::from_e8s(campaign.reward.e8s() * campaign.winners);
    let result = deposit_icp(campaign.reward_token, transfer_amount, campaign.winners).await;
    let success = match result {
        Ok(value) => {
            if !value {
                return CommonResult::Err("Transfer Failed".to_string());
            }
            CommonResult::Ok(true)
        },
        Err(e) => return CommonResult::Err(e)
    };

    STATE.with(|state| {
        let mut state_ref = state.borrow_mut();
        // Check if the campaign exists
        if let Some(campaignR) = state_ref.campaigns.get_mut(&campaign_id) {
            campaignR.is_deposited = true;
        } else {}
    });
    CommonResult::Ok(true)
}
#[update]
fn participate_in_campaign(campaign_id: u64) -> CommonResult {
    STATE.with(|s| s.borrow_mut().submit_participate_in_campaign(campaign_id))
}


// OWNER METHODS
#[update]
fn submit_participants(campaign_id: u64, participants: Vec<Principal>) -> CommonResult {
    STATE.with(|s| s.borrow_mut().submit_participants(campaign_id, participants))
}


#[update]
fn update_min_reward_amount(token: Principal, new_amount: u64, token_type: String) -> CommonResult {
    STATE.with(|s| s.borrow_mut().update_min_reward_amount_settings(token, new_amount, token_type))
}

#[update]
fn update_platform_fee_owner(platform_fee_owner: Principal) -> CommonResult {
    STATE.with(|s| s.borrow_mut().update_platform_fee_owner_setting(platform_fee_owner))
}

#[update]
fn update_platform_fees(platform_fees: u64) -> CommonResult {
    STATE.with(|s| s.borrow_mut().update_settings("platform_fees", platform_fees))
}

#[update]
fn update_min_winners(new_winners: u64) -> CommonResult {
    STATE.with(|s| s.borrow_mut().update_settings("min_winners", new_winners))
}

#[update]
fn update_max_winners(new_winners: u64) -> CommonResult {
    STATE.with(|s| s.borrow_mut().update_settings("max_winners", new_winners))
}

#[update]
fn transfer_owner(new_owner: Principal) -> CommonResult {
    STATE.with(|s| s.borrow_mut().transfer_owner_setting(new_owner))
}

#[update]
fn transfer_service_account(new_owner: Principal) -> CommonResult {
    STATE.with(|s| s.borrow_mut().transfer_service_account(new_owner))
}

#[update]
fn whitelist_token(token_canister_id: Principal, min_amount: u64, token_type: String) -> WhiteListedTokenResult {
    return STATE.with(|s| s.borrow_mut().whitelist_token(token_canister_id, min_amount, token_type));
}

#[update]
fn unwhitelist_token(token_canister_id: Principal) -> CommonResult {
    return STATE.with(|s| s.borrow_mut().remove_whitelist_token(token_canister_id));
}

#[query]
fn is_token_whitelisted(token_canister_id: Principal) -> bool {
    STATE.with(|s| s.borrow().whitelisted_tokens.contains_key(&token_canister_id))
}

#[query]
fn get_whitelisted_tokens() -> Vec<WhiteListedToken> {
    STATE.with(|state| {
        let state_ref = state.borrow();
        state_ref.whitelisted_tokens.values().cloned().collect()
    })
}

#[query]
fn is_owner() -> bool {
    return STATE.with(|s| s.borrow().check_is_owner());
}

#[query]
fn total_campaigns() -> u64 {
    return STATE.with(|s| s.borrow().total_campaigns);
}

#[query]
fn campaign_by_id(campaign_id: u64) -> CommonResultCampaign {
    STATE.with(|state| {
        let state_ref = state.borrow();

        // Check if the campaign exists
        if let Some(campaign) = state_ref.campaigns.get(&campaign_id) {
            // Check if the user has participated
            CommonResultCampaign::Ok(campaign.without_participants_and_winners())
        } else {
            CommonResultCampaign::Err("Campaign not found.".to_string())
        }
    })
}

#[query]
fn total_users() -> u64 {
    return STATE.with(|s| s.borrow().total_users);
}

#[query]
fn get_settings() -> Settings {
    STATE.with(|state| {
        return state.borrow().settings;
    })
}

#[query]
fn paginate_users(args: PaginationArgs) -> Vec<Users> {
    let start_index = (args.page_number - 1) * args.page_size;
    let end_index = start_index + args.page_size;

    let mut paginated_users = Vec::new();

    STATE.with(|state| {
        let state_ref = state.borrow();
        for (index, (user_id, user_args)) in state_ref.users.iter().enumerate() {
            if index >= start_index && index < end_index {
                paginated_users.push(Users {
                    taggr_principal: user_args.taggr_principal.clone(),
                    openchat_principal: user_args.openchat_principal.clone(),
                    name: user_args.name.clone(),
                    id: user_id.clone(),
                });
            }
        }
    });

    return paginated_users;
}

#[query]
fn search_campaigns_by_project_name(project_name_query: String) -> Vec<Campaign> {
    let query_lower = project_name_query.to_lowercase();

    STATE.with(|s| {
        s.borrow()
            .campaigns
            .values()
            .filter(|&campaign| campaign.project_name.to_lowercase().contains(&query_lower))
            .cloned()
            .collect()
    })
}

#[update]
async fn select_winners(campaign_id: u64) -> CommonResult {
    let caller = caller().unwrap_or_else(|e| trap(&e));
    let service_account = STATE.with(|state| {
        state.borrow().service_account
    })
        .unwrap_or_else(|| panic!("Invalid Caller"));
    if caller != service_account {
        return CommonResult::Err("Invalid Caller".to_string());
    }

    let (raw_rand, ): (Vec<u8>, ) = ic_cdk::api::management_canister::main::raw_rand()
        .await
        .unwrap_or_else(|_e| ic_cdk::trap("call to raw_rand failed"));
    let raw_rand_32_bytes: [u8; 32] = raw_rand
        .try_into()
        .unwrap_or_else(|_e| panic!("raw_rand not 32 bytes"));


    let mut rng = StdRng::from_seed(raw_rand_32_bytes);
    let campaign_result = STATE.with(|state| {
        state.borrow().campaigns.get(&campaign_id)
            .cloned()
            .ok_or_else(|| "Campaign not found.".to_string())
    });

    let mut campaign = match campaign_result {
        Ok(c) => c,
        Err(e) => return CommonResult::Err(e),
    };
    if campaign.is_deposited == false {
        return CommonResult::Err("Campaign is not ready".to_string());
    }
    if campaign.selected_winners.len() > 0 {
        return CommonResult::Err("Campaign Already Submitted".to_string());
    }
    if campaign.ends_at > time() {
        return CommonResult::Err("Campaign Not Ended Yet".to_string());
    }
    let verified_participants: Vec<_> = campaign
        .participants
        .iter()
        .filter(|(_p, p)| p.is_verified)
        .map(|(principal, participant)| (principal.clone(), participant.clone()))
        .collect();
    let mut selected_participants = verified_participants.clone();

    if verified_participants.len() < (campaign.winners as usize) {
        campaign.selected_winners = selected_participants.clone().into_iter().collect();
        let remaining_winners = (campaign.winners as usize) - verified_participants.len();
        let remaining_amount = (remaining_winners as u64) * campaign.reward.e8s();
        let withdraw_result = withdraw_icp(campaign.reward_token, Tokens::from_e8s(remaining_amount), campaign.user_id)
            .await;
        match withdraw_result {
            Ok(_) => {
                campaign.total_withdrawn += campaign.reward.e8s();
            }
            Err(e) => {
                return CommonResult::Err(format!("Campaign couldn't refund, Reason: {}, Refund Amount: {}", e, remaining_amount));
            }
        }
    }
    selected_participants.shuffle(&mut rng);
    let selected_winners = selected_participants
        .into_iter()
        .take(campaign.winners as usize)
        .collect();

    campaign.selected_winners = selected_winners;

    STATE.with(|state| {
        let mut state_ref = state.borrow_mut();
        // Check if the campaign exists
        if let Some(campaignR) = state_ref.campaigns.get_mut(&campaign_id) {
            campaignR.selected_winners = campaign.selected_winners;
            campaignR.is_verified = true;
        } else {}
    });
    CommonResult::Ok(true)
}


#[query]
fn have_i_participated(campaign_id: u64) -> CommonResult {
    let user = caller().unwrap_or_else(|e| trap(&e));

    STATE.with(|state| {
        let state_ref = state.borrow();

        // Check if the campaign exists
        if let Some(campaign) = state_ref.campaigns.get(&campaign_id) {
            // Check if the user has participated
            if campaign.participants.contains_key(&user) {
                CommonResult::Ok(true)
            } else {
                CommonResult::Err("You have not participated in this campaign.".to_string())
            }
        } else {
            CommonResult::Err("Campaign not found.".to_string())
        }
    })
}

#[query]
fn am_i_a_winner(campaign_id: u64) -> bool {
    let caller = caller().unwrap_or_else(|e| trap(&e));
    STATE.with(|s| {
        let state = s.borrow();
        return state.campaigns.values().any(|c| c.campaign_id == campaign_id && c.selected_winners.contains_key(&caller));
    })
}

#[query(name = "haveIClaimed")]
fn have_i_claimed(campaign_id: u64) -> bool {
    let caller = caller().unwrap_or_else(|e| trap(&e));
    STATE.with(|s| {
        let state = s.borrow();
        return state.campaigns.values().any(|c| c.campaign_id == campaign_id && c.selected_winners.get(&caller).unwrap().reward_claimed == true);
    })
}

#[query]
fn paginate_campaigns(args: PaginationArgs, filter: CampaignFilter) -> Vec<UserCampaign> {
    let start_index = (args.page_number - 1) * args.page_size;
    let end_index = start_index + args.page_size;
    let caller = ic_cdk::caller();

    STATE.with(|state| {
        state.borrow().campaigns
            .values()
            .rev()
            .filter(|campaign| {
                filter.project_name.as_ref()
                    .map_or(true, |name| campaign.project_name.to_lowercase().contains(&name.to_lowercase().as_str())) &&
                    filter.reward_token.as_ref()
                        .map_or(true, |token| campaign.reward_token == *token) &&
                    filter.status.as_ref()
                        .map_or(true, |status| {
                            match status {
                                CampaignStatus::Upcoming => campaign.starts_at > time(),
                                CampaignStatus::Live => campaign.starts_at <= time() && campaign.ends_at > time(),
                                CampaignStatus::Ended => campaign.ends_at <= time(),
                            }
                        }) &&
                    filter.to_be_verified.as_ref()
                        .map_or(true, |_val| {
                            return campaign.ends_at <= time() && !campaign.is_verified;
                        }) &&
                    filter.my_created_campaigns.as_ref()
                        .map_or(true, |user_id| campaign.user_id == *user_id) &&
                    filter.my_participated_campaigns.as_ref()
                        .map_or(true, |user_id| campaign.participants.contains_key(&user_id)) &&
                    filter.my_claimed_campaigns.as_ref()
                        .map_or(true, |user_id| {
                            if let Some(winner) = campaign.selected_winners.get(&user_id) {
                                return winner.reward_claimed == true && winner.is_verified == true;
                            }
                            return false;
                        }) &&
                    filter.my_unclaimed_campaigns.as_ref()
                        .map_or(true, |user_id| {
                            if let Some(winner) = campaign.selected_winners.get(&user_id) {
                                return winner.reward_claimed == false && winner.is_verified == true;
                            }
                            return false;
                        })
            })
            .skip(start_index)
            .take(end_index - start_index)
            .cloned()
            .map(|c| {
                let mut won = false;
                if let Some(winner) = c.selected_winners.get(&caller) {
                    won = winner.is_verified == true;
                }
                return UserCampaign {
                    campaign: c.without_participants_and_winners(),
                    won,
                    participated: c.participants.contains_key(&caller),
                    total_participants: c.participants.len() as u64,
                }
            })
            .collect()
    })
}

#[query]
fn current_time() -> u64 {
    time()
}

#[query]
fn paginate_winners(campaign_id: u64, args: PaginationArgs) -> Vec<Participant> {
    let start_index = (args.page_number - 1) * args.page_size;
    let end_index = start_index + args.page_size;


    let mut paginated_winners = Vec::new();

    STATE.with(|state| {
        let state_ref = state.borrow();
        if let Some(campaign) = state_ref.campaigns.get(&campaign_id) {
            paginated_winners = campaign.selected_winners
                .values()
                .skip(start_index)
                .take(end_index - start_index)
                .cloned()
                .collect()
        }
    });

    return paginated_winners;
}

#[query]
fn paginate_participants(campaign_id: u64, args: PaginationArgs) -> (Vec<Participant>, Vec<Users>) {
    let start_index = (args.page_number - 1) * args.page_size;
    let end_index = start_index + args.page_size;

    let mut paginated_participants = Vec::new();
    let mut paginated_users: Vec<Users> = Vec::new();

    STATE.with(|state| {
        let state_ref = state.borrow();
        if let Some(campaign) = state_ref.campaigns.get(&campaign_id) {
            for (index, (user_address, winner)) in campaign.participants.iter().enumerate() {
                if index >= start_index && index < end_index {
                    paginated_participants.push(winner.clone());
                    let mut res = Users {
                        openchat_principal: Some("".to_string()),
                        taggr_principal: Some("".to_string()),
                        name: "".to_string(),
                        id: user_address.clone(),
                    };
                    match state_ref.users.get(&user_address.clone()) {
                        Some(user) => {
                            res = Users {
                                openchat_principal: user.openchat_principal.clone(),
                                taggr_principal: user.taggr_principal.clone(),
                                name: user.name.clone(),
                                id: user_address.clone(),
                            };
                        }
                        None => {}
                    }
                    paginated_users.push(res.clone());
                }
            }
        }
    });

    return (paginated_participants, paginated_users);
}

#[update(name = "claimReward")]
async fn claim_reward(campaign_id: u64) -> CommonResult {
    let caller = caller().unwrap_or_else(|e| trap(&e));
    let campaign_result = STATE.with(|state| {
        state.borrow().campaigns.get(&campaign_id)
            .cloned()
            .ok_or_else(|| "Campaign not found.".to_string())
    });

    let mut campaign = match campaign_result {
        Ok(c) => c,
        Err(e) => return CommonResult::Err(e),
    };

    let participant_result = campaign.selected_winners.get(&caller)
        .cloned()
        .ok_or_else(|| "You're not the winner".to_string());

    let mut participant = match participant_result {
        Ok(c) => c,
        Err(e) => return CommonResult::Err(e),
    };

    if campaign.is_deposited == false {
        return CommonResult::Err("Campaign is not ready".to_string());
    }
    if participant.reward_claimed {
        return CommonResult::Err("You've already claimed".to_string());
    }
    if !participant.is_verified {
        return CommonResult::Err("You're not eligible".to_string());
    }
    let withdraw_result = withdraw_icp(campaign.reward_token, campaign.reward, caller)
        .await;
    match withdraw_result {
        Ok(_) => {}
        Err(e) => {
            return CommonResult::Err(format!("Campaign could not be claimed, Reason: {}", e));
        }
    }
    STATE.with(|state| {
        let mut state_ref = state.borrow_mut();
        // Check if the campaign exists
        if let Some(campaignR) = state_ref.campaigns.get_mut(&campaign_id) {
            campaignR.total_withdrawn += campaign.reward.e8s();
            campaignR.selected_winners.insert(caller, Participant {
                reward_claimed: true,
                is_verified: participant.is_verified.clone(),
                user_id: participant.user_id.clone(),
            });
        } else {}
    });
    CommonResult::Ok(true)
}


// For testing.
#[update]
pub fn clear() {
    let caller = caller().unwrap_or_else(|e| trap(&e));
    STATE.with(|s| {
        let mut state = s.borrow_mut();

        assert!(state.owner.unwrap() == caller);
        state.users.clear();
        state.campaigns.clear();
        state.whitelisted_tokens.clear();
        state.usernames.clear();
        state.total_users = 0 as u64;
        state.total_campaigns = 0 as u64;
    })
}

#[init]
fn init(ledger: Option<Principal>) {
    let caller = caller().unwrap_or_else(|e| trap(&e));
    ic_cdk::setup();
    STATE.with(|s| {
        s.borrow_mut().owner = Some(caller);
        s.borrow_mut().service_account = Some(caller);
        s.borrow_mut().ledger = ledger;
        s.borrow_mut().settings = Settings {
            min_winners: 0,
            max_winners: 0,
            platform_fees: 0,
            platform_fee_owner: caller,
        };
    });
}

// NOTE: Converting and storing state like this should not be used in production.
// If the state becomes too large, it can prevent future upgrades. This
// is left in as a tool during development. If removed, native types
// can be used throughout, instead.
#[pre_upgrade]
fn pre_upgrade() {
    let state = STATE.with(|s| s.borrow().clone());

    ic_cdk::storage::stable_save((state, )).expect("failed to save stable state");
}

// NOTE: Converting and storing state like this should not be used in production.
// If the state becomes too large, it can prevent future upgrades. This
// is left in as a tool during development. If removed, native types
// can be used throughout, instead.
#[post_upgrade]
fn post_upgrade() {
    let (stable_state, ): (stable::StableState, ) =
        ic_cdk::storage::stable_restore().expect("failed to restore stable state");

    // Transform from stable state
    let state = stable_state.into();

    STATE.with(|s| {
        *s.borrow_mut() = state;
    });
}

export_service!();

#[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}

getrandom::register_custom_getrandom!(always_fail);
pub fn always_fail(_buf: &mut [u8]) -> Result<(), getrandom::Error> {
    Err(getrandom::Error::UNSUPPORTED)
}

#[test]
fn check_candid_interface() {
    use candid::utils::{service_compatible, CandidSource};
    use std::path::Path;

    candid::export_service!();
    let new_interface = __export_service();

    service_compatible(
                        CandidSource::Text(&new_interface),
                        CandidSource::File(Path::new("amplify_sc_rust_backend.did")),
    ).unwrap();
}
