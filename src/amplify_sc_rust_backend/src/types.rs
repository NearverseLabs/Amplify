use candid::{CandidType, Nat, Principal};
use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, HashSet};


#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct StateStorage {
    pub owner: Option<Principal>,
    pub users: BTreeMap<Principal, UsersArgs>,
    pub campaigns: BTreeMap<u64, Campaign>,
    pub whitelisted_tokens: HashSet<Principal>,
    pub settings: Settings,
}

#[derive(Clone, Copy, Debug, Default, CandidType, Deserialize, Serialize, PartialEq, PartialOrd)]
pub struct Tokens {
    pub(crate) e8s: u64,
}

#[derive(Clone, CandidType, Deserialize, Serialize, Debug)]
pub struct UsersArgs {
    pub(crate) twitter_username: String,
    pub(crate) name: String,
}

#[derive(Clone, Copy, Debug, Default, CandidType, Deserialize, Serialize, PartialEq, PartialOrd)]
pub struct Settings {
    pub(crate) min_reward_amount: u64,
    pub(crate) min_winners: u64,
    pub(crate) max_winners: u64,
    pub(crate) platform_fees: u64,
}

#[derive(Clone, CandidType, Deserialize, Serialize, Debug)]
pub struct Users {
    pub(crate) twitter_username: String,
    pub(crate) name: String,
    pub(crate) id: Principal,
}

#[derive(Clone, CandidType, Deserialize, Serialize, Debug)]
pub struct Participant {
    pub(crate) user_id: Principal,
    pub(crate) is_verified: bool,
    pub(crate) reward_claimed: bool,
}

#[derive(Clone, CandidType, Deserialize, Serialize)]
pub struct CreateCampaignArgs {
    pub(crate) reward: Tokens,
    pub(crate) reward_token: Principal,
    pub(crate) winners: u64,
    pub(crate) project_name: String,
    pub(crate) tweet_id: String,
    pub(crate) starts_at: u64,
    pub(crate) ends_at: u64,
    pub(crate) user_id: Principal,
}

#[derive(Clone, CandidType, Deserialize, Serialize, Debug)]
pub struct Campaign {
    pub(crate) reward: Tokens,
    pub(crate) reward_token: Principal,
    pub(crate) winners: u64,
    pub(crate) campaign_id: u64,
    pub(crate) project_name: String,
    pub(crate) tweet_id: String,
    pub(crate) starts_at: u64,
    pub(crate) ends_at: u64,
    pub(crate) user_id: Principal,
    pub(crate) participants: BTreeMap<Principal, Participant>,
    pub(crate) selected_winners: BTreeMap<Principal, Participant>,
}

#[derive(CandidType)]
pub enum CommonResult {
    Ok(bool),
    Err(String),
}

#[derive(CandidType)]
pub enum CampaignResult {
    Ok(u64),
    Err(String),
}

#[derive(CandidType, Deserialize)]
pub struct PaginationArgs {
    pub(crate) page_number: usize,
    pub(crate) page_size: usize,
}
#[derive(CandidType)]
pub enum DepositErr {
    BalanceLow,
    TransferFailure,
}

#[derive(CandidType, Debug, PartialEq, Deserialize)]
pub enum TxError {
    InsufficientBalance,
    InsufficientAllowance,
    Unauthorized,
    LedgerTrap,
    AmountTooSmall,
    BlockUsed,
    ErrorOperationStyle,
    ErrorTo,
    Other,
}
pub type TxReceipt = Result<Nat, TxError>;
