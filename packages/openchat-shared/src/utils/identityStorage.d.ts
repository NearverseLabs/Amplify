import { type AuthClientStorage } from "@dfinity/auth-client";
import { DelegationChain, DelegationIdentity, ECDSAKeyIdentity } from "@dfinity/identity";
export declare class IdentityStorage {
    private storage;
    get(authPrincipal: string): Promise<DelegationIdentity | undefined>;
    set(authPrincipal: string, key: ECDSAKeyIdentity, chain: DelegationChain): Promise<void>;
    remove(): Promise<void>;
}
export declare function storeIdentity(storage: AuthClientStorage, key: ECDSAKeyIdentity, chain: DelegationChain): Promise<void>;
