import type { ApiListNervousSystemFunctionsResponse, ApiListProposalsResponse, ApiManageNeuronResponse } from "./candid/idl";
import type { ListNervousSystemFunctionsResponse, ManageNeuronResponse, ProposalVoteDetails } from "openchat-shared";
export declare function manageNeuronResponse(candid: ApiManageNeuronResponse): ManageNeuronResponse;
export declare function getProposalVoteDetails(candid: ApiListProposalsResponse): ProposalVoteDetails;
export declare function nervousSystemFunctions(candid: ApiListNervousSystemFunctionsResponse): ListNervousSystemFunctionsResponse;
