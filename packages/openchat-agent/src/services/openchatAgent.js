"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenChatAgent = void 0;
const caching_1 = require("../utils/caching");
const network_1 = require("../utils/network");
const userCache_1 = require("../utils/userCache");
const registryCache_1 = require("../utils/registryCache");
const userIndex_client_1 = require("./userIndex/userIndex.client");
const user_client_1 = require("./user/user.client");
const group_client_1 = require("./group/group.client");
const localUserIndex_client_1 = require("./localUserIndex/localUserIndex.client");
const notifications_client_1 = require("./notifications/notifications.client");
const proposalsBot_client_1 = require("./proposalsBot/proposalsBot.client");
const online_client_1 = require("./online/online.client");
const data_client_1 = require("./data/data.client");
const ledger_client_1 = require("./ledger/ledger.client");
const ledgerIndex_client_1 = require("./ledgerIndex/ledgerIndex.client");
const groupIndex_client_1 = require("./groupIndex/groupIndex.client");
const marketMaker_client_1 = require("./marketMaker/marketMaker.client");
const registry_client_1 = require("./registry/registry.client");
const dexes_1 = require("./dexes");
const list_1 = require("../utils/list");
const profiling_1 = require("./common/profiling");
const chat_1 = require("../utils/chat");
const nns_governance_client_1 = require("./nnsGovernance/nns.governance.client");
const sns_governance_client_1 = require("./snsGovernance/sns.governance.client");
const openchat_shared_1 = require("openchat-shared");
const messageContext_1 = require("../utils/messageContext");
const community_client_1 = require("./community/community.client");
const community_1 = require("../utils/community");
const anonUser_client_1 = require("./user/anonUser.client");
const replicaUpToDateChecker_1 = require("./common/replicaUpToDateChecker");
const icpCoinsClient_1 = require("./icpcoins/icpCoinsClient");
const icpLedgerIndex_client_1 = require("./icpLedgerIndex/icpLedgerIndex.client");
const translations_client_1 = require("./translations/translations.client");
const ckbtcMinter_1 = require("./ckbtcMinter/ckbtcMinter");
const signInWithEmail_client_1 = require("./signInWithEmail/signInWithEmail.client");
const signInWithEthereum_client_1 = require("./signInWithEthereum/signInWithEthereum.client");
const signInWithSolana_client_1 = require("./signInWithSolana/signInWithSolana.client");
const httpAgent_1 = require("../utils/httpAgent");
const referralCache_1 = require("../utils/referralCache");
class OpenChatAgent extends EventTarget {
    constructor(identity, config) {
        super();
        this.identity = identity;
        this.config = config;
        this._logger = config.logger;
        this._agent = (0, httpAgent_1.createHttpAgentSync)(identity, config.icUrl);
        this.db = (0, caching_1.initDb)(this.principal);
        this._onlineClient = new online_client_1.OnlineClient(identity, this._agent, config.onlineCanister);
        this._userIndexClient = new userIndex_client_1.UserIndexClient(identity, this._agent, config.userIndexCanister);
        this._groupIndexClient = new groupIndex_client_1.GroupIndexClient(identity, this._agent, config.groupIndexCanister);
        this._notificationClient = new notifications_client_1.NotificationsClient(identity, this._agent, config.notificationsCanister);
        this._proposalsBotClient = new proposalsBot_client_1.ProposalsBotClient(identity, this._agent, config.proposalBotCanister);
        this._marketMakerClient = new marketMaker_client_1.MarketMakerClient(identity, this._agent, config.marketMakerCanister);
        this._registryClient = new registry_client_1.RegistryClient(identity, this._agent, config.registryCanister, config.blobUrlPattern);
        this._dataClient = new data_client_1.DataClient(identity, this._agent, config);
        this._icpcoinsClient = new icpCoinsClient_1.IcpCoinsClient(identity, this._agent);
        this.translationsClient = new translations_client_1.TranslationsClient(identity, this._agent, config.translationsCanister);
        this._signInWithEmailClient = new signInWithEmail_client_1.SignInWithEmailClient(identity, this._agent, config.signInWithEmailCanister);
        this._signInWithEthereumClient = new signInWithEthereum_client_1.SignInWithEthereumClient(identity, this._agent, config.signInWithEthereumCanister);
        this._signInWithSolanaClient = new signInWithSolana_client_1.SignInWithSolanaClient(identity, this._agent, config.signInWithSolanaCanister);
        this._localUserIndexClients = {};
        this._ledgerClients = {};
        this._ledgerIndexClients = {};
        this._groupClients = {};
        this._communityClients = {};
        this._dexesAgent = new dexes_1.DexesAgent(this._agent);
        this._groupInvite = config.groupInvite;
    }
    get principal() {
        return this.identity.getPrincipal();
    }
    getAllCachedUsers() {
        return (0, profiling_1.measure)("getAllUsers", () => (0, userCache_1.getAllUsers)()).then((users) => {
            return new Map(users.map((user) => [user.userId, this.rehydrateUserSummary(user)]));
        });
    }
    logError(message, ...optionalParams) {
        this._logger.error(message, optionalParams);
    }
    set groupInvite(value) {
        this._groupInvite = value;
    }
    set communityInvite(value) {
        this._communityInvite = value;
    }
    createUserClient(userId) {
        if (userId === openchat_shared_1.ANON_USER_ID) {
            this._userClient = anonUser_client_1.AnonUserClient.create();
        }
        else {
            this._userClient = new user_client_1.UserClient(userId, this.identity, this._agent, this.config, this.db);
        }
        return this;
    }
    communityClient(communityId) {
        if (!this._communityClients[communityId]) {
            const inviteCode = this.getProvidedCommunityInviteCode(communityId);
            this._communityClients[communityId] = new community_client_1.CommunityClient(this.identity, this._agent, this.config, communityId, this.db, inviteCode);
        }
        return this._communityClients[communityId];
    }
    getGroupClient(chatId) {
        if (!this._groupClients[chatId]) {
            const inviteCode = this.getProvidedGroupInviteCode({
                kind: "group_chat",
                groupId: chatId,
            });
            this._groupClients[chatId] = new group_client_1.GroupClient(this.identity, this._agent, this.config, { kind: "group_chat", groupId: chatId }, this.db, inviteCode);
        }
        return this._groupClients[chatId];
    }
    get userClient() {
        if (this._userClient) {
            return this._userClient;
        }
        throw new Error("Attempted to use the user client before it has been initialised");
    }
    getLedgerClient(ledger) {
        if (!this._ledgerClients[ledger]) {
            this._ledgerClients[ledger] = new ledger_client_1.LedgerClient(this.identity, this._agent, ledger);
        }
        return this._ledgerClients[ledger];
    }
    getLedgerIndexClient(ledgerIndex) {
        if (!this._ledgerIndexClients[ledgerIndex]) {
            this._ledgerIndexClients[ledgerIndex] = new ledgerIndex_client_1.LedgerIndexClient(this.identity, this._agent, ledgerIndex);
        }
        return this._ledgerIndexClients[ledgerIndex];
    }
    getLocalUserIndexClient(canisterId) {
        if (!this._localUserIndexClients[canisterId]) {
            this._localUserIndexClients[canisterId] = new localUserIndex_client_1.LocalUserIndexClient(this.identity, this._agent, canisterId, this.db);
        }
        return this._localUserIndexClients[canisterId];
    }
    getProvidedGroupInviteCode(chatId) {
        if (this._groupInvite === undefined)
            return undefined;
        return (0, openchat_shared_1.chatIdentifiersEqual)(this._groupInvite.chatId, chatId)
            ? this._groupInvite.code
            : undefined;
    }
    getProvidedCommunityInviteCode(communityId) {
        if (this._communityInvite === undefined)
            return undefined;
        return this._communityInvite.id.communityId === communityId
            ? this._communityInvite.code
            : undefined;
    }
    getCommunityReferral(communityId) {
        return (0, referralCache_1.getCommunityReferral)(communityId, Date.now());
    }
    editMessage(chatId, msg, threadRootMessageIndex, blockLevelMarkdown, newAchievement) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("failure");
        switch (chatId.kind) {
            case "direct_chat":
                return this.editDirectMessage(chatId, msg, threadRootMessageIndex, blockLevelMarkdown);
            case "group_chat":
                return this.editGroupMessage(chatId, msg, threadRootMessageIndex, blockLevelMarkdown, newAchievement);
            case "channel":
                return this.editChannelMessage(chatId, msg, threadRootMessageIndex, blockLevelMarkdown, newAchievement);
        }
    }
    sendMessage(messageContext, user, mentioned, event, acceptedRules, messageFilterFailed, pin, newAchievement) {
        return new openchat_shared_1.Stream(async (resolve, reject) => {
            const onRequestAccepted = () => resolve("accepted", false);
            const { chatId, threadRootMessageIndex } = messageContext;
            if ((0, openchat_shared_1.offline)()) {
                (0, caching_1.recordFailedMessage)(this.db, chatId, event, threadRootMessageIndex);
                return resolve([openchat_shared_1.CommonResponses.offline(), event.event], true);
            }
            if (chatId.kind === "channel") {
                if (event.event.content.kind === "crypto_content" ||
                    event.event.content.kind === "prize_content_initial" ||
                    event.event.content.kind === "p2p_swap_content_initial") {
                    return resolve(await this.userClient.sendMessageWithTransferToChannel(chatId, event.event.content.kind !== "p2p_swap_content_initial"
                        ? event.event.content.transfer.recipient
                        : undefined, user, event, threadRootMessageIndex, acceptedRules?.community, acceptedRules?.chat, messageFilterFailed, pin), true);
                }
                return resolve(await this.sendChannelMessage(chatId, user.username, user.displayName, mentioned, event, threadRootMessageIndex, acceptedRules?.community, acceptedRules?.chat, messageFilterFailed, newAchievement, onRequestAccepted), true);
            }
            if (chatId.kind === "group_chat") {
                if (event.event.content.kind === "crypto_content" ||
                    event.event.content.kind === "prize_content_initial" ||
                    event.event.content.kind === "p2p_swap_content_initial") {
                    return resolve(await this.userClient.sendMessageWithTransferToGroup(chatId, event.event.content.kind !== "p2p_swap_content_initial"
                        ? event.event.content.transfer.recipient
                        : undefined, user, event, threadRootMessageIndex, acceptedRules?.chat, messageFilterFailed, pin), true);
                }
                return resolve(await this.sendGroupMessage(chatId, user.username, user.displayName, mentioned, event, threadRootMessageIndex, acceptedRules?.chat, messageFilterFailed, newAchievement, onRequestAccepted), true);
            }
            if (chatId.kind === "direct_chat") {
                return resolve(await this.sendDirectMessage(chatId, event, messageFilterFailed, threadRootMessageIndex, pin, onRequestAccepted), true);
            }
            reject(new openchat_shared_1.UnsupportedValueError("Unexpect chat type", chatId));
        });
    }
    sendChannelMessage(chatId, senderName, senderDisplayName, mentioned, event, threadRootMessageIndex, communityRulesAccepted, channelRulesAccepted, messageFilterFailed, newAchievement, onRequestAccepted) {
        return this.communityClient(chatId.communityId).sendMessage(chatId, senderName, senderDisplayName, mentioned, event, threadRootMessageIndex, communityRulesAccepted, channelRulesAccepted, messageFilterFailed, newAchievement, onRequestAccepted);
    }
    sendGroupMessage(chatId, senderName, senderDisplayName, mentioned, event, threadRootMessageIndex, rulesAccepted, messageFilterFailed, newAchievement, onRequestAccepted) {
        return this.getGroupClient(chatId.groupId).sendMessage(senderName, senderDisplayName, mentioned, event, threadRootMessageIndex, rulesAccepted, messageFilterFailed, newAchievement, onRequestAccepted);
    }
    editGroupMessage(chatId, message, threadRootMessageIndex, blockLevelMarkdown, newAchievement) {
        return this.getGroupClient(chatId.groupId).editMessage(message, threadRootMessageIndex, blockLevelMarkdown, newAchievement);
    }
    editChannelMessage(chatId, message, threadRootMessageIndex, blockLevelMarkdown, newAchievement) {
        return this.communityClient(chatId.communityId).editMessage(chatId, message, threadRootMessageIndex, blockLevelMarkdown, newAchievement);
    }
    sendDirectMessage(chatId, event, messageFilterFailed, threadRootMessageIndex, pin, onRequestAccepted) {
        return this.userClient.sendMessage(chatId, event, messageFilterFailed, threadRootMessageIndex, pin, onRequestAccepted);
    }
    editDirectMessage(recipientId, message, threadRootMessageIndex, blockLevelMarkdown) {
        return this.userClient.editMessage(recipientId.userId, message, threadRootMessageIndex, blockLevelMarkdown);
    }
    createGroupChat(candidate) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        if (candidate.id.kind === "channel") {
            return this.communityClient(candidate.id.communityId).createChannel(candidate);
        }
        else {
            return this.userClient.createGroup(candidate);
        }
    }
    updateGroup(chatId, name, desc, rules, permissions, avatar, eventsTimeToLive, gateConfig, isPublic, messagesVisibleToNonMembers, externalUrl) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).updateGroup(name, desc, rules, permissions, avatar, eventsTimeToLive, gateConfig, isPublic, messagesVisibleToNonMembers);
            case "channel":
                return this.communityClient(chatId.communityId).updateChannel(chatId, name, desc, rules, permissions, avatar, eventsTimeToLive, gateConfig, isPublic, messagesVisibleToNonMembers, externalUrl);
        }
    }
    async inviteUsers(id, userIds, callerUsername) {
        if (!userIds.length) {
            return Promise.resolve(true);
        }
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(false);
        switch (id.kind) {
            case "community": {
                const localUserIndex = await this.communityClient(id.communityId).localUserIndex();
                const localUserIndexClient = this.getLocalUserIndexClient(localUserIndex);
                return localUserIndexClient.inviteUsersToCommunity(id.communityId, userIds, callerUsername);
            }
            case "group_chat": {
                const localUserIndex = await this.getGroupClient(id.groupId).localUserIndex();
                const localUserIndexClient = this.getLocalUserIndexClient(localUserIndex);
                return localUserIndexClient.inviteUsersToGroup(id.groupId, userIds, callerUsername);
            }
            case "channel": {
                const localUserIndex = await this.communityClient(id.communityId).localUserIndex();
                const localUserIndexClient = this.getLocalUserIndexClient(localUserIndex);
                return localUserIndexClient.inviteUsersToChannel(id.communityId, id.channelId, userIds, callerUsername);
            }
        }
    }
    chatEventsBatch(localUserIndex, requests, cachePrimer) {
        console.debug("CHAT EVENTS: Getting events batch", {
            localUserIndex,
            requests,
        });
        return this.getLocalUserIndexClient(localUserIndex).chatEvents(requests, cachePrimer);
    }
    chatEventsWindow(eventIndexRange, chatId, messageIndex, threadRootMessageIndex, latestKnownUpdate) {
        latestKnownUpdate = (0, replicaUpToDateChecker_1.excludeLatestKnownUpdateIfBeforeFix)(latestKnownUpdate);
        console.debug("CHAT EVENTS: Getting events window", {
            chatId,
            threadRootMessageIndex,
            messageIndex,
        });
        switch (chatId.kind) {
            case "direct_chat":
                return this.directChatEventsWindow(eventIndexRange, chatId, messageIndex, latestKnownUpdate);
            case "group_chat":
                return this.groupChatEventsWindow(eventIndexRange, chatId, messageIndex, threadRootMessageIndex, latestKnownUpdate);
            case "channel":
                return this.channelEventsWindow(eventIndexRange, chatId, messageIndex, threadRootMessageIndex, latestKnownUpdate);
        }
    }
    directChatEventsWindow(eventIndexRange, chatId, messageIndex, latestKnownUpdate) {
        return this.rehydrateEventResponse(chatId, this.userClient.chatEventsWindow(eventIndexRange, chatId, messageIndex, latestKnownUpdate), undefined, latestKnownUpdate);
    }
    chatEvents(chatId, eventIndexRange, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate) {
        latestKnownUpdate = (0, replicaUpToDateChecker_1.excludeLatestKnownUpdateIfBeforeFix)(latestKnownUpdate);
        console.debug("CHAT EVENTS: Getting chat events", {
            chatId,
            threadRootMessageIndex,
            startIndex,
            ascending,
        });
        if (chatId.kind === "group_chat") {
            return this.groupChatEvents(eventIndexRange, chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate);
        }
        else if (chatId.kind === "direct_chat") {
            return this.directChatEvents(eventIndexRange, chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate);
        }
        else if (chatId.kind === "channel") {
            return this.channelEvents(eventIndexRange, chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate);
        }
        throw new openchat_shared_1.UnsupportedValueError("Unexpect chat type", chatId);
    }
    directChatEvents(eventIndexRange, chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate) {
        return this.rehydrateEventResponse(chatId, this.userClient.chatEvents(eventIndexRange, chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate), threadRootMessageIndex, latestKnownUpdate);
    }
    directChatEventsByEventIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate) {
        return this.rehydrateEventResponse(chatId, this.userClient.chatEventsByIndex(eventIndexes, chatId, threadRootMessageIndex, latestKnownUpdate), threadRootMessageIndex, latestKnownUpdate);
    }
    channelEventsWindow(eventIndexRange, chatId, messageIndex, threadRootMessageIndex, latestKnownUpdate) {
        return this.rehydrateEventResponse(chatId, this.communityClient(chatId.communityId).eventsWindow(chatId, eventIndexRange, messageIndex, threadRootMessageIndex, latestKnownUpdate), threadRootMessageIndex, latestKnownUpdate);
    }
    groupChatEventsWindow(eventIndexRange, chatId, messageIndex, threadRootMessageIndex, latestKnownUpdate) {
        const rawEvents = this.getGroupClient(chatId.groupId).chatEventsWindow(eventIndexRange, messageIndex, threadRootMessageIndex, latestKnownUpdate);
        return this.rehydrateEventResponse(chatId, rawEvents, threadRootMessageIndex, latestKnownUpdate);
    }
    channelEvents(eventIndexRange, chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate) {
        return this.rehydrateEventResponse(chatId, this.communityClient(chatId.communityId).events(chatId, eventIndexRange, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate), threadRootMessageIndex, latestKnownUpdate);
    }
    groupChatEvents(eventIndexRange, chatId, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate) {
        return this.rehydrateEventResponse(chatId, this.getGroupClient(chatId.groupId).chatEvents(eventIndexRange, startIndex, ascending, threadRootMessageIndex, latestKnownUpdate), threadRootMessageIndex, latestKnownUpdate);
    }
    chatEventsByEventIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate) {
        latestKnownUpdate = (0, replicaUpToDateChecker_1.excludeLatestKnownUpdateIfBeforeFix)(latestKnownUpdate);
        console.debug("CHAT EVENTS: Getting chat events by index", {
            chatId,
            threadRootMessageIndex,
            eventIndexes,
        });
        switch (chatId.kind) {
            case "group_chat":
                return this.groupChatEventsByEventIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate);
            case "direct_chat":
                return this.directChatEventsByEventIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate);
            case "channel":
                return this.channelEventsByEventIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate);
        }
    }
    channelEventsByEventIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate) {
        return this.rehydrateEventResponse(chatId, this.communityClient(chatId.communityId).eventsByIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate), threadRootMessageIndex, latestKnownUpdate);
    }
    groupChatEventsByEventIndex(chatId, eventIndexes, threadRootMessageIndex, latestKnownUpdate) {
        return this.rehydrateEventResponse(chatId, this.getGroupClient(chatId.groupId).chatEventsByIndex(eventIndexes, threadRootMessageIndex, latestKnownUpdate), threadRootMessageIndex, latestKnownUpdate);
    }
    async getDeletedGroupMessage(chatId, messageId, threadRootMessageIndex) {
        switch (chatId.kind) {
            case "group_chat":
                const groupResp = await this.getGroupClient(chatId.groupId).getDeletedMessage(messageId, threadRootMessageIndex);
                if (groupResp.kind === "success") {
                    groupResp.content = this.rehydrateMessageContent(groupResp.content);
                }
                return groupResp;
            case "channel":
                const channelResp = await this.communityClient(chatId.communityId).getDeletedMessage(chatId, messageId, threadRootMessageIndex);
                if (channelResp.kind === "success") {
                    channelResp.content = this.rehydrateMessageContent(channelResp.content);
                }
                return channelResp;
        }
    }
    async getDeletedDirectMessage(userId, messageId) {
        const response = await this.userClient.getDeletedMessage(userId, messageId);
        if (response.kind === "success") {
            response.content = this.rehydrateMessageContent(response.content);
        }
        return response;
    }
    rehydrateMessageContent(content) {
        if ((content.kind === "file_content" ||
            content.kind === "image_content" ||
            content.kind === "audio_content") &&
            content.blobReference !== undefined) {
            content = this.rehydrateDataContent(content);
        }
        if (content.kind === "video_content") {
            return {
                ...content,
                videoData: this.rehydrateDataContent(content.videoData),
                imageData: this.rehydrateDataContent(content.imageData),
            };
        }
        return content;
    }
    findMissingEventIndexesByChat(defaultChatId, events, threadRootMessageIndex) {
        return events.reduce((result, ev) => {
            if (ev.event.kind === "message" &&
                ev.event.repliesTo &&
                ev.event.repliesTo.kind === "raw_reply_context") {
                result.insert(ev.event.repliesTo.sourceContext ?? {
                    chatId: { ...defaultChatId },
                    threadRootMessageIndex,
                }, ev.event.repliesTo.eventIndex);
            }
            return result;
        }, new messageContext_1.AsyncMessageContextMap());
    }
    messagesFromEventsResponse(context, resp) {
        if (resp !== "events_failed") {
            return [
                context,
                resp.events.reduce((msgs, ev) => {
                    if (ev.event.kind === "message") {
                        msgs.push(ev);
                    }
                    return msgs;
                }, []),
            ];
        }
        else {
            return [context, []];
        }
    }
    async resolveMissingIndexes(currentChatId, events, threadRootMessageIndex, latestKnownUpdate) {
        const contextMap = this.findMissingEventIndexesByChat(currentChatId, events, threadRootMessageIndex);
        if (contextMap.length === 0)
            return Promise.resolve(new messageContext_1.AsyncMessageContextMap());
        const mapped = await contextMap.asyncMap((ctx, idxs) => {
            const chatId = ctx.chatId;
            const chatKind = chatId.kind;
            const latestUpdate = (0, openchat_shared_1.chatIdentifiersEqual)(chatId, currentChatId)
                ? latestKnownUpdate
                : undefined;
            if (chatKind === "direct_chat") {
                return this.userClient
                    .chatEventsByIndex(idxs, chatId, ctx.threadRootMessageIndex, latestUpdate)
                    .then((resp) => this.messagesFromEventsResponse(ctx, resp));
            }
            else if (chatKind === "group_chat") {
                const client = this.getGroupClient(chatId.groupId);
                return client
                    .chatEventsByIndex(idxs, ctx.threadRootMessageIndex, latestUpdate)
                    .then((resp) => this.messagesFromEventsResponse(ctx, resp));
            }
            else if (chatKind === "channel") {
                const client = this.communityClient(chatId.communityId);
                return client
                    .eventsByIndex(chatId, idxs, ctx.threadRootMessageIndex, latestUpdate)
                    .then((resp) => this.messagesFromEventsResponse(ctx, resp));
            }
            else {
                throw new openchat_shared_1.UnsupportedValueError("unknown chatid kind supplied", chatId);
            }
        });
        return mapped;
    }
    rehydrateEvent(ev, defaultChatId, missingReplies, threadRootMessageIndex) {
        if (ev.event.kind === "message") {
            const originalContent = ev.event.content;
            const rehydratedContent = this.rehydrateMessageContent(originalContent);
            const originalReplyContext = ev.event.repliesTo;
            let rehydratedReplyContext = undefined;
            if (ev.event.repliesTo && ev.event.repliesTo.kind === "raw_reply_context") {
                const messageContext = ev.event.repliesTo.sourceContext ?? {
                    chatId: { ...defaultChatId },
                    threadRootMessageIndex,
                };
                const messageEvents = missingReplies.lookup(messageContext);
                const idx = ev.event.repliesTo.eventIndex;
                const msg = messageEvents.find((me) => me.index === idx)?.event;
                if (msg) {
                    rehydratedReplyContext = {
                        kind: "rehydrated_reply_context",
                        content: structuredClone(this.rehydrateMessageContent(msg.content)),
                        senderId: msg.sender,
                        messageId: msg.messageId,
                        messageIndex: msg.messageIndex,
                        eventIndex: idx,
                        edited: msg.edited,
                        isThreadRoot: msg.thread !== undefined,
                        sourceContext: messageContext,
                    };
                }
                else {
                    this._logger.log("Reply context not found, this should only happen if we failed to load the reply context message", {
                        chatId: { ...defaultChatId },
                        messageContext,
                        messageEvents,
                        repliesTo: ev.event.repliesTo,
                    });
                }
            }
            if (originalContent !== rehydratedContent || rehydratedReplyContext !== undefined) {
                return {
                    ...ev,
                    event: {
                        ...ev.event,
                        content: rehydratedContent,
                        repliesTo: rehydratedReplyContext ?? originalReplyContext,
                    },
                };
            }
        }
        return ev;
    }
    async rehydrateEventResponse(currentChatId, eventsPromise, threadRootMessageIndex, latestKnownUpdate) {
        const resp = await eventsPromise;
        if (resp === "events_failed") {
            return resp;
        }
        const missing = await this.resolveMissingIndexes(currentChatId, resp.events, threadRootMessageIndex, latestKnownUpdate);
        resp.events = resp.events.map((e) => this.rehydrateEvent(e, currentChatId, missing, threadRootMessageIndex));
        return resp;
    }
    rehydrateUserSummary(userSummary) {
        const ref = userSummary.blobReference;
        return {
            ...userSummary,
            blobData: undefined,
            blobUrl: (0, chat_1.buildUserAvatarUrl)(this.config.blobUrlPattern, userSummary.userId, ref?.blobId ?? undefined),
        };
    }
    rehydrateDataContent(dataContent, blobType = "blobs", channelId) {
        const ref = dataContent.blobReference;
        return ref !== undefined
            ? {
                ...dataContent,
                blobData: undefined,
                blobUrl: (0, chat_1.buildBlobUrl)(this.config.blobUrlPattern, ref.canisterId, ref.blobId, blobType, channelId),
            }
            : dataContent;
    }
    async rehydrateMessage(chatId, message, threadRootMessageIndex, latestKnownUpdate) {
        latestKnownUpdate = (0, replicaUpToDateChecker_1.excludeLatestKnownUpdateIfBeforeFix)(latestKnownUpdate);
        const missing = await this.resolveMissingIndexes(chatId, [message], threadRootMessageIndex, latestKnownUpdate);
        return this.rehydrateEvent(message, chatId, missing, threadRootMessageIndex);
    }
    searchUsers(searchTerm, maxResults = 20) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve([]);
        return this._userIndexClient
            .searchUsers(searchTerm, maxResults)
            .then((users) => users.map((u) => this.rehydrateUserSummary(u)));
    }
    exploreChannels(id, searchTerm, pageIndex, pageSize = 10) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this.communityClient(id.communityId)
            .exploreChannels(searchTerm, pageIndex, pageSize)
            .then((res) => {
            if (res.kind === "success") {
                return {
                    ...res,
                    matches: res.matches.map((match) => ({
                        ...match,
                        avatar: this.rehydrateDataContent(match.avatar, "avatar", match.id),
                    })),
                };
            }
            return res;
        });
    }
    exploreCommunities(searchTerm, pageIndex, pageSize = 10, flags, languages) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this._groupIndexClient
            .exploreCommunities(searchTerm, pageIndex, pageSize, flags, languages)
            .then((res) => {
            if (res.kind === "success") {
                return {
                    ...res,
                    matches: res.matches.map((match) => ({
                        ...match,
                        avatar: this.rehydrateDataContent(match.avatar, "avatar"),
                        banner: this.rehydrateDataContent(match.banner, "banner"),
                    })),
                };
            }
            return res;
        });
    }
    searchGroups(searchTerm, maxResults = 10) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this._groupIndexClient.searchGroups(searchTerm, maxResults).then((res) => {
            if (res.kind === "success") {
                return {
                    ...res,
                    matches: res.matches.map((match) => this.rehydrateDataContent(match, "avatar")),
                };
            }
            return res;
        });
    }
    searchGroupChat(chatId, searchTerm, userIds, maxResults = 10) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).searchGroupChat(searchTerm, userIds, maxResults);
            case "channel":
                return this.communityClient(chatId.communityId).searchChannel(chatId, maxResults, userIds, searchTerm);
        }
    }
    searchDirectChat(chatId, searchTerm, maxResults = 10) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this.userClient.searchDirectChat(chatId, searchTerm, maxResults);
    }
    async getUser(chitState, userId, allowStale = false) {
        const response = await this.getUsers(chitState, {
            userGroups: [
                {
                    users: [userId],
                    updatedSince: BigInt(0),
                },
            ],
        }, allowStale);
        if (response.users.length == 0) {
            return undefined;
        }
        return response.users[0];
    }
    getUsers(chitState, users, allowStale = false) {
        return this._userIndexClient.getUsers(chitState, users, allowStale).then((resp) => ({
            ...resp,
            users: resp.users.map((u) => this.rehydrateUserSummary(u)),
        }));
    }
    getUpdatedPinnedChannels(currentPinnedChannels, userResponse) {
        const byCommunity = currentPinnedChannels.reduce((map, channel) => {
            const channels = map.get(channel.communityId) ?? [];
            channels.push(channel);
            map.set(channel.communityId, channels);
            return map;
        }, new Map());
        userResponse.communities.added
            .flatMap((c) => c.pinned)
            .forEach((channel) => {
            byCommunity.get(channel.communityId)?.push(channel);
        });
        userResponse.communities.updated.forEach((c) => {
            if (c.pinned !== undefined) {
                if (c.pinned.length === 0) {
                    byCommunity.delete(c.id.communityId);
                }
                else {
                    byCommunity.set(c.id.communityId, c.pinned);
                }
            }
        });
        return [...byCommunity.values()].flat();
    }
    async _getUpdates(current) {
        const start = Date.now();
        let numberOfAsyncCalls = 0;
        let directChats;
        let directChatUpdates = [];
        let currentGroups = [];
        let groupsAdded = [];
        let userCanisterGroupUpdates = [];
        const groupsToCheckForUpdates = new Set();
        const groupsRemoved = new Set();
        let currentCommunities = [];
        let communitiesAdded = [];
        let userCanisterCommunityUpdates = [];
        const communitiesToCheckForUpdates = new Set();
        const communitiesRemoved = new Set();
        let avatarId;
        let blockedUsers;
        let pinnedGroupChats;
        let pinnedDirectChats;
        let pinnedFavouriteChats;
        let pinnedChannels;
        let favouriteChats;
        let suspensionChanged = undefined;
        let pinNumberSettings;
        let userCanisterLocalUserIndex;
        let achievements;
        let newAchievements;
        let achievementsLastSeen;
        let chitState;
        let referrals;
        let walletConfig;
        let messageActivitySummary;
        let latestActiveGroupsCheck = BigInt(0);
        let latestUserCanisterUpdates;
        let anyUpdates = false;
        if (current === undefined) {
            const userResponse = await this.userClient.getInitialState();
            numberOfAsyncCalls++;
            directChats = userResponse.directChats.summaries;
            groupsAdded = userResponse.groupChats.summaries;
            communitiesAdded = userResponse.communities.summaries;
            avatarId = userResponse.avatarId;
            blockedUsers = userResponse.blockedUsers;
            pinnedGroupChats = userResponse.groupChats.pinned;
            pinnedDirectChats = userResponse.directChats.pinned;
            pinnedFavouriteChats = userResponse.favouriteChats.pinned;
            pinnedChannels = userResponse.communities.summaries.flatMap((c) => c.pinned);
            favouriteChats = userResponse.favouriteChats.chats;
            latestUserCanisterUpdates = userResponse.timestamp;
            pinNumberSettings = userResponse.pinNumberSettings;
            userCanisterLocalUserIndex = userResponse.localUserIndex;
            newAchievements = userResponse.achievements ?? [];
            achievements = new Set(newAchievements.reduce((all, a) => {
                if (a.reason.kind === "achievement_unlocked") {
                    all.push(a.reason.type);
                }
                if (a.reason.kind === "external_achievement_unlocked") {
                    all.push(a.reason.name);
                }
                return all;
            }, []));
            achievementsLastSeen = userResponse.achievementsLastSeen;
            chitState = {
                streakEnds: userResponse.streakEnds,
                streak: userResponse.streak,
                chitBalance: userResponse.chitBalance,
                nextDailyChitClaim: userResponse.nextDailyClaim,
                totalChitEarned: userResponse.totalChitEarned,
            };
            referrals = userResponse.referrals;
            walletConfig = userResponse.walletConfig;
            messageActivitySummary = userResponse.messageActivitySummary;
            anyUpdates = true;
        }
        else {
            directChats = current.directChats;
            currentGroups = current.groupChats;
            currentCommunities = current.communities;
            latestActiveGroupsCheck = current.latestActiveGroupsCheck;
            const userResponse = await this.userClient.getUpdates(current.latestUserCanisterUpdates);
            numberOfAsyncCalls++;
            avatarId = current.avatarId;
            blockedUsers = current.blockedUsers;
            pinnedGroupChats = current.pinnedGroupChats;
            pinnedDirectChats = current.pinnedDirectChats;
            pinnedFavouriteChats = current.pinnedFavouriteChats;
            pinnedChannels = current.pinnedChannels;
            favouriteChats = current.favouriteChats;
            latestUserCanisterUpdates = current.latestUserCanisterUpdates;
            pinNumberSettings = current.pinNumberSettings;
            userCanisterLocalUserIndex = current.userCanisterLocalUserIndex;
            achievementsLastSeen = current.achievementsLastSeen;
            achievements = current.achievements;
            newAchievements = [];
            chitState = current.chitState;
            referrals = current.referrals;
            walletConfig = current.walletConfig;
            messageActivitySummary = current.messageActivitySummary;
            if (userResponse.kind === "success") {
                directChats = userResponse.directChats.added.concat((0, chat_1.mergeDirectChatUpdates)(directChats, userResponse.directChats.updated));
                directChatUpdates = userResponse.directChats.updated;
                groupsAdded = userResponse.groupChats.added;
                userCanisterGroupUpdates = userResponse.groupChats.updated;
                userCanisterGroupUpdates.forEach((g) => groupsToCheckForUpdates.add(g.id.groupId));
                userResponse.groupChats.removed.forEach((g) => groupsRemoved.add(g));
                communitiesAdded = userResponse.communities.added;
                userCanisterCommunityUpdates = userResponse.communities.updated;
                userCanisterCommunityUpdates.forEach((c) => communitiesToCheckForUpdates.add(c.id.communityId));
                userResponse.communities.removed.forEach((c) => communitiesRemoved.add(c));
                avatarId = (0, openchat_shared_1.applyOptionUpdate)(avatarId, userResponse.avatarId);
                blockedUsers = userResponse.blockedUsers ?? blockedUsers;
                pinnedGroupChats = userResponse.groupChats.pinned ?? pinnedGroupChats;
                pinnedDirectChats = userResponse.directChats.pinned ?? pinnedDirectChats;
                pinnedFavouriteChats = userResponse.favouriteChats.pinned ?? pinnedFavouriteChats;
                pinnedChannels = this.getUpdatedPinnedChannels(pinnedChannels, userResponse);
                favouriteChats = userResponse.favouriteChats.chats ?? favouriteChats;
                suspensionChanged = userResponse.suspended;
                latestUserCanisterUpdates = userResponse.timestamp;
                pinNumberSettings = (0, openchat_shared_1.applyOptionUpdate)(pinNumberSettings, userResponse.pinNumberSettings);
                achievementsLastSeen = userResponse.achievementsLastSeen ?? achievementsLastSeen;
                newAchievements = userResponse.achievements ?? [];
                newAchievements.forEach((a) => {
                    if (a.reason.kind === "achievement_unlocked") {
                        achievements.add(a.reason.type);
                    }
                    if (a.reason.kind === "external_achievement_unlocked") {
                        achievements.add(a.reason.name);
                    }
                });
                chitState = {
                    streakEnds: userResponse.streakEnds,
                    streak: userResponse.streak,
                    chitBalance: userResponse.chitBalance,
                    nextDailyChitClaim: userResponse.nextDailyClaim,
                    totalChitEarned: userResponse.totalChitEarned,
                };
                referrals = referrals
                    .filter((prev) => !userResponse.referrals.find((latest) => latest.userId === prev.userId))
                    .concat(userResponse.referrals);
                walletConfig = userResponse.walletConfig ?? current.walletConfig;
                messageActivitySummary =
                    userResponse.messageActivitySummary ?? current.messageActivitySummary;
                anyUpdates = true;
            }
        }
        const currentGroupChatIds = currentGroups.map((g) => g.id);
        const currentCommunityIds = currentCommunities.map((c) => c.id);
        if (currentGroupChatIds.length > 0 || currentCommunityIds.length > 0) {
            const groupIndexResponse = await this._groupIndexClient.activeGroups(currentCommunityIds, currentGroupChatIds, latestActiveGroupsCheck);
            numberOfAsyncCalls++;
            groupIndexResponse.activeGroups.forEach((g) => groupsToCheckForUpdates.add(g));
            groupIndexResponse.deletedGroups.forEach((g) => groupsRemoved.add(g.id));
            groupIndexResponse.activeCommunities.forEach((c) => communitiesToCheckForUpdates.add(c));
            groupIndexResponse.deletedCommunities.forEach((c) => groupsRemoved.add(c.id));
            latestActiveGroupsCheck = groupIndexResponse.timestamp;
            const recentlyJoinedCutOff = BigInt(start - 10 * 60 * 1000);
            for (const group of currentGroups) {
                if (group.membership.joined > recentlyJoinedCutOff) {
                    groupsToCheckForUpdates.add(group.id.groupId);
                }
            }
            for (const community of currentCommunities) {
                if (community.membership.joined > recentlyJoinedCutOff) {
                    groupsToCheckForUpdates.add(community.id.communityId);
                }
            }
        }
        const byLocalUserIndex = new Map();
        for (const group of groupsAdded) {
            (0, openchat_shared_1.getOrAdd)(byLocalUserIndex, group.localUserIndex, []).push({
                canisterId: group.id.groupId,
                isCommunity: false,
                inviteCode: undefined,
                updatesSince: undefined,
            });
        }
        for (const community of communitiesAdded) {
            (0, openchat_shared_1.getOrAdd)(byLocalUserIndex, community.localUserIndex, []).push({
                canisterId: community.id.communityId,
                isCommunity: true,
                inviteCode: undefined,
                updatesSince: undefined,
            });
        }
        for (const group of currentGroups) {
            if (groupsToCheckForUpdates.has(group.id.groupId)) {
                (0, openchat_shared_1.getOrAdd)(byLocalUserIndex, group.localUserIndex, []).push({
                    canisterId: group.id.groupId,
                    isCommunity: false,
                    inviteCode: undefined,
                    updatesSince: group.lastUpdated,
                });
            }
        }
        for (const community of currentCommunities) {
            if (communitiesToCheckForUpdates.has(community.id.communityId)) {
                (0, openchat_shared_1.getOrAdd)(byLocalUserIndex, community.localUserIndex, []).push({
                    canisterId: community.id.communityId,
                    isCommunity: true,
                    inviteCode: undefined,
                    updatesSince: community.lastUpdated,
                });
            }
        }
        const summaryUpdatesPromises = [];
        for (const [localUserIndex, args] of byLocalUserIndex) {
            for (const batch of (0, list_1.chunk)(args, 50)) {
                summaryUpdatesPromises.push(this.getLocalUserIndexClient(localUserIndex).groupAndCommunitySummaryUpdates(batch));
                numberOfAsyncCalls++;
            }
        }
        const summaryUpdatesResults = await (0, openchat_shared_1.waitAll)(summaryUpdatesPromises);
        for (const error of summaryUpdatesResults.errors) {
            this._logger.error("Summary updates error", error);
        }
        const groupCanisterGroupSummaries = [];
        const communityCanisterCommunitySummaries = [];
        const groupUpdates = [];
        const communityUpdates = [];
        let anyErrors = summaryUpdatesResults.errors.length > 0;
        for (const response of summaryUpdatesResults.success) {
            for (const result of response) {
                switch (result.kind) {
                    case "group": {
                        groupCanisterGroupSummaries.push(result.value);
                        break;
                    }
                    case "group_updates": {
                        groupUpdates.push(result.value);
                        break;
                    }
                    case "community": {
                        communityCanisterCommunitySummaries.push(result.value);
                        break;
                    }
                    case "community_updates": {
                        communityUpdates.push(result.value);
                        break;
                    }
                    case "error": {
                        if (!result.error.includes("DestinationInvalid")) {
                            anyErrors = true;
                        }
                        break;
                    }
                }
            }
        }
        if (groupUpdates.length > 0 || communityUpdates.length > 0) {
            anyUpdates = true;
        }
        const groupChats = (0, chat_1.mergeGroupChats)(groupsAdded, groupCanisterGroupSummaries)
            .concat((0, chat_1.mergeGroupChatUpdates)(currentGroups, userCanisterGroupUpdates, groupUpdates))
            .filter((g) => !groupsRemoved.has(g.id.groupId));
        const communities = (0, community_1.mergeCommunities)(communitiesAdded, communityCanisterCommunitySummaries)
            .concat((0, community_1.mergeCommunityUpdates)(currentCommunities, userCanisterCommunityUpdates, communityUpdates))
            .filter((c) => !communitiesRemoved.has(c.id.communityId));
        this.removeExpiredLatestMessages(directChats, start);
        this.removeExpiredLatestMessages(groupChats, start);
        communities.forEach((c) => this.removeExpiredLatestMessages(c.channels, start));
        const state = {
            latestUserCanisterUpdates,
            latestActiveGroupsCheck,
            directChats,
            groupChats,
            communities,
            avatarId,
            blockedUsers,
            pinnedGroupChats,
            pinnedDirectChats,
            pinnedFavouriteChats,
            pinnedChannels,
            favouriteChats,
            pinNumberSettings,
            userCanisterLocalUserIndex,
            achievementsLastSeen,
            achievements,
            chitState,
            referrals,
            walletConfig,
            messageActivitySummary,
        };
        const updatedEvents = (0, chat_1.getUpdatedEvents)(directChatUpdates, groupUpdates, communityUpdates);
        if (!anyErrors && this.userClient.userId !== openchat_shared_1.ANON_USER_ID) {
            (0, caching_1.setCachedChats)(this.db, this.principal, state, updatedEvents);
        }
        const end = Date.now();
        const duration = end - start;
        console.debug(`GetUpdates completed in ${duration}ms. Number of async calls: ${numberOfAsyncCalls}`);
        return {
            state: this.hydrateChatState(state),
            updatedEvents: updatedEvents.toMap(),
            anyUpdates,
            suspensionChanged,
            newAchievements,
        };
    }
    getUpdates(initialLoad) {
        return new openchat_shared_1.Stream(async (resolve, reject) => {
            const cachedState = await (0, caching_1.getCachedChats)(this.db, this.principal);
            const isOffline = (0, openchat_shared_1.offline)();
            if (cachedState && initialLoad) {
                resolve({
                    state: this.hydrateChatState(cachedState),
                    updatedEvents: new Map(),
                    anyUpdates: false,
                    suspensionChanged: undefined,
                    newAchievements: [],
                }, isOffline);
            }
            if (!isOffline) {
                try {
                    const updates = await this._getUpdates(cachedState);
                    resolve(updates, true);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }
    removeExpiredLatestMessages(chats, now) {
        for (const chat of chats) {
            if (chat.latestMessage?.event.messageIndex !== chat.latestMessageIndex ||
                (chat.latestMessage?.expiresAt !== undefined && chat.latestMessage.expiresAt < now)) {
                chat.latestMessage = undefined;
            }
        }
    }
    async getCommunitySummary(communityId) {
        const resp = await this.communityClient(communityId).summary();
        if ((0, community_1.isSuccessfulCommunitySummaryResponse)(resp)) {
            return this.hydrateCommunity(resp);
        }
        return resp;
    }
    hydrateChatState(state) {
        const groupChats = state.groupChats.map((c) => this.hydrateChatSummary(c));
        const communities = state.communities.map((c) => this.hydrateCommunity(c));
        return {
            ...state,
            groupChats,
            communities,
        };
    }
    hydrateCommunity(community) {
        const channels = community.channels.map((c) => this.hydrateChatSummary(c));
        return {
            ...community,
            channels,
            avatar: {
                ...this.rehydrateDataContent(community.avatar, "avatar"),
            },
            banner: {
                ...this.rehydrateDataContent(community.banner, "banner"),
            },
        };
    }
    hydrateChatSummary(chat) {
        switch (chat.kind) {
            case "direct_chat":
                return chat;
            case "group_chat":
                return this.rehydrateDataContent(chat, "avatar");
            case "channel":
                return this.rehydrateDataContent(chat, "avatar", chat.id);
        }
    }
    getCurrentUser() {
        return this._userIndexClient.getCurrentUser();
    }
    setModerationFlags(flags) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(false);
        return this._userIndexClient.setModerationFlags(flags);
    }
    checkUsername(username) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._userIndexClient.checkUsername(username);
    }
    setUsername(userId, username) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._userIndexClient.setUsername(userId, username);
    }
    setDisplayName(userId, displayName) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._userIndexClient.setDisplayName(userId, displayName);
    }
    changeRole(chatId, userId, newRole) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).changeRole(userId, newRole);
            case "channel":
                return this.communityClient(chatId.communityId).changeChannelRole(chatId, userId, newRole);
        }
    }
    deleteGroup(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (chatId.kind) {
            case "group_chat":
                return this.userClient.deleteGroup(chatId.groupId);
            case "channel":
                return this.communityClient(chatId.communityId).deleteChannel(chatId);
        }
    }
    removeMember(chatId, userId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).removeMember(userId);
            case "channel":
                return this.communityClient(chatId.communityId).removeMemberFromChannel(chatId, userId);
        }
    }
    blockUserFromDirectChat(userId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.blockUser(userId);
    }
    blockUserFromGroupChat(chatId, userId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        if (chatId.kind === "channel")
            throw new Error("TODO - blockUserFromChannel not implemented");
        return this.getGroupClient(chatId.groupId).blockUser(userId);
    }
    unblockUserFromGroupChat(chatId, userId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        if (chatId.kind === "channel")
            throw new Error("TODO - unblockUserFromChannel not implemented");
        return this.getGroupClient(chatId.groupId).unblockUser(userId);
    }
    unblockUserFromDirectChat(userId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.unblockUser(userId);
    }
    leaveGroup(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        if ((0, openchat_shared_1.chatIdentifiersEqual)(this._groupInvite?.chatId, chatId)) {
            this._groupInvite = undefined;
        }
        switch (chatId.kind) {
            case "group_chat":
                return this.userClient.leaveGroup(chatId.groupId);
            case "channel":
                return this.communityClient(chatId.communityId).leaveChannel(chatId);
        }
    }
    async joinGroup(chatId, credentialArgs) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (chatId.kind) {
            case "group_chat": {
                const localUserIndex = await this.getGroupClient(chatId.groupId).localUserIndex();
                const localUserIndexClient = this.getLocalUserIndexClient(localUserIndex);
                const groupInviteCode = this.getProvidedGroupInviteCode(chatId);
                return localUserIndexClient
                    .joinGroup(chatId.groupId, groupInviteCode, credentialArgs)
                    .then((resp) => {
                    if (resp.kind === "success") {
                        return {
                            kind: "success",
                            group: this.hydrateChatSummary(resp.group),
                        };
                    }
                    return resp;
                });
            }
            case "channel": {
                const localUserIndex = await this.communityClient(chatId.communityId).localUserIndex();
                const localUserIndexClient = this.getLocalUserIndexClient(localUserIndex);
                const communityInviteCode = this.getProvidedCommunityInviteCode(chatId.communityId);
                const referredBy = await this.getCommunityReferral(chatId.communityId);
                return localUserIndexClient
                    .joinChannel(chatId, communityInviteCode, credentialArgs, referredBy)
                    .then((resp) => {
                    if (resp.kind === "success" || resp.kind === "success_joined_community") {
                        (0, referralCache_1.deleteCommunityReferral)(chatId.communityId);
                    }
                    if (resp.kind === "success") {
                        return {
                            kind: "success",
                            group: this.hydrateChatSummary(resp.group),
                        };
                    }
                    if (resp.kind === "success_joined_community") {
                        return {
                            kind: "success_joined_community",
                            community: this.hydrateCommunity(resp.community),
                        };
                    }
                    return resp;
                });
            }
        }
    }
    async joinCommunity(id, credentialArgs) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        const inviteCode = this.getProvidedCommunityInviteCode(id.communityId);
        const localUserIndex = await this.communityClient(id.communityId).localUserIndex();
        const referredBy = await this.getCommunityReferral(id.communityId);
        return this.getLocalUserIndexClient(localUserIndex)
            .joinCommunity(id.communityId, inviteCode, credentialArgs, referredBy)
            .then((resp) => {
            if (resp.kind === "success") {
                (0, referralCache_1.deleteCommunityReferral)(id.communityId);
            }
            return resp;
        });
    }
    markMessagesRead(request) {
        return this.userClient.markMessagesRead(request);
    }
    setUserAvatar(data) {
        return this.userClient.setAvatar(data);
    }
    addReaction(chatId, messageId, reaction, username, displayName, threadRootMessageIndex, newAchievement) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).addReaction(messageId, reaction, username, displayName, threadRootMessageIndex, newAchievement);
            case "direct_chat":
                return this.userClient.addReaction(chatId.userId, messageId, reaction, threadRootMessageIndex);
            case "channel":
                return this.communityClient(chatId.communityId).addReaction(chatId, username, displayName, messageId, reaction, threadRootMessageIndex, newAchievement);
        }
    }
    removeReaction(chatId, messageId, reaction, threadRootMessageIndex) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).removeReaction(messageId, reaction, threadRootMessageIndex);
            case "direct_chat":
                return this.userClient.removeReaction(chatId.userId, messageId, reaction, threadRootMessageIndex);
            case "channel":
                return this.communityClient(chatId.communityId).removeReaction(chatId, messageId, reaction, threadRootMessageIndex);
        }
    }
    deleteMessage(chatId, messageId, threadRootMessageIndex, asPlatformModerator, newAchievement) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (chatId.kind) {
            case "group_chat":
                return this.deleteGroupMessage(chatId.groupId, messageId, threadRootMessageIndex, asPlatformModerator, newAchievement);
            case "direct_chat":
                return this.deleteDirectMessage(chatId.userId, messageId, threadRootMessageIndex);
            case "channel":
                return this.deleteChannelMessage(chatId, messageId, threadRootMessageIndex, asPlatformModerator, newAchievement);
        }
    }
    deleteChannelMessage(chatId, messageId, threadRootMessageIndex, asPlatformModerator, newAchievement) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.communityClient(chatId.communityId).deleteMessages(chatId, [messageId], threadRootMessageIndex, asPlatformModerator, newAchievement);
    }
    deleteGroupMessage(chatId, messageId, threadRootMessageIndex, asPlatformModerator, newAchievement) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.getGroupClient(chatId).deleteMessage(messageId, threadRootMessageIndex, asPlatformModerator, newAchievement);
    }
    deleteDirectMessage(otherUserId, messageId, threadRootMessageIndex) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.deleteMessage(otherUserId, messageId, threadRootMessageIndex);
    }
    undeleteMessage(chatId, messageId, threadRootMessageIndex) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).undeleteMessage(messageId, threadRootMessageIndex);
            case "direct_chat":
                return this.userClient.undeleteMessage(chatId.userId, messageId, threadRootMessageIndex);
            case "channel":
                return this.communityClient(chatId.communityId).undeleteMessage(chatId, messageId, threadRootMessageIndex);
        }
    }
    lastOnline(userIds) {
        return this._onlineClient.lastOnline(userIds);
    }
    markAsOnline() {
        return this._onlineClient.markAsOnline();
    }
    subscriptionExists(p256dh_key) {
        return this._notificationClient.subscriptionExists(p256dh_key);
    }
    pushSubscription(subscription) {
        return this._notificationClient.pushSubscription(subscription);
    }
    removeSubscription(subscription) {
        return this._notificationClient.removeSubscription(subscription);
    }
    toggleMuteNotifications(id, muted) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (id.kind) {
            case "group_chat":
                return this.getGroupClient(id.groupId).toggleMuteNotifications(muted);
            case "direct_chat":
                return this.userClient.toggleMuteNotifications(id.userId, muted);
            case "channel":
                return this.communityClient(id.communityId).toggleMuteChannelNotifications(id, muted);
            case "community":
                return this.communityClient(id.communityId).toggleMuteChannelNotifications(undefined, muted);
        }
    }
    getGroupDetails(chatId, chatLastUpdated) {
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).getGroupDetails(chatLastUpdated);
            case "channel":
                return this.communityClient(chatId.communityId).getChannelDetails(chatId, chatLastUpdated);
        }
    }
    getPublicGroupSummary(chatId) {
        return this.getGroupClient(chatId.groupId)
            .getPublicSummary()
            .then((resp) => {
            if (resp.kind === "success") {
                return {
                    kind: "success",
                    group: this.rehydrateDataContent(resp.group, "avatar"),
                };
            }
            return resp;
        })
            .catch((err) => {
            if (err instanceof openchat_shared_1.DestinationInvalidError) {
                return this._groupIndexClient.lookupChannelByGroupId(chatId).then((resp) => {
                    if (resp === undefined)
                        return openchat_shared_1.CommonResponses.failure();
                    return {
                        kind: "group_moved",
                        location: resp,
                    };
                });
            }
            return openchat_shared_1.CommonResponses.failure();
        });
    }
    getRecommendedGroups(exclusions) {
        return this._groupIndexClient
            .recommendedGroups(exclusions)
            .then((groups) => groups.map((g) => this.rehydrateDataContent(g, "avatar")));
    }
    dismissRecommendation(chatId) {
        return this.userClient.dismissRecommendation(chatId.groupId);
    }
    getBio(userId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("");
        const userClient = userId
            ? new user_client_1.UserClient(userId, this.identity, this._agent, this.config, this.db)
            : this.userClient;
        return userClient.getBio();
    }
    getPublicProfile(userId) {
        const userClient = userId
            ? new user_client_1.UserClient(userId, this.identity, this._agent, this.config, this.db)
            : this.userClient;
        return userClient.getPublicProfile();
    }
    setBio(bio) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.setBio(bio);
    }
    async registerUser(username, referralCode) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        const localUserIndex = await this._userIndexClient.userRegistrationCanister();
        return this.getLocalUserIndexClient(localUserIndex).registerUser(username, referralCode);
    }
    getUserStorageLimits() {
        return this._dataClient.storageStatus();
    }
    refreshAccountBalance(ledger, principal) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(0n);
        return this.getLedgerClient(ledger).accountBalance(principal);
    }
    getAccountTransactions(ledgerIndex, principal, fromId) {
        const icpLedgerIndex = this._registryValue?.nervousSystemSummary.find((ns) => ns.isNns)
            ?.indexCanisterId;
        if (ledgerIndex === icpLedgerIndex) {
            return new icpLedgerIndex_client_1.IcpLedgerIndexClient(this.identity, this._agent, ledgerIndex).getAccountTransactions(principal, fromId);
        }
        return this.getLedgerIndexClient(ledgerIndex).getAccountTransactions(principal, fromId);
    }
    getGroupMessagesByMessageIndex(chatId, messageIndexes, latestKnownUpdate) {
        latestKnownUpdate = (0, replicaUpToDateChecker_1.excludeLatestKnownUpdateIfBeforeFix)(latestKnownUpdate);
        switch (chatId.kind) {
            case "group_chat":
                return this.rehydrateEventResponse(chatId, this.getGroupClient(chatId.groupId).getMessagesByMessageIndex(messageIndexes, latestKnownUpdate), undefined, latestKnownUpdate);
            case "channel":
                return this.rehydrateEventResponse(chatId, this.communityClient(chatId.communityId).getMessagesByMessageIndex(chatId, messageIndexes, latestKnownUpdate), undefined, latestKnownUpdate);
        }
    }
    pinMessage(chatId, messageIndex) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).pinMessage(messageIndex);
            case "channel":
                return this.communityClient(chatId.communityId).pinMessage(chatId, messageIndex);
        }
    }
    unpinMessage(chatId, messageIndex) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).unpinMessage(messageIndex);
            case "channel":
                return this.communityClient(chatId.communityId).unpinMessage(chatId, messageIndex);
        }
    }
    registerPollVote(chatId, messageIdx, answerIdx, voteType, threadRootMessageIndex, newAchievement) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).registerPollVote(messageIdx, answerIdx, voteType, threadRootMessageIndex, newAchievement);
            case "channel":
                return this.communityClient(chatId.communityId).registerPollVote(chatId, messageIdx, answerIdx, voteType, threadRootMessageIndex, newAchievement);
        }
    }
    withdrawCryptocurrency(domain, pin) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this.userClient.withdrawCryptocurrency(domain, pin);
    }
    getInviteCode(id) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (id.kind) {
            case "community":
                return this.communityClient(id.communityId).getInviteCode();
            case "group_chat":
                return this.getGroupClient(id.groupId).getInviteCode();
        }
    }
    enableInviteCode(id) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (id.kind) {
            case "community":
                return this.communityClient(id.communityId).enableInviteCode();
            case "group_chat":
                return this.getGroupClient(id.groupId).enableInviteCode();
        }
    }
    disableInviteCode(id) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (id.kind) {
            case "community":
                return this.communityClient(id.communityId).disableInviteCode();
            case "group_chat":
                return this.getGroupClient(id.groupId).disableInviteCode();
        }
    }
    resetInviteCode(id) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (id.kind) {
            case "community":
                return this.communityClient(id.communityId).resetInviteCode();
            case "group_chat":
                return this.getGroupClient(id.groupId).resetInviteCode();
        }
    }
    pinChat(chatId, favourite) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.pinChat(chatId, favourite);
    }
    unpinChat(chatId, favourite) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.unpinChat(chatId, favourite);
    }
    archiveChat(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.archiveChat(chatId);
    }
    unarchiveChat(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.unarchiveChat(chatId);
    }
    registerProposalVote(chatId, messageIndex, adopt) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).registerProposalVote(messageIndex, adopt);
            case "channel":
                return this.communityClient(chatId.communityId).registerProposalVote(chatId.channelId, messageIndex, adopt);
        }
    }
    getProposalVoteDetails(governanceCanisterId, proposalId, isNns) {
        if (isNns) {
            return new nns_governance_client_1.NnsGovernanceClient(this.identity, this._agent, governanceCanisterId).getProposalVoteDetails(proposalId);
        }
        else {
            return new sns_governance_client_1.SnsGovernanceClient(this.identity, this._agent, governanceCanisterId).getProposalVoteDetails(proposalId);
        }
    }
    listNervousSystemFunctions(snsGovernanceCanisterId) {
        return new sns_governance_client_1.SnsGovernanceClient(this.identity, this._agent, snsGovernanceCanisterId).listNervousSystemFunctions();
    }
    async threadPreviews(threadsByChat) {
        function latestMessageTimestamp(messages) {
            return messages[messages.length - 1]?.timestamp ?? BigInt(0);
        }
        return Promise.all(openchat_shared_1.ChatMap.fromMap(threadsByChat)
            .entries()
            .map(([chatId, [threadSyncs, latestKnownUpdate]]) => {
            latestKnownUpdate = (0, replicaUpToDateChecker_1.excludeLatestKnownUpdateIfBeforeFix)(latestKnownUpdate);
            const latestClientThreadUpdate = threadSyncs.reduce((curr, next) => (next.lastUpdated > curr ? next.lastUpdated : curr), BigInt(0));
            switch (chatId.kind) {
                case "group_chat":
                    return this.getGroupClient(chatId.groupId)
                        .threadPreviews(threadSyncs.map((t) => t.threadRootMessageIndex), latestClientThreadUpdate)
                        .then((response) => [response, latestKnownUpdate]);
                case "channel":
                    return this.communityClient(chatId.communityId)
                        .threadPreviews(chatId, threadSyncs.map((t) => t.threadRootMessageIndex), latestClientThreadUpdate)
                        .then((response) => [response, latestKnownUpdate]);
                case "direct_chat":
                    throw new Error("direct chat thread previews not supported");
            }
        })).then((responses) => Promise.all(responses.map(([r, latestKnownUpdate]) => {
            return r.kind === "thread_previews_success"
                ? Promise.all(r.threads.map((t) => this.rehydrateThreadPreview(t, latestKnownUpdate)))
                : [];
        })).then((threads) => threads
            .flat()
            .sort((a, b) => Number(latestMessageTimestamp(b.latestReplies) -
            latestMessageTimestamp(a.latestReplies)))));
    }
    async rehydrateThreadPreview(thread, latestKnownUpdate) {
        const threadMissing = await this.resolveMissingIndexes(thread.chatId, thread.latestReplies, thread.rootMessage.event.messageIndex, latestKnownUpdate);
        const rootMissing = await this.resolveMissingIndexes(thread.chatId, [thread.rootMessage], undefined, latestKnownUpdate);
        const latestReplies = thread.latestReplies.map((r) => this.rehydrateEvent(r, thread.chatId, threadMissing, thread.rootMessage.event.messageIndex));
        const rootMessage = this.rehydrateEvent(thread.rootMessage, thread.chatId, rootMissing, undefined);
        return {
            ...thread,
            rootMessage,
            latestReplies,
        };
    }
    setCachedMessageFromNotification(chatId, threadRootMessageIndex, message) {
        return (0, caching_1.setCachedMessageIfNotExists)(this.db, chatId, message, threadRootMessageIndex);
    }
    freezeGroup(chatId, reason) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.freezeGroup(chatId.groupId, reason);
    }
    unfreezeGroup(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.unfreezeGroup(chatId.groupId);
    }
    freezeCommunity(id, reason) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.freezeCommunity(id, reason);
    }
    unfreezeCommunity(id) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.unfreezeCommunity(id);
    }
    deleteFrozenGroup(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.deleteFrozenGroup(chatId.groupId);
    }
    addHotGroupExclusion(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.addHotGroupExclusion(chatId.groupId);
    }
    removeHotGroupExclusion(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.removeHotGroupExclusion(chatId.groupId);
    }
    suspendUser(userId, reason) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._userIndexClient.suspendUser(userId, reason);
    }
    unsuspendUser(userId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._userIndexClient.unsuspendUser(userId);
    }
    loadFailedMessages() {
        return (0, caching_1.loadFailedMessages)(this.db).then((messages) => messages.toMap());
    }
    deleteFailedMessage(chatId, messageId, threadRootMessageIndex) {
        return (0, caching_1.removeFailedMessage)(this.db, chatId, messageId, threadRootMessageIndex);
    }
    claimPrize(chatId, messageId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).claimPrize(messageId);
            case "channel":
                return this.communityClient(chatId.communityId).claimPrize(chatId.channelId, messageId);
        }
    }
    payForDiamondMembership(userId, token, duration, recurring, expectedPriceE8s) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this._userIndexClient.payForDiamondMembership(userId, token, duration, recurring, expectedPriceE8s);
    }
    setCommunityModerationFlags(communityId, flags) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.setCommunityModerationFlags(communityId, flags);
    }
    setGroupUpgradeConcurrency(value) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.setGroupUpgradeConcurrency(value);
    }
    setCommunityUpgradeConcurrency(value) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._groupIndexClient.setCommunityUpgradeConcurrency(value);
    }
    setUserUpgradeConcurrency(value) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._userIndexClient.setUserUpgradeConcurrency(value);
    }
    markLocalGroupIndexFull(canisterId, full) {
        return this._groupIndexClient.markLocalGroupIndexFull(canisterId, full);
    }
    stakeNeuronForSubmittingProposals(governanceCanisterId, stake) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this._proposalsBotClient.stakeNeuronForSubmittingProposals(governanceCanisterId, stake);
    }
    topUpNeuronForSubmittingProposals(governanceCanisterId, amount) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this._proposalsBotClient.topUpNeuron(governanceCanisterId, amount);
    }
    updateMarketMakerConfig(config) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this._marketMakerClient.updateConfig(config);
    }
    setMessageReminder(chatId, eventIndex, remindAt, notes, threadRootMessageIndex) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.userClient.setMessageReminder(chatId, eventIndex, remindAt, notes, threadRootMessageIndex);
    }
    cancelMessageReminder(reminderId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(false);
        return this.userClient.cancelMessageReminder(reminderId);
    }
    declineInvitation(chatId) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        switch (chatId.kind) {
            case "group_chat":
                return this.getGroupClient(chatId.groupId).declineInvitation();
            case "channel":
                return this.communityClient(chatId.communityId).declineInvitation(chatId);
        }
    }
    convertGroupToCommunity(chatId, historyVisible, rules) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this.getGroupClient(chatId.groupId).convertToCommunity(historyVisible, rules);
    }
    getRegistry() {
        return new openchat_shared_1.Stream(async (resolve, reject) => {
            const current = await (0, registryCache_1.getCachedRegistry)();
            const isOffline = (0, openchat_shared_1.offline)();
            if (current !== undefined) {
                this._registryValue = current;
                resolve([current, false], isOffline);
            }
            if (!isOffline) {
                try {
                    const updates = await this._registryClient.updates(current?.lastUpdated);
                    if (updates.kind === "success") {
                        const updated = {
                            lastUpdated: updates.lastUpdated,
                            tokenDetails: (0, list_1.distinctBy)([...updates.tokenDetails, ...(current?.tokenDetails ?? [])], (t) => t.ledger),
                            nervousSystemSummary: (0, list_1.distinctBy)([
                                ...updates.nervousSystemSummary,
                                ...(current?.nervousSystemSummary ?? []),
                            ], (ns) => ns.governanceCanisterId),
                            swapProviders: updates.swapProviders ?? current?.swapProviders ?? [],
                            messageFilters: [
                                ...(current?.messageFilters ?? []),
                                ...updates.messageFiltersAdded,
                            ].filter((f) => !updates.messageFiltersRemoved.includes(f.id)),
                            currentAirdropChannel: updates.currentAirdropChannel,
                        };
                        (0, registryCache_1.setCachedRegistry)(updated);
                        this._registryValue = updated;
                        resolve([updated, true], true);
                    }
                    else if (updates.kind === "success_no_updates" && current !== undefined) {
                        resolve([current, false], true);
                    }
                    else {
                        reject("Registry is empty... this should never happen!");
                    }
                }
                catch (err) {
                    console.warn("Getting registry updates failed: ", err);
                    reject(err);
                }
            }
        });
    }
    setCommunityIndexes(communityIndexes) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(false);
        return this.userClient.setCommunityIndexes(communityIndexes);
    }
    createUserGroup(communityId, name, userIds) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this.communityClient(communityId).createUserGroup(name, userIds);
    }
    updateUserGroup(communityId, userGroupId, name, usersToAdd, usersToRemove) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this.communityClient(communityId).updateUserGroup(userGroupId, name, usersToAdd, usersToRemove);
    }
    setMemberDisplayName(communityId, display_name, newAchievement) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        return this.communityClient(communityId).setMemberDisplayName(display_name, newAchievement);
    }
    deleteUserGroups(communityId, userGroupIds) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this.communityClient(communityId).deleteUserGroups(userGroupIds);
    }
    getCachePrimerTimestamps() {
        return (0, caching_1.getCachePrimerTimestamps)(this.db);
    }
    followThread(chatId, threadRootMessageIndex, follow, newAchievement) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve("offline");
        if (chatId.kind === "channel") {
            return this.communityClient(chatId.communityId).followThread(chatId.channelId, threadRootMessageIndex, follow, newAchievement);
        }
        else if (chatId.kind === "group_chat") {
            return this.getGroupClient(chatId.groupId).followThread(threadRootMessageIndex, follow, newAchievement);
        }
        else {
            throw new Error("followThread not implemented for direct chats");
        }
    }
    submitProposal(governanceCanisterId, proposal, ledger, token, proposalRejectionFee, transactionFee) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(openchat_shared_1.CommonResponses.offline());
        return this.userClient.submitProposal(governanceCanisterId, proposal, ledger, token, proposalRejectionFee, transactionFee);
    }
    reportMessage(chatId, threadRootMessageIndex, messageId, deleteMessage) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(false);
        if (chatId.kind === "channel") {
            return this.communityClient(chatId.communityId).reportMessage(chatId.channelId, threadRootMessageIndex, messageId, deleteMessage);
        }
        else if (chatId.kind === "group_chat") {
            return this.getGroupClient(chatId.groupId).reportMessage(threadRootMessageIndex, messageId, deleteMessage);
        }
        else {
            return this.userClient.reportMessage(chatId, threadRootMessageIndex, messageId, deleteMessage);
        }
    }
    canSwap(tokenLedgers) {
        return this._dexesAgent.canSwap(tokenLedgers, this.swapProviders());
    }
    getTokenSwaps(inputTokenLedger, outputTokenLedgers) {
        return this._dexesAgent
            .getSwapPools(inputTokenLedger, new Set(outputTokenLedgers), this.swapProviders())
            .then((pools) => {
            return pools.reduce(swapReducer, {});
        });
        function swapReducer(result, pool) {
            const outputTokenLedger = inputTokenLedger === pool.token0 ? pool.token1 : pool.token0;
            return {
                ...result,
                [outputTokenLedger]: [...(result[outputTokenLedger] || []), pool.dex],
            };
        }
    }
    getTokenSwapQuotes(inputTokenLedger, outputTokenLedger, amountIn) {
        return this._dexesAgent
            .quoteSwap(inputTokenLedger, outputTokenLedger, amountIn, this.swapProviders())
            .then((quotes) => {
            quotes.sort(compare);
            return quotes;
        });
        function compare([_dexA, amountA], [_dexB, amountB]) {
            if (amountA > amountB) {
                return -1;
            }
            if (amountA < amountB) {
                return 1;
            }
            return 0;
        }
    }
    swapTokens(swapId, inputTokenDetails, outputTokenDetails, amountIn, minAmountOut, dex, pin) {
        return this._dexesAgent
            .getSwapPools(inputTokenDetails.ledger, new Set([outputTokenDetails.ledger]), this.swapProviders())
            .then((pools) => {
            const pool = pools.find((p) => p.dex === dex);
            if (pool === undefined) {
                return Promise.reject("Cannot find a matching pool");
            }
            const exchangeArgs = {
                dex,
                swapCanisterId: pool.canisterId,
                zeroForOne: pool.token0 === inputTokenDetails.ledger,
            };
            return this.userClient.swapTokens(swapId, inputTokenDetails, outputTokenDetails, amountIn, minAmountOut, exchangeArgs, pin);
        });
    }
    tokenSwapStatus(swapId) {
        return this.userClient.tokenSwapStatus(swapId);
    }
    swapProviders() {
        return this._registryValue?.swapProviders ?? [];
    }
    approveTransfer(spender, ledger, amount, expiresIn, pin) {
        return this.userClient.approveTransfer(spender, ledger, amount, expiresIn, pin);
    }
    deleteDirectChat(userId, blockUser) {
        return this.userClient.deleteDirectChat(userId, blockUser);
    }
    diamondMembershipFees() {
        return this._userIndexClient.diamondMembershipFees();
    }
    setDiamondMembershipFees(fees) {
        return this._userIndexClient.setDiamondMembershipFees(fees);
    }
    addRemoveSwapProvider(swapProvider, add) {
        return this._registryClient.addRemoveSwapProvider(swapProvider, add);
    }
    addMessageFilter(regex) {
        return this._registryClient.addMessageFilter(regex);
    }
    removeMessageFilter(id) {
        return this._registryClient.removeMessageFilter(id);
    }
    setTokenEnabled(ledger, enabled) {
        return this._registryClient.setTokenEnabled(ledger, enabled);
    }
    exchangeRates() {
        return (0, network_1.isMainnet)(this.config.icUrl)
            ? this._icpcoinsClient.exchangeRates()
            : Promise.resolve({});
    }
    reportedMessages(userId) {
        return this._userIndexClient.reportedMessages(userId);
    }
    acceptP2PSwap(chatId, threadRootMessageIndex, messageId, pin, newAchievement) {
        if (chatId.kind === "channel") {
            return this.communityClient(chatId.communityId).acceptP2PSwap(chatId.channelId, threadRootMessageIndex, messageId, pin, newAchievement);
        }
        else if (chatId.kind === "group_chat") {
            return this.getGroupClient(chatId.groupId).acceptP2PSwap(threadRootMessageIndex, messageId, pin, newAchievement);
        }
        else {
            return this.userClient.acceptP2PSwap(chatId.userId, threadRootMessageIndex, messageId, pin);
        }
    }
    cancelP2PSwap(chatId, threadRootMessageIndex, messageId) {
        if (chatId.kind === "channel") {
            return this.communityClient(chatId.communityId).cancelP2PSwap(chatId.channelId, threadRootMessageIndex, messageId);
        }
        else if (chatId.kind === "group_chat") {
            return this.getGroupClient(chatId.groupId).cancelP2PSwap(threadRootMessageIndex, messageId);
        }
        else {
            return this.userClient.cancelP2PSwap(chatId.userId, messageId);
        }
    }
    videoCallParticipants(chatId, messageId, updatesSince) {
        switch (chatId.kind) {
            case "channel":
                return this.communityClient(chatId.communityId).videoCallParticipants(chatId.channelId, messageId, updatesSince);
            case "group_chat":
                return this.getGroupClient(chatId.groupId).videoCallParticipants(messageId, updatesSince);
        }
    }
    joinVideoCall(chatId, messageId, newAchievement) {
        if (chatId.kind === "channel") {
            return this.communityClient(chatId.communityId).joinVideoCall(chatId.channelId, messageId, newAchievement);
        }
        else if (chatId.kind === "group_chat") {
            return this.getGroupClient(chatId.groupId).joinVideoCall(messageId, newAchievement);
        }
        else {
            return this.userClient.joinVideoCall(chatId.userId, messageId);
        }
    }
    setVideoCallPresence(chatId, messageId, presence, newAchievement) {
        switch (chatId.kind) {
            case "channel":
                return this.communityClient(chatId.communityId).setVideoCallPresence(chatId.channelId, messageId, presence, newAchievement);
            case "group_chat":
                return this.getGroupClient(chatId.groupId).setVideoCallPresence(messageId, presence, newAchievement);
        }
    }
    async getAccessToken(chatId, accessTokenType, localUserIndex) {
        return this.getLocalUserIndexClient(localUserIndex).getAccessToken(chatId, accessTokenType);
    }
    async getLocalUserIndexForUser(userId) {
        const localUserIndex = await (0, caching_1.getLocalUserIndexForUser)(userId);
        if (localUserIndex !== undefined) {
            return localUserIndex;
        }
        return new user_client_1.UserClient(userId, this.identity, this._agent, this.config, this.db)
            .localUserIndex()
            .then((localUserIndex) => {
            return (0, caching_1.cacheLocalUserIndexForUser)(userId, localUserIndex);
        });
    }
    updateBtcBalance(userId) {
        return new ckbtcMinter_1.CkbtcMinterClient(this.identity, this._agent).updateBalance(userId);
    }
    generateMagicLink(email, sessionKey) {
        return this._signInWithEmailClient.generateMagicLink(email, sessionKey);
    }
    getSignInWithEmailDelegation(email, sessionKey, expiration) {
        return this._signInWithEmailClient.getDelegation(email, sessionKey, expiration);
    }
    siwePrepareLogin(address) {
        return this._signInWithEthereumClient.prepareLogin(address);
    }
    siwsPrepareLogin(address) {
        return this._signInWithSolanaClient.prepareLogin(address);
    }
    loginWithWallet(token, address, signature, sessionKey) {
        switch (token) {
            case "eth":
                return this._signInWithEthereumClient.login(signature, address, sessionKey);
            case "sol":
                return this._signInWithSolanaClient.login(signature, address, sessionKey);
        }
    }
    getDelegationWithWallet(token, address, sessionKey, expiration) {
        switch (token) {
            case "eth":
                return this._signInWithEthereumClient.getDelegation(address, sessionKey, expiration);
            case "sol":
                return this._signInWithSolanaClient.getDelegation(address, sessionKey, expiration);
        }
    }
    setPinNumber(verification, newPin) {
        return this.userClient.setPinNumber(verification, newPin);
    }
    claimDailyChit() {
        return this.userClient.claimDailyChit();
    }
    chitLeaderboard() {
        return this._userIndexClient.chitLeaderboard();
    }
    chitEvents(req) {
        return this.userClient.chitEvents(req);
    }
    async markAchievementsSeen() {
        const cachedState = await (0, caching_1.getCachedChats)(this.db, this.principal);
        if (cachedState !== undefined) {
            return this.userClient.markAchievementsSeen(cachedState.latestUserCanisterUpdates);
        }
    }
    submitProofOfUniquePersonhood(iiPrincipal, credential) {
        return this._userIndexClient.submitProofOfUniquePersonhood(iiPrincipal, credential);
    }
    configureWallet(config) {
        return this.userClient.configureWallet(config);
    }
    cancelInvites(id, userIds) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve(false);
        switch (id.kind) {
            case "group_chat":
                return this.getGroupClient(id.groupId).cancelInvites(userIds);
            case "channel":
                return this.communityClient(id.communityId).cancelInvites(id.channelId, userIds);
            case "community":
                return this.communityClient(id.communityId).cancelInvites(undefined, userIds);
        }
    }
    async clearCachedData() {
        await Promise.all([
            (0, caching_1.clearCache)(this.principal.toString()),
            (0, userCache_1.clearCache)(),
            (0, referralCache_1.clearCache)(),
        ]);
    }
    async getExternalAchievements() {
        const cached = await (0, caching_1.getCachedExternalAchievements)();
        const updates = await this._userIndexClient.getExternalAchievements(cached?.lastUpdated ?? 0n);
        if (updates.kind === "success") {
            const merged = this.mergeExternalAchievements(cached, updates);
            (0, caching_1.setCachedExternalAchievements)(merged.lastUpdated, merged.achievements);
            return merged.achievements;
        }
        return cached?.achievements ?? [];
    }
    mergeExternalAchievements(cached, updates) {
        if (cached === undefined) {
            return {
                lastUpdated: updates.lastUpdated,
                achievements: updates.addedOrUpdated,
            };
        }
        const { achievements } = cached;
        const map = (0, list_1.toRecord)(achievements, (a) => a.id);
        updates.addedOrUpdated.forEach((a) => {
            map[a.id] = a;
        });
        return {
            lastUpdated: updates.lastUpdated,
            achievements: Object.values(map),
        };
    }
    markActivityFeedRead(readUpTo) {
        return this.userClient.markActivityFeedRead(readUpTo);
    }
    messageActivityFeed() {
        return new openchat_shared_1.Stream(async (resolve) => {
            const cachedEvents = await (0, caching_1.getActivityFeedEvents)();
            const since = cachedEvents[0]?.timestamp ?? 0n;
            const server = await this.userClient.messageActivityFeed(since);
            const combined = [...cachedEvents, ...server.events];
            combined.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
            const deduped = combined.reduce((map, ev) => {
                map.set(`${(0, openchat_shared_1.messageContextToString)(ev.messageContext)}_${ev.activity}_${ev.eventIndex}`, ev);
                return map;
            }, new Map());
            const sorted = [...deduped.values()].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
            (0, caching_1.setActivityFeedEvents)(sorted.slice(0, openchat_shared_1.MAX_ACTIVITY_EVENTS));
            this.hydrateActivityFeedEvents(sorted, (hydrated, final) => resolve({ total: server.total, events: hydrated }, final));
        });
    }
    async hydrateActivityFeedEvents(activityEvents, callback) {
        const eventIndexesByMessageContext = activityEvents.reduce((map, event) => {
            const eventIndexes = map.get(event.messageContext) ?? [];
            eventIndexes.push(event.eventIndex);
            map.set(event.messageContext, eventIndexes);
            return map;
        }, new messageContext_1.AsyncMessageContextMap());
        const [withCachedMessages, missing] = await this.getMessagesByMessageContext(eventIndexesByMessageContext, activityEvents, "cached");
        const anyMissing = [...missing.values()].some((s) => s.size > 0);
        callback(withCachedMessages, !anyMissing);
        if (anyMissing) {
            this.getMessagesByMessageContext(new messageContext_1.AsyncMessageContextMap(missing.map((_, v) => [...v]).toMap()), withCachedMessages, "missing").then(([withServerMessages]) => callback(withServerMessages, true));
        }
    }
    async getMessagesByMessageContext(eventIndexesByMessageContext, activityEvents, mode) {
        const allMissing = new openchat_shared_1.MessageContextMap();
        const messagesByMessageContext = await eventIndexesByMessageContext.asyncMap((ctx, idxs) => {
            const chatId = ctx.chatId;
            const chatKind = chatId.kind;
            function addMissing(context, missing) {
                if (missing.size > 0) {
                    const current = allMissing.get(context) ?? new Set();
                    missing.forEach((n) => current.add(n));
                    allMissing.set(context, current);
                }
            }
            if (chatKind === "direct_chat") {
                switch (mode) {
                    case "cached":
                        return this.userClient
                            .getCachedEventsByIndex(idxs, chatId, ctx.threadRootMessageIndex)
                            .then(([resp, missing]) => {
                            addMissing(ctx, missing);
                            return this.messagesFromEventsResponse(ctx, resp);
                        });
                    case "missing":
                        return this.userClient
                            .chatEventsByIndex(idxs, chatId, ctx.threadRootMessageIndex, undefined)
                            .then((resp) => this.messagesFromEventsResponse(ctx, resp));
                }
            }
            else if (chatKind === "group_chat") {
                const client = this.getGroupClient(chatId.groupId);
                switch (mode) {
                    case "cached":
                        return client
                            .getCachedEventsByIndex(idxs, ctx.threadRootMessageIndex)
                            .then(([resp, missing]) => {
                            addMissing(ctx, missing);
                            return this.messagesFromEventsResponse(ctx, resp);
                        });
                    case "missing":
                        return client
                            .chatEventsByIndex(idxs, ctx.threadRootMessageIndex, undefined)
                            .then((resp) => this.messagesFromEventsResponse(ctx, resp));
                }
            }
            else if (chatKind === "channel") {
                const client = this.communityClient(chatId.communityId);
                switch (mode) {
                    case "cached":
                        return client
                            .getCachedEventsByIndex(chatId, idxs, ctx.threadRootMessageIndex)
                            .then(([resp, missing]) => {
                            addMissing(ctx, missing);
                            return this.messagesFromEventsResponse(ctx, resp);
                        });
                    case "missing":
                        return client
                            .eventsByIndex(chatId, idxs, ctx.threadRootMessageIndex, undefined)
                            .then((resp) => this.messagesFromEventsResponse(ctx, resp));
                }
            }
            else {
                throw new openchat_shared_1.UnsupportedValueError("unknown chatid kind supplied", chatId);
            }
        });
        const lookup = [...messagesByMessageContext.values()].reduce((lookup, events) => {
            events.forEach((ev) => lookup.set(ev.event.messageId, ev.event));
            return lookup;
        }, new openchat_shared_1.MessageMap());
        return [
            activityEvents.map((ev) => ({
                ...ev,
                message: ev.message ?? lookup.get(ev.messageId),
            })),
            allMissing,
        ];
    }
    deleteUser(userId) {
        return this._userIndexClient.deleteUser(userId);
    }
    getChannelSummary(channelId) {
        return this.communityClient(channelId.communityId)
            .channelSummary(channelId)
            .then((resp) => {
            if (resp.kind === "channel") {
                return this.hydrateChatSummary(resp);
            }
            return resp;
        });
    }
}
exports.OpenChatAgent = OpenChatAgent;
