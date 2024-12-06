"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationFlags = exports.anonymousUser = exports.ANON_AVATAR_URL = exports.ANON_DISPLAY_NAME = exports.ANON_USERNAME = exports.ANON_USER_ID = exports.AvatarSize = exports.UserStatus = exports.updateCreatedUser = exports.userSummaryFromCurrentUserSummary = exports.mergeUserSummaryWithUpdates = exports.deletedUser = void 0;
function deletedUser(userId) {
    return {
        kind: "user",
        userId,
        username: "Deleted User",
        displayName: undefined,
        updated: BigInt(Number.MAX_VALUE),
        suspended: false,
        diamondStatus: "inactive",
        chitBalance: 0,
        streak: 0,
        isUniquePerson: false,
        totalChitEarned: 0,
    };
}
exports.deletedUser = deletedUser;
function mergeUserSummaryWithUpdates(cached, updates, timestamp) {
    if (cached === undefined) {
        if (updates.stable === undefined || updates.volatile === undefined) {
            return undefined;
        }
        return {
            kind: updates.stable.isBot ? "bot" : "user",
            userId: updates.userId,
            ...updates.stable,
            ...updates.volatile,
            updated: timestamp,
        };
    }
    if (cached.userId !== updates.userId) {
        return undefined;
    }
    return {
        ...cached,
        ...updates.stable,
        ...updates.volatile,
    };
}
exports.mergeUserSummaryWithUpdates = mergeUserSummaryWithUpdates;
function userSummaryFromCurrentUserSummary(chitState, currentSummary) {
    return {
        kind: currentSummary.isBot ? "bot" : "user",
        userId: currentSummary.userId,
        username: currentSummary.username,
        displayName: currentSummary.displayName,
        updated: currentSummary.updated,
        suspended: currentSummary.suspensionDetails !== undefined,
        diamondStatus: currentSummary.diamondStatus.kind,
        chitBalance: chitState.chitBalance,
        totalChitEarned: chitState.totalChitEarned,
        streak: chitState.streak,
        blobReference: currentSummary.blobReference,
        blobData: currentSummary.blobData,
        blobUrl: currentSummary.blobUrl,
        isUniquePerson: currentSummary.isUniquePerson,
    };
}
exports.userSummaryFromCurrentUserSummary = userSummaryFromCurrentUserSummary;
function updateCreatedUser(created, summary) {
    return {
        ...created,
        ...summary,
        kind: "created_user",
    };
}
exports.updateCreatedUser = updateCreatedUser;
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["Offline"] = 0] = "Offline";
    UserStatus[UserStatus["Online"] = 1] = "Online";
    UserStatus[UserStatus["None"] = 2] = "None";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var AvatarSize;
(function (AvatarSize) {
    AvatarSize[AvatarSize["Tiny"] = 0] = "Tiny";
    AvatarSize[AvatarSize["Small"] = 1] = "Small";
    AvatarSize[AvatarSize["Default"] = 2] = "Default";
    AvatarSize[AvatarSize["Large"] = 3] = "Large";
})(AvatarSize || (exports.AvatarSize = AvatarSize = {}));
exports.ANON_USER_ID = "does_this_need_to_be_a_principal";
exports.ANON_USERNAME = "guest_user";
exports.ANON_DISPLAY_NAME = "Guest user";
exports.ANON_AVATAR_URL = "/assets/anon.svg";
function anonymousUser() {
    return {
        kind: "created_user",
        username: exports.ANON_USERNAME,
        dateCreated: BigInt(0),
        displayName: exports.ANON_DISPLAY_NAME,
        cryptoAccount: "",
        userId: exports.ANON_USER_ID,
        isPlatformModerator: false,
        isPlatformOperator: false,
        suspensionDetails: undefined,
        isSuspectedBot: false,
        diamondStatus: { kind: "inactive" },
        moderationFlagsEnabled: 0,
        isBot: false,
        updated: 0n,
        isUniquePerson: false,
    };
}
exports.anonymousUser = anonymousUser;
exports.ModerationFlags = {
    Offensive: 1,
    Adult: 2,
    UnderReview: 4,
};
