"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topUpNeuronResponse = exports.stakeNeuronForSubmittingProposalsResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
function stakeNeuronForSubmittingProposalsResponse(candid) {
    if ("Success" in candid) {
        return openchat_shared_1.CommonResponses.success();
    }
    console.warn("stakeNeuronForSubmittingProposals failed with: ", candid);
    return openchat_shared_1.CommonResponses.failure();
}
exports.stakeNeuronForSubmittingProposalsResponse = stakeNeuronForSubmittingProposalsResponse;
function topUpNeuronResponse(candid) {
    if ("Success" in candid) {
        return openchat_shared_1.CommonResponses.success();
    }
    console.warn("topUpNeuron failed with: ", candid);
    return openchat_shared_1.CommonResponses.failure();
}
exports.topUpNeuronResponse = topUpNeuronResponse;
