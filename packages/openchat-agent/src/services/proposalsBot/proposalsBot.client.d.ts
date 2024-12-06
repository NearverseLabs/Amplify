import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
import type { StakeNeuronForSubmittingProposalsResponse, TopUpNeuronResponse } from "openchat-shared";
export declare class ProposalsBotClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    stakeNeuronForSubmittingProposals(governanceCanisterId: string, stake: bigint): Promise<StakeNeuronForSubmittingProposalsResponse>;
    topUpNeuron(governanceCanisterId: string, amount: bigint): Promise<TopUpNeuronResponse>;
}
