use std::cell::RefCell;
use std::convert::TryInto;

use candid::{candid_method, export_service, Nat, Principal};
use ic_cdk::caller;
use ic_cdk_macros::*;
mod stable;
mod utils;

mod types;
use types::*;
use crate::stable::StableState;

// Global state to store user details
thread_local! {
    static STATE: RefCell<StableState> = RefCell::default();
}

#[query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[update]
fn register_user(args: UsersArgs) -> CommonResult {
    STATE.with(|s| s.borrow_mut().register_user(args))
}
#[update]
fn create_campaign(args: CreateCampaignArgs) -> CampaignResult {
    STATE.with(|s| s.borrow_mut().create_campaign(args))
}

#[update]
fn participate_in_campaign(campaign_id: u64) -> CommonResult {
    STATE.with(|s| s.borrow_mut().participate_in_campaign(campaign_id))
}



// OWNER METHODS
#[update]
fn submit_participants(campaign_id: u64, participants: Vec<Principal>) -> CommonResult {
    STATE.with(|s| s.borrow_mut().submit_participants(campaign_id, participants))
}


#[update]
fn update_min_reward_amount(new_amount: u64) -> CommonResult {
    STATE.with(|s|  s.borrow_mut().update_settings("min_reward_amount", new_amount) )
}

#[update]
fn update_platform_fees(platform_fees: u64) -> CommonResult {
    STATE.with(|s|  s.borrow_mut().update_settings("platform_fees", platform_fees) )
}

#[update]
fn update_min_winners(new_winners: u64) -> CommonResult {
    STATE.with(|s|  s.borrow_mut().update_settings("min_winners", new_winners) )
}

#[update]
fn update_max_winners(new_winners: u64) -> CommonResult {
    STATE.with(|s|  s.borrow_mut().update_settings("max_winners", new_winners) )
}

#[update]
fn whitelist_token(token_canister_id: Principal) -> CommonResult {
    return STATE.with(|s|  s.borrow_mut().whitelist_token(token_canister_id) );
}

#[update]
fn unwhitelist_token(token_canister_id: Principal) -> CommonResult {
    return STATE.with(|s|  s.borrow_mut().remote_whitelist_token(token_canister_id) );
}

#[query]
fn is_token_whitelisted(token_canister_id: Principal) -> bool {
    STATE.with(|s| s.borrow().whitelisted_tokens.contains(&token_canister_id))
}

#[query]
fn get_whitelisted_tokens() -> Vec<Principal> {
    STATE.with(|state| {
        let state_ref = state.borrow();
        state_ref.whitelisted_tokens.iter().cloned().collect()
    })
}

#[query]
fn paginate_users(args: PaginationArgs) -> Vec<(Users)> {
    let start_index = (args.page_number - 1) * args.page_size;
    let end_index = start_index + args.page_size;

    let mut paginated_users = Vec::new();

    STATE.with(|state| {
        let state_ref = state.borrow();
        for (index, (user_id, user_args)) in state_ref.users.iter().enumerate() {
            if index >= start_index && index < end_index {
                paginated_users.push(Users {
                    twitter_username: user_args.twitter_username.clone(),
                    name: user_args.name.clone(),
                    id: user_id.clone(),
                });
            }
        }
    });

    paginated_users
}

#[query]
fn search_campaigns_by_project_name(project_name_query: String) -> Vec<Campaign> {
    STATE.with(|s| {
        s.borrow()
            .campaigns
            .values()
            .filter(|&campaign| campaign.project_name == project_name_query)
            .cloned()
            .collect()
    })
}

#[update]
fn select_winners(campaign_id: u64) -> CommonResult {
    // let mut rng = rand::thread_rng();

    STATE.with(|state| {
        let mut state_ref = state.borrow_mut();
        if let Some(campaign) = state_ref.campaigns.get_mut(&campaign_id) {
            let verified_participants: Vec<_> = campaign
                .participants
                .iter()
                .filter(|(_p,p)| p.is_verified)
                .map(|(principal, _)| principal.clone())
                .collect();

            // campaign.selected_winners = verified_participants
            //     .map(|p| p.user_id.clone())
            //     .collect();

            CommonResult::Ok(true)
        } else {
            CommonResult::Err("Campaign not found".to_string())
        }
    })
}


#[query]
fn have_i_participated(campaign_id: u64) -> CommonResult {
    let user = caller();

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
    let caller = caller();
    STATE.with(|s| {
        let state = s.borrow();
        return state.campaigns.values().any(|c| c.campaign_id == campaign_id && c.selected_winners.contains_key(&caller));
    })
}

#[query]
fn paginate_campaigns(args: PaginationArgs) -> Vec<Campaign> {
    let start_index = (args.page_number - 1) * args.page_size;
    let end_index = start_index + args.page_size;

    let mut paginated_campaigns = Vec::new();

    STATE.with(|state| {
        let state_ref = state.borrow();
        for (index, campaign) in state_ref.campaigns.values().enumerate() {
            if index >= start_index && index < end_index {
                paginated_campaigns.push(campaign.clone());
            }
        }
    });

    return paginated_campaigns;
}

#[query]
fn paginate_winners(campaign_id: u64, args: PaginationArgs) -> Vec<Participant> {
    let start_index = (args.page_number - 1) * args.page_size;
    let end_index = start_index + args.page_size;

    let mut paginated_winners = Vec::new();

    STATE.with(|state| {
        let state_ref = state.borrow();
        if let Some(campaign) = state_ref.campaigns.get(&campaign_id) {
            for (index, (user, winner)) in campaign.selected_winners.iter().enumerate() {
                if index >= start_index && index < end_index {
                    paginated_winners.push(winner.clone());
                }
            }
        }
    });

    return paginated_winners;
}

#[query]
fn my_claimed_campaigns() -> Vec<Campaign> {
    let caller = ic_cdk::caller();
    let mut claimed_campaigns = Vec::new();

    STATE.with(|state| {
        let state_ref = state.borrow();
        for campaign in state_ref.campaigns.values() {
            // if campaign.selected_winners.iter().any(|w| w.user_id == caller && w.reward_claimed) {
            //     claimed_campaigns.push(campaign.clone());
            // }
        }
    });

    return claimed_campaigns;
}

#[query]
fn my_unclaimed_campaigns() -> Vec<Campaign> {
    let caller = ic_cdk::caller();
    let mut unclaimed_campaigns = Vec::new();

    STATE.with(|state| {
        let state_ref = state.borrow();
        for campaign in state_ref.campaigns.values() {
            // if campaign.selected_winners.iter().any(|w| w.user_id == caller && !w.reward_claimed) {
            //     unclaimed_campaigns.push(campaign.clone());
            // }
        }
    });

    return unclaimed_campaigns;
}

// For testing.
#[update]
pub fn clear() {
    STATE.with(|s| {
        let mut state = s.borrow_mut();

        assert!(state.owner.unwrap() == caller());
        state.users.clear();
    })
}

#[init]
fn init() {
    ic_cdk::setup();
    STATE.with(|s| {
        s.borrow_mut().owner = Some(caller());
        s.borrow_mut().settings = Settings {
            min_reward_amount: 0,
            min_winners: 0,
            max_winners: 0,
            platform_fees: 0,
        };
    });
}

// NOTE: Converting and storing state like this should not be used in production.
// If the state becomes too large, it can prevent future upgrades. This
// is left in as a tool during development. If removed, native types
// can be used throughout, instead.
#[pre_upgrade]
fn pre_upgrade() {
    let state = STATE.with(|s| s.take());

    // Transform into stable state
    let stable_state: stable::StableState = state.into();

    ic_cdk::storage::stable_save((stable_state,)).expect("failed to save stable state");
}

// NOTE: Converting and storing state like this should not be used in production.
// If the state becomes too large, it can prevent future upgrades. This
// is left in as a tool during development. If removed, native types
// can be used throughout, instead.
#[post_upgrade]
fn post_upgrade() {
    let (stable_state,): (stable::StableState,) =
        ic_cdk::storage::stable_restore().expect("failed to restore stable state");

    // Transform from stable state
    let state = stable_state.into();

    STATE.with(|s| {
        s.replace(state);
    });
}

export_service!();

#[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}