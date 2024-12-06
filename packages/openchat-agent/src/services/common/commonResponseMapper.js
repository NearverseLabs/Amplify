"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCommonResponses = void 0;
const openchat_shared_1 = require("openchat-shared");
function mapCommonResponses(value, name) {
    return mapCommonResponsesInner(value, name);
}
exports.mapCommonResponses = mapCommonResponses;
function mapCommonResponsesInner(value, name) {
    if (typeof value === "string") {
        switch (value) {
            case "Success":
            case "SuccessV2":
                return "success";
            case "SuccessNoUpdates":
                return "success_no_updates";
            case "AlreadyEnded":
                return "already_ended";
            case "CallerNotInGroup":
                return "caller_not_in_group";
            case "ChannelNotFound":
                return "channel_not_found";
            case "ChatFrozen":
                return "chat_frozen";
            case "ChatNotFound":
                return "chat_not_found";
            case "CommunityFrozen":
                return "community_frozen";
            case "CommunityPublic":
                return "community_public";
            case "GroupFrozen":
                return "group_frozen";
            case "GroupNotPublic":
                return "group_not_public";
            case "InternalError":
                return "internal_error";
            case "Invalid":
                return "invalid";
            case "MessageNotFound":
                return "message_not_found";
            case "NotAuthorized":
                return "not_authorized";
            case "ThreadMessageNotFound":
                return "thread_message_not_found";
            case "ThreadNotFound":
                return "thread_not_found";
            case "UserLapsed":
                return "user_lapsed";
            case "UserNotFound":
                return "user_not_found";
            case "UserNotInChannel":
                return "user_not_in_channel";
            case "UserNotInCommunity":
                return "user_not_in_community";
            case "UserNotInGroup":
                return "user_not_in_group";
            case "UserSuspended":
                return "user_suspended";
        }
    }
    else if (typeof value === "object") {
        if ("InternalError" in value) {
            return "internal_error";
        }
    }
    throw new openchat_shared_1.UnsupportedValueError(`Unexpected ${name} type received`, value);
}
