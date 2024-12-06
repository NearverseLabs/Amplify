import type { HttpAgent, Identity } from "@dfinity/agent";
import type { UpdateMarketMakerConfigArgs, UpdateMarketMakerConfigResponse } from "openchat-shared";
import { CandidService } from "../candidService";
export declare class MarketMakerClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    updateConfig(config: UpdateMarketMakerConfigArgs): Promise<UpdateMarketMakerConfigResponse>;
}
