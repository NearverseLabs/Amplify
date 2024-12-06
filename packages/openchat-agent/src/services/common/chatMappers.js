"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiProposalVote = exports.proposalVote = exports.apiOptional = void 0;
function apiOptional(mapper, domain) {
    return domain !== undefined ? [mapper(domain)] : [];
}
exports.apiOptional = apiOptional;
function proposalVote(vote) {
    if (vote === 1)
        return true;
    if (vote === 2)
        return false;
    return undefined;
}
exports.proposalVote = proposalVote;
function apiProposalVote(vote) {
    return vote ? 1 : 2;
}
exports.apiProposalVote = apiProposalVote;
