import type { AuthClientStorage } from "@dfinity/auth-client";
export declare enum AuthProvider {
    II = "Internet Identity",
    EMAIL = "Email",
    ETH = "Ethereum",
    SOL = "Solana",
    NFID = "Google via NFID"
}
export declare class InMemoryAuthClientStorage implements AuthClientStorage {
    private _map;
    constructor();
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
}
