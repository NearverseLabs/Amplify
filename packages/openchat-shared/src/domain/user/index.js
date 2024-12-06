"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOrUserGroupId = exports.userOrUserGroupName = exports.userStatus = exports.missingUserIds = exports.extractUserIdsFromMentions = void 0;
__exportStar(require("./user"), exports);
var user_utils_1 = require("./user.utils");
Object.defineProperty(exports, "extractUserIdsFromMentions", { enumerable: true, get: function () { return user_utils_1.extractUserIdsFromMentions; } });
Object.defineProperty(exports, "missingUserIds", { enumerable: true, get: function () { return user_utils_1.missingUserIds; } });
Object.defineProperty(exports, "userStatus", { enumerable: true, get: function () { return user_utils_1.userStatus; } });
Object.defineProperty(exports, "userOrUserGroupName", { enumerable: true, get: function () { return user_utils_1.userOrUserGroupName; } });
Object.defineProperty(exports, "userOrUserGroupId", { enumerable: true, get: function () { return user_utils_1.userOrUserGroupId; } });
