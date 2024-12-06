import type { ChannelNotification, DirectNotification, GroupNotification, Notification } from "../domain";
export type MessageNotification = DirectNotification | GroupNotification | ChannelNotification;
export declare function isMessageNotification(notification: Notification): notification is MessageNotification;
