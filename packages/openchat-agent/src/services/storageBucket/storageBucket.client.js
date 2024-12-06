"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageBucketClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
class StorageBucketClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    uploadChunk(fileId, hash, mimeType, accessors, totalSize, chunkSize, chunkIndex, bytes, expiryTimestampMillis) {
        return this.handleResponse(this.service.upload_chunk_v2({
            accessors,
            chunk_index: chunkIndex,
            file_id: fileId,
            hash,
            mime_type: mimeType,
            total_size: totalSize,
            bytes,
            chunk_size: chunkSize,
            expiry: expiryTimestampMillis !== undefined ? [expiryTimestampMillis] : [],
        }), mappers_1.uploadChunkResponse);
    }
    forwardFile(fileId, accessors) {
        return this.handleResponse(this.service.forward_file({ file_id: fileId, accessors }), mappers_1.forwardFileResponse);
    }
    deleteFile(fileId) {
        return this.handleResponse(this.service.delete_file({ file_id: fileId }), mappers_1.deleteFileResponse);
    }
    fileInfo(fileId) {
        return this.handleResponse(this.service.file_info({ file_id: fileId }), mappers_1.fileInfoResponse);
    }
}
exports.StorageBucketClient = StorageBucketClient;
