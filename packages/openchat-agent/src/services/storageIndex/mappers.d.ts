import type { CandidAllocatedBucketResponse, CandidCanForwardResponse, CandidUserResponse } from "./candid/idl";
import type { AllocatedBucketResponse, CanForwardResponse, StorageUserResponse } from "openchat-shared";
export declare function allocatedBucketResponse(candid: CandidAllocatedBucketResponse): AllocatedBucketResponse;
export declare function canForwardResponse(candid: CandidCanForwardResponse): CanForwardResponse;
export declare function userResponse(candid: CandidUserResponse): StorageUserResponse;
