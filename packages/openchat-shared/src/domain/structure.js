"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatListScopesEqual = void 0;
function chatListScopesEqual(a, b) {
    if (a.kind !== a.kind)
        return false;
    switch (a.kind) {
        case "community":
            return b.kind === "community" && b.id.communityId === a.id.communityId;
        case "favourite":
            return (b.kind === "favourite" && b.communityId?.communityId === a.communityId?.communityId);
        default:
            return true;
    }
}
exports.chatListScopesEqual = chatListScopesEqual;
