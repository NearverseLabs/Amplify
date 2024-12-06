"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupIndexClient = void 0;
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const typebox_1 = require("../../typebox");
const mapping_1 = require("../../utils/mapping");
class GroupIndexClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
    }
    activeGroups(communityIds, groupIds, activeSince) {
        const args = {
            group_ids: groupIds.map((c) => (0, mapping_1.principalStringToBytes)(c.groupId)),
            community_ids: communityIds.map((c) => (0, mapping_1.principalStringToBytes)(c.communityId)),
            active_since: activeSince,
        };
        return this.executeMsgpackQuery("active_groups", args, mappers_1.activeGroupsResponse, typebox_1.GroupIndexActiveGroupsArgs, typebox_1.GroupIndexActiveGroupsResponse);
    }
    recommendedGroups(exclusions) {
        const args = {
            count: 30,
            exclusions: exclusions.map(mapping_1.principalStringToBytes),
        };
        return this.executeMsgpackQuery("recommended_groups", args, mappers_1.recommendedGroupsResponse, typebox_1.GroupIndexRecommendedGroupsArgs, typebox_1.GroupIndexRecommendedGroupsResponse);
    }
    searchGroups(searchTerm, maxResults = 10) {
        const args = {
            search_term: searchTerm,
            page_index: 0,
            page_size: maxResults,
        };
        return this.executeMsgpackQuery("explore_groups", args, mappers_1.exploreGroupsResponse, typebox_1.GroupIndexExploreGroupsArgs, typebox_1.GroupIndexExploreGroupsResponse);
    }
    lookupChannelByGroupId(id) {
        return this.executeMsgpackQuery("lookup_channel_by_group_id", {
            group_id: (0, mapping_1.principalStringToBytes)(id.groupId),
        }, mappers_1.lookupChannelResponse, typebox_1.GroupIndexLookupChannelByGroupIdArgs, typebox_1.GroupIndexLookupChannelByGroupIdResponse);
    }
    exploreCommunities(searchTerm, pageIndex, pageSize, flags, languages) {
        const args = {
            languages,
            include_moderation_flags: flags,
            page_size: pageSize,
            page_index: pageIndex,
            search_term: searchTerm,
        };
        return this.executeMsgpackQuery("explore_communities", args, mappers_1.exploreCommunitiesResponse, typebox_1.GroupIndexExploreCommunitiesArgs, typebox_1.GroupIndexExploreCommunitiesResponse);
    }
    freezeGroup(chatId, reason) {
        return this.executeMsgpackUpdate("freeze_group", {
            chat_id: (0, mapping_1.principalStringToBytes)(chatId),
            reason: reason,
        }, mappers_1.freezeGroupResponse, typebox_1.GroupIndexFreezeGroupArgs, typebox_1.GroupIndexFreezeGroupResponse);
    }
    freezeCommunity(id, reason) {
        return this.executeMsgpackUpdate("freeze_community", {
            community_id: (0, mapping_1.principalStringToBytes)(id.communityId),
            reason: reason,
        }, mappers_1.freezeCommunityResponse, typebox_1.GroupIndexFreezeCommunityArgs, typebox_1.GroupIndexFreezeCommunityResponse);
    }
    unfreezeCommunity(id) {
        return this.executeMsgpackUpdate("unfreeze_community", {
            community_id: (0, mapping_1.principalStringToBytes)(id.communityId),
        }, mappers_1.unfreezeCommunityResponse, typebox_1.GroupIndexUnfreezeCommunityArgs, typebox_1.GroupIndexUnfreezeCommunityResponse);
    }
    unfreezeGroup(chatId) {
        return this.executeMsgpackUpdate("unfreeze_group", { chat_id: (0, mapping_1.principalStringToBytes)(chatId) }, mappers_1.unfreezeGroupResponse, typebox_1.GroupIndexUnfreezeGroupArgs, typebox_1.GroupIndexUnfreezeGroupResponse);
    }
    deleteFrozenGroup(chatId) {
        return this.executeMsgpackUpdate("delete_frozen_group", { chat_id: (0, mapping_1.principalStringToBytes)(chatId) }, mappers_1.deleteFrozenGroupResponse, typebox_1.GroupIndexDeleteFrozenGroupArgs, typebox_1.GroupIndexDeleteFrozenGroupResponse);
    }
    addHotGroupExclusion(chatId) {
        return this.executeMsgpackUpdate("add_hot_group_exclusion", { chat_id: (0, mapping_1.principalStringToBytes)(chatId) }, mappers_1.addHotGroupExclusionResponse, typebox_1.GroupIndexAddHotGroupExclusionArgs, typebox_1.GroupIndexAddHotGroupExclusionResponse);
    }
    removeHotGroupExclusion(chatId) {
        return this.executeMsgpackUpdate("remove_hot_group_exclusion", { chat_id: (0, mapping_1.principalStringToBytes)(chatId) }, mappers_1.removeHotGroupExclusionResponse, typebox_1.GroupIndexRemoveHotGroupExclusionArgs, typebox_1.GroupIndexRemoveHotGroupExclusionResponse);
    }
    setCommunityModerationFlags(communityId, flags) {
        return this.executeMsgpackUpdate("set_community_moderation_flags", {
            community_id: (0, mapping_1.principalStringToBytes)(communityId),
            flags,
        }, mappers_1.setCommunityModerationFlagsResponse, typebox_1.GroupIndexSetCommunityModerationFlagsArgs, typebox_1.GroupIndexSetCommunityModerationFlagsResponse);
    }
    setGroupUpgradeConcurrency(value) {
        return this.executeMsgpackUpdate("set_group_upgrade_concurrency", { value }, mappers_1.setUpgradeConcurrencyResponse, typebox_1.GroupIndexSetGroupUpgradeConcurrencyArgs, typebox_1.GroupIndexSetGroupUpgradeConcurrencyResponse);
    }
    setCommunityUpgradeConcurrency(value) {
        return this.executeMsgpackUpdate("set_community_upgrade_concurrency", { value }, mappers_1.setUpgradeConcurrencyResponse, typebox_1.GroupIndexSetCommunityUpgradeConcurrencyArgs, typebox_1.GroupIndexSetCommunityUpgradeConcurrencyResponse);
    }
    markLocalGroupIndexFull(canisterId, full) {
        return this.executeMsgpackUpdate("mark_local_group_index_full", {
            canister_id: (0, mapping_1.principalStringToBytes)(canisterId),
            full,
        }, (resp) => resp === "Success", typebox_1.GroupIndexMarkLocalGroupIndexFullArgs, typebox_1.GroupIndexMarkLocalGroupIndexFullResponse);
    }
}
exports.GroupIndexClient = GroupIndexClient;
