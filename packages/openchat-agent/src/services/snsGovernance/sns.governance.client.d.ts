import type { HttpAgent, Identity } from "@dfinity/agent";
import type { ListNervousSystemFunctionsResponse, ManageNeuronResponse, ProposalVoteDetails } from "openchat-shared";
import { CandidService } from "../candidService";
export declare class SnsGovernanceClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    registerVote(neuronId: string, proposalId: bigint, vote: boolean): Promise<ManageNeuronResponse>;
    getProposalVoteDetails(proposalId: bigint): Promise<ProposalVoteDetails>;
    listNervousSystemFunctions(): Promise<ListNervousSystemFunctionsResponse>;
}
