"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonUserClient = void 0;
const openchat_shared_1 = require("openchat-shared");
const openchat_shared_2 = require("openchat-shared");
class AnonUserClient {
    get userId() {
        return openchat_shared_1.ANON_USER_ID;
    }
    static create() {
        console.debug("ANON: creating anonymous user client");
        return new AnonUserClient();
    }
    manageFavouriteChats(_toAdd, _toRemove) {
        return Promise.resolve("success");
    }
    getInitialState() {
        return Promise.resolve({
            blockedUsers: [],
            communities: {
                summaries: [],
            },
            groupChats: {
                summaries: [],
                pinned: [],
                cached: undefined,
            },
            avatarId: undefined,
            directChats: {
                summaries: [],
                pinned: [],
            },
            favouriteChats: {
                chats: [],
                pinned: [],
            },
            timestamp: BigInt(Date.now()),
            suspended: false,
            pinNumberSettings: undefined,
            localUserIndex: "",
            achievements: [],
            achievementsLastSeen: 0n,
            streakEnds: 0n,
            streak: 0,
            nextDailyClaim: 0n,
            chitBalance: 0,
            totalChitEarned: 0,
            referrals: [],
            walletConfig: { kind: "auto_wallet", minDollarValue: 1 },
            messageActivitySummary: {
                readUpToTimestamp: 0n,
                latestTimestamp: 0n,
                unreadCount: 0,
            },
        });
    }
    getUpdates(_updatesSince) {
        return Promise.resolve({
            kind: "success_no_updates",
        });
    }
    createCommunity(_community, _rules, _defaultChannels, _defaultChannelRules) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    createGroup(_group) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    deleteGroup(_chatId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    deleteCommunity(_id) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    getCachedEventsByIndex(_eventIndexes, _chatId, _threadRootMessageIndex) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    chatEventsByIndex(_eventIndexes, _chatId, _threadRootMessageIndex, _latestKnownUpdate) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    async chatEventsWindow(_eventIndexRange, _chatId, _messageIndex, _latestKnownUpdate) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    async chatEvents(_eventIndexRange, _chatId, _startIndex, _ascending, _threadRootMessageIndex, _latestKnownUpdate) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    setAvatar(_bytes) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    editMessage(_recipientId, _message, _threadRootMessageIndex) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    sendMessage(_chatId, _event, _messageFilterFailed, _threadRootMessageIndex, _pin, _onRequestAccepted) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    sendMessageToBackend(_chatId, _event, _threadRootMessageIndex) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    sendMessageWithTransferToGroup(_groupId, _recipientId, _sender, _event, _threadRootMessageIndex, _rulesAccepted) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    loadSavedCryptoAccounts() {
        return Promise.resolve([]);
    }
    saveCryptoAccount(_) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    sendMessageWithTransferToChannel(_id, _recipientId, _sender, _event, _threadRootMessageIndex, _communityRulesAccepted, _channelRulesAccepted) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    blockUser(_userId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    unblockUser(_userId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    leaveGroup(_chatId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    leaveCommunity(_id) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    markMessagesRead(_request) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    tipMessage(_messageContext, _messageId, _transfer, _decimals, _pin) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    addReaction(_otherUserId, _messageId, _reaction, _threadRootMessageIndex) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    removeReaction(_otherUserId, _messageId, _reaction, _threadRootMessageIndex) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    deleteMessage(_otherUserId, _messageId, _threadRootMessageIndex) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    undeleteMessage(_otherUserId, _messageId, _threadRootMessageIndex) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    searchDirectChat(_chatId, _searchTerm, _maxResults) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    toggleMuteNotifications(_chatId, _muted) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    dismissRecommendation(_chatId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    getBio() {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    getPublicProfile() {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    setBio(_bio) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    withdrawCryptocurrency(_domain) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    pinChat(_chatId, _favourite) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    unpinChat(_chatId, _favourite) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    archiveChat(_chatId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    unarchiveChat(_chatId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    getDeletedMessage(_userId, _messageId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    setMessageReminder(_chatId, _eventIndex, _remindAt, _notes, _threadRootMessageIndex) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    cancelMessageReminder(_reminderId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    setCommunityIndexes(_communityIndexes) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    submitProposal(_governanceCanisterId, _proposal, _ledger, _token, _proposalRejectionFee, _transactionFee) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    reportMessage(_chatId, _threadRootMessageIndex, _messageId, _deleteMessage) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    swapTokens(_swapId, _inputToken, _outputToken, _amountIn, _minAmountOut, _exchangeArgs) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    tokenSwapStatus(_swapId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    approveTransfer(_spender, _ledger, _amount, _expiresIn) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    deleteDirectChat(_userId, _blockUser) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    acceptP2PSwap(_userId, _threadRootMessageIndex, _messageId, _pin) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    cancelP2PSwap(_userId, _messageId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    joinVideoCall(_userId, _messageId) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    setVideoCallPresence(_messageId, _presence) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    localUserIndex() {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    setPinNumber(_verification, _newPin) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    chitEvents(_req) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    markAchievementsSeen(_lastSeen) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    claimDailyChit() {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    configureWallet(_walletConfig) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    markActivityFeedRead(_timestamp) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
    messageActivityFeed(_since) {
        throw new openchat_shared_2.AnonymousOperationError();
    }
}
exports.AnonUserClient = AnonUserClient;
