import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
export declare class LedgerClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    accountBalance(principal: string): Promise<bigint>;
}
