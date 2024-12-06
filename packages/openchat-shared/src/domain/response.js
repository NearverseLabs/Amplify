"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonResponses = void 0;
exports.CommonResponses = {
    userNotInChannel: () => ({ kind: "user_not_in_channel" }),
    chatNotFound: () => ({ kind: "chat_not_found" }),
    userLimitReached: () => ({ kind: "user_limit_reached" }),
    notAuthorized: () => ({ kind: "not_authorized" }),
    success: () => ({ kind: "success" }),
    successNoUpdates: () => ({ kind: "success_no_updates" }),
    userNotInCommunity: () => ({ kind: "user_not_in_community" }),
    userSuspended: () => ({ kind: "user_suspended" }),
    userLapsed: () => ({ kind: "user_lapsed" }),
    communityFrozen: () => ({ kind: "community_frozen" }),
    communityPublic: () => ({ kind: "community_public" }),
    messageNotFound: () => ({ kind: "message_not_found" }),
    noChange: () => ({ kind: "no_change" }),
    communityNotPublic: () => ({ kind: "community_not_public" }),
    internalError: (error) => ({ kind: "internal_error", error }),
    invalid: () => ({ kind: "invalid" }),
    targetUserNotInCommunity: () => ({ kind: "target_user_not_in_community" }),
    notPlatformModerator: () => ({ kind: "not_platform_moderator" }),
    userBlocked: () => ({ kind: "user_blocked" }),
    failure: () => ({ kind: "failure" }),
    offline: () => ({ kind: "offline" }),
    blocked: () => ({ kind: "blocked" }),
    userNotFound: () => ({ kind: "unknown_user" }),
};
