import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
import type { ApproveResponse, MarkDeployedResponse, PendingDeploymentResponse, ProposedResponse, ProposeResponse, RejectReason, RejectResponse } from "openchat-shared";
export declare class TranslationsClient extends CandidService {
    private translationService;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    propose(locale: string, key: string, value: string): Promise<ProposeResponse>;
    approve(id: bigint): Promise<ApproveResponse>;
    reject(id: bigint, reason: RejectReason): Promise<RejectResponse>;
    markDeployed(): Promise<MarkDeployedResponse>;
    proposed(): Promise<ProposedResponse>;
    pendingDeployment(): Promise<PendingDeploymentResponse>;
}
