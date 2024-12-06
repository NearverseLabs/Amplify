import type { Identity } from "@dfinity/agent";
import type { DelegationChain } from "@dfinity/identity";
import type { Principal } from "@dfinity/principal";
import { SignedDelegation as TSignedDelegation } from "../typebox";
export declare function getIdentity(): Promise<Identity | undefined>;
export declare function getPrincipal(): Promise<Principal>;
export declare function signedDelegation(chain: DelegationChain): TSignedDelegation;
