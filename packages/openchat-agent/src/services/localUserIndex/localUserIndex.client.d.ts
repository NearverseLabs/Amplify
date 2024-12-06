import type { HttpAgent, Identity } from "@dfinity/agent";
import type { AccessTokenType, ChannelIdentifier, ChatEventsArgs, ChatEventsResponse, ChatIdentifier, GroupAndCommunitySummaryUpdatesArgs, GroupAndCommunitySummaryUpdatesResponse, JoinCommunityResponse, JoinGroupResponse, RegisterUserResponse, VerifiedCredentialArgs } from "openchat-shared";
import { CandidService } from "../candidService";
import { type Database } from "../../utils/caching";
export declare class LocalUserIndexClient extends CandidService {
    private db;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string, db: Database);
    groupAndCommunitySummaryUpdates(requests: GroupAndCommunitySummaryUpdatesArgs[]): Promise<GroupAndCommunitySummaryUpdatesResponse[]>;
    chatEvents(requests: ChatEventsArgs[], cachePrimer?: boolean): Promise<ChatEventsResponse[]>;
    private getEventsFromCache;
    private getChatEventsFromBackend;
    registerUser(username: string, referralCode: string | undefined): Promise<RegisterUserResponse>;
    joinCommunity(communityId: string, inviteCode: string | undefined, credentialArgs: VerifiedCredentialArgs | undefined, referredBy?: string): Promise<JoinCommunityResponse>;
    joinGroup(chatId: string, inviteCode: string | undefined, credentialArgs: VerifiedCredentialArgs | undefined): Promise<JoinGroupResponse>;
    joinChannel(id: ChannelIdentifier, inviteCode: string | undefined, credentialArgs: VerifiedCredentialArgs | undefined, referredBy?: string): Promise<JoinGroupResponse>;
    inviteUsersToCommunity(communityId: string, userIds: string[], callerUsername: string): Promise<boolean>;
    inviteUsersToGroup(chatId: string, userIds: string[], callerUsername: string): Promise<boolean>;
    inviteUsersToChannel(communityId: string, channelId: string, userIds: string[], callerUsername: string): Promise<boolean>;
    getAccessToken(chatId: ChatIdentifier, accessType: AccessTokenType): Promise<string | undefined>;
}
