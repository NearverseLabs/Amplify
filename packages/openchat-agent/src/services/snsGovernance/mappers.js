"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nervousSystemFunctions = exports.getProposalVoteDetails = exports.manageNeuronResponse = void 0;
const mapping_1 = require("../../utils/mapping");
const chatMappers_1 = require("../common/chatMappers");
const E8S_AS_BIGINT = BigInt(100000000);
function manageNeuronResponse(candid) {
    const result = candid.command[0];
    if ("RegisterVote" in result) {
        return {
            kind: "success",
        };
    }
    if ("Error" in result) {
        return {
            kind: "error",
            type: result.Error.error_type,
            message: result.Error.error_message,
        };
    }
    throw new Error(`Unexpected ApiManageNeuronResponse type received: ${candid}`);
}
exports.manageNeuronResponse = manageNeuronResponse;
function getProposalVoteDetails(candid) {
    const proposal = candid.proposals[0];
    if (proposal === undefined) {
        throw new Error("GetProposal returned an empty response");
    }
    const ballots = proposal.ballots;
    const tally = proposal.latest_tally[0];
    return {
        id: proposal.id[0].id,
        ballots: ballots.map(([n, b]) => ({
            neuronId: n,
            vote: (0, chatMappers_1.proposalVote)(b.vote),
            votingPower: b.voting_power,
        })),
        latestTally: {
            yes: Number(tally.yes / E8S_AS_BIGINT),
            no: Number(tally.no / E8S_AS_BIGINT),
            total: Number(tally.total / E8S_AS_BIGINT),
            timestamp: tally.timestamp_seconds * BigInt(1000)
        }
    };
}
exports.getProposalVoteDetails = getProposalVoteDetails;
function nervousSystemFunctions(candid) {
    return {
        reservedIds: [...candid.reserved_ids],
        functions: candid.functions.map(nervousSystemFunction),
    };
}
exports.nervousSystemFunctions = nervousSystemFunctions;
function nervousSystemFunction(candid) {
    return {
        id: Number(candid.id),
        name: candid.name,
        description: (0, mapping_1.optional)(candid.description, mapping_1.identity) ?? "",
        functionType: (0, mapping_1.optional)(candid.function_type, snsFunctionType),
    };
}
function snsFunctionType(candid) {
    if ("NativeNervousSystemFunction" in candid) {
        return { kind: "native_nervous_system_function" };
    }
    else {
        return { kind: "generic_nervous_system_function" };
    }
}
