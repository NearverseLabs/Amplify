"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProposalVoteDetails = exports.manageNeuronResponse = void 0;
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
    const proposal = candid.proposal_info[0];
    if (proposal === undefined) {
        throw new Error("GetProposal returned an empty response");
    }
    const ballots = proposal.ballots;
    const tally = proposal.latest_tally[0];
    return {
        id: proposal.id[0].id,
        ballots: ballots.map(([n, b]) => ({
            neuronId: n.toString(),
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
