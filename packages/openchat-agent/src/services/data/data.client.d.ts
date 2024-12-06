import type { HttpAgent, Identity } from "@dfinity/agent";
import type { AgentConfig } from "../../config";
import type { StorageStatus, MessageContent, StoredMediaContent, BlobReference, UploadFileResponse } from "openchat-shared";
export declare class DataClient extends EventTarget {
    private identity;
    private agent;
    private config;
    private storageIndexClient;
    constructor(identity: Identity, agent: HttpAgent, config: AgentConfig);
    static newBlobId(): bigint;
    storageStatus(): Promise<StorageStatus>;
    uploadData(content: MessageContent, accessorCanisterIds: string[]): Promise<StoredMediaContent | undefined>;
    forwardData(content: MessageContent, accessorCanisterIds: string[]): Promise<StoredMediaContent | undefined>;
    extractBlobReference(response: UploadFileResponse): BlobReference;
    private uploadFile;
    private forwardFile;
}
