"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiVerification = exports.claimDailyChitResponse = exports.apiExchangeArgs = exports.approveTransferResponse = exports.tokenSwapStatusResponse = exports.swapTokensResponse = exports.reportMessageResponse = exports.submitProposalResponse = exports.proposalToSubmit = exports.deleteCommunityResponse = exports.leaveCommunityResponse = exports.setMessageReminderResponse = exports.deletedMessageResponse = exports.withdrawCryptoResponse = exports.getUpdatesResponse = exports.manageFavouritesResponse = exports.directChatsUpdates = exports.groupChatsUpdates = exports.favouriteChatsUpdates = exports.communitiesUpdates = exports.userCanisterCommunitySummaryUpdates = exports.userCanisterChannelSummaryUpdates = exports.apiWalletConfig = exports.initialStateResponse = exports.getEventsResponse = exports.createCommunityResponse = exports.sendMessageResponse = exports.sendMessageWithTransferToGroupResponse = exports.sendMessageWithTransferToChannelResponse = exports.archiveChatResponse = exports.pinChatResponse = exports.setAvatarResponse = exports.undeleteMessageResponse = exports.deleteMessageResponse = exports.searchDirectChatResponse = exports.setBioResponse = exports.publicProfileResponse = exports.tipMessageResponse = exports.savedCryptoAccountsResponse = exports.saveCryptoAccountResponse = exports.achievementType = exports.referralStatus = exports.chitEarnedReason = exports.chitEarned = exports.chitEventsResponse = exports.messageActivity = exports.messageContext = exports.messageActivityEvent = exports.messageActivityFeedResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
const mapping_1 = require("../../utils/mapping");
const chatMappersV2_1 = require("../common/chatMappersV2");
const replicaUpToDateChecker_1 = require("../common/replicaUpToDateChecker");
const error_1 = require("../error");
const pinNumberErrorMapper_1 = require("../common/pinNumberErrorMapper");
const id_1 = require("../../utils/id");
const commonResponseMapper_1 = require("../common/commonResponseMapper");
function messageActivityFeedResponse(value) {
    if ("Success" in value) {
        return {
            total: value.Success.total,
            events: value.Success.events.map(messageActivityEvent),
        };
    }
    return {
        total: 0,
        events: [],
    };
}
exports.messageActivityFeedResponse = messageActivityFeedResponse;
function messageActivityEvent(value) {
    return {
        messageContext: messageContext(value.chat, (0, mapping_1.mapOptional)(value.thread_root_message_index, mapping_1.identity)),
        eventIndex: value.event_index,
        messageIndex: value.message_index,
        messageId: value.message_id,
        activity: messageActivity(value.activity),
        timestamp: value.timestamp,
        userId: (0, mapping_1.mapOptional)(value.user_id, mapping_1.principalBytesToString),
        message: undefined,
    };
}
exports.messageActivityEvent = messageActivityEvent;
function messageContext(chat, threadRootMessageIndex) {
    return {
        chatId: chatIdentifier(chat),
        threadRootMessageIndex,
    };
}
exports.messageContext = messageContext;
function messageActivity(value) {
    if ("Tip" === value) {
        return "tip";
    }
    if ("P2PSwapAccepted" === value) {
        return "p2p_swap_accepted";
    }
    if ("PollVote" === value) {
        return "poll_vote";
    }
    if ("Mention" === value) {
        return "mention";
    }
    if ("Crypto" === value) {
        return "crypto";
    }
    if ("QuoteReply" === value) {
        return "quote_reply";
    }
    if ("Reaction" === value) {
        return "reaction";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpect type of ApiMessageActivity received", value);
}
exports.messageActivity = messageActivity;
function chitEventsResponse(value) {
    if ("Success" in value) {
        return {
            events: value.Success.events.map(chitEarned),
            total: value.Success.total,
        };
    }
    else {
        console.warn("chitEventsResponse failed with: ", value);
        return {
            events: [],
            total: 0,
        };
    }
}
exports.chitEventsResponse = chitEventsResponse;
function chitEarned(value) {
    return {
        amount: value.amount,
        timestamp: value.timestamp,
        reason: chitEarnedReason(value.reason),
    };
}
exports.chitEarned = chitEarned;
function chitEarnedReason(value) {
    if (value === "DailyClaim") {
        return { kind: "daily_claim" };
    }
    if (value === "MemeContestWinner") {
        return { kind: "meme_contest_winner" };
    }
    if (typeof value === "object") {
        if ("Achievement" in value) {
            return { kind: "achievement_unlocked", type: achievementType(value.Achievement) };
        }
        if ("Referral" in value) {
            return { kind: "referral", type: referralStatus(value.Referral) };
        }
        if ("ExternalAchievement" in value) {
            return { kind: "external_achievement_unlocked", name: value.ExternalAchievement };
        }
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiChitEarnedReason encountered", value);
}
exports.chitEarnedReason = chitEarnedReason;
function referralStatus(value) {
    if (value === "Registered") {
        return "registered";
    }
    if (value === "Diamond") {
        return "diamond";
    }
    if (value === "UniquePerson") {
        return "unique_person";
    }
    if (value === "LifetimeDiamond") {
        return "lifetime_diamond";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiReferralStatus encountered", value);
}
exports.referralStatus = referralStatus;
function achievementType(value) {
    switch (value) {
        case "ChangedTheme":
            return "changed_theme";
        case "FavouritedChat":
            return "favourited_chat";
        case "HadMessageReactedTo":
            return "received_reaction";
        case "VotedOnPoll":
            return "voted_on_poll";
        case "SetCommunityDisplayName":
            return "set_community_display_name";
        case "PinnedChat":
            return "pinned_chat";
        case "StartedCall":
            return "started_call";
        case "TippedMessage":
            return "tipped_message";
        case "SentGiphy":
            return "sent_giphy";
        case "HadMessageTipped":
            return "had_message_tipped";
        case "SwappedFromWallet":
            return "swapped_from_wallet";
        case "EditedMessage":
            return "edited_message";
        case "ReactedToMessage":
            return "reacted_to_message";
        case "AcceptedP2PSwapOffer":
            return "accepted_swap_offer";
        case "JoinedCall":
            return "joined_call";
        case "SentImage":
            return "sent_image";
        case "ForwardedMessage":
            return "forwarded_message";
        case "SentPrize":
            return "sent_prize";
        case "FollowedThread":
            return "followed_thread";
        case "SentReminder":
            return "sent_reminder";
        case "ProvedUniquePersonhood":
            return "proved_unique_personhood";
        case "DeletedMessage":
            return "deleted_message";
        case "SentText":
            return "sent_text";
        case "SentP2PSwapOffer":
            return "sent_swap_offer";
        case "QuoteReplied":
            return "quote_replied";
        case "SentCrypto":
            return "sent_crypto";
        case "ReceivedCrypto":
            return "received_crypto";
        case "RepliedInThread":
            return "replied_in_thread";
        case "SentFile":
            return "sent_file";
        case "SentMeme":
            return "sent_meme";
        case "SentPoll":
            return "sent_poll";
        case "SentAudio":
            return "sent_audio";
        case "SentVideo":
            return "sent_video";
        case "JoinedCommunity":
            return "joined_community";
        case "JoinedGroup":
            return "joined_group";
        case "Streak14":
            return "streak_14";
        case "Streak30":
            return "streak_30";
        case "UpgradedToDiamond":
            return "upgraded_to_diamond";
        case "ReceivedDirectMessage":
            return "received_direct_message";
        case "SetDisplayName":
            return "set_display_name";
        case "SetBio":
            return "set_bio";
        case "Streak3":
            return "streak_3";
        case "Streak7":
            return "streak_7";
        case "Streak100":
            return "streak_100";
        case "Streak365":
            return "streak_365";
        case "UpgradedToGoldDiamond":
            return "upgrade_to_gold_diamond";
        case "SentDirectMessage":
            return "sent_direct_message";
        case "SetAvatar":
            return "set_avatar";
        case "Referred1stUser":
            return "referred_1st_user";
        case "Referred3rdUser":
            return "referred_3rd_user";
        case "Referred10thUser":
            return "referred_10th_user";
        case "Referred20thUser":
            return "referred_20th_user";
        case "Referred50thUser":
            return "referred_50th_user";
        case "SetPin":
            return "set_pin";
        default:
            throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiAchievement received", value);
    }
}
exports.achievementType = achievementType;
function saveCryptoAccountResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    else if (value === "NameTaken") {
        return { kind: "name_taken" };
    }
    else {
        console.warn("saveCryptoAccountResponse failed with: ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.saveCryptoAccountResponse = saveCryptoAccountResponse;
function savedCryptoAccountsResponse(value) {
    if ("Success" in value) {
        return value.Success;
    }
    return [];
}
exports.savedCryptoAccountsResponse = savedCryptoAccountsResponse;
function tipMessageResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    if (value === "PinRequired") {
        return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
    }
    if (typeof value === "object") {
        if ("PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
            return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
        }
    }
    console.warn("tipMessage failed with: ", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.tipMessageResponse = tipMessageResponse;
function publicProfileResponse(value) {
    const profile = value.Success;
    return {
        username: profile.username,
        displayName: profile.display_name,
        avatarId: profile.avatar_id,
        bio: profile.bio,
        isPremium: profile.is_premium,
        phoneIsVerified: profile.phone_is_verified,
        created: profile.created,
    };
}
exports.publicProfileResponse = publicProfileResponse;
function setBioResponse(value) {
    if (typeof value === "object" && "TooLong" in value) {
        return "bio_too_long";
    }
    return (0, commonResponseMapper_1.mapCommonResponses)(value, "SetBio");
}
exports.setBioResponse = setBioResponse;
function searchDirectChatResponse(value, chatId) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                matches: value.Success.matches.map((m) => (0, chatMappersV2_1.messageMatch)(m, chatId)),
            };
        }
        if ("TermTooShort" in value || "TermTooLong" in value) {
            return {
                kind: "term_invalid",
            };
        }
    }
    if (value === "ChatNotFound") {
        return {
            kind: "chat_not_found",
        };
    }
    if (value === "InvalidTerm") {
        return {
            kind: "term_invalid",
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown UserIndex.ApiSearchMessagesResponse type received", value);
}
exports.searchDirectChatResponse = searchDirectChatResponse;
function deleteMessageResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("Unexpected ApiDeleteMessageResponse type received", value);
        return "failure";
    }
}
exports.deleteMessageResponse = deleteMessageResponse;
function undeleteMessageResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        if (value.Success.messages.length == 0) {
            return openchat_shared_1.CommonResponses.failure();
        }
        else {
            return {
                kind: "success",
                message: (0, chatMappersV2_1.message)(value.Success.messages[0]),
            };
        }
    }
    else {
        console.warn("Unexpected ApiUndeleteMessageResponse type received", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.undeleteMessageResponse = undeleteMessageResponse;
function setAvatarResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "UserSuspended") {
        return "user_suspended";
    }
    if (typeof value === "object" && "AvatarTooBig" in value) {
        return "avatar_too_big";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSetAvatarResponse type received", value);
}
exports.setAvatarResponse = setAvatarResponse;
function pinChatResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("Unexpected ApiPinChatResponse type received", value);
        return "failure";
    }
}
exports.pinChatResponse = pinChatResponse;
function archiveChatResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("Archive/Unarchive chat failed with ", value);
        return "failure";
    }
}
exports.archiveChatResponse = archiveChatResponse;
function sendMessageWithTransferToChannelResponse(value, sender, recipient) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "transfer_success",
                timestamp: value.Success.timestamp,
                messageIndex: value.Success.message_index,
                eventIndex: value.Success.event_index,
                expiresAt: (0, mapping_1.mapOptional)(value.Success.expires_at, Number),
                transfer: (0, chatMappersV2_1.completedCryptoTransfer)(value.Success.transfer, sender, recipient ?? ""),
            };
        }
        if ("PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
            return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
        }
    }
    if (value === "PinRequired") {
        return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
    }
    console.warn("SendMessageWithTransferToChannel failed with", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.sendMessageWithTransferToChannelResponse = sendMessageWithTransferToChannelResponse;
function sendMessageWithTransferToGroupResponse(value, sender, recipient) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "transfer_success",
                timestamp: value.Success.timestamp,
                messageIndex: value.Success.message_index,
                eventIndex: value.Success.event_index,
                expiresAt: (0, mapping_1.mapOptional)(value.Success.expires_at, Number),
                transfer: (0, chatMappersV2_1.completedCryptoTransfer)(value.Success.transfer, sender, recipient ?? ""),
            };
        }
        if ("PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
            return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
        }
    }
    if (value === "PinRequired") {
        return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
    }
    console.warn("SendMessageWithTransferToGroup failed with", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.sendMessageWithTransferToGroupResponse = sendMessageWithTransferToGroupResponse;
function sendMessageResponse(value, sender, recipient) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                timestamp: value.Success.timestamp,
                messageIndex: value.Success.message_index,
                eventIndex: value.Success.event_index,
                expiresAt: (0, mapping_1.mapOptional)(value.Success.expires_at, Number),
            };
        }
        if ("TransferSuccessV2" in value) {
            return {
                kind: "transfer_success",
                timestamp: value.TransferSuccessV2.timestamp,
                messageIndex: value.TransferSuccessV2.message_index,
                eventIndex: value.TransferSuccessV2.event_index,
                transfer: (0, chatMappersV2_1.completedCryptoTransfer)(value.TransferSuccessV2.transfer, sender, recipient),
                expiresAt: (0, mapping_1.mapOptional)(value.TransferSuccessV2.expires_at, Number),
            };
        }
        if ("InvalidRequest" in value) {
            return { kind: "invalid_request", reason: value.InvalidRequest };
        }
        if ("TextTooLong" in value) {
            return { kind: "text_too_long" };
        }
        if ("InternalError" in value) {
            return { kind: "internal_error" };
        }
        if ("TransferFailed" in value) {
            return { kind: "transfer_failed" };
        }
        if ("InvalidPoll" in value) {
            return { kind: "invalid_poll" };
        }
        if ("P2PSwapSetUpFailed" in value) {
            return { kind: "p2p_swap_setup_failed", text: value.P2PSwapSetUpFailed };
        }
    }
    if (value === "TransferCannotBeZero") {
        return { kind: "transfer_cannot_be_zero" };
    }
    if (value === "TransferCannotBeToSelf") {
        return { kind: "transfer_cannot_be_to_self" };
    }
    if (value === "RecipientBlocked") {
        return { kind: "recipient_blocked" };
    }
    if (value === "MessageEmpty") {
        return { kind: "message_empty" };
    }
    if (value === "RecipientNotFound") {
        return { kind: "recipient_not_found" };
    }
    if (value === "UserSuspended") {
        return { kind: "user_suspended" };
    }
    if (value === "DuplicateMessageId") {
        return { kind: "duplicate_message_id" };
    }
    if (value === "PinRequired" || "PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
        return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSendMessageResponse type received", value);
}
exports.sendMessageResponse = sendMessageResponse;
function createCommunityResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return { kind: "success", id: (0, mapping_1.principalBytesToString)(value.Success.community_id) };
    }
    else if (value === "NameTaken") {
        return { kind: "name_taken" };
    }
    else {
        console.warn("CreateCommunity failed with", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.createCommunityResponse = createCommunityResponse;
async function getEventsResponse(principal, value, chatId, latestKnownUpdatePreRequest) {
    if (typeof value === "object") {
        if ("Success" in value) {
            await (0, replicaUpToDateChecker_1.ensureReplicaIsUpToDate)(principal, chatId, value.Success.chat_last_updated);
            return (0, chatMappersV2_1.eventsSuccessResponse)(value.Success);
        }
        if ("ReplicaNotUpToDateV2" in value) {
            throw error_1.ReplicaNotUpToDateError.byTimestamp(value.ReplicaNotUpToDateV2, latestKnownUpdatePreRequest ?? BigInt(-1), false);
        }
    }
    if (value === "ChatNotFound" || value === "ThreadMessageNotFound") {
        return "events_failed";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiEventsResponse type received", value);
}
exports.getEventsResponse = getEventsResponse;
function groupChatsInitial(value) {
    return {
        summaries: value.summaries.map(userCanisterGroupSummary),
        pinned: value.pinned.map((c) => ({
            kind: "group_chat",
            groupId: (0, mapping_1.principalBytesToString)(c),
        })),
    };
}
function directChatsInitial(value) {
    return {
        summaries: value.summaries.map(directChatSummary),
        pinned: value.pinned.map((c) => ({
            kind: "direct_chat",
            userId: (0, mapping_1.principalBytesToString)(c),
        })),
    };
}
function userCanisterChannelSummary(value, communityId) {
    return {
        id: {
            kind: "channel",
            communityId: communityId,
            channelId: value.channel_id.toString(),
        },
        readByMeUpTo: value.read_by_me_up_to,
        dateReadPinned: value.date_read_pinned,
        threadsRead: Object.entries(value.threads_read).reduce((curr, next) => {
            curr[Number(next[0])] = next[1];
            return curr;
        }, {}),
        archived: value.archived,
    };
}
function userCanisterCommunitySummary(value) {
    const communityId = (0, mapping_1.principalBytesToString)(value.community_id);
    return {
        id: { kind: "community", communityId },
        index: value.index,
        channels: value.channels.map((c) => userCanisterChannelSummary(c, communityId)),
        pinned: value.pinned.map((p) => ({
            kind: "channel",
            communityId,
            channelId: p.toString(),
        })),
        archived: value.archived,
        localUserIndex: (0, mapping_1.principalBytesToString)(value.local_user_index_canister_id),
    };
}
function communitiesInitial(value) {
    return {
        summaries: value.summaries.map(userCanisterCommunitySummary),
    };
}
function chatIdentifier(value) {
    if ("Group" in value) {
        return { kind: "group_chat", groupId: (0, mapping_1.principalBytesToString)(value.Group) };
    }
    if ("Direct" in value) {
        return { kind: "direct_chat", userId: (0, mapping_1.principalBytesToString)(value.Direct) };
    }
    if ("Channel" in value) {
        return {
            kind: "channel",
            communityId: (0, mapping_1.principalBytesToString)(value.Channel[0]),
            channelId: value.Channel[1].toString(),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiChat type received", value);
}
function favouriteChatsInitial(value) {
    return {
        chats: value.chats.map(chatIdentifier),
        pinned: value.pinned.map(chatIdentifier),
    };
}
function initialStateResponse(value) {
    if ("Success" in value) {
        const result = value.Success;
        return {
            blockedUsers: result.blocked_users.map(mapping_1.principalBytesToString),
            communities: communitiesInitial(value.Success.communities),
            groupChats: groupChatsInitial(value.Success.group_chats),
            favouriteChats: favouriteChatsInitial(value.Success.favourite_chats),
            avatarId: result.avatar_id,
            directChats: directChatsInitial(value.Success.direct_chats),
            timestamp: result.timestamp,
            suspended: result.suspended,
            pinNumberSettings: (0, mapping_1.mapOptional)(result.pin_number_settings, pinNumberSettings),
            localUserIndex: (0, mapping_1.principalBytesToString)(result.local_user_index_canister_id),
            achievementsLastSeen: result.achievements_last_seen,
            achievements: result.achievements.map(chitEarned),
            streakEnds: result.streak_ends,
            streak: result.streak,
            nextDailyClaim: result.next_daily_claim,
            chitBalance: result.chit_balance,
            totalChitEarned: result.total_chit_earned,
            referrals: result.referrals.map(referral),
            walletConfig: walletConfig(result.wallet_config),
            messageActivitySummary: messageActivitySummary(result.message_activity_summary),
        };
    }
    throw new Error(`Unexpected ApiUpdatesResponse type received: ${value}`);
}
exports.initialStateResponse = initialStateResponse;
function messageActivitySummary(value) {
    return {
        readUpToTimestamp: value.read_up_to,
        latestTimestamp: value.latest_event_timestamp,
        unreadCount: value.unread_count,
    };
}
function referral(value) {
    return {
        userId: (0, mapping_1.principalBytesToString)(value.user_id),
        status: referralStatus(value.status),
    };
}
function apiWalletConfig(domain) {
    switch (domain.kind) {
        case "auto_wallet": {
            return { Auto: { min_cents_visible: Math.round(domain.minDollarValue * 100) } };
        }
        case "manual_wallet": {
            return { Manual: { tokens: [...domain.tokens].map(mapping_1.principalStringToBytes) } };
        }
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected WalletConfig value received", domain);
}
exports.apiWalletConfig = apiWalletConfig;
function walletConfig(value) {
    if ("Auto" in value) {
        return {
            kind: "auto_wallet",
            minDollarValue: value.Auto.min_cents_visible / 100,
        };
    }
    if ("Manual" in value) {
        return {
            kind: "manual_wallet",
            tokens: new Set(value.Manual.tokens.map(mapping_1.principalBytesToString)),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiWalletConfig value received", value);
}
function pinNumberSettings(value) {
    return {
        length: value.length,
        attemptsBlockedUntil: value.attempts_blocked_until,
    };
}
function userCanisterChannelSummaryUpdates(value, communityId) {
    return {
        id: { kind: "channel", communityId, channelId: value.channel_id.toString() },
        readByMeUpTo: value.read_by_me_up_to,
        dateReadPinned: value.date_read_pinned,
        threadsRead: Object.entries(value.threads_read).reduce((curr, next) => {
            curr[Number(next[0])] = next[1];
            return curr;
        }, {}),
        archived: value.archived,
    };
}
exports.userCanisterChannelSummaryUpdates = userCanisterChannelSummaryUpdates;
function userCanisterCommunitySummaryUpdates(value) {
    const communityId = (0, mapping_1.principalBytesToString)(value.community_id);
    return {
        id: { kind: "community", communityId },
        index: value.index,
        channels: value.channels.map((c) => userCanisterChannelSummaryUpdates(c, communityId)),
        pinned: (0, mapping_1.mapOptional)(value.pinned, (p) => p.map((p) => ({ kind: "channel", communityId, channelId: p.toString() }))),
        archived: value.archived,
    };
}
exports.userCanisterCommunitySummaryUpdates = userCanisterCommunitySummaryUpdates;
function communitiesUpdates(value) {
    return {
        added: value.added.map(userCanisterCommunitySummary),
        updated: value.updated.map(userCanisterCommunitySummaryUpdates),
        removed: value.removed.map(mapping_1.principalBytesToString),
    };
}
exports.communitiesUpdates = communitiesUpdates;
function favouriteChatsUpdates(value) {
    return {
        chats: (0, mapping_1.mapOptional)(value.chats, (c) => c.map(chatIdentifier)),
        pinned: (0, mapping_1.mapOptional)(value.pinned, (c) => c.map(chatIdentifier)),
    };
}
exports.favouriteChatsUpdates = favouriteChatsUpdates;
function groupChatsUpdates(value) {
    return {
        added: value.added.map(userCanisterGroupSummary),
        pinned: (0, mapping_1.mapOptional)(value.pinned, (p) => p.map((p) => ({ kind: "group_chat", groupId: (0, mapping_1.principalBytesToString)(p) }))),
        updated: value.updated.map(userCanisterGroupSummaryUpdates),
        removed: value.removed.map(mapping_1.principalBytesToString),
    };
}
exports.groupChatsUpdates = groupChatsUpdates;
function directChatsUpdates(value) {
    return {
        added: value.added.map(directChatSummary),
        pinned: (0, mapping_1.mapOptional)(value.pinned, (p) => p.map((p) => ({ kind: "direct_chat", userId: (0, mapping_1.principalBytesToString)(p) }))),
        updated: value.updated.map(directChatSummaryUpdates),
    };
}
exports.directChatsUpdates = directChatsUpdates;
function manageFavouritesResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("ApiManageFavouriteChatsResponse failure response", value);
        return "failure";
    }
}
exports.manageFavouritesResponse = manageFavouritesResponse;
function getUpdatesResponse(value) {
    if (value === "SuccessNoUpdates") {
        return {
            kind: "success_no_updates",
        };
    }
    if ("Success" in value) {
        const result = value.Success;
        return {
            kind: "success",
            timestamp: result.timestamp,
            blockedUsers: (0, mapping_1.mapOptional)(result.blocked_users, (b) => b.map(mapping_1.principalBytesToString)),
            communities: communitiesUpdates(result.communities),
            favouriteChats: favouriteChatsUpdates(result.favourite_chats),
            groupChats: groupChatsUpdates(result.group_chats),
            avatarId: (0, mapping_1.optionUpdateV2)(result.avatar_id, mapping_1.identity),
            directChats: directChatsUpdates(result.direct_chats),
            suspended: result.suspended,
            pinNumberSettings: (0, mapping_1.optionUpdateV2)(result.pin_number_settings, pinNumberSettings),
            achievementsLastSeen: result.achievements_last_seen,
            achievements: result.achievements.map(chitEarned),
            streakEnds: result.streak_ends,
            streak: result.streak,
            nextDailyClaim: result.next_daily_claim,
            chitBalance: result.chit_balance,
            totalChitEarned: result.total_chit_earned,
            referrals: result.referrals.map(referral),
            walletConfig: (0, mapping_1.mapOptional)(result.wallet_config, walletConfig),
            messageActivitySummary: (0, mapping_1.mapOptional)(result.message_activity_summary, messageActivitySummary),
        };
    }
    throw new Error(`Unexpected ApiUpdatesResponse type received: ${value}`);
}
exports.getUpdatesResponse = getUpdatesResponse;
function userCanisterGroupSummary(summary) {
    return {
        id: { kind: "group_chat", groupId: (0, mapping_1.principalBytesToString)(summary.chat_id) },
        readByMeUpTo: summary.read_by_me_up_to,
        threadsRead: Object.entries(summary.threads_read).reduce((curr, next) => {
            curr[Number(next[0])] = next[1];
            return curr;
        }, {}),
        archived: summary.archived,
        dateReadPinned: summary.date_read_pinned,
        localUserIndex: (0, mapping_1.principalBytesToString)(summary.local_user_index_canister_id),
    };
}
function userCanisterGroupSummaryUpdates(summary) {
    return {
        id: { kind: "group_chat", groupId: (0, mapping_1.principalBytesToString)(summary.chat_id) },
        readByMeUpTo: summary.read_by_me_up_to,
        threadsRead: Object.entries(summary.threads_read).reduce((curr, next) => {
            curr[Number(next[0])] = next[1];
            return curr;
        }, {}),
        archived: summary.archived,
        dateReadPinned: summary.date_read_pinned,
    };
}
function directChatSummaryUpdates(value) {
    return {
        kind: "direct_chat",
        id: { kind: "direct_chat", userId: (0, mapping_1.principalBytesToString)(value.chat_id) },
        readByMeUpTo: value.read_by_me_up_to,
        readByThemUpTo: value.read_by_them_up_to,
        lastUpdated: value.last_updated,
        latestMessage: (0, mapping_1.mapOptional)(value.latest_message, chatMappersV2_1.messageEvent),
        latestEventIndex: value.latest_event_index,
        latestMessageIndex: value.latest_message_index,
        notificationsMuted: value.notifications_muted,
        updatedEvents: value.updated_events.map(updatedEvent),
        eventsTTL: (0, mapping_1.optionUpdateV2)(value.events_ttl, mapping_1.identity),
        eventsTtlLastUpdated: value.events_ttl_last_updated,
        metrics: (0, mapping_1.mapOptional)(value.metrics, chatMappersV2_1.chatMetrics),
        myMetrics: (0, mapping_1.mapOptional)(value.my_metrics, chatMappersV2_1.chatMetrics),
        archived: value.archived,
        videoCallInProgress: (0, mapping_1.optionUpdateV2)(value.video_call_in_progress, (v) => v.message_index),
    };
}
function updatedEvent([eventIndex, timestamp]) {
    return {
        eventIndex,
        timestamp,
    };
}
function directChatSummary(value) {
    return {
        id: { kind: "direct_chat", userId: (0, mapping_1.principalBytesToString)(value.them) },
        kind: "direct_chat",
        latestMessage: (0, chatMappersV2_1.messageEvent)(value.latest_message),
        them: { kind: "direct_chat", userId: (0, mapping_1.principalBytesToString)(value.them) },
        latestEventIndex: value.latest_event_index,
        latestMessageIndex: value.latest_message_index,
        lastUpdated: value.last_updated,
        readByThemUpTo: value.read_by_them_up_to,
        dateCreated: value.date_created,
        eventsTTL: undefined,
        eventsTtlLastUpdated: BigInt(0),
        metrics: (0, chatMappersV2_1.chatMetrics)(value.metrics),
        videoCallInProgress: (0, mapping_1.mapOptional)(value.video_call_in_progress, (v) => v.message_index),
        membership: {
            ...(0, openchat_shared_1.nullMembership)(),
            role: "owner",
            myMetrics: (0, chatMappersV2_1.chatMetrics)(value.my_metrics),
            notificationsMuted: value.notifications_muted,
            readByMeUpTo: value.read_by_me_up_to,
            archived: value.archived,
            rulesAccepted: false,
        },
    };
}
function failedNnsCryptoWithdrawal(value) {
    return {
        kind: "failed",
        ledger: (0, mapping_1.principalBytesToString)(value.ledger),
        to: value.to !== "Mint" ? (0, mapping_1.bytesToHexString)(value.to.Account) : "",
        amountE8s: value.amount.e8s,
        feeE8s: value.fee.e8s,
        memo: value.memo,
        errorMessage: value.error_message,
    };
}
function failedIcrc1CryptoWithdrawal(value) {
    return {
        kind: "failed",
        ledger: (0, mapping_1.principalBytesToString)(value.ledger),
        to: value.to !== "Mint" ? formatIcrc1Account(value.to.Account) : "",
        amountE8s: value.amount,
        feeE8s: value.fee,
        memo: (0, mapping_1.mapOptional)(value.memo, mapping_1.bytesToBigint) ?? BigInt(0),
        errorMessage: value.error_message,
    };
}
function completedNnsCryptoWithdrawal(value) {
    return {
        kind: "completed",
        ledger: (0, mapping_1.principalBytesToString)(value.ledger),
        to: value.to !== "Mint" ? (0, mapping_1.bytesToHexString)(value.to.Account) : "",
        amountE8s: value.amount.e8s,
        feeE8s: value.fee.e8s,
        memo: value.memo,
        blockIndex: value.block_index,
    };
}
function completedIcrc1CryptoWithdrawal(value) {
    return {
        kind: "completed",
        ledger: (0, mapping_1.principalBytesToString)(value.ledger),
        to: value.to !== "Mint" ? formatIcrc1Account(value.to.Account) : "",
        amountE8s: value.amount,
        feeE8s: value.fee,
        memo: (0, mapping_1.mapOptional)(value.memo, mapping_1.bytesToBigint) ?? BigInt(0),
        blockIndex: value.block_index,
    };
}
function withdrawCryptoResponse(value) {
    if (typeof value === "object") {
        if ("PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
            return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
        }
        if ("TransactionFailed" in value) {
            if ("NNS" in value.TransactionFailed) {
                return failedNnsCryptoWithdrawal(value.TransactionFailed.NNS);
            }
            else if ("ICRC1" in value.TransactionFailed) {
                return failedIcrc1CryptoWithdrawal(value.TransactionFailed.ICRC1);
            }
        }
        if ("Success" in value) {
            if ("NNS" in value.Success) {
                return completedNnsCryptoWithdrawal(value.Success.NNS);
            }
            else if ("ICRC1" in value.Success) {
                return completedIcrc1CryptoWithdrawal(value.Success.ICRC1);
            }
        }
    }
    if (value === "PinRequired") {
        return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
    }
    if (value === "CurrencyNotSupported") {
        return { kind: "currency_not_supported" };
    }
    throw new Error("Unexpected ApiWithdrawCryptocurrencyResponse type received");
}
exports.withdrawCryptoResponse = withdrawCryptoResponse;
function formatIcrc1Account(value) {
    const owner = (0, mapping_1.principalBytesToString)(value.owner);
    const subaccount = (0, mapping_1.mapOptional)(value.subaccount, mapping_1.bytesToHexString);
    return subaccount !== undefined ? `${owner}:${subaccount}` : owner;
}
function deletedMessageResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                content: (0, chatMappersV2_1.messageContent)(value.Success.content, "unknown"),
            };
        }
    }
    if (value === "MessageHardDeleted") {
        return { kind: "message_hard_deleted" };
    }
    return {
        kind: (0, commonResponseMapper_1.mapCommonResponses)(value, "DeletedMessage"),
    };
}
exports.deletedMessageResponse = deletedMessageResponse;
function setMessageReminderResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return "success";
    }
    else {
        console.warn("SetMessageReminder failed with", value);
        return "failure";
    }
}
exports.setMessageReminderResponse = setMessageReminderResponse;
function leaveCommunityResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("LeaveCommunity failed with", value);
        return "failure";
    }
}
exports.leaveCommunityResponse = leaveCommunityResponse;
function deleteCommunityResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("DeleteCommunity failed with", value);
        return "failure";
    }
}
exports.deleteCommunityResponse = deleteCommunityResponse;
function proposalToSubmit(proposal) {
    return {
        title: proposal.title,
        url: proposal.url ?? "",
        summary: proposal.summary,
        action: proposalAction(proposal.action),
    };
}
exports.proposalToSubmit = proposalToSubmit;
function proposalAction(action) {
    switch (action.kind) {
        case "motion":
            return "Motion";
        case "transfer_sns_funds":
            return {
                TransferSnsTreasuryFunds: {
                    to: {
                        owner: (0, mapping_1.principalStringToBytes)(action.recipient.owner),
                        subaccount: (0, mapping_1.mapOptional)(action.recipient.subaccount, (s) => [...(0, mapping_1.hexStringToBytes)(s)]),
                    },
                    amount: action.amount,
                    memo: undefined,
                    treasury: action.treasury,
                },
            };
        case "upgrade_sns_to_next_version":
            return "UpgradeSnsToNextVersion";
        case "execute_generic_nervous_system_function":
            return {
                ExecuteGenericNervousSystemFunction: {
                    function_id: action.functionId,
                    payload: action.payload,
                },
            };
    }
}
function submitProposalResponse(value) {
    if (value === "Success") {
        return { kind: "success" };
    }
    if (value === "GovernanceCanisterNotSupported") {
        return { kind: "governance_canister_not_supported" };
    }
    if (value === "UserSuspended") {
        return { kind: "user_suspended" };
    }
    if (typeof value === "object") {
        if ("Retrying" in value) {
            return { kind: "retrying", error: value.Retrying };
        }
        if ("InsufficientPayment" in value) {
            return { kind: "insufficient_payment" };
        }
        if ("TransferFailed" in value) {
            return { kind: "transfer_failed", error: value.TransferFailed };
        }
        if ("InternalError" in value) {
            return { kind: "internal_error", error: value.InternalError };
        }
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSubmitProposalResponse type received", value);
}
exports.submitProposalResponse = submitProposalResponse;
function reportMessageResponse(value) {
    return value === "Success" || value === "AlreadyReported";
}
exports.reportMessageResponse = reportMessageResponse;
function swapTokensResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                amountOut: value.Success.amount_out,
            };
        }
        if ("InternalError" in value) {
            return {
                kind: "internal_error",
                error: value.InternalError,
            };
        }
        if ("PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
            return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
        }
    }
    if (value === "SwapFailed") {
        return {
            kind: "swap_failed",
        };
    }
    if (value === "PinRequired") {
        return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSwapTokensResponse type received", value);
}
exports.swapTokensResponse = swapTokensResponse;
function tokenSwapStatusResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            started: value.Success.started,
            depositAccount: (0, mapping_1.mapOptional)(value.Success.deposit_account, result),
            transfer: (0, mapping_1.mapOptional)(value.Success.transfer, result),
            notifyDex: (0, mapping_1.mapOptional)(value.Success.notify_dex, result),
            amountSwapped: (0, mapping_1.mapOptional)(value.Success.amount_swapped, resultOfResult),
            withdrawnFromDex: (0, mapping_1.mapOptional)(value.Success.withdraw_from_dex, result),
        };
    }
    if (value === "NotFound") {
        return {
            kind: "not_found",
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiTokenSwapStatusResponse type received", value);
}
exports.tokenSwapStatusResponse = tokenSwapStatusResponse;
function result(value) {
    if ("Ok" in value) {
        return {
            kind: "ok",
            value: value.Ok,
        };
    }
    return {
        kind: "error",
        error: value.Err,
    };
}
function resultOfResult(value) {
    if ("Ok" in value) {
        return {
            kind: "ok",
            value: result(value.Ok),
        };
    }
    return {
        kind: "error",
        error: value.Err,
    };
}
function approveTransferResponse(value) {
    if (value === "Success") {
        return { kind: "success" };
    }
    if (typeof value === "object") {
        if ("InternalError" in value) {
            return { kind: "internal_error", error: value.InternalError };
        }
        if ("ApproveError" in value) {
            return { kind: "approve_error", error: JSON.stringify(value.ApproveError) };
        }
        if ("PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
            return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
        }
    }
    if (value === "PinRequired") {
        return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiApproveTransferResponse type received", value);
}
exports.approveTransferResponse = approveTransferResponse;
function apiExchangeArgs(args) {
    const value = {
        swap_canister_id: (0, mapping_1.principalStringToBytes)(args.swapCanisterId),
        zero_for_one: args.zeroForOne,
    };
    if (args.dex === "icpswap") {
        return {
            ICPSwap: value,
        };
    }
    else if (args.dex === "kongswap") {
        return {
            KongSwap: value,
        };
    }
    else if (args.dex === "sonic") {
        return {
            Sonic: value,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected dex", args.dex);
}
exports.apiExchangeArgs = apiExchangeArgs;
function claimDailyChitResponse(value) {
    if ("Success" in value) {
        return {
            kind: "success",
            streak: value.Success.streak,
            chitBalance: value.Success.chit_balance,
            chitEarned: value.Success.chit_earned,
            nextDailyChitClaim: value.Success.next_claim,
        };
    }
    if ("AlreadyClaimed" in value) {
        return {
            kind: "already_claimed",
            nextDailyChitClaim: value.AlreadyClaimed,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiClaimDailyChitResponse type received", value);
}
exports.claimDailyChitResponse = claimDailyChitResponse;
function apiVerification(domain) {
    switch (domain.kind) {
        case "delegation_verification":
            return { Delegation: (0, id_1.signedDelegation)(domain.delegation) };
        case "no_verification":
            return "None";
        case "pin_verification":
            return { PIN: domain.pin };
    }
}
exports.apiVerification = apiVerification;
