import type { HttpAgent, Identity } from "@dfinity/agent";
import type { ManageNeuronResponse, ProposalVoteDetails } from "openchat-shared";
import { CandidService } from "../candidService";
export declare class NnsGovernanceClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    registerVote(neuronId: string, proposalId: bigint, vote: boolean): Promise<ManageNeuronResponse>;
    getProposalVoteDetails(proposalId: bigint): Promise<ProposalVoteDetails>;
}
