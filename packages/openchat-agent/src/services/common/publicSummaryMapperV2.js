"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicSummaryResponse = exports.publicGroupSummary = void 0;
const chat_1 = require("../../utils/chat");
const mapping_1 = require("../../utils/mapping");
const chatMappersV2_1 = require("./chatMappersV2");
const openchat_shared_1 = require("openchat-shared");
function publicGroupSummary(value, isInvited) {
    const groupId = (0, mapping_1.principalBytesToString)(value.chat_id);
    return {
        kind: "group_chat",
        id: { kind: "group_chat", groupId },
        latestEventIndex: value.latest_event_index,
        latestMessageIndex: value.latest_message_index,
        latestMessage: (0, mapping_1.mapOptional)(value.latest_message, chatMappersV2_1.messageEvent),
        name: value.name,
        description: value.description,
        public: value.is_public,
        historyVisible: false,
        minVisibleEventIndex: 0,
        minVisibleMessageIndex: 0,
        lastUpdated: value.last_updated,
        memberCount: value.participant_count,
        blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (blobId) => ({
            blobId,
            canisterId: groupId,
        })),
        permissions: {
            changeRoles: "none",
            removeMembers: "none",
            deleteMessages: "none",
            updateGroup: "none",
            pinMessages: "none",
            inviteUsers: "none",
            addMembers: "none",
            reactToMessages: "none",
            mentionAllMembers: "none",
            startVideoCall: "none",
            messagePermissions: {
                default: "none",
            },
            threadPermissions: undefined,
        },
        eventsTTL: value.events_ttl,
        eventsTtlLastUpdated: value.events_ttl_last_updated,
        metrics: (0, chat_1.emptyChatMetrics)(),
        subtype: (0, mapping_1.mapOptional)(value.subtype, chatMappersV2_1.groupSubtype),
        previewed: true,
        frozen: value.frozen !== undefined,
        dateLastPinned: undefined,
        dateReadPinned: undefined,
        gateConfig: (0, mapping_1.mapOptional)(value.gate_config, chatMappersV2_1.accessGateConfig) ?? {
            gate: { kind: "no_gate" },
            expiry: undefined,
        },
        level: "group",
        membership: (0, openchat_shared_1.nullMembership)(),
        localUserIndex: (0, mapping_1.principalBytesToString)(value.local_user_index_canister_id),
        isInvited,
        messagesVisibleToNonMembers: value.messages_visible_to_non_members,
    };
}
exports.publicGroupSummary = publicGroupSummary;
function publicSummaryResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            group: publicGroupSummary(value.Success.summary, value.Success.is_invited),
        };
    }
    else {
        console.warn("ApiPublicSummaryResponse failed with ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.publicSummaryResponse = publicSummaryResponse;
