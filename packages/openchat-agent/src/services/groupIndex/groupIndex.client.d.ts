import type { HttpAgent, Identity } from "@dfinity/agent";
import type { AddHotGroupExclusionResponse, DeleteFrozenGroupResponse, FreezeGroupResponse, GroupChatSummary, RemoveHotGroupExclusionResponse, SetCommunityModerationFlagsResponse, SetGroupUpgradeConcurrencyResponse, UnfreezeGroupResponse, GroupSearchResponse, CommunityIdentifier, GroupChatIdentifier, ActiveGroupsResponse, ExploreCommunitiesResponse, ChannelIdentifier, FreezeCommunityResponse, UnfreezeCommunityResponse } from "openchat-shared";
import { CandidService } from "../candidService";
export declare class GroupIndexClient extends CandidService {
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    activeGroups(communityIds: CommunityIdentifier[], groupIds: GroupChatIdentifier[], activeSince: bigint): Promise<ActiveGroupsResponse>;
    recommendedGroups(exclusions: string[]): Promise<GroupChatSummary[]>;
    searchGroups(searchTerm: string, maxResults?: number): Promise<GroupSearchResponse>;
    lookupChannelByGroupId(id: GroupChatIdentifier): Promise<ChannelIdentifier | undefined>;
    exploreCommunities(searchTerm: string | undefined, pageIndex: number, pageSize: number, flags: number, languages: string[]): Promise<ExploreCommunitiesResponse>;
    freezeGroup(chatId: string, reason: string | undefined): Promise<FreezeGroupResponse>;
    freezeCommunity(id: CommunityIdentifier, reason: string | undefined): Promise<FreezeCommunityResponse>;
    unfreezeCommunity(id: CommunityIdentifier): Promise<UnfreezeCommunityResponse>;
    unfreezeGroup(chatId: string): Promise<UnfreezeGroupResponse>;
    deleteFrozenGroup(chatId: string): Promise<DeleteFrozenGroupResponse>;
    addHotGroupExclusion(chatId: string): Promise<AddHotGroupExclusionResponse>;
    removeHotGroupExclusion(chatId: string): Promise<RemoveHotGroupExclusionResponse>;
    setCommunityModerationFlags(communityId: string, flags: number): Promise<SetCommunityModerationFlagsResponse>;
    setGroupUpgradeConcurrency(value: number): Promise<SetGroupUpgradeConcurrencyResponse>;
    setCommunityUpgradeConcurrency(value: number): Promise<SetGroupUpgradeConcurrencyResponse>;
    markLocalGroupIndexFull(canisterId: string, full: boolean): Promise<boolean>;
}
