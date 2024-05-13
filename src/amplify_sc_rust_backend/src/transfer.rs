use candid::{Nat, Principal};
use ic_cdk::{call, trap};
use ic_cdk::api::call::CallResult;
use ic_ledger_types::{AccountIdentifier, DEFAULT_FEE, DEFAULT_SUBACCOUNT, MAINNET_LEDGER_CANISTER_ID, Memo, Tokens, TransferArgs, TransferResult};
use icrc_ledger_types::icrc1::account::Account;
use icrc_ledger_types::icrc1::transfer::{BlockIndex, TransferArg, TransferError};
use icrc_ledger_types::icrc2::allowance::{Allowance, AllowanceArgs};
use icrc_ledger_types::icrc2::transfer_from::{TransferFromArgs, TransferFromError};

use crate::STATE;
use crate::types::TransferErr;
use crate::utils::{caller, principal_to_icrc1_subaccount, principal_to_subaccount};

pub async fn deposit_icp(token: Principal, deposit_amount: Tokens, winners: u64) -> Result<bool,String> {
    let whitelisted_token = STATE
        .with(|s| s.borrow().whitelisted_tokens.get(&token).cloned())
        .ok_or_else(|| "Reward token is not whitelisted.".to_string())?;

    let mut amount = deposit_amount;
    let caller = caller().unwrap_or_else(|e| trap(&e));
    let canister_id = ic_cdk::api::id();
    let mut fee = DEFAULT_FEE;
    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);
    let mut platform_fee = STATE
        .with(|s| s.borrow().settings.platform_fees);
    let platform_fee_owner = STATE
        .with(|s| s.borrow().settings.platform_fee_owner);

    let deposit_account = AccountIdentifier::new(&canister_id, &principal_to_subaccount(&caller));

    if platform_fee > 0 {
        let platform_account = AccountIdentifier::new(&platform_fee_owner, &DEFAULT_SUBACCOUNT);
        let balance_args = ic_ledger_types::AccountBalanceArgs { account: deposit_account  };
        let balance = ic_ledger_types::account_balance(ledger_canister_id, balance_args)
            .await
            .map_err(|_| format!("Balance Fetch Error: {}", TransferErr::TransferFailure))?;

        if balance.e8s() < (fee.e8s() + platform_fee) {
            return Err(format!("Fee Error: {}", TransferErr::BalanceLow { balance }));
        }

        let fee_transfer_args = TransferArgs {
            memo: Memo(0),
            amount: Tokens::from_e8s(platform_fee),
            fee,
            from_subaccount: Some(principal_to_subaccount(&caller)),
            to: platform_account,
            created_at_time: None,
        };
        icp_transfer(ledger_canister_id, fee_transfer_args)
            .await
            .map_err(|e| format!("Fee transfer Failed, Reason: {}", e))?;
    }

    match whitelisted_token.token_type.as_str() {
        "icp" => {
            let transfer_args = TransferArgs {
                memo: Memo(0),
                amount: amount + Tokens::from_e8s(winners * fee.e8s()),
                fee,
                from_subaccount: Some(principal_to_subaccount(&caller)),
                to: AccountIdentifier::new(&canister_id, &DEFAULT_SUBACCOUNT),
                created_at_time: None,
            };
            icp_transfer(whitelisted_token.token, transfer_args)
                .await
                .map_err(|e| format!("ICP transfer Failed, Reason: {}", e))?;
        },
        "icrc1" => {
            let mut fee = Tokens::from_e8s(0);
            let call_result: Result<(Nat,), _> =
                call(token, "icrc1_fee", ()).await;

            match call_result {
                Ok(v) => {
                    let conversion_result: Result<u64, _> = (v.0.to_owned()).0.try_into();
                    match conversion_result {
                        Ok(value) => fee = Tokens::from_e8s(value),
                        Err(_) => return Err("Parse Failed".to_string()),
                    };
                }
                Err(_) => {}
            }
            let transfer_icrc1_args = TransferArg {
                memo: Some(icrc_ledger_types::icrc1::transfer::Memo::from(0)),
                amount: Nat::from(amount.e8s() + (fee.e8s() * winners)),
                fee: Some(Nat::from(fee.e8s())),
                from_subaccount: Some(principal_to_icrc1_subaccount(&caller)),
                to: Account::from(canister_id),
                created_at_time: None,
            };
            icrc1_transfer(whitelisted_token.token, transfer_icrc1_args)
                .await
                .map_err(|e| format!("ICRC1 transfer Failed, Reason: {}", e))?;
        },
        "icrc2" => {
            let mut fee = Tokens::from_e8s(0);
            let call_result: Result<(Nat,), _> =
                call(token, "icrc1_fee", ()).await;

            match call_result {
                Ok(v) => {
                    let conversion_result: Result<u64, _> = (v.0.to_owned()).0.try_into();
                    match conversion_result {
                        Ok(value) => fee = Tokens::from_e8s(value),
                        Err(_) => return Err("Parse Failed".to_string()),
                    };
                }
                Err(_) => {}
            }
            let transfer_icrc2_args = TransferFromArgs {
                memo: None,
                amount: Nat::from(amount.e8s() + (fee.e8s() * winners)),
                fee: Some(Nat::from(fee.e8s())),
                spender_subaccount: None,
                from: Account::from(caller),
                to: Account::from(canister_id),
                created_at_time: None,
            };
            icrc2_deposit(whitelisted_token.token, transfer_icrc2_args, caller)
                .await
                .map_err(|e| format!("ICRC2 transfer Failed, Reason: {}", e))?;
        },
        _ => {}
    }
    return Ok(true)
}

pub async fn withdraw_icp(token: Principal, amount: Tokens, to: Principal) -> Result<bool,String> {
    let whitelisted_token = STATE
        .with(|s| s.borrow().whitelisted_tokens.get(&token).cloned())
        .ok_or_else(|| "Reward token is not whitelisted.".to_string())?;

    let canister_id = ic_cdk::api::id();
    let mut fee = DEFAULT_FEE;

    match whitelisted_token.token_type.as_str() {
        "icp" => {
            let transfer_args = TransferArgs {
                memo: Memo(0),
                amount,
                fee,
                from_subaccount: None,
                to: AccountIdentifier::new(&to, &DEFAULT_SUBACCOUNT),
                created_at_time: None,
            };
            icp_transfer(whitelisted_token.token, transfer_args)
                .await
                .map_err(|e| format!("ICP transfer Failed, Reason: {}", e))?;
        },
        "icrc1" => {
            let mut fee = Tokens::from_e8s(0);
            let call_result: Result<(Nat,), _> =
                call(token, "icrc1_fee", ()).await;

            match call_result {
                Ok(v) => {
                    let conversion_result: Result<u64, _> = (v.0.to_owned()).0.try_into();
                    match conversion_result {
                        Ok(value) => fee = Tokens::from_e8s(value),
                        Err(_) => return Err("Parse Failed".to_string()),
                    };
                }
                Err(_) => {}
            }
            let transfer_icrc1_args = TransferArg {
                memo: Some(icrc_ledger_types::icrc1::transfer::Memo::from(0)),
                amount: Nat::from(amount.e8s()),
                fee: Some(Nat::from(fee.e8s())),
                from_subaccount: None,
                to: Account::from(to),
                created_at_time: None,
            };
            icrc1_transfer(whitelisted_token.token, transfer_icrc1_args)
                .await
                .map_err(|e| format!("ICRC1 transfer Failed, Reason: {}", e))?;
        },
        "icrc2" => {
            let mut fee = Tokens::from_e8s(0);
            let call_result: Result<(Nat,), _> =
                call(token, "icrc1_fee", ()).await;

            match call_result {
                Ok(v) => {
                    let conversion_result: Result<u64, _> = (v.0.to_owned()).0.try_into();
                    match conversion_result {
                        Ok(value) => fee = Tokens::from_e8s(value),
                        Err(_) => return Err("Parse Failed".to_string()),
                    };
                }
                Err(_) => {}
            }
            let transfer_icrc2_args = TransferArg {
                memo: Some(icrc_ledger_types::icrc1::transfer::Memo::from(0)),
                amount: Nat::from(amount.e8s()),
                fee: Some(Nat::from(fee.e8s())),
                from_subaccount: None,
                to: Account::from(to),
                created_at_time: None,
            };
            icrc1_transfer(whitelisted_token.token, transfer_icrc2_args)
                .await
                .map_err(|e| format!("ICRC2 transfer Failed, Reason: {}", e))?;
        },
        _ => {}
    }
    return Ok(true)
}

pub async fn transfer(
    ledger_canister_id: Principal,
    args: TransferArgs,
) -> CallResult<TransferResult> {
    let (result,) = ic_cdk::call(ledger_canister_id, "transfer", (args,)).await?;
    Ok(result)
}

pub type Icrc1TransferResult = Result<BlockIndex, TransferError>;
pub type Icrc2TransferResult = Result<BlockIndex, TransferFromError>;
pub async fn transfer_icrc2_tokens(
    token: Principal,
    args: TransferFromArgs,
) -> CallResult<Icrc2TransferResult> {
    let (result,) = call(token, "icrc2_transfer_from", (args,)).await?;
    Ok(result)
}

pub async fn transfer_icrc1_tokens(
    token: Principal,
    args: TransferArg,
) -> CallResult<Icrc1TransferResult> {
    let (result,) = call(token, "icrc1_transfer", (args,)).await?;
    Ok(result)
}

pub async fn account_allowance(
    ledger_canister_id: Principal,
    args: AllowanceArgs,
) -> CallResult<Allowance> {
    let (icp,) = call(ledger_canister_id, "icrc2_allowance", (args,)).await?;
    Ok(icp)
}

pub async fn icp_transfer(token: Principal, transfer_args: TransferArgs) -> Result<bool,String> {
    ic_ledger_types::transfer(token, transfer_args)
        .await
        .map_err(|e| format!("{}", e.1))?
        .map_err(|e| format!("{}", e))?;
    return Ok(true)
}

pub async fn icrc1_transfer(token: Principal, transfer_args: TransferArg) -> Result<bool,String> {
    transfer_icrc1_tokens(token, transfer_args)
        .await
        .map_err(|e| format!("{}", e.1))?
        .map_err(|e| format!("{}", e))?;

    return Ok(true)
}

pub async fn icrc2_deposit(token: Principal, transfer_args: TransferFromArgs, caller: Principal) -> Result<bool,String> {
    let canister_id = ic_cdk::api::id();

    let allowance_args = AllowanceArgs {
        account: Account::from(caller),
        spender: Account::from(canister_id),
    };
    let allowance_result: Allowance =
        account_allowance(token,allowance_args)
            .await
            .map_err(|_| format!("Allowance Fetch Error: {}", TransferErr::TransferFailure))?;

    if allowance_result.allowance < transfer_args.amount {
        return Err(format!("Allowance Error: {}", TransferErr::AllowanceLow { allowance: allowance_result.allowance, expected: transfer_args.amount + transfer_args.fee.unwrap_or_default() }));
    }

    transfer_icrc2_tokens(token, transfer_args)
        .await
        .map_err(|e| format!("{}", e.1))?
        .map_err(|e| format!("{}", fmt_transfer_from_error(e)))?;

    return Ok(true)
}

fn fmt_transfer_from_error(error: TransferFromError) -> String {
    match error {
        TransferFromError::BadFee { expected_fee } => {
            format!("transfer fee should be {}", expected_fee)
        },
        TransferFromError::BadBurn { min_burn_amount } => format!(
            "the minimum number of tokens to be burned is {}",
            min_burn_amount
        ),
        TransferFromError::InsufficientFunds { balance } => {
            format!(
                "the debit account doesn't have enough funds to complete the transaction, current balance: {}",
                balance
            )
        },
        TransferFromError::InsufficientAllowance { allowance } => {
            format!(
                "the debit account doesn't have enough allowance to complete the transaction, current balance: {}",
                allowance
            )
        },
        TransferFromError::TooOld {} => "transaction's created_at_time is too far in the past".to_string(),
        TransferFromError::CreatedInFuture { ledger_time } => format!(
            "transaction's created_at_time is in future, current ledger time is {}",
            ledger_time
        ),
        TransferFromError::Duplicate { duplicate_of } => format!(
            "transaction is a duplicate of another transaction in block {}",
            duplicate_of
        ),
        TransferFromError::TemporarilyUnavailable {} => "the ledger is temporarily unavailable".to_string(),
        TransferFromError::GenericError {
            error_code,
            message,
        } => format!("{} {}", error_code, message),
    }
}
