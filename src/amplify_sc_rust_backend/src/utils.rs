use std::convert::TryInto;

use candid::Principal;
use ic_ledger_types::Subaccount;
use icrc_ledger_types::icrc1::account::Subaccount as ICRC1Subaccount;

// use num_bigint::BigUint;
// use num_traits::Zero;
//
// pub fn zero() -> Nat {
//     Nat(BigUint::zero())
// }

pub fn principal_to_subaccount(principal_id: &Principal) -> Subaccount {
    let mut subaccount = [0; std::mem::size_of::<Subaccount>()];
    let principal_id = principal_id.as_slice();
    subaccount[0] = principal_id.len().try_into().unwrap();
    subaccount[1..1 + principal_id.len()].copy_from_slice(principal_id);

    Subaccount(subaccount)
}
pub fn principal_to_icrc1_subaccount(principal_id: &Principal) -> ICRC1Subaccount {
    let mut subaccount = [0; std::mem::size_of::<ICRC1Subaccount>()];
    let principal_id = principal_id.as_slice();
    subaccount[0] = principal_id.len().try_into().unwrap();
    subaccount[1..1 + principal_id.len()].copy_from_slice(principal_id);

    subaccount
}

pub fn caller() -> Result<Principal, String> {
    let caller = ic_cdk::caller();
    // The anonymous principal is not allowed to interact with canister.
    if caller == Principal::anonymous() {
        Err(String::from(
            "Anonymous principal not allowed to make calls.",
        ))
    } else {
        Ok(caller)
    }
}