import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../../candidService";
import type { TokenSwapPool } from "openchat-shared";
import type { SwapIndexClient, SwapPoolClient } from "../index";
export declare class KongSwapClient extends CandidService implements SwapIndexClient, SwapPoolClient {
    private service;
    constructor(identity: Identity, agent: HttpAgent);
    getPoolClient(_canisterId: string, _token0: string, _token1: string): SwapPoolClient;
    getPools(): Promise<TokenSwapPool[]>;
    quote(inputToken: string, outputToken: string, amountIn: bigint): Promise<bigint>;
}
