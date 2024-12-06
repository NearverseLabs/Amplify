import type { TokenExchangeRates } from "openchat-shared";
import type { LatestTokenRow } from "./candid/types";
export declare function getLatestResponse(candid: Array<LatestTokenRow>): Record<string, TokenExchangeRates>;
