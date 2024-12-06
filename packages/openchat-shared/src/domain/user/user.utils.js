"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOrUserGroupId = exports.userOrUserGroupName = exports.extractUserIdsFromMentions = exports.missingUserIds = exports.userStatus = void 0;
const constants_1 = require("../../constants");
const user_1 = require("./user");
function userStatus(lastOnline, now) {
    if (lastOnline === undefined || lastOnline === 0)
        return user_1.UserStatus.None;
    const secondsSinceOnline = (now - lastOnline) / 1000;
    return secondsSinceOnline < constants_1.ONLINE_THRESHOLD ? user_1.UserStatus.Online : user_1.UserStatus.Offline;
}
exports.userStatus = userStatus;
function missingUserIds(userLookup, userIds) {
    const missing = [];
    for (const userId of userIds) {
        if (!userLookup.has(userId)) {
            missing.push(userId);
        }
    }
    return missing;
}
exports.missingUserIds = missingUserIds;
const mentionRegex = /@UserId\(([\d\w-]+)\)/g;
function extractUserIdsFromMentions(text) {
    return [...text.matchAll(mentionRegex)].map((m) => m[1]);
}
exports.extractUserIdsFromMentions = extractUserIdsFromMentions;
function userOrUserGroupName(u) {
    switch (u.kind) {
        case "user_group":
            return u.name;
        case "everyone":
            return u.kind;
        default:
            return u.username;
    }
}
exports.userOrUserGroupName = userOrUserGroupName;
function userOrUserGroupId(u) {
    switch (u.kind) {
        case "user":
        case "bot":
            return u.userId;
        default:
            return undefined;
    }
}
exports.userOrUserGroupId = userOrUserGroupId;
