"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResponse = exports.canForwardResponse = exports.allocatedBucketResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
function allocatedBucketResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "success",
            canisterId: candid.Success.canister_id,
            fileId: candid.Success.file_id,
            chunkSize: candid.Success.chunk_size,
            projectedAllowance: projectedAllowance(candid.Success.projected_allowance),
        };
    }
    if ("AllowanceExceeded" in candid) {
        return allowanceExceeded(candid.AllowanceExceeded);
    }
    if ("UserNotFound" in candid) {
        return userNotFound();
    }
    if ("BucketUnavailable" in candid) {
        return {
            kind: "bucket_unavailable",
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown Index.CandidAllocatedBucketResponse type received", candid);
}
exports.allocatedBucketResponse = allocatedBucketResponse;
function canForwardResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "success",
            projectedAllowance: projectedAllowance(candid.Success),
        };
    }
    if ("AllowanceExceeded" in candid) {
        return allowanceExceeded(candid.AllowanceExceeded);
    }
    if ("UserNotFound" in candid) {
        return userNotFound();
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown Index.CandidCanForwardResponse type received", candid);
}
exports.canForwardResponse = canForwardResponse;
function userResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "user",
            byteLimit: candid.Success.byte_limit,
            bytesUsed: candid.Success.bytes_used,
        };
    }
    if ("UserNotFound" in candid) {
        return userNotFound();
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown Index.CandidUserResponse type received", candid);
}
exports.userResponse = userResponse;
function allowanceExceeded(candid) {
    return {
        kind: "allowance_exceeded",
        projectedAllowance: projectedAllowance(candid)
    };
}
function userNotFound() {
    return { kind: "user_not_found" };
}
function projectedAllowance(candid) {
    return {
        byteLimit: candid.byte_limit,
        bytesUsed: candid.bytes_used,
        bytesUsedAfterOperation: candid.bytes_used_after_operation,
    };
}
