"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directNotification = exports.groupNotification = exports.channelNotification = exports.addedToChannelNotification = exports.notification = exports.subscriptionExistsResponse = exports.toggleNotificationsResponse = void 0;
const mapping_1 = require("../../utils/mapping");
function toggleNotificationsResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("MuteNotification failed with: ", value);
        return "failure";
    }
}
exports.toggleNotificationsResponse = toggleNotificationsResponse;
function subscriptionExistsResponse(value) {
    return value === "Yes";
}
exports.subscriptionExistsResponse = subscriptionExistsResponse;
function notification(candid, timestamp) {
    if ("AddedToChannel" in candid) {
        return addedToChannelNotification(candid.AddedToChannel, timestamp);
    }
    if ("ChannelMessage" in candid) {
        return channelNotification(candid.ChannelMessage, timestamp);
    }
    if ("GroupMessage" in candid) {
        return groupNotification(candid.GroupMessage, timestamp);
    }
    if ("DirectMessage" in candid) {
        return directNotification(candid.DirectMessage, timestamp);
    }
    if ("ChannelReactionAdded" in candid) {
        return channelReactionNotification(candid.ChannelReactionAdded, timestamp);
    }
    if ("GroupReactionAdded" in candid) {
        return groupReactionNotification(candid.GroupReactionAdded, timestamp);
    }
    if ("DirectReactionAdded" in candid) {
        return directReactionNotification(candid.DirectReactionAdded, timestamp);
    }
    if ("ChannelMessageTipped" in candid) {
        return channelMessageTipped(candid.ChannelMessageTipped, timestamp);
    }
    if ("GroupMessageTipped" in candid) {
        return groupMessageTipped(candid.GroupMessageTipped, timestamp);
    }
    if ("DirectMessageTipped" in candid) {
        return directMessageTipped(candid.DirectMessageTipped, timestamp);
    }
    throw new Error(`Unexpected ApiNotification type received, ${candid}`);
}
exports.notification = notification;
function addedToChannelNotification(candid, timestamp) {
    return {
        kind: "added_to_channel_notification",
        chatId: {
            kind: "channel",
            communityId: candid.community_id.toString(),
            channelId: candid.channel_id.toString(),
        },
        communityName: candid.community_name,
        channelName: candid.channel_name,
        addedBy: candid.added_by.toString(),
        addedByUsername: candid.added_by_name,
        addedByDisplayName: (0, mapping_1.optional)(candid.added_by_display_name, mapping_1.identity),
        communityAvatarId: (0, mapping_1.optional)(candid.community_avatar_id, mapping_1.identity),
        channelAvatarId: (0, mapping_1.optional)(candid.channel_avatar_id, mapping_1.identity),
        timestamp,
    };
}
exports.addedToChannelNotification = addedToChannelNotification;
function channelNotification(candid, timestamp) {
    return {
        kind: "channel_notification",
        sender: candid.sender.toString(),
        threadRootMessageIndex: (0, mapping_1.optional)(candid.thread_root_message_index, mapping_1.identity),
        messageIndex: candid.message_index,
        messageEventIndex: candid.event_index,
        senderName: candid.sender_name,
        senderDisplayName: (0, mapping_1.optional)(candid.sender_display_name, mapping_1.identity),
        chatId: {
            kind: "channel",
            communityId: candid.community_id.toString(),
            channelId: candid.channel_id.toString(),
        },
        communityName: candid.community_name,
        channelName: candid.channel_name,
        messageType: candid.message_type,
        messageText: (0, mapping_1.optional)(candid.message_text, mapping_1.identity),
        imageUrl: (0, mapping_1.optional)(candid.image_url, mapping_1.identity),
        communityAvatarId: (0, mapping_1.optional)(candid.community_avatar_id, mapping_1.identity),
        channelAvatarId: (0, mapping_1.optional)(candid.channel_avatar_id, mapping_1.identity),
        cryptoTransfer: (0, mapping_1.optional)(candid.crypto_transfer, cryptoTransfer),
        timestamp,
    };
}
exports.channelNotification = channelNotification;
function groupNotification(candid, timestamp) {
    return {
        kind: "group_notification",
        sender: candid.sender.toString(),
        threadRootMessageIndex: (0, mapping_1.optional)(candid.thread_root_message_index, mapping_1.identity),
        messageIndex: candid.message_index,
        messageEventIndex: candid.event_index,
        senderName: candid.sender_name,
        senderDisplayName: (0, mapping_1.optional)(candid.sender_display_name, mapping_1.identity),
        chatId: { kind: "group_chat", groupId: candid.chat_id.toString() },
        groupName: candid.group_name,
        messageType: candid.message_type,
        messageText: (0, mapping_1.optional)(candid.message_text, mapping_1.identity),
        imageUrl: (0, mapping_1.optional)(candid.image_url, mapping_1.identity),
        groupAvatarId: (0, mapping_1.optional)(candid.group_avatar_id, mapping_1.identity),
        cryptoTransfer: (0, mapping_1.optional)(candid.crypto_transfer, cryptoTransfer),
        timestamp,
    };
}
exports.groupNotification = groupNotification;
function directNotification(candid, timestamp) {
    return {
        kind: "direct_notification",
        chatId: { kind: "direct_chat", userId: candid.sender.toString() },
        messageIndex: candid.message_index,
        messageEventIndex: candid.event_index,
        username: candid.sender_name,
        displayName: (0, mapping_1.optional)(candid.sender_display_name, mapping_1.identity),
        messageType: candid.message_type,
        messageText: (0, mapping_1.optional)(candid.message_text, mapping_1.identity),
        imageUrl: (0, mapping_1.optional)(candid.image_url, mapping_1.identity),
        userAvatarId: (0, mapping_1.optional)(candid.sender_avatar_id, mapping_1.identity),
        cryptoTransfer: (0, mapping_1.optional)(candid.crypto_transfer, cryptoTransfer),
        timestamp,
    };
}
exports.directNotification = directNotification;
function channelReactionNotification(candid, timestamp) {
    return {
        kind: "channel_reaction",
        chatId: {
            kind: "channel",
            communityId: candid.community_id.toString(),
            channelId: candid.channel_id.toString(),
        },
        communityName: candid.community_name,
        channelName: candid.channel_name,
        threadRootMessageIndex: (0, mapping_1.optional)(candid.thread_root_message_index, mapping_1.identity),
        messageIndex: candid.message_index,
        messageEventIndex: candid.message_event_index,
        addedBy: candid.added_by.toString(),
        addedByName: candid.added_by_name,
        addedByDisplayName: (0, mapping_1.optional)(candid.added_by_display_name, mapping_1.identity),
        reaction: candid.reaction,
        communityAvatarId: (0, mapping_1.optional)(candid.community_avatar_id, mapping_1.identity),
        channelAvatarId: (0, mapping_1.optional)(candid.channel_avatar_id, mapping_1.identity),
        timestamp,
    };
}
function groupReactionNotification(candid, timestamp) {
    return {
        kind: "group_reaction",
        chatId: { kind: "group_chat", groupId: candid.chat_id.toString() },
        threadRootMessageIndex: (0, mapping_1.optional)(candid.thread_root_message_index, mapping_1.identity),
        messageIndex: candid.message_index,
        messageEventIndex: candid.message_event_index,
        groupName: candid.group_name,
        addedBy: candid.added_by.toString(),
        addedByName: candid.added_by_name,
        addedByDisplayName: (0, mapping_1.optional)(candid.added_by_display_name, mapping_1.identity),
        reaction: candid.reaction,
        groupAvatarId: (0, mapping_1.optional)(candid.group_avatar_id, mapping_1.identity),
        timestamp,
    };
}
function directReactionNotification(candid, timestamp) {
    return {
        kind: "direct_reaction",
        chatId: { kind: "direct_chat", userId: candid.them.toString() },
        messageIndex: candid.message_index,
        messageEventIndex: candid.message_event_index,
        username: candid.username,
        displayName: (0, mapping_1.optional)(candid.display_name, mapping_1.identity),
        reaction: candid.reaction,
        userAvatarId: (0, mapping_1.optional)(candid.user_avatar_id, mapping_1.identity),
        timestamp,
    };
}
function channelMessageTipped(candid, timestamp) {
    return {
        kind: "channel_message_tipped",
        chatId: {
            kind: "channel",
            communityId: candid.community_id.toString(),
            channelId: candid.channel_id.toString(),
        },
        communityName: candid.community_name,
        channelName: candid.channel_name,
        threadRootMessageIndex: (0, mapping_1.optional)(candid.thread_root_message_index, mapping_1.identity),
        messageIndex: candid.message_index,
        messageEventIndex: candid.message_event_index,
        tippedBy: candid.tipped_by.toString(),
        tippedByName: candid.tipped_by_name,
        tippedByDisplayName: (0, mapping_1.optional)(candid.tipped_by_display_name, mapping_1.identity),
        tip: candid.tip,
        communityAvatarId: (0, mapping_1.optional)(candid.community_avatar_id, mapping_1.identity),
        channelAvatarId: (0, mapping_1.optional)(candid.channel_avatar_id, mapping_1.identity),
        timestamp,
    };
}
function groupMessageTipped(candid, timestamp) {
    return {
        kind: "group_message_tipped",
        chatId: { kind: "group_chat", groupId: candid.chat_id.toString() },
        threadRootMessageIndex: (0, mapping_1.optional)(candid.thread_root_message_index, mapping_1.identity),
        messageIndex: candid.message_index,
        messageEventIndex: candid.message_event_index,
        groupName: candid.group_name,
        tippedBy: candid.tipped_by.toString(),
        tippedByName: candid.tipped_by_name,
        tippedByDisplayName: (0, mapping_1.optional)(candid.tipped_by_display_name, mapping_1.identity),
        tip: candid.tip,
        groupAvatarId: (0, mapping_1.optional)(candid.group_avatar_id, mapping_1.identity),
        timestamp,
    };
}
function directMessageTipped(candid, timestamp) {
    return {
        kind: "direct_message_tipped",
        chatId: { kind: "direct_chat", userId: candid.them.toString() },
        messageIndex: candid.message_index,
        messageEventIndex: candid.message_event_index,
        username: candid.username,
        displayName: (0, mapping_1.optional)(candid.display_name, mapping_1.identity),
        tip: candid.tip,
        userAvatarId: (0, mapping_1.optional)(candid.user_avatar_id, mapping_1.identity),
        timestamp,
    };
}
function cryptoTransfer(candid) {
    return {
        recipient: candid.recipient.toString(),
        recipientUsername: (0, mapping_1.optional)(candid.recipient_username, mapping_1.identity),
        ledger: candid.ledger.toString(),
        symbol: candid.symbol,
        amount: candid.amount,
    };
}
