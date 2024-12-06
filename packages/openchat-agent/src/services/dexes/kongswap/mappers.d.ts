import type { ApiSwapAmountsResult, ApiTokensResult } from "./candid/idl";
export declare function tokensResponse(candid: ApiTokensResult): string[];
export declare function swapAmountsResponse(candid: ApiSwapAmountsResult): bigint;
