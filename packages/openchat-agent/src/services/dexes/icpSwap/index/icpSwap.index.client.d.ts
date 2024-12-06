import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../../../candidService";
import type { TokenSwapPool } from "openchat-shared";
import type { SwapIndexClient, SwapPoolClient } from "../../index";
export declare class IcpSwapIndexClient extends CandidService implements SwapIndexClient {
    private service;
    constructor(identity: Identity, agent: HttpAgent);
    getPoolClient(canisterId: string, token0: string, token1: string): SwapPoolClient;
    getPools(): Promise<TokenSwapPool[]>;
}
