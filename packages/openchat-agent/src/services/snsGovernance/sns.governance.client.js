"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsGovernanceClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const chatMappers_1 = require("../common/chatMappers");
const mapping_1 = require("../../utils/mapping");
const base64_1 = require("../../utils/base64");
class SnsGovernanceClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    registerVote(neuronId, proposalId, vote) {
        const args = {
            subaccount: (0, base64_1.toUint8Array)(neuronId),
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
            before_proposal: [{ id: proposalId + BigInt(1) }],
            limit: 1,
            exclude_type: [],
            include_status: [],
        };
        return this.handleQueryResponse(() => this.service.list_proposals(args), mappers_1.getProposalVoteDetails);
    }
    listNervousSystemFunctions() {
        return this.handleQueryResponse(() => this.service.list_nervous_system_functions(), mappers_1.nervousSystemFunctions);
    }
}
exports.SnsGovernanceClient = SnsGovernanceClient;
