"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NnsGovernanceClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const chatMappers_1 = require("../common/chatMappers");
const mapping_1 = require("../../utils/mapping");
class NnsGovernanceClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    registerVote(neuronId, proposalId, vote) {
        const args = {
            id: (0, chatMappers_1.apiOptional)(mapping_1.identity, { id: BigInt(neuronId) }),
            command: (0, chatMappers_1.apiOptional)(mapping_1.identity, {
                RegisterVote: {
                    vote: (0, chatMappers_1.apiProposalVote)(vote),
                    proposal: (0, chatMappers_1.apiOptional)(mapping_1.identity, { id: proposalId }),
                },
            }),
        };
        return this.handleResponse(this.service.manage_neuron(args), mappers_1.manageNeuronResponse);
    }
    getProposalVoteDetails(proposalId) {
        const args = {
            include_reward_status: [],
            before_proposal: (0, chatMappers_1.apiOptional)(mapping_1.identity, { id: proposalId + BigInt(1) }),
            limit: 1,
            exclude_topic: [],
            include_status: [],
        };
        return this.handleQueryResponse(() => this.service.list_proposals(args), mappers_1.getProposalVoteDetails);
    }
}
exports.NnsGovernanceClient = NnsGovernanceClient;
