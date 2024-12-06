import { type ApproveResponse, type MarkDeployedResponse, type PendingDeploymentResponse, type ProposeResponse, type ProposedResponse, type RejectReason, type RejectResponse } from "openchat-shared";
import type { ApiApproveResponse, ApiMarkDeployedResponse, ApiPendingDeploymentResponse, ApiProposeResponse, ApiProposedResponse, ApiRejectReason, ApiRejectResponse } from "./candid/idl";
export declare function proposedResponse(candid: ApiProposedResponse): ProposedResponse;
export declare function pendingDeploymentResponse(candid: ApiPendingDeploymentResponse): PendingDeploymentResponse;
export declare function proposeResponse(candid: ApiProposeResponse): ProposeResponse;
export declare function approveResponse(candid: ApiApproveResponse): ApproveResponse;
export declare function rejectResponse(candid: ApiRejectResponse): RejectResponse;
export declare function apiRejectReason(domain: RejectReason): ApiRejectReason;
export declare function markDeployedResponse(candid: ApiMarkDeployedResponse): MarkDeployedResponse;
