use std::collections::BTreeMap;
use std::fmt;
use std::fmt::{Display, Formatter};

use candid::{CandidType, Nat, Principal};
use ic_ledger_types::{AccountIdentifier, Subaccount, Timestamp, Tokens};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct StateStorage {
    pub owner: Option<Principal>,
    pub service_account: Option<Principal>,
    pub ledger: Option<Principal>,
    pub users: BTreeMap<Principal, Users>,
    pub campaigns: BTreeMap<u64, Campaign>,
    pub whitelisted_tokens: BTreeMap<Principal, WhiteListedToken>,
    pub settings: Settings,
    pub total_users: u64,
    pub total_campaigns: u64,
    pub usernames: BTreeMap<String, Principal>,
}

#[derive(Clone, CandidType, Deserialize, Serialize, Debug)]
pub struct WhiteListedToken {
    pub(crate) token: Principal,
    pub(crate) min_reward: u64,
    pub(crate) token_type: String,
}

#[derive(Clone, Copy, Debug, CandidType, Deserialize, Serialize, PartialEq, PartialOrd)]
pub struct Settings {
    pub(crate) min_winners: u64,
    pub(crate) max_winners: u64,
    pub(crate) platform_fees: u64,
    pub(crate) platform_fee_owner: Principal,
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

#[derive(CandidType, Deserialize, Clone, Debug)]
pub enum CampaignStatus {
    Upcoming,
    Live,
    Ended,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct CampaignFilter {
    pub project_name: Option<String>,
    pub reward_token: Option<Principal>,
    pub my_created_campaigns: Option<Principal>,
    pub my_participated_campaigns: Option<Principal>,
    pub to_be_verified: Option<bool>,
    pub my_claimed_campaigns: Option<Principal>,
    pub my_unclaimed_campaigns: Option<Principal>,
    pub status: Option<CampaignStatus>,
}

#[derive(Clone, CandidType, Deserialize, Serialize, Debug)]
pub struct CreateCampaignRequirements {
    pub(crate) follow: bool,
    pub(crate) like: bool,
    pub(crate) retweet: bool,
    pub(crate) quote_retweet: bool,
    pub(crate) tweet_reply: bool,
}
#[derive(Clone, CandidType, Deserialize, Serialize)]
pub struct CreateCampaignArgs {
    pub(crate) requirements: CreateCampaignRequirements,
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
    pub(crate) requirements: CreateCampaignRequirements,
    pub(crate) reward: Tokens,
    pub(crate) reward_token: Principal,
    pub(crate) winners: u64,
    pub(crate) campaign_id: u64,
    pub(crate) project_name: String,
    pub(crate) tweet_id: String,
    pub(crate) starts_at: u64,
    pub(crate) ends_at: u64,
    pub(crate) total_withdrawn: u64,
    pub(crate) is_verified: bool,
    pub(crate) is_deposited: bool,
    pub(crate) user_id: Principal,
    pub(crate) participants: BTreeMap<Principal, Participant>,
    pub(crate) selected_winners: BTreeMap<Principal, Participant>,
}

#[derive(Clone, CandidType, Deserialize, Serialize, Debug)]
pub struct UserCampaign {
    pub(crate) campaign: Campaign,
    pub(crate) participated: bool,
    pub(crate) won: bool,
    pub(crate) total_participants: u64,
}

impl Campaign {
    pub(crate) fn to_create_campaign_args(&self) -> CreateCampaignArgs {
        CreateCampaignArgs {
            requirements: self.requirements.clone(),
            reward: self.reward.clone(),
            reward_token: self.reward_token,
            winners: self.winners,
            project_name: self.project_name.clone(),
            tweet_id: self.tweet_id.clone(),
            starts_at: self.starts_at,
            ends_at: self.ends_at,
            user_id: self.user_id,
        }
    }
    pub(crate) fn without_participants_and_winners(&self) -> Campaign {
        Campaign {
            requirements: self.requirements.clone(),
            reward: self.reward.clone(),
            reward_token: self.reward_token,
            winners: self.winners,
            campaign_id: self.campaign_id.clone(),
            project_name: self.project_name.clone(),
            tweet_id: self.tweet_id.clone(),
            starts_at: self.starts_at,
            ends_at: self.ends_at,
            user_id: self.user_id,
            total_withdrawn: self.total_withdrawn.clone(),
            is_verified: self.is_verified,
            participants: BTreeMap::new(),
            selected_winners: BTreeMap::new(),
            is_deposited: self.is_deposited,
        }
    }
}


#[derive(Clone, Debug)]
pub struct PaginationParams {
    pub(crate) page_number: usize, // Starting from 0 or 1 based on your preference
    pub(crate) page_size: usize,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub enum CommonResult {
    Ok(bool),
    Err(String),
}
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub enum WhiteListedTokenResult {
    Ok(bool),
    Err(String),
}
#[derive(CandidType)]
pub enum CommonResultUser {
    Ok(Users),
    Err(String),
}
#[derive(CandidType)]
pub enum CommonResultCampaign {
    Ok(Campaign),
    Err(String),
}
#[derive(CandidType)]
pub enum CommonResultCampaigns {
    Ok(Vec<Campaign>),
    Err(String),
}
#[derive(CandidType)]
pub enum CommonResultUsers {
    Ok(Option<Users>),
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
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub enum TransferErr {
    BalanceLow {
        balance: Tokens
    },
    AllowanceLow {
        allowance: Nat,
        expected: Nat
    },
    TransferFailure,
}

impl Display for TransferErr {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self {
            Self::TransferFailure {  } => {
                write!(f, "transaction failed because of unknown reasons")
            }
            Self::BalanceLow { balance } => {
                write!(
                    f,
                    "the debit account doesn't have enough funds to complete the transaction, current balance: {}",
                    balance
                )
            }
            Self::AllowanceLow { allowance, expected } => {
                write!(
                    f,
                    "the debit account doesn't have enough allowance to complete the transaction, current allowance: {}, expected: {}",
                    allowance, expected
                )
            }
        }
    }
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

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct TransferTokenArgs {
    /// Transaction memo.
    memo: Option<Vec<u8>>,
    /// The amount that the caller wants to transfer to the destination address.
    pub amount: Tokens,
    /// The amount that the caller pays for the transaction.
    /// Must be 10000 e8s.
    pub fee: Option<Tokens>,
    /// The subaccount from which the caller wants to transfer funds.
    /// If `None`, the ledger uses the default (all zeros) subaccount to compute the source address.
    /// See docs for the [`Subaccount`] type.
    pub from_subaccount: Option<Subaccount>,
    /// The destination account.
    /// If the transfer is successful, the balance of this address increases by `amount`.
    pub to: AccountIdentifier,
    /// The point in time when the caller created this request.
    /// If `None`, the ledger uses the current IC time as the timestamp.
    /// Transactions more than one day old will be rejected.
    pub created_at_time: Option<Timestamp>,
}