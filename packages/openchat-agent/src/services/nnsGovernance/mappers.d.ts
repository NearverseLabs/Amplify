import type { ApiListProposalInfoResponse } from "./candid/idl";
import type { ManageNeuronResponse, ProposalVoteDetails } from "openchat-shared";
import type { ApiManageNeuronResponse } from "./candid/idl";
export declare function manageNeuronResponse(candid: ApiManageNeuronResponse): ManageNeuronResponse;
export declare function getProposalVoteDetails(candid: ApiListProposalInfoResponse): ProposalVoteDetails;
