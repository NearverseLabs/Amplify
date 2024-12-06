import type { ApiPairInfo } from "./candid/idl";
import type { TokenSwapPool } from "openchat-shared";
export declare function getAllPairsResponse(candid: ApiPairInfo[], canisterId: string): TokenSwapPool[];
export declare function getPairResponse(candid: [ApiPairInfo] | []): TokenPair | undefined;
export type TokenPair = {
    token0: string;
    reserve0: bigint;
    token1: string;
    reserve1: bigint;
};
