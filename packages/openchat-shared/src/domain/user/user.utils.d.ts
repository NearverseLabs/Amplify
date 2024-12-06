import type { UserLookup, UserOrUserGroup } from "./user";
import { UserStatus } from "./user";
export declare function userStatus(lastOnline: number | undefined, now: number): UserStatus;
export declare function missingUserIds(userLookup: UserLookup, userIds: Iterable<string>): string[];
export declare function extractUserIdsFromMentions(text: string): string[];
export declare function userOrUserGroupName(u: UserOrUserGroup): string;
export declare function userOrUserGroupId(u: UserOrUserGroup): string | undefined;
