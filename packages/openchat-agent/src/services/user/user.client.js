"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClient = void 0;
const candidService_1 = require("../candidService");
const mappersV2_1 = require("./mappersV2");
const caching_1 = require("../../utils/caching");
const chatMappersV2_1 = require("../common/chatMappersV2");
const data_client_1 = require("../data/data.client");
const mapping_1 = require("../../utils/mapping");
const rng_1 = require("../../utils/rng");
const openchat_shared_1 = require("openchat-shared");
const chunked_1 = require("../common/chunked");
const userCache_1 = require("../../utils/userCache");
const typebox_1 = require("../../typebox");
const mappers_1 = require("../notifications/mappers");
class UserClient extends candidService_1.CandidService {
    constructor(userId, identity, agent, config, db) {
        super(identity, agent, userId);
        this.config = config;
        this.db = db;
        this.userId = userId;
        this.chatId = { kind: "direct_chat", userId: userId };
    }
    setCachedEvents(chatId, resp, threadRootMessageIndex) {
        (0, caching_1.setCachedEvents)(this.db, chatId, resp, threadRootMessageIndex).catch((err) => this.config.logger.error("Error writing cached group events", err));
        return resp;
    }
    handleMissingEvents(chatId, [cachedEvents, missing], threadRootMessageIndex, latestKnownUpdate) {
        if (missing.size === 0) {
            return Promise.resolve(cachedEvents);
        }
        else {
            return this.chatEventsByIndexFromBackend([...missing], chatId, threadRootMessageIndex, latestKnownUpdate)
                .then((resp) => this.setCachedEvents(chatId, resp, threadRootMessageIndex))
                .then((resp) => {
                if (resp !== "events_failed") {
                    return (0, caching_1.mergeSuccessResponses)(cachedEvents, resp);
                }
                return resp;
            });
        }
    }
    manageFavouriteChats(toAdd, toRemove) {
        return this.executeMsgpackUpdate("manage_favourite_chats", {
            to_add: toAdd.map(chatMappersV2_1.apiChatIdentifier),
            to_remove: toRemove.map(chatMappersV2_1.apiChatIdentifier),
        }, mappersV2_1.manageFavouritesResponse, typebox_1.UserManageFavouriteChatsArgs, typebox_1.UserManageFavouriteChatsResponse);
    }
    getInitialState() {
        return this.executeMsgpackQuery("initial_state", {}, mappersV2_1.initialStateResponse, typebox_1.Empty, typebox_1.UserInitialStateResponse);
    }
    getUpdates(updatesSince) {
        const args = {
            updates_since: updatesSince,
        };
        return this.executeMsgpackQuery("updates", args, mappersV2_1.getUpdatesResponse, typebox_1.UserUpdatesArgs, typebox_1.UserUpdatesResponse);
    }
    createCommunity(community, rules, defaultChannels, defaultChannelRules) {
        return this.executeMsgpackUpdate("create_community", {
            is_public: community.public,
            name: community.name,
            description: community.description,
            history_visible_to_new_joiners: community.historyVisible,
            avatar: (0, mapping_1.mapOptional)(community.avatar?.blobData, (data) => {
                return {
                    id: data_client_1.DataClient.newBlobId(),
                    data,
                    mime_type: "image/jpg",
                };
            }),
            banner: (0, mapping_1.mapOptional)(community.banner?.blobData, (data) => {
                return {
                    id: data_client_1.DataClient.newBlobId(),
                    data,
                    mime_type: "image/jpg",
                };
            }),
            permissions: (0, chatMappersV2_1.apiCommunityPermissions)(community.permissions),
            rules,
            gate_config: (0, chatMappersV2_1.apiMaybeAccessGateConfig)(community.gateConfig),
            gate: (0, chatMappersV2_1.apiMaybeAccessGate)(community.gateConfig.gate),
            default_channels: defaultChannels,
            default_channel_rules: defaultChannelRules,
            primary_language: community.primaryLanguage,
        }, mappersV2_1.createCommunityResponse, typebox_1.UserCreateCommunityArgs, typebox_1.UserCreateCommunityResponse);
    }
    createGroup(group) {
        return this.executeMsgpackUpdate("create_group", {
            is_public: group.public,
            name: group.name,
            description: group.description,
            history_visible_to_new_joiners: group.historyVisible,
            avatar: (0, mapping_1.mapOptional)(group.avatar?.blobData, (data) => {
                return {
                    id: data_client_1.DataClient.newBlobId(),
                    data,
                    mime_type: "image/jpg",
                };
            }),
            permissions_v2: (0, chatMappersV2_1.apiGroupPermissions)(group.permissions),
            rules: group.rules,
            gate: (0, chatMappersV2_1.apiMaybeAccessGate)(group.gateConfig.gate),
            gate_config: (0, chatMappersV2_1.apiMaybeAccessGateConfig)(group.gateConfig),
            events_ttl: group.eventsTTL,
            messages_visible_to_non_members: group.messagesVisibleToNonMembers,
        }, (resp) => (0, chatMappersV2_1.createGroupResponse)(resp, group.id), typebox_1.UserCreateGroupArgs, typebox_1.UserCreateGroupResponse);
    }
    deleteGroup(chatId) {
        return this.executeMsgpackUpdate("delete_group", {
            chat_id: (0, mapping_1.principalStringToBytes)(chatId),
        }, chatMappersV2_1.deleteGroupResponse, typebox_1.UserDeleteGroupArgs, typebox_1.UserDeleteGroupResponse);
    }
    deleteCommunity(id) {
        return this.executeMsgpackUpdate("delete_community", {
            community_id: (0, mapping_1.principalStringToBytes)(id.communityId),
        }, mappersV2_1.deleteCommunityResponse, typebox_1.UserDeleteCommunityArgs, typebox_1.UserDeleteCommunityResponse);
    }
    getCachedEventsByIndex(eventIndexes, chatId, threadRootMessageIndex) {
        return (0, caching_1.getCachedEventsByIndex)(this.db, eventIndexes, {
            chatId,
            threadRootMessageIndex,
        });
    }
    chatEventsByIndex(eventIndexes, chatId, threadRootMessageIndex, latestKnownUpdate) {
        return this.getCachedEventsByIndex(eventIndexes, chatId, threadRootMessageIndex).then((res) => this.handleMissingEvents(chatId, res, threadRootMessageIndex, latestKnownUpdate));
    }
    chatEventsByIndexFromBackend(eventIndexes, chatId, threadRootMessageIndex, latestKnownUpdate) {
        const args = {
            thread_root_message_index: threadRootMessageIndex,
            user_id: (0, mapping_1.principalStringToBytes)(chatId.userId),
            events: eventIndexes,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("events_by_index", args, (resp) => (0, mappersV2_1.getEventsResponse)(this.principal, resp, chatId, latestKnownUpdate), typebox_1.UserEventsByIndexArgs, typebox_1.UserEventsResponse);
    }
    async chatEventsWindow(eventIndexRange, chatId, messageIndex, latestKnownUpdate) {
        const [cachedEvents, missing, totalMiss] = await (0, caching_1.getCachedEventsWindowByMessageIndex)(this.db, eventIndexRange, { chatId }, messageIndex);
        if (totalMiss || missing.size >= openchat_shared_1.MAX_MISSING) {
            console.log("We didn't get enough back from the cache, going to the api", missing.size, totalMiss);
            return this.chatEventsWindowFromBackend(chatId, messageIndex, latestKnownUpdate)
                .then((resp) => this.setCachedEvents(chatId, resp))
                .catch((err) => {
                if (err instanceof openchat_shared_1.ResponseTooLargeError) {
                    console.log("Response size too large, we will try to split the window request into a a few chunks");
                    return (0, chunked_1.chunkedChatEventsWindowFromBackend)((index, ascending, chunkSize) => this.chatEventsFromBackend(chatId, index, ascending, undefined, latestKnownUpdate, chunkSize), (index, chunkSize) => this.chatEventsWindowFromBackend(chatId, index, latestKnownUpdate, chunkSize), eventIndexRange, messageIndex).then((resp) => this.setCachedEvents(chatId, resp));
                }
                else {
                    throw err;
                }
            });
        }
        else {
            return this.handleMissingEvents(chatId, [cachedEvents, missing], undefined, latestKnownUpdate);
        }
    }
    async chatEventsWindowFromBackend(chatId, messageIndex, latestKnownUpdate, maxEvents = openchat_shared_1.MAX_EVENTS) {
        const args = {
            thread_root_message_index: undefined,
            user_id: (0, mapping_1.principalStringToBytes)(chatId.userId),
            max_messages: openchat_shared_1.MAX_MESSAGES,
            max_events: maxEvents,
            mid_point: messageIndex,
            latest_known_update: latestKnownUpdate,
        };
        return this.executeMsgpackQuery("events_window", args, (resp) => (0, mappersV2_1.getEventsResponse)(this.principal, resp, chatId, latestKnownUpdate), typebox_1.UserEventsWindowArgs, typebox_1.UserEventsResponse);
    }
    async chatEvents(eventIndexRange, chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate) {
        const [cachedEvents, missing] = await (0, caching_1.getCachedEvents)(this.db, eventIndexRange, { chatId, threadRootMessageIndex }, startIndex, ascending);
        if (missing.size >= openchat_shared_1.MAX_MISSING) {
            console.log("We didn't get enough back from the cache, going to the api");
            return this.chatEventsFromBackend(chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate)
                .then((resp) => this.setCachedEvents(chatId, resp, threadRootMessageIndex))
                .catch((err) => {
                if (err instanceof openchat_shared_1.ResponseTooLargeError) {
                    console.log("Response size too large, we will try to split the payload into a a few chunks");
                    return (0, chunked_1.chunkedChatEventsFromBackend)((index, chunkSize) => this.chatEventsFromBackend(chatId, index, ascending, threadRootMessageIndex, latestKnownUpdate, chunkSize), eventIndexRange, startIndex, ascending).then((resp) => this.setCachedEvents(chatId, resp, threadRootMessageIndex));
                }
                else {
                    throw err;
                }
            });
        }
        else {
            return this.handleMissingEvents(chatId, [cachedEvents, missing], threadRootMessageIndex, latestKnownUpdate);
        }
    }
    chatEventsFromBackend(chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate, maxEvents = openchat_shared_1.MAX_EVENTS) {
        const args = {
            thread_root_message_index: threadRootMessageIndex,
            user_id: (0, mapping_1.principalStringToBytes)(chatId.userId),
            max_messages: openchat_shared_1.MAX_MESSAGES,
            max_events: maxEvents,
            start_index: startIndex,
            ascending: ascending,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("events", args, (resp) => (0, mappersV2_1.getEventsResponse)(this.principal, resp, chatId, latestKnownUpdate), typebox_1.UserEventsArgs, typebox_1.UserEventsResponse);
    }
    setAvatar(bytes) {
        const blobId = data_client_1.DataClient.newBlobId();
        return this.executeMsgpackUpdate("set_avatar", {
            avatar: {
                id: blobId,
                data: bytes,
                mime_type: "image/jpg",
            },
        }, mappersV2_1.setAvatarResponse, typebox_1.UserSetAvatarArgs, typebox_1.UserSetAvatarResponse).then((resp) => {
            if (resp === "success") {
                return {
                    blobId,
                    canisterId: this.userId,
                };
            }
            throw new Error("Unable to set avatar");
        });
    }
    editMessage(recipientId, message, threadRootMessageIndex, blockLevelMarkdown) {
        return new data_client_1.DataClient(this.identity, this.agent, this.config)
            .uploadData(message.content, [this.userId, recipientId])
            .then((content) => {
            const req = {
                content: (0, chatMappersV2_1.apiMessageContent)(content ?? message.content),
                user_id: (0, mapping_1.principalStringToBytes)(recipientId),
                thread_root_message_index: threadRootMessageIndex,
                message_id: message.messageId,
                correlation_id: (0, rng_1.generateUint64)(),
                block_level_markdown: blockLevelMarkdown,
            };
            return this.executeMsgpackUpdate("edit_message_v2", req, chatMappersV2_1.editMessageResponse, typebox_1.UserEditMessageArgs, typebox_1.UserEditMessageResponse);
        });
    }
    sendMessage(chatId, event, messageFilterFailed, threadRootMessageIndex, pin, onRequestAccepted) {
        (0, caching_1.removeFailedMessage)(this.db, this.chatId, event.event.messageId, threadRootMessageIndex);
        return this.sendMessageToBackend(chatId, event, messageFilterFailed, threadRootMessageIndex, pin, onRequestAccepted)
            .then((0, caching_1.setCachedMessageFromSendResponse)(this.db, this.chatId, event, threadRootMessageIndex))
            .catch((err) => {
            (0, caching_1.recordFailedMessage)(this.db, this.chatId, event, threadRootMessageIndex);
            throw err;
        });
    }
    sendMessageToBackend(chatId, event, messageFilterFailed, threadRootMessageIndex, pin, onRequestAccepted) {
        const dataClient = new data_client_1.DataClient(this.identity, this.agent, this.config);
        const uploadContentPromise = event.event.forwarded
            ? dataClient.forwardData(event.event.content, [this.userId, chatId.userId])
            : dataClient.uploadData(event.event.content, [this.userId, chatId.userId]);
        return uploadContentPromise.then((content) => {
            const newContent = content ?? event.event.content;
            const req = {
                content: (0, chatMappersV2_1.apiMessageContent)(newContent),
                recipient: (0, mapping_1.principalStringToBytes)(chatId.userId),
                message_id: event.event.messageId,
                replies_to: (0, mapping_1.mapOptional)(event.event.repliesTo, (replyContext) => (0, chatMappersV2_1.apiReplyContextArgs)(chatId, replyContext)),
                forwarding: event.event.forwarded,
                thread_root_message_index: threadRootMessageIndex,
                message_filter_failed: messageFilterFailed,
                pin,
                correlation_id: (0, rng_1.generateUint64)(),
                block_level_markdown: event.event.blockLevelMarkdown,
            };
            return this.executeMsgpackUpdate("send_message_v2", req, (resp) => (0, mappersV2_1.sendMessageResponse)(resp, event.event.sender, chatId.userId), typebox_1.UserSendMessageArgs, typebox_1.UserSendMessageResponse, onRequestAccepted).then((resp) => [resp, { ...event.event, content: newContent }]);
        });
    }
    sendMessageWithTransferToGroup(groupId, recipientId, sender, event, threadRootMessageIndex, rulesAccepted, messageFilterFailed, pin) {
        (0, caching_1.removeFailedMessage)(this.db, this.chatId, event.event.messageId, threadRootMessageIndex);
        return this.sendMessageWithTransferToGroupToBackend(groupId, recipientId, sender, event, threadRootMessageIndex, rulesAccepted, messageFilterFailed, pin)
            .then((0, caching_1.setCachedMessageFromSendResponse)(this.db, groupId, event, threadRootMessageIndex))
            .catch((err) => {
            (0, caching_1.recordFailedMessage)(this.db, groupId, event);
            throw err;
        });
    }
    sendMessageWithTransferToGroupToBackend(groupId, recipientId, sender, event, threadRootMessageIndex, rulesAccepted, messageFilterFailed, pin) {
        const content = (0, chatMappersV2_1.apiMessageContent)(event.event.content);
        const req = {
            thread_root_message_index: threadRootMessageIndex,
            content,
            sender_name: sender.username,
            sender_display_name: sender.displayName,
            rules_accepted: rulesAccepted,
            mentioned: [],
            message_id: event.event.messageId,
            group_id: (0, mapping_1.principalStringToBytes)(groupId.groupId),
            replies_to: (0, mapping_1.mapOptional)(event.event.repliesTo, (replyContext) => (0, chatMappersV2_1.apiReplyContextArgs)(groupId, replyContext)),
            block_level_markdown: true,
            message_filter_failed: messageFilterFailed,
            pin,
            correlation_id: (0, rng_1.generateUint64)(),
        };
        return this.executeMsgpackUpdate("send_message_with_transfer_to_group", req, (resp) => (0, mappersV2_1.sendMessageWithTransferToGroupResponse)(resp, event.event.sender, recipientId), typebox_1.UserSendMessageWithTransferToGroupArgs, typebox_1.UserSendMessageWithTransferToGroupResponse).then((resp) => [resp, event.event]);
    }
    loadSavedCryptoAccounts() {
        return this.executeMsgpackQuery("saved_crypto_accounts", {}, mappersV2_1.savedCryptoAccountsResponse, typebox_1.Empty, typebox_1.UserSavedCryptoAccountsResponse);
    }
    saveCryptoAccount({ name, account }) {
        return this.executeMsgpackUpdate("save_crypto_account", {
            name,
            account,
        }, mappersV2_1.saveCryptoAccountResponse, typebox_1.UserNamedAccount, typebox_1.UserSaveCryptoAccountResponse);
    }
    sendMessageWithTransferToChannel(id, recipientId, sender, event, threadRootMessageIndex, communityRulesAccepted, channelRulesAccepted, messageFilterFailed, pin) {
        (0, caching_1.removeFailedMessage)(this.db, this.chatId, event.event.messageId, threadRootMessageIndex);
        return this.sendMessageWithTransferToChannelToBackend(id, recipientId, sender, event, threadRootMessageIndex, communityRulesAccepted, channelRulesAccepted, messageFilterFailed, pin)
            .then((0, caching_1.setCachedMessageFromSendResponse)(this.db, id, event, threadRootMessageIndex))
            .catch((err) => {
            (0, caching_1.recordFailedMessage)(this.db, id, event);
            throw err;
        });
    }
    sendMessageWithTransferToChannelToBackend(id, recipientId, sender, event, threadRootMessageIndex, communityRulesAccepted, channelRulesAccepted, messageFilterFailed, pin) {
        const content = (0, chatMappersV2_1.apiMessageContent)(event.event.content);
        const req = {
            thread_root_message_index: threadRootMessageIndex,
            content,
            sender_name: sender.username,
            sender_display_name: sender.displayName,
            mentioned: [],
            message_id: event.event.messageId,
            community_id: (0, mapping_1.principalStringToBytes)(id.communityId),
            channel_id: BigInt(id.channelId),
            replies_to: (0, mapping_1.mapOptional)(event.event.repliesTo, (replyContext) => (0, chatMappersV2_1.apiReplyContextArgs)(id, replyContext)),
            block_level_markdown: true,
            community_rules_accepted: communityRulesAccepted,
            channel_rules_accepted: channelRulesAccepted,
            message_filter_failed: messageFilterFailed,
            pin,
        };
        return this.executeMsgpackUpdate("send_message_with_transfer_to_channel", req, (resp) => (0, mappersV2_1.sendMessageWithTransferToChannelResponse)(resp, event.event.sender, recipientId), typebox_1.UserSendMessageWithTransferToChannelArgs, typebox_1.UserSendMessageWithTransferToChannelResponse).then((resp) => [resp, event.event]);
    }
    blockUser(userId) {
        return this.executeMsgpackUpdate("block_user", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
        }, (_) => "success", typebox_1.UserBlockUserArgs, typebox_1.UserBlockUserResponse);
    }
    unblockUser(userId) {
        return this.executeMsgpackUpdate("unblock_user", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
        }, (_) => "success", typebox_1.UserUnblockUserArgs, typebox_1.UserUnblockUserResponse);
    }
    leaveGroup(chatId) {
        return this.executeMsgpackUpdate("leave_group", {
            chat_id: (0, mapping_1.principalStringToBytes)(chatId),
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.leaveGroupResponse, typebox_1.UserLeaveGroupArgs, typebox_1.UserLeaveGroupResponse);
    }
    leaveCommunity(id) {
        return this.executeMsgpackUpdate("leave_community", {
            community_id: (0, mapping_1.principalStringToBytes)(id.communityId),
        }, mappersV2_1.leaveCommunityResponse, typebox_1.UserLeaveCommunityArgs, typebox_1.UserLeaveCommunityResponse);
    }
    markMessageArg(chatId, readUpTo, threads, dateReadPinned) {
        return {
            chat_id: (0, mapping_1.principalStringToBytes)(chatId),
            read_up_to: readUpTo,
            threads: threads.map((t) => ({
                root_message_index: t.threadRootMessageIndex,
                read_up_to: t.readUpTo,
            })),
            date_read_pinned: dateReadPinned,
        };
    }
    markChannelMessageArg(channelId, readUpTo, threads, dateReadPinned) {
        return {
            channel_id: BigInt(channelId),
            read_up_to: readUpTo,
            threads: threads.map((t) => ({
                root_message_index: t.threadRootMessageIndex,
                read_up_to: t.readUpTo,
            })),
            date_read_pinned: dateReadPinned,
        };
    }
    markMessageArgs(req) {
        const community = {};
        const chat = [];
        req.forEach(({ chatId, readUpTo, threads, dateReadPinned }) => {
            if (chatId.kind === "direct_chat") {
                chat.push(this.markMessageArg(chatId.userId, readUpTo, threads, dateReadPinned));
            }
            if (chatId.kind === "group_chat") {
                chat.push(this.markMessageArg(chatId.groupId, readUpTo, threads, dateReadPinned));
            }
            if (chatId.kind === "channel") {
                if (community[chatId.communityId] === undefined) {
                    community[chatId.communityId] = [];
                }
                community[chatId.communityId].push(this.markChannelMessageArg(chatId.channelId, readUpTo, threads, dateReadPinned));
            }
        });
        return {
            messages_read: chat,
            community_messages_read: Object.entries(community).map(([communityId, read]) => ({
                community_id: (0, mapping_1.principalStringToBytes)(communityId),
                channels_read: read,
            })),
        };
    }
    markMessagesRead(request) {
        return this.executeMsgpackUpdate("mark_read", this.markMessageArgs(request), (_) => "success", typebox_1.UserMarkReadArgs, typebox_1.UserMarkReadResponse);
    }
    tipMessage(messageContext, messageId, transfer, decimals, pin) {
        return this.executeMsgpackUpdate("tip_message", {
            chat: (0, chatMappersV2_1.apiChatIdentifier)(messageContext.chatId),
            message_id: messageId,
            fee: transfer.feeE8s ?? 0n,
            decimals,
            token: (0, chatMappersV2_1.apiToken)(transfer.token),
            recipient: (0, mapping_1.principalStringToBytes)(transfer.recipient),
            ledger: (0, mapping_1.principalStringToBytes)(transfer.ledger),
            amount: transfer.amountE8s,
            thread_root_message_index: messageContext.threadRootMessageIndex,
            pin,
        }, mappersV2_1.tipMessageResponse, typebox_1.UserTipMessageArgs, typebox_1.UserTipMessageResponse);
    }
    addReaction(otherUserId, messageId, reaction, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("add_reaction", {
            user_id: (0, mapping_1.principalStringToBytes)(otherUserId),
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
            reaction,
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.addRemoveReactionResponse, typebox_1.UserAddReactionArgs, typebox_1.UserAddReactionResponse);
    }
    removeReaction(otherUserId, messageId, reaction, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("remove_reaction", {
            user_id: (0, mapping_1.principalStringToBytes)(otherUserId),
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
            reaction,
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.addRemoveReactionResponse, typebox_1.UserRemoveReactionArgs, typebox_1.UserRemoveReactionResponse);
    }
    deleteMessage(otherUserId, messageId, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("delete_messages", {
            user_id: (0, mapping_1.principalStringToBytes)(otherUserId),
            thread_root_message_index: threadRootMessageIndex,
            message_ids: [messageId],
            correlation_id: (0, rng_1.generateUint64)(),
        }, mappersV2_1.deleteMessageResponse, typebox_1.UserDeleteMessagesArgs, typebox_1.UserDeleteMessagesResponse);
    }
    undeleteMessage(otherUserId, messageId, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("undelete_messages", {
            user_id: (0, mapping_1.principalStringToBytes)(otherUserId),
            thread_root_message_index: threadRootMessageIndex,
            message_ids: [messageId],
            correlation_id: (0, rng_1.generateUint64)(),
        }, mappersV2_1.undeleteMessageResponse, typebox_1.UserUndeleteMessagesArgs, typebox_1.UserUndeleteMessagesResponse);
    }
    searchDirectChat(chatId, searchTerm, maxResults) {
        const args = {
            user_id: (0, mapping_1.principalStringToBytes)(chatId.userId),
            search_term: searchTerm,
            max_results: maxResults,
        };
        return this.executeMsgpackQuery("search_messages", args, (res) => (0, mappersV2_1.searchDirectChatResponse)(res, chatId), typebox_1.UserSearchMessagesArgs, typebox_1.UserSearchMessagesResponse);
    }
    toggleMuteNotifications(chatId, muted) {
        const args = {
            chat_id: (0, mapping_1.principalStringToBytes)(chatId),
        };
        return this.executeMsgpackUpdate(muted ? "mute_notifications" : "unmute_notifications", args, mappers_1.toggleNotificationsResponse, typebox_1.UserMuteNotificationsArgs, typebox_1.UserMuteNotificationsResponse);
    }
    dismissRecommendation(chatId) {
        return this.executeMsgpackUpdate("add_hot_group_exclusions", {
            duration: undefined,
            groups: [(0, mapping_1.principalStringToBytes)(chatId)],
        }, mapping_1.toVoid, typebox_1.UserAddHotGroupExclusionsArgs, typebox_1.UserAddHotGroupExclusionsResponse);
    }
    getBio() {
        return this.executeMsgpackQuery("bio", {}, (value) => value.Success, typebox_1.Empty, typebox_1.UserBioResponse);
    }
    getPublicProfile() {
        return this.executeMsgpackQuery("public_profile", {}, mappersV2_1.publicProfileResponse, typebox_1.Empty, typebox_1.UserPublicProfileResponse);
    }
    setBio(bio) {
        return this.executeMsgpackUpdate("set_bio", { text: bio }, mappersV2_1.setBioResponse, typebox_1.UserSetBioArgs, typebox_1.UserSetBioResponse);
    }
    withdrawCryptocurrency(domain, pin) {
        const req = (0, chatMappersV2_1.apiPendingCryptocurrencyWithdrawal)(domain, pin);
        return this.executeMsgpackUpdate("withdraw_crypto_v2", req, mappersV2_1.withdrawCryptoResponse, typebox_1.UserWithdrawCryptoArgs, typebox_1.UserWithdrawCryptoResponse);
    }
    toChatInList(chatId, favourite) {
        if (favourite) {
            return {
                Favourite: (0, chatMappersV2_1.apiChatIdentifier)(chatId),
            };
        }
        else {
            switch (chatId.kind) {
                case "group_chat":
                    return { Group: (0, mapping_1.principalStringToBytes)(chatId.groupId) };
                case "direct_chat":
                    return { Direct: (0, mapping_1.principalStringToBytes)(chatId.userId) };
                case "channel":
                    return {
                        Community: [
                            (0, mapping_1.principalStringToBytes)(chatId.communityId),
                            BigInt(chatId.channelId),
                        ],
                    };
            }
        }
    }
    pinChat(chatId, favourite) {
        return this.executeMsgpackUpdate("pin_chat_v2", {
            chat: this.toChatInList(chatId, favourite),
        }, mappersV2_1.pinChatResponse, typebox_1.UserPinChatArgs, typebox_1.UserPinChatResponse);
    }
    unpinChat(chatId, favourite) {
        return this.executeMsgpackUpdate("unpin_chat_v2", {
            chat: this.toChatInList(chatId, favourite),
        }, mappersV2_1.pinChatResponse, typebox_1.UserUnpinChatArgs, typebox_1.UserUnpinChatResponse);
    }
    archiveChat(chatId) {
        return this.executeMsgpackUpdate("archive_unarchive_chats", {
            to_archive: [(0, chatMappersV2_1.apiChatIdentifier)(chatId)],
            to_unarchive: [],
        }, mappersV2_1.archiveChatResponse, typebox_1.UserArchiveUnarchiveChatsArgs, typebox_1.UserArchiveUnarchiveChatsResponse);
    }
    unarchiveChat(chatId) {
        return this.executeMsgpackUpdate("archive_unarchive_chats", {
            to_archive: [],
            to_unarchive: [(0, chatMappersV2_1.apiChatIdentifier)(chatId)],
        }, mappersV2_1.archiveChatResponse, typebox_1.UserArchiveUnarchiveChatsArgs, typebox_1.UserArchiveUnarchiveChatsResponse);
    }
    getDeletedMessage(userId, messageId) {
        return this.executeMsgpackQuery("deleted_message", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            message_id: messageId,
        }, mappersV2_1.deletedMessageResponse, typebox_1.UserDeletedMessageArgs, typebox_1.UserDeletedMessageResponse);
    }
    setMessageReminder(chatId, eventIndex, remindAt, notes, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("set_message_reminder_v2", {
            chat: (0, chatMappersV2_1.apiChatIdentifier)(chatId),
            notes,
            remind_at: BigInt(remindAt),
            thread_root_message_index: threadRootMessageIndex,
            event_index: eventIndex,
        }, mappersV2_1.setMessageReminderResponse, typebox_1.UserSetMessageReminderArgs, typebox_1.UserSetMessageReminderResponse);
    }
    cancelMessageReminder(reminderId) {
        return this.executeMsgpackUpdate("cancel_message_reminder", {
            reminder_id: reminderId,
        }, (_) => true, typebox_1.UserCancelMessageReminderArgs, typebox_1.UserCancelMessageReminderResponse);
    }
    setCommunityIndexes(communityIndexes) {
        const indexes = Object.entries(communityIndexes).map(([id, idx]) => [(0, mapping_1.principalStringToBytes)(id), idx]);
        return this.executeMsgpackUpdate("set_community_indexes", { indexes }, (_) => true, typebox_1.UserSetCommunityIndexesArgs, typebox_1.UserSetCommunityIndexesResponse);
    }
    submitProposal(governanceCanisterId, proposal, ledger, token, proposalRejectionFee, transactionFee) {
        return this.executeMsgpackUpdate("submit_proposal", {
            governance_canister_id: (0, mapping_1.principalStringToBytes)(governanceCanisterId),
            proposal: (0, mappersV2_1.proposalToSubmit)(proposal),
            ledger: (0, mapping_1.principalStringToBytes)(ledger),
            token: (0, chatMappersV2_1.apiToken)(token),
            proposal_rejection_fee: proposalRejectionFee,
            transaction_fee: transactionFee,
        }, mappersV2_1.submitProposalResponse, typebox_1.UserSubmitProposalArgs, typebox_1.UserSubmitProposalResponse);
    }
    reportMessage(chatId, threadRootMessageIndex, messageId, deleteMessage) {
        return this.executeMsgpackUpdate("report_message", {
            them: (0, mapping_1.principalStringToBytes)(chatId.userId),
            message_id: messageId,
            delete: deleteMessage,
            thread_root_message_index: threadRootMessageIndex,
        }, mappersV2_1.reportMessageResponse, typebox_1.UserReportMessageArgs, typebox_1.UserReportMessageResponse);
    }
    swapTokens(swapId, inputToken, outputToken, amountIn, minAmountOut, exchangeArgs, pin) {
        return this.executeMsgpackUpdate("swap_tokens", {
            swap_id: swapId,
            input_token: {
                token: (0, chatMappersV2_1.apiToken)(inputToken.symbol),
                ledger: (0, mapping_1.principalStringToBytes)(inputToken.ledger),
                decimals: inputToken.decimals,
                fee: inputToken.transferFee,
            },
            output_token: {
                token: (0, chatMappersV2_1.apiToken)(outputToken.symbol),
                ledger: (0, mapping_1.principalStringToBytes)(outputToken.ledger),
                decimals: outputToken.decimals,
                fee: outputToken.transferFee,
            },
            input_amount: amountIn,
            exchange_args: (0, mappersV2_1.apiExchangeArgs)(exchangeArgs),
            min_output_amount: minAmountOut,
            pin,
        }, mappersV2_1.swapTokensResponse, typebox_1.UserSwapTokensArgs, typebox_1.UserSwapTokensResponse);
    }
    tokenSwapStatus(swapId) {
        const args = {
            swap_id: swapId,
        };
        return this.executeMsgpackQuery("token_swap_status", args, mappersV2_1.tokenSwapStatusResponse, typebox_1.UserTokenSwapStatusArgs, typebox_1.UserTokenSwapStatusResponse);
    }
    approveTransfer(spender, ledger, amount, expiresIn, pin) {
        return this.executeMsgpackUpdate("approve_transfer", {
            spender: {
                owner: (0, mapping_1.principalStringToBytes)(spender),
                subaccount: undefined,
            },
            ledger_canister_id: (0, mapping_1.principalStringToBytes)(ledger),
            amount,
            expires_in: expiresIn,
            pin,
        }, mappersV2_1.approveTransferResponse, typebox_1.UserApproveTransferArgs, typebox_1.UserApproveTransferResponse);
    }
    deleteDirectChat(userId, blockUser) {
        return this.executeMsgpackUpdate("delete_direct_chat", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            block_user: blockUser,
        }, (resp) => resp === "Success", typebox_1.UserDeleteDirectChatArgs, typebox_1.UserDeleteDirectChatResponse);
    }
    acceptP2PSwap(userId, threadRootMessageIndex, messageId, pin) {
        return this.executeMsgpackUpdate("accept_p2p_swap", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            message_id: messageId,
            thread_root_message_index: threadRootMessageIndex,
            pin,
        }, chatMappersV2_1.acceptP2PSwapResponse, typebox_1.UserAcceptP2pSwapArgs, typebox_1.UserAcceptP2pSwapResponse);
    }
    cancelP2PSwap(userId, messageId) {
        return this.executeMsgpackUpdate("cancel_p2p_swap", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            message_id: messageId,
        }, chatMappersV2_1.cancelP2PSwapResponse, typebox_1.UserCancelP2pSwapArgs, typebox_1.UserCancelP2pSwapResponse);
    }
    joinVideoCall(userId, messageId) {
        return this.executeMsgpackUpdate("join_video_call", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            message_id: messageId,
        }, chatMappersV2_1.joinVideoCallResponse, typebox_1.UserJoinVideoCallArgs, typebox_1.UserJoinVideoCallResponse);
    }
    localUserIndex() {
        return this.executeMsgpackQuery("local_user_index", {}, (resp) => (0, mapping_1.principalBytesToString)(resp.Success), typebox_1.Empty, typebox_1.UserLocalUserIndexResponse);
    }
    setPinNumber(verification, newPin) {
        return this.executeMsgpackUpdate("set_pin_number", {
            verification: (0, mappersV2_1.apiVerification)(verification),
            new: newPin,
        }, chatMappersV2_1.setPinNumberResponse, typebox_1.UserSetPinNumberArgs, typebox_1.UserSetPinNumberResponse);
    }
    chitEvents({ from, to, max, ascending }) {
        return this.executeMsgpackQuery("chit_events", {
            from,
            to,
            max,
            ascending,
            skip: undefined,
        }, mappersV2_1.chitEventsResponse, typebox_1.UserChitEventsArgs, typebox_1.UserChitEventsResponse);
    }
    markAchievementsSeen(lastSeen) {
        return this.executeMsgpackUpdate("mark_achievements_seen", {
            last_seen: lastSeen,
        }, (res) => {
            console.log("Set Achievements Last seen", lastSeen, res);
        }, typebox_1.UserMarkAchievementsSeenArgs, typebox_1.UserMarkAchievementsSeenResponse);
    }
    claimDailyChit() {
        return this.executeMsgpackUpdate("claim_daily_chit", {}, mappersV2_1.claimDailyChitResponse, typebox_1.Empty, typebox_1.UserClaimDailyChitResponse).then((res) => {
            if (res.kind === "success") {
                (0, userCache_1.setChitInfoInCache)(this.userId, res.chitBalance, res.streak);
            }
            return res;
        });
    }
    configureWallet(walletConfig) {
        return this.executeMsgpackUpdate("configure_wallet", {
            config: (0, mappersV2_1.apiWalletConfig)(walletConfig),
        }, mapping_1.toVoid, typebox_1.UserConfigureWalletArgs, typebox_1.UserConfigureWalletResponse);
    }
    markActivityFeedRead(readUpTo) {
        return this.executeMsgpackUpdate("mark_message_activity_feed_read", { read_up_to: readUpTo }, mapping_1.toVoid, typebox_1.UserMarkMessageActivityFeedReadArgs, typebox_1.UserMarkMessageActivityFeedReadResponse);
    }
    messageActivityFeed(since) {
        return this.executeMsgpackQuery("message_activity_feed", { since }, mappersV2_1.messageActivityFeedResponse, typebox_1.UserMessageActivityFeedArgs, typebox_1.UserMessageActivityFeedResponse);
    }
}
exports.UserClient = UserClient;
