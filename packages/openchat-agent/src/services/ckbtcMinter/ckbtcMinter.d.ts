import type { HttpAgent, Identity } from "@dfinity/agent";
import type { UpdateBtcBalanceResponse } from "openchat-shared";
import { CandidService } from "../candidService";
export declare class CkbtcMinterClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent);
    updateBalance(userId: string): Promise<UpdateBtcBalanceResponse>;
}
