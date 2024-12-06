import { type DBSchema, type IDBPDatabase } from "idb";
import { type DiamondMembershipStatus, type UserSummary } from "openchat-shared";
export type UserDatabase = Promise<IDBPDatabase<UserSchema>>;
export interface UserSchema extends DBSchema {
    users: {
        key: string;
        value: UserSummary;
    };
    suspendedUsersSyncedUpTo: {
        key: "value";
        value: bigint;
    };
    deletedUserIds: {
        key: string;
        value: string;
    };
}
export declare function lazyOpenUserCache(): UserDatabase;
export declare function getCachedUsers(userIds: string[]): Promise<UserSummary[]>;
export declare function getAllUsers(): Promise<UserSummary[]>;
export declare function getCachedDeletedUserIds(): Promise<Set<string>>;
export declare function setCachedUsers(users: UserSummary[]): Promise<void>;
export declare function setCachedDeletedUserIds(deletedUserIds: Set<string>): Promise<void>;
export declare function writeCachedUsersToDatabase(db: UserDatabase, users: UserSummary[]): Promise<void>;
export declare function setUsernameInCache(userId: string, username: string): Promise<void>;
export declare function setDisplayNameInCache(userId: string, displayName: string | undefined): Promise<void>;
export declare function setUserDiamondStatusInCache(userId: string, status: DiamondMembershipStatus): Promise<void>;
export declare function getSuspendedUsersSyncedUpTo(): Promise<bigint | undefined>;
export declare function setSuspendedUsersSyncedUpTo(value: bigint): Promise<void>;
export declare function setChitInfoInCache(userId: string, chitBalance: number, streak: number): Promise<void>;
export declare function clearCache(): Promise<void>;
