"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullMembership = exports.chatIdentifiersEqual = exports.chatScopesEqual = exports.chatIdentifierUnset = exports.messageContextsEqual = exports.messageContextToString = exports.messageContextFromString = exports.NnsProposalTopic = exports.ProposalRewardStatus = exports.ProposalDecisionStatus = exports.canRetryMessage = exports.isTransfer = exports.isCaptionedContent = exports.isEditableContent = exports.isAttachmentContent = void 0;
const utils_1 = require("../../utils");
function isAttachmentContent(content) {
    switch (content.kind) {
        case "image_content":
        case "video_content":
        case "audio_content":
        case "file_content":
            return true;
        default:
            return false;
    }
}
exports.isAttachmentContent = isAttachmentContent;
function isEditableContent(kind) {
    switch (kind) {
        case "file_content":
        case "text_content":
        case "image_content":
        case "video_content":
        case "audio_content":
        case "giphy_content":
            return true;
        default:
            return false;
    }
}
exports.isEditableContent = isEditableContent;
function isCaptionedContent(content) {
    switch (content.kind) {
        case "image_content":
        case "video_content":
        case "audio_content":
        case "file_content":
        case "crypto_content":
        case "giphy_content":
        case "prize_content":
        case "p2p_swap_content":
            return true;
        default:
            return false;
    }
}
exports.isCaptionedContent = isCaptionedContent;
function isTransfer(content) {
    return (content.kind === "crypto_content" ||
        content.kind === "prize_content_initial" ||
        content.kind === "p2p_swap_content_initial");
}
exports.isTransfer = isTransfer;
function canRetryMessage(content) {
    return (content.kind !== "poll_content" &&
        content.kind !== "crypto_content" &&
        content.kind !== "prize_content_initial" &&
        content.kind !== "p2p_swap_content_initial");
}
exports.canRetryMessage = canRetryMessage;
var ProposalDecisionStatus;
(function (ProposalDecisionStatus) {
    ProposalDecisionStatus[ProposalDecisionStatus["Unspecified"] = 0] = "Unspecified";
    ProposalDecisionStatus[ProposalDecisionStatus["Failed"] = 1] = "Failed";
    ProposalDecisionStatus[ProposalDecisionStatus["Open"] = 2] = "Open";
    ProposalDecisionStatus[ProposalDecisionStatus["Rejected"] = 3] = "Rejected";
    ProposalDecisionStatus[ProposalDecisionStatus["Executed"] = 4] = "Executed";
    ProposalDecisionStatus[ProposalDecisionStatus["Adopted"] = 5] = "Adopted";
})(ProposalDecisionStatus || (exports.ProposalDecisionStatus = ProposalDecisionStatus = {}));
var ProposalRewardStatus;
(function (ProposalRewardStatus) {
    ProposalRewardStatus[ProposalRewardStatus["Unspecified"] = 0] = "Unspecified";
    ProposalRewardStatus[ProposalRewardStatus["AcceptVotes"] = 1] = "AcceptVotes";
    ProposalRewardStatus[ProposalRewardStatus["ReadyToSettle"] = 2] = "ReadyToSettle";
    ProposalRewardStatus[ProposalRewardStatus["Settled"] = 3] = "Settled";
})(ProposalRewardStatus || (exports.ProposalRewardStatus = ProposalRewardStatus = {}));
var NnsProposalTopic;
(function (NnsProposalTopic) {
    NnsProposalTopic[NnsProposalTopic["Unspecified"] = 0] = "Unspecified";
    NnsProposalTopic[NnsProposalTopic["NeuronManagement"] = 1] = "NeuronManagement";
    NnsProposalTopic[NnsProposalTopic["ExchangeRate"] = 2] = "ExchangeRate";
    NnsProposalTopic[NnsProposalTopic["NetworkEconomics"] = 3] = "NetworkEconomics";
    NnsProposalTopic[NnsProposalTopic["Governance"] = 4] = "Governance";
    NnsProposalTopic[NnsProposalTopic["NodeAdmin"] = 5] = "NodeAdmin";
    NnsProposalTopic[NnsProposalTopic["ParticipantManagement"] = 6] = "ParticipantManagement";
    NnsProposalTopic[NnsProposalTopic["SubnetManagement"] = 7] = "SubnetManagement";
    NnsProposalTopic[NnsProposalTopic["NetworkCanisterManagement"] = 8] = "NetworkCanisterManagement";
    NnsProposalTopic[NnsProposalTopic["KYC"] = 9] = "KYC";
    NnsProposalTopic[NnsProposalTopic["NodeProviderRewards"] = 10] = "NodeProviderRewards";
    NnsProposalTopic[NnsProposalTopic["SnsDecentralizationSale"] = 11] = "SnsDecentralizationSale";
    NnsProposalTopic[NnsProposalTopic["SubnetReplicaVersionManagement"] = 12] = "SubnetReplicaVersionManagement";
    NnsProposalTopic[NnsProposalTopic["ReplicaVersionManagement"] = 13] = "ReplicaVersionManagement";
    NnsProposalTopic[NnsProposalTopic["SnsAndCommunityFund"] = 14] = "SnsAndCommunityFund";
})(NnsProposalTopic || (exports.NnsProposalTopic = NnsProposalTopic = {}));
function messageContextFromString(ctxStr) {
    return JSON.parse(ctxStr);
}
exports.messageContextFromString = messageContextFromString;
function messageContextToString(ctx) {
    return JSON.stringify(ctx);
}
exports.messageContextToString = messageContextToString;
function messageContextsEqual(a, b) {
    if (a === undefined && b === undefined) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    return (chatIdentifiersEqual(a.chatId, b.chatId) &&
        a.threadRootMessageIndex === b.threadRootMessageIndex);
}
exports.messageContextsEqual = messageContextsEqual;
function chatIdentifierUnset(id) {
    if (id === undefined)
        return true;
    switch (id.kind) {
        case "channel":
            return id.channelId === "";
        case "direct_chat":
            return id.userId === "";
        case "group_chat":
            return id.groupId === "";
    }
}
exports.chatIdentifierUnset = chatIdentifierUnset;
function chatScopesEqual(a, b) {
    if (a.kind === "community" && b.kind === "community")
        return a.id.communityId === b.id.communityId;
    if (a.kind === "favourite" && b.kind === "favourite")
        return a.communityId === b.communityId;
    return a.kind === b.kind;
}
exports.chatScopesEqual = chatScopesEqual;
function chatIdentifiersEqual(a, b) {
    if (a === undefined && b === undefined) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    if (a.kind !== b.kind) {
        return false;
    }
    switch (a.kind) {
        case "channel":
            return (b.kind === "channel" &&
                a.communityId === b.communityId &&
                a.channelId === b.channelId);
        case "direct_chat":
            return b.kind === "direct_chat" && a.userId === b.userId;
        case "group_chat":
            return b.kind === "group_chat" && a.groupId === b.groupId;
    }
}
exports.chatIdentifiersEqual = chatIdentifiersEqual;
function nullMembership() {
    return {
        joined: BigInt(0),
        role: "none",
        mentions: [],
        latestThreads: [],
        myMetrics: (0, utils_1.emptyChatMetrics)(),
        notificationsMuted: false,
        readByMeUpTo: undefined,
        archived: false,
        rulesAccepted: false,
        lapsed: false,
    };
}
exports.nullMembership = nullMembership;
