"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupClient = void 0;
const openchat_shared_1 = require("openchat-shared");
const candidService_1 = require("../candidService");
const mappersV2_1 = require("./mappersV2");
const mappersV2_2 = require("./mappersV2");
const caching_1 = require("../../utils/caching");
const chatMappersV2_1 = require("../common/chatMappersV2");
const data_client_1 = require("../data/data.client");
const chat_1 = require("../../utils/chat");
const publicSummaryMapperV2_1 = require("../common/publicSummaryMapperV2");
const mapping_1 = require("../../utils/mapping");
const rng_1 = require("../../utils/rng");
const caching_2 = require("../../utils/caching");
const mappers_1 = require("../notifications/mappers");
const openchat_shared_2 = require("openchat-shared");
const chunked_1 = require("../common/chunked");
const typebox_1 = require("../../typebox");
class GroupClient extends candidService_1.CandidService {
    constructor(identity, agent, config, chatId, db, inviteCode) {
        super(identity, agent, chatId.groupId);
        this.config = config;
        this.chatId = chatId;
        this.db = db;
        this.inviteCode = inviteCode;
    }
    summary() {
        return this.executeMsgpackQuery("summary", {}, mappersV2_1.summaryResponse, typebox_1.Empty, typebox_1.GroupSummaryResponse).catch((err) => {
            if (err instanceof openchat_shared_1.DestinationInvalidError) {
                return { kind: "canister_not_found" };
            }
            else {
                throw err;
            }
        });
    }
    summaryUpdates(updatesSince) {
        const args = { updates_since: updatesSince };
        return this.executeMsgpackQuery("summary_updates", args, mappersV2_1.summaryUpdatesResponse, typebox_1.GroupSummaryUpdatesArgs, typebox_1.GroupSummaryUpdatesResponse);
    }
    getCachedEventsByIndex(eventIndexes, threadRootMessageIndex) {
        return (0, caching_1.getCachedEventsByIndex)(this.db, eventIndexes, {
            chatId: this.chatId,
            threadRootMessageIndex,
        });
    }
    chatEventsByIndex(eventIndexes, threadRootMessageIndex, latestKnownUpdate) {
        return this.getCachedEventsByIndex(eventIndexes, threadRootMessageIndex).then((res) => this.handleMissingEvents(res, threadRootMessageIndex, latestKnownUpdate));
    }
    setCachedEvents(resp, threadRootMessageIndex) {
        (0, caching_1.setCachedEvents)(this.db, this.chatId, resp, threadRootMessageIndex).catch((err) => this.config.logger.error("Error writing cached group events", err));
        return resp;
    }
    handleMissingEvents([cachedEvents, missing], threadRootMessageIndex, latestKnownUpdate) {
        if (missing.size === 0) {
            return Promise.resolve(cachedEvents);
        }
        else {
            return this.chatEventsByIndexFromBackend([...missing], threadRootMessageIndex, latestKnownUpdate)
                .then((resp) => this.setCachedEvents(resp, threadRootMessageIndex))
                .then((resp) => {
                if (resp !== "events_failed") {
                    return (0, caching_1.mergeSuccessResponses)(cachedEvents, resp);
                }
                return resp;
            });
        }
    }
    chatEventsByIndexFromBackend(eventIndexes, threadRootMessageIndex, latestKnownUpdate) {
        const args = {
            thread_root_message_index: threadRootMessageIndex,
            events: eventIndexes,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("events_by_index", args, (resp) => (0, mappersV2_1.getEventsResponse)(this.principal, resp, this.chatId, latestKnownUpdate), typebox_1.GroupEventsByIndexArgs, typebox_1.GroupEventsResponse);
    }
    async chatEventsWindow(eventIndexRange, messageIndex, threadRootMessageIndex, latestKnownUpdate, maxEvents = openchat_shared_1.MAX_EVENTS) {
        const [cachedEvents, missing, totalMiss] = await (0, caching_1.getCachedEventsWindowByMessageIndex)(this.db, eventIndexRange, { chatId: this.chatId, threadRootMessageIndex }, messageIndex, maxEvents);
        if (totalMiss || missing.size >= openchat_shared_1.MAX_MISSING) {
            console.log("We didn't get enough back from the cache, going to the api", missing.size, totalMiss);
            return this.chatEventsWindowFromBackend(messageIndex, threadRootMessageIndex, latestKnownUpdate, maxEvents)
                .then((resp) => this.setCachedEvents(resp, threadRootMessageIndex))
                .catch((err) => {
                if (err instanceof openchat_shared_2.ResponseTooLargeError) {
                    console.log("Response size too large, we will try to split the window request into a a few chunks");
                    return (0, chunked_1.chunkedChatEventsWindowFromBackend)((index, ascending, chunkSize) => this.chatEventsFromBackend(index, ascending, threadRootMessageIndex, latestKnownUpdate, chunkSize), (index, chunkSize) => this.chatEventsWindowFromBackend(index, threadRootMessageIndex, latestKnownUpdate, chunkSize), eventIndexRange, messageIndex).then((resp) => this.setCachedEvents(resp, threadRootMessageIndex));
                }
                else {
                    throw err;
                }
            });
        }
        else {
            return this.handleMissingEvents([cachedEvents, missing], threadRootMessageIndex, latestKnownUpdate);
        }
    }
    async chatEventsWindowFromBackend(messageIndex, threadRootMessageIndex, latestKnownUpdate, maxEvents = openchat_shared_1.MAX_EVENTS) {
        const args = {
            thread_root_message_index: threadRootMessageIndex,
            max_messages: openchat_shared_1.MAX_MESSAGES,
            max_events: maxEvents,
            mid_point: messageIndex,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("events_window", args, (resp) => (0, mappersV2_1.getEventsResponse)(this.principal, resp, this.chatId, latestKnownUpdate), typebox_1.GroupEventsWindowArgs, typebox_1.GroupEventsResponse);
    }
    async chatEvents(eventIndexRange, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate) {
        const [cachedEvents, missing] = await (0, caching_1.getCachedEvents)(this.db, eventIndexRange, { chatId: this.chatId, threadRootMessageIndex }, startIndex, ascending);
        if (missing.size >= openchat_shared_1.MAX_MISSING) {
            console.log("We didn't get enough back from the cache, going to the api", missing.size);
            return this.chatEventsFromBackend(startIndex, ascending, threadRootMessageIndex, latestKnownUpdate)
                .then((resp) => this.setCachedEvents(resp, threadRootMessageIndex))
                .catch((err) => {
                if (err instanceof openchat_shared_2.ResponseTooLargeError) {
                    console.log("Response size too large, we will try to split the payload into a a few chunks");
                    return (0, chunked_1.chunkedChatEventsFromBackend)((index, chunkSize) => this.chatEventsFromBackend(index, ascending, threadRootMessageIndex, latestKnownUpdate, chunkSize), eventIndexRange, startIndex, ascending).then((resp) => this.setCachedEvents(resp, threadRootMessageIndex));
                }
                else {
                    throw err;
                }
            });
        }
        else {
            return this.handleMissingEvents([cachedEvents, missing], threadRootMessageIndex, latestKnownUpdate);
        }
    }
    chatEventsFromBackend(startIndex, ascending, threadRootMessageIndex, latestKnownUpdate, maxEvents = openchat_shared_1.MAX_EVENTS) {
        const args = {
            thread_root_message_index: threadRootMessageIndex,
            max_messages: openchat_shared_1.MAX_MESSAGES,
            max_events: maxEvents,
            ascending,
            start_index: startIndex,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("events", args, (resp) => (0, mappersV2_1.getEventsResponse)(this.principal, resp, this.chatId, latestKnownUpdate), typebox_1.GroupEventsArgs, typebox_1.GroupEventsResponse);
    }
    changeRole(userId, newRole) {
        const new_role = (0, mappersV2_1.apiRole)(newRole);
        if (new_role === undefined) {
            throw new Error(`Cannot change user's role to: ${newRole}`);
        }
        return this.executeMsgpackUpdate("change_role", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            new_role,
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.changeRoleResponse, typebox_1.GroupChangeRoleArgs, typebox_1.GroupChangeRoleResponse);
    }
    removeMember(userId) {
        return this.executeMsgpackUpdate("remove_participant", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            correlation_id: (0, rng_1.generateUint64)(),
        }, mappersV2_1.removeMemberResponse, typebox_1.GroupRemoveParticipantArgs, typebox_1.GroupRemoveParticipantResponse);
    }
    editMessage(message, threadRootMessageIndex, blockLevelMarkdown, newAchievement) {
        return new data_client_1.DataClient(this.identity, this.agent, this.config)
            .uploadData(message.content, [this.chatId.groupId])
            .then((content) => {
            const args = {
                thread_root_message_index: threadRootMessageIndex,
                content: (0, chatMappersV2_1.apiMessageContent)(content ?? message.content),
                message_id: message.messageId,
                block_level_markdown: blockLevelMarkdown,
                correlation_id: (0, rng_1.generateUint64)(),
                new_achievement: newAchievement,
            };
            return this.executeMsgpackUpdate("edit_message_v2", args, chatMappersV2_1.editMessageResponse, typebox_1.GroupEditMessageArgs, typebox_1.GroupEditMessageResponse);
        });
    }
    claimPrize(messageId) {
        return this.executeMsgpackUpdate("claim_prize", {
            correlation_id: (0, rng_1.generateUint64)(),
            message_id: messageId,
        }, chatMappersV2_1.claimPrizeResponse, typebox_1.GroupClaimPrizeArgs, typebox_1.GroupClaimPrizeResponse);
    }
    sendMessage(senderName, senderDisplayName, mentioned, event, threadRootMessageIndex, rulesAccepted, messageFilterFailed, newAchievement, onRequestAccepted) {
        (0, caching_1.removeFailedMessage)(this.db, this.chatId, event.event.messageId, threadRootMessageIndex);
        const dataClient = new data_client_1.DataClient(this.identity, this.agent, this.config);
        const uploadContentPromise = event.event.forwarded
            ? dataClient.forwardData(event.event.content, [this.chatId.groupId])
            : dataClient.uploadData(event.event.content, [this.chatId.groupId]);
        return uploadContentPromise.then((content) => {
            const newContent = content ?? event.event.content;
            const args = {
                content: (0, chatMappersV2_1.apiMessageContent)(newContent),
                message_id: event.event.messageId,
                sender_name: senderName,
                sender_display_name: senderDisplayName,
                rules_accepted: rulesAccepted,
                replies_to: (0, mapping_1.mapOptional)(event.event.repliesTo, (replyContext) => ({
                    event_index: replyContext.eventIndex,
                })),
                mentioned: mentioned.map(chatMappersV2_1.apiUser),
                forwarding: event.event.forwarded,
                thread_root_message_index: threadRootMessageIndex,
                message_filter_failed: messageFilterFailed,
                correlation_id: (0, rng_1.generateUint64)(),
                block_level_markdown: event.event.blockLevelMarkdown,
                new_achievement: newAchievement,
            };
            return this.executeMsgpackUpdate("send_message_v2", args, mappersV2_2.sendMessageResponse, typebox_1.GroupSendMessageArgs, typebox_1.GroupSendMessageResponse, onRequestAccepted)
                .then((resp) => {
                const retVal = [
                    resp,
                    { ...event.event, content: newContent },
                ];
                (0, caching_2.setCachedMessageFromSendResponse)(this.db, this.chatId, event, threadRootMessageIndex)(retVal);
                return retVal;
            })
                .catch((err) => {
                (0, caching_1.recordFailedMessage)(this.db, this.chatId, event, threadRootMessageIndex);
                throw err;
            });
        });
    }
    updateGroup(name, description, rules, permissions, avatar, eventsTimeToLiveMs, gateConfig, isPublic, messagesVisibleToNonMembers) {
        return this.executeMsgpackUpdate("update_group_v2", {
            name,
            description,
            public: isPublic,
            avatar: avatar === undefined
                ? "NoChange"
                : {
                    SetToSome: {
                        id: data_client_1.DataClient.newBlobId(),
                        mime_type: "image/jpg",
                        data: avatar,
                    },
                },
            permissions_v2: (0, mapping_1.mapOptional)(permissions, mappersV2_1.apiOptionalGroupPermissions),
            rules: (0, mapping_1.mapOptional)(rules, mappersV2_1.apiUpdatedRules),
            events_ttl: (0, mapping_1.apiOptionUpdateV2)(mapping_1.identity, eventsTimeToLiveMs),
            correlation_id: (0, rng_1.generateUint64)(),
            gate_config: gateConfig === undefined
                ? "NoChange"
                : gateConfig.gate.kind === "no_gate"
                    ? "SetToNone"
                    : { SetToSome: (0, chatMappersV2_1.apiAccessGateConfig)(gateConfig) },
            gate: gateConfig === undefined
                ? "NoChange"
                : gateConfig.gate.kind === "no_gate"
                    ? "SetToNone"
                    : { SetToSome: (0, chatMappersV2_1.apiAccessGate)(gateConfig.gate) },
            messages_visible_to_non_members: messagesVisibleToNonMembers,
        }, chatMappersV2_1.updateGroupResponse, typebox_1.GroupUpdateGroupArgs, typebox_1.GroupUpdateGroupResponse);
    }
    addReaction(messageId, reaction, username, displayName, threadRootMessageIndex, newAchievement) {
        return this.executeMsgpackUpdate("add_reaction", {
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
            reaction,
            username,
            display_name: displayName,
            correlation_id: (0, rng_1.generateUint64)(),
            new_achievement: newAchievement,
        }, chatMappersV2_1.addRemoveReactionResponse, typebox_1.GroupAddReactionArgs, typebox_1.GroupAddReactionResponse);
    }
    removeReaction(messageId, reaction, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("remove_reaction", {
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
            reaction,
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.addRemoveReactionResponse, typebox_1.GroupRemoveReactionArgs, typebox_1.GroupRemoveReactionResponse);
    }
    deleteMessage(messageId, threadRootMessageIndex, asPlatformModerator, newAchievement) {
        return this.executeMsgpackUpdate("delete_messages", {
            thread_root_message_index: threadRootMessageIndex,
            message_ids: [messageId],
            correlation_id: (0, rng_1.generateUint64)(),
            as_platform_moderator: asPlatformModerator,
            new_achievement: newAchievement,
        }, chatMappersV2_1.deleteMessageResponse, typebox_1.GroupDeleteMessagesArgs, typebox_1.GroupDeleteMessagesResponse);
    }
    undeleteMessage(messageId, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("undelete_messages", {
            thread_root_message_index: threadRootMessageIndex,
            message_ids: [messageId],
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.undeleteMessageResponse, typebox_1.GroupUndeleteMessagesArgs, typebox_1.GroupUndeleteMessagesResponse);
    }
    blockUser(userId) {
        return this.executeMsgpackUpdate("block_user", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            correlation_id: (0, rng_1.generateUint64)(),
        }, mappersV2_1.blockUserResponse, typebox_1.GroupBlockUserArgs, typebox_1.GroupBlockUserResponse);
    }
    unblockUser(userId) {
        return this.executeMsgpackUpdate("unblock_user", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            correlation_id: (0, rng_1.generateUint64)(),
        }, mappersV2_1.unblockUserResponse, typebox_1.GroupUnblockUserArgs, typebox_1.GroupUnblockUserResponse);
    }
    async getGroupDetails(chatLastUpdated) {
        const fromCache = await (0, caching_1.getCachedGroupDetails)(this.db, this.chatId.groupId);
        if (fromCache !== undefined) {
            if (fromCache.timestamp >= chatLastUpdated || (0, openchat_shared_1.offline)()) {
                return fromCache;
            }
            else {
                return this.getGroupDetailsUpdates(fromCache);
            }
        }
        const response = await this.getGroupDetailsFromBackend();
        if (response !== "failure") {
            await (0, caching_1.setCachedGroupDetails)(this.db, this.chatId.groupId, response);
        }
        return response;
    }
    getGroupDetailsFromBackend() {
        return this.executeMsgpackQuery("selected_initial", {}, chatMappersV2_1.groupDetailsResponse, typebox_1.Empty, typebox_1.GroupSelectedInitialResponse);
    }
    async getGroupDetailsUpdates(previous) {
        const response = await this.getGroupDetailsUpdatesFromBackend(previous);
        if (response.timestamp > previous.timestamp) {
            await (0, caching_1.setCachedGroupDetails)(this.db, this.chatId.groupId, response);
        }
        return response;
    }
    async getGroupDetailsUpdatesFromBackend(previous) {
        const args = {
            updates_since: previous.timestamp,
        };
        const updatesResponse = await this.executeMsgpackQuery("selected_updates_v2", args, chatMappersV2_1.groupDetailsUpdatesResponse, typebox_1.GroupSelectedUpdatesArgs, typebox_1.GroupSelectedUpdatesResponse);
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
    getPublicSummary() {
        const args = { invite_code: (0, mapping_1.mapOptional)(this.inviteCode, openchat_shared_1.textToCode) };
        return this.executeMsgpackQuery("public_summary", args, publicSummaryMapperV2_1.publicSummaryResponse, typebox_1.GroupPublicSummaryArgs, typebox_1.GroupPublicSummaryResponse);
    }
    async getMessagesByMessageIndex(messageIndexes, latestKnownUpdate) {
        const fromCache = await (0, caching_1.loadMessagesByMessageIndex)(this.db, this.chatId, messageIndexes);
        if (fromCache.missing.size > 0) {
            console.log("Missing idxs from the cached: ", fromCache.missing);
            const resp = await this.getMessagesByMessageIndexFromBackend([...fromCache.missing], latestKnownUpdate).then((resp) => this.setCachedEvents(resp));
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
    getMessagesByMessageIndexFromBackend(messageIndexes, latestKnownUpdate) {
        const args = {
            thread_root_message_index: undefined,
            messages: messageIndexes,
            invite_code: undefined,
            latest_known_update: latestKnownUpdate,
            latest_client_event_index: undefined,
        };
        return this.executeMsgpackQuery("messages_by_message_index", args, (resp) => (0, mappersV2_1.getMessagesByMessageIndexResponse)(this.principal, resp, this.chatId, latestKnownUpdate), typebox_1.GroupMessagesByMessageIndexArgs, typebox_1.GroupMessagesByMessageIndexResponse);
    }
    getDeletedMessage(messageId, threadRootMessageIndex) {
        return this.executeMsgpackUpdate("deleted_message", {
            message_id: messageId,
            thread_root_message_index: threadRootMessageIndex,
        }, chatMappersV2_1.deletedMessageResponse, typebox_1.GroupDeletedMessageArgs, typebox_1.GroupDeletedMessageResponse);
    }
    pinMessage(messageIndex) {
        return this.executeMsgpackUpdate("pin_message_v2", {
            message_index: messageIndex,
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.pinMessageResponse, typebox_1.GroupPinMessageArgs, typebox_1.GroupPinMessageResponse);
    }
    unpinMessage(messageIndex) {
        return this.executeMsgpackUpdate("unpin_message", {
            message_index: messageIndex,
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.unpinMessageResponse, typebox_1.GroupUnpinMessageArgs, typebox_1.GroupUnpinMessageResponse);
    }
    registerPollVote(messageIdx, answerIdx, voteType, threadRootMessageIndex, newAchievement) {
        return this.executeMsgpackUpdate("register_poll_vote", {
            thread_root_message_index: threadRootMessageIndex,
            poll_option: answerIdx,
            operation: voteType === "register" ? "RegisterVote" : "DeleteVote",
            message_index: messageIdx,
            new_achievement: newAchievement,
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.registerPollVoteResponse, typebox_1.GroupRegisterPollVoteArgs, typebox_1.GroupRegisterPollVoteResponse);
    }
    searchGroupChat(searchTerm, userIds, maxResults) {
        const args = {
            search_term: searchTerm,
            max_results: maxResults,
            users: userIds.map(mapping_1.principalStringToBytes),
        };
        return this.executeMsgpackQuery("search_messages", args, (res) => (0, chatMappersV2_1.searchGroupChatResponse)(res, this.chatId), typebox_1.GroupSearchMessagesArgs, typebox_1.GroupSearchMessagesResponse);
    }
    getInviteCode() {
        return this.executeMsgpackQuery("invite_code", {}, chatMappersV2_1.inviteCodeResponse, typebox_1.Empty, typebox_1.GroupInviteCodeResponse);
    }
    enableInviteCode() {
        return this.executeMsgpackUpdate("enable_invite_code", {
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.enableOrResetInviteCodeResponse, typebox_1.GroupEnableInviteCodeArgs, typebox_1.GroupEnableInviteCodeResponse);
    }
    disableInviteCode() {
        return this.executeMsgpackUpdate("disable_invite_code", {
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.disableInviteCodeResponse, typebox_1.GroupDisableInviteCodeArgs, typebox_1.GroupDisableInviteCodeResponse);
    }
    resetInviteCode() {
        return this.executeMsgpackUpdate("reset_invite_code", {
            correlation_id: (0, rng_1.generateUint64)(),
        }, chatMappersV2_1.enableOrResetInviteCodeResponse, typebox_1.GroupEnableInviteCodeArgs, typebox_1.GroupEnableInviteCodeResponse);
    }
    threadPreviews(threadRootMessageIndexes, latestClientThreadUpdate) {
        return this.executeMsgpackQuery("thread_previews", {
            threads: threadRootMessageIndexes,
            latest_client_thread_update: latestClientThreadUpdate,
        }, (resp) => (0, chatMappersV2_1.threadPreviewsResponse)(resp, this.chatId, latestClientThreadUpdate), typebox_1.GroupThreadPreviewsArgs, typebox_1.GroupThreadPreviewsResponse);
    }
    registerProposalVote(messageIdx, adopt) {
        return this.executeMsgpackUpdate("register_proposal_vote", {
            adopt,
            message_index: messageIdx,
        }, chatMappersV2_1.registerProposalVoteResponse, typebox_1.GroupRegisterProposalVoteArgs, typebox_1.GroupRegisterProposalVoteResponse);
    }
    registerProposalVoteV2(messageIdx, adopt) {
        return this.executeMsgpackUpdate("register_proposal_vote_v2", {
            adopt,
            message_index: messageIdx,
        }, chatMappersV2_1.registerProposalVoteResponse, typebox_1.GroupRegisterProposalVoteV2Args, typebox_1.GroupRegisterProposalVoteV2Response);
    }
    localUserIndex() {
        return this.executeMsgpackQuery("local_user_index", {}, (resp) => (0, mapping_1.principalBytesToString)(resp.Success), typebox_1.Empty, typebox_1.GroupLocalUserIndexResponse);
    }
    declineInvitation() {
        return this.executeMsgpackUpdate("decline_invitation", {}, chatMappersV2_1.declineInvitationResponse, typebox_1.Empty, typebox_1.GroupDeclineInvitiationResponse);
    }
    toggleMuteNotifications(mute) {
        return this.executeMsgpackUpdate("toggle_mute_notifications", { mute }, mappers_1.toggleNotificationsResponse, typebox_1.GroupToggleMuteNotificationsArgs, typebox_1.GroupToggleMuteNotificationsResponse);
    }
    convertToCommunity(historyVisible, rules) {
        return this.executeMsgpackUpdate("convert_into_community", {
            history_visible_to_new_joiners: historyVisible,
            primary_language: undefined,
            permissions: undefined,
            rules,
        }, mappersV2_1.convertToCommunityResponse, typebox_1.GroupConvertIntoCommunityArgs, typebox_1.GroupConvertIntoCommunityResponse);
    }
    followThread(threadRootMessageIndex, follow, newAchievement) {
        const args = {
            thread_root_message_index: threadRootMessageIndex,
            new_achievement: newAchievement,
        };
        return this.executeMsgpackUpdate(follow ? "follow_thread" : "unfollow_thread", args, mappersV2_1.followThreadResponse, typebox_1.GroupFollowThreadArgs, typebox_1.GroupFollowThreadResponse);
    }
    reportMessage(threadRootMessageIndex, messageId, deleteMessage) {
        return this.executeMsgpackUpdate("report_message", {
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
            delete: deleteMessage,
        }, mappersV2_1.reportMessageResponse, typebox_1.GroupReportMessageArgs, typebox_1.GroupReportMessageResponse);
    }
    acceptP2PSwap(threadRootMessageIndex, messageId, pin, newAchievement) {
        return this.executeMsgpackUpdate("accept_p2p_swap", {
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
            pin,
            new_achievement: newAchievement,
        }, chatMappersV2_1.acceptP2PSwapResponse, typebox_1.GroupAcceptP2pSwapArgs, typebox_1.GroupAcceptP2pSwapResponse);
    }
    cancelP2PSwap(threadRootMessageIndex, messageId) {
        return this.executeMsgpackUpdate("cancel_p2p_swap", {
            thread_root_message_index: threadRootMessageIndex,
            message_id: messageId,
        }, chatMappersV2_1.cancelP2PSwapResponse, typebox_1.GroupCancelP2pSwapArgs, typebox_1.GroupCancelP2pSwapResponse);
    }
    joinVideoCall(messageId, newAchievement) {
        return this.executeMsgpackUpdate("join_video_call", {
            message_id: messageId,
            new_achievement: newAchievement,
        }, chatMappersV2_1.joinVideoCallResponse, typebox_1.GroupJoinVideoCallArgs, typebox_1.GroupSetVideoCallPresenceResponse);
    }
    setVideoCallPresence(messageId, presence, newAchievement) {
        return this.executeMsgpackUpdate("set_video_call_presence", {
            message_id: messageId,
            presence: (0, chatMappersV2_1.apiVideoCallPresence)(presence),
            new_achievement: newAchievement,
        }, chatMappersV2_1.setVideoCallPresence, typebox_1.GroupSetVideoCallPresenceArgs, typebox_1.GroupSetVideoCallPresenceResponse);
    }
    videoCallParticipants(messageId, updatesSince) {
        return this.executeMsgpackQuery("video_call_participants", {
            message_id: messageId,
            updated_since: updatesSince,
        }, chatMappersV2_1.videoCallParticipantsResponse, typebox_1.GroupVideoCallParticipantsArgs, typebox_1.GroupVideoCallParticipantsResponse);
    }
    cancelInvites(userIds) {
        return this.executeMsgpackUpdate("cancel_invites", {
            user_ids: userIds.map(mapping_1.principalStringToBytes),
        }, (value) => value === "Success", typebox_1.GroupCancelInvitesArgs, typebox_1.GroupCancelInvitesResponse);
    }
}
exports.GroupClient = GroupClient;
