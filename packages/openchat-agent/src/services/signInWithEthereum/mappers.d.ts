import type { ApiGetDelegationResponse, ApiLoginResponse, ApiPrepareLoginResponse } from "./candid/idl";
import { type GetDelegationResponse, type PrepareDelegationResponse, type SiwePrepareLoginResponse } from "openchat-shared";
export declare function prepareLoginResponse(candid: ApiPrepareLoginResponse): SiwePrepareLoginResponse;
export declare function loginResponse(candid: ApiLoginResponse): PrepareDelegationResponse;
export declare function getDelegationResponse(candid: ApiGetDelegationResponse): GetDelegationResponse;
