"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeLatestKnownUpdateIfBeforeFix = exports.ensureReplicaIsUpToDate = void 0;
const caching_1 = require("../../utils/caching");
const error_1 = require("../error");
const openchat_shared_1 = require("openchat-shared");
const DATE_FIXED = BigInt(1699800000000);
async function ensureReplicaIsUpToDate(principal, chatId, replicaChatLastUpdated, suppressError = false) {
    const clientChat = await getChat(principal, chatId);
    if (clientChat !== undefined &&
        replicaChatLastUpdated < clientChat.lastUpdated &&
        clientChat.lastUpdated > DATE_FIXED) {
        if (suppressError) {
            return {
                kind: "replica_not_up_to_date",
                replicaTimestamp: replicaChatLastUpdated,
                clientTimestamp: clientChat.lastUpdated,
            };
        }
        throw error_1.ReplicaNotUpToDateError.byTimestamp(replicaChatLastUpdated, clientChat.lastUpdated, true);
    }
}
exports.ensureReplicaIsUpToDate = ensureReplicaIsUpToDate;
function excludeLatestKnownUpdateIfBeforeFix(latestKnownUpdate) {
    if (latestKnownUpdate !== undefined && latestKnownUpdate < DATE_FIXED) {
        return undefined;
    }
    return latestKnownUpdate;
}
exports.excludeLatestKnownUpdateIfBeforeFix = excludeLatestKnownUpdateIfBeforeFix;
async function getChat(principal, chatId) {
    const chats = await (0, caching_1.openDbAndGetCachedChats)(principal);
    if (chats === undefined)
        return undefined;
    switch (chatId.kind) {
        case "direct_chat":
            return chats.directChats.find((c) => (0, openchat_shared_1.chatIdentifiersEqual)(c.id, chatId));
        case "group_chat":
            return chats.groupChats.find((c) => (0, openchat_shared_1.chatIdentifiersEqual)(c.id, chatId));
        case "channel":
            return chats.communities
                .find((c) => c.id.communityId === chatId.communityId)
                ?.channels.find((c) => c.id === chatId);
    }
}
