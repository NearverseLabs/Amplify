"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityClient = void 0;
const candidService_1 = require("../candidService");
const mapping_1 = require("../../utils/mapping");
const mappersV2_1 = require("./mappersV2");
const chatMappersV2_1 = require("../common/chatMappersV2");
const openchat_shared_1 = require("openchat-shared");
const mappersV2_2 = require("../group/mappersV2");
const data_client_1 = require("../data/data.client");
const caching_1 = require("../../utils/caching");
const chat_1 = require("../../utils/chat");
const mappers_1 = require("../notifications/mappers");
const chunked_1 = require("../common/chunked");
const typebox_1 = require("../../typebox");
class CommunityClient extends candidService_1.CandidService {
    constructor(identity, agent, config, communityId, db, inviteCode) {
        super(identity, agent, communityId);
        this.config = config;
        this.communityId = communityId;
        this.db = db;
        this.inviteCode = inviteCode;
    }
    claimPrize(channelId, messageId) {
        return this.executeMsgpackUpdate("claim_prize", {
            channel_id: BigInt(channelId),
            message_id: messageId,
        }, chatMappersV2_1.claimPrizeResponse, typebox_1.CommunityClaimPrizeArgs, typebox_1.CommunityClaimPrizeResponse);
    }
    addMembersToChannel(chatId, userIds, username, displayName) {
        return this.executeMsgpackUpdate("add_members_to_channel", {
            channel_id: BigInt(chatId.channelId),
            user_ids: userIds.map(mapping_1.principalStringToBytes),
            added_by_name: username,
            added_by_display_name: displayName,
        }, mappersV2_1.addMembersToChannelResponse, typebox_1.CommunityAddMembersToChannelArgs, typebox_1.CommunityAddMembersToChannelResponse);
    }
    addReaction(chatId, username, displayName, messageId, reaction, threadRootMessageIndex, newAchievement) {
        return this.executeMsgpackUpdate("add_reaction", {
            channel_id: BigInt(chatId.channelId),
            username,
            display_name: displayName,
            message_id: messageId,
            thread_root_message_index: threadRootMessageIndex,
            reaction,
            new_achievement: newAchievement,
        }, chatMappersV2_1.addRemoveReactionResponse, typebox_1.CommunityAddReactionArgs, typebox_1.CommunityAddReactionResponse);
    }
    blockUser(userId) {
        return this.executeMsgpackUpdate("block_user", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
        }, mappersV2_1.blockUserResponse, typebox_1.CommunityBlockUserArgs, typebox_1.CommunityBlockUserResponse);
    }
    changeChannelRole(chatId, userId, newRole) {
        return this.executeMsgpackUpdate("change_channel_role", {
            channel_id: BigInt(chatId.channelId),
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            new_role: (0, mappersV2_1.apiMemberRole)(newRole),
        }, chatMappersV2_1.changeRoleResponse, typebox_1.CommunityChangeChannelRoleArgs, typebox_1.CommunityChangeChannelRoleResponse);
    }
    changeRole(userId, newRole) {
        return this.executeMsgpackUpdate("change_role", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            new_role: (0, mappersV2_1.apiCommunityRole)(newRole),
        }, mappersV2_1.changeRoleResponse, typebox_1.CommunityChangeRoleArgs, typebox_1.CommunityChangeRoleResponse);
    }
    createChannel(channel) {
        return this.executeMsgpackUpdate("create_channel", {
            is_public: channel.public,
            name: channel.name,
            events_ttl: channel.eventsTTL,
            description: channel.description,
            external_url: channel.externalUrl,
            history_visible_to_new_joiners: channel.historyVisible,
            avatar: (0, mapping_1.mapOptional)(channel.avatar?.blobData, (data) => {
                return {
                    id: data_client_1.DataClient.newBlobId(),
                    data,
                    mime_type: "image/jpg",
                };
            }),
            permissions_v2: (0, chatMappersV2_1.apiGroupPermissions)(channel.permissions),
            rules: channel.rules,
            gate_config: (0, chatMappersV2_1.apiMaybeAccessGateConfig)(channel.gateConfig),
            gate: (0, chatMappersV2_1.apiMaybeAccessGate)(channel.gateConfig.gate),
            messages_visible_to_non_members: channel.messagesVisibleToNonMembers,
        }, (resp) => (0, chatMappersV2_1.createGroupResponse)(resp, channel.id), typebox_1.CommunityCreateChannelArgs, typebox_1.CommunityCreateChannelResponse);
    }
    declineInvitation(chatId) {
        return this.executeMsgpackUpdate("decline_invitation", {
            channel_id: BigInt(chatId.channelId),
        }, chatMappersV2_1.declineInvitationResponse, typebox_1.CommunityDeclineInvitationArgs, typebox_1.CommunityDeclineInvitationResponse);
    }
    deleteChannel(chatId) {
        return this.executeMsgpackUpdate("delete_channel", {
            channel_id: BigInt(chatId.channelId),
        }, chatMappersV2_1.deleteGroupResponse, typebox_1.CommunityDeleteChannelArgs, typebox_1.CommunityDeleteChannelResponse);
    }
    getDeletedMessage(chatId, messageId, threadRootMessageIndex) {
        return this.executeMsgpackQuery("deleted_message", {
            channel_id: BigInt(chatId.channelId),
            message_id: messageId,
            thread_root_message_index: threadRootMessageIndex,
        }, chatMappersV2_1.deletedMessageResponse, typebox_1.CommunityDeletedMessageArgs, typebox_1.CommunityDeletedMessageResponse);
    }
    deleteMessages(chatId, messageIds, threadRootMessageIndex, asPlatformModerator, newAchievement) {
        return this.executeMsgpackUpdate("delete_messages", {
            channel_id: BigInt(chatId.channelId),
            message_ids: messageIds,
            as_platform_moderator: asPlatformModerator,
            thread_root_message_index: threadRootMessageIndex,
            new_achievement: newAchievement,
        }, chatMappersV2_1.deleteMessageResponse, typebox_1.CommunityDeleteMessagesArgs, typebox_1.CommunityDeleteMessagesResponse);
    }
    disableInviteCode() {
        return this.executeMsgpackUpdate("disable_invite_code", {}, chatMappersV2_1.disableInviteCodeResponse, typebox_1.Empty, typebox_1.CommunityDisableInviteCodeResponse);
    }
    editMessage(chatId, message, threadRootMessageIndex, blockLevelMarkdown, newAchievement) {
        return new data_client_1.DataClient(this.identity, this.agent, this.config)
            .uploadData(message.content, [chatId.communityId])
            .then((content) => {
            return this.executeMsgpackUpdate("edit_message", {
                channel_id: BigInt(chatId.channelId),
                thread_root_message_index: threadRootMessageIndex,
                content: (0, chatMappersV2_1.apiMessageContent)(content ?? message.content),
                message_id: message.messageId,
                block_level_markdown: blockLevelMarkdown,
                new_achievement: newAchievement,
            }, chatMappersV2_1.editMessageResponse, typebox_1.CommunityEditMessageArgs, typebox_1.CommunityEditMessageResponse);
        });
    }
    enableInviteCode() {
        return this.executeMsgpackUpdate("enable_invite_code", {}, chatMappersV2_1.enableOrResetInviteCodeResponse, typebox_1.Empty, typebox_1.CommunityEnableInviteCodeResponse);
    }
    async events(chatId, eventIndexRange, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate) {
        const [cachedEvents, missing] = await (0, caching_1.getCachedEvents)(this.db, eventIndexRange, { chatId, threadRootMessageIndex }, startIndex, ascending);
        if (missing.size >= openchat_shared_1.MAX_MISSING) {
            console.log("We didn't get enough back from the cache, going to the api");
            return this.eventsFromBackend(chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate)
                .then((resp) => this.setCachedEvents(chatId, resp, threadRootMessageIndex))
                .catch((err) => {
                if (err instanceof openchat_shared_1.ResponseTooLargeError) {
                    console.log("Response size too large, we will try to split the payload into a a few chunks");
                    return (0, chunked_1.chunkedChatEventsFromBackend)((index, chunkSize) => this.eventsFromBackend(chatId, index, ascending, threadRootMessageIndex, latestKnownUpdate, chunkSize), eventIndexRange, startIndex, ascending).then((resp) => this.setCachedEvents(chatId, resp, threadRootMessageIndex));
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
    eventsFromBackend(chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate, maxEvents = openchat_shared_1.MAX_EVENTS) {
        const args = {
            channel_id: BigInt(chatId.channelId),
            thread_root_message_index: threadRootMessageIndex,
            max_messages: openchat_shared_1.MAX_MESSAGES,
            max_events: maxEvents,
            start_index: startIndex,
            ascending: ascending,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("events", args, (res) => {
            return (0, mappersV2_2.getEventsResponse)(this.principal, res, chatId, latestKnownUpdate);
        }, typebox_1.CommunityEventsArgs, typebox_1.CommunityEventsResponse);
    }
    getCachedEventsByIndex(chatId, eventIndexes, threadRootMessageIndex) {
        return (0, caching_1.getCachedEventsByIndex)(this.db, eventIndexes, {
            chatId,
            threadRootMessageIndex,
        });
    }
    eventsByIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate) {
        return this.getCachedEventsByIndex(chatId, eventIndexes, threadRootMessageIndex).then((res) => this.handleMissingEvents(chatId, res, threadRootMessageIndex, latestKnownUpdate));
    }
    eventsByIndexFromBackend(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate) {
        const args = {
            channel_id: BigInt(chatId.channelId),
            thread_root_message_index: threadRootMessageIndex,
            events: eventIndexes,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: [],
        };
        return this.executeMsgpackQuery("events_by_index", args, (res) => {
            return (0, mappersV2_2.getEventsResponse)(this.principal, res, chatId, latestKnownUpdate);
        }, typebox_1.CommunityEventsByIndexArgs, typebox_1.CommunityEventsResponse);
    }
    async eventsWindow(chatId, eventIndexRange, messageIndex, threadRootMessageIndex, latestKnownUpdate) {
        const [cachedEvents, missing, totalMiss] = await (0, caching_1.getCachedEventsWindowByMessageIndex)(this.db, eventIndexRange, { chatId, threadRootMessageIndex }, messageIndex);
        if (totalMiss || missing.size >= openchat_shared_1.MAX_MISSING) {
            console.log("We didn't get enough back from the cache, going to the api", missing.size, totalMiss);
            return this.eventsWindowFromBackend(chatId, messageIndex, threadRootMessageIndex, latestKnownUpdate)
                .then((resp) => this.setCachedEvents(chatId, resp, threadRootMessageIndex))
                .catch((err) => {
                if (err instanceof openchat_shared_1.ResponseTooLargeError) {
                    console.log("Response size too large, we will try to split the window request into a a few chunks");
                    return (0, chunked_1.chunkedChatEventsWindowFromBackend)((index, ascending, chunkSize) => this.eventsFromBackend(chatId, index, ascending, threadRootMessageIndex, latestKnownUpdate, chunkSize), (index, chunkSize) => this.eventsWindowFromBackend(chatId, index, threadRootMessageIndex, latestKnownUpdate, chunkSize), eventIndexRange, messageIndex).then((resp) => this.setCachedEvents(chatId, resp, threadRootMessageIndex));
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
    async eventsWindowFromBackend(chatId, messageIndex, threadRootMessageIndex, latestKnownUpdate, maxEvents = openchat_shared_1.MAX_EVENTS) {
        const args = {
            channel_id: BigInt(chatId.channelId),
            thread_root_message_index: threadRootMessageIndex,
            max_messages: openchat_shared_1.MAX_MESSAGES,
            max_events: maxEvents,
            mid_point: messageIndex,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("events_window", args, (res) => (0, mappersV2_2.getEventsResponse)(this.principal, res, chatId, latestKnownUpdate), typebox_1.CommunityEventsWindowArgs, typebox_1.CommunityEventsResponse);
    }
    async getMessagesByMessageIndex(chatId, messageIndexes, latestKnownUpdate) {
        const fromCache = await (0, caching_1.loadMessagesByMessageIndex)(this.db, chatId, messageIndexes);
        if (fromCache.missing.size > 0) {
            console.log("Missing idxs from the cached: ", fromCache.missing);
            const resp = await this.getMessagesByMessageIndexFromBackend(chatId, [...fromCache.missing], latestKnownUpdate).then((resp) => this.setCachedEvents(chatId, resp));
            return resp === "events_failed"
                ? resp
                : {
                    events: [...fromCache.messageEvents, ...resp.events],
                    expiredEventRanges: [],
                    expiredMessageRanges: [],
                    latestEventIndex: resp.latestEventIndex,
                };
        }
        return {
            events: fromCache.messageEvents,
            expiredEventRanges: [],
            expiredMessageRanges: [],
            latestEventIndex: undefined,
        };
    }
    getMessagesByMessageIndexFromBackend(chatId, messageIndexes, latestKnownUpdate) {
        const args = {
            channel_id: BigInt(chatId.channelId),
            thread_root_message_index: undefined,
            messages: messageIndexes,
            invite_code: (0, mapping_1.mapOptional)(this.inviteCode, openchat_shared_1.textToCode),
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("messages_by_message_index", args, (resp) => (0, mappersV2_2.getMessagesByMessageIndexResponse)(this.principal, resp, chatId, latestKnownUpdate), typebox_1.CommunityMessagesByMessageIndexArgs, typebox_1.CommunityMessagesByMessageIndexResponse);
    }
    handleMissingEvents(chatId, [cachedEvents, missing], threadRootMessageIndex, latestKnownUpdate) {
        if (missing.size === 0) {
            return Promise.resolve(cachedEvents);
        }
        else {
            return this.eventsByIndexFromBackend(chatId, [...missing], threadRootMessageIndex, latestKnownUpdate)
                .then((resp) => this.setCachedEvents(chatId, resp, threadRootMessageIndex))
                .then((resp) => {
                if (resp !== "events_failed") {
                    return (0, caching_1.mergeSuccessResponses)(cachedEvents, resp);
                }
                return resp;
            });
        }
    }
    setCachedEvents(chatId, resp, threadRootMessageIndex) {
        (0, caching_1.setCachedEvents)(this.db, chatId, resp, threadRootMessageIndex).catch((err) => this.config.logger.error("Error writing cached channel events", err));
        return resp;
    }
    getInviteCode() {
        return this.executeMsgpackQuery("invite_code", {}, chatMappersV2_1.inviteCodeResponse, typebox_1.Empty, typebox_1.CommunityInviteCodeResponse);
    }
    leaveChannel(chatId) {
        return this.executeMsgpackUpdate("leave_channel", {
            channel_id: BigInt(chatId.channelId),
        }, chatMappersV2_1.leaveGroupResponse, typebox_1.CommunityLeaveChannelArgs, typebox_1.CommunityLeaveChannelResponse);
    }
    localUserIndex() {
        return this.executeMsgpackQuery("local_user_index", {}, (resp) => (0, mapping_1.principalBytesToString)(resp.Success), typebox_1.Empty, typebox_1.CommunityLocalUserIndexResponse);
    }
    unpinMessage(chatId, messageIndex) {
        return this.executeMsgpackUpdate("unpin_message", {
            channel_id: BigInt(chatId.channelId),
            message_index: messageIndex,
        }, chatMappersV2_1.unpinMessageResponse, typebox_1.CommunityPinMessageArgs, typebox_1.CommunityPinMessageResponse);
    }
    pinMessage(chatId, messageIndex) {
        return this.executeMsgpackUpdate("pin_message", {
            channel_id: BigInt(chatId.channelId),
            message_index: messageIndex,
        }, chatMappersV2_1.pinMessageResponse, typebox_1.CommunityPinMessageArgs, typebox_1.CommunityPinMessageResponse);
    }
    removeMember(userId) {
        return this.executeMsgpackUpdate("remove_member", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
        }, mappersV2_1.removeMemberResponse, typebox_1.CommunityRemoveMemberArgs, typebox_1.CommunityRemoveMemberResponse);
    }
    removeMemberFromChannel(chatId, userId) {
        return this.executeMsgpackUpdate("remove_member_from_channel", {
            channel_id: BigInt(chatId.channelId),
            user_id: (0, mapping_1.principalStringToBytes)(userId),
        }, mappersV2_1.removeMemberFromChannelResponse, typebox_1.CommunityRemoveMemberFromChannelArgs, typebox_1.CommunityRemoveMemberFromChannelResponse);
    }
    removeReaction(chatId, messageId, reaction, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("remove_reaction", {
            channel_id: BigInt(chatId.channelId),
            message_id: messageId,
            reaction,
            thread_root_message_index: threadRootMessageIndex,
        }, chatMappersV2_1.addRemoveReactionResponse, typebox_1.CommunityRemoveReactionArgs, typebox_1.CommunityRemoveReactionResponse);
    }
    resetInviteCode() {
        return this.executeMsgpackUpdate("reset_invite_code", {}, chatMappersV2_1.enableOrResetInviteCodeResponse, typebox_1.Empty, typebox_1.CommunityEnableInviteCodeResponse);
    }
    searchChannel(chatId, maxResults, users, searchTerm) {
        return this.executeMsgpackQuery("search_channel", {
            channel_id: BigInt(chatId.channelId),
            max_results: maxResults,
            users: users.map(mapping_1.principalStringToBytes),
            search_term: searchTerm,
        }, (resp) => (0, chatMappersV2_1.searchGroupChatResponse)(resp, chatId), typebox_1.CommunitySearchChannelArgs, typebox_1.CommunitySearchChannelResponse);
    }
    async getCommunityDetails(id, communityLastUpdated) {
        const fromCache = await (0, caching_1.getCachedCommunityDetails)(this.db, id.communityId);
        if (fromCache !== undefined) {
            if (fromCache.lastUpdated >= communityLastUpdated || (0, openchat_shared_1.offline)()) {
                return fromCache;
            }
            else {
                return this.getCommunityDetailsUpdates(id, fromCache);
            }
        }
        const response = await this.getCommunityDetailsFromBackend();
        if (response !== "failure") {
            await (0, caching_1.setCachedCommunityDetails)(this.db, id.communityId, response);
        }
        return response;
    }
    getCommunityDetailsFromBackend() {
        return this.executeMsgpackQuery("selected_initial", {
            invite_code: (0, mapping_1.mapOptional)(this.inviteCode, openchat_shared_1.textToCode),
        }, mappersV2_1.communityDetailsResponse, typebox_1.CommunitySelectedInitialArgs, typebox_1.CommunitySelectedInitialResponse);
    }
    async getCommunityDetailsUpdates(id, previous) {
        const response = await this.getCommunityDetailsUpdatesFromBackend(previous);
        if (response.lastUpdated > previous.lastUpdated) {
            await (0, caching_1.setCachedCommunityDetails)(this.db, id.communityId, response);
        }
        return response;
    }
    async getCommunityDetailsUpdatesFromBackend(previous) {
        const updatesResponse = await this.executeMsgpackQuery("selected_updates_v2", {
            updates_since: previous.lastUpdated,
            invite_code: (0, mapping_1.mapOptional)(this.inviteCode, openchat_shared_1.textToCode),
        }, mappersV2_1.communityDetailsUpdatesResponse, typebox_1.CommunitySelectedUpdatesArgs, typebox_1.CommunitySelectedUpdatesResponse);
        if (updatesResponse.kind === "failure") {
            return previous;
        }
        if (updatesResponse.kind === "success_no_updates") {
            return {
                ...previous,
                lastUpdated: updatesResponse.lastUpdated,
            };
        }
        return (0, chat_1.mergeCommunityDetails)(previous, updatesResponse);
    }
    async getChannelDetails(chatId, chatLastUpdated) {
        const cacheKey = `${chatId.communityId}_${chatId.channelId}`;
        const fromCache = await (0, caching_1.getCachedGroupDetails)(this.db, cacheKey);
        if (fromCache !== undefined) {
            if (fromCache.timestamp >= chatLastUpdated || (0, openchat_shared_1.offline)()) {
                return fromCache;
            }
            else {
                return this.getChannelDetailsUpdates(chatId, cacheKey, fromCache);
            }
        }
        const response = await this.getChannelDetailsFromBackend(chatId);
        if (response !== "failure") {
            await (0, caching_1.setCachedGroupDetails)(this.db, cacheKey, response);
        }
        return response;
    }
    getChannelDetailsFromBackend(chatId) {
        return this.executeMsgpackQuery("selected_channel_initial", {
            channel_id: BigInt(chatId.channelId),
        }, chatMappersV2_1.groupDetailsResponse, typebox_1.CommunitySelectedChannelInitialArgs, typebox_1.CommunitySelectedChannelInitialResponse);
    }
    async getChannelDetailsUpdates(chatId, cacheKey, previous) {
        const response = await this.getChannelDetailsUpdatesFromBackend(chatId, previous);
        if (response.timestamp > previous.timestamp) {
            await (0, caching_1.setCachedGroupDetails)(this.db, cacheKey, response);
        }
        return response;
    }
    async getChannelDetailsUpdatesFromBackend(chatId, previous) {
        const updatesResponse = await this.executeMsgpackQuery("selected_channel_updates_v2", {
            channel_id: BigInt(chatId.channelId),
            updates_since: previous.timestamp,
        }, chatMappersV2_1.groupDetailsUpdatesResponse, typebox_1.CommunitySelectedChannelUpdatesArgs, typebox_1.CommunitySelectedChannelUpdatesResponse);
        if (updatesResponse.kind === "failure") {
            return previous;
        }
        if (updatesResponse.kind === "success_no_updates") {
            return {
                ...previous,
                timestamp: updatesResponse.timestamp,
            };
        }
        return (0, chat_1.mergeGroupChatDetails)(previous, updatesResponse);
    }
    sendMessage(chatId, senderName, senderDisplayName, mentioned, event, threadRootMessageIndex, communityRulesAccepted, channelRulesAccepted, messageFilterFailed, newAchievement, onRequestAccepted) {
        (0, caching_1.removeFailedMessage)(this.db, chatId, event.event.messageId, threadRootMessageIndex);
        const dataClient = new data_client_1.DataClient(this.identity, this.agent, this.config);
        const uploadContentPromise = event.event.forwarded
            ? dataClient.forwardData(event.event.content, [chatId.communityId])
            : dataClient.uploadData(event.event.content, [chatId.communityId]);
        return uploadContentPromise.then((content) => {
            const newContent = content ?? event.event.content;
            const args = {
                channel_id: BigInt(chatId.channelId),
                content: (0, chatMappersV2_1.apiMessageContent)(newContent),
                message_id: event.event.messageId,
                sender_name: senderName,
                sender_display_name: senderDisplayName,
                community_rules_accepted: communityRulesAccepted,
                channel_rules_accepted: channelRulesAccepted,
                replies_to: (0, mapping_1.mapOptional)(event.event.repliesTo, (replyContext) => ({
                    event_index: replyContext.eventIndex,
                })),
                mentioned: mentioned.map(chatMappersV2_1.apiUser),
                forwarding: event.event.forwarded,
                thread_root_message_index: threadRootMessageIndex,
                message_filter_failed: messageFilterFailed,
                block_level_markdown: event.event.blockLevelMarkdown,
                new_achievement: newAchievement,
            };
            return this.executeMsgpackUpdate("send_message", args, mappersV2_1.sendMessageResponse, typebox_1.CommunitySendMessageArgs, typebox_1.CommunitySendMessageResponse, onRequestAccepted)
                .then((resp) => {
                const retVal = [
                    resp,
                    { ...event.event, content: newContent },
                ];
                (0, caching_1.setCachedMessageFromSendResponse)(this.db, chatId, event, threadRootMessageIndex)(retVal);
                return retVal;
            })
                .catch((err) => {
                (0, caching_1.recordFailedMessage)(this.db, chatId, event, threadRootMessageIndex);
                throw err;
            });
        });
    }
    registerPollVote(chatId, messageIdx, answerIdx, voteType, threadRootMessageIndex, newAchievement) {
        return this.executeMsgpackUpdate("register_poll_vote", {
            channel_id: BigInt(chatId.channelId),
            thread_root_message_index: threadRootMessageIndex,
            poll_option: answerIdx,
            operation: voteType === "register" ? "RegisterVote" : "DeleteVote",
            message_index: messageIdx,
            new_achievement: newAchievement,
        }, chatMappersV2_1.registerPollVoteResponse, typebox_1.CommunityRegisterPollVoteArgs, typebox_1.CommunityRegisterPollVoteResponse);
    }
    channelSummary(chatId) {
        return this.executeMsgpackQuery("channel_summary", {
            channel_id: BigInt(chatId.channelId),
            invite_code: (0, mapping_1.mapOptional)(this.inviteCode, openchat_shared_1.textToCode),
        }, (resp) => (0, mappersV2_1.communityChannelSummaryResponse)(resp, this.communityId), typebox_1.CommunityChannelSummaryArgs, typebox_1.CommunityChannelSummaryResponse).catch((err) => {
            if (err instanceof openchat_shared_1.DestinationInvalidError) {
                return { kind: "canister_not_found" };
            }
            else {
                throw err;
            }
        });
    }
    importGroup(id) {
        return this.executeMsgpackUpdate("import_group", {
            group_id: (0, mapping_1.principalStringToBytes)(id.groupId),
        }, (resp) => (0, mappersV2_1.importGroupResponse)(this.communityId, resp), typebox_1.CommunityImportGroupArgs, typebox_1.CommunityImportGroupResponse);
    }
    summary() {
        return this.executeMsgpackQuery("summary", {
            invite_code: (0, mapping_1.mapOptional)(this.inviteCode, openchat_shared_1.textToCode),
        }, mappersV2_1.summaryResponse, typebox_1.CommunitySummaryArgs, typebox_1.CommunitySummaryResponse);
    }
    exploreChannels(searchTerm, pageSize, pageIndex) {
        return this.executeMsgpackQuery("explore_channels", {
            page_size: pageSize,
            page_index: pageIndex,
            search_term: searchTerm,
            invite_code: (0, mapping_1.mapOptional)(this.inviteCode, openchat_shared_1.textToCode),
        }, (resp) => (0, mappersV2_1.exploreChannelsResponse)(resp, this.communityId), typebox_1.CommunityExploreChannelsArgs, typebox_1.CommunityExploreChannelsResponse);
    }
    summaryUpdates(updatesSince) {
        return this.executeMsgpackQuery("summary_updates", {
            updates_since: updatesSince,
            invite_code: (0, mapping_1.mapOptional)(this.inviteCode, openchat_shared_1.textToCode),
        }, mappersV2_1.summaryUpdatesResponse, typebox_1.CommunitySummaryUpdatesArgs, typebox_1.CommunitySummaryUpdatesResponse);
    }
    toggleMuteChannelNotifications(chatId, mute) {
        return this.executeMsgpackUpdate("toggle_mute_notifications", {
            channel_id: chatId ? BigInt(chatId.channelId) : undefined,
            mute,
        }, mappers_1.toggleNotificationsResponse, typebox_1.CommunityToggleMuteNotificationsArgs, typebox_1.CommunityToggleMuteNotificationsResponse);
    }
    unblockUser(userId) {
        return this.executeMsgpackUpdate("unblock_user", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
        }, mappersV2_1.unblockUserResponse, typebox_1.CommunityUnblockUserArgs, typebox_1.CommunityUnblockUserResponse);
    }
    undeleteMessage(chatId, messageId, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("undelete_messages", {
            channel_id: BigInt(chatId.channelId),
            thread_root_message_index: threadRootMessageIndex,
            message_ids: [messageId],
        }, chatMappersV2_1.undeleteMessageResponse, typebox_1.CommunityUndeleteMessagesArgs, typebox_1.CommunityUndeleteMessagesResponse);
    }
    threadPreviews(chatId, threadRootMessageIndexes, latestClientThreadUpdate) {
        return this.executeMsgpackQuery("thread_previews", {
            channel_id: BigInt(chatId.channelId),
            threads: threadRootMessageIndexes,
            latest_client_thread_update: latestClientThreadUpdate,
        }, (resp) => (0, chatMappersV2_1.threadPreviewsResponse)(resp, chatId, latestClientThreadUpdate), typebox_1.CommunityThreadPreviewsArgs, typebox_1.CommunityThreadPreviewsResponse);
    }
    registerProposalVote(channelId, messageIdx, adopt) {
        return this.executeMsgpackUpdate("register_proposal_vote", {
            channel_id: BigInt(channelId),
            adopt,
            message_index: messageIdx,
        }, chatMappersV2_1.registerProposalVoteResponse, typebox_1.CommunityRegisterProposalVoteArgs, typebox_1.CommunityRegisterProposalVoteResponse);
    }
    updateChannel(chatId, name, description, rules, permissions, avatar, eventsTimeToLiveMs, gateConfig, isPublic, messagesVisibleToNonMembers, externalUrl) {
        return this.executeMsgpackUpdate("update_channel", {
            channel_id: BigInt(chatId.channelId),
            name: name,
            description,
            external_url: externalUrl === undefined ? "NoChange" : { SetToSome: externalUrl },
            permissions_v2: (0, mapping_1.mapOptional)(permissions, mappersV2_2.apiOptionalGroupPermissions),
            rules: (0, mapping_1.mapOptional)(rules, mappersV2_2.apiUpdatedRules),
            public: isPublic,
            events_ttl: (0, mapping_1.apiOptionUpdateV2)(mapping_1.identity, eventsTimeToLiveMs),
            gate: gateConfig === undefined
                ? "NoChange"
                : gateConfig.gate.kind === "no_gate"
                    ? "SetToNone"
                    : { SetToSome: (0, chatMappersV2_1.apiAccessGate)(gateConfig.gate) },
            gate_config: gateConfig === undefined
                ? "NoChange"
                : gateConfig.gate.kind === "no_gate"
                    ? "SetToNone"
                    : {
                        SetToSome: (0, chatMappersV2_1.apiAccessGateConfig)(gateConfig),
                    },
            avatar: avatar === undefined
                ? "NoChange"
                : {
                    SetToSome: {
                        id: data_client_1.DataClient.newBlobId(),
                        mime_type: "image/jpg",
                        data: avatar,
                    },
                },
            messages_visible_to_non_members: messagesVisibleToNonMembers,
        }, chatMappersV2_1.updateGroupResponse, typebox_1.CommunityUpdateChannelArgs, typebox_1.CommunityUpdateChannelResponse);
    }
    updateCommunity(name, description, rules, permissions, avatar, banner, gateConfig, isPublic, primaryLanguage) {
        return this.executeMsgpackUpdate("update_community", {
            name,
            description,
            permissions: (0, mapping_1.mapOptional)(permissions, mappersV2_1.apiOptionalCommunityPermissions),
            rules: (0, mapping_1.mapOptional)(rules, mappersV2_2.apiUpdatedRules),
            public: isPublic,
            primary_language: primaryLanguage,
            gate: gateConfig === undefined
                ? "NoChange"
                : gateConfig.gate.kind === "no_gate"
                    ? "SetToNone"
                    : { SetToSome: (0, chatMappersV2_1.apiAccessGate)(gateConfig.gate) },
            gate_config: gateConfig === undefined
                ? "NoChange"
                : gateConfig.gate.kind === "no_gate"
                    ? "SetToNone"
                    : {
                        SetToSome: (0, chatMappersV2_1.apiAccessGateConfig)(gateConfig),
                    },
            avatar: avatar === undefined
                ? "NoChange"
                : {
                    SetToSome: {
                        id: data_client_1.DataClient.newBlobId(),
                        mime_type: "image/jpg",
                        data: avatar,
                    },
                },
            banner: banner === undefined
                ? "NoChange"
                : {
                    SetToSome: {
                        id: data_client_1.DataClient.newBlobId(),
                        mime_type: "image/jpg",
                        data: banner,
                    },
                },
        }, mappersV2_1.updateCommunityResponse, typebox_1.CommunityUpdateCommunityArgs, typebox_1.CommunityUpdateCommunityResponse);
    }
    createUserGroup(name, users) {
        return this.executeMsgpackUpdate("create_user_group", {
            name,
            user_ids: users.map(mapping_1.principalStringToBytes),
        }, mappersV2_1.createUserGroupResponse, typebox_1.CommunityCreateUserGroupArgs, typebox_1.CommunityCreateUserGroupResponse);
    }
    updateUserGroup(userGroupId, name, usersToAdd, usersToRemove) {
        return this.executeMsgpackUpdate("update_user_group", {
            user_group_id: userGroupId,
            name,
            users_to_add: usersToAdd.map(mapping_1.principalStringToBytes),
            users_to_remove: usersToRemove.map(mapping_1.principalStringToBytes),
        }, mappersV2_1.updateUserGroupResponse, typebox_1.CommunityUpdateUserGroupArgs, typebox_1.CommunityUpdateUserGroupResponse);
    }
    setMemberDisplayName(displayName, newAchievement) {
        return this.executeMsgpackUpdate("set_member_display_name", {
            display_name: displayName,
            new_achievement: newAchievement,
        }, mappersV2_1.setMemberDisplayNameResponse, typebox_1.CommunitySetMemberDisplayNameArgs, typebox_1.CommunitySetMemberDisplayNameResponse);
    }
    deleteUserGroups(userGroupIds) {
        return this.executeMsgpackUpdate("delete_user_groups", {
            user_group_ids: userGroupIds,
        }, mappersV2_1.deleteUserGroupsResponse, typebox_1.CommunityDeleteUserGroupsArgs, typebox_1.CommunityDeleteUserGroupsResponse);
    }
    followThread(channelId, threadRootMessageIndex, follow, newAchievement) {
        const args = {
            channel_id: BigInt(channelId),
            thread_root_message_index: threadRootMessageIndex,
            new_achievement: newAchievement,
        };
        return this.executeMsgpackUpdate(follow ? "follow_thread" : "unfollow_thread", args, mappersV2_1.followThreadResponse, typebox_1.CommunityFollowThreadArgs, typebox_1.CommunityFollowThreadResponse);
    }
    reportMessage(channelId, threadRootMessageIndex, messageId, deleteMessage) {
        return this.executeMsgpackUpdate("report_message", {
            channel_id: BigInt(channelId),
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
            delete: deleteMessage,
        }, mappersV2_1.reportMessageResponse, typebox_1.CommunityReportMessageArgs, typebox_1.CommunityReportMessageResponse);
    }
    acceptP2PSwap(channelId, threadRootMessageIndex, messageId, pin, newAchievement) {
        return this.executeMsgpackUpdate("accept_p2p_swap", {
            channel_id: BigInt(channelId),
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
            pin,
            new_achievement: newAchievement,
        }, chatMappersV2_1.acceptP2PSwapResponse, typebox_1.CommunityAcceptP2pSwapArgs, typebox_1.CommunityAcceptP2pSwapResponse);
    }
    cancelP2PSwap(channelId, threadRootMessageIndex, messageId) {
        return this.executeMsgpackUpdate("cancel_p2p_swap", {
            channel_id: BigInt(channelId),
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
        }, chatMappersV2_1.cancelP2PSwapResponse, typebox_1.CommunityCancelP2pSwapArgs, typebox_1.CommunityCancelP2pSwapResponse);
    }
    joinVideoCall(channelId, messageId, newAchievement) {
        return this.executeMsgpackUpdate("join_video_call", {
            message_id: messageId,
            channel_id: BigInt(channelId),
            new_achievement: newAchievement,
        }, chatMappersV2_1.joinVideoCallResponse, typebox_1.CommunityJoinVideoCallArgs, typebox_1.CommunitySetVideoCallPresenceResponse);
    }
    setVideoCallPresence(channelId, messageId, presence, newAchievement) {
        return this.executeMsgpackUpdate("set_video_call_presence", {
            channel_id: BigInt(channelId),
            message_id: messageId,
            presence: (0, chatMappersV2_1.apiVideoCallPresence)(presence),
            new_achievement: newAchievement,
        }, chatMappersV2_1.setVideoCallPresence, typebox_1.CommunitySetVideoCallPresenceArgs, typebox_1.CommunitySetVideoCallPresenceResponse);
    }
    videoCallParticipants(channelId, messageId, updatesSince) {
        return this.executeMsgpackQuery("video_call_participants", {
            channel_id: BigInt(channelId),
            message_id: messageId,
            updated_since: updatesSince,
        }, chatMappersV2_1.videoCallParticipantsResponse, typebox_1.CommunityVideoCallParticipantsArgs, typebox_1.CommunityVideoCallParticipantsResponse);
    }
    cancelInvites(channelId, userIds) {
        return this.executeMsgpackUpdate("cancel_invites", {
            channel_id: (0, mapping_1.mapOptional)(channelId, (cid) => BigInt(cid)),
            user_ids: userIds.map(mapping_1.principalStringToBytes),
        }, (value) => value === "Success", typebox_1.CommunityCancelInvitesArgs, typebox_1.CommunityCancelInvitesResponse);
    }
}
exports.CommunityClient = CommunityClient;
