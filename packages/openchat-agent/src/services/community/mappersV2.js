"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportMessageResponse = exports.followThreadResponse = exports.setMemberDisplayNameResponse = exports.deleteUserGroupsResponse = exports.updateUserGroupResponse = exports.createUserGroupResponse = exports.communityDetailsUpdatesResponse = exports.userGroupDetails = exports.communityDetailsResponse = exports.apiOptionalCommunityPermissions = exports.apiCommunityRole = exports.apiMemberRole = exports.updateCommunityResponse = exports.unblockUserResponse = exports.groupMembershipUpdates = exports.communityChannelUpdates = exports.communityMembershipUpdates = exports.communitySummaryUpdates = exports.summaryUpdatesResponse = exports.summaryResponse = exports.importGroupResponse = exports.communityChannelSummaryResponse = exports.channelMatch = exports.exploreChannelsResponse = exports.sendMessageResponse = exports.removeMemberFromChannelResponse = exports.removeMemberResponse = exports.changeRoleResponse = exports.blockUserResponse = exports.addMembersToChannelResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
const mapping_1 = require("../../utils/mapping");
const chatMappersV2_1 = require("../common/chatMappersV2");
const mapping_2 = require("../../utils/mapping");
const commonResponseMapper_1 = require("../common/commonResponseMapper");
function addMembersToChannelResponse(value) {
    if (typeof value === "object") {
        if ("PartialSuccess" in value) {
            return addToChannelPartialSuccess(value.PartialSuccess);
        }
        if ("Failed" in value) {
            return addToChannelFailed(value.Failed);
        }
        if ("UserLimitReached" in value) {
            return openchat_shared_1.CommonResponses.userLimitReached();
        }
    }
    return {
        kind: (0, commonResponseMapper_1.mapCommonResponses)(value, "AddMembersToChannel"),
    };
}
exports.addMembersToChannelResponse = addMembersToChannelResponse;
function addToChannelFailed(value) {
    return {
        kind: "add_to_channel_failed",
        usersLimitReached: value.users_limit_reached.map(mapping_1.principalBytesToString),
        usersAlreadyInChannel: value.users_already_in_channel.map(mapping_1.principalBytesToString),
        usersFailedWithError: value.users_failed_with_error.map(userFailedWithError),
    };
}
function userFailedWithError(value) {
    return {
        userId: (0, mapping_1.principalBytesToString)(value.user_id),
        error: value.error,
    };
}
function addToChannelPartialSuccess(value) {
    return {
        kind: "add_to_channel_partial_success",
        usersLimitReached: value.users_limit_reached.map(mapping_1.principalBytesToString),
        usersAlreadyInChannel: value.users_already_in_channel.map(mapping_1.principalBytesToString),
        usersFailedWithError: value.users_failed_with_error.map(userFailedWithError),
        usersAdded: value.users_added.map(mapping_1.principalBytesToString),
    };
}
function blockUserResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    else {
        console.warn("BlockCommunityUser failed with ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.blockUserResponse = blockUserResponse;
function changeRoleResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("Unexpected ApiChangeRoleResponse type received", value);
        return "failure";
    }
}
exports.changeRoleResponse = changeRoleResponse;
function removeMemberResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("RemoveCommunityMember failed with", value);
        return "failure";
    }
}
exports.removeMemberResponse = removeMemberResponse;
function removeMemberFromChannelResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("RemoveChannelMember failed with", value);
        return "failure";
    }
}
exports.removeMemberFromChannelResponse = removeMemberFromChannelResponse;
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
    }
    if (value === "RulesNotAccepted") {
        return { kind: "rules_not_accepted" };
    }
    else if (value === "CommunityRulesNotAccepted") {
        return { kind: "community_rules_not_accepted" };
    }
    else {
        console.warn("SendMessage failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.sendMessageResponse = sendMessageResponse;
function exploreChannelsResponse(value, communityId) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            matches: value.Success.matches.map((m) => channelMatch(m, communityId)),
            total: value.Success.total,
        };
    }
    else {
        console.warn("ExploreChannels failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.exploreChannelsResponse = exploreChannelsResponse;
function channelMatch(value, communityId) {
    return {
        id: { kind: "channel", communityId, channelId: value.id.toString() },
        gateConfig: (0, mapping_1.mapOptional)(value.gate_config, chatMappersV2_1.accessGateConfig) ?? {
            expiry: undefined,
            gate: { kind: "no_gate" },
        },
        name: value.name,
        description: value.description,
        memberCount: value.member_count,
        avatar: {
            blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (blobId) => ({
                blobId,
                canisterId: communityId,
            })),
        },
    };
}
exports.channelMatch = channelMatch;
function communityChannelSummaryResponse(value, communityId) {
    if (typeof value === "object" && "Success" in value) {
        return (0, chatMappersV2_1.communityChannelSummary)(value.Success, communityId);
    }
    else {
        console.warn("CommunityChannelSummary failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.communityChannelSummaryResponse = communityChannelSummaryResponse;
function importGroupResponse(communityId, value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            channelId: {
                kind: "channel",
                communityId,
                channelId: value.Success.channel_id.toString(),
            },
        };
    }
    else {
        console.warn("ImportGroup failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.importGroupResponse = importGroupResponse;
function summaryResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return (0, chatMappersV2_1.communitySummary)(value.Success);
    }
    else {
        console.warn("CommunitySummary failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.summaryResponse = summaryResponse;
function summaryUpdatesResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return communitySummaryUpdates(value.Success);
    }
    if (value === "SuccessNoUpdates") {
        return openchat_shared_1.CommonResponses.successNoUpdates();
    }
    if (value === "PrivateCommunity") {
        return openchat_shared_1.CommonResponses.failure();
    }
    throw new openchat_shared_1.UnsupportedValueError("invalid ApiSummaryUpdatesResponse received", value);
}
exports.summaryUpdatesResponse = summaryUpdatesResponse;
function communitySummaryUpdates(value) {
    const communityId = (0, mapping_1.principalBytesToString)(value.community_id);
    return {
        id: { kind: "community", communityId },
        public: value.is_public,
        permissions: (0, mapping_1.mapOptional)(value.permissions, chatMappersV2_1.communityPermissions),
        channelsUpdated: value.channels_updated.map((c) => communityChannelUpdates(c, communityId)),
        metrics: (0, mapping_1.mapOptional)(value.metrics, chatMappersV2_1.chatMetrics),
        gateConfig: (0, mapping_1.optionUpdateV2)(value.gate_config, chatMappersV2_1.accessGateConfig),
        name: value.name,
        description: value.description,
        lastUpdated: value.last_updated,
        channelsRemoved: value.channels_removed.map((c) => ({
            kind: "channel",
            communityId,
            channelId: c.toString(),
        })),
        avatarId: (0, mapping_1.optionUpdateV2)(value.avatar_id, mapping_2.identity),
        channelsAdded: value.channels_added.map((c) => (0, chatMappersV2_1.communityChannelSummary)(c, communityId)),
        membership: (0, mapping_1.mapOptional)(value.membership, communityMembershipUpdates),
        frozen: (0, mapping_1.optionUpdateV2)(value.frozen, (_) => true),
        latestEventIndex: value.latest_event_index,
        bannerId: (0, mapping_1.optionUpdateV2)(value.banner_id, mapping_2.identity),
        memberCount: value.member_count,
        primaryLanguage: value.primary_language,
        userGroups: value.user_groups.map(chatMappersV2_1.userGroup).map(([_, g]) => g),
        userGroupsDeleted: new Set(value.user_groups_deleted),
    };
}
exports.communitySummaryUpdates = communitySummaryUpdates;
function communityMembershipUpdates(value) {
    return {
        role: (0, mapping_1.mapOptional)(value.role, chatMappersV2_1.memberRole),
        displayName: (0, mapping_1.optionUpdateV2)(value.display_name, mapping_2.identity),
        rulesAccepted: value.rules_accepted,
        lapsed: value.lapsed,
    };
}
exports.communityMembershipUpdates = communityMembershipUpdates;
function communityChannelUpdates(value, communityId) {
    return {
        id: { kind: "channel", communityId, channelId: value.channel_id.toString() },
        public: value.is_public,
        permissions: (0, mapping_1.mapOptional)(value.permissions_v2, chatMappersV2_1.groupPermissions),
        metrics: (0, mapping_1.mapOptional)(value.metrics, chatMappersV2_1.chatMetrics),
        subtype: (0, mapping_1.optionUpdateV2)(value.subtype, chatMappersV2_1.groupSubtype),
        dateLastPinned: value.date_last_pinned,
        gateConfig: (0, mapping_1.optionUpdateV2)(value.gate_config, chatMappersV2_1.accessGateConfig),
        name: value.name,
        description: value.description,
        externalUrl: (0, mapping_1.optionUpdateV2)(value.external_url, mapping_2.identity),
        lastUpdated: value.last_updated,
        avatarId: (0, mapping_1.optionUpdateV2)(value.avatar_id, mapping_2.identity),
        membership: (0, mapping_1.mapOptional)(value.membership, groupMembershipUpdates),
        updatedEvents: value.updated_events.map(chatMappersV2_1.updatedEvent),
        latestEventIndex: value.latest_event_index,
        latestMessageIndex: value.latest_message_index,
        memberCount: value.member_count,
        latestMessage: (0, mapping_1.mapOptional)(value.latest_message, chatMappersV2_1.messageEvent),
        eventsTTL: (0, mapping_1.optionUpdateV2)(value.events_ttl, mapping_2.identity),
        eventsTtlLastUpdated: value.events_ttl_last_updated,
        videoCallInProgress: (0, mapping_1.optionUpdateV2)(value.video_call_in_progress, (v) => v.message_index),
        messageVisibleToNonMembers: value.messages_visible_to_non_members,
    };
}
exports.communityChannelUpdates = communityChannelUpdates;
function groupMembershipUpdates(value) {
    return {
        myRole: (0, mapping_1.mapOptional)(value.role, chatMappersV2_1.memberRole),
        notificationsMuted: value.notifications_muted,
        latestThreads: value.latest_threads.map(chatMappersV2_1.threadSyncDetails),
        unfollowedThreads: Array.from(value.unfollowed_threads),
        mentions: (0, chatMappersV2_1.mentions)(value.mentions),
        myMetrics: (0, mapping_1.mapOptional)(value.my_metrics, chatMappersV2_1.chatMetrics),
        rulesAccepted: value.rules_accepted,
        lapsed: value.lapsed,
    };
}
exports.groupMembershipUpdates = groupMembershipUpdates;
function unblockUserResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    else {
        console.warn("UnblockCommunityUser failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.unblockUserResponse = unblockUserResponse;
function updateCommunityResponse(value) {
    if (typeof value === "object" && "SuccessV2" in value) {
        return {
            kind: "success",
            rulesVersion: value.SuccessV2.rules_version,
        };
    }
    else {
        console.warn("UpdateCommunity failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.updateCommunityResponse = updateCommunityResponse;
function apiMemberRole(domain) {
    switch (domain) {
        case "owner":
            return "Owner";
        case "admin":
            return "Admin";
        case "moderator":
            return "Moderator";
        default:
            return "Participant";
    }
}
exports.apiMemberRole = apiMemberRole;
function apiCommunityRole(newRole) {
    switch (newRole) {
        case "owner":
            return "Owner";
        case "admin":
            return "Admin";
        default:
            return "Member";
    }
}
exports.apiCommunityRole = apiCommunityRole;
function apiOptionalCommunityPermissions(permissions) {
    return {
        create_public_channel: (0, mapping_1.mapOptional)(permissions.createPublicChannel, chatMappersV2_1.apiCommunityPermissionRole),
        update_details: (0, mapping_1.mapOptional)(permissions.updateDetails, chatMappersV2_1.apiCommunityPermissionRole),
        remove_members: (0, mapping_1.mapOptional)(permissions.removeMembers, chatMappersV2_1.apiCommunityPermissionRole),
        invite_users: (0, mapping_1.mapOptional)(permissions.inviteUsers, chatMappersV2_1.apiCommunityPermissionRole),
        change_roles: (0, mapping_1.mapOptional)(permissions.changeRoles, chatMappersV2_1.apiCommunityPermissionRole),
        create_private_channel: (0, mapping_1.mapOptional)(permissions.createPrivateChannel, chatMappersV2_1.apiCommunityPermissionRole),
        manage_user_groups: (0, mapping_1.mapOptional)(permissions.manageUserGroups, chatMappersV2_1.apiCommunityPermissionRole),
    };
}
exports.apiOptionalCommunityPermissions = apiOptionalCommunityPermissions;
function communityDetailsResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            members: value.Success.members
                .map((m) => ({
                role: (0, chatMappersV2_1.memberRole)(m.role),
                userId: (0, mapping_1.principalBytesToString)(m.user_id),
                displayName: m.display_name,
                lapsed: m.lapsed,
            }))
                .concat(value.Success.basic_members.map((id) => ({
                role: "member",
                userId: (0, mapping_1.principalBytesToString)(id),
                displayName: undefined,
                lapsed: false,
            }))),
            blockedUsers: new Set(value.Success.blocked_users.map(mapping_1.principalBytesToString)),
            invitedUsers: new Set(value.Success.invited_users.map(mapping_1.principalBytesToString)),
            rules: value.Success.chat_rules,
            lastUpdated: value.Success.timestamp,
            userGroups: new Map(value.Success.user_groups.map(userGroupDetails)),
            referrals: new Set(value.Success.referrals.map(mapping_1.principalBytesToString)),
        };
    }
    else {
        console.warn("CommunityDetails failed with", value);
        return "failure";
    }
}
exports.communityDetailsResponse = communityDetailsResponse;
function userGroupDetails(value) {
    return [
        value.user_group_id,
        {
            id: value.user_group_id,
            kind: "user_group",
            members: new Set(value.members.map(mapping_1.principalBytesToString)),
            name: value.name,
        },
    ];
}
exports.userGroupDetails = userGroupDetails;
function communityDetailsUpdatesResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                membersAddedOrUpdated: value.Success.members_added_or_updated.map((m) => ({
                    role: (0, chatMappersV2_1.memberRole)(m.role),
                    userId: (0, mapping_1.principalBytesToString)(m.user_id),
                    displayName: m.display_name,
                    lapsed: m.lapsed,
                })),
                membersRemoved: new Set(value.Success.members_removed.map(mapping_1.principalBytesToString)),
                blockedUsersAdded: new Set(value.Success.blocked_users_added.map(mapping_1.principalBytesToString)),
                blockedUsersRemoved: new Set(value.Success.blocked_users_removed.map(mapping_1.principalBytesToString)),
                rules: value.Success.chat_rules,
                invitedUsers: (0, mapping_1.mapOptional)(value.Success.invited_users, (invited_users) => new Set(invited_users.map(mapping_1.principalBytesToString))),
                lastUpdated: value.Success.timestamp,
                userGroups: value.Success.user_groups.map(userGroupDetails).map(([_, g]) => g),
                userGroupsDeleted: new Set(value.Success.user_groups_deleted),
                referralsRemoved: new Set(value.Success.referrals_removed.map(mapping_1.principalBytesToString)),
                referralsAdded: new Set(value.Success.referrals_added.map(mapping_1.principalBytesToString)),
            };
        }
        else if ("SuccessNoUpdates" in value) {
            return {
                kind: "success_no_updates",
                lastUpdated: value.SuccessNoUpdates,
            };
        }
    }
    console.warn("Unexpected ApiSelectedUpdatesResponse type received", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.communityDetailsUpdatesResponse = communityDetailsUpdatesResponse;
function createUserGroupResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            userGroupId: value.Success.user_group_id,
        };
    }
    if (value === "NameTaken") {
        return {
            kind: "name_taken",
        };
    }
    else {
        console.warn("CreateUserGroup failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.createUserGroupResponse = createUserGroupResponse;
function updateUserGroupResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    else if (value === "NameTaken") {
        return {
            kind: "name_taken",
        };
    }
    else {
        console.warn("UpdateUserGroup failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.updateUserGroupResponse = updateUserGroupResponse;
function deleteUserGroupsResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    else {
        console.warn("DeleteUserGroups failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.deleteUserGroupsResponse = deleteUserGroupsResponse;
function setMemberDisplayNameResponse(value) {
    if (typeof value === "object") {
        if ("DisplayNameTooShort" in value) {
            return "display_name_too_short";
        }
        if ("DisplayNameTooLong" in value) {
            return "display_name_too_long";
        }
    }
    if (value === "DisplayNameInvalid") {
        return "display_name_invalid";
    }
    return (0, commonResponseMapper_1.mapCommonResponses)(value, "SetMemberDisplayName");
}
exports.setMemberDisplayNameResponse = setMemberDisplayNameResponse;
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
