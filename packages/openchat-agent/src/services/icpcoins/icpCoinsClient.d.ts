import type { HttpAgent, Identity } from "@dfinity/agent";
import type { TokenExchangeRates } from "openchat-shared";
import { CandidService } from "../candidService";
export declare class IcpCoinsClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent);
    exchangeRates(): Promise<Record<string, TokenExchangeRates>>;
}
