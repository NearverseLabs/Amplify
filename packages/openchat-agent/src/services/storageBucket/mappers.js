"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileInfoResponse = exports.deleteFileResponse = exports.forwardFileResponse = exports.uploadChunkResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
function uploadChunkResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    if ("FileAlreadyExists" in candid) {
        return "file_already_exists";
    }
    if ("FileTooBig" in candid) {
        return "file_too_big";
    }
    if ("FileExpired" in candid) {
        return "file_expired";
    }
    if ("ChunkAlreadyExists" in candid) {
        return "chunk_already_exists";
    }
    if ("ChunkSizeMismatch" in candid) {
        return "chunk_size_mismatch";
    }
    if ("ChunkIndexTooHigh" in candid) {
        return "chunk_index_too_high";
    }
    if ("AllowanceExceeded" in candid) {
        return "allowance_exceeded";
    }
    if ("UserNotFound" in candid) {
        return "user_not_found";
    }
    if ("HashMismatch" in candid) {
        return "hash_mismatch";
    }
    if ("InvalidFileId" in candid) {
        return "invalid_file_id";
    }
    if ("Full" in candid) {
        return "full";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown Bucket.CandidUploadChunkResponse type received", candid);
}
exports.uploadChunkResponse = uploadChunkResponse;
function forwardFileResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "success",
            newFileId: candid.Success,
        };
    }
    if ("NotAuthorized" in candid) {
        return { kind: "not_authorized" };
    }
    if ("NotFound" in candid) {
        return { kind: "file_not_found" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown Bucket.CandidForwardFileResponse type received", candid);
}
exports.forwardFileResponse = forwardFileResponse;
function deleteFileResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    if ("NotAuthorized" in candid) {
        return "not_authorized";
    }
    if ("NotFound" in candid) {
        return "file_not_found";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown Bucket.CandidDeleteFileResponse type received", candid);
}
exports.deleteFileResponse = deleteFileResponse;
function fileInfoResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "success",
            isOwner: candid.Success.is_owner,
            fileSize: candid.Success.file_size,
            fileHash: Array.isArray(candid.Success.file_hash)
                ? new Uint8Array(candid.Success.file_hash)
                : candid.Success.file_hash,
        };
    }
    if ("NotFound" in candid) {
        return { kind: "file_not_found" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown Bucket.CandidFileInfoResponse type received", candid);
}
exports.fileInfoResponse = fileInfoResponse;
