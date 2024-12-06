import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
import type { AllocatedBucketResponse, CanForwardResponse, StorageUserResponse } from "openchat-shared";
export declare class StorageIndexClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    user(): Promise<StorageUserResponse>;
    allocatedBucket(fileHash: Uint8Array, fileSize: bigint, fileIdSeed: bigint | undefined): Promise<AllocatedBucketResponse>;
    canForward(fileHash: Uint8Array, fileSize: bigint): Promise<CanForwardResponse>;
}
