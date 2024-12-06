"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageEvent = exports.messagesSuccessResponse = exports.groupSubtype = exports.addRemoveReactionResponse = exports.gateCheckFailedReason = exports.updatedEvent = exports.threadSyncDetails = exports.communityChannelSummary = exports.userGroup = exports.communitySummary = exports.groupChatSummary = exports.apiProposalVote = exports.proposalVote = exports.apiPendingCryptocurrencyWithdrawal = exports.apiPendingCryptoTransaction = exports.apiPendingCryptoContent = exports.apiP2PSwapContentInitial = exports.apiPrizeContentInitial = exports.accessGate = exports.accessGateConfig = exports.credentialArguments = exports.apiAccessGate = exports.apiAccessGateConfig = exports.apiMaybeAccessGate = exports.apiMaybeAccessGateConfig = exports.apiMessageContent = exports.apiReplyContextArgs = exports.apiMultiUserChat = exports.memberRole = exports.chatMetrics = exports.permissionRole = exports.apiPermissionRole = exports.apiGroupPermissions = exports.apiCommunityPermissionRole = exports.apiCommunityPermissions = exports.communityPermissionRole = exports.communityPermissions = exports.groupPermissions = exports.failedCryptoTransfer = exports.completedCryptoTransfer = exports.apiToken = exports.token = exports.apiUser = exports.messageContent = exports.threadSummary = exports.tips = exports.message = exports.event = exports.eventWrapper = exports.eventsSuccessResponse = void 0;
exports.apiDexId = exports.setPinNumberResponse = exports.videoCallParticipantsResponse = exports.setVideoCallPresence = exports.apiVideoCallPresence = exports.joinVideoCallResponse = exports.cancelP2PSwapResponse = exports.acceptP2PSwapResponse = exports.statusError = exports.claimPrizeResponse = exports.registerProposalVoteResponse = exports.disableInviteCodeResponse = exports.enableOrResetInviteCodeResponse = exports.inviteCodeResponse = exports.messageMatch = exports.searchGroupChatResponse = exports.joinGroupResponse = exports.apiChatIdentifier = exports.registerPollVoteResponse = exports.changeRoleResponse = exports.threadPreview = exports.threadPreviewsResponse = exports.undeleteMessageResponse = exports.deletedMessageResponse = exports.deleteMessageResponse = exports.leaveGroupResponse = exports.declineInvitationResponse = exports.editMessageResponse = exports.member = exports.groupDetailsUpdatesResponse = exports.groupDetailsResponse = exports.unpinMessageResponse = exports.pinMessageResponse = exports.deleteGroupResponse = exports.createGroupResponse = exports.updateGroupResponse = exports.expiredMessagesRange = exports.expiredEventsRange = exports.mentions = exports.mention = void 0;
const mapping_1 = require("../../utils/mapping");
const openchat_shared_1 = require("openchat-shared");
const pinNumberErrorMapper_1 = require("./pinNumberErrorMapper");
const list_1 = require("../../utils/list");
const error_1 = require("../error");
const E8S_AS_BIGINT = BigInt(100000000);
function eventsSuccessResponse(value) {
    return {
        events: value.events.map(eventWrapper),
        expiredEventRanges: value.expired_event_ranges.map(expiredEventsRange),
        expiredMessageRanges: value.expired_message_ranges.map(expiredMessagesRange),
        latestEventIndex: value.latest_event_index,
    };
}
exports.eventsSuccessResponse = eventsSuccessResponse;
function eventWrapper(value) {
    return {
        event: event(value.event),
        index: value.index,
        timestamp: value.timestamp,
        expiresAt: (0, mapping_1.mapOptional)(value.expires_at, Number),
    };
}
exports.eventWrapper = eventWrapper;
function event(value) {
    if (value === "Empty" || value === "FailedToDeserialize") {
        return { kind: "empty" };
    }
    if ("Message" in value) {
        return message(value.Message);
    }
    if ("GroupChatCreated" in value) {
        return {
            kind: "group_chat_created",
            name: value.GroupChatCreated.name,
            description: value.GroupChatCreated.description,
            created_by: (0, mapping_1.principalBytesToString)(value.GroupChatCreated.created_by),
        };
    }
    if ("DirectChatCreated" in value) {
        return {
            kind: "direct_chat_created",
        };
    }
    if ("ParticipantsAdded" in value) {
        return {
            kind: "members_added",
            userIds: value.ParticipantsAdded.user_ids.map(mapping_1.principalBytesToString),
            addedBy: (0, mapping_1.principalBytesToString)(value.ParticipantsAdded.added_by),
        };
    }
    if ("UsersInvited" in value) {
        return {
            kind: "users_invited",
            userIds: value.UsersInvited.user_ids.map(mapping_1.principalBytesToString),
            invitedBy: (0, mapping_1.principalBytesToString)(value.UsersInvited.invited_by),
        };
    }
    if ("ParticipantJoined" in value) {
        return {
            kind: "member_joined",
            userId: (0, mapping_1.principalBytesToString)(value.ParticipantJoined.user_id),
        };
    }
    if ("ParticipantsRemoved" in value) {
        return {
            kind: "members_removed",
            userIds: value.ParticipantsRemoved.user_ids.map(mapping_1.principalBytesToString),
            removedBy: (0, mapping_1.principalBytesToString)(value.ParticipantsRemoved.removed_by),
        };
    }
    if ("ParticipantLeft" in value) {
        return {
            kind: "member_left",
            userId: (0, mapping_1.principalBytesToString)(value.ParticipantLeft.user_id),
        };
    }
    if ("GroupNameChanged" in value) {
        return {
            kind: "name_changed",
            changedBy: (0, mapping_1.principalBytesToString)(value.GroupNameChanged.changed_by),
        };
    }
    if ("GroupDescriptionChanged" in value) {
        return {
            kind: "desc_changed",
            changedBy: (0, mapping_1.principalBytesToString)(value.GroupDescriptionChanged.changed_by),
        };
    }
    if ("GroupRulesChanged" in value) {
        return {
            kind: "rules_changed",
            enabled: value.GroupRulesChanged.enabled,
            enabledPrev: value.GroupRulesChanged.prev_enabled,
            changedBy: (0, mapping_1.principalBytesToString)(value.GroupRulesChanged.changed_by),
        };
    }
    if ("AvatarChanged" in value) {
        return {
            kind: "avatar_changed",
            changedBy: (0, mapping_1.principalBytesToString)(value.AvatarChanged.changed_by),
        };
    }
    if ("UsersBlocked" in value) {
        return {
            kind: "users_blocked",
            userIds: value.UsersBlocked.user_ids.map(mapping_1.principalBytesToString),
            blockedBy: (0, mapping_1.principalBytesToString)(value.UsersBlocked.blocked_by),
        };
    }
    if ("UsersUnblocked" in value) {
        return {
            kind: "users_unblocked",
            userIds: value.UsersUnblocked.user_ids.map(mapping_1.principalBytesToString),
            unblockedBy: (0, mapping_1.principalBytesToString)(value.UsersUnblocked.unblocked_by),
        };
    }
    if ("RoleChanged" in value) {
        return {
            kind: "role_changed",
            userIds: value.RoleChanged.user_ids.map(mapping_1.principalBytesToString),
            changedBy: (0, mapping_1.principalBytesToString)(value.RoleChanged.changed_by),
            oldRole: memberRole(value.RoleChanged.old_role),
            newRole: memberRole(value.RoleChanged.new_role),
        };
    }
    if ("MessagePinned" in value) {
        return {
            kind: "message_pinned",
            pinnedBy: (0, mapping_1.principalBytesToString)(value.MessagePinned.pinned_by),
            messageIndex: value.MessagePinned.message_index,
        };
    }
    if ("MessageUnpinned" in value) {
        return {
            kind: "message_unpinned",
            unpinnedBy: (0, mapping_1.principalBytesToString)(value.MessageUnpinned.unpinned_by),
            messageIndex: value.MessageUnpinned.message_index,
        };
    }
    if ("PermissionsChanged" in value) {
        return {
            kind: "permissions_changed",
            oldPermissions: groupPermissions(value.PermissionsChanged.old_permissions_v2),
            newPermissions: groupPermissions(value.PermissionsChanged.new_permissions_v2),
            changedBy: (0, mapping_1.principalBytesToString)(value.PermissionsChanged.changed_by),
        };
    }
    if ("GroupVisibilityChanged" in value) {
        return {
            kind: "group_visibility_changed",
            public: (0, mapping_1.mapOptional)(value.GroupVisibilityChanged.public, mapping_1.identity),
            messagesVisibleToNonMembers: (0, mapping_1.mapOptional)(value.GroupVisibilityChanged.messages_visible_to_non_members, mapping_1.identity),
            changedBy: (0, mapping_1.principalBytesToString)(value.GroupVisibilityChanged.changed_by),
        };
    }
    if ("GroupInviteCodeChanged" in value) {
        let change = "disabled";
        if (value.GroupInviteCodeChanged.change === "Enabled") {
            change = "enabled";
        }
        else if (value.GroupInviteCodeChanged.change === "Reset") {
            change = "reset";
        }
        return {
            kind: "group_invite_code_changed",
            change,
            changedBy: (0, mapping_1.principalBytesToString)(value.GroupInviteCodeChanged.changed_by),
        };
    }
    if ("ChatFrozen" in value) {
        return {
            kind: "chat_frozen",
            frozenBy: (0, mapping_1.principalBytesToString)(value.ChatFrozen.frozen_by),
            reason: (0, mapping_1.mapOptional)(value.ChatFrozen.reason, mapping_1.identity),
        };
    }
    if ("ChatUnfrozen" in value) {
        return {
            kind: "chat_unfrozen",
            unfrozenBy: (0, mapping_1.principalBytesToString)(value.ChatUnfrozen.unfrozen_by),
        };
    }
    if ("EventsTimeToLiveUpdated" in value) {
        return {
            kind: "events_ttl_updated",
            updatedBy: (0, mapping_1.principalBytesToString)(value.EventsTimeToLiveUpdated.updated_by),
            newTimeToLive: (0, mapping_1.mapOptional)(value.EventsTimeToLiveUpdated.new_ttl, mapping_1.identity),
        };
    }
    if ("GroupGateUpdated" in value) {
        return {
            kind: "gate_updated",
            updatedBy: (0, mapping_1.principalBytesToString)(value.GroupGateUpdated.updated_by),
        };
    }
    if ("MembersAddedToDefaultChannel" in value) {
        return {
            kind: "members_added_to_default_channel",
            count: value.MembersAddedToDefaultChannel.count,
        };
    }
    if ("ExternalUrlUpdated" in value) {
        return {
            kind: "external_url_updated",
            newUrl: (0, mapping_1.mapOptional)(value.ExternalUrlUpdated.new_url, mapping_1.identity),
            updatedBy: (0, mapping_1.principalBytesToString)(value.ExternalUrlUpdated.updated_by),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiEventWrapper type received", value);
}
exports.event = event;
function message(value) {
    const sender = (0, mapping_1.principalBytesToString)(value.sender);
    const content = messageContent(value.content, sender);
    return {
        kind: "message",
        content,
        sender,
        repliesTo: (0, mapping_1.mapOptional)(value.replies_to, replyContext),
        messageId: value.message_id,
        messageIndex: value.message_index,
        reactions: reactions(value.reactions),
        tips: tips(value.tips),
        edited: value.edited,
        forwarded: value.forwarded,
        deleted: content.kind === "deleted_content",
        thread: (0, mapping_1.mapOptional)(value.thread_summary, threadSummary),
        blockLevelMarkdown: value.block_level_markdown,
    };
}
exports.message = message;
function tips(value) {
    return value.reduce((agg, [ledger, tips]) => {
        agg[(0, mapping_1.principalBytesToString)(ledger)] = tips.reduce((userTips, [userId, amount]) => {
            userTips[(0, mapping_1.principalBytesToString)(userId)] = amount;
            return userTips;
        }, {});
        return agg;
    }, {});
}
exports.tips = tips;
function threadSummary(value) {
    return {
        participantIds: new Set(value.participant_ids.map(mapping_1.principalBytesToString)),
        followedByMe: value.followed_by_me,
        numberOfReplies: Number(value.reply_count),
        latestEventIndex: Number(value.latest_event_index),
        latestEventTimestamp: value.latest_event_timestamp,
    };
}
exports.threadSummary = threadSummary;
function messageContent(value, sender) {
    if ("File" in value) {
        return fileContent(value.File);
    }
    if ("Text" in value) {
        return textContent(value.Text);
    }
    if ("Image" in value) {
        return imageContent(value.Image);
    }
    if ("Video" in value) {
        return videoContent(value.Video);
    }
    if ("Audio" in value) {
        return audioContent(value.Audio);
    }
    if ("Deleted" in value) {
        return deletedContent(value.Deleted);
    }
    if ("Crypto" in value) {
        return cryptoContent(value.Crypto, sender);
    }
    if ("Poll" in value) {
        return pollContent(value.Poll);
    }
    if ("Giphy" in value) {
        return giphyContent(value.Giphy);
    }
    if ("GovernanceProposal" in value) {
        return proposalContent(value.GovernanceProposal);
    }
    if ("Prize" in value) {
        return prizeContent(value.Prize);
    }
    if ("PrizeWinner" in value) {
        return prizeWinnerContent(sender, value.PrizeWinner);
    }
    if ("MessageReminderCreated" in value) {
        return messageReminderCreated(value.MessageReminderCreated);
    }
    if ("MessageReminder" in value) {
        return messageReminder(value.MessageReminder);
    }
    if ("Custom" in value) {
        return customContent(value.Custom);
    }
    if ("ReportedMessage" in value) {
        return reportedMessage(value.ReportedMessage);
    }
    if ("P2PSwap" in value) {
        return p2pSwapContent(value.P2PSwap);
    }
    if ("VideoCall" in value) {
        return videoCallContent(value.VideoCall);
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiMessageContent type received", value);
}
exports.messageContent = messageContent;
function reportedMessage(value) {
    return {
        kind: "reported_message_content",
        total: value.count,
        reports: value.reports.map((r) => ({
            notes: r.notes,
            reasonCode: r.reason_code,
            timestamp: Number(r.timestamp),
            reportedBy: (0, mapping_1.principalBytesToString)(r.reported_by),
        })),
    };
}
function customContent(value) {
    if (value.kind === "meme_fighter") {
        const decoder = new TextDecoder();
        const json = decoder.decode(value.data);
        const decoded = JSON.parse(json);
        return {
            kind: "meme_fighter_content",
            ...decoded,
        };
    }
    if (value.kind === "user_referral_card") {
        return {
            kind: "user_referral_card",
        };
    }
    throw new Error(`Unknown custom content kind received: ${value.kind}`);
}
function messageReminderCreated(value) {
    return {
        kind: "message_reminder_created_content",
        notes: value.notes,
        remindAt: Number(value.remind_at),
        reminderId: value.reminder_id,
        hidden: value.hidden,
    };
}
function messageReminder(value) {
    return {
        kind: "message_reminder_content",
        notes: value.notes,
        reminderId: value.reminder_id,
    };
}
function prizeWinnerContent(senderId, value) {
    return {
        kind: "prize_winner_content",
        transaction: completedCryptoTransfer(value.transaction, senderId, (0, mapping_1.principalBytesToString)(value.winner)),
        prizeMessageIndex: value.prize_message,
    };
}
function prizeContent(value) {
    return {
        kind: "prize_content",
        prizesRemaining: value.prizes_remaining,
        prizesPending: value.prizes_pending,
        diamondOnly: value.diamond_only,
        lifetimeDiamondOnly: value.lifetime_diamond_only,
        uniquePersonOnly: value.unique_person_only,
        streakOnly: value.streak_only,
        winners: value.winners.map(mapping_1.principalBytesToString),
        token: token(value.token),
        endDate: value.end_date,
        caption: value.caption,
    };
}
function videoCallContent(value) {
    return {
        kind: "video_call_content",
        ended: value.ended,
        participants: value.participants.map(videoCallParticipant),
        callType: videoCallType(value.call_type),
    };
}
function videoCallParticipant(value) {
    return {
        userId: (0, mapping_1.principalBytesToString)(value.user_id),
        joined: value.joined,
    };
}
function videoCallType(value) {
    if (value === "Default") {
        return "default";
    }
    if (value === "Broadcast") {
        return "broadcast";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiVideoCallTypye type received", value);
}
function p2pSwapContent(value) {
    return {
        kind: "p2p_swap_content",
        token0: tokenInfo(value.token0),
        token1: tokenInfo(value.token1),
        token0Amount: value.token0_amount,
        token1Amount: value.token1_amount,
        caption: value.caption,
        expiresAt: value.expires_at,
        status: p2pTradeStatus(value.status),
        swapId: value.swap_id,
        token0TxnIn: value.token0_txn_in,
    };
}
function tokenInfo(value) {
    return {
        fee: value.fee,
        decimals: value.decimals,
        symbol: token(value.token),
        ledger: (0, mapping_1.principalBytesToString)(value.ledger),
    };
}
function p2pTradeStatus(value) {
    if (value === "Open") {
        return { kind: "p2p_swap_open" };
    }
    if ("Reserved" in value) {
        return {
            kind: "p2p_swap_reserved",
            reservedBy: (0, mapping_1.principalBytesToString)(value.Reserved.reserved_by),
        };
    }
    if ("Accepted" in value) {
        return {
            kind: "p2p_swap_accepted",
            acceptedBy: (0, mapping_1.principalBytesToString)(value.Accepted.accepted_by),
            token1TxnIn: value.Accepted.token1_txn_in,
        };
    }
    if ("Cancelled" in value) {
        return {
            kind: "p2p_swap_cancelled",
            token0TxnOut: value.Cancelled.token0_txn_out,
        };
    }
    if ("Expired" in value) {
        return {
            kind: "p2p_swap_expired",
            token0TxnOut: value.Expired.token0_txn_out,
        };
    }
    if ("Completed" in value) {
        const { accepted_by, token1_txn_in, token0_txn_out, token1_txn_out } = value.Completed;
        return {
            kind: "p2p_swap_completed",
            acceptedBy: (0, mapping_1.principalBytesToString)(accepted_by),
            token1TxnIn: token1_txn_in,
            token0TxnOut: token0_txn_out,
            token1TxnOut: token1_txn_out,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiP2PSwapStatus type received", value);
}
function apiUser(domain) {
    return {
        user_id: (0, mapping_1.principalStringToBytes)(domain.userId),
        username: domain.username,
    };
}
exports.apiUser = apiUser;
function proposalContent(value) {
    return {
        kind: "proposal_content",
        governanceCanisterId: (0, mapping_1.principalBytesToString)(value.governance_canister_id),
        proposal: proposal(value.proposal),
        myVote: value.my_vote,
    };
}
function proposal(value) {
    if ("NNS" in value) {
        const p = value.NNS;
        return {
            kind: "nns",
            id: p.id,
            topic: p.topic,
            proposer: p.proposer.toString(),
            title: p.title,
            summary: p.summary,
            url: p.url,
            status: proposalDecisionStatus(p.status),
            rewardStatus: proposalRewardStatus(p.reward_status),
            tally: {
                yes: Number(p.tally.yes / E8S_AS_BIGINT),
                no: Number(p.tally.no / E8S_AS_BIGINT),
                total: Number(p.tally.total / E8S_AS_BIGINT),
                timestamp: p.tally.timestamp,
            },
            lastUpdated: Number(p.last_updated),
            created: Number(p.created),
            deadline: Number(p.deadline),
            payloadTextRendering: p.payload_text_rendering,
            minYesPercentageOfTotal: 3,
            minYesPercentageOfExercised: 50,
        };
    }
    else if ("SNS" in value) {
        const p = value.SNS;
        return {
            kind: "sns",
            id: p.id,
            action: Number(p.action),
            proposer: (0, mapping_1.bytesToHexString)(p.proposer),
            title: p.title,
            summary: p.summary,
            url: p.url,
            status: proposalDecisionStatus(p.status),
            rewardStatus: proposalRewardStatus(p.reward_status),
            tally: {
                yes: Number(p.tally.yes / E8S_AS_BIGINT),
                no: Number(p.tally.no / E8S_AS_BIGINT),
                total: Number(p.tally.total / E8S_AS_BIGINT),
                timestamp: p.tally.timestamp,
            },
            lastUpdated: Number(p.last_updated),
            created: Number(p.created),
            deadline: Number(p.deadline),
            payloadTextRendering: p.payload_text_rendering,
            minYesPercentageOfTotal: p.minimum_yes_proportion_of_total / 100,
            minYesPercentageOfExercised: p.minimum_yes_proportion_of_exercised / 100,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiProposal type received", value);
}
function proposalDecisionStatus(value) {
    if (value === "Failed")
        return openchat_shared_1.ProposalDecisionStatus.Failed;
    if (value === "Open")
        return openchat_shared_1.ProposalDecisionStatus.Open;
    if (value === "Rejected")
        return openchat_shared_1.ProposalDecisionStatus.Rejected;
    if (value === "Executed")
        return openchat_shared_1.ProposalDecisionStatus.Executed;
    if (value === "Adopted")
        return openchat_shared_1.ProposalDecisionStatus.Adopted;
    return openchat_shared_1.ProposalDecisionStatus.Unspecified;
}
function proposalRewardStatus(value) {
    if (value === "AcceptVotes")
        return openchat_shared_1.ProposalRewardStatus.AcceptVotes;
    if (value === "ReadyToSettle")
        return openchat_shared_1.ProposalRewardStatus.ReadyToSettle;
    if (value === "Settled")
        return openchat_shared_1.ProposalRewardStatus.Settled;
    return openchat_shared_1.ProposalRewardStatus.Unspecified;
}
function giphyContent(value) {
    return {
        kind: "giphy_content",
        title: value.title,
        caption: value.caption,
        desktop: giphyImageVariant(value.desktop),
        mobile: giphyImageVariant(value.mobile),
    };
}
function giphyImageVariant(value) {
    return {
        width: value.width,
        height: value.height,
        url: value.url,
        mimeType: value.mime_type,
    };
}
function pollContent(value) {
    return {
        kind: "poll_content",
        votes: pollVotes(value.votes),
        config: pollConfig(value.config),
        ended: value.ended,
    };
}
function pollConfig(value) {
    return {
        allowMultipleVotesPerUser: value.allow_multiple_votes_per_user,
        allowUserToChangeVote: value.allow_user_to_change_vote,
        text: value.text,
        showVotesBeforeEndDate: value.show_votes_before_end_date,
        endDate: value.end_date,
        anonymous: value.anonymous,
        options: value.options,
    };
}
function pollVotes(value) {
    return {
        total: totalPollVotes(value.total),
        user: value.user,
    };
}
function totalPollVotes(value) {
    if ("Anonymous" in value) {
        return {
            kind: "anonymous_poll_votes",
            votes: Object.entries(value.Anonymous).reduce((agg, [idx, num]) => {
                agg[Number(idx)] = num;
                return agg;
            }, {}),
        };
    }
    if ("Visible" in value) {
        return {
            kind: "visible_poll_votes",
            votes: Object.entries(value.Visible).reduce((agg, [idx, userIds]) => {
                agg[Number(idx)] = userIds.map(mapping_1.principalBytesToString);
                return agg;
            }, {}),
        };
    }
    if ("Hidden" in value) {
        return {
            kind: "hidden_poll_votes",
            votes: value.Hidden,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiTotalPollVotes type received", value);
}
function deletedContent(value) {
    return {
        kind: "deleted_content",
        deletedBy: (0, mapping_1.principalBytesToString)(value.deleted_by),
        timestamp: value.timestamp,
    };
}
function cryptoContent(value, sender) {
    return {
        kind: "crypto_content",
        caption: (0, mapping_1.mapOptional)(value.caption, mapping_1.identity),
        transfer: cryptoTransfer(value.transfer, sender, (0, mapping_1.principalBytesToString)(value.recipient)),
    };
}
function token(value) {
    if (value === "InternetComputer")
        return openchat_shared_1.ICP_SYMBOL;
    if (value === "SNS1")
        return openchat_shared_1.SNS1_SYMBOL;
    if (value === "CKBTC")
        return openchat_shared_1.CKBTC_SYMBOL;
    if (value === "CHAT")
        return openchat_shared_1.CHAT_SYMBOL;
    if (value === "KINIC")
        return openchat_shared_1.KINIC_SYMBOL;
    if ("Other" in value)
        return value.Other;
    throw new openchat_shared_1.UnsupportedValueError("Unexpected Cryptocurrency type received", value);
}
exports.token = token;
function apiToken(token) {
    switch (token) {
        case openchat_shared_1.ICP_SYMBOL:
            return "InternetComputer";
        case openchat_shared_1.SNS1_SYMBOL:
            return "SNS1";
        case openchat_shared_1.CKBTC_SYMBOL:
            return "CKBTC";
        case openchat_shared_1.CHAT_SYMBOL:
            return "CHAT";
        case openchat_shared_1.KINIC_SYMBOL:
            return "KINIC";
        default:
            return { Other: token };
    }
}
exports.apiToken = apiToken;
function cryptoTransfer(value, sender, recipient) {
    if ("Pending" in value) {
        return pendingCryptoTransfer(value.Pending, recipient);
    }
    if ("Completed" in value) {
        return completedCryptoTransfer(value.Completed, sender, recipient);
    }
    if ("Failed" in value) {
        return failedCryptoTransfer(value.Failed, recipient);
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiCryptoTransaction type received", value);
}
function pendingCryptoTransfer(value, recipient) {
    if ("NNS" in value) {
        const trans = value.NNS;
        return {
            kind: "pending",
            ledger: (0, mapping_1.principalBytesToString)(trans.ledger),
            token: token(trans.token),
            recipient,
            amountE8s: trans.amount.e8s,
            feeE8s: (0, mapping_1.mapOptional)(trans.fee, (f) => f.e8s),
            memo: trans.memo,
            createdAtNanos: trans.created,
        };
    }
    if ("ICRC1" in value) {
        return {
            kind: "pending",
            ledger: (0, mapping_1.principalBytesToString)(value.ICRC1.ledger),
            token: token(value.ICRC1.token),
            recipient,
            amountE8s: value.ICRC1.amount,
            feeE8s: value.ICRC1.fee,
            memo: (0, mapping_1.mapOptional)(value.ICRC1.memo, mapping_1.bytesToBigint),
            createdAtNanos: value.ICRC1.created,
        };
    }
    if ("ICRC2" in value) {
        throw new Error("ICRC2 is not supported yet");
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiPendingCryptoTransaction type received", value);
}
function completedCryptoTransfer(value, sender, recipient) {
    if ("NNS" in value) {
        const trans = value.NNS;
        return {
            kind: "completed",
            ledger: (0, mapping_1.principalBytesToString)(trans.ledger),
            recipient,
            sender,
            amountE8s: trans.amount.e8s,
            feeE8s: trans.fee.e8s,
            memo: trans.memo,
            blockIndex: trans.block_index,
        };
    }
    const trans = "ICRC1" in value ? value.ICRC1 : value.ICRC2;
    return {
        kind: "completed",
        ledger: (0, mapping_1.principalBytesToString)(trans.ledger),
        recipient,
        sender,
        amountE8s: trans.amount,
        feeE8s: trans.fee,
        memo: (0, mapping_1.mapOptional)(trans.memo, mapping_1.bytesToBigint) ?? BigInt(0),
        blockIndex: trans.block_index,
    };
}
exports.completedCryptoTransfer = completedCryptoTransfer;
function failedCryptoTransfer(value, recipient) {
    if ("NNS" in value) {
        const trans = value.NNS;
        return {
            kind: "failed",
            ledger: (0, mapping_1.principalBytesToString)(trans.ledger),
            recipient,
            amountE8s: trans.amount.e8s,
            feeE8s: trans.fee.e8s,
            memo: trans.memo,
            errorMessage: trans.error_message,
        };
    }
    const trans = "ICRC1" in value ? value.ICRC1 : value.ICRC2;
    return {
        kind: "failed",
        ledger: (0, mapping_1.principalBytesToString)(trans.ledger),
        recipient,
        amountE8s: trans.amount,
        feeE8s: trans.fee,
        memo: (0, mapping_1.mapOptional)(trans.memo, mapping_1.bytesToBigint) ?? BigInt(0),
        errorMessage: trans.error_message,
    };
}
exports.failedCryptoTransfer = failedCryptoTransfer;
function imageContent(value) {
    return {
        kind: "image_content",
        height: value.height,
        mimeType: value.mime_type,
        blobReference: (0, mapping_1.mapOptional)(value.blob_reference, blobReference),
        thumbnailData: value.thumbnail_data,
        caption: (0, mapping_1.mapOptional)(value.caption, mapping_1.identity),
        width: value.width,
    };
}
function videoContent(value) {
    return {
        kind: "video_content",
        height: value.height,
        mimeType: value.mime_type,
        videoData: {
            blobReference: (0, mapping_1.mapOptional)(value.video_blob_reference, blobReference),
        },
        imageData: {
            blobReference: (0, mapping_1.mapOptional)(value.image_blob_reference, blobReference),
        },
        thumbnailData: value.thumbnail_data,
        caption: (0, mapping_1.mapOptional)(value.caption, mapping_1.identity),
        width: value.width,
    };
}
function audioContent(value) {
    return {
        kind: "audio_content",
        mimeType: value.mime_type,
        blobReference: (0, mapping_1.mapOptional)(value.blob_reference, blobReference),
        caption: (0, mapping_1.mapOptional)(value.caption, mapping_1.identity),
    };
}
function textContent(value) {
    return {
        kind: "text_content",
        text: value.text,
    };
}
function fileContent(value) {
    return {
        kind: "file_content",
        name: value.name,
        mimeType: value.mime_type,
        blobReference: (0, mapping_1.mapOptional)(value.blob_reference, blobReference),
        caption: (0, mapping_1.mapOptional)(value.caption, mapping_1.identity),
        fileSize: value.file_size,
    };
}
function blobReference(value) {
    return {
        blobId: value.blob_id,
        canisterId: (0, mapping_1.principalBytesToString)(value.canister_id),
    };
}
function replyContext(value) {
    return {
        kind: "raw_reply_context",
        eventIndex: value.event_index,
        sourceContext: (0, mapping_1.mapOptional)(value.chat_if_other, replySourceContext),
    };
}
function replySourceContext([chatId, maybeThreadRoot]) {
    if ("Direct" in chatId) {
        return {
            chatId: { kind: "direct_chat", userId: (0, mapping_1.principalBytesToString)(chatId.Direct) },
            threadRootMessageIndex: undefined,
        };
    }
    if ("Group" in chatId) {
        return {
            chatId: { kind: "group_chat", groupId: (0, mapping_1.principalBytesToString)(chatId.Group) },
            threadRootMessageIndex: (0, mapping_1.mapOptional)(maybeThreadRoot, mapping_1.identity),
        };
    }
    if ("Channel" in chatId) {
        const [communityId, channelId] = chatId.Channel;
        return {
            chatId: {
                kind: "channel",
                communityId: (0, mapping_1.principalBytesToString)(communityId),
                channelId: channelId.toString(),
            },
            threadRootMessageIndex: (0, mapping_1.mapOptional)(maybeThreadRoot, mapping_1.identity),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiMultiUserChat type received", chatId);
}
function reactions(value) {
    return value.map(([reaction, userIds]) => ({
        reaction,
        userIds: new Set(userIds.map(mapping_1.principalBytesToString)),
    }));
}
function groupPermissions(value) {
    return {
        changeRoles: permissionRole(value.change_roles),
        updateGroup: permissionRole(value.update_group),
        inviteUsers: permissionRole(value.invite_users),
        addMembers: permissionRole(value.add_members),
        removeMembers: permissionRole(value.remove_members),
        deleteMessages: permissionRole(value.delete_messages),
        pinMessages: permissionRole(value.pin_messages),
        reactToMessages: permissionRole(value.react_to_messages),
        mentionAllMembers: permissionRole(value.mention_all_members),
        startVideoCall: permissionRole(value.start_video_call),
        messagePermissions: messagePermissions(value.message_permissions),
        threadPermissions: (0, mapping_1.mapOptional)(value.thread_permissions, messagePermissions),
    };
}
exports.groupPermissions = groupPermissions;
function messagePermissions(value) {
    const mf = value.custom.find((cp) => cp.subtype === "meme_fighter")?.role;
    return {
        default: permissionRole(value.default),
        text: (0, mapping_1.mapOptional)(value.text, permissionRole),
        image: (0, mapping_1.mapOptional)(value.image, permissionRole),
        video: (0, mapping_1.mapOptional)(value.video, permissionRole),
        audio: (0, mapping_1.mapOptional)(value.audio, permissionRole),
        file: (0, mapping_1.mapOptional)(value.file, permissionRole),
        poll: (0, mapping_1.mapOptional)(value.poll, permissionRole),
        crypto: (0, mapping_1.mapOptional)(value.crypto, permissionRole),
        giphy: (0, mapping_1.mapOptional)(value.giphy, permissionRole),
        prize: (0, mapping_1.mapOptional)(value.prize, permissionRole),
        p2pSwap: (0, mapping_1.mapOptional)(value.p2p_swap, permissionRole),
        memeFighter: mf !== undefined ? permissionRole(mf) : undefined,
    };
}
function communityPermissions(value) {
    return {
        changeRoles: communityPermissionRole(value.change_roles),
        updateDetails: communityPermissionRole(value.update_details),
        inviteUsers: communityPermissionRole(value.invite_users),
        removeMembers: communityPermissionRole(value.remove_members),
        createPublicChannel: communityPermissionRole(value.create_public_channel),
        createPrivateChannel: communityPermissionRole(value.create_private_channel),
        manageUserGroups: communityPermissionRole(value.manage_user_groups),
    };
}
exports.communityPermissions = communityPermissions;
function communityPermissionRole(value) {
    if (value === "Owners")
        return "owner";
    if (value === "Admins")
        return "admin";
    return "member";
}
exports.communityPermissionRole = communityPermissionRole;
function apiCommunityPermissions(permissions) {
    return {
        create_public_channel: apiCommunityPermissionRole(permissions.createPublicChannel),
        update_details: apiCommunityPermissionRole(permissions.updateDetails),
        invite_users: apiCommunityPermissionRole(permissions.inviteUsers),
        remove_members: apiCommunityPermissionRole(permissions.removeMembers),
        change_roles: apiCommunityPermissionRole(permissions.changeRoles),
        create_private_channel: apiCommunityPermissionRole(permissions.createPrivateChannel),
        manage_user_groups: apiCommunityPermissionRole(permissions.manageUserGroups),
    };
}
exports.apiCommunityPermissions = apiCommunityPermissions;
function apiCommunityPermissionRole(permissionRole) {
    switch (permissionRole) {
        case "owner":
            return "Owners";
        case "admin":
            return "Admins";
        case "member":
            return "Members";
    }
}
exports.apiCommunityPermissionRole = apiCommunityPermissionRole;
function apiGroupPermissions(permissions) {
    return {
        change_roles: apiPermissionRole(permissions.changeRoles),
        update_group: apiPermissionRole(permissions.updateGroup),
        invite_users: apiPermissionRole(permissions.inviteUsers),
        add_members: apiPermissionRole(permissions.addMembers),
        remove_members: apiPermissionRole(permissions.removeMembers),
        delete_messages: apiPermissionRole(permissions.deleteMessages),
        pin_messages: apiPermissionRole(permissions.pinMessages),
        react_to_messages: apiPermissionRole(permissions.reactToMessages),
        mention_all_members: apiPermissionRole(permissions.mentionAllMembers),
        start_video_call: apiPermissionRole(permissions.startVideoCall),
        message_permissions: apiMessagePermissions(permissions.messagePermissions),
        thread_permissions: (0, mapping_1.mapOptional)(permissions.threadPermissions, apiMessagePermissions),
    };
}
exports.apiGroupPermissions = apiGroupPermissions;
function apiMessagePermissions(permissions) {
    return {
        default: apiPermissionRole(permissions.default),
        text: (0, mapping_1.mapOptional)(permissions.text, apiPermissionRole),
        image: (0, mapping_1.mapOptional)(permissions.image, apiPermissionRole),
        video: (0, mapping_1.mapOptional)(permissions.video, apiPermissionRole),
        audio: (0, mapping_1.mapOptional)(permissions.audio, apiPermissionRole),
        file: (0, mapping_1.mapOptional)(permissions.file, apiPermissionRole),
        poll: (0, mapping_1.mapOptional)(permissions.poll, apiPermissionRole),
        crypto: (0, mapping_1.mapOptional)(permissions.crypto, apiPermissionRole),
        giphy: (0, mapping_1.mapOptional)(permissions.giphy, apiPermissionRole),
        prize: (0, mapping_1.mapOptional)(permissions.prize, apiPermissionRole),
        p2p_swap: (0, mapping_1.mapOptional)(permissions.p2pSwap, apiPermissionRole),
        video_call: (0, mapping_1.mapOptional)("none", apiPermissionRole),
        custom: permissions.memeFighter !== undefined
            ? [{ subtype: "meme_fighter", role: apiPermissionRole(permissions.memeFighter) }]
            : [],
    };
}
function apiPermissionRole(permissionRole) {
    switch (permissionRole) {
        case "none":
            return "None";
        case "owner":
            return "Owner";
        case "admin":
            return "Admins";
        case "moderator":
            return "Moderators";
        default:
            return "Members";
    }
}
exports.apiPermissionRole = apiPermissionRole;
function permissionRole(value) {
    if (value === "None")
        return "none";
    if (value === "Owner")
        return "owner";
    if (value === "Admins")
        return "admin";
    if (value === "Moderators")
        return "moderator";
    return "member";
}
exports.permissionRole = permissionRole;
function chatMetrics(value) {
    return {
        audioMessages: Number(value.audio_messages),
        edits: Number(value.edits),
        icpMessages: Number(value.icp_messages),
        sns1Messages: Number(value.sns1_messages),
        ckbtcMessages: Number(value.ckbtc_messages),
        giphyMessages: Number(value.giphy_messages),
        deletedMessages: Number(value.deleted_messages),
        fileMessages: Number(value.file_messages),
        pollVotes: Number(value.poll_votes),
        textMessages: Number(value.text_messages),
        imageMessages: Number(value.image_messages),
        replies: Number(value.replies),
        videoMessages: Number(value.video_messages),
        polls: Number(value.polls),
        reactions: Number(value.reactions),
        reportedMessages: Number(value.reported_messages),
    };
}
exports.chatMetrics = chatMetrics;
function memberRole(value) {
    if (value === "Admin") {
        return "admin";
    }
    if (value === "Moderator") {
        return "moderator";
    }
    if (value === "Participant" || value === "Member") {
        return "member";
    }
    if (value === "Owner") {
        return "owner";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiRole type received", value);
}
exports.memberRole = memberRole;
function apiMultiUserChat(chatId) {
    switch (chatId.kind) {
        case "group_chat":
            return {
                Group: (0, mapping_1.principalStringToBytes)(chatId.groupId),
            };
        case "channel":
            return {
                Channel: [(0, mapping_1.principalStringToBytes)(chatId.communityId), BigInt(chatId.channelId)],
            };
        default:
            throw new Error("Cannot convert a DirectChatIdentifier into an ApiMultiUserChat");
    }
}
exports.apiMultiUserChat = apiMultiUserChat;
function apiReplyContextArgs(chatId, domain) {
    if (domain.sourceContext !== undefined &&
        !(0, openchat_shared_1.chatIdentifiersEqual)(chatId, domain.sourceContext.chatId)) {
        return {
            chat_if_other: [
                apiMultiUserChat(domain.sourceContext.chatId),
                domain.sourceContext.threadRootMessageIndex ?? null,
            ],
            event_index: domain.eventIndex,
        };
    }
    else {
        return {
            chat_if_other: undefined,
            event_index: domain.eventIndex,
        };
    }
}
exports.apiReplyContextArgs = apiReplyContextArgs;
function apiMessageContent(domain) {
    switch (domain.kind) {
        case "text_content":
            return { Text: apiTextContent(domain) };
        case "image_content":
            return { Image: apiImageContent(domain) };
        case "video_content":
            return { Video: apiVideoContent(domain) };
        case "audio_content":
            return { Audio: apiAudioContent(domain) };
        case "file_content":
            return { File: apiFileContent(domain) };
        case "crypto_content":
            return { Crypto: apiPendingCryptoContent(domain) };
        case "poll_content":
            return { Poll: apiPollContent(domain) };
        case "giphy_content":
            return { Giphy: apiGiphyContent(domain) };
        case "prize_content_initial":
            return { Prize: apiPrizeContentInitial(domain) };
        case "p2p_swap_content_initial":
            return { P2PSwap: apiP2PSwapContentInitial(domain) };
        case "meme_fighter_content":
            const encoder = new TextEncoder();
            return {
                Custom: {
                    kind: "meme_fighter",
                    data: encoder.encode(JSON.stringify({
                        url: domain.url,
                        width: domain.width,
                        height: domain.height,
                    })),
                },
            };
        case "user_referral_card":
            return {
                Custom: {
                    kind: "user_referral_card",
                    data: new Uint8Array(),
                },
            };
        case "video_call_content":
        case "deleted_content":
        case "blocked_content":
        case "prize_content":
        case "prize_winner_content":
        case "placeholder_content":
        case "proposal_content":
        case "message_reminder_content":
        case "message_reminder_created_content":
        case "reported_message_content":
        case "p2p_swap_content":
            throw new Error(`Incorrectly attempting to send {domain.kind} content to the server`);
    }
}
exports.apiMessageContent = apiMessageContent;
function apiGiphyContent(domain) {
    return {
        title: domain.title,
        caption: domain.caption,
        desktop: apiGiphyImageVariant(domain.desktop),
        mobile: apiGiphyImageVariant(domain.mobile),
    };
}
function apiGiphyImageVariant(domain) {
    return {
        height: domain.height,
        width: domain.width,
        url: domain.url,
        mime_type: domain.mimeType,
    };
}
function apiPollContent(domain) {
    return {
        votes: apiPollVotes(domain.votes),
        config: apiPollConfig(domain.config),
        ended: domain.ended,
    };
}
function apiPollConfig(domain) {
    return {
        allow_multiple_votes_per_user: domain.allowMultipleVotesPerUser,
        allow_user_to_change_vote: domain.allowUserToChangeVote,
        text: domain.text,
        show_votes_before_end_date: domain.showVotesBeforeEndDate,
        end_date: domain.endDate,
        anonymous: domain.anonymous,
        options: domain.options,
    };
}
function apiPollVotes(domain) {
    return {
        total: apiTotalPollVotes(domain.total),
        user: domain.user,
    };
}
function apiTotalPollVotes(domain) {
    if (domain.kind === "anonymous_poll_votes") {
        return {
            Anonymous: domain.votes,
        };
    }
    if (domain.kind === "hidden_poll_votes") {
        return {
            Hidden: domain.votes,
        };
    }
    if (domain.kind === "visible_poll_votes") {
        return {
            Visible: (0, list_1.toRecord2)(Object.entries(domain.votes), ([idx, _]) => Number(idx), ([_, userIds]) => userIds.map(mapping_1.principalStringToBytes)),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected TotalPollVotes type received", domain);
}
function apiImageContent(domain) {
    return {
        height: domain.height,
        mime_type: domain.mimeType,
        blob_reference: apiBlobReference(domain.blobReference),
        thumbnail_data: domain.thumbnailData,
        caption: domain.caption,
        width: domain.width,
    };
}
function apiVideoContent(domain) {
    return {
        height: domain.height,
        mime_type: domain.mimeType,
        video_blob_reference: apiBlobReference(domain.videoData.blobReference),
        image_blob_reference: apiBlobReference(domain.imageData.blobReference),
        thumbnail_data: domain.thumbnailData,
        caption: domain.caption,
        width: domain.width,
    };
}
function apiAudioContent(domain) {
    return {
        mime_type: domain.mimeType,
        blob_reference: apiBlobReference(domain.blobReference),
        caption: domain.caption,
    };
}
function apiMaybeAccessGateConfig(domain) {
    const gate = apiMaybeAccessGate(domain.gate);
    if (gate === undefined) {
        return undefined;
    }
    return {
        gate,
        expiry: domain.expiry,
    };
}
exports.apiMaybeAccessGateConfig = apiMaybeAccessGateConfig;
function apiMaybeAccessGate(domain) {
    if (domain.kind === "composite_gate") {
        return {
            Composite: {
                inner: domain.gates.map(apiLeafAccessGate),
                and: domain.operator === "and",
            },
        };
    }
    if (domain.kind === "no_gate")
        return undefined;
    if (domain.kind === "nft_gate")
        return undefined;
    if (domain.kind === "unique_person_gate")
        return "UniquePerson";
    if (domain.kind === "diamond_gate")
        return "DiamondMember";
    if (domain.kind === "locked_gate")
        return "Locked";
    if (domain.kind === "credential_gate") {
        return {
            VerifiedCredential: {
                credential_name: domain.credential.credentialName,
                issuer_canister_id: (0, mapping_1.principalStringToBytes)(domain.credential.issuerCanisterId),
                issuer_origin: domain.credential.issuerOrigin,
                credential_type: domain.credential.credentialType,
                credential_arguments: apiCredentialArguments(domain.credential.credentialArguments),
            },
        };
    }
    if (domain.kind === "neuron_gate") {
        return {
            SnsNeuron: {
                governance_canister_id: (0, mapping_1.principalStringToBytes)(domain.governanceCanister),
                min_dissolve_delay: (0, mapping_1.mapOptional)(domain.minDissolveDelay, BigInt),
                min_stake_e8s: (0, mapping_1.mapOptional)(domain.minStakeE8s, BigInt),
            },
        };
    }
    if (domain.kind === "payment_gate") {
        return {
            Payment: {
                ledger_canister_id: (0, mapping_1.principalStringToBytes)(domain.ledgerCanister),
                amount: domain.amount,
                fee: domain.fee,
            },
        };
    }
    if (domain.kind === "token_balance_gate") {
        return {
            TokenBalance: {
                ledger_canister_id: (0, mapping_1.principalStringToBytes)(domain.ledgerCanister),
                min_balance: domain.minBalance,
            },
        };
    }
    return undefined;
}
exports.apiMaybeAccessGate = apiMaybeAccessGate;
function apiAccessGateConfig(domain) {
    return {
        gate: apiAccessGate(domain.gate),
        expiry: domain.expiry,
    };
}
exports.apiAccessGateConfig = apiAccessGateConfig;
function apiAccessGate(domain) {
    if (domain.kind === "composite_gate") {
        return {
            Composite: {
                and: domain.operator === "and",
                inner: domain.gates.map(apiLeafAccessGate),
            },
        };
    }
    return apiLeafAccessGate(domain);
}
exports.apiAccessGate = apiAccessGate;
function apiLeafAccessGate(domain) {
    if (domain.kind === "locked_gate")
        return "Locked";
    if (domain.kind === "diamond_gate")
        return "DiamondMember";
    if (domain.kind === "lifetime_diamond_gate")
        return "LifetimeDiamondMember";
    if (domain.kind === "unique_person_gate")
        return "UniquePerson";
    if (domain.kind === "credential_gate")
        return {
            VerifiedCredential: {
                credential_name: domain.credential.credentialName,
                issuer_canister_id: (0, mapping_1.principalStringToBytes)(domain.credential.issuerCanisterId),
                issuer_origin: domain.credential.issuerOrigin,
                credential_type: domain.credential.credentialType,
                credential_arguments: apiCredentialArguments(domain.credential.credentialArguments),
            },
        };
    if (domain.kind === "neuron_gate") {
        return {
            SnsNeuron: {
                governance_canister_id: (0, mapping_1.principalStringToBytes)(domain.governanceCanister),
                min_dissolve_delay: (0, mapping_1.mapOptional)(domain.minDissolveDelay, BigInt),
                min_stake_e8s: (0, mapping_1.mapOptional)(domain.minStakeE8s, BigInt),
            },
        };
    }
    if (domain.kind === "payment_gate") {
        return {
            Payment: {
                ledger_canister_id: (0, mapping_1.principalStringToBytes)(domain.ledgerCanister),
                amount: domain.amount,
                fee: domain.fee,
            },
        };
    }
    if (domain.kind === "token_balance_gate") {
        return {
            TokenBalance: {
                ledger_canister_id: (0, mapping_1.principalStringToBytes)(domain.ledgerCanister),
                min_balance: domain.minBalance,
            },
        };
    }
    throw new Error(`Received a domain level group gate that we cannot parse: ${domain}`);
}
function credentialArguments(value) {
    return (0, list_1.toRecord2)(value, ([k, _]) => k, ([_, v]) => {
        if ("String" in v) {
            return v.String;
        }
        else {
            return v.Int;
        }
    });
}
exports.credentialArguments = credentialArguments;
function apiCredentialArguments(domain) {
    return (0, list_1.toRecord2)(Object.entries(domain ?? {}), ([k, _]) => k, ([_, v]) => {
        if (typeof v === "number") {
            return { Int: v };
        }
        else {
            return { String: v };
        }
    });
}
function accessGateConfig(value) {
    return {
        gate: accessGate(value.gate),
        expiry: value.expiry,
    };
}
exports.accessGateConfig = accessGateConfig;
function accessGate(value) {
    if (value === "DiamondMember") {
        return {
            kind: "diamond_gate",
        };
    }
    if (value === "LifetimeDiamondMember") {
        return {
            kind: "lifetime_diamond_gate",
        };
    }
    if (value === "UniquePerson") {
        return {
            kind: "unique_person_gate",
        };
    }
    if (value === "Locked") {
        return {
            kind: "locked_gate",
        };
    }
    if (value === "ReferredByMember") {
        return {
            kind: "referred_by_member_gate",
        };
    }
    if ("Composite" in value) {
        return {
            kind: "composite_gate",
            operator: value.Composite.and ? "and" : "or",
            gates: value.Composite.inner.map(accessGate),
        };
    }
    if ("SnsNeuron" in value) {
        return {
            kind: "neuron_gate",
            minDissolveDelay: (0, mapping_1.mapOptional)(value.SnsNeuron.min_dissolve_delay, Number),
            minStakeE8s: (0, mapping_1.mapOptional)(value.SnsNeuron.min_stake_e8s, Number),
            governanceCanister: (0, mapping_1.principalBytesToString)(value.SnsNeuron.governance_canister_id),
        };
    }
    if ("VerifiedCredential" in value) {
        const credentialArgs = Object.entries(value.VerifiedCredential.credential_arguments);
        return {
            kind: "credential_gate",
            credential: {
                issuerCanisterId: (0, mapping_1.principalBytesToString)(value.VerifiedCredential.issuer_canister_id),
                issuerOrigin: value.VerifiedCredential.issuer_origin,
                credentialType: value.VerifiedCredential.credential_type,
                credentialName: value.VerifiedCredential.credential_name,
                credentialArguments: credentialArgs.length === 0 ? undefined : credentialArguments(credentialArgs),
            },
        };
    }
    if ("Payment" in value) {
        return {
            kind: "payment_gate",
            ledgerCanister: (0, mapping_1.principalBytesToString)(value.Payment.ledger_canister_id),
            amount: value.Payment.amount,
            fee: value.Payment.fee,
        };
    }
    if ("TokenBalance" in value) {
        return {
            kind: "token_balance_gate",
            ledgerCanister: (0, mapping_1.principalBytesToString)(value.TokenBalance.ledger_canister_id),
            minBalance: value.TokenBalance.min_balance,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiGroupGate type received", value);
}
exports.accessGate = accessGate;
function apiBlobReference(domain) {
    return (0, mapping_1.mapOptional)(domain, (b) => ({
        blob_id: b.blobId,
        canister_id: (0, mapping_1.principalStringToBytes)(b.canisterId),
    }));
}
function apiPrizeContentInitial(domain) {
    return {
        caption: domain.caption,
        transfer: apiPendingCryptoTransaction(domain.transfer),
        end_date: domain.endDate,
        diamond_only: domain.diamondOnly,
        lifetime_diamond_only: domain.lifetimeDiamondOnly,
        unique_person_only: domain.uniquePersonOnly,
        streak_only: domain.streakOnly,
        prizes_v2: domain.prizes,
    };
}
exports.apiPrizeContentInitial = apiPrizeContentInitial;
function apiP2PSwapContentInitial(domain) {
    return {
        token0: apiTokenInfo(domain.token0),
        token1: apiTokenInfo(domain.token1),
        token0_amount: domain.token0Amount,
        token1_amount: domain.token1Amount,
        caption: domain.caption,
        expires_in: domain.expiresIn,
    };
}
exports.apiP2PSwapContentInitial = apiP2PSwapContentInitial;
function apiTokenInfo(domain) {
    return {
        fee: domain.fee,
        decimals: domain.decimals,
        token: apiToken(domain.symbol),
        ledger: (0, mapping_1.principalStringToBytes)(domain.ledger),
    };
}
function apiPendingCryptoContent(domain) {
    return {
        recipient: (0, mapping_1.principalStringToBytes)(domain.transfer.recipient),
        caption: domain.caption,
        transfer: apiPendingCryptoTransaction(domain.transfer),
    };
}
exports.apiPendingCryptoContent = apiPendingCryptoContent;
function apiPendingCryptoTransaction(domain) {
    if (domain.kind === "pending") {
        if (domain.token === "ICP") {
            return {
                Pending: {
                    NNS: {
                        ledger: (0, mapping_1.principalStringToBytes)(domain.ledger),
                        token: apiToken(domain.token),
                        to: {
                            User: (0, mapping_1.principalStringToBytes)(domain.recipient),
                        },
                        amount: apiICP(domain.amountE8s),
                        fee: undefined,
                        memo: domain.memo,
                        created: domain.createdAtNanos,
                    },
                },
            };
        }
        else {
            return {
                Pending: {
                    ICRC1: {
                        ledger: (0, mapping_1.principalStringToBytes)(domain.ledger),
                        token: apiToken(domain.token),
                        to: {
                            owner: (0, mapping_1.principalStringToBytes)(domain.recipient),
                            subaccount: undefined,
                        },
                        amount: domain.amountE8s,
                        fee: domain.feeE8s ?? BigInt(0),
                        memo: (0, mapping_1.mapOptional)(domain.memo, mapping_1.bigintToBytes),
                        created: domain.createdAtNanos,
                    },
                },
            };
        }
    }
    throw new Error("Transaction is not of type 'Pending': " + JSON.stringify(domain));
}
exports.apiPendingCryptoTransaction = apiPendingCryptoTransaction;
function apiPendingCryptocurrencyWithdrawal(domain, pin) {
    if (domain.token === openchat_shared_1.ICP_SYMBOL && (0, openchat_shared_1.isAccountIdentifierValid)(domain.to)) {
        return {
            withdrawal: {
                NNS: {
                    ledger: (0, mapping_1.principalStringToBytes)(domain.ledger),
                    token: apiToken(domain.token),
                    to: {
                        Account: [...(0, mapping_1.hexStringToBytes)(domain.to)],
                    },
                    amount: apiICP(domain.amountE8s),
                    fee: undefined,
                    memo: domain.memo,
                    created: domain.createdAtNanos,
                },
            },
            pin,
        };
    }
    else {
        return {
            withdrawal: {
                ICRC1: {
                    ledger: (0, mapping_1.principalStringToBytes)(domain.ledger),
                    token: apiToken(domain.token),
                    to: { owner: (0, mapping_1.principalStringToBytes)(domain.to), subaccount: undefined },
                    amount: domain.amountE8s,
                    fee: domain.feeE8s ?? BigInt(0),
                    memo: (0, mapping_1.mapOptional)(domain.memo, mapping_1.bigintToBytes),
                    created: domain.createdAtNanos,
                },
            },
            pin,
        };
    }
}
exports.apiPendingCryptocurrencyWithdrawal = apiPendingCryptocurrencyWithdrawal;
function proposalVote(vote) {
    if (vote === 1)
        return true;
    if (vote === 2)
        return false;
    return undefined;
}
exports.proposalVote = proposalVote;
function apiProposalVote(vote) {
    return vote ? 1 : 2;
}
exports.apiProposalVote = apiProposalVote;
function apiTextContent(domain) {
    return {
        text: domain.text,
    };
}
function apiFileContent(domain) {
    return {
        name: domain.name,
        mime_type: domain.mimeType,
        blob_reference: apiBlobReference(domain.blobReference),
        caption: domain.caption,
        file_size: domain.fileSize,
    };
}
function apiICP(amountE8s) {
    return {
        e8s: amountE8s,
    };
}
function groupChatSummary(value) {
    const groupId = (0, mapping_1.principalBytesToString)(value.chat_id);
    const latestMessage = (0, mapping_1.mapOptional)(value.latest_message, messageEvent);
    return {
        kind: "group_chat",
        id: { kind: "group_chat", groupId },
        latestMessage,
        name: value.name,
        description: value.description,
        public: value.is_public,
        historyVisible: value.history_visible_to_new_joiners,
        minVisibleEventIndex: value.min_visible_event_index,
        minVisibleMessageIndex: value.min_visible_message_index,
        latestEventIndex: value.latest_event_index,
        latestMessageIndex: value.latest_message_index,
        lastUpdated: value.last_updated,
        blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (blobId) => ({
            blobId,
            canisterId: groupId,
        })),
        memberCount: value.participant_count,
        permissions: groupPermissions(value.permissions_v2),
        metrics: chatMetrics(value.metrics),
        subtype: (0, mapping_1.mapOptional)(value.subtype, groupSubtype),
        previewed: false,
        frozen: value.frozen !== undefined,
        dateLastPinned: value.date_last_pinned,
        dateReadPinned: undefined,
        gateConfig: (0, mapping_1.mapOptional)(value.gate_config, accessGateConfig) ?? {
            gate: { kind: "no_gate" },
            expiry: undefined,
        },
        level: "group",
        eventsTTL: value.events_ttl,
        eventsTtlLastUpdated: value.events_ttl_last_updated,
        membership: {
            joined: value.joined,
            role: memberRole(value.role),
            mentions: [],
            latestThreads: [],
            myMetrics: chatMetrics(value.my_metrics),
            notificationsMuted: value.notifications_muted,
            readByMeUpTo: latestMessage?.event.messageIndex,
            archived: false,
            rulesAccepted: value.rules_accepted,
            lapsed: value.membership?.lapsed ?? false,
        },
        localUserIndex: (0, mapping_1.principalBytesToString)(value.local_user_index_canister_id),
        isInvited: false,
        messagesVisibleToNonMembers: value.messages_visible_to_non_members,
    };
}
exports.groupChatSummary = groupChatSummary;
function communitySummary(value) {
    const communityId = (0, mapping_1.principalBytesToString)(value.community_id);
    const localUserIndex = (0, mapping_1.principalBytesToString)(value.local_user_index_canister_id);
    return {
        kind: "community",
        id: { kind: "community", communityId },
        name: value.name,
        description: value.description,
        public: value.is_public,
        historyVisible: false,
        latestEventIndex: value.latest_event_index,
        lastUpdated: value.last_updated,
        metrics: chatMetrics(value.metrics),
        avatar: {
            blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (blobId) => ({
                blobId,
                canisterId: communityId,
            })),
        },
        banner: {
            blobReference: (0, mapping_1.mapOptional)(value.banner_id, (blobId) => ({
                blobId,
                canisterId: communityId,
            })),
        },
        memberCount: value.member_count,
        frozen: value.frozen !== undefined,
        gateConfig: (0, mapping_1.mapOptional)(value.gate_config, accessGateConfig) ?? {
            gate: { kind: "no_gate" },
            expiry: undefined,
        },
        level: "community",
        permissions: communityPermissions(value.permissions),
        membership: {
            joined: (0, mapping_1.mapOptional)(value.membership, (m) => m.joined) ?? BigInt(0),
            role: (0, mapping_1.mapOptional)(value.membership, (m) => memberRole(m.role)) ?? "none",
            archived: false,
            pinned: [],
            index: 0,
            displayName: (0, mapping_1.mapOptional)(value.membership, (m) => m.display_name),
            rulesAccepted: (0, mapping_1.mapOptional)(value.membership, (m) => m.rules_accepted) ?? false,
            lapsed: (0, mapping_1.mapOptional)(value.membership, (m) => m.lapsed) ?? false,
        },
        channels: value.channels.map((c) => communityChannelSummary(c, communityId)),
        primaryLanguage: value.primary_language,
        userGroups: new Map(value.user_groups.map(userGroup)),
        localUserIndex,
        isInvited: value.is_invited ?? false,
    };
}
exports.communitySummary = communitySummary;
function userGroup(value) {
    return [
        value.user_group_id,
        {
            kind: "user_group",
            id: value.user_group_id,
            name: value.name,
            memberCount: value.members,
        },
    ];
}
exports.userGroup = userGroup;
function communityChannelSummary(value, communityId) {
    const latestMessage = (0, mapping_1.mapOptional)(value.latest_message, messageEvent);
    return {
        kind: "channel",
        id: { kind: "channel", communityId, channelId: value.channel_id.toString() },
        latestMessage,
        name: value.name,
        description: value.description,
        public: value.is_public,
        historyVisible: value.history_visible_to_new_joiners,
        minVisibleEventIndex: value.min_visible_event_index,
        minVisibleMessageIndex: value.min_visible_message_index,
        latestEventIndex: value.latest_event_index,
        latestMessageIndex: value.latest_message_index,
        lastUpdated: value.last_updated,
        blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (blobId) => ({
            blobId,
            canisterId: communityId,
        })),
        memberCount: value.member_count,
        permissions: groupPermissions(value.permissions_v2),
        metrics: chatMetrics(value.metrics),
        subtype: (0, mapping_1.mapOptional)(value.subtype, groupSubtype),
        frozen: false,
        dateLastPinned: value.date_last_pinned,
        dateReadPinned: undefined,
        gateConfig: (0, mapping_1.mapOptional)(value.gate_config, accessGateConfig) ?? {
            gate: { kind: "no_gate" },
            expiry: undefined,
        },
        level: "channel",
        eventsTTL: value.events_ttl,
        eventsTtlLastUpdated: value.events_ttl_last_updated,
        videoCallInProgress: (0, mapping_1.mapOptional)(value.video_call_in_progress, (v) => v.message_index),
        membership: {
            joined: (0, mapping_1.mapOptional)(value.membership, (m) => m.joined) ?? BigInt(0),
            notificationsMuted: (0, mapping_1.mapOptional)(value.membership, (m) => m.notifications_muted) ?? false,
            role: (0, mapping_1.mapOptional)(value.membership, (m) => memberRole(m.role)) ?? "none",
            myMetrics: (0, mapping_1.mapOptional)(value.membership, (m) => chatMetrics(m.my_metrics)) ??
                (0, openchat_shared_1.emptyChatMetrics)(),
            readByMeUpTo: latestMessage?.event.messageIndex,
            latestThreads: (0, mapping_1.mapOptional)(value.membership, (m) => m.latest_threads.map(threadSyncDetails)) ?? [],
            mentions: (0, mapping_1.mapOptional)(value.membership, (m) => mentions(m.mentions)) ?? [],
            archived: false,
            rulesAccepted: (0, mapping_1.mapOptional)(value.membership, (m) => m.rules_accepted) ?? false,
            lapsed: (0, mapping_1.mapOptional)(value.membership, (m) => m.lapsed) ?? false,
        },
        isInvited: value.is_invited ?? false,
        messagesVisibleToNonMembers: value.messages_visible_to_non_members,
        externalUrl: value.external_url,
    };
}
exports.communityChannelSummary = communityChannelSummary;
function threadSyncDetails(value) {
    return {
        threadRootMessageIndex: value.root_message_index,
        lastUpdated: value.last_updated,
        latestEventIndex: value.latest_event,
        latestMessageIndex: value.latest_message,
    };
}
exports.threadSyncDetails = threadSyncDetails;
function updatedEvent([threadRootMessageIndex, eventIndex, timestamp]) {
    return {
        eventIndex,
        threadRootMessageIndex: (0, mapping_1.mapOptional)(threadRootMessageIndex, mapping_1.identity),
        timestamp,
    };
}
exports.updatedEvent = updatedEvent;
function gateCheckFailedReason(value) {
    if (value === "NoUniquePersonProof") {
        return "no_unique_person_proof";
    }
    if (value === "NotLifetimeDiamondMember") {
        return "not_lifetime_diamond";
    }
    if (value === "NotDiamondMember") {
        return "not_diamond";
    }
    if (value === "NoSnsNeuronsFound") {
        return "no_sns_neuron_found";
    }
    if (value === "NoSnsNeuronsWithRequiredDissolveDelayFound") {
        return "dissolve_delay_not_met";
    }
    if (value === "NoSnsNeuronsWithRequiredStakeFound") {
        return "min_stake_not_met";
    }
    if (value === "NotReferredByMember") {
        return "not_referred_by_member";
    }
    if (value === "Locked") {
        return "locked";
    }
    if (typeof value !== "string") {
        if ("PaymentFailed" in value) {
            console.warn("PaymentFailed: ", value);
            return "payment_failed";
        }
        if ("InsufficientBalance" in value) {
            return "insufficient_balance";
        }
        if ("FailedVerifiedCredentialCheck" in value) {
            console.warn("FailedVerifiedCredentialCheck: ", value);
            return "failed_verified_credential_check";
        }
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiGateCheckFailedReason type received", value);
}
exports.gateCheckFailedReason = gateCheckFailedReason;
function addRemoveReactionResponse(value) {
    if (value === "Success" ||
        value === "NoChange" ||
        (typeof value === "object" && "SuccessV2" in value)) {
        return openchat_shared_1.CommonResponses.success();
    }
    else {
        console.warn("AddRemoveReaction failed with: ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.addRemoveReactionResponse = addRemoveReactionResponse;
function groupSubtype(subtype) {
    return {
        kind: "governance_proposals",
        isNns: subtype.GovernanceProposals.is_nns,
        governanceCanisterId: (0, mapping_1.principalBytesToString)(subtype.GovernanceProposals.governance_canister_id),
    };
}
exports.groupSubtype = groupSubtype;
function messagesSuccessResponse(value) {
    return {
        events: value.messages.map(messageEvent),
        expiredEventRanges: [],
        expiredMessageRanges: [],
        latestEventIndex: value.latest_event_index,
    };
}
exports.messagesSuccessResponse = messagesSuccessResponse;
function messageEvent(value) {
    return {
        event: message(value.event),
        index: value.index,
        timestamp: value.timestamp,
        expiresAt: (0, mapping_1.mapOptional)(value.expires_at, Number),
    };
}
exports.messageEvent = messageEvent;
function mention(value) {
    return {
        messageId: value.message_id,
        messageIndex: value.message_index,
        eventIndex: value.event_index,
    };
}
exports.mention = mention;
function mentions(value) {
    return value.filter((m) => m.thread_root_message_index === undefined).map(mention);
}
exports.mentions = mentions;
function expiredEventsRange([start, end]) {
    return {
        kind: "expired_events_range",
        start,
        end,
    };
}
exports.expiredEventsRange = expiredEventsRange;
function expiredMessagesRange([start, end]) {
    return {
        kind: "expired_messages_range",
        start,
        end,
    };
}
exports.expiredMessagesRange = expiredMessagesRange;
function updateGroupResponse(value) {
    if (typeof value === "object") {
        if ("SuccessV2" in value) {
            return {
                kind: "success",
                rulesVersion: value.SuccessV2.rules_version,
            };
        }
        if ("DescriptionTooLong" in value) {
            return { kind: "desc_too_long" };
        }
        if ("NameTooLong" in value) {
            return { kind: "name_too_long" };
        }
        if ("NameTooShort" in value) {
            return { kind: "name_too_short" };
        }
        if ("AvatarTooBig" in value) {
            return { kind: "avatar_too_big" };
        }
        if ("RulesTooLong" in value) {
            return { kind: "rules_too_long" };
        }
        if ("RulesTooShort" in value) {
            return { kind: "rules_too_short" };
        }
    }
    console.log("Failed to update group: ", value);
    if (value === "NameReserved") {
        return { kind: "name_reserved" };
    }
    if (value === "NotAuthorized") {
        return { kind: "not_authorized" };
    }
    if (value === "NameTaken") {
        return { kind: "name_taken" };
    }
    if (value === "CallerNotInGroup") {
        return { kind: "not_in_group" };
    }
    if (value === "UserSuspended") {
        return { kind: "user_suspended" };
    }
    if (value === "UserLapsed") {
        return { kind: "user_lapsed" };
    }
    if (value === "ChatFrozen") {
        return { kind: "chat_frozen" };
    }
    if (value === "AccessGateInvalid") {
        return { kind: "access_gate_invalid" };
    }
    if (value === "UserNotInChannel" ||
        value === "ChannelNotFound" ||
        value === "UserNotInCommunity" ||
        value === "CommunityFrozen" ||
        value === "ExternalUrlInvalid") {
        console.warn("UpdateGroupResponse failed with: ", value);
        return { kind: "failure" };
    }
    if (value === "InternalError") {
        return { kind: "internal_error" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiUpdateGroupResponse type received", value);
}
exports.updateGroupResponse = updateGroupResponse;
function createGroupResponse(value, id) {
    if (typeof value === "object") {
        if ("Success" in value) {
            if ("channel_id" in value.Success && id.kind === "channel") {
                const canisterId = {
                    kind: "channel",
                    communityId: id.communityId,
                    channelId: value.Success.channel_id.toString(),
                };
                return { kind: "success", canisterId };
            }
            if ("chat_id" in value.Success && id.kind === "group_chat") {
                const canisterId = {
                    kind: "group_chat",
                    groupId: (0, mapping_1.principalBytesToString)(value.Success.chat_id),
                };
                return { kind: "success", canisterId };
            }
            throw new Error("Unexpected CreateGroup success response: " + value.Success);
        }
        if ("NameTooLong" in value) {
            return { kind: "name_too_long" };
        }
        if ("NameTooShort" in value) {
            return { kind: "name_too_short" };
        }
        if ("DescriptionTooLong" in value) {
            return { kind: "description_too_long" };
        }
        if ("InternalError" in value) {
            return { kind: "internal_error" };
        }
        if ("RulesTooLong" in value) {
            return { kind: "rules_too_long" };
        }
        if ("RulesTooShort" in value) {
            return { kind: "rules_too_short" };
        }
        if ("AvatarTooBig" in value) {
            return { kind: "avatar_too_big" };
        }
        if ("MaxGroupsCreated" in value || "MaxChannelsCreated" in value) {
            return { kind: "max_groups_created" };
        }
    }
    if (value === "NameTaken") {
        return { kind: "group_name_taken" };
    }
    if (value === "NameReserved") {
        return { kind: "name_reserved" };
    }
    if (value === "Throttled") {
        return { kind: "throttled" };
    }
    if (value === "UserSuspended") {
        return { kind: "user_suspended" };
    }
    if (value === "UserLapsed") {
        return { kind: "user_lapsed" };
    }
    if (value === "UnauthorizedToCreatePublicGroup") {
        return { kind: "unauthorized_to_create_public_group" };
    }
    if (value === "NotAuthorized") {
        return openchat_shared_1.CommonResponses.notAuthorized();
    }
    if (value === "CommunityFrozen") {
        return openchat_shared_1.CommonResponses.communityFrozen();
    }
    if (value === "AccessGateInvalid") {
        return { kind: "access_gate_invalid" };
    }
    if (value === "ExternalUrlInvalid") {
        return { kind: "external_url_invalid" };
    }
    if (value === "InternalError") {
        return { kind: "internal_error" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiCreateGroupResponse type received", value);
}
exports.createGroupResponse = createGroupResponse;
function deleteGroupResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("DeleteGroupResponse failed with: ", value);
        return "failure";
    }
}
exports.deleteGroupResponse = deleteGroupResponse;
function pinMessageResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            eventIndex: value.Success.index,
            timestamp: value.Success.timestamp,
        };
    }
    else if (value === "NoChange") {
        return openchat_shared_1.CommonResponses.noChange();
    }
    else {
        console.warn("PinMessageResponse failed with: ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.pinMessageResponse = pinMessageResponse;
function unpinMessageResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value || "SuccessV2" in value) {
            return "success";
        }
    }
    if (value === "NoChange") {
        return "success";
    }
    else {
        console.warn("UnpinMessageResponse failed with: ", value);
        return "failure";
    }
}
exports.unpinMessageResponse = unpinMessageResponse;
function groupDetailsResponse(value) {
    if (value === "CallerNotInGroup" ||
        value === "PrivateCommunity" ||
        value === "PrivateChannel" ||
        value === "ChannelNotFound" ||
        "UserNotInChannel" in value ||
        "UserNotInCommunity" in value) {
        console.warn("GetGroupDetails failed with ", value);
        return "failure";
    }
    if ("Success" in value) {
        const members = ("participants" in value.Success ? value.Success.participants : value.Success.members).map(member);
        const basicMembers = "basic_members" in value.Success ? value.Success.basic_members : [];
        const membersSet = new Set();
        members.forEach((m) => membersSet.add(m.userId));
        for (const id of basicMembers) {
            const userId = (0, mapping_1.principalBytesToString)(id);
            if (membersSet.add(userId)) {
                members.push({
                    role: "member",
                    userId,
                    displayName: undefined,
                    lapsed: false,
                });
            }
        }
        return {
            members,
            blockedUsers: new Set(value.Success.blocked_users.map(mapping_1.principalBytesToString)),
            invitedUsers: new Set(value.Success.invited_users.map(mapping_1.principalBytesToString)),
            pinnedMessages: new Set(value.Success.pinned_messages),
            rules: value.Success.chat_rules,
            timestamp: value.Success.timestamp,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiDeleteMessageResponse type received", value);
}
exports.groupDetailsResponse = groupDetailsResponse;
function groupDetailsUpdatesResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                membersAddedOrUpdated: value.Success.members_added_or_updated.map(member),
                membersRemoved: new Set(value.Success.members_removed.map(mapping_1.principalBytesToString)),
                blockedUsersAdded: new Set(value.Success.blocked_users_added.map(mapping_1.principalBytesToString)),
                blockedUsersRemoved: new Set(value.Success.blocked_users_removed.map(mapping_1.principalBytesToString)),
                pinnedMessagesAdded: new Set(value.Success.pinned_messages_added),
                pinnedMessagesRemoved: new Set(value.Success.pinned_messages_removed),
                rules: value.Success.chat_rules,
                invitedUsers: (0, mapping_1.mapOptional)(value.Success.invited_users, (invited_users) => new Set(invited_users.map(mapping_1.principalBytesToString))),
                timestamp: value.Success.timestamp,
            };
        }
        else if ("SuccessNoUpdates" in value) {
            return {
                kind: "success_no_updates",
                timestamp: value.SuccessNoUpdates,
            };
        }
    }
    console.warn("Unexpected ApiSelectedUpdatesResponse type received", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.groupDetailsUpdatesResponse = groupDetailsUpdatesResponse;
function member(value) {
    return {
        role: memberRole(value.role),
        userId: (0, mapping_1.principalBytesToString)(value.user_id),
        displayName: undefined,
        lapsed: value.lapsed,
    };
}
exports.member = member;
function editMessageResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("EditMessageResponse failed with: ", value);
        return "failure";
    }
}
exports.editMessageResponse = editMessageResponse;
function declineInvitationResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("DeclineInvitationResponse failed with: ", value);
        return "failure";
    }
}
exports.declineInvitationResponse = declineInvitationResponse;
function leaveGroupResponse(value) {
    if (value === "Success" ||
        value === "GroupNotFound" ||
        value === "CallerNotInGroup" ||
        value === "UserNotInChannel" ||
        value === "ChannelNotFound") {
        return "success";
    }
    if (value === "LastOwnerCannotLeave") {
        return "owner_cannot_leave";
    }
    return "failure";
}
exports.leaveGroupResponse = leaveGroupResponse;
function deleteMessageResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("DeleteMessageResponse failed with: ", value);
        return "failure";
    }
}
exports.deleteMessageResponse = deleteMessageResponse;
function deletedMessageResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            content: messageContent(value.Success.content, "unknown"),
        };
    }
    else {
        console.warn("DeletedMessageResponse failed with: ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.deletedMessageResponse = deletedMessageResponse;
function undeleteMessageResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        if (value.Success.messages.length == 0) {
            return openchat_shared_1.CommonResponses.failure();
        }
        else {
            return {
                kind: "success",
                message: message(value.Success.messages[0]),
            };
        }
    }
    else {
        console.warn("UndeleteMessageResponse failed with: ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.undeleteMessageResponse = undeleteMessageResponse;
function threadPreviewsResponse(value, chatId, latestClientThreadUpdate) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "thread_previews_success",
                threads: value.Success.threads.map((t) => threadPreview(chatId, t)),
            };
        }
        if ("ReplicaNotUpToDate" in value) {
            throw error_1.ReplicaNotUpToDateError.byTimestamp(value.ReplicaNotUpToDate, latestClientThreadUpdate ?? BigInt(-1), false);
        }
    }
    console.warn("ThreadPreviewsResponse failed with: ", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.threadPreviewsResponse = threadPreviewsResponse;
function threadPreview(chatId, value) {
    return {
        chatId: { ...chatId },
        latestReplies: value.latest_replies.map(messageEvent).sort((e1, e2) => e1.index - e2.index),
        totalReplies: value.total_replies,
        rootMessage: messageEvent(value.root_message),
    };
}
exports.threadPreview = threadPreview;
function changeRoleResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else {
        console.warn("ChangeRoleResponse failed with: ", value);
        return "failure";
    }
}
exports.changeRoleResponse = changeRoleResponse;
function registerPollVoteResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return "success";
    }
    else {
        console.warn("RegisterPollVoteResponse failed with: ", value);
        return "failure";
    }
}
exports.registerPollVoteResponse = registerPollVoteResponse;
function apiChatIdentifier(chatId) {
    switch (chatId.kind) {
        case "group_chat":
            return { Group: (0, mapping_1.principalStringToBytes)(chatId.groupId) };
        case "direct_chat":
            return { Direct: (0, mapping_1.principalStringToBytes)(chatId.userId) };
        case "channel":
            return {
                Channel: [(0, mapping_1.principalStringToBytes)(chatId.communityId), BigInt(chatId.channelId)],
            };
    }
}
exports.apiChatIdentifier = apiChatIdentifier;
function joinGroupResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return { kind: "success", group: groupChatSummary(value.Success) };
        }
        else if ("AlreadyInGroupV2" in value) {
            return { kind: "success", group: groupChatSummary(value.AlreadyInGroupV2) };
        }
        else if ("GateCheckFailed" in value) {
            return {
                kind: "gate_check_failed",
                reason: gateCheckFailedReason(value.GateCheckFailed),
            };
        }
    }
    if (value === "Blocked") {
        return openchat_shared_1.CommonResponses.userBlocked();
    }
    else {
        console.warn("Join group failed with: ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.joinGroupResponse = joinGroupResponse;
function searchGroupChatResponse(value, chatId) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            matches: value.Success.matches.map((m) => messageMatch(m, chatId)),
        };
    }
    else {
        console.warn("SearchChat failed with ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.searchGroupChatResponse = searchGroupChatResponse;
function messageMatch(value, chatId) {
    return {
        chatId,
        messageIndex: value.message_index,
        score: value.score,
    };
}
exports.messageMatch = messageMatch;
function inviteCodeResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                code: (0, mapping_1.mapOptional)(value.Success.code, openchat_shared_1.codeToText),
            };
        }
    }
    if (value === "NotAuthorized") {
        return {
            kind: "not_authorized",
        };
    }
    else {
        console.warn("InviteCode failed with ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.inviteCodeResponse = inviteCodeResponse;
function enableOrResetInviteCodeResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return {
                kind: "success",
                code: (0, openchat_shared_1.codeToText)(value.Success.code),
            };
        }
        else if ("NotAuthorized" in value) {
            return {
                kind: "not_authorized",
            };
        }
    }
    console.warn("ResetInviteCode failed with ", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.enableOrResetInviteCodeResponse = enableOrResetInviteCodeResponse;
function disableInviteCodeResponse(value) {
    if (value === "Success") {
        return "success";
    }
    else if (value === "NotAuthorized") {
        return "not_authorized";
    }
    console.warn("DisableInviteCode failed with ", value);
    return "failure";
}
exports.disableInviteCodeResponse = disableInviteCodeResponse;
function registerProposalVoteResponse(value) {
    if (typeof value === "object") {
        if ("AlreadyVoted" in value) {
            return "already_voted";
        }
        if ("InternalError" in value) {
            return "internal_error";
        }
    }
    if (value === "Success") {
        return "success";
    }
    if (value === "CallerNotInGroup") {
        return "caller_not_in_group";
    }
    if (value === "UserNotInChannel") {
        return "user_not_in_channel";
    }
    if (value === "ChannelNotFound") {
        return "channel_not_found";
    }
    if (value === "UserNotInCommunity") {
        return "user_not_in_community";
    }
    if (value === "CommunityFrozen") {
        return "community_frozen";
    }
    if (value === "NoEligibleNeurons") {
        return "no_eligible_neurons";
    }
    if (value === "ProposalNotAcceptingVotes") {
        return "proposal_not_accepting_votes";
    }
    if (value === "ProposalNotFound") {
        return "proposal_not_found";
    }
    if (value === "ProposalMessageNotFound") {
        return "proposal_message_not_found";
    }
    if (value === "UserSuspended") {
        return "user_suspended";
    }
    if (value === "UserLapsed") {
        return "user_lapsed";
    }
    if (value === "ChatFrozen") {
        return "chat_frozen";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiRegisterProposalVoteResponse type received", value);
}
exports.registerProposalVoteResponse = registerProposalVoteResponse;
function claimPrizeResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    else {
        console.warn("ClaimPrize failed with ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.claimPrizeResponse = claimPrizeResponse;
function statusError(value) {
    if ("Reserved" in value) {
        return {
            kind: "already_reserved",
            reservedBy: (0, mapping_1.principalBytesToString)(value.Reserved.reserved_by),
        };
    }
    if ("Accepted" in value) {
        return {
            kind: "already_accepted",
            acceptedBy: (0, mapping_1.principalBytesToString)(value.Accepted.accepted_by),
            token1TxnIn: value.Accepted.token1_txn_in,
        };
    }
    if ("Completed" in value) {
        const { accepted_by, token1_txn_in, token0_txn_out, token1_txn_out } = value.Completed;
        return {
            kind: "already_completed",
            acceptedBy: (0, mapping_1.principalBytesToString)(accepted_by),
            token1TxnIn: token1_txn_in,
            token0TxnOut: token0_txn_out,
            token1TxnOut: token1_txn_out,
        };
    }
    if ("Cancelled" in value) {
        return {
            kind: "swap_cancelled",
            token0TxnOut: value.Cancelled.token0_txn_out,
        };
    }
    if ("Expired" in value) {
        return {
            kind: "swap_expired",
            token0TxnOut: value.Expired.token0_txn_out,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected SwapStatusError type received", value);
}
exports.statusError = statusError;
function acceptP2PSwapResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return { kind: "success", token1TxnIn: value.Success.token1_txn_in };
        }
        if ("StatusError" in value) {
            return statusError(value.StatusError);
        }
        if ("InternalError" in value) {
            return { kind: "internal_error", text: value.InternalError };
        }
        if ("PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
            return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
        }
    }
    if (value === "ChatNotFound")
        return { kind: "chat_not_found" };
    if (value === "UserNotInGroup")
        return { kind: "user_not_in_group" };
    if (value === "UserNotInCommunity")
        return { kind: "user_not_in_community" };
    if (value === "UserNotInChannel")
        return { kind: "user_not_in_channel" };
    if (value === "ChannelNotFound")
        return { kind: "channel_not_found" };
    if (value === "SwapNotFound")
        return { kind: "swap_not_found" };
    if (value === "ChatFrozen")
        return { kind: "chat_frozen" };
    if (value === "UserSuspended")
        return { kind: "user_suspended" };
    if (value === "UserLapsed")
        return { kind: "user_lapsed" };
    if (value === "InsufficientFunds")
        return { kind: "insufficient_funds" };
    if (value === "PinRequired")
        return { kind: "pin_required" };
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiAcceptP2PSwapResponse type received", value);
}
exports.acceptP2PSwapResponse = acceptP2PSwapResponse;
function cancelP2PSwapResponse(value) {
    if (value === "Success") {
        return { kind: "success" };
    }
    if (typeof value === "object" && "StatusError" in value) {
        return statusError(value.StatusError);
    }
    if (value === "ChatNotFound")
        return { kind: "chat_not_found" };
    if (value === "UserNotInGroup")
        return { kind: "user_not_in_group" };
    if (value === "UserNotInCommunity")
        return { kind: "user_not_in_community" };
    if (value === "UserNotInChannel")
        return { kind: "user_not_in_channel" };
    if (value === "ChannelNotFound")
        return { kind: "channel_not_found" };
    if (value === "ChatFrozen")
        return { kind: "chat_frozen" };
    if (value === "SwapNotFound")
        return { kind: "swap_not_found" };
    if (value === "UserSuspended")
        return { kind: "user_suspended" };
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiCancelP2PSwapResponse type received", value);
}
exports.cancelP2PSwapResponse = cancelP2PSwapResponse;
function joinVideoCallResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "AlreadyEnded") {
        return "ended";
    }
    console.warn("JoinVideoCall failed with ", value);
    return "failure";
}
exports.joinVideoCallResponse = joinVideoCallResponse;
function apiVideoCallPresence(domain) {
    switch (domain) {
        case "default":
            return "Default";
        case "hidden":
            return "Hidden";
        case "owner":
            return "Owner";
    }
}
exports.apiVideoCallPresence = apiVideoCallPresence;
function setVideoCallPresence(value) {
    if (typeof value === "object" && "Success" in value)
        return "success";
    console.warn("SetVideoCallPresence failed with: ", value);
    return "failure";
}
exports.setVideoCallPresence = setVideoCallPresence;
function videoCallParticipantsResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return {
            kind: "success",
            participants: value.Success.participants.map(videoCallParticipant),
            hidden: value.Success.hidden.map(videoCallParticipant),
            lastUpdated: value.Success.last_updated,
        };
    }
    console.warn("VideoCallParticipants failed with: ", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.videoCallParticipantsResponse = videoCallParticipantsResponse;
function setPinNumberResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    if (typeof value === "object") {
        if ("PinIncorrect" in value || "TooManyFailedPinAttempts" in value) {
            return (0, pinNumberErrorMapper_1.pinNumberFailureResponseV2)(value);
        }
        if ("TooShort" in value) {
            return { kind: "too_short", minLength: value.TooShort.min_length };
        }
        if ("TooLong" in value) {
            return { kind: "too_long", maxLength: value.TooLong.max_length };
        }
        if ("MalformedSignature" in value) {
            return { kind: "malformed_signature" };
        }
    }
    if (value === "PinRequired") {
        return { kind: "pin_required" };
    }
    if (value === "DelegationTooOld") {
        return { kind: "delegation_too_old" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSetPinNumberResponse type received", value);
}
exports.setPinNumberResponse = setPinNumberResponse;
function apiDexId(dex) {
    switch (dex) {
        case "icpswap":
            return "ICPSwap";
        case "kongswap":
            return "KongSwap";
        case "sonic":
            return "Sonic";
    }
}
exports.apiDexId = apiDexId;
