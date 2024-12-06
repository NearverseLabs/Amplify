import type { GateCheckFailed, PinNumberFailures } from "./chat";
import type { UserNotFound } from "./user";
export type UserNotInChannel = {
    kind: "user_not_in_channel";
};
export type ChannelNotFound = {
    kind: "channel_not_found";
};
export type ChatNotFound = {
    kind: "chat_not_found";
};
export type UserLimitReached = {
    kind: "user_limit_reached";
};
export type Success = {
    kind: "success";
};
export type SuccessNoUpdates = {
    kind: "success_no_updates";
};
export type UserNotInCommunity = {
    kind: "user_not_in_community";
};
export type CommunityFrozen = {
    kind: "community_frozen";
};
export type ChatFrozen = {
    kind: "chat_frozen";
};
export type CommunityNotPublic = {
    kind: "community_not_public";
};
export type CommunityPublic = {
    kind: "community_public";
};
export type MessageNotFound = {
    kind: "message_not_found";
};
export type Offline = {
    kind: "offline";
};
export type Failure = {
    kind: "failure";
};
export type NotAuthorised = {
    kind: "not_authorized";
};
export type UserSuspended = {
    kind: "user_suspended";
};
export type UserLapsed = {
    kind: "user_lapsed";
};
export type NoChange = {
    kind: "no_change";
};
export type InternalError = {
    kind: "internal_error";
    error?: string;
};
export type Invalid = {
    kind: "invalid";
};
export type TargetUserNotInCommunity = {
    kind: "target_user_not_in_community";
};
export type UserBlocked = {
    kind: "user_blocked";
};
export type NotPlatformModerator = {
    kind: "not_platform_moderator";
};
export type Retrying = {
    kind: "retrying";
    error: string;
};
export type TransferFailed = {
    kind: "transfer_failed";
    error?: string;
};
export declare const CommonResponses: {
    userNotInChannel: () => UserNotInChannel;
    chatNotFound: () => ChatNotFound;
    userLimitReached: () => UserLimitReached;
    notAuthorized: () => NotAuthorised;
    success: () => Success;
    successNoUpdates: () => SuccessNoUpdates;
    userNotInCommunity: () => UserNotInCommunity;
    userSuspended: () => UserSuspended;
    userLapsed: () => UserLapsed;
    communityFrozen: () => CommunityFrozen;
    communityPublic: () => CommunityPublic;
    messageNotFound: () => MessageNotFound;
    noChange: () => NoChange;
    communityNotPublic: () => CommunityNotPublic;
    internalError: (error?: string) => InternalError;
    invalid: () => Invalid;
    targetUserNotInCommunity: () => TargetUserNotInCommunity;
    notPlatformModerator: () => NotPlatformModerator;
    userBlocked: () => UserBlocked;
    failure: () => Failure;
    offline: () => Offline;
    blocked: () => Blocked;
    userNotFound: () => UserNotFound;
};
export type Blocked = {
    kind: "blocked";
};
export type ApproveAccessGatePaymentResponse = Success | PinNumberFailures | Failure;
export type ClientJoinGroupResponse = Success | Blocked | GateCheckFailed | PinNumberFailures | Failure;
export type ClientJoinCommunityResponse = Success | GateCheckFailed | PinNumberFailures | Failure;
