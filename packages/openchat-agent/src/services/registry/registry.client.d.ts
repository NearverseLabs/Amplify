import type { HttpAgent, Identity } from "@dfinity/agent";
import type { DexId, RegistryUpdatesResponse } from "openchat-shared";
import { CandidService } from "../candidService";
export declare class RegistryClient extends CandidService {
    private readonly blobUrlPattern;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string, blobUrlPattern: string);
    updates(since?: bigint): Promise<RegistryUpdatesResponse>;
    addRemoveSwapProvider(swapProvider: DexId, add: boolean): Promise<boolean>;
    addMessageFilter(regex: string): Promise<boolean>;
    removeMessageFilter(id: bigint): Promise<boolean>;
    setTokenEnabled(ledger: string, enabled: boolean): Promise<boolean>;
}
