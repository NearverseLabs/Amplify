import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
import type { AccountTransactionResult } from "openchat-shared";
export declare class IcpLedgerIndexClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    getAccountTransactions(principal: string, fromId?: bigint): Promise<AccountTransactionResult>;
}
