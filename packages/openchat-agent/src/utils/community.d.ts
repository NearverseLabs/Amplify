import type { CommunityCanisterCommunitySummaryUpdates, UserCanisterCommunitySummaryUpdates, CommunitySummary, CommunitySummaryResponse, UserCanisterCommunitySummary, ChannelSummary, UserCanisterChannelSummary } from "openchat-shared";
export declare function mergeCommunities(userCanisterCommunities: UserCanisterCommunitySummary[], communityCanisterCommunities: CommunitySummary[]): CommunitySummary[];
export declare function mergeChannels(userCanisterChannels: UserCanisterChannelSummary[], communityCanisterChannels: ChannelSummary[]): ChannelSummary[];
export declare function mergeCommunityUpdates(communities: CommunitySummary[], userCanisterUpdates: UserCanisterCommunitySummaryUpdates[], communityCanisterUpdates: CommunityCanisterCommunitySummaryUpdates[]): CommunitySummary[];
export declare function isSuccessfulCommunitySummaryResponse(response: CommunitySummaryResponse): response is CommunitySummary;
