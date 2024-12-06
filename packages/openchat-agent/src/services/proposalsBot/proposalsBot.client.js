"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalsBotClient = void 0;
const principal_1 = require("@dfinity/principal");
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
class ProposalsBotClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    stakeNeuronForSubmittingProposals(governanceCanisterId, stake) {
        const args = {
            governance_canister_id: principal_1.Principal.fromText(governanceCanisterId),
            stake,
        };
        return this.handleResponse(this.service.stake_neuron_for_submitting_proposals(args), mappers_1.stakeNeuronForSubmittingProposalsResponse, args);
    }
    topUpNeuron(governanceCanisterId, amount) {
        const args = {
            governance_canister_id: principal_1.Principal.fromText(governanceCanisterId),
            amount,
        };
        return this.handleResponse(this.service.top_up_neuron(args), mappers_1.topUpNeuronResponse);
    }
}
exports.ProposalsBotClient = ProposalsBotClient;
