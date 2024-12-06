"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageIndexClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
class StorageIndexClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    user() {
        return this.handleResponse(this.service.user({}), mappers_1.userResponse);
    }
    allocatedBucket(fileHash, fileSize, fileIdSeed) {
        return this.handleResponse(this.service.allocated_bucket_v2({
            file_hash: fileHash,
            file_size: fileSize,
            file_id_seed: fileIdSeed === undefined ? [] : [fileIdSeed],
        }), mappers_1.allocatedBucketResponse);
    }
    canForward(fileHash, fileSize) {
        return this.handleResponse(this.service.can_forward({ file_hash: fileHash, file_size: fileSize }), mappers_1.canForwardResponse);
    }
}
exports.StorageIndexClient = StorageIndexClient;
