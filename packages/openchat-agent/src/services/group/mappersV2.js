"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportMessageResponse = exports.followThreadResponse = exports.apiUpdatedRules = exports.convertToCommunityResponse = exports.getEventsResponse = exports.getMessagesByMessageIndexResponse = exports.removeMemberResponse = exports.sendMessageResponse = exports.blockUserResponse = exports.unblockUserResponse = exports.apiOptionalGroupPermissions = exports.groupChatSummaryUpdates = exports.groupMembershipUpdates = exports.summaryUpdatesResponse = exports.groupChatSummary = exports.summaryResponse = exports.apiRole = void 0;
const openchat_shared_1 = require("openchat-shared");
const chatMappersV2_1 = require("../common/chatMappersV2");
const replicaUpToDateChecker_1 = require("../common/replicaUpToDateChecker");
const mapping_1 = require("../../utils/mapping");
const error_1 = require("../error");
const commonResponseMapper_1 = require("../common/commonResponseMapper");
function apiRole(role) {
    switch (role) {
        case "admin":
            return "Admin";
        case "moderator":
            return "Moderator";
        case "member":
            return "Participant";
        case "owner":
            return "Owner";
        default:
            return undefined;
    }
}
exports.apiRole = apiRole;
function summaryResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return groupChatSummary(value.Success.summary);
    }
    return {
        kind: (0, commonResponseMapper_1.mapCommonResponses)(value, "GroupSummaryResponse"),
    };
}
exports.summaryResponse = summaryResponse;
function groupChatSummary(value) {
    return {
        id: { kind: "group_chat", groupId: (0, mapping_1.principalBytesToString)(value.chat_id) },
        lastUpdated: value.last_updated,
        name: value.name,
        description: value.description,
        subtype: (0, mapping_1.mapOptional)(value.subtype, chatMappersV2_1.groupSubtype),
        avatarId: value.avatar_id,
        public: value.is_public,
        historyVisible: value.history_visible_to_new_joiners,
        minVisibleEventIndex: value.min_visible_event_index,
        minVisibleMessageIndex: value.min_visible_message_index,
        latestMessage: (0, mapping_1.mapOptional)(value.latest_message, chatMappersV2_1.messageEvent),
        latestEventIndex: value.latest_event_index,
        latestMessageIndex: value.latest_message_index,
        memberCount: value.participant_count,
        permissions: (0, chatMappersV2_1.groupPermissions)(value.permissions_v2),
        metrics: (0, chatMappersV2_1.chatMetrics)(value.metrics),
        frozen: value.frozen !== undefined,
        dateLastPinned: value.date_last_pinned,
        gateConfig: (0, mapping_1.mapOptional)(value.gate_config, chatMappersV2_1.accessGateConfig) ?? {
            gate: { kind: "no_gate" },
            expiry: undefined,
        },
        eventsTTL: value.events_ttl,
        eventsTtlLastUpdated: value.events_ttl_last_updated,
        localUserIndex: (0, mapping_1.principalBytesToString)(value.local_user_index_canister_id),
        videoCallInProgress: (0, mapping_1.mapOptional)(value.video_call_in_progress, (v) => v.message_index),
        messagesVisibleToNonMembers: value.messages_visible_to_non_members,
        membership: (0, mapping_1.mapOptional)(value.membership, (m) => ({
            joined: m.joined,
            role: (0, chatMappersV2_1.memberRole)(m.role),
            notificationsMuted: m.notifications_muted,
            lapsed: m.lapsed,
            rulesAccepted: m.rules_accepted,
            latestThreads: m.latest_threads.map(chatMappersV2_1.threadSyncDetails),
            mentions: (0, chatMappersV2_1.mentions)(m.mentions),
            myMetrics: (0, chatMappersV2_1.chatMetrics)(m.my_metrics),
        })) ?? {
            joined: 0n,
            role: "none",
            mentions: [],
            latestThreads: [],
            myMetrics: (0, openchat_shared_1.emptyChatMetrics)(),
            notificationsMuted: false,
            rulesAccepted: false,
            lapsed: false,
        },
    };
}
exports.groupChatSummary = groupChatSummary;
function summaryUpdatesResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return groupChatSummaryUpdates(value.Success.updates);
    }
    return {
        kind: (0, commonResponseMapper_1.mapCommonResponses)(value, "GroupSummaryUpdates"),
    };
}
exports.summaryUpdatesResponse = summaryUpdatesResponse;
function groupMembershipUpdates(value) {
    return {
        myRole: (0, mapping_1.mapOptional)(value.role, chatMappersV2_1.memberRole),
        mentions: (0, chatMappersV2_1.mentions)(value.mentions),
        notificationsMuted: value.notifications_muted,
        myMetrics: (0, mapping_1.mapOptional)(value.my_metrics, chatMappersV2_1.chatMetrics),
        latestThreads: value.latest_threads.map(chatMappersV2_1.threadSyncDetails),
        unfollowedThreads: Array.from(value.unfollowed_threads),
        rulesAccepted: value.rules_accepted,
        lapsed: value.lapsed,
    };
}
exports.groupMembershipUpdates = groupMembershipUpdates;
function groupChatSummaryUpdates(value) {
    return {
        id: { kind: "group_chat", groupId: (0, mapping_1.principalBytesToString)(value.chat_id) },
        lastUpdated: value.last_updated,
        name: value.name,
        description: value.description,
        subtype: (0, mapping_1.optionUpdateV2)(value.subtype, chatMappersV2_1.groupSubtype),
        avatarId: (0, mapping_1.optionUpdateV2)(value.avatar_id, mapping_1.identity),
        public: value.is_public,
        latestMessage: (0, mapping_1.mapOptional)(value.latest_message, chatMappersV2_1.messageEvent),
        latestEventIndex: value.latest_event_index,
        latestMessageIndex: value.latest_message_index,
        memberCount: value.participant_count,
        permissions: (0, mapping_1.mapOptional)(value.permissions_v2, chatMappersV2_1.groupPermissions),
        metrics: (0, mapping_1.mapOptional)(value.metrics, chatMappersV2_1.chatMetrics),
        frozen: (0, mapping_1.optionUpdateV2)(value.frozen, (_) => true),
        updatedEvents: value.updated_events.map(chatMappersV2_1.updatedEvent),
        dateLastPinned: value.date_last_pinned,
        gateConfig: (0, mapping_1.optionUpdateV2)(value.gate_config, chatMappersV2_1.accessGateConfig),
        eventsTTL: (0, mapping_1.optionUpdateV2)(value.events_ttl, mapping_1.identity),
        eventsTtlLastUpdated: value.events_ttl_last_updated,
        videoCallInProgress: (0, mapping_1.optionUpdateV2)(value.video_call_in_progress, (v) => v.message_index),
        messagesVisibleToNonMembers: value.messages_visible_to_non_members,
        membership: (0, mapping_1.mapOptional)(value.membership, groupMembershipUpdates),
    };
}
exports.groupChatSummaryUpdates = groupChatSummaryUpdates;
function apiOptionalGroupPermissions(permissions) {
    return {
        delete_messages: (0, mapping_1.mapOptional)(permissions.deleteMessages, chatMappersV2_1.apiPermissionRole),
        remove_members: (0, mapping_1.mapOptional)(permissions.removeMembers, chatMappersV2_1.apiPermissionRole),
        update_group: (0, mapping_1.mapOptional)(permissions.updateGroup, chatMappersV2_1.apiPermissionRole),
        invite_users: (0, mapping_1.mapOptional)(permissions.inviteUsers, chatMappersV2_1.apiPermissionRole),
        add_members: (0, mapping_1.mapOptional)(permissions.addMembers, chatMappersV2_1.apiPermissionRole),
        change_roles: (0, mapping_1.mapOptional)(permissions.changeRoles, chatMappersV2_1.apiPermissionRole),
        pin_messages: (0, mapping_1.mapOptional)(permissions.pinMessages, chatMappersV2_1.apiPermissionRole),
        react_to_messages: (0, mapping_1.mapOptional)(permissions.reactToMessages, chatMappersV2_1.apiPermissionRole),
        mention_all_members: (0, mapping_1.mapOptional)(permissions.mentionAllMembers, chatMappersV2_1.apiPermissionRole),
        start_video_call: (0, mapping_1.mapOptional)(permissions.startVideoCall, chatMappersV2_1.apiPermissionRole),
        message_permissions: (0, mapping_1.mapOptional)(permissions.messagePermissions, apiOptionalMessagePermissions),
        thread_permissions: (0, mapping_1.apiOptionUpdateV2)(apiOptionalMessagePermissions, permissions.threadPermissions),
    };
}
exports.apiOptionalGroupPermissions = apiOptionalGroupPermissions;
function apiOptionalMessagePermissions(permissions) {
    const custom_updated = permissions.memeFighter !== undefined && permissions.memeFighter !== "set_to_none"
        ? [{ subtype: "meme_fighter", role: (0, chatMappersV2_1.apiPermissionRole)(permissions.memeFighter.value) }]
        : [];
    const custom_deleted = permissions.memeFighter === "set_to_none" ? ["meme_fighter"] : [];
    return {
        default: (0, mapping_1.mapOptional)(permissions.default, chatMappersV2_1.apiPermissionRole),
        text: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.text),
        image: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.image),
        video: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.video),
        audio: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.audio),
        file: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.file),
        poll: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.poll),
        crypto: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.crypto),
        giphy: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.giphy),
        prize: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.prize),
        p2p_swap: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, permissions.p2pSwap),
        video_call: (0, mapping_1.apiOptionUpdateV2)(chatMappersV2_1.apiPermissionRole, undefined),
        custom_updated,
        custom_deleted,
    };
}
function unblockUserResponse(value) {
    if (value === "CannotUnblockSelf") {
        return "cannot_unblock_self";
    }
    return (0, commonResponseMapper_1.mapCommonResponses)(value, "GroupUnblockUser");
}
exports.unblockUserResponse = unblockUserResponse;
function blockUserResponse(value) {
    if (value === "CannotBlockSelf") {
        return "cannot_block_self";
    }
    if (value === "CannotBlockUser") {
        return "cannot_block_user";
    }
    return (0, commonResponseMapper_1.mapCommonResponses)(value, "GroupBlockUser");
}
exports.blockUserResponse = blockUserResponse;
function sendMessageResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                timestamp: value.Success.timestamp,
                messageIndex: value.Success.message_index,
                eventIndex: value.Success.event_index,
                expiresAt: (0, mapping_1.mapOptional)(value.Success.expires_at, Number),
            };
        }
        if ("TextTooLong" in value) {
            return { kind: "text_too_long" };
        }
        if ("InvalidRequest" in value) {
            return { kind: "invalid_request", reason: value.InvalidRequest };
        }
        if ("InvalidPoll" in value) {
            return { kind: "invalid_poll" };
        }
    }
    if (value === "MessageEmpty") {
        return { kind: "message_empty" };
    }
    if (value === "RulesNotAccepted") {
        return { kind: "rules_not_accepted" };
    }
    return {
        kind: (0, commonResponseMapper_1.mapCommonResponses)(value, "GroupSendMessage"),
    };
}
exports.sendMessageResponse = sendMessageResponse;
function removeMemberResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("RemoveMember failed with ", value);
        return "failure";
    }
}
exports.removeMemberResponse = removeMemberResponse;
async function getMessagesByMessageIndexResponse(principal, value, chatId, latestKnownUpdatePreRequest) {
    if (typeof value === "object") {
        if ("Success" in value) {
            await (0, replicaUpToDateChecker_1.ensureReplicaIsUpToDate)(principal, chatId, value.Success.chat_last_updated);
            return (0, chatMappersV2_1.messagesSuccessResponse)(value.Success);
        }
        if ("ReplicaNotUpToDateV2" in value) {
            throw error_1.ReplicaNotUpToDateError.byTimestamp(value.ReplicaNotUpToDateV2, latestKnownUpdatePreRequest ?? BigInt(-1), false);
        }
    }
    console.warn("MessagesByMessageIndex failed with ", value);
    return "events_failed";
}
exports.getMessagesByMessageIndexResponse = getMessagesByMessageIndexResponse;
async function getEventsResponse(principal, value, chatId, latestKnownUpdatePreRequest) {
    if (typeof value === "object") {
        if ("Success" in value) {
            await (0, replicaUpToDateChecker_1.ensureReplicaIsUpToDate)(principal, chatId, value.Success.chat_last_updated);
            return (0, chatMappersV2_1.eventsSuccessResponse)(value.Success);
        }
        if ("ReplicaNotUpToDateV2" in value) {
            throw error_1.ReplicaNotUpToDateError.byTimestamp(value.ReplicaNotUpToDateV2, latestKnownUpdatePreRequest ?? BigInt(-1), false);
        }
    }
    console.warn("GetGroupChatEvents failed with ", value);
    return "events_failed";
}
exports.getEventsResponse = getEventsResponse;
function convertToCommunityResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            id: {
                kind: "channel",
                communityId: (0, mapping_1.principalBytesToString)(value.Success.community_id),
                channelId: value.Success.channel_id.toString(),
            },
        };
    }
    else {
        console.warn("ConvertToCommunity failed with ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.convertToCommunityResponse = convertToCommunityResponse;
function apiUpdatedRules(rules) {
    return {
        text: rules.text,
        enabled: rules.enabled,
        new_version: rules.newVersion,
    };
}
exports.apiUpdatedRules = apiUpdatedRules;
function followThreadResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "AlreadyFollowing" || value === "NotFollowing") {
        return "unchanged";
    }
    else {
        console.warn("followThread failed with", value);
        return "failed";
    }
}
exports.followThreadResponse = followThreadResponse;
function reportMessageResponse(value) {
    return value === "Success" || value === "AlreadyReported";
}
exports.reportMessageResponse = reportMessageResponse;
