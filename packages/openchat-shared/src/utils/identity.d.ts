import { type Delegation, DelegationIdentity } from "@dfinity/identity";
import { type Signature, SignIdentity } from "@dfinity/agent";
export declare function buildDelegationIdentity(userKey: Uint8Array, sessionKey: SignIdentity, delegation: Delegation, signature: Signature): DelegationIdentity;
export declare function toDer(key: SignIdentity): Uint8Array;
