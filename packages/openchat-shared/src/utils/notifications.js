"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMessageNotification = void 0;
function isMessageNotification(notification) {
    return (notification.kind === "direct_notification" ||
        notification.kind === "group_notification" ||
        notification.kind === "channel_notification");
}
exports.isMessageNotification = isMessageNotification;
