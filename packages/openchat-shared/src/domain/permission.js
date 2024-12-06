"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptionalMessagePermissions = exports.defaultOptionalChatPermissions = exports.communityPermissionsList = exports.chatPermissionsList = exports.messagePermissionsList = exports.communityRoles = exports.chatRoles = exports.allRoles = void 0;
exports.allRoles = ["none", "owner", "admin", "moderator", "member"];
exports.chatRoles = exports.allRoles;
exports.communityRoles = ["owner", "admin", "member"];
exports.messagePermissionsList = [
    "text",
    "image",
    "video",
    "audio",
    "file",
    "poll",
    "crypto",
    "giphy",
    "prize",
    "memeFighter",
    "p2pSwap",
];
exports.chatPermissionsList = [
    "changeRoles",
    "updateGroup",
    "inviteUsers",
    "addMembers",
    "removeMembers",
    "deleteMessages",
    "pinMessages",
    "reactToMessages",
    "mentionAllMembers",
    "startVideoCall",
];
exports.communityPermissionsList = [
    "changeRoles",
    "updateDetails",
    "inviteUsers",
    "removeMembers",
    "createPublicChannel",
    "createPrivateChannel",
    "manageUserGroups",
];
function defaultOptionalChatPermissions() {
    return {
        messagePermissions: undefined,
        threadPermissions: undefined,
    };
}
exports.defaultOptionalChatPermissions = defaultOptionalChatPermissions;
function defaultOptionalMessagePermissions() {
    return {
        default: undefined,
        text: undefined,
        image: undefined,
        video: undefined,
        audio: undefined,
        file: undefined,
        poll: undefined,
        crypto: undefined,
        giphy: undefined,
        prize: undefined,
        memeFighter: undefined,
        p2pSwap: undefined,
    };
}
exports.defaultOptionalMessagePermissions = defaultOptionalMessagePermissions;
