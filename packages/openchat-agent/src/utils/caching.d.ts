import { type DBSchema, type IDBPDatabase } from "idb";
import type { ChatEvent, ChatIdentifier, ChatStateFull, EventsResponse, EventsSuccessResult, EventWrapper, ExpiredEventsRange, ExpiredMessagesRange, GroupChatDetails, IndexRange, Message, SendMessageResponse, UpdatedEvent, MessageContext, CommunityDetails, CreatedUser, DiamondMembershipStatus, CurrentUserSummary, ExternalAchievement, MessageActivityEvent } from "openchat-shared";
import { ChatMap, MessageContextMap } from "openchat-shared";
import type { Principal } from "@dfinity/principal";
export type Database = Promise<IDBPDatabase<ChatSchema>>;
export type EnhancedWrapper<T extends ChatEvent> = EventWrapper<T> & {
    kind: "event";
    chatId: ChatIdentifier;
    messageKey: string | undefined;
};
export interface ChatSchema extends DBSchema {
    chats: {
        key: string;
        value: ChatStateFull;
    };
    chat_events: {
        key: string;
        value: EnhancedWrapper<ChatEvent> | ExpiredEventsRange;
        indexes: {
            messageIdx: string;
            expiresAt: number;
        };
    };
    thread_events: {
        key: string;
        value: EnhancedWrapper<ChatEvent>;
        indexes: {
            messageIdx: string;
        };
    };
    expiredMessageRanges: {
        key: string;
        value: ExpiredMessagesRange;
    };
    group_details: {
        key: string;
        value: GroupChatDetails;
    };
    community_details: {
        key: string;
        value: CommunityDetails;
    };
    failed_chat_messages: {
        key: string;
        value: EnhancedWrapper<Message>;
    };
    failed_thread_messages: {
        key: string;
        value: EnhancedWrapper<Message>;
    };
    cachePrimer: {
        key: string;
        value: bigint;
    };
    currentUser: {
        key: string;
        value: CreatedUser;
    };
    localUserIndex: {
        key: string;
        value: string;
    };
    externalAchievements: {
        key: string;
        value: {
            lastUpdated: bigint;
            achievements: ExternalAchievement[];
        };
    };
    activityFeed: {
        key: string;
        value: MessageActivityEvent[];
    };
}
export declare function createFailedCacheKey(context: MessageContext, messageId: bigint): string;
export declare function createCacheKey(context: MessageContext, index: number): string;
export declare function openCache(principal: Principal): Database;
export declare function openDbAndGetCachedChats(principal: Principal): Promise<ChatStateFull | undefined>;
export declare function getCachedChats(db: Database, principal: Principal): Promise<ChatStateFull | undefined>;
export declare function setCachedChats(db: Database, principal: Principal, chatState: ChatStateFull, updatedEvents: ChatMap<UpdatedEvent[]>): Promise<void>;
export declare function getCachedEvents(db: Database, eventIndexRange: IndexRange, context: MessageContext, startIndex: number, ascending: boolean, maxEvents?: number, maxMessages?: number, maxMissing?: number): Promise<[EventsSuccessResult<ChatEvent>, Set<number>]>;
export declare function getCachedEventsWindowByMessageIndex(db: Database, eventIndexRange: IndexRange, context: MessageContext, messageIndex: number, maxEvents?: number, maxMessages?: number, maxMissing?: number): Promise<[EventsSuccessResult<ChatEvent>, Set<number>, boolean]>;
export declare function getCachedEventsWindow(db: Database, eventIndexRange: IndexRange, context: MessageContext, startIndex: number, maxEvents?: number, maxMessages?: number, maxMissing?: number): Promise<[EventsSuccessResult<ChatEvent>, Set<number>]>;
export declare function getCachedEventByIndex(db: IDBPDatabase<ChatSchema>, eventIndex: number, context: MessageContext, now?: number): Promise<EnhancedWrapper<ChatEvent> | ExpiredEventsRange | undefined>;
export declare function getCachedEventsByIndex(db: Database, eventIndexes: number[], context: MessageContext): Promise<[EventsSuccessResult<ChatEvent>, Set<number>]>;
export declare function getNearestCachedEventIndexForMessageIndex(db: Database, context: MessageContext, messageIndex: number, iterations?: number): Promise<number | undefined>;
export declare function mergeSuccessResponses(a: EventsSuccessResult<ChatEvent>, b: EventsSuccessResult<ChatEvent>): EventsSuccessResult<ChatEvent>;
export declare function removeFailedMessage(db: Database, chatId: ChatIdentifier, messageId: bigint, threadRootMessageIndex?: number): Promise<void>;
export declare function recordFailedMessage<T extends Message>(db: Database, chatId: ChatIdentifier, event: EventWrapper<T>, threadRootMessageIndex?: number): Promise<void>;
export declare function loadFailedMessages(db: Database): Promise<MessageContextMap<Record<string, EventWrapper<Message>>>>;
export declare function setCachedEvents(db: Database, chatId: ChatIdentifier, resp: EventsResponse<ChatEvent>, threadRootMessageIndex: number | undefined): Promise<void>;
export declare function setCachedMessageFromSendResponse(db: Database, chatId: ChatIdentifier, sentEvent: EventWrapper<Message>, threadRootMessageIndex?: number): ([resp, message]: [SendMessageResponse, Message]) => [SendMessageResponse, Message];
export declare function setCachedMessageIfNotExists(db: Database, chatId: ChatIdentifier, messageEvent: EventWrapper<Message>, threadRootMessageIndex?: number): Promise<void>;
export declare function getCachePrimerTimestamps(db: Database): Promise<Record<string, bigint>>;
export declare function setCachePrimerTimestamp(db: Database, chatId: ChatIdentifier, timestamp: bigint): Promise<void>;
export declare function getCachedCommunityDetails(db: Database, communityId: string): Promise<CommunityDetails | undefined>;
export declare function getCachedGroupDetails(db: Database, chatId: string): Promise<GroupChatDetails | undefined>;
export declare function setCachedCommunityDetails(db: Database, communityId: string, communityDetails: CommunityDetails): Promise<void>;
export declare function setCachedGroupDetails(db: Database, chatId: string, groupDetails: GroupChatDetails): Promise<void>;
export declare function getDb(): Database | undefined;
export declare function initDb(principal: Principal): Database;
export declare function closeDb(): void;
export declare function loadMessagesByMessageIndex(db: Database, chatId: ChatIdentifier, messagesIndexes: Set<number>): Promise<{
    messageEvents: EventWrapper<Message>[];
    missing: Set<number>;
}>;
export declare function getCachedCurrentUser(principal: string): Promise<CreatedUser | undefined>;
export declare function mergeCachedCurrentUser(principal: string, updated: CurrentUserSummary): Promise<void>;
export declare function setCachedCurrentUser(principal: string, user: CreatedUser): Promise<void>;
export declare function setCurrentUserDiamondStatusInCache(principal: string, diamondStatus: DiamondMembershipStatus): Promise<void>;
export declare function getLocalUserIndexForUser(userId: string): Promise<string | undefined>;
export declare function cacheLocalUserIndexForUser(userId: string, localUserIndex: string): Promise<string>;
export declare function clearCache(principal: string): Promise<void>;
export declare function getCachedExternalAchievements(): Promise<{
    lastUpdated: bigint;
    achievements: ExternalAchievement[];
} | undefined>;
export declare function setCachedExternalAchievements(lastUpdated: bigint, achievements: ExternalAchievement[]): Promise<void>;
export declare function getActivityFeedEvents(): Promise<MessageActivityEvent[]>;
export declare function setActivityFeedEvents(activity: MessageActivityEvent[]): Promise<void>;
