"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataClient = void 0;
const principal_1 = require("@dfinity/principal");
const js_sha3_1 = require("js-sha3");
const chat_1 = require("../../utils/chat");
const openchat_shared_1 = require("openchat-shared");
const storageIndex_client_1 = require("../storageIndex/storageIndex.client");
const storageBucket_client_1 = require("../storageBucket/storageBucket.client");
class DataClient extends EventTarget {
    constructor(identity, agent, config) {
        super();
        this.identity = identity;
        this.agent = agent;
        this.config = config;
        this.storageIndexClient = new storageIndex_client_1.StorageIndexClient(identity, agent, config.openStorageIndexCanister);
    }
    static newBlobId() {
        return (0, openchat_shared_1.random128)();
    }
    storageStatus() {
        return this.storageIndexClient.user().then((resp) => {
            if (resp.kind === "user") {
                return {
                    byteLimit: Number(resp.byteLimit),
                    bytesUsed: Number(resp.bytesUsed),
                };
            }
            else {
                return {
                    byteLimit: 0,
                    bytesUsed: 0,
                };
            }
        });
    }
    async uploadData(content, accessorCanisterIds) {
        let byteLimit = undefined;
        let bytesUsed = undefined;
        let updatedContent = undefined;
        if (content.kind === "file_content" ||
            content.kind === "image_content" ||
            content.kind === "audio_content") {
            if (content.blobData && content.blobReference === undefined) {
                const accessorIds = accessorCanisterIds.map((c) => principal_1.Principal.fromText(c));
                const response = await this.uploadFile(content.mimeType, accessorIds, content.blobData);
                const ref = this.extractBlobReference(response);
                updatedContent = {
                    ...content,
                    blobReference: ref,
                    blobUrl: (0, chat_1.buildBlobUrl)(this.config.blobUrlPattern, ref.canisterId, ref.blobId, "blobs"),
                };
                byteLimit = Number(response.projectedAllowance.byteLimit);
                bytesUsed = Number(response.projectedAllowance.bytesUsedAfterOperation);
            }
        }
        else if (content.kind === "video_content") {
            if (content.videoData.blobData &&
                content.imageData.blobData &&
                content.videoData.blobReference === undefined &&
                content.imageData.blobReference === undefined) {
                const accessorIds = accessorCanisterIds.map((c) => principal_1.Principal.fromText(c));
                await Promise.all([
                    this.uploadFile(content.mimeType, accessorIds, content.videoData.blobData),
                    this.uploadFile("image/jpg", accessorIds, content.imageData.blobData),
                ]).then(([video, image]) => {
                    const videoRef = this.extractBlobReference(video);
                    const imageRef = this.extractBlobReference(image);
                    updatedContent = {
                        ...content,
                        videoData: {
                            ...content.videoData,
                            blobReference: videoRef,
                            blobUrl: (0, chat_1.buildBlobUrl)(this.config.blobUrlPattern, videoRef.canisterId, videoRef.blobId, "blobs"),
                        },
                        imageData: {
                            ...content.imageData,
                            blobReference: imageRef,
                            blobUrl: (0, chat_1.buildBlobUrl)(this.config.blobUrlPattern, imageRef.canisterId, imageRef.blobId, "blobs"),
                        },
                    };
                    byteLimit = Number(video.projectedAllowance.byteLimit);
                    bytesUsed = Number(video.projectedAllowance.bytesUsedAfterOperation +
                        image.projectedAllowance.bytesUsedAfterOperation -
                        image.projectedAllowance.bytesUsed);
                });
            }
        }
        if (bytesUsed !== undefined && byteLimit !== undefined) {
            this.dispatchEvent(new openchat_shared_1.StorageUpdated({
                byteLimit,
                bytesUsed,
            }));
        }
        return updatedContent;
    }
    async forwardData(content, accessorCanisterIds) {
        let byteLimit = undefined;
        let bytesUsed = undefined;
        let updatedContent = undefined;
        let error = undefined;
        if (content.kind === "file_content" ||
            content.kind === "image_content" ||
            content.kind === "audio_content") {
            if (content.blobReference !== undefined) {
                const accessorIds = accessorCanisterIds.map((c) => principal_1.Principal.fromText(c));
                const response = await this.forwardFile(content.blobReference.canisterId, content.blobReference.blobId, accessorIds);
                if (response.kind === "success") {
                    byteLimit = Number(response.projectedAllowance.byteLimit);
                    bytesUsed = Number(response.projectedAllowance.bytesUsedAfterOperation);
                    updatedContent = {
                        ...content,
                        blobReference: {
                            canisterId: content.blobReference.canisterId,
                            blobId: response.newFileId,
                        },
                        blobUrl: (0, chat_1.buildBlobUrl)(this.config.blobUrlPattern, content.blobReference.canisterId, content.blobReference.blobId, "blobs"),
                    };
                }
                else {
                    if (response.kind === "allowance_exceeded") {
                        byteLimit = Number(response.projectedAllowance.byteLimit);
                        bytesUsed = Number(response.projectedAllowance.bytesUsed);
                    }
                    error = response.kind;
                }
            }
        }
        else if (content.kind === "video_content") {
            if (content.videoData.blobReference !== undefined &&
                content.imageData.blobReference !== undefined) {
                const accessorIds = accessorCanisterIds.map((c) => principal_1.Principal.fromText(c));
                const videoCanisterId = content.videoData.blobReference.canisterId;
                const imageCanisterId = content.imageData.blobReference.canisterId;
                await Promise.all([
                    this.forwardFile(videoCanisterId, content.videoData.blobReference.blobId, accessorIds),
                    this.forwardFile(imageCanisterId, content.imageData.blobReference.blobId, accessorIds),
                ]).then(([video, image]) => {
                    if (video.kind === "success" && image.kind === "success") {
                        byteLimit = Number(video.projectedAllowance.byteLimit);
                        bytesUsed = Number(video.projectedAllowance.bytesUsedAfterOperation +
                            image.projectedAllowance.bytesUsedAfterOperation -
                            image.projectedAllowance.bytesUsed);
                        updatedContent = {
                            ...content,
                            videoData: {
                                ...content.videoData,
                                blobReference: {
                                    canisterId: videoCanisterId,
                                    blobId: video.newFileId,
                                },
                                blobUrl: (0, chat_1.buildBlobUrl)(this.config.blobUrlPattern, videoCanisterId, video.newFileId, "blobs"),
                            },
                            imageData: {
                                ...content.imageData,
                                blobReference: {
                                    canisterId: imageCanisterId,
                                    blobId: image.newFileId,
                                },
                                blobUrl: (0, chat_1.buildBlobUrl)(this.config.blobUrlPattern, imageCanisterId, image.newFileId, "blobs"),
                            },
                        };
                    }
                    else if (video.kind === "success") {
                        byteLimit = Number(video.projectedAllowance.byteLimit);
                        bytesUsed = Number(video.projectedAllowance.bytesUsedAfterOperation);
                        error = image.kind;
                    }
                    else {
                        if (video.kind === "allowance_exceeded") {
                            byteLimit = Number(video.projectedAllowance.byteLimit);
                            bytesUsed = Number(video.projectedAllowance.bytesUsed);
                        }
                        error = video.kind;
                    }
                });
            }
        }
        if (bytesUsed !== undefined && byteLimit !== undefined) {
            this.dispatchEvent(new openchat_shared_1.StorageUpdated({
                byteLimit,
                bytesUsed,
            }));
        }
        if (error !== undefined) {
            throw new Error("Unable to forward file: " + error);
        }
        return updatedContent;
    }
    extractBlobReference(response) {
        return {
            canisterId: response.canisterId.toString(),
            blobId: response.fileId,
        };
    }
    async uploadFile(mimeType, accessors, bytes, expiryTimestampMillis, onProgress) {
        const hash = new Uint8Array(hashBytes(bytes));
        const fileSize = bytes.byteLength;
        const allocatedBucketResponse = await this.storageIndexClient.allocatedBucket(hash, BigInt(fileSize), (0, openchat_shared_1.random128)());
        if (allocatedBucketResponse.kind !== "success") {
            throw new Error(allocatedBucketResponse.kind);
        }
        const bucketCanisterId = allocatedBucketResponse.canisterId.toString();
        const fileId = allocatedBucketResponse.fileId;
        const chunkSize = allocatedBucketResponse.chunkSize;
        const chunkCount = Math.ceil(fileSize / chunkSize);
        const chunkIndexes = [...Array(chunkCount).keys()];
        const bucketClient = new storageBucket_client_1.StorageBucketClient(this.identity, this.agent, bucketCanisterId);
        let chunksCompleted = 0;
        const promises = chunkIndexes.map(async (chunkIndex) => {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, fileSize);
            const chunkBytes = new Uint8Array(bytes.slice(start, end));
            let attempt = 0;
            while (attempt++ < 5) {
                try {
                    const chunkResponse = await bucketClient.uploadChunk(fileId, hash, mimeType, accessors, BigInt(fileSize), chunkSize, chunkIndex, chunkBytes, expiryTimestampMillis);
                    if (chunkResponse === "success") {
                        chunksCompleted++;
                        onProgress?.((100 * chunksCompleted) / chunkCount);
                        return;
                    }
                }
                catch (e) {
                    console.log("Error uploading chunk " + chunkIndex, e);
                }
            }
            throw new Error("Failed to upload chunk");
        });
        await Promise.all(promises);
        return {
            canisterId: bucketCanisterId,
            fileId,
            pathPrefix: "/files/",
            projectedAllowance: allocatedBucketResponse.projectedAllowance,
        };
    }
    async forwardFile(bucketCanisterId, fileId, accessors) {
        const bucketClient = new storageBucket_client_1.StorageBucketClient(this.identity, this.agent, bucketCanisterId);
        const fileInfoResponse = await bucketClient.fileInfo(fileId);
        if (fileInfoResponse.kind === "file_not_found") {
            return fileInfoResponse;
        }
        const canForwardResponse = await this.storageIndexClient.canForward(fileInfoResponse.fileHash, fileInfoResponse.fileSize);
        switch (canForwardResponse.kind) {
            case "user_not_found":
            case "allowance_exceeded":
                return canForwardResponse;
        }
        const forwardFileResponse = await bucketClient.forwardFile(fileId, accessors);
        switch (forwardFileResponse.kind) {
            case "success":
                return {
                    kind: "success",
                    newFileId: forwardFileResponse.newFileId,
                    projectedAllowance: canForwardResponse.projectedAllowance,
                };
            case "not_authorized":
            case "file_not_found":
                return forwardFileResponse;
        }
    }
}
exports.DataClient = DataClient;
function hashBytes(bytes) {
    const hash = js_sha3_1.sha3_256.create();
    hash.update(bytes);
    return hash.arrayBuffer();
}
