"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCommunityModerationFlagsResponse = exports.setUpgradeConcurrencyResponse = exports.removeHotGroupExclusionResponse = exports.addHotGroupExclusionResponse = exports.deleteFrozenGroupResponse = exports.unfreezeGroupResponse = exports.unfreezeCommunityResponse = exports.freezeCommunityResponse = exports.freezeGroupResponse = exports.exploreGroupsResponse = exports.exploreCommunitiesResponse = exports.lookupChannelResponse = exports.recommendedGroupsResponse = exports.activeGroupsResponse = void 0;
const mapping_1 = require("../../utils/mapping");
const openchat_shared_1 = require("openchat-shared");
const publicSummaryMapperV2_1 = require("../common/publicSummaryMapperV2");
const chatMappersV2_1 = require("../common/chatMappersV2");
function activeGroupsResponse(value) {
    return {
        timestamp: value.Success.timestamp,
        activeGroups: value.Success.active_groups.map(mapping_1.principalBytesToString),
        activeCommunities: value.Success.active_communities.map(mapping_1.principalBytesToString),
        deletedCommunities: value.Success.deleted_communities.map((d) => ({
            id: (0, mapping_1.principalBytesToString)(d.id),
            timestamp: d.timestamp,
            deletedBy: (0, mapping_1.principalBytesToString)(d.deleted_by),
            name: d.name,
            public: d.public,
        })),
        deletedGroups: value.Success.deleted_groups.map((d) => ({
            id: (0, mapping_1.principalBytesToString)(d.id),
            timestamp: d.timestamp,
            deletedBy: (0, mapping_1.principalBytesToString)(d.deleted_by),
            name: d.name,
            public: d.public,
        })),
    };
}
exports.activeGroupsResponse = activeGroupsResponse;
function recommendedGroupsResponse(value) {
    if ("Success" in value) {
        return value.Success.groups.map((g) => (0, publicSummaryMapperV2_1.publicGroupSummary)(g, false));
    }
    throw new Error(`Unknown GroupIndex.RecommendedGroupsResponse of ${value}`);
}
exports.recommendedGroupsResponse = recommendedGroupsResponse;
function lookupChannelResponse(value) {
    if (value !== "NotFound" && "Success" in value) {
        return {
            kind: "channel",
            communityId: (0, mapping_1.principalBytesToString)(value.Success.community_id),
            channelId: value.Success.channel_id.toString(),
        };
    }
    console.warn("ApiLookupChannelByGroupIdResponse failed with ", value);
    return undefined;
}
exports.lookupChannelResponse = lookupChannelResponse;
function exploreCommunitiesResponse(value) {
    if (value === "InvalidTerm" ||
        value === "InvalidFlags" ||
        "TermTooShort" in value ||
        "TermTooLong" in value) {
        return { kind: "term_invalid" };
    }
    if ("Success" in value) {
        return {
            kind: "success",
            matches: value.Success.matches.map(communityMatch),
            total: value.Success.total,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected GroupIndex.ExploreCommunitiesResponse type received", value);
}
exports.exploreCommunitiesResponse = exploreCommunitiesResponse;
function exploreGroupsResponse(value) {
    if (value === "InvalidTerm" || "TermTooShort" in value || "TermTooLong" in value) {
        return { kind: "term_invalid" };
    }
    if ("Success" in value) {
        return {
            kind: "success",
            matches: value.Success.matches.map(groupMatch),
            total: value.Success.total,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected GroupIndex.ExploreGroupsResponse type received", value);
}
exports.exploreGroupsResponse = exploreGroupsResponse;
function freezeGroupResponse(value) {
    if (value === "ChatAlreadyFrozen") {
        return "chat_already_frozen";
    }
    if (value === "ChatNotFound") {
        return "chat_not_found";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("Success" in value) {
        return {
            event: {
                kind: "chat_frozen",
                frozenBy: (0, mapping_1.principalBytesToString)(value.Success.event.frozen_by),
                reason: value.Success.event.reason,
            },
            timestamp: value.Success.timestamp,
            index: value.Success.index,
            expiresAt: (0, mapping_1.mapOptional)(value.Success.expires_at, Number),
        };
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiFreezeGroupResponse type received", value);
}
exports.freezeGroupResponse = freezeGroupResponse;
function freezeCommunityResponse(value) {
    if (value === "CommunityAlreadyFrozen") {
        return "community_already_frozen";
    }
    if (value === "CommunityNotFound") {
        return "community_not_found";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("Success" in value) {
        return "success";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiFreezeCommunityResponse type received", value);
}
exports.freezeCommunityResponse = freezeCommunityResponse;
function unfreezeCommunityResponse(value) {
    if (value === "CommunityNotFrozen") {
        return "community_not_frozen";
    }
    if (value === "CommunityNotFound") {
        return "community_not_found";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("Success" in value) {
        return "success";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiUnfreezeCommunityResponse type received", value);
}
exports.unfreezeCommunityResponse = unfreezeCommunityResponse;
function unfreezeGroupResponse(value) {
    if (value === "ChatNotFrozen") {
        return "chat_not_frozen";
    }
    if (value === "ChatNotFound") {
        return "chat_not_found";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("Success" in value) {
        return {
            event: {
                kind: "chat_unfrozen",
                unfrozenBy: (0, mapping_1.principalBytesToString)(value.Success.event.unfrozen_by),
            },
            timestamp: value.Success.timestamp,
            index: value.Success.index,
            expiresAt: (0, mapping_1.mapOptional)(value.Success.expires_at, Number),
        };
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiUnfreezeGroupResponse type received", value);
}
exports.unfreezeGroupResponse = unfreezeGroupResponse;
function deleteFrozenGroupResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "ChatNotFrozen") {
        return "chat_not_frozen";
    }
    if (value === "ChatNotFound") {
        return "chat_not_found";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiDeleteFrozenGroupResponse type received", value);
}
exports.deleteFrozenGroupResponse = deleteFrozenGroupResponse;
function addHotGroupExclusionResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "ChatAlreadyExcluded") {
        return "chat_already_excluded";
    }
    if (value === "ChatNotFound") {
        return "chat_not_found";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiAddHotGroupExclusionResponse type received", value);
}
exports.addHotGroupExclusionResponse = addHotGroupExclusionResponse;
function removeHotGroupExclusionResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "ChatNotExcluded") {
        return "chat_not_excluded";
    }
    if (value === "ChatNotFound") {
        return "chat_not_found";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiRemoveHotGroupExclusionResponse type received", value);
}
exports.removeHotGroupExclusionResponse = removeHotGroupExclusionResponse;
function setUpgradeConcurrencyResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSetUpgradeConcurrencyResponse type received", value);
}
exports.setUpgradeConcurrencyResponse = setUpgradeConcurrencyResponse;
function setCommunityModerationFlagsResponse(value) {
    if (value === "Success" || value === "Unchanged") {
        return "success";
    }
    if (value === "CommunityNotFound") {
        return "community_not_found";
    }
    if (value === "InvalidFlags") {
        return "invalid_flags";
    }
    if (value === "NotAuthorized") {
        return "not_authorized";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSetCommunityModerationFlagsResponse type received", value);
}
exports.setCommunityModerationFlagsResponse = setCommunityModerationFlagsResponse;
function groupMatch(value) {
    return {
        chatId: { kind: "group_chat", groupId: (0, mapping_1.principalBytesToString)(value.id) },
        name: value.name,
        description: value.description,
        subtype: (0, mapping_1.mapOptional)(value.subtype, chatMappersV2_1.groupSubtype),
        blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (blobId) => ({
            blobId,
            canisterId: (0, mapping_1.principalBytesToString)(value.id),
        })),
    };
}
function communityMatch(value) {
    return {
        id: { kind: "community", communityId: (0, mapping_1.principalBytesToString)(value.id) },
        name: value.name,
        description: value.description,
        avatar: {
            blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (blobId) => ({
                blobId,
                canisterId: (0, mapping_1.principalBytesToString)(value.id),
            })),
        },
        banner: {
            blobReference: (0, mapping_1.mapOptional)(value.banner_id, (blobId) => ({
                blobId,
                canisterId: (0, mapping_1.principalBytesToString)(value.id),
            })),
        },
        memberCount: value.member_count,
        channelCount: value.channel_count,
        gateConfig: (0, mapping_1.mapOptional)(value.gate_config, chatMappersV2_1.accessGateConfig) ?? {
            expiry: undefined,
            gate: { kind: "no_gate" },
        },
        flags: value.moderation_flags,
        primaryLanguage: value.primary_language === "" ? "en" : value.primary_language,
    };
}
