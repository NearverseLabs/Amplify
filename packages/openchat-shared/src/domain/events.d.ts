import type { ChatIdentifier, ThreadRead } from "./chat";
import type { StorageStatus } from "./data/data";
import type { UserSummary } from "./user";
export declare class StorageUpdated extends CustomEvent<StorageStatus> {
    constructor(detail: StorageStatus);
}
export declare class UsersLoaded extends CustomEvent<UserSummary[]> {
    constructor(detail: UserSummary[]);
}
export declare class MessagesReadFromServer extends CustomEvent<{
    chatId: ChatIdentifier;
    readByMeUpTo: number | undefined;
    threadsRead: ThreadRead[];
    dateReadPinned: bigint | undefined;
}> {
    constructor(chatId: ChatIdentifier, readByMeUpTo: number | undefined, threadsRead: ThreadRead[], dateReadPinned: bigint | undefined);
}
