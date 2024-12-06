import { type UpdateBtcBalanceResponse } from "openchat-shared";
import type { ApiUpdateBalanceError, ApiUtxoStatus } from "./candid/idl";
export declare function updateBtcBalanceResponse(candid: {
    Ok: Array<ApiUtxoStatus>;
} | {
    Err: ApiUpdateBalanceError;
}): UpdateBtcBalanceResponse;
