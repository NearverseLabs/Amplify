import { type HttpAgent } from "@dfinity/agent";
import type { DexId, TokenSwapPool } from "openchat-shared";
export declare class DexesAgent {
    private agent;
    private _identity;
    private _swapIndexClients;
    private _poolsCache;
    constructor(agent: HttpAgent);
    getSwapPools(inputToken: string, outputTokens: Set<string>, swapProviders: DexId[]): Promise<TokenSwapPool[]>;
    canSwap(tokens: Set<string>, swapProviders: DexId[]): Promise<Set<string>>;
    quoteSwap(inputToken: string, outputToken: string, amountIn: bigint, swapProviders: DexId[]): Promise<[DexId, bigint][]>;
    private getAllSwapPools;
    private quoteSingle;
    private tryGetAllSwapPoolsFromCache;
}
export interface SwapIndexClient {
    getPoolClient(canisterId: string, token0: string, token1: string): SwapPoolClient;
    getPools(): Promise<TokenSwapPool[]>;
}
export interface SwapPoolClient {
    quote(inputToken: string, outputToken: string, amountIn: bigint): Promise<bigint>;
}
