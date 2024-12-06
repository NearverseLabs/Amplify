"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCachedBtcAddressResponse = exports.UserPinChatResponse = exports.UserAddHotGroupExclusionsResponse = exports.UserUnblockUserResponse = exports.UserTipMessageResponse = exports.UserMessageActivityFeedArgs = exports.UserSwapTokensSuccessResult = exports.UserTokenSwapStatusTokenSwapStatus = exports.UserTokenSwapStatusArgs = exports.UserJoinVideoCallResponse = exports.UserBioResponse = exports.UserMarkAchievementsSeenResponse = exports.UserMarkAchievementsSeenArgs = exports.UserMessageActivitySummary = exports.UserManageFavouriteChatsResponse = exports.ChannelId = exports.GroupFollowThreadResponse = exports.GroupSummaryArgs = exports.GroupEditMessageResponse = exports.GroupReportMessageResponse = exports.GroupSelectedUpdatesArgs = exports.GroupDeclineInvitiationResponse = exports.GroupRemoveParticipantResponse = exports.GroupBlockUserResponse = exports.GroupRulesSuccessResult = exports.GroupRulesArgs = exports.GroupAddReactionResponse = exports.GroupRemoveReactionResponse = exports.GroupPublicSummaryArgs = exports.GroupRegisterProposalVoteV2Response = exports.GroupDisableInviteCodeArgs = exports.GroupDisableInviteCodeResponse = exports.GroupRegisterProposalVoteResponse = exports.GroupEnableInviteCodeSuccessResult = exports.GroupEnableInviteCodeArgs = exports.GroupDeleteMessagesResponse = exports.GroupUnfollowThreadResponse = exports.GroupUnblockUserResponse = exports.GroupInviteCodeResponse = exports.GroupInviteCodeSuccessResult = exports.GroupChangeRoleResponse = exports.GroupSetVideoCallPresenceResponse = exports.GroupCancelInvitesResponse = exports.GroupToggleMuteNotificationsResponse = exports.GroupToggleMuteNotificationsArgs = exports.GroupSummaryUpdatesArgs = exports.OnlineUsersMarkAsOnlineResponse = exports.ReferralStatus = exports.ProposalsBotTreasury = exports.ProposalsBotCanisterInstallMode = void 0;
exports.CanisterUpgradeStatus = exports.ProposalDecisionStatus = exports.ExchangeId = exports.CommunityRole = exports.SubscriptionKeys = exports.SwapStatusErrorCancelled = exports.SuspensionAction = exports.VoteOperation = exports.EventIndex = exports.DiamondMembershipPlanDuration = exports.MessageIndex = exports.FieldTooShortResult = exports.Reaction = exports.MessageReminderContent = exports.UserConfigureWalletResponse = exports.UserUnpinChatResponse = exports.UserMarkMessageActivityFeedReadArgs = exports.UserMarkMessageActivityFeedReadResponse = exports.UserEditMessageResponse = exports.UserAutoWallet = exports.UserReportMessageResponse = exports.UserNamedAccount = exports.UserChitEventsArgs = exports.UserDeleteCommunityResponse = exports.UserCancelMessageReminderArgs = exports.UserCancelMessageReminderResponse = exports.UserLeaveCommunityResponse = exports.UserMarkReadResponse = exports.UserRetrieveBtcArgs = exports.UserRetrieveBtcResponse = exports.UserPublicProfilePublicProfile = exports.UserReclaimSwapTokensResponse = exports.UserStartVideoCallResponse = exports.UserSetCommunityIndexesResponse = exports.UserBlockUserResponse = exports.UserMessageActivity = exports.UserTokenSwapsArgs = exports.UserEndVideoCallResponse = exports.UserDeleteGroupResponse = exports.UserClaimDailyChitResponse = exports.UserClaimDailyChitSuccessResult = exports.UserSetBioArgs = exports.UserBtcAddressResponse = exports.UserMuteNotificationsResponse = exports.UserLeaveGroupResponse = exports.UserSubmitProposalResponse = exports.UserUpdatesArgs = exports.UserSaveCryptoAccountResponse = exports.UserDeleteMessagesResponse = exports.UserDeleteDirectChatResponse = void 0;
exports.TextContent = exports.P2PSwapCancelled = exports.VideoCallAccessTokenArgs = exports.VerifiedCredentialArgumentValue = exports.CommunityMembership = exports.OptionalCommunityPermissions = exports.Version = exports.BotConfig = exports.GroupInviteCodeChange = exports.DirectChatCreated = exports.MessageMatch = exports.TransferFromError = exports.MessageReminderCreatedContent = exports.CryptoAccountNNS = exports.MembersAddedToDefaultChannel = exports.InvalidPollReason = exports.ChitEarnedReason = exports.Cryptocurrency = exports.OptionUpdateGroupPermissionRole = exports.BuildVersion = exports.PushEventResult = exports.GroupReplyContext = exports.ThumbnailData = exports.Empty = exports.Achievement = exports.GiphyImageVariant = exports.Chit = exports.FieldTooLongResult = exports.CommunityPermissions = exports.OptionUpdatePinNumberSettings = exports.ProposalRewardStatus = exports.CommunityPermissionRole = exports.UserSummaryVolatile = exports.OptionUpdateVideoCall = exports.SubscriptionInfo = exports.Rules = exports.Tokens = exports.GroupCanisterThreadDetails = exports.OptionUpdateU64 = exports.AcceptSwapSuccess = exports.GroupPermissionRole = exports.GroupRole = exports.VideoCall = exports.VideoCallType = exports.ChatMetrics = exports.VideoCallPresence = exports.ApproveError = exports.PinNumberSettings = exports.SwapStatusErrorExpired = exports.OptionUpdateU128 = void 0;
exports.UserIndexSuspendUserResponse = exports.UserIndexUpdateDiamondMembershipSubscriptionResponse = exports.UserIndexUpdateDiamondMembershipSubscriptionArgs = exports.UserIndexPublicKeyResponse = exports.UserIndexUsersChitSuccessResult = exports.UserIndexDiamondMembershipFeesDiamondMembershipFees = exports.RegistrySetTokenEnabledArgs = exports.RegistrySetTokenEnabledResponse = exports.RegistryUpdatesArgs = exports.RegistryAddRemoveSwapProviderArgs = exports.RegistryAddRemoveSwapProviderResponse = exports.RegistryNervousSystemSummary = exports.RegistryRemoveMessageFilterArgs = exports.RegistryRemoveMessageFilterResponse = exports.RegistryMessageFilterSummary = exports.RegistrySetAirdropConfigResponse = exports.RegistryAddMessageFilterResponse = exports.RegistryAddMessageFilterArgs = exports.StorageIndexAllocationBucketArgs = exports.StorageIndexAllocationBucketResponse = exports.StorageIndexAllocationBucketSuccessResult = exports.StorageIndexProjectedAllowance = exports.StorageIndexUserResponse = exports.StorageIndexUserUserRecord = exports.StorageIndexCanForwardArgs = exports.GroupIndexSetCommunityUpgradeConcurrencyArgs = exports.GroupIndexSetCommunityUpgradeConcurrencyResponse = exports.GroupIndexExploreGroupsArgs = exports.GroupIndexRemoveHotGroupExclusionResponse = exports.GroupIndexSetCommunityModerationFlagsResponse = exports.GroupIndexDeleteFrozenGroupResponse = exports.GroupIndexSetGroupUpgradeConcurrencyArgs = exports.GroupIndexSetGroupUpgradeConcurrencyResponse = exports.GroupIndexFreezeCommunitySuspensionDetails = exports.GroupIndexExploreCommunitiesArgs = exports.GroupIndexMarkLocalGroupIndexFullResponse = exports.GroupIndexMarkLocalGroupIndexFullArgs = exports.GroupIndexAddHotGroupExclusionResponse = exports.GroupIndexFreezeGroupSuspensionDetails = exports.DiamondMembershipSubscription = exports.UserGroupSummary = exports.DiamondMembershipFeesByDuration = exports.Tally = exports.PollConfig = exports.DiamondMembershipStatus = exports.OptionUpdateString = exports.UpdatedRules = exports.TSBytes = exports.CustomPermission = exports.MessageId = void 0;
exports.CommunityDeletedMessageArgs = exports.CommunitySetVideoCallPresenceResponse = exports.CommunitySetVideoCallPresenceArgs = exports.CommunityJoinVideoCallArgs = exports.CommunityCreateUserGroupResponse = exports.CommunityCreateUserGroupSuccessResult = exports.CommunityCancelInvitesResponse = exports.CommunityClaimPrizeArgs = exports.CommunityToggleMuteNotificationsArgs = exports.CommunityToggleMuteNotificationsResponse = exports.CommunityRemoveMemberResponse = exports.CommunityLeaveChannelArgs = exports.CommunityLeaveChannelResponse = exports.CommunitySelectedChannelUpdatesArgs = exports.CommunitySummaryUpdatesArgs = exports.LocalUserIndexGroupAndCommunitySummaryUpdatesSummaryUpdatesArgs = exports.LocalUserIndexReportMessageResponse = exports.LocalUserIndexChatEventsEventsArgsInner = exports.LocalUserIndexChatEventsEventsPageArgs = exports.LocalUserIndexChatEventsEventsWindowArgs = exports.LocalUserIndexChatEventsEventsByIndexArgs = exports.LocalUserIndexRegisterUserArgs = exports.LocalUserIndexAccessTokenResponse = exports.LocalUserIndexInviteUsersToGroupResponse = exports.LocalUserIndexInviteUsersToCommunityResponse = exports.UserIndexUserRegistrationCanisterResponse = exports.UserIndexReportedMessagesResponse = exports.UserIndexReportedMessagesSuccessResult = exports.UserIndexSetDiamondMembershipFeesResponse = exports.UserIndexSetDisplayNameArgs = exports.UserIndexSetDisplayNameResponse = exports.UserIndexSetUsernameArgs = exports.UserIndexSetUsernameResponse = exports.UserIndexSubmitProofOfUniquePersonhoodArgs = exports.UserIndexSubmitProofOfUniquePersonhoodResponse = exports.UserIndexUnsuspendUserResponse = exports.UserIndexDeleteUserResponse = exports.UserIndexSearchArgs = exports.UserIndexPayForDiamondMembershipArgs = exports.UserIndexPayForDiamondMembershipResponse = exports.UserIndexPayForDiamondMembershipSuccessResult = exports.UserIndexReferralMetricsReferralMetrics = exports.UserIndexExternalAchievementsArgs = exports.UserIndexExternalAchievementsExternalAchievement = exports.UserIndexSetUserUpgradeConcurrencyResponse = exports.UserIndexSetUserUpgradeConcurrencyArgs = exports.UserIndexSetModerationFlagsResponse = exports.UserIndexSetModerationFlagsArgs = exports.UserIndexCheckUsernameArgs = exports.UserIndexCheckUsernameResponse = void 0;
exports.CommunityEventsArgs = exports.CommunityLocalUserIndexResponse = exports.CommunityEventsByIndexArgs = exports.CommunitySendMessageResponse = exports.CommunitySendMessageSuccessResult = exports.CommunityVideoCallParticipantsArgs = exports.CommunityPinMessageResponse = exports.CommunityPinMessageArgs = exports.CommunityBlockUserResponse = exports.CommunityThreadPreviewsArgs = exports.CommunityAddReactionResponse = exports.CommunityAddReactionArgs = exports.CommunitySelectedInitialArgs = exports.CommunityRemoveReactionResponse = exports.CommunityRemoveReactionArgs = exports.CommunityUpdateCommunityResponse = exports.CommunityUpdateCommunitySuccessResult = exports.CommunityDeleteUserGroupsArgs = exports.CommunityDeleteUserGroupsResponse = exports.CommunityRegisterProposalVoteV2Response = exports.CommunityRegisterProposalVoteV2Args = exports.CommunityMessagesByMessageIndexArgs = exports.CommunityDeclineInvitationResponse = exports.CommunityDeclineInvitationArgs = exports.CommunityChangeChannelRoleResponse = exports.CommunityChannelSummaryArgs = exports.CommunityDisableInviteCodeResponse = exports.CommunityRegisterProposalVoteResponse = exports.CommunityRegisterProposalVoteArgs = exports.CommunityEnableInviteCodeResponse = exports.CommunityEnableInviteCodeSuccessResult = exports.CommunityRemoveMemberFromChannelResponse = exports.CommunityDeleteMessagesArgs = exports.CommunityDeleteMessagesResponse = exports.CommunityUnfollowThreadResponse = exports.CommunityUnfollowThreadArgs = exports.CommunityEventsWindowArgs = exports.CommunityUpdateUserGroupResponse = exports.CommunityChannelSummaryUpdatesArgs = exports.CommunityExploreChannelsArgs = exports.CommunityUnblockUserResponse = exports.CommunityInviteCodeResponse = exports.CommunityInviteCodeSuccessResult = exports.CommunitySelectedChannelInitialArgs = exports.CommunityChangeRoleResponse = exports.CommunityUndeleteMessagesArgs = exports.CommunitySearchChannelResponse = exports.CommunitySearchChannelSuccessResult = exports.CommunityCancelP2pSwapArgs = exports.CommunityRegisterPollVoteArgs = void 0;
exports.GroupDeleteMessagesArgs = exports.GroupUnfollowThreadArgs = exports.GroupEventsWindowArgs = exports.GroupUndeleteMessagesArgs = exports.GroupCancelP2pSwapArgs = exports.GroupRegisterPollVoteArgs = exports.GroupDeletedMessageArgs = exports.GroupSetVideoCallPresenceArgs = exports.GroupJoinVideoCallArgs = exports.GroupClaimPrizeArgs = exports.GroupConvertIntoCommunityArgs = exports.GroupSearchMessagesResponse = exports.GroupSearchMessagesSuccessResult = exports.ProposalsBotUpgradeSnsControlledCanister = exports.ProposalsBotExecuteGenericNervousSystemFunction = exports.StorageBucketForwardFileArgs = exports.StorageBucketForwardFileResponse = exports.StorageBucketDeleteFileArgs = exports.StorageBucketDeleteFileResponse = exports.StorageBucketUploadChunkArgs = exports.StorageBucketUploadChunkResponse = exports.StorageBucketFileInfoResponse = exports.StorageBucketFileInfoSuccessResult = exports.StorageBucketFileInfoArgs = exports.StorageBucketDeleteFilesDeleteFileFailure = exports.StorageBucketDeleteFilesArgs = exports.StorageBucketDeleteFilesDeleteFileFailureReason = exports.NotificationsIndexRemoveSubscriptionResponse = exports.NotificationsIndexRemoveSubscriptionArgs = exports.NotificationsIndexSubscriptionExistsResponse = exports.NotificationsIndexSubscriptionExistsArgs = exports.NotificationsIndexRemoveSubscriptionsForUserResponse = exports.NotificationsIndexPushSubscriptionArgs = exports.NotificationsIndexPushSubscriptionResponse = exports.CommunityDeleteChannelArgs = exports.CommunityDeleteChannelResponse = exports.CommunityFollowThreadArgs = exports.CommunityFollowThreadResponse = exports.CommunitySummaryArgs = exports.CommunitySetMemberDisplayNameResponse = exports.CommunitySetMemberDisplayNameArgs = exports.CommunityUpdateChannelSuccessResult = exports.CommunityEditMessageResponse = exports.CommunityReportMessageResponse = exports.CommunityReportMessageArgs = exports.CommunityImportGroupResponse = exports.CommunityImportGroupSuccessResult = exports.CommunitySelectedUpdatesArgs = exports.CommunityCreateChannelSuccessResult = exports.CommunityAcceptP2pSwapArgs = void 0;
exports.CommunityMembershipUpdates = exports.AccountICRC1 = exports.VersionedRules = exports.PaymentGate = exports.UserConfigureWalletArgs = exports.UserLocalUserIndexResponse = exports.UserMarkReadChannelMessagesRead = exports.UserMarkReadThreadRead = exports.UserPublicProfileResponse = exports.UserReclaimSwapTokensArgs = exports.UserAddReactionResponse = exports.UserSetContactResponse = exports.UserRemoveReactionResponse = exports.UserSetMessageReminderResponse = exports.UserApproveTransferResponse = exports.UserChannelSummary = exports.UserSetBioResponse = exports.UserWalletConfig = exports.UserChannelSummaryUpdates = exports.UserManualWallet = exports.UserSetAvatarResponse = exports.UserSwapTokensResponse = exports.UserSwapTokensICPSwapArgs = exports.UserSetPinNumberResponse = exports.UserTokenSwapStatusResponse = exports.UserSavedCryptoAccountsResponse = exports.UserSearchMessagesResponse = exports.UserSearchMessagesSuccessResult = exports.GroupFollowThreadArgs = exports.GroupReportMessageArgs = exports.GroupAcceptP2pSwapArgs = exports.GroupEventsArgs = exports.GroupLocalUserIndexResponse = exports.GroupUnpinMessageResponse = exports.GroupUnpinMessageArgs = exports.GroupEventsByIndexArgs = exports.GroupSendMessageResponse = exports.GroupSendMessageSuccessResult = exports.GroupVideoCallParticipantsArgs = exports.GroupPinMessageArgs = exports.GroupPinMessageResponse = exports.GroupRulesResponse = exports.GroupThreadPreviewsArgs = exports.GroupAddReactionArgs = exports.GroupRemoveReactionArgs = exports.GroupRegisterProposalVoteV2Args = exports.GroupMessagesByMessageIndexArgs = exports.GroupRegisterProposalVoteArgs = exports.GroupUpdateGroupSuccessResult = exports.GroupEnableInviteCodeResponse = void 0;
exports.GroupIndexRecommendedGroupsArgs = exports.UserGroupDetails = exports.MemberLeft = exports.BotCommandArgs = exports.DiamondMembershipDetails = exports.SuspensionDetails = exports.OptionUpdateDocument = exports.ThreadSummary = exports.MessageReport = exports.User = exports.CommunityMember = exports.UsersBlocked = exports.SnsProposal = exports.FailedCryptoTransactionNNS = exports.GroupMembershipUpdates = exports.GovernanceProposalsSubtype = exports.OptionalGroupPermissions = exports.VerifiedCredentialGateArgs = exports.UserOrAccount = exports.GroupMembership = exports.CompletedCryptoTransactionICRC1 = exports.CommunityId = exports.UserId = exports.ImageContent = exports.AudioContent = exports.PendingCryptoTransactionICRC2 = exports.OptionUpdateOptionalMessagePermissions = exports.CompletedCryptoTransactionNNS = exports.TokenInfo = exports.GateCheckFailedReason = exports.TokenBalanceGate = exports.FailedCryptoTransactionICRC1 = exports.CustomContent = exports.ChitEarned = exports.UserSummaryStable = exports.FileContent = exports.Document = exports.DiamondMembershipFees = exports.HydratedMention = exports.PendingCryptoTransactionICRC1 = exports.BlobReference = exports.NnsProposal = exports.VerifiedCredentialGate = exports.CryptoAccountICRC1 = exports.ChatId = exports.MessagePermissions = exports.Delegation = exports.OptionalMessagePermissions = exports.SnsNeuronGate = exports.GiphyContent = void 0;
exports.CommunityCancelInvitesArgs = exports.CommunityRemoveMemberArgs = exports.LocalUserIndexGroupAndCommunitySummaryUpdatesArgs = exports.LocalUserIndexInviteUsersToChannelArgs = exports.LocalUserIndexInviteUsersToChannelPartialSuccessResult = exports.LocalUserIndexInviteUsersToChannelFailedResult = exports.LocalUserIndexJoinChannelArgs = exports.LocalUserIndexJoinCommunityArgs = exports.LocalUserIndexChatEventsEventsContext = exports.LocalUserIndexRegisterUserSuccessResult = exports.LocalUserIndexJoinGroupArgs = exports.LocalUserIndexInviteUsersToGroupArgs = exports.LocalUserIndexInviteUsersToCommunityArgs = exports.UserIndexReportedMessagesArgs = exports.UserIndexPlatformModeratorsGroupResponse = exports.UserIndexSetDiamondMembershipFeesArgs = exports.UserIndexChitLeaderboardChitUserBalance = exports.UserIndexUsersArgs = exports.UserIndexUsersUserGroup = exports.UserIndexUnsuspendUserArgs = exports.UserIndexDeleteUserArgs = exports.UserIndexReferralMetricsResponse = exports.UserIndexUserArgs = exports.UserIndexExternalAchievementsResponse = exports.UserIndexExternalAchievementsSuccessResult = exports.UserIndexSuspectedBotsArgs = exports.UserIndexSuspectedBotsSuccessResult = exports.UserIndexPlatformModeratorsSuccessResult = exports.UserIndexPlatformOperatorsResponse = exports.UserIndexPlatformOperatorsSuccessResult = exports.UserIndexSuspendUserArgs = exports.UserIndexUsersChitArgs = exports.UserIndexUsersChitResponse = exports.UserIndexDiamondMembershipFeesResponse = exports.RegistryTokenDetails = exports.RegistryPayment = exports.RegistrySetAirdropConfigArgs = exports.StorageIndexCanForwardResponse = exports.GroupIndexUnfreezeGroupArgs = exports.GroupIndexActiveGroupsArgs = exports.GroupIndexRemoveHotGroupExclusionArgs = exports.GroupIndexSetCommunityModerationFlagsArgs = exports.GroupIndexDeleteFrozenGroupArgs = exports.GroupIndexFreezeCommunityArgs = exports.GroupIndexUnfreezeCommunityArgs = exports.GroupIndexLookupChannelByGroupIdArgs = exports.GroupIndexLookupChannelByGroupIdResponse = exports.GroupIndexLookupChannelByGroupIdSuccessResult = exports.GroupIndexAddHotGroupExclusionArgs = exports.GroupIndexFreezeGroupArgs = void 0;
exports.UserContactsSuccessResult = exports.UserContactsContact = exports.UserAddHotGroupExclusionsArgs = exports.UserUnblockUserArgs = exports.UserGroupChatSummaryUpdates = exports.UserUndeleteMessagesArgs = exports.UserSetAvatarArgs = exports.UserSwapTokensArgs = exports.UserSwapTokensExchangeArgs = exports.UserCommunitySummary = exports.UserCancelP2pSwapArgs = exports.UserDeletedMessageArgs = exports.UserCreateGroupSuccessResult = exports.UserJoinVideoCallArgs = exports.UserGroupChatSummary = exports.UserCommunitySummaryUpdates = exports.UserSearchMessagesArgs = exports.GroupRemoveParticipantArgs = exports.GroupBlockUserArgs = exports.GroupUpdateGroupResponse = exports.GroupUnblockUserArgs = exports.GroupChangeRoleArgs = exports.GroupCancelInvitesArgs = exports.GroupConvertIntoCommunityResponse = exports.GroupConvertIntoCommunitySuccessResult = exports.GroupSearchMessagesArgs = exports.OnlineUsersLastOnlineUserLastOnline = exports.OnlineUsersLastOnlineArgs = exports.ProposalsBotTransferSnsTreasuryFunds = exports.StorageBucketDeleteFilesResponse = exports.CommunityUpdateChannelResponse = exports.CommunityImportGroupArgs = exports.CommunitySelectedUpdatesResponse = exports.CommunitySelectedUpdatesSuccessResult = exports.CommunityCreateChannelResponse = exports.CommunityBlockUserArgs = exports.CommunitySelectedInitialSuccessResult = exports.CommunityChangeChannelRoleArgs = exports.CommunityAddMembersToChannelFailedResult = exports.CommunityAddMembersToChannelPartialSuccessResult = exports.CommunityAddMembersToChannelArgs = exports.CommunityAddMembersToChannelUserFailedError = exports.CommunityCommunityMembersSuccessResult = exports.CommunityCommunityMembersArgs = exports.CommunityRemoveMemberFromChannelArgs = exports.CommunityUpdateUserGroupArgs = exports.CommunityUnblockUserArgs = exports.CommunityChangeRoleArgs = exports.CommunitySearchChannelArgs = exports.CommunityCreateUserGroupArgs = void 0;
exports.PrizeContent = exports.GroupDescriptionChanged = exports.P2PSwapContentInitial = exports.MessagePinned = exports.SwapStatusErrorReserved = exports.MembersRemoved = exports.AvatarChanged = exports.CompletedCryptoTransactionICRC2 = exports.UserSummary = exports.P2PSwapReserved = exports.SignedDelegation = exports.GroupSubtype = exports.GroupPermissions = exports.VideoContent = exports.UserReportMessageArgs = exports.UserChitEventsSuccessResult = exports.UserDeleteCommunityArgs = exports.UserAcceptP2pSwapArgs = exports.UserLeaveCommunityArgs = exports.UserEventsArgs = exports.UserMarkReadCommunityMessagesRead = exports.UserMarkReadChatMessagesRead = exports.UserCreateCommunityResponse = exports.UserCreateCommunitySuccessResult = exports.UserEventsByIndexArgs = exports.UserSendMessageSuccessResult = exports.UserStartVideoCallArgs = exports.UserSetCommunityIndexesArgs = exports.UserBlockUserArgs = exports.UserReferral = exports.UserAddReactionArgs = exports.UserSetContactArgs = exports.UserSetContactOptionalContact = exports.UserRemoveReactionArgs = exports.UserTokenSwapsSuccessResult = exports.UserTokenSwapsTokenSwap = exports.UserEndVideoCallArgs = exports.UserDeleteGroupArgs = exports.UserApproveTransferArgs = exports.UserMessagesByMessageIndexArgs = exports.UserMuteNotificationsArgs = exports.UserLeaveGroupArgs = exports.UserUpdatesCommunitiesUpdates = exports.UserUpdatesGroupChatsUpdates = exports.UserHotGroupExclusionsResponse = exports.UserDeleteMessagesArgs = exports.UserInitialStateGroupChatsInitial = exports.UserInitialStateCommunitiesInitial = exports.UserDeleteDirectChatArgs = exports.UserEventsWindowArgs = void 0;
exports.RegistryUpdatesResponse = exports.RegistryUpdatesSuccessResult = exports.GroupIndexActiveGroupsSuccessResult = exports.OptionUpdateGroupSubtype = exports.DiamondMembershipStatusFull = exports.OptionUpdateAirdropConfig = exports.ReportedMessage = exports.ReplyContext = exports.ProposalContent = exports.OptionUpdateFrozenGroupInfo = exports.SelectedGroupUpdates = exports.GroupVisibilityChanged = exports.RoleChanged = exports.MemberJoined = exports.EventsTimeToLiveUpdated = exports.GroupUnfrozen = exports.FrozenGroupInfo = exports.MembersAdded = exports.AirdropConfig = exports.SwapStatusErrorCompleted = exports.VideoCallParticipants = exports.DeletedCommunityInfo = exports.PendingCryptoTransactionNNS = exports.UsersInvited = exports.Proposal = exports.FailedCryptoTransactionICRC2 = exports.AccessTokenType = exports.GroupFrozen = exports.PermissionsChanged = exports.CallParticipant = exports.Tips = exports.UsersUnblocked = exports.MultiUserChat = exports.TotalVotes = exports.MessageUnpinned = exports.GroupMember = exports.P2PSwapAccepted = exports.CompletedCryptoTransaction = exports.DeletedBy = exports.Chat = exports.AccessGateNonComposite = exports.GroupNameChanged = exports.GroupInviteCodeChanged = exports.P2PSwapCompleted = exports.SwapStatusErrorAccepted = exports.DeletedGroupInfo = exports.ExternalUrlUpdated = exports.UserSummaryV2 = exports.GroupCreated = exports.GroupRulesChanged = void 0;
exports.UserMarkReadArgs = exports.UserSendMessageWithTransferToChannelSuccessResult = exports.UserSendMessageResponse = exports.UserSendMessageTransferSuccessV2Result = exports.UserArchiveUnarchiveChatsPartialSuccessResult = exports.UserArchiveUnarchiveChatsArgs = exports.UserTokenSwapsResponse = exports.UserSetMessageReminderArgs = exports.UserSendMessageWithTransferToGroupSuccessResult = exports.UserSubmitProposalArgs = exports.UserUpdatesFavouriteChatsUpdates = exports.UserInitialStateFavouriteChatsInitial = exports.UserContactsResponse = exports.UserPinChatArgs = exports.UserChatInList = exports.UserTipMessageArgs = exports.UserMessageActivityFeedResponse = exports.UserMessageActivityFeedSuccessResult = exports.UserSetPinNumberArgs = exports.UserSetPinNumberPinNumberVerification = exports.UserCreateGroupResponse = exports.UserMessageActivityEvent = exports.UserManageFavouriteChatsArgs = exports.GroupSelectedUpdatesResponse = exports.GroupVideoCallParticipantsResponse = exports.GroupSelectedInitialResponse = exports.GroupSelectedInitialSuccessResult = exports.OnlineUsersLastOnlineResponse = exports.ProposalsBotProposalToSubmit = exports.ProposalsBotProposalToSubmitAction = exports.CommunityVideoCallParticipantsResponse = exports.CommunitySelectedInitialResponse = exports.CommunityAddMembersToChannelResponse = exports.CommunityCommunityMembersResponse = exports.CommunitySelectedChannelInitialSuccessResult = exports.CommunitySelectedChannelUpdatesResponse = exports.LocalUserIndexReportMessageArgs = exports.LocalUserIndexInviteUsersToChannelResponse = exports.LocalUserIndexChatEventsEventsArgs = exports.LocalUserIndexRegisterUserResponse = exports.LocalUserIndexAccessTokenArgs = exports.UserIndexCurrentUserResponse = exports.UserIndexCurrentUserSuccessResult = exports.UserIndexChitLeaderboardResponse = exports.UserIndexChitLeaderboardSuccessResult = exports.UserIndexSearchResponse = exports.UserIndexSearchResult = exports.UserIndexUserResponse = exports.UserIndexSuspectedBotsResponse = exports.UserIndexPlatformModeratorsResponse = void 0;
exports.GroupGateUpdated = exports.OptionUpdateAccessGateConfig = exports.MessageContentInitial = exports.AccessGateConfig = exports.GroupMatch = exports.MessageContent = exports.OptionUpdateAccessGate = exports.PrizeContentInitial = exports.CryptoContent = exports.PollContent = exports.UserAcceptP2pSwapResponse = exports.UserSendMessageWithTransferToChannelResponse = exports.UserArchiveUnarchiveChatsResponse = exports.UserWithdrawCryptoResponse = exports.UserWithdrawCryptoArgs = exports.UserSendMessageWithTransferToGroupResponse = exports.UserCancelP2pSwapResponse = exports.GroupAcceptP2pSwapResponse = exports.GroupCancelP2pSwapResponse = exports.GroupRegisterPollVoteResponse = exports.GroupClaimPrizeResponse = exports.CommunityAcceptP2pSwapResponse = exports.CommunitySelectedChannelInitialResponse = exports.CommunityCancelP2pSwapResponse = exports.CommunityRegisterPollVoteResponse = exports.CommunityClaimPrizeResponse = exports.LocalUserIndexChatEventsArgs = exports.UserIndexUsersResponse = exports.UserIndexUsersResult = exports.GroupIndexUnfreezeGroupResponse = exports.GroupIndexActiveGroupsResponse = exports.GroupIndexFreezeCommunityResponse = exports.GroupIndexUnfreezeCommunityResponse = exports.GroupIndexFreezeGroupResponse = exports.AccessGate = exports.P2PSwapContent = exports.SwapStatusError = exports.CurrentUserSummary = exports.PollVotes = exports.P2PSwapStatus = exports.CryptoTransaction = exports.PendingCryptoTransaction = exports.EventWrapperGroupUnfrozen = exports.CompositeGate = exports.FailedCryptoTransaction = exports.EventWrapperGroupFrozen = exports.VideoCallContent = exports.PrizeWinnerContent = exports.UserUnpinChatArgs = exports.UserChitEventsResponse = void 0;
exports.LocalUserIndexJoinGroupResponse = exports.GroupIndexRecommendedGroupsResponse = exports.GroupIndexRecommendedGroupsSuccessResult = exports.CommunityCanisterChannelSummary = exports.PublicGroupSummary = exports.DirectChatSummaryUpdates = exports.GroupCanisterGroupChatSummaryUpdates = exports.ThreadPreview = exports.EventWrapperChatEvent = exports.GroupCanisterGroupChatSummary = exports.MessagesResponse = exports.DirectChatSummary = exports.UserUndeleteMessagesResponse = exports.UserUndeleteMessagesSuccessResult = exports.GroupUndeleteMessagesResponse = exports.GroupUndeleteMessagesSuccessResult = exports.GroupDeletedMessageResponse = exports.CommunityExploreChannelsResponse = exports.CommunityExploreChannelsSuccessResult = exports.CommunityUndeleteMessagesResponse = exports.CommunityUndeleteMessagesSuccessResult = exports.GroupIndexExploreCommunitiesResponse = exports.GroupIndexExploreCommunitiesSuccessResult = exports.CommunityCanisterChannelSummaryUpdates = exports.ChatEvent = exports.EventWrapperMessage = exports.CommunityMatch = exports.Message = exports.ChannelMatch = exports.UserEditMessageArgs = exports.UserSendMessageWithTransferToChannelArgs = exports.UserCreateCommunityArgs = exports.UserSendMessageArgs = exports.UserSendMessageWithTransferToGroupArgs = exports.UserDeletedMessageResponse = exports.UserDeletedMessageSuccessResult = exports.UserCreateGroupArgs = exports.GroupEditMessageArgs = exports.GroupSendMessageArgs = exports.GroupUpdateGroupArgs = exports.GroupDeletedMessageSuccessResult = exports.CommunityUpdateChannelArgs = exports.CommunityEditMessageArgs = exports.CommunityCreateChannelArgs = exports.CommunitySendMessageArgs = exports.CommunityUpdateCommunityArgs = exports.CommunityDeletedMessageResponse = exports.CommunityDeletedMessageSuccessResult = exports.GroupIndexExploreGroupsResponse = exports.GroupIndexExploreGroupsSuccessResult = void 0;
exports.UserUpdatesResponse = exports.UserUpdatesSuccessResult = exports.UserInitialStateResponse = exports.UserInitialStateSuccessResult = exports.UserEventsResponse = exports.GroupEventsResponse = exports.GroupThreadPreviewsResponse = exports.CommunitySummaryResponse = exports.CommunityEventsResponse = exports.CommunitySummaryUpdatesResponse = exports.LocalUserIndexGroupAndCommunitySummaryUpdatesResponse = exports.LocalUserIndexGroupAndCommunitySummaryUpdatesSummaryUpdatesResponse = exports.LocalUserIndexJoinChannelResponse = exports.LocalUserIndexJoinCommunityResponse = exports.LocalUserIndexChatEventsResponse = exports.LocalUserIndexChatEventsSuccessResult = exports.LocalUserIndexChatEventsEventsResponse = exports.CommunityCanisterCommunitySummaryUpdates = exports.CommunityCanisterCommunitySummary = exports.EventsResponse = exports.UserMessagesByMessageIndexResponse = exports.UserUpdatesDirectChatsUpdates = exports.UserInitialStateDirectChatsInitial = exports.GroupSummaryResponse = exports.GroupSummarySuccessResult = exports.GroupThreadPreviewsSuccessResult = exports.GroupPublicSummaryResponse = exports.GroupPublicSummarySuccessResult = exports.GroupMessagesByMessageIndexResponse = exports.GroupSummaryUpdatesResponse = exports.GroupSummaryUpdatesSuccessResult = exports.CommunityThreadPreviewsResponse = exports.CommunityThreadPreviewsSuccessResult = exports.CommunityMessagesByMessageIndexResponse = exports.CommunityChannelSummaryResponse = exports.CommunityChannelSummaryUpdatesResponse = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.ProposalsBotCanisterInstallMode = typebox_1.Type.Union([
    typebox_1.Type.Literal("Install"),
    typebox_1.Type.Literal("Reinstall"),
    typebox_1.Type.Literal("Upgrade"),
]);
exports.ProposalsBotTreasury = typebox_1.Type.Union([typebox_1.Type.Literal("ICP"), typebox_1.Type.Literal("SNS")]);
exports.ReferralStatus = typebox_1.Type.Union([
    typebox_1.Type.Literal("Registered"),
    typebox_1.Type.Literal("Diamond"),
    typebox_1.Type.Literal("UniquePerson"),
    typebox_1.Type.Literal("LifetimeDiamond"),
]);
exports.OnlineUsersMarkAsOnlineResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserNotFound"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupSummaryUpdatesArgs = typebox_1.Type.Object({
    updates_since: typebox_1.Type.BigInt(),
});
exports.GroupToggleMuteNotificationsArgs = typebox_1.Type.Object({
    mute: typebox_1.Type.Boolean(),
});
exports.GroupToggleMuteNotificationsResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CallerNotInGroup"),
]);
exports.GroupCancelInvitesResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.GroupSetVideoCallPresenceResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("AlreadyEnded"),
    typebox_1.Type.Literal("GroupFrozen"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.GroupChangeRoleResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("Invalid"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupInviteCodeSuccessResult = typebox_1.Type.Object({
    code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupInviteCodeResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupInviteCodeSuccessResult,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
]);
exports.GroupUnblockUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("CannotUnblockSelf"),
    typebox_1.Type.Literal("GroupNotPublic"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupUnfollowThreadResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotFollowing"),
    typebox_1.Type.Literal("ThreadNotFound"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("GroupFrozen"),
]);
exports.GroupDeleteMessagesResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("NotPlatformModerator"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupEnableInviteCodeArgs = typebox_1.Type.Object({
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupEnableInviteCodeSuccessResult = typebox_1.Type.Object({
    code: typebox_1.Type.BigInt(),
});
exports.GroupRegisterProposalVoteResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        AlreadyVoted: typebox_1.Type.Boolean(),
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("NoEligibleNeurons"),
    typebox_1.Type.Literal("ProposalMessageNotFound"),
    typebox_1.Type.Literal("ProposalNotFound"),
    typebox_1.Type.Literal("ProposalNotAcceptingVotes"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupDisableInviteCodeResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupDisableInviteCodeArgs = typebox_1.Type.Object({
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupRegisterProposalVoteV2Response = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("ProposalMessageNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupPublicSummaryArgs = typebox_1.Type.Object({
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupRemoveReactionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupAddReactionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("InvalidReaction"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupRulesArgs = typebox_1.Type.Object({
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupRulesSuccessResult = typebox_1.Type.Object({
    rules: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.GroupBlockUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("CannotBlockSelf"),
    typebox_1.Type.Literal("CannotBlockUser"),
    typebox_1.Type.Literal("GroupNotPublic"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupRemoveParticipantResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("CannotRemoveSelf"),
    typebox_1.Type.Literal("CannotRemoveUser"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupDeclineInvitiationResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotInvited"),
]);
exports.GroupSelectedUpdatesArgs = typebox_1.Type.Object({
    updates_since: typebox_1.Type.BigInt(),
});
exports.GroupReportMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("AlreadyReported"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupEditMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupSummaryArgs = typebox_1.Type.Object({});
exports.GroupFollowThreadResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("AlreadyFollowing"),
    typebox_1.Type.Literal("ThreadNotFound"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("GroupFrozen"),
]);
exports.ChannelId = typebox_1.Type.BigInt();
exports.UserManageFavouriteChatsResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserMessageActivitySummary = typebox_1.Type.Object({
    read_up_to: typebox_1.Type.BigInt(),
    latest_event_timestamp: typebox_1.Type.BigInt(),
    unread_count: typebox_1.Type.Number(),
});
exports.UserMarkAchievementsSeenArgs = typebox_1.Type.Object({
    last_seen: typebox_1.Type.BigInt(),
});
exports.UserMarkAchievementsSeenResponse = typebox_1.Type.Literal("Success");
exports.UserBioResponse = typebox_1.Type.Object({
    Success: typebox_1.Type.String(),
});
exports.UserJoinVideoCallResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("AlreadyEnded"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserBlocked"),
    typebox_1.Type.Literal("ChatNotFound"),
]);
exports.UserTokenSwapStatusArgs = typebox_1.Type.Object({
    swap_id: typebox_1.Type.BigInt(),
});
exports.UserTokenSwapStatusTokenSwapStatus = typebox_1.Type.Object({
    started: typebox_1.Type.BigInt(),
    icrc2: typebox_1.Type.Boolean(),
    auto_withdrawals: typebox_1.Type.Boolean(),
    deposit_account: typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.Null(),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Null(),
    ]),
    transfer: typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.BigInt(),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Null(),
    ]),
    transfer_or_approval: typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.BigInt(),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Null(),
    ]),
    notify_dex: typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.Null(),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Null(),
    ]),
    amount_swapped: typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.Union([
                typebox_1.Type.Object({
                    Ok: typebox_1.Type.BigInt(),
                }),
                typebox_1.Type.Object({
                    Err: typebox_1.Type.String(),
                }),
            ]),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Null(),
    ]),
    withdraw_from_dex: typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.BigInt(),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Null(),
    ]),
    success: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
});
exports.UserSwapTokensSuccessResult = typebox_1.Type.Object({
    amount_out: typebox_1.Type.BigInt(),
});
exports.UserMessageActivityFeedArgs = typebox_1.Type.Object({
    since: typebox_1.Type.BigInt(),
});
exports.UserTipMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("CannotTipSelf"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("TransferCannotBeZero"),
    typebox_1.Type.Literal("TransferNotToMessageSender"),
    typebox_1.Type.Object({
        TransferFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Object({
        Retrying: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserUnblockUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserAddHotGroupExclusionsResponse = typebox_1.Type.Literal("Success");
exports.UserPinChatResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotFound"),
]);
exports.UserCachedBtcAddressResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("NotFound"),
]);
exports.UserDeleteDirectChatResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotFound"),
]);
exports.UserDeleteMessagesResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserSaveCryptoAccountResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("Invalid"),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserUpdatesArgs = typebox_1.Type.Object({
    updates_since: typebox_1.Type.BigInt(),
});
exports.UserSubmitProposalResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("GovernanceCanisterNotSupported"),
    typebox_1.Type.Object({
        InsufficientPayment: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Object({
        TransferFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        Retrying: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserLeaveGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("GroupNotFound"),
    typebox_1.Type.Literal("GroupNotPublic"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("OwnerCannotLeave"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserMuteNotificationsResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserBtcAddressResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserSetBioArgs = typebox_1.Type.Object({
    text: typebox_1.Type.String(),
});
exports.UserClaimDailyChitSuccessResult = typebox_1.Type.Object({
    chit_earned: typebox_1.Type.Number(),
    chit_balance: typebox_1.Type.Number(),
    streak: typebox_1.Type.Number(),
    next_claim: typebox_1.Type.BigInt(),
});
exports.UserClaimDailyChitResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserClaimDailyChitSuccessResult,
    }),
    typebox_1.Type.Object({
        AlreadyClaimed: typebox_1.Type.BigInt(),
    }),
]);
exports.UserDeleteGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserEndVideoCallResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("AlreadyEnded"),
]);
exports.UserTokenSwapsArgs = typebox_1.Type.Object({
    start: typebox_1.Type.Number(),
    max_results: typebox_1.Type.Number(),
});
exports.UserMessageActivity = typebox_1.Type.Union([
    typebox_1.Type.Literal("Mention"),
    typebox_1.Type.Literal("Reaction"),
    typebox_1.Type.Literal("QuoteReply"),
    typebox_1.Type.Literal("Tip"),
    typebox_1.Type.Literal("Crypto"),
    typebox_1.Type.Literal("PollVote"),
    typebox_1.Type.Literal("P2PSwapAccepted"),
]);
exports.UserBlockUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserSetCommunityIndexesResponse = typebox_1.Type.Literal("Success");
exports.UserStartVideoCallResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
]);
exports.UserReclaimSwapTokensResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        Failed: typebox_1.Type.String(),
    }),
]);
exports.UserPublicProfilePublicProfile = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    bio: typebox_1.Type.String(),
    is_premium: typebox_1.Type.Boolean(),
    phone_is_verified: typebox_1.Type.Boolean(),
    created: typebox_1.Type.BigInt(),
});
exports.UserRetrieveBtcResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        ApproveError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        RetrieveBtcError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserRetrieveBtcArgs = typebox_1.Type.Object({
    amount: typebox_1.Type.BigInt(),
    address: typebox_1.Type.String(),
});
exports.UserMarkReadResponse = typebox_1.Type.Literal("Success");
exports.UserLeaveCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityNotFound"),
    typebox_1.Type.Literal("CommunityNotPublic"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("LastOwnerCannotLeave"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserCancelMessageReminderResponse = typebox_1.Type.Literal("Success");
exports.UserCancelMessageReminderArgs = typebox_1.Type.Object({
    reminder_id: typebox_1.Type.BigInt(),
});
exports.UserDeleteCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserChitEventsArgs = typebox_1.Type.Object({
    from: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    to: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    skip: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Number(), typebox_1.Type.Undefined()])),
    max: typebox_1.Type.Number(),
    ascending: typebox_1.Type.Boolean(),
});
exports.UserNamedAccount = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    account: typebox_1.Type.String(),
});
exports.UserReportMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("AlreadyReported"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserAutoWallet = typebox_1.Type.Object({
    min_cents_visible: typebox_1.Type.Number(),
});
exports.UserEditMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("UserBlocked"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserMarkMessageActivityFeedReadResponse = typebox_1.Type.Literal("Success");
exports.UserMarkMessageActivityFeedReadArgs = typebox_1.Type.Object({
    read_up_to: typebox_1.Type.BigInt(),
});
exports.UserUnpinChatResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotFound"),
]);
exports.UserConfigureWalletResponse = typebox_1.Type.Literal("Success");
exports.MessageReminderContent = typebox_1.Type.Object({
    reminder_id: typebox_1.Type.BigInt(),
    notes: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.Reaction = typebox_1.Type.String();
exports.FieldTooShortResult = typebox_1.Type.Object({
    length_provided: typebox_1.Type.Number(),
    min_length: typebox_1.Type.Number(),
});
exports.MessageIndex = typebox_1.Type.Number();
exports.DiamondMembershipPlanDuration = typebox_1.Type.Union([
    typebox_1.Type.Literal("OneMonth"),
    typebox_1.Type.Literal("ThreeMonths"),
    typebox_1.Type.Literal("OneYear"),
    typebox_1.Type.Literal("Lifetime"),
]);
exports.EventIndex = typebox_1.Type.Number();
exports.VoteOperation = typebox_1.Type.Union([typebox_1.Type.Literal("RegisterVote"), typebox_1.Type.Literal("DeleteVote")]);
exports.SuspensionAction = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Unsuspend: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        Delete: typebox_1.Type.BigInt(),
    }),
]);
exports.SwapStatusErrorCancelled = typebox_1.Type.Object({
    token0_txn_out: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.SubscriptionKeys = typebox_1.Type.Object({
    p256dh: typebox_1.Type.String(),
    auth: typebox_1.Type.String(),
});
exports.CommunityRole = typebox_1.Type.Union([
    typebox_1.Type.Literal("Owner"),
    typebox_1.Type.Literal("Admin"),
    typebox_1.Type.Literal("Member"),
]);
exports.ExchangeId = typebox_1.Type.Union([
    typebox_1.Type.Literal("ICPSwap"),
    typebox_1.Type.Literal("Sonic"),
    typebox_1.Type.Literal("KongSwap"),
]);
exports.ProposalDecisionStatus = typebox_1.Type.Union([
    typebox_1.Type.Literal("Unspecified"),
    typebox_1.Type.Literal("Open"),
    typebox_1.Type.Literal("Rejected"),
    typebox_1.Type.Literal("Adopted"),
    typebox_1.Type.Literal("Executed"),
    typebox_1.Type.Literal("Failed"),
]);
exports.CanisterUpgradeStatus = typebox_1.Type.Union([
    typebox_1.Type.Literal("InProgress"),
    typebox_1.Type.Literal("NotRequired"),
]);
exports.OptionUpdateU128 = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: typebox_1.Type.BigInt(),
    }),
], { default: "NoChange" });
exports.SwapStatusErrorExpired = typebox_1.Type.Object({
    token0_txn_out: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.PinNumberSettings = typebox_1.Type.Object({
    length: typebox_1.Type.Number(),
    attempts_blocked_until: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.ApproveError = typebox_1.Type.Union([
    typebox_1.Type.Object({
        BadFee: typebox_1.Type.Object({
            expected_fee: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Object({
        InsufficientFunds: typebox_1.Type.Object({
            balance: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Object({
        AllowanceChanged: typebox_1.Type.Object({
            current_allowance: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Object({
        Expired: typebox_1.Type.Object({
            ledger_time: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Literal("TooOld"),
    typebox_1.Type.Object({
        CreatedInFuture: typebox_1.Type.Object({
            ledger_time: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Object({
        Duplicate: typebox_1.Type.Object({
            duplicate_of: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Literal("TemporarilyUnavailable"),
    typebox_1.Type.Object({
        GenericError: typebox_1.Type.Object({
            error_code: typebox_1.Type.BigInt(),
            message: typebox_1.Type.String(),
        }),
    }),
]);
exports.VideoCallPresence = typebox_1.Type.Union([
    typebox_1.Type.Literal("Default"),
    typebox_1.Type.Literal("Owner"),
    typebox_1.Type.Literal("Hidden"),
]);
exports.ChatMetrics = typebox_1.Type.Object({
    text_messages: typebox_1.Type.BigInt(),
    image_messages: typebox_1.Type.BigInt(),
    video_messages: typebox_1.Type.BigInt(),
    audio_messages: typebox_1.Type.BigInt(),
    file_messages: typebox_1.Type.BigInt(),
    polls: typebox_1.Type.BigInt(),
    poll_votes: typebox_1.Type.BigInt(),
    icp_messages: typebox_1.Type.BigInt(),
    sns1_messages: typebox_1.Type.BigInt(),
    ckbtc_messages: typebox_1.Type.BigInt(),
    chat_messages: typebox_1.Type.BigInt(),
    kinic_messages: typebox_1.Type.BigInt(),
    deleted_messages: typebox_1.Type.BigInt(),
    giphy_messages: typebox_1.Type.BigInt(),
    prize_messages: typebox_1.Type.BigInt(),
    prize_winner_messages: typebox_1.Type.BigInt(),
    replies: typebox_1.Type.BigInt(),
    edits: typebox_1.Type.BigInt(),
    reactions: typebox_1.Type.BigInt(),
    proposals: typebox_1.Type.BigInt(),
    reported_messages: typebox_1.Type.BigInt(),
    message_reminders: typebox_1.Type.BigInt(),
    custom_type_messages: typebox_1.Type.BigInt(),
    last_active: typebox_1.Type.BigInt(),
});
exports.VideoCallType = typebox_1.Type.Union([typebox_1.Type.Literal("Broadcast"), typebox_1.Type.Literal("Default")]);
exports.VideoCall = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    call_type: exports.VideoCallType,
});
exports.GroupRole = typebox_1.Type.Union([
    typebox_1.Type.Literal("Owner"),
    typebox_1.Type.Literal("Admin"),
    typebox_1.Type.Literal("Moderator"),
    typebox_1.Type.Literal("Participant"),
]);
exports.GroupPermissionRole = typebox_1.Type.Union([
    typebox_1.Type.Literal("None"),
    typebox_1.Type.Literal("Owner"),
    typebox_1.Type.Literal("Admins"),
    typebox_1.Type.Literal("Moderators"),
    typebox_1.Type.Literal("Members"),
]);
exports.AcceptSwapSuccess = typebox_1.Type.Object({
    token1_txn_in: typebox_1.Type.BigInt(),
});
exports.OptionUpdateU64 = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: typebox_1.Type.BigInt(),
    }),
], { default: "NoChange" });
exports.GroupCanisterThreadDetails = typebox_1.Type.Object({
    root_message_index: exports.MessageIndex,
    latest_event: exports.EventIndex,
    latest_message: exports.MessageIndex,
    last_updated: typebox_1.Type.BigInt(),
});
exports.Tokens = typebox_1.Type.Object({
    e8s: typebox_1.Type.BigInt(),
});
exports.Rules = typebox_1.Type.Object({
    text: typebox_1.Type.String(),
    enabled: typebox_1.Type.Boolean(),
});
exports.SubscriptionInfo = typebox_1.Type.Object({
    endpoint: typebox_1.Type.String(),
    keys: exports.SubscriptionKeys,
});
exports.OptionUpdateVideoCall = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.VideoCall,
    }),
], { default: "NoChange" });
exports.UserSummaryVolatile = typebox_1.Type.Object({
    total_chit_earned: typebox_1.Type.Number(),
    chit_balance: typebox_1.Type.Number(),
    streak: typebox_1.Type.Number(),
});
exports.CommunityPermissionRole = typebox_1.Type.Union([
    typebox_1.Type.Literal("Owners"),
    typebox_1.Type.Literal("Admins"),
    typebox_1.Type.Literal("Members"),
]);
exports.ProposalRewardStatus = typebox_1.Type.Union([
    typebox_1.Type.Literal("Unspecified"),
    typebox_1.Type.Literal("AcceptVotes"),
    typebox_1.Type.Literal("ReadyToSettle"),
    typebox_1.Type.Literal("Settled"),
]);
exports.OptionUpdatePinNumberSettings = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.PinNumberSettings,
    }),
], { default: "NoChange" });
exports.CommunityPermissions = typebox_1.Type.Object({
    change_roles: exports.CommunityPermissionRole,
    update_details: exports.CommunityPermissionRole,
    invite_users: exports.CommunityPermissionRole,
    remove_members: exports.CommunityPermissionRole,
    create_public_channel: exports.CommunityPermissionRole,
    create_private_channel: exports.CommunityPermissionRole,
    manage_user_groups: exports.CommunityPermissionRole,
});
exports.FieldTooLongResult = typebox_1.Type.Object({
    length_provided: typebox_1.Type.Number(),
    max_length: typebox_1.Type.Number(),
});
exports.Chit = typebox_1.Type.Object({
    balance: typebox_1.Type.Number(),
    streak: typebox_1.Type.Number(),
});
exports.GiphyImageVariant = typebox_1.Type.Object({
    width: typebox_1.Type.Number(),
    height: typebox_1.Type.Number(),
    url: typebox_1.Type.String(),
    mime_type: typebox_1.Type.String(),
});
exports.Achievement = typebox_1.Type.Union([
    typebox_1.Type.Literal("JoinedGroup"),
    typebox_1.Type.Literal("JoinedCommunity"),
    typebox_1.Type.Literal("SentDirectMessage"),
    typebox_1.Type.Literal("ReceivedDirectMessage"),
    typebox_1.Type.Literal("SetAvatar"),
    typebox_1.Type.Literal("SetBio"),
    typebox_1.Type.Literal("SetDisplayName"),
    typebox_1.Type.Literal("UpgradedToDiamond"),
    typebox_1.Type.Literal("UpgradedToGoldDiamond"),
    typebox_1.Type.Literal("Streak3"),
    typebox_1.Type.Literal("Streak7"),
    typebox_1.Type.Literal("Streak14"),
    typebox_1.Type.Literal("Streak30"),
    typebox_1.Type.Literal("Streak100"),
    typebox_1.Type.Literal("Streak365"),
    typebox_1.Type.Literal("SentPoll"),
    typebox_1.Type.Literal("SentText"),
    typebox_1.Type.Literal("SentImage"),
    typebox_1.Type.Literal("SentVideo"),
    typebox_1.Type.Literal("SentAudio"),
    typebox_1.Type.Literal("SentFile"),
    typebox_1.Type.Literal("SentGiphy"),
    typebox_1.Type.Literal("SentPrize"),
    typebox_1.Type.Literal("SentMeme"),
    typebox_1.Type.Literal("SentCrypto"),
    typebox_1.Type.Literal("SentP2PSwapOffer"),
    typebox_1.Type.Literal("StartedCall"),
    typebox_1.Type.Literal("ReactedToMessage"),
    typebox_1.Type.Literal("EditedMessage"),
    typebox_1.Type.Literal("RepliedInThread"),
    typebox_1.Type.Literal("QuoteReplied"),
    typebox_1.Type.Literal("TippedMessage"),
    typebox_1.Type.Literal("DeletedMessage"),
    typebox_1.Type.Literal("ForwardedMessage"),
    typebox_1.Type.Literal("ProvedUniquePersonhood"),
    typebox_1.Type.Literal("ReceivedCrypto"),
    typebox_1.Type.Literal("HadMessageReactedTo"),
    typebox_1.Type.Literal("HadMessageTipped"),
    typebox_1.Type.Literal("VotedOnPoll"),
    typebox_1.Type.Literal("SentReminder"),
    typebox_1.Type.Literal("JoinedCall"),
    typebox_1.Type.Literal("AcceptedP2PSwapOffer"),
    typebox_1.Type.Literal("SetCommunityDisplayName"),
    typebox_1.Type.Literal("Referred1stUser"),
    typebox_1.Type.Literal("Referred3rdUser"),
    typebox_1.Type.Literal("Referred10thUser"),
    typebox_1.Type.Literal("Referred20thUser"),
    typebox_1.Type.Literal("Referred50thUser"),
    typebox_1.Type.Literal("FollowedThread"),
    typebox_1.Type.Literal("FavouritedChat"),
    typebox_1.Type.Literal("SetPin"),
    typebox_1.Type.Literal("SwappedFromWallet"),
    typebox_1.Type.Literal("PinnedChat"),
    typebox_1.Type.Literal("ChangedTheme"),
]);
exports.Empty = typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Never());
exports.ThumbnailData = typebox_1.Type.String();
exports.GroupReplyContext = typebox_1.Type.Object({
    event_index: exports.EventIndex,
});
exports.PushEventResult = typebox_1.Type.Object({
    index: exports.EventIndex,
    timestamp: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.BuildVersion = typebox_1.Type.Object({
    major: typebox_1.Type.Number(),
    minor: typebox_1.Type.Number(),
    patch: typebox_1.Type.Number(),
});
exports.OptionUpdateGroupPermissionRole = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.GroupPermissionRole,
    }),
], { default: "NoChange" });
exports.Cryptocurrency = typebox_1.Type.Union([
    typebox_1.Type.Literal("InternetComputer"),
    typebox_1.Type.Literal("SNS1"),
    typebox_1.Type.Literal("CKBTC"),
    typebox_1.Type.Literal("CHAT"),
    typebox_1.Type.Literal("KINIC"),
    typebox_1.Type.Object({
        Other: typebox_1.Type.String(),
    }),
]);
exports.ChitEarnedReason = typebox_1.Type.Union([
    typebox_1.Type.Literal("DailyClaim"),
    typebox_1.Type.Object({
        Achievement: exports.Achievement,
    }),
    typebox_1.Type.Object({
        ExternalAchievement: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        Referral: exports.ReferralStatus,
    }),
    typebox_1.Type.Literal("MemeContestWinner"),
]);
exports.InvalidPollReason = typebox_1.Type.Union([
    typebox_1.Type.Object({
        TooFewOptions: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TooManyOptions: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        OptionTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("DuplicateOptions"),
    typebox_1.Type.Literal("EndDateInThePast"),
    typebox_1.Type.Literal("PollsNotValidForDirectChats"),
]);
exports.MembersAddedToDefaultChannel = typebox_1.Type.Object({
    count: typebox_1.Type.Number(),
});
exports.CryptoAccountNNS = typebox_1.Type.Union([
    typebox_1.Type.Literal("Mint"),
    typebox_1.Type.Object({
        Account: typebox_1.Type.Tuple([
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
        ]),
    }),
]);
exports.MessageReminderCreatedContent = typebox_1.Type.Object({
    reminder_id: typebox_1.Type.BigInt(),
    remind_at: typebox_1.Type.BigInt(),
    notes: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    hidden: typebox_1.Type.Boolean(),
});
exports.TransferFromError = typebox_1.Type.Union([
    typebox_1.Type.Object({
        BadFee: typebox_1.Type.Object({
            expected_fee: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Object({
        BadBurn: typebox_1.Type.Object({
            min_burn_amount: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Object({
        InsufficientFunds: typebox_1.Type.Object({
            balance: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Object({
        InsufficientAllowance: typebox_1.Type.Object({
            allowance: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Literal("TooOld"),
    typebox_1.Type.Object({
        CreatedInFuture: typebox_1.Type.Object({
            ledger_time: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Object({
        Duplicate: typebox_1.Type.Object({
            duplicate_of: typebox_1.Type.BigInt(),
        }),
    }),
    typebox_1.Type.Literal("TemporarilyUnavailable"),
    typebox_1.Type.Object({
        GenericError: typebox_1.Type.Object({
            error_code: typebox_1.Type.BigInt(),
            message: typebox_1.Type.String(),
        }),
    }),
]);
exports.MessageMatch = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    score: typebox_1.Type.Number(),
});
exports.DirectChatCreated = typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Never());
exports.GroupInviteCodeChange = typebox_1.Type.Union([
    typebox_1.Type.Literal("Enabled"),
    typebox_1.Type.Literal("Disabled"),
    typebox_1.Type.Literal("Reset"),
]);
exports.BotConfig = typebox_1.Type.Object({
    is_oc_controlled: typebox_1.Type.Boolean(),
    supports_direct_messages: typebox_1.Type.Boolean(),
    can_be_added_to_groups: typebox_1.Type.Boolean(),
});
exports.Version = typebox_1.Type.Number();
exports.OptionalCommunityPermissions = typebox_1.Type.Object({
    change_roles: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissionRole, typebox_1.Type.Undefined()])),
    update_details: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissionRole, typebox_1.Type.Undefined()])),
    invite_users: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissionRole, typebox_1.Type.Undefined()])),
    remove_members: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissionRole, typebox_1.Type.Undefined()])),
    create_public_channel: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissionRole, typebox_1.Type.Undefined()])),
    create_private_channel: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissionRole, typebox_1.Type.Undefined()])),
    manage_user_groups: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissionRole, typebox_1.Type.Undefined()])),
});
exports.CommunityMembership = typebox_1.Type.Object({
    joined: typebox_1.Type.BigInt(),
    role: exports.CommunityRole,
    rules_accepted: typebox_1.Type.Boolean(),
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    lapsed: typebox_1.Type.Boolean(),
});
exports.VerifiedCredentialArgumentValue = typebox_1.Type.Union([
    typebox_1.Type.Object({
        String: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        Int: typebox_1.Type.Number(),
    }),
]);
exports.VideoCallAccessTokenArgs = typebox_1.Type.Object({
    call_type: exports.VideoCallType,
});
exports.P2PSwapCancelled = typebox_1.Type.Object({
    token0_txn_out: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.TextContent = typebox_1.Type.Object({
    text: typebox_1.Type.String(),
});
exports.MessageId = typebox_1.Type.BigInt();
exports.CustomPermission = typebox_1.Type.Object({
    subtype: typebox_1.Type.String(),
    role: exports.GroupPermissionRole,
});
exports.TSBytes = typebox_1.Type.Uint8Array();
exports.UpdatedRules = typebox_1.Type.Object({
    text: typebox_1.Type.String(),
    enabled: typebox_1.Type.Boolean(),
    new_version: typebox_1.Type.Boolean(),
});
exports.OptionUpdateString = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: typebox_1.Type.String(),
    }),
], { default: "NoChange" });
exports.DiamondMembershipStatus = typebox_1.Type.Union([
    typebox_1.Type.Literal("Inactive"),
    typebox_1.Type.Literal("Active"),
    typebox_1.Type.Literal("Lifetime"),
]);
exports.PollConfig = typebox_1.Type.Object({
    text: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    options: typebox_1.Type.Array(typebox_1.Type.String()),
    end_date: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    anonymous: typebox_1.Type.Boolean(),
    show_votes_before_end_date: typebox_1.Type.Boolean(),
    allow_multiple_votes_per_user: typebox_1.Type.Boolean(),
    allow_user_to_change_vote: typebox_1.Type.Boolean(),
});
exports.Tally = typebox_1.Type.Object({
    yes: typebox_1.Type.BigInt(),
    no: typebox_1.Type.BigInt(),
    total: typebox_1.Type.BigInt(),
    timestamp: typebox_1.Type.BigInt(),
});
exports.DiamondMembershipFeesByDuration = typebox_1.Type.Object({
    one_month: typebox_1.Type.BigInt(),
    three_months: typebox_1.Type.BigInt(),
    one_year: typebox_1.Type.BigInt(),
    lifetime: typebox_1.Type.BigInt(),
});
exports.UserGroupSummary = typebox_1.Type.Object({
    user_group_id: typebox_1.Type.Number(),
    name: typebox_1.Type.String(),
    members: typebox_1.Type.Number(),
});
exports.DiamondMembershipSubscription = typebox_1.Type.Union([
    typebox_1.Type.Literal("Disabled"),
    typebox_1.Type.Literal("OneMonth"),
    typebox_1.Type.Literal("ThreeMonths"),
    typebox_1.Type.Literal("OneYear"),
]);
exports.GroupIndexFreezeGroupSuspensionDetails = typebox_1.Type.Object({
    duration: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    reason: typebox_1.Type.String(),
});
exports.GroupIndexAddHotGroupExclusionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatAlreadyExcluded"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexMarkLocalGroupIndexFullArgs = typebox_1.Type.Object({
    canister_id: exports.TSBytes,
    full: typebox_1.Type.Boolean(),
});
exports.GroupIndexMarkLocalGroupIndexFullResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("LocalGroupIndexNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexExploreCommunitiesArgs = typebox_1.Type.Object({
    search_term: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    languages: typebox_1.Type.Array(typebox_1.Type.String()),
    page_index: typebox_1.Type.Number(),
    page_size: typebox_1.Type.Number(),
    include_moderation_flags: typebox_1.Type.Number(),
});
exports.GroupIndexFreezeCommunitySuspensionDetails = typebox_1.Type.Object({
    duration: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    reason: typebox_1.Type.String(),
});
exports.GroupIndexSetGroupUpgradeConcurrencyResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexSetGroupUpgradeConcurrencyArgs = typebox_1.Type.Object({
    value: typebox_1.Type.Number(),
});
exports.GroupIndexDeleteFrozenGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotFrozen"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexSetCommunityModerationFlagsResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("Unchanged"),
    typebox_1.Type.Literal("CommunityNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("InvalidFlags"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexRemoveHotGroupExclusionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotExcluded"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexExploreGroupsArgs = typebox_1.Type.Object({
    search_term: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    page_index: typebox_1.Type.Number(),
    page_size: typebox_1.Type.Number(),
});
exports.GroupIndexSetCommunityUpgradeConcurrencyResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexSetCommunityUpgradeConcurrencyArgs = typebox_1.Type.Object({
    value: typebox_1.Type.Number(),
});
exports.StorageIndexCanForwardArgs = typebox_1.Type.Object({
    file_hash: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
    file_size: typebox_1.Type.BigInt(),
});
exports.StorageIndexUserUserRecord = typebox_1.Type.Object({
    byte_limit: typebox_1.Type.BigInt(),
    bytes_used: typebox_1.Type.BigInt(),
});
exports.StorageIndexUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.StorageIndexUserUserRecord,
    }),
    typebox_1.Type.Literal("UserNotFound"),
]);
exports.StorageIndexProjectedAllowance = typebox_1.Type.Object({
    byte_limit: typebox_1.Type.BigInt(),
    bytes_used: typebox_1.Type.BigInt(),
    bytes_used_after_upload: typebox_1.Type.BigInt(),
    bytes_used_after_operation: typebox_1.Type.BigInt(),
});
exports.StorageIndexAllocationBucketSuccessResult = typebox_1.Type.Object({
    canister_id: exports.TSBytes,
    file_id: typebox_1.Type.BigInt(),
    chunk_size: typebox_1.Type.Number(),
    byte_limit: typebox_1.Type.BigInt(),
    bytes_used: typebox_1.Type.BigInt(),
    bytes_used_after_upload: typebox_1.Type.BigInt(),
    projected_allowance: exports.StorageIndexProjectedAllowance,
});
exports.StorageIndexAllocationBucketResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.StorageIndexAllocationBucketSuccessResult,
    }),
    typebox_1.Type.Object({
        AllowanceExceeded: exports.StorageIndexProjectedAllowance,
    }),
    typebox_1.Type.Literal("UserNotFound"),
    typebox_1.Type.Literal("BucketUnavailable"),
]);
exports.StorageIndexAllocationBucketArgs = typebox_1.Type.Object({
    file_hash: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
    file_size: typebox_1.Type.BigInt(),
    file_id_seed: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.RegistryAddMessageFilterArgs = typebox_1.Type.Object({
    regex: typebox_1.Type.String(),
});
exports.RegistryAddMessageFilterResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("AlreadyAdded"),
    typebox_1.Type.Object({
        InvalidRequest: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.RegistrySetAirdropConfigResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("IncompleteConfig"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.RegistryMessageFilterSummary = typebox_1.Type.Object({
    id: typebox_1.Type.BigInt(),
    regex: typebox_1.Type.String(),
});
exports.RegistryRemoveMessageFilterResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("NotFound"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.RegistryRemoveMessageFilterArgs = typebox_1.Type.Object({
    id: typebox_1.Type.BigInt(),
});
exports.RegistryNervousSystemSummary = typebox_1.Type.Object({
    root_canister_id: exports.TSBytes,
    governance_canister_id: exports.TSBytes,
    ledger_canister_id: exports.TSBytes,
    index_canister_id: exports.TSBytes,
    is_nns: typebox_1.Type.Boolean(),
    proposal_rejection_fee: typebox_1.Type.BigInt(),
    submitting_proposals_enabled: typebox_1.Type.Boolean(),
});
exports.RegistryAddRemoveSwapProviderResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.RegistryAddRemoveSwapProviderArgs = typebox_1.Type.Object({
    swap_provider: exports.ExchangeId,
    add: typebox_1.Type.Boolean(),
});
exports.RegistryUpdatesArgs = typebox_1.Type.Object({
    since: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.RegistrySetTokenEnabledResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.RegistrySetTokenEnabledArgs = typebox_1.Type.Object({
    ledger_canister_id: exports.TSBytes,
    enabled: typebox_1.Type.Boolean(),
});
exports.UserIndexDiamondMembershipFeesDiamondMembershipFees = typebox_1.Type.Object({
    token: exports.Cryptocurrency,
    one_month: typebox_1.Type.BigInt(),
    three_months: typebox_1.Type.BigInt(),
    one_year: typebox_1.Type.BigInt(),
    lifetime: typebox_1.Type.BigInt(),
});
exports.UserIndexUsersChitSuccessResult = typebox_1.Type.Object({
    chit: typebox_1.Type.Array(exports.Chit),
});
exports.UserIndexPublicKeyResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("NotInitialised"),
]);
exports.UserIndexUpdateDiamondMembershipSubscriptionArgs = typebox_1.Type.Object({
    pay_in_chat: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    subscription: typebox_1.Type.Optional(typebox_1.Type.Union([exports.DiamondMembershipSubscription, typebox_1.Type.Undefined()])),
});
exports.UserIndexUpdateDiamondMembershipSubscriptionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotDiamondMember"),
    typebox_1.Type.Literal("AlreadyLifetimeDiamondMember"),
]);
exports.UserIndexSuspendUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserAlreadySuspended"),
    typebox_1.Type.Literal("UserNotFound"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserIndexCheckUsernameResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UsernameTaken"),
    typebox_1.Type.Literal("UsernameInvalid"),
    typebox_1.Type.Object({
        UsernameTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        UsernameTooLong: typebox_1.Type.Number(),
    }),
]);
exports.UserIndexCheckUsernameArgs = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
});
exports.UserIndexSetModerationFlagsArgs = typebox_1.Type.Object({
    moderation_flags_enabled: typebox_1.Type.Number(),
});
exports.UserIndexSetModerationFlagsResponse = typebox_1.Type.Literal("Success");
exports.UserIndexSetUserUpgradeConcurrencyArgs = typebox_1.Type.Object({
    value: typebox_1.Type.Number(),
});
exports.UserIndexSetUserUpgradeConcurrencyResponse = typebox_1.Type.Literal("Success");
exports.UserIndexExternalAchievementsExternalAchievement = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    name: typebox_1.Type.String(),
    url: typebox_1.Type.String(),
    chit_reward: typebox_1.Type.Number(),
    expires: typebox_1.Type.BigInt(),
    budget_exhausted: typebox_1.Type.Boolean(),
});
exports.UserIndexExternalAchievementsArgs = typebox_1.Type.Object({
    updates_since: typebox_1.Type.BigInt(),
});
exports.UserIndexReferralMetricsReferralMetrics = typebox_1.Type.Object({
    users_who_referred: typebox_1.Type.Number(),
    users_who_referred_paid_diamond: typebox_1.Type.Number(),
    users_who_referred_unpaid_diamond: typebox_1.Type.Number(),
    users_who_referred_90_percent_unpaid_diamond: typebox_1.Type.Number(),
    referrals_of_paid_diamond: typebox_1.Type.Number(),
    referrals_of_unpaid_diamond: typebox_1.Type.Number(),
    referrals_other: typebox_1.Type.Number(),
    icp_raised_by_referrals_to_paid_diamond: typebox_1.Type.Number(),
});
exports.UserIndexPayForDiamondMembershipSuccessResult = typebox_1.Type.Object({
    expires_at: typebox_1.Type.BigInt(),
    pay_in_chat: typebox_1.Type.Boolean(),
    subscription: exports.DiamondMembershipSubscription,
    proof_jwt: typebox_1.Type.String(),
});
exports.UserIndexPayForDiamondMembershipResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserIndexPayForDiamondMembershipSuccessResult,
    }),
    typebox_1.Type.Literal("AlreadyLifetimeDiamondMember"),
    typebox_1.Type.Literal("CurrencyNotSupported"),
    typebox_1.Type.Literal("PriceMismatch"),
    typebox_1.Type.Literal("PaymentAlreadyInProgress"),
    typebox_1.Type.Literal("UserNotFound"),
    typebox_1.Type.Object({
        InsufficientFunds: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TransferFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserIndexPayForDiamondMembershipArgs = typebox_1.Type.Object({
    duration: exports.DiamondMembershipPlanDuration,
    token: exports.Cryptocurrency,
    expected_price_e8s: typebox_1.Type.BigInt(),
    recurring: typebox_1.Type.Boolean(),
});
exports.UserIndexSearchArgs = typebox_1.Type.Object({
    search_term: typebox_1.Type.String(),
    max_results: typebox_1.Type.Number(),
});
exports.UserIndexDeleteUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotFound"),
]);
exports.UserIndexUnsuspendUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserNotSuspended"),
    typebox_1.Type.Literal("UserNotFound"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserIndexSubmitProofOfUniquePersonhoodResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        Invalid: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserNotFound"),
]);
exports.UserIndexSubmitProofOfUniquePersonhoodArgs = typebox_1.Type.Object({
    user_ii_principal: exports.TSBytes,
    credential_jwt: typebox_1.Type.String(),
});
exports.UserIndexSetUsernameResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UsernameTaken"),
    typebox_1.Type.Literal("UserNotFound"),
    typebox_1.Type.Literal("UsernameInvalid"),
    typebox_1.Type.Object({
        UsernameTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        UsernameTooLong: typebox_1.Type.Number(),
    }),
]);
exports.UserIndexSetUsernameArgs = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
});
exports.UserIndexSetDisplayNameResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserNotFound"),
    typebox_1.Type.Literal("DisplayNameInvalid"),
    typebox_1.Type.Object({
        DisplayNameTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        DisplayNameTooLong: typebox_1.Type.Number(),
    }),
]);
exports.UserIndexSetDisplayNameArgs = typebox_1.Type.Object({
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserIndexSetDiamondMembershipFeesResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("Invalid"),
]);
exports.UserIndexReportedMessagesSuccessResult = typebox_1.Type.Object({
    json: typebox_1.Type.String(),
});
exports.UserIndexReportedMessagesResponse = typebox_1.Type.Object({
    Success: exports.UserIndexReportedMessagesSuccessResult,
});
exports.UserIndexUserRegistrationCanisterResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.TSBytes,
    }),
    typebox_1.Type.Literal("NewRegistrationsClosed"),
]);
exports.LocalUserIndexInviteUsersToCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Object({
        TooManyInvites: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexInviteUsersToGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("GroupNotFound"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Object({
        TooManyInvites: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexAccessTokenResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexRegisterUserArgs = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
    referral_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    public_key: exports.TSBytes,
});
exports.LocalUserIndexChatEventsEventsByIndexArgs = typebox_1.Type.Object({
    events: typebox_1.Type.Array(exports.EventIndex),
});
exports.LocalUserIndexChatEventsEventsWindowArgs = typebox_1.Type.Object({
    mid_point: exports.MessageIndex,
    max_messages: typebox_1.Type.Number(),
    max_events: typebox_1.Type.Number(),
});
exports.LocalUserIndexChatEventsEventsPageArgs = typebox_1.Type.Object({
    start_index: exports.EventIndex,
    ascending: typebox_1.Type.Boolean(),
    max_messages: typebox_1.Type.Number(),
    max_events: typebox_1.Type.Number(),
});
exports.LocalUserIndexChatEventsEventsArgsInner = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Page: exports.LocalUserIndexChatEventsEventsPageArgs,
    }),
    typebox_1.Type.Object({
        ByIndex: exports.LocalUserIndexChatEventsEventsByIndexArgs,
    }),
    typebox_1.Type.Object({
        Window: exports.LocalUserIndexChatEventsEventsWindowArgs,
    }),
]);
exports.LocalUserIndexReportMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexGroupAndCommunitySummaryUpdatesSummaryUpdatesArgs = typebox_1.Type.Object({
    canister_id: exports.TSBytes,
    is_community: typebox_1.Type.Boolean(),
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    updates_since: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunitySummaryUpdatesArgs = typebox_1.Type.Object({
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    updates_since: typebox_1.Type.BigInt(),
});
exports.CommunitySelectedChannelUpdatesArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    updates_since: typebox_1.Type.BigInt(),
});
exports.CommunityLeaveChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("LastOwnerCannotLeave"),
]);
exports.CommunityLeaveChannelArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
});
exports.CommunityRemoveMemberResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("CannotRemoveSelf"),
    typebox_1.Type.Literal("CannotRemoveUser"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("TargetUserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityToggleMuteNotificationsResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityToggleMuteNotificationsArgs = typebox_1.Type.Object({
    channel_id: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChannelId, typebox_1.Type.Undefined()])),
    mute: typebox_1.Type.Boolean(),
});
exports.CommunityClaimPrizeArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    message_id: exports.MessageId,
});
exports.CommunityCancelInvitesResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityCreateUserGroupSuccessResult = typebox_1.Type.Object({
    user_group_id: typebox_1.Type.Number(),
});
exports.CommunityCreateUserGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityCreateUserGroupSuccessResult,
    }),
    typebox_1.Type.Object({
        NameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("NameInvalid"),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityJoinVideoCallArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    message_id: exports.MessageId,
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunitySetVideoCallPresenceArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    message_id: exports.MessageId,
    presence: exports.VideoCallPresence,
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunitySetVideoCallPresenceResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("AlreadyEnded"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityDeletedMessageArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
});
exports.CommunityRegisterPollVoteArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_index: exports.MessageIndex,
    poll_option: typebox_1.Type.Number(),
    operation: exports.VoteOperation,
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunityCancelP2pSwapArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
});
exports.CommunitySearchChannelSuccessResult = typebox_1.Type.Object({
    matches: typebox_1.Type.Array(exports.MessageMatch),
});
exports.CommunitySearchChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunitySearchChannelSuccessResult,
    }),
    typebox_1.Type.Literal("InvalidTerm"),
    typebox_1.Type.Object({
        TermTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TermTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TooManyUsers: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
]);
exports.CommunityUndeleteMessagesArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_ids: typebox_1.Type.Array(exports.MessageId),
});
exports.CommunityChangeRoleResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("TargetUserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("Invalid"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunitySelectedChannelInitialArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
});
exports.CommunityInviteCodeSuccessResult = typebox_1.Type.Object({
    code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityInviteCodeResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityInviteCodeSuccessResult,
    }),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("NotAuthorized"),
]);
exports.CommunityUnblockUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("CannotUnblockSelf"),
    typebox_1.Type.Literal("CommunityNotPublic"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityExploreChannelsArgs = typebox_1.Type.Object({
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    search_term: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    page_index: typebox_1.Type.Number(),
    page_size: typebox_1.Type.Number(),
});
exports.CommunityChannelSummaryUpdatesArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    updates_since: typebox_1.Type.BigInt(),
});
exports.CommunityUpdateUserGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserGroupNotFound"),
    typebox_1.Type.Object({
        NameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("NameInvalid"),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityEventsWindowArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    mid_point: exports.MessageIndex,
    max_messages: typebox_1.Type.Number(),
    max_events: typebox_1.Type.Number(),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityUnfollowThreadArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: exports.MessageIndex,
});
exports.CommunityUnfollowThreadResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotFollowing"),
    typebox_1.Type.Literal("ThreadNotFound"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityDeleteMessagesResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("NotPlatformModerator"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityDeleteMessagesArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_ids: typebox_1.Type.Array(exports.MessageId),
    as_platform_moderator: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunityRemoveMemberFromChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("TargetUserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("TargetUserNotInChannel"),
    typebox_1.Type.Literal("CannotRemoveSelf"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityEnableInviteCodeSuccessResult = typebox_1.Type.Object({
    code: typebox_1.Type.BigInt(),
});
exports.CommunityEnableInviteCodeResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityEnableInviteCodeSuccessResult,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityRegisterProposalVoteArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    message_index: exports.MessageIndex,
    adopt: typebox_1.Type.Boolean(),
});
exports.CommunityRegisterProposalVoteResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        AlreadyVoted: typebox_1.Type.Boolean(),
    }),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("NoEligibleNeurons"),
    typebox_1.Type.Literal("ProposalMessageNotFound"),
    typebox_1.Type.Literal("ProposalNotFound"),
    typebox_1.Type.Literal("ProposalNotAcceptingVotes"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityDisableInviteCodeResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityChannelSummaryArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityChangeChannelRoleResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("TargetUserNotInChannel"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("Invalid"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityDeclineInvitationArgs = typebox_1.Type.Object({
    channel_id: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChannelId, typebox_1.Type.Undefined()])),
});
exports.CommunityDeclineInvitationResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotInvited"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
]);
exports.CommunityMessagesByMessageIndexArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    messages: typebox_1.Type.Array(exports.MessageIndex),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityRegisterProposalVoteV2Args = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    message_index: exports.MessageIndex,
    adopt: typebox_1.Type.Boolean(),
});
exports.CommunityRegisterProposalVoteV2Response = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("ProposalMessageNotFound"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityDeleteUserGroupsResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityDeleteUserGroupsArgs = typebox_1.Type.Object({
    user_group_ids: typebox_1.Type.Array(typebox_1.Type.Number()),
});
exports.CommunityUpdateCommunitySuccessResult = typebox_1.Type.Object({
    rules_version: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
});
exports.CommunityUpdateCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        SuccessV2: exports.CommunityUpdateCommunitySuccessResult,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Object({
        NameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("NameReserved"),
    typebox_1.Type.Object({
        DescriptionTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        AvatarTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        BannerTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("AccessGateInvalid"),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Literal("InternalError"),
    typebox_1.Type.Object({
        RulesTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        RulesTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("InvalidLanguage"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityRemoveReactionArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    reaction: exports.Reaction,
});
exports.CommunityRemoveReactionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunitySelectedInitialArgs = typebox_1.Type.Object({
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityAddReactionArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    reaction: exports.Reaction,
    username: typebox_1.Type.String(),
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunityAddReactionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("InvalidReaction"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityThreadPreviewsArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    threads: typebox_1.Type.Array(exports.MessageIndex),
    latest_client_thread_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityBlockUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("CannotBlockSelf"),
    typebox_1.Type.Literal("CannotBlockUser"),
    typebox_1.Type.Literal("CommunityNotPublic"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("TargetUserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityPinMessageArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    message_index: exports.MessageIndex,
});
exports.CommunityPinMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.PushEventResult,
    }),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityVideoCallParticipantsArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    message_id: exports.MessageId,
    updated_since: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunitySendMessageSuccessResult = typebox_1.Type.Object({
    event_index: exports.EventIndex,
    message_index: exports.MessageIndex,
    timestamp: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunitySendMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunitySendMessageSuccessResult,
    }),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("ThreadMessageNotFound"),
    typebox_1.Type.Literal("MessageEmpty"),
    typebox_1.Type.Object({
        TextTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        InvalidPoll: exports.InvalidPollReason,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Object({
        InvalidRequest: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("RulesNotAccepted"),
    typebox_1.Type.Literal("CommunityRulesNotAccepted"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityEventsByIndexArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    events: typebox_1.Type.Array(exports.EventIndex),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityLocalUserIndexResponse = typebox_1.Type.Object({
    Success: exports.TSBytes,
});
exports.CommunityEventsArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    start_index: exports.EventIndex,
    ascending: typebox_1.Type.Boolean(),
    max_messages: typebox_1.Type.Number(),
    max_events: typebox_1.Type.Number(),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityAcceptP2pSwapArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunityCreateChannelSuccessResult = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
});
exports.CommunitySelectedUpdatesArgs = typebox_1.Type.Object({
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    updates_since: typebox_1.Type.BigInt(),
});
exports.CommunityImportGroupSuccessResult = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    total_bytes: typebox_1.Type.BigInt(),
});
exports.CommunityImportGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityImportGroupSuccessResult,
    }),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotCommunityOwner"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("UserNotGroupOwner"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("GroupNotFound"),
    typebox_1.Type.Literal("GroupAlreadyBeingImported"),
    typebox_1.Type.Literal("GroupImportingToAnotherCommunity"),
    typebox_1.Type.Literal("GroupFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityReportMessageArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    delete: typebox_1.Type.Boolean(),
});
exports.CommunityReportMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("AlreadyReported"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityEditMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityUpdateChannelSuccessResult = typebox_1.Type.Object({
    rules_version: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
});
exports.CommunitySetMemberDisplayNameArgs = typebox_1.Type.Object({
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunitySetMemberDisplayNameResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("DisplayNameInvalid"),
    typebox_1.Type.Object({
        DisplayNameTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        DisplayNameTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunitySummaryArgs = typebox_1.Type.Object({
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.CommunityFollowThreadResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("AlreadyFollowing"),
    typebox_1.Type.Literal("ThreadNotFound"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityFollowThreadArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: exports.MessageIndex,
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunityDeleteChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityDeleteChannelArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
});
exports.NotificationsIndexPushSubscriptionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.NotificationsIndexPushSubscriptionArgs = typebox_1.Type.Object({
    subscription: exports.SubscriptionInfo,
});
exports.NotificationsIndexRemoveSubscriptionsForUserResponse = typebox_1.Type.Literal("Success");
exports.NotificationsIndexSubscriptionExistsArgs = typebox_1.Type.Object({
    p256dh_key: typebox_1.Type.String(),
});
exports.NotificationsIndexSubscriptionExistsResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Yes"),
    typebox_1.Type.Literal("No"),
]);
exports.NotificationsIndexRemoveSubscriptionArgs = typebox_1.Type.Object({
    p256dh_key: typebox_1.Type.String(),
});
exports.NotificationsIndexRemoveSubscriptionResponse = typebox_1.Type.Literal("Success");
exports.StorageBucketDeleteFilesDeleteFileFailureReason = typebox_1.Type.Union([
    typebox_1.Type.Literal("NotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
]);
exports.StorageBucketDeleteFilesArgs = typebox_1.Type.Object({
    file_ids: typebox_1.Type.Array(typebox_1.Type.BigInt()),
});
exports.StorageBucketDeleteFilesDeleteFileFailure = typebox_1.Type.Object({
    file_id: typebox_1.Type.BigInt(),
    reason: exports.StorageBucketDeleteFilesDeleteFileFailureReason,
});
exports.StorageBucketFileInfoArgs = typebox_1.Type.Object({
    file_id: typebox_1.Type.BigInt(),
});
exports.StorageBucketFileInfoSuccessResult = typebox_1.Type.Object({
    is_owner: typebox_1.Type.Boolean(),
    file_size: typebox_1.Type.BigInt(),
    file_hash: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
});
exports.StorageBucketFileInfoResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.StorageBucketFileInfoSuccessResult,
    }),
    typebox_1.Type.Literal("NotFound"),
]);
exports.StorageBucketUploadChunkResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("AllowanceExceeded"),
    typebox_1.Type.Literal("FileAlreadyExists"),
    typebox_1.Type.Literal("FileTooBig"),
    typebox_1.Type.Literal("FileExpired"),
    typebox_1.Type.Literal("ChunkAlreadyExists"),
    typebox_1.Type.Literal("ChunkIndexTooHigh"),
    typebox_1.Type.Literal("ChunkSizeMismatch"),
    typebox_1.Type.Literal("Full"),
    typebox_1.Type.Literal("HashMismatch"),
    typebox_1.Type.Literal("InvalidFileId"),
    typebox_1.Type.Literal("UserNotFound"),
]);
exports.StorageBucketUploadChunkArgs = typebox_1.Type.Object({
    file_id: typebox_1.Type.BigInt(),
    hash: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
    mime_type: typebox_1.Type.String(),
    accessors: typebox_1.Type.Array(exports.TSBytes),
    chunk_index: typebox_1.Type.Number(),
    chunk_size: typebox_1.Type.Number(),
    total_size: typebox_1.Type.BigInt(),
    bytes: exports.TSBytes,
    expiry: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.StorageBucketDeleteFileResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("NotFound"),
]);
exports.StorageBucketDeleteFileArgs = typebox_1.Type.Object({
    file_id: typebox_1.Type.BigInt(),
});
exports.StorageBucketForwardFileResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("NotFound"),
]);
exports.StorageBucketForwardFileArgs = typebox_1.Type.Object({
    file_id: typebox_1.Type.BigInt(),
    accessors: typebox_1.Type.Array(exports.TSBytes),
});
exports.ProposalsBotExecuteGenericNervousSystemFunction = typebox_1.Type.Object({
    function_id: typebox_1.Type.BigInt(),
    payload: exports.TSBytes,
});
exports.ProposalsBotUpgradeSnsControlledCanister = typebox_1.Type.Object({
    canister_id: exports.TSBytes,
    new_canister_wasm: exports.TSBytes,
    mode: exports.ProposalsBotCanisterInstallMode,
});
exports.GroupSearchMessagesSuccessResult = typebox_1.Type.Object({
    matches: typebox_1.Type.Array(exports.MessageMatch),
});
exports.GroupSearchMessagesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupSearchMessagesSuccessResult,
    }),
    typebox_1.Type.Literal("InvalidTerm"),
    typebox_1.Type.Object({
        TermTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TermTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TooManyUsers: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
]);
exports.GroupConvertIntoCommunityArgs = typebox_1.Type.Object({
    rules: exports.Rules,
    permissions: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissions, typebox_1.Type.Undefined()])),
    primary_language: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    history_visible_to_new_joiners: typebox_1.Type.Boolean(),
});
exports.GroupClaimPrizeArgs = typebox_1.Type.Object({
    message_id: exports.MessageId,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupJoinVideoCallArgs = typebox_1.Type.Object({
    message_id: exports.MessageId,
    new_achievement: typebox_1.Type.Boolean(),
});
exports.GroupSetVideoCallPresenceArgs = typebox_1.Type.Object({
    message_id: exports.MessageId,
    presence: exports.VideoCallPresence,
    new_achievement: typebox_1.Type.Boolean(),
});
exports.GroupDeletedMessageArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
});
exports.GroupRegisterPollVoteArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_index: exports.MessageIndex,
    poll_option: typebox_1.Type.Number(),
    operation: exports.VoteOperation,
    new_achievement: typebox_1.Type.Boolean(),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupCancelP2pSwapArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
});
exports.GroupUndeleteMessagesArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_ids: typebox_1.Type.Array(exports.MessageId),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupEventsWindowArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    mid_point: exports.MessageIndex,
    max_messages: typebox_1.Type.Number(),
    max_events: typebox_1.Type.Number(),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupUnfollowThreadArgs = typebox_1.Type.Object({
    thread_root_message_index: exports.MessageIndex,
});
exports.GroupDeleteMessagesArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_ids: typebox_1.Type.Array(exports.MessageId),
    as_platform_moderator: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupEnableInviteCodeResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupEnableInviteCodeSuccessResult,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupUpdateGroupSuccessResult = typebox_1.Type.Object({
    rules_version: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
});
exports.GroupRegisterProposalVoteArgs = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    adopt: typebox_1.Type.Boolean(),
});
exports.GroupMessagesByMessageIndexArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    messages: typebox_1.Type.Array(exports.MessageIndex),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupRegisterProposalVoteV2Args = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    adopt: typebox_1.Type.Boolean(),
});
exports.GroupRemoveReactionArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    reaction: exports.Reaction,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupAddReactionArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    reaction: exports.Reaction,
    username: typebox_1.Type.String(),
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupThreadPreviewsArgs = typebox_1.Type.Object({
    threads: typebox_1.Type.Array(exports.MessageIndex),
    latest_client_thread_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupRulesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupRulesSuccessResult,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
]);
exports.GroupPinMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.PushEventResult,
    }),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("MessageIndexOutOfRange"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupPinMessageArgs = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupVideoCallParticipantsArgs = typebox_1.Type.Object({
    message_id: exports.MessageId,
    updated_since: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupSendMessageSuccessResult = typebox_1.Type.Object({
    event_index: exports.EventIndex,
    message_index: exports.MessageIndex,
    timestamp: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupSendMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupSendMessageSuccessResult,
    }),
    typebox_1.Type.Literal("ThreadMessageNotFound"),
    typebox_1.Type.Literal("MessageEmpty"),
    typebox_1.Type.Object({
        TextTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        InvalidPoll: exports.InvalidPollReason,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Object({
        InvalidRequest: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("RulesNotAccepted"),
]);
exports.GroupEventsByIndexArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    events: typebox_1.Type.Array(exports.EventIndex),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupUnpinMessageArgs = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupUnpinMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        SuccessV2: exports.PushEventResult,
    }),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupLocalUserIndexResponse = typebox_1.Type.Object({
    Success: exports.TSBytes,
});
exports.GroupEventsArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    start_index: exports.EventIndex,
    ascending: typebox_1.Type.Boolean(),
    max_messages: typebox_1.Type.Number(),
    max_events: typebox_1.Type.Number(),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupAcceptP2pSwapArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
});
exports.GroupReportMessageArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    delete: typebox_1.Type.Boolean(),
});
exports.GroupFollowThreadArgs = typebox_1.Type.Object({
    thread_root_message_index: exports.MessageIndex,
    new_achievement: typebox_1.Type.Boolean(),
});
exports.UserSearchMessagesSuccessResult = typebox_1.Type.Object({
    matches: typebox_1.Type.Array(exports.MessageMatch),
});
exports.UserSearchMessagesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserSearchMessagesSuccessResult,
    }),
    typebox_1.Type.Literal("InvalidTerm"),
    typebox_1.Type.Object({
        TermTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TermTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("ChatNotFound"),
]);
exports.UserSavedCryptoAccountsResponse = typebox_1.Type.Object({
    Success: typebox_1.Type.Array(exports.UserNamedAccount),
});
exports.UserTokenSwapStatusResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserTokenSwapStatusTokenSwapStatus,
    }),
    typebox_1.Type.Literal("NotFound"),
]);
exports.UserSetPinNumberResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        TooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        TooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        MalformedSignature: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("DelegationTooOld"),
]);
exports.UserSwapTokensICPSwapArgs = typebox_1.Type.Object({
    swap_canister_id: exports.TSBytes,
    zero_for_one: typebox_1.Type.Boolean(),
});
exports.UserSwapTokensResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserSwapTokensSuccessResult,
    }),
    typebox_1.Type.Literal("SwapFailed"),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserSetAvatarResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        AvatarTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserManualWallet = typebox_1.Type.Object({
    tokens: typebox_1.Type.Array(exports.TSBytes),
});
exports.UserChannelSummaryUpdates = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    read_by_me_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    threads_read: typebox_1.Type.Record(exports.MessageIndex, exports.MessageIndex),
    archived: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    date_read_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserWalletConfig = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Auto: exports.UserAutoWallet,
    }),
    typebox_1.Type.Object({
        Manual: exports.UserManualWallet,
    }),
]);
exports.UserSetBioResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        TooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserChannelSummary = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    read_by_me_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    threads_read: typebox_1.Type.Record(exports.MessageIndex, exports.MessageIndex),
    archived: typebox_1.Type.Boolean(),
    date_read_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserApproveTransferResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        ApproveError: exports.ApproveError,
    }),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserSetMessageReminderResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Literal("ReminderDateInThePast"),
    typebox_1.Type.Object({
        NotesTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserRemoveReactionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        SuccessV2: exports.PushEventResult,
    }),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserSetContactResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Object({
        NicknameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NicknameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserAddReactionResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        SuccessV2: exports.PushEventResult,
    }),
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("InvalidReaction"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserReclaimSwapTokensArgs = typebox_1.Type.Object({
    exchange_id: exports.ExchangeId,
    swap_canister_id: exports.TSBytes,
    ledger_canister_id: exports.TSBytes,
    amount: typebox_1.Type.BigInt(),
    fee: typebox_1.Type.BigInt(),
});
exports.UserPublicProfileResponse = typebox_1.Type.Object({
    Success: exports.UserPublicProfilePublicProfile,
});
exports.UserMarkReadThreadRead = typebox_1.Type.Object({
    root_message_index: exports.MessageIndex,
    read_up_to: exports.MessageIndex,
});
exports.UserMarkReadChannelMessagesRead = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    read_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    threads: typebox_1.Type.Array(exports.UserMarkReadThreadRead),
    date_read_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserLocalUserIndexResponse = typebox_1.Type.Object({
    Success: exports.TSBytes,
});
exports.UserConfigureWalletArgs = typebox_1.Type.Object({
    config: exports.UserWalletConfig,
});
exports.PaymentGate = typebox_1.Type.Object({
    ledger_canister_id: exports.TSBytes,
    amount: typebox_1.Type.BigInt(),
    fee: typebox_1.Type.BigInt(),
});
exports.VersionedRules = typebox_1.Type.Object({
    text: typebox_1.Type.String(),
    version: exports.Version,
    enabled: typebox_1.Type.Boolean(),
});
exports.AccountICRC1 = typebox_1.Type.Object({
    owner: exports.TSBytes,
    subaccount: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Tuple([
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
        ]),
        typebox_1.Type.Undefined(),
    ])),
});
exports.CommunityMembershipUpdates = typebox_1.Type.Object({
    role: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityRole, typebox_1.Type.Undefined()])),
    rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    display_name: exports.OptionUpdateString,
    lapsed: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
});
exports.GiphyContent = typebox_1.Type.Object({
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    title: typebox_1.Type.String(),
    desktop: exports.GiphyImageVariant,
    mobile: exports.GiphyImageVariant,
});
exports.SnsNeuronGate = typebox_1.Type.Object({
    governance_canister_id: exports.TSBytes,
    min_stake_e8s: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    min_dissolve_delay: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.OptionalMessagePermissions = typebox_1.Type.Object({
    default: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    text: exports.OptionUpdateGroupPermissionRole,
    image: exports.OptionUpdateGroupPermissionRole,
    video: exports.OptionUpdateGroupPermissionRole,
    audio: exports.OptionUpdateGroupPermissionRole,
    file: exports.OptionUpdateGroupPermissionRole,
    poll: exports.OptionUpdateGroupPermissionRole,
    crypto: exports.OptionUpdateGroupPermissionRole,
    giphy: exports.OptionUpdateGroupPermissionRole,
    prize: exports.OptionUpdateGroupPermissionRole,
    p2p_swap: exports.OptionUpdateGroupPermissionRole,
    video_call: exports.OptionUpdateGroupPermissionRole,
    custom_updated: typebox_1.Type.Array(exports.CustomPermission),
    custom_deleted: typebox_1.Type.Array(typebox_1.Type.String()),
});
exports.Delegation = typebox_1.Type.Object({
    pubkey: exports.TSBytes,
    expiration: typebox_1.Type.BigInt(),
});
exports.MessagePermissions = typebox_1.Type.Object({
    default: exports.GroupPermissionRole,
    text: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    image: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    video: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    audio: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    file: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    poll: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    crypto: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    giphy: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    prize: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    p2p_swap: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    video_call: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    custom: typebox_1.Type.Array(exports.CustomPermission),
});
exports.ChatId = exports.TSBytes;
exports.CryptoAccountICRC1 = typebox_1.Type.Union([
    typebox_1.Type.Literal("Mint"),
    typebox_1.Type.Object({
        Account: exports.AccountICRC1,
    }),
]);
exports.VerifiedCredentialGate = typebox_1.Type.Object({
    issuer_canister_id: exports.TSBytes,
    issuer_origin: typebox_1.Type.String(),
    credential_type: typebox_1.Type.String(),
    credential_name: typebox_1.Type.String(),
    credential_arguments: typebox_1.Type.Record(typebox_1.Type.String(), exports.VerifiedCredentialArgumentValue),
});
exports.NnsProposal = typebox_1.Type.Object({
    id: typebox_1.Type.BigInt(),
    topic: typebox_1.Type.Number(),
    proposer: typebox_1.Type.BigInt(),
    created: typebox_1.Type.BigInt(),
    title: typebox_1.Type.String(),
    summary: typebox_1.Type.String(),
    url: typebox_1.Type.String(),
    status: exports.ProposalDecisionStatus,
    reward_status: exports.ProposalRewardStatus,
    tally: exports.Tally,
    deadline: typebox_1.Type.BigInt(),
    payload_text_rendering: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    last_updated: typebox_1.Type.BigInt(),
});
exports.BlobReference = typebox_1.Type.Object({
    canister_id: exports.TSBytes,
    blob_id: typebox_1.Type.BigInt(),
});
exports.PendingCryptoTransactionICRC1 = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: typebox_1.Type.BigInt(),
    to: exports.AccountICRC1,
    fee: typebox_1.Type.BigInt(),
    memo: typebox_1.Type.Optional(typebox_1.Type.Union([exports.TSBytes, typebox_1.Type.Undefined()])),
    created: typebox_1.Type.BigInt(),
});
exports.HydratedMention = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    message_index: exports.MessageIndex,
    event_index: exports.EventIndex,
});
exports.DiamondMembershipFees = typebox_1.Type.Object({
    chat_fees: exports.DiamondMembershipFeesByDuration,
    icp_fees: exports.DiamondMembershipFeesByDuration,
});
exports.Document = typebox_1.Type.Object({
    id: typebox_1.Type.BigInt(),
    mime_type: typebox_1.Type.String(),
    data: exports.TSBytes,
});
exports.FileContent = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    mime_type: typebox_1.Type.String(),
    file_size: typebox_1.Type.Number(),
    blob_reference: typebox_1.Type.Optional(typebox_1.Type.Union([exports.BlobReference, typebox_1.Type.Undefined()])),
});
exports.UserSummaryStable = typebox_1.Type.Object({
    username: typebox_1.Type.String(),
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    is_bot: typebox_1.Type.Boolean(),
    suspended: typebox_1.Type.Boolean(),
    diamond_membership_status: exports.DiamondMembershipStatus,
    is_unique_person: typebox_1.Type.Boolean(),
    bot_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.BotConfig, typebox_1.Type.Undefined()])),
});
exports.ChitEarned = typebox_1.Type.Object({
    amount: typebox_1.Type.Number(),
    timestamp: typebox_1.Type.BigInt(),
    reason: exports.ChitEarnedReason,
});
exports.CustomContent = typebox_1.Type.Object({
    kind: typebox_1.Type.String(),
    data: exports.TSBytes,
});
exports.FailedCryptoTransactionICRC1 = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: typebox_1.Type.BigInt(),
    fee: typebox_1.Type.BigInt(),
    from: exports.CryptoAccountICRC1,
    to: exports.CryptoAccountICRC1,
    memo: typebox_1.Type.Optional(typebox_1.Type.Union([exports.TSBytes, typebox_1.Type.Undefined()])),
    created: typebox_1.Type.BigInt(),
    error_message: typebox_1.Type.String(),
});
exports.TokenBalanceGate = typebox_1.Type.Object({
    ledger_canister_id: exports.TSBytes,
    min_balance: typebox_1.Type.BigInt(),
});
exports.GateCheckFailedReason = typebox_1.Type.Union([
    typebox_1.Type.Literal("NotDiamondMember"),
    typebox_1.Type.Literal("NotLifetimeDiamondMember"),
    typebox_1.Type.Literal("NoUniquePersonProof"),
    typebox_1.Type.Literal("NoSnsNeuronsFound"),
    typebox_1.Type.Literal("NoSnsNeuronsWithRequiredStakeFound"),
    typebox_1.Type.Literal("NoSnsNeuronsWithRequiredDissolveDelayFound"),
    typebox_1.Type.Object({
        PaymentFailed: exports.TransferFromError,
    }),
    typebox_1.Type.Object({
        InsufficientBalance: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        FailedVerifiedCredentialCheck: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("Locked"),
    typebox_1.Type.Literal("NotReferredByMember"),
]);
exports.TokenInfo = typebox_1.Type.Object({
    token: exports.Cryptocurrency,
    ledger: exports.TSBytes,
    decimals: typebox_1.Type.Number(),
    fee: typebox_1.Type.BigInt(),
});
exports.CompletedCryptoTransactionNNS = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: exports.Tokens,
    fee: exports.Tokens,
    from: exports.CryptoAccountNNS,
    to: exports.CryptoAccountNNS,
    memo: typebox_1.Type.BigInt(),
    created: typebox_1.Type.BigInt(),
    transaction_hash: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
    block_index: typebox_1.Type.BigInt(),
});
exports.OptionUpdateOptionalMessagePermissions = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.OptionalMessagePermissions,
    }),
], { default: "NoChange" });
exports.PendingCryptoTransactionICRC2 = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: typebox_1.Type.BigInt(),
    from: exports.AccountICRC1,
    to: exports.AccountICRC1,
    fee: typebox_1.Type.BigInt(),
    memo: typebox_1.Type.Optional(typebox_1.Type.Union([exports.TSBytes, typebox_1.Type.Undefined()])),
    created: typebox_1.Type.BigInt(),
});
exports.AudioContent = typebox_1.Type.Object({
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    mime_type: typebox_1.Type.String(),
    blob_reference: typebox_1.Type.Optional(typebox_1.Type.Union([exports.BlobReference, typebox_1.Type.Undefined()])),
});
exports.ImageContent = typebox_1.Type.Object({
    width: typebox_1.Type.Number(),
    height: typebox_1.Type.Number(),
    thumbnail_data: exports.ThumbnailData,
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    mime_type: typebox_1.Type.String(),
    blob_reference: typebox_1.Type.Optional(typebox_1.Type.Union([exports.BlobReference, typebox_1.Type.Undefined()])),
});
exports.UserId = exports.TSBytes;
exports.CommunityId = exports.TSBytes;
exports.CompletedCryptoTransactionICRC1 = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: typebox_1.Type.BigInt(),
    from: exports.CryptoAccountICRC1,
    to: exports.CryptoAccountICRC1,
    fee: typebox_1.Type.BigInt(),
    memo: typebox_1.Type.Optional(typebox_1.Type.Union([exports.TSBytes, typebox_1.Type.Undefined()])),
    created: typebox_1.Type.BigInt(),
    block_index: typebox_1.Type.BigInt(),
});
exports.GroupMembership = typebox_1.Type.Object({
    joined: typebox_1.Type.BigInt(),
    role: exports.GroupRole,
    mentions: typebox_1.Type.Array(exports.HydratedMention),
    notifications_muted: typebox_1.Type.Boolean(),
    my_metrics: exports.ChatMetrics,
    latest_threads: typebox_1.Type.Array(exports.GroupCanisterThreadDetails),
    rules_accepted: typebox_1.Type.Boolean(),
    lapsed: typebox_1.Type.Boolean(),
});
exports.UserOrAccount = typebox_1.Type.Union([
    typebox_1.Type.Object({
        User: exports.UserId,
    }),
    typebox_1.Type.Object({
        Account: typebox_1.Type.Tuple([
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
            typebox_1.Type.Number(),
        ]),
    }),
]);
exports.VerifiedCredentialGateArgs = typebox_1.Type.Object({
    user_ii_principal: exports.TSBytes,
    credential_jwt: typebox_1.Type.String(),
    credential_jwts: typebox_1.Type.Array(typebox_1.Type.String()),
    ii_origin: typebox_1.Type.String(),
});
exports.OptionalGroupPermissions = typebox_1.Type.Object({
    change_roles: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    update_group: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    invite_users: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    add_members: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    remove_members: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    delete_messages: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    pin_messages: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    react_to_messages: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    mention_all_members: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    start_video_call: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissionRole, typebox_1.Type.Undefined()])),
    message_permissions: typebox_1.Type.Optional(typebox_1.Type.Union([exports.OptionalMessagePermissions, typebox_1.Type.Undefined()])),
    thread_permissions: exports.OptionUpdateOptionalMessagePermissions,
});
exports.GovernanceProposalsSubtype = typebox_1.Type.Object({
    is_nns: typebox_1.Type.Boolean(),
    governance_canister_id: exports.TSBytes,
});
exports.GroupMembershipUpdates = typebox_1.Type.Object({
    role: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupRole, typebox_1.Type.Undefined()])),
    mentions: typebox_1.Type.Array(exports.HydratedMention),
    notifications_muted: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    my_metrics: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChatMetrics, typebox_1.Type.Undefined()])),
    latest_threads: typebox_1.Type.Array(exports.GroupCanisterThreadDetails),
    unfollowed_threads: typebox_1.Type.Array(exports.MessageIndex),
    rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    lapsed: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
});
exports.FailedCryptoTransactionNNS = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: exports.Tokens,
    fee: exports.Tokens,
    from: exports.CryptoAccountNNS,
    to: exports.CryptoAccountNNS,
    memo: typebox_1.Type.BigInt(),
    created: typebox_1.Type.BigInt(),
    transaction_hash: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
    error_message: typebox_1.Type.String(),
});
exports.SnsProposal = typebox_1.Type.Object({
    id: typebox_1.Type.BigInt(),
    action: typebox_1.Type.BigInt(),
    proposer: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
    created: typebox_1.Type.BigInt(),
    title: typebox_1.Type.String(),
    summary: typebox_1.Type.String(),
    url: typebox_1.Type.String(),
    status: exports.ProposalDecisionStatus,
    reward_status: exports.ProposalRewardStatus,
    tally: exports.Tally,
    deadline: typebox_1.Type.BigInt(),
    payload_text_rendering: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    minimum_yes_proportion_of_total: typebox_1.Type.Number(),
    minimum_yes_proportion_of_exercised: typebox_1.Type.Number(),
    last_updated: typebox_1.Type.BigInt(),
});
exports.UsersBlocked = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
    blocked_by: exports.UserId,
});
exports.CommunityMember = typebox_1.Type.Object({
    user_id: exports.UserId,
    date_added: typebox_1.Type.BigInt(),
    role: exports.CommunityRole,
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    referred_by: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserId, typebox_1.Type.Undefined()])),
    lapsed: typebox_1.Type.Boolean(),
});
exports.User = typebox_1.Type.Object({
    user_id: exports.UserId,
    username: typebox_1.Type.String(),
});
exports.MessageReport = typebox_1.Type.Object({
    reported_by: exports.UserId,
    timestamp: typebox_1.Type.BigInt(),
    reason_code: typebox_1.Type.Number(),
    notes: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.ThreadSummary = typebox_1.Type.Object({
    participant_ids: typebox_1.Type.Array(exports.UserId),
    followed_by_me: typebox_1.Type.Boolean(),
    reply_count: typebox_1.Type.Number(),
    latest_event_index: exports.EventIndex,
    latest_event_timestamp: typebox_1.Type.BigInt(),
});
exports.OptionUpdateDocument = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.Document,
    }),
], { default: "NoChange" });
exports.SuspensionDetails = typebox_1.Type.Object({
    reason: typebox_1.Type.String(),
    action: exports.SuspensionAction,
    suspended_by: exports.UserId,
});
exports.DiamondMembershipDetails = typebox_1.Type.Object({
    expires_at: typebox_1.Type.BigInt(),
    pay_in_chat: typebox_1.Type.Boolean(),
    subscription: exports.DiamondMembershipSubscription,
});
exports.BotCommandArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    bot: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
});
exports.MemberLeft = typebox_1.Type.Object({
    user_id: exports.UserId,
});
exports.UserGroupDetails = typebox_1.Type.Object({
    user_group_id: typebox_1.Type.Number(),
    name: typebox_1.Type.String(),
    members: typebox_1.Type.Array(exports.UserId),
});
exports.GroupIndexRecommendedGroupsArgs = typebox_1.Type.Object({
    count: typebox_1.Type.Number(),
    exclusions: typebox_1.Type.Array(exports.ChatId),
});
exports.GroupIndexFreezeGroupArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    reason: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    suspend_members: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupIndexFreezeGroupSuspensionDetails, typebox_1.Type.Undefined()])),
});
exports.GroupIndexAddHotGroupExclusionArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
});
exports.GroupIndexLookupChannelByGroupIdSuccessResult = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    channel_id: exports.ChannelId,
});
exports.GroupIndexLookupChannelByGroupIdResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupIndexLookupChannelByGroupIdSuccessResult,
    }),
    typebox_1.Type.Literal("NotFound"),
]);
exports.GroupIndexLookupChannelByGroupIdArgs = typebox_1.Type.Object({
    group_id: exports.ChatId,
});
exports.GroupIndexUnfreezeCommunityArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
});
exports.GroupIndexFreezeCommunityArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    reason: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    suspend_members: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupIndexFreezeCommunitySuspensionDetails, typebox_1.Type.Undefined()])),
});
exports.GroupIndexDeleteFrozenGroupArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
});
exports.GroupIndexSetCommunityModerationFlagsArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    flags: typebox_1.Type.Number(),
});
exports.GroupIndexRemoveHotGroupExclusionArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
});
exports.GroupIndexActiveGroupsArgs = typebox_1.Type.Object({
    group_ids: typebox_1.Type.Array(exports.ChatId),
    community_ids: typebox_1.Type.Array(exports.CommunityId),
    active_since: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.GroupIndexUnfreezeGroupArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
});
exports.StorageIndexCanForwardResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.StorageIndexProjectedAllowance,
    }),
    typebox_1.Type.Object({
        AllowanceExceeded: exports.StorageIndexProjectedAllowance,
    }),
    typebox_1.Type.Literal("UserNotFound"),
]);
exports.RegistrySetAirdropConfigArgs = typebox_1.Type.Object({
    enabled: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    community_id: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityId, typebox_1.Type.Undefined()])),
    channel_id: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChannelId, typebox_1.Type.Undefined()])),
    community_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    channel_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.RegistryPayment = typebox_1.Type.Object({
    amount: typebox_1.Type.BigInt(),
    block_index: typebox_1.Type.BigInt(),
    timestamp: typebox_1.Type.BigInt(),
    user_id: exports.UserId,
});
exports.RegistryTokenDetails = typebox_1.Type.Object({
    ledger_canister_id: exports.TSBytes,
    name: typebox_1.Type.String(),
    symbol: typebox_1.Type.String(),
    decimals: typebox_1.Type.Number(),
    fee: typebox_1.Type.BigInt(),
    logo: typebox_1.Type.String(),
    logo_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    info_url: typebox_1.Type.String(),
    how_to_buy_url: typebox_1.Type.String(),
    transaction_url_format: typebox_1.Type.String(),
    supported_standards: typebox_1.Type.Array(typebox_1.Type.String()),
    added: typebox_1.Type.BigInt(),
    enabled: typebox_1.Type.Boolean(),
    last_updated: typebox_1.Type.BigInt(),
    payments: typebox_1.Type.Array(exports.RegistryPayment),
});
exports.UserIndexDiamondMembershipFeesResponse = typebox_1.Type.Object({
    Success: typebox_1.Type.Array(exports.UserIndexDiamondMembershipFeesDiamondMembershipFees),
});
exports.UserIndexUsersChitResponse = typebox_1.Type.Object({
    Success: exports.UserIndexUsersChitSuccessResult,
});
exports.UserIndexUsersChitArgs = typebox_1.Type.Object({
    users: typebox_1.Type.Array(exports.UserId),
    year: typebox_1.Type.Number(),
    month: typebox_1.Type.Number(),
});
exports.UserIndexSuspendUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    duration: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    reason: typebox_1.Type.String(),
});
exports.UserIndexPlatformOperatorsSuccessResult = typebox_1.Type.Object({
    users: typebox_1.Type.Array(exports.UserId),
});
exports.UserIndexPlatformOperatorsResponse = typebox_1.Type.Object({
    Success: exports.UserIndexPlatformOperatorsSuccessResult,
});
exports.UserIndexPlatformModeratorsSuccessResult = typebox_1.Type.Object({
    users: typebox_1.Type.Array(exports.UserId),
});
exports.UserIndexSuspectedBotsSuccessResult = typebox_1.Type.Object({
    users: typebox_1.Type.Array(exports.UserId),
});
exports.UserIndexSuspectedBotsArgs = typebox_1.Type.Object({
    after: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserId, typebox_1.Type.Undefined()])),
    count: typebox_1.Type.Number(),
});
exports.UserIndexExternalAchievementsSuccessResult = typebox_1.Type.Object({
    last_updated: typebox_1.Type.BigInt(),
    added_or_updated: typebox_1.Type.Array(exports.UserIndexExternalAchievementsExternalAchievement),
    achievements_added: typebox_1.Type.Array(exports.UserIndexExternalAchievementsExternalAchievement),
    achievements_removed: typebox_1.Type.Array(exports.UserIndexExternalAchievementsExternalAchievement),
});
exports.UserIndexExternalAchievementsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserIndexExternalAchievementsSuccessResult,
    }),
    typebox_1.Type.Literal("SuccessNoUpdates"),
]);
exports.UserIndexUserArgs = typebox_1.Type.Object({
    user_id: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserId, typebox_1.Type.Undefined()])),
    username: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserIndexReferralMetricsResponse = typebox_1.Type.Object({
    Success: exports.UserIndexReferralMetricsReferralMetrics,
});
exports.UserIndexDeleteUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
});
exports.UserIndexUnsuspendUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
});
exports.UserIndexUsersUserGroup = typebox_1.Type.Object({
    users: typebox_1.Type.Array(exports.UserId),
    updated_since: typebox_1.Type.BigInt(),
});
exports.UserIndexUsersArgs = typebox_1.Type.Object({
    user_groups: typebox_1.Type.Array(exports.UserIndexUsersUserGroup),
    users_suspended_since: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserIndexChitLeaderboardChitUserBalance = typebox_1.Type.Object({
    user_id: exports.UserId,
    username: typebox_1.Type.String(),
    balance: typebox_1.Type.Number(),
});
exports.UserIndexSetDiamondMembershipFeesArgs = typebox_1.Type.Object({
    fees: exports.DiamondMembershipFees,
});
exports.UserIndexPlatformModeratorsGroupResponse = typebox_1.Type.Object({
    Success: exports.ChatId,
});
exports.UserIndexReportedMessagesArgs = typebox_1.Type.Object({
    user_id: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserId, typebox_1.Type.Undefined()])),
});
exports.LocalUserIndexInviteUsersToCommunityArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    user_ids: typebox_1.Type.Array(exports.UserId),
    caller_username: typebox_1.Type.String(),
});
exports.LocalUserIndexInviteUsersToGroupArgs = typebox_1.Type.Object({
    group_id: exports.ChatId,
    user_ids: typebox_1.Type.Array(exports.UserId),
    caller_username: typebox_1.Type.String(),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.LocalUserIndexJoinGroupArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    verified_credential_args: typebox_1.Type.Optional(typebox_1.Type.Union([exports.VerifiedCredentialGateArgs, typebox_1.Type.Undefined()])),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.LocalUserIndexRegisterUserSuccessResult = typebox_1.Type.Object({
    user_id: exports.UserId,
    icp_account: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
});
exports.LocalUserIndexChatEventsEventsContext = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Direct: exports.UserId,
    }),
    typebox_1.Type.Object({
        Group: typebox_1.Type.Tuple([exports.ChatId, typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Null()])]),
    }),
    typebox_1.Type.Object({
        Channel: typebox_1.Type.Tuple([exports.CommunityId, exports.ChannelId, typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Null()])]),
    }),
]);
exports.LocalUserIndexJoinCommunityArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    referred_by: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserId, typebox_1.Type.Undefined()])),
    verified_credential_args: typebox_1.Type.Optional(typebox_1.Type.Union([exports.VerifiedCredentialGateArgs, typebox_1.Type.Undefined()])),
});
exports.LocalUserIndexJoinChannelArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    channel_id: exports.ChannelId,
    invite_code: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    referred_by: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserId, typebox_1.Type.Undefined()])),
    verified_credential_args: typebox_1.Type.Optional(typebox_1.Type.Union([exports.VerifiedCredentialGateArgs, typebox_1.Type.Undefined()])),
});
exports.LocalUserIndexInviteUsersToChannelFailedResult = typebox_1.Type.Object({
    failed_users: typebox_1.Type.Array(exports.UserId),
});
exports.LocalUserIndexInviteUsersToChannelPartialSuccessResult = typebox_1.Type.Object({
    failed_users: typebox_1.Type.Array(exports.UserId),
});
exports.LocalUserIndexInviteUsersToChannelArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    channel_id: exports.ChannelId,
    user_ids: typebox_1.Type.Array(exports.UserId),
    caller_username: typebox_1.Type.String(),
});
exports.LocalUserIndexGroupAndCommunitySummaryUpdatesArgs = typebox_1.Type.Object({
    requests: typebox_1.Type.Array(exports.LocalUserIndexGroupAndCommunitySummaryUpdatesSummaryUpdatesArgs),
});
exports.CommunityRemoveMemberArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
});
exports.CommunityCancelInvitesArgs = typebox_1.Type.Object({
    channel_id: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChannelId, typebox_1.Type.Undefined()])),
    user_ids: typebox_1.Type.Array(exports.UserId),
});
exports.CommunityCreateUserGroupArgs = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    user_ids: typebox_1.Type.Array(exports.UserId),
});
exports.CommunitySearchChannelArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    search_term: typebox_1.Type.String(),
    max_results: typebox_1.Type.Number(),
    users: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.UserId), typebox_1.Type.Undefined()])),
});
exports.CommunityChangeRoleArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    new_role: exports.CommunityRole,
});
exports.CommunityUnblockUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
});
exports.CommunityUpdateUserGroupArgs = typebox_1.Type.Object({
    user_group_id: typebox_1.Type.Number(),
    name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    users_to_add: typebox_1.Type.Array(exports.UserId),
    users_to_remove: typebox_1.Type.Array(exports.UserId),
});
exports.CommunityRemoveMemberFromChannelArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    user_id: exports.UserId,
});
exports.CommunityCommunityMembersArgs = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
});
exports.CommunityCommunityMembersSuccessResult = typebox_1.Type.Object({
    members: typebox_1.Type.Array(exports.CommunityMember),
});
exports.CommunityAddMembersToChannelUserFailedError = typebox_1.Type.Object({
    user_id: exports.UserId,
    error: typebox_1.Type.String(),
});
exports.CommunityAddMembersToChannelArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    user_ids: typebox_1.Type.Array(exports.UserId),
    added_by_name: typebox_1.Type.String(),
    added_by_display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.CommunityAddMembersToChannelPartialSuccessResult = typebox_1.Type.Object({
    users_added: typebox_1.Type.Array(exports.UserId),
    users_already_in_channel: typebox_1.Type.Array(exports.UserId),
    users_limit_reached: typebox_1.Type.Array(exports.UserId),
    users_failed_with_error: typebox_1.Type.Array(exports.CommunityAddMembersToChannelUserFailedError),
});
exports.CommunityAddMembersToChannelFailedResult = typebox_1.Type.Object({
    users_already_in_channel: typebox_1.Type.Array(exports.UserId),
    users_limit_reached: typebox_1.Type.Array(exports.UserId),
    users_failed_with_error: typebox_1.Type.Array(exports.CommunityAddMembersToChannelUserFailedError),
});
exports.CommunityChangeChannelRoleArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    user_id: exports.UserId,
    new_role: exports.GroupRole,
});
exports.CommunitySelectedInitialSuccessResult = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    last_updated: typebox_1.Type.BigInt(),
    latest_event_index: exports.EventIndex,
    members: typebox_1.Type.Array(exports.CommunityMember),
    basic_members: typebox_1.Type.Array(exports.UserId),
    blocked_users: typebox_1.Type.Array(exports.UserId),
    invited_users: typebox_1.Type.Array(exports.UserId),
    chat_rules: exports.VersionedRules,
    user_groups: typebox_1.Type.Array(exports.UserGroupDetails),
    referrals: typebox_1.Type.Array(exports.UserId),
});
exports.CommunityBlockUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
});
exports.CommunityCreateChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityCreateChannelSuccessResult,
    }),
    typebox_1.Type.Object({
        NameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("NameReserved"),
    typebox_1.Type.Object({
        DescriptionTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        RulesTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        RulesTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        AvatarTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("AccessGateInvalid"),
    typebox_1.Type.Object({
        MaxChannelsCreated: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("ExternalUrlInvalid"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunitySelectedUpdatesSuccessResult = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    last_updated: typebox_1.Type.BigInt(),
    members_added_or_updated: typebox_1.Type.Array(exports.CommunityMember),
    members_removed: typebox_1.Type.Array(exports.UserId),
    blocked_users_added: typebox_1.Type.Array(exports.UserId),
    blocked_users_removed: typebox_1.Type.Array(exports.UserId),
    invited_users: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.UserId), typebox_1.Type.Undefined()])),
    chat_rules: typebox_1.Type.Optional(typebox_1.Type.Union([exports.VersionedRules, typebox_1.Type.Undefined()])),
    user_groups: typebox_1.Type.Array(exports.UserGroupDetails),
    user_groups_deleted: typebox_1.Type.Array(typebox_1.Type.Number()),
    referrals_added: typebox_1.Type.Array(exports.UserId),
    referrals_removed: typebox_1.Type.Array(exports.UserId),
});
exports.CommunitySelectedUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunitySelectedUpdatesSuccessResult,
    }),
    typebox_1.Type.Object({
        SuccessNoUpdates: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Literal("PrivateCommunity"),
]);
exports.CommunityImportGroupArgs = typebox_1.Type.Object({
    group_id: exports.ChatId,
});
exports.CommunityUpdateChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        SuccessV2: exports.CommunityUpdateChannelSuccessResult,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Object({
        NameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("NameReserved"),
    typebox_1.Type.Object({
        DescriptionTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        AvatarTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("AccessGateInvalid"),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Object({
        RulesTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        RulesTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ExternalUrlInvalid"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.StorageBucketDeleteFilesResponse = typebox_1.Type.Object({
    success: typebox_1.Type.Array(typebox_1.Type.BigInt()),
    failures: typebox_1.Type.Array(exports.StorageBucketDeleteFilesDeleteFileFailure),
});
exports.ProposalsBotTransferSnsTreasuryFunds = typebox_1.Type.Object({
    treasury: exports.ProposalsBotTreasury,
    amount: typebox_1.Type.BigInt(),
    to: exports.AccountICRC1,
    memo: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.OnlineUsersLastOnlineArgs = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
});
exports.OnlineUsersLastOnlineUserLastOnline = typebox_1.Type.Object({
    user_id: exports.UserId,
    duration_since_last_online: typebox_1.Type.BigInt(),
});
exports.GroupSearchMessagesArgs = typebox_1.Type.Object({
    search_term: typebox_1.Type.String(),
    max_results: typebox_1.Type.Number(),
    users: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.UserId), typebox_1.Type.Undefined()])),
});
exports.GroupConvertIntoCommunitySuccessResult = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    channel_id: exports.ChannelId,
});
exports.GroupConvertIntoCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupConvertIntoCommunitySuccessResult,
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("AlreadyImportingToAnotherCommunity"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupCancelInvitesArgs = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
});
exports.GroupChangeRoleArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    new_role: exports.GroupRole,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupUnblockUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupUpdateGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        SuccessV2: exports.GroupUpdateGroupSuccessResult,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Object({
        NameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("NameReserved"),
    typebox_1.Type.Object({
        DescriptionTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        RulesTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        RulesTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        AvatarTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("AccessGateInvalid"),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("InternalError"),
]);
exports.GroupBlockUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupRemoveParticipantArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.UserSearchMessagesArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    search_term: typebox_1.Type.String(),
    max_results: typebox_1.Type.Number(),
});
exports.UserCommunitySummaryUpdates = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    channels: typebox_1.Type.Array(exports.UserChannelSummaryUpdates),
    index: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Number(), typebox_1.Type.Undefined()])),
    archived: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.ChannelId), typebox_1.Type.Undefined()])),
});
exports.UserGroupChatSummary = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    local_user_index_canister_id: exports.TSBytes,
    read_by_me_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    threads_read: typebox_1.Type.Record(exports.MessageIndex, exports.MessageIndex),
    archived: typebox_1.Type.Boolean(),
    date_read_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserJoinVideoCallArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    message_id: exports.MessageId,
});
exports.UserCreateGroupSuccessResult = typebox_1.Type.Object({
    chat_id: exports.ChatId,
});
exports.UserDeletedMessageArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    message_id: exports.MessageId,
});
exports.UserCancelP2pSwapArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    message_id: exports.MessageId,
});
exports.UserCommunitySummary = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    local_user_index_canister_id: exports.TSBytes,
    channels: typebox_1.Type.Array(exports.UserChannelSummary),
    index: typebox_1.Type.Number(),
    archived: typebox_1.Type.Boolean(),
    pinned: typebox_1.Type.Array(exports.ChannelId),
});
exports.UserSwapTokensExchangeArgs = typebox_1.Type.Union([
    typebox_1.Type.Object({
        ICPSwap: exports.UserSwapTokensICPSwapArgs,
    }),
    typebox_1.Type.Object({
        Sonic: exports.UserSwapTokensICPSwapArgs,
    }),
    typebox_1.Type.Object({
        KongSwap: exports.UserSwapTokensICPSwapArgs,
    }),
]);
exports.UserSwapTokensArgs = typebox_1.Type.Object({
    swap_id: typebox_1.Type.BigInt(),
    input_token: exports.TokenInfo,
    output_token: exports.TokenInfo,
    input_amount: typebox_1.Type.BigInt(),
    exchange_args: exports.UserSwapTokensExchangeArgs,
    min_output_amount: typebox_1.Type.BigInt(),
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserSetAvatarArgs = typebox_1.Type.Object({
    avatar: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Document, typebox_1.Type.Undefined()])),
});
exports.UserUndeleteMessagesArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_ids: typebox_1.Type.Array(exports.MessageId),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.UserGroupChatSummaryUpdates = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    read_by_me_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    threads_read: typebox_1.Type.Record(exports.MessageIndex, exports.MessageIndex),
    archived: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    date_read_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserUnblockUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
});
exports.UserAddHotGroupExclusionsArgs = typebox_1.Type.Object({
    groups: typebox_1.Type.Array(exports.ChatId),
    duration: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserContactsContact = typebox_1.Type.Object({
    user_id: exports.UserId,
    nickname: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserContactsSuccessResult = typebox_1.Type.Object({
    contacts: typebox_1.Type.Array(exports.UserContactsContact),
});
exports.UserEventsWindowArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    mid_point: exports.MessageIndex,
    max_messages: typebox_1.Type.Number(),
    max_events: typebox_1.Type.Number(),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserDeleteDirectChatArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    block_user: typebox_1.Type.Boolean(),
});
exports.UserInitialStateCommunitiesInitial = typebox_1.Type.Object({
    summaries: typebox_1.Type.Array(exports.UserCommunitySummary),
});
exports.UserInitialStateGroupChatsInitial = typebox_1.Type.Object({
    summaries: typebox_1.Type.Array(exports.UserGroupChatSummary),
    pinned: typebox_1.Type.Array(exports.ChatId),
});
exports.UserDeleteMessagesArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_ids: typebox_1.Type.Array(exports.MessageId),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.UserHotGroupExclusionsResponse = typebox_1.Type.Object({
    Success: typebox_1.Type.Array(exports.ChatId),
});
exports.UserUpdatesGroupChatsUpdates = typebox_1.Type.Object({
    added: typebox_1.Type.Array(exports.UserGroupChatSummary),
    updated: typebox_1.Type.Array(exports.UserGroupChatSummaryUpdates),
    removed: typebox_1.Type.Array(exports.ChatId),
    pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.ChatId), typebox_1.Type.Undefined()])),
});
exports.UserUpdatesCommunitiesUpdates = typebox_1.Type.Object({
    added: typebox_1.Type.Array(exports.UserCommunitySummary),
    updated: typebox_1.Type.Array(exports.UserCommunitySummaryUpdates),
    removed: typebox_1.Type.Array(exports.CommunityId),
});
exports.UserLeaveGroupArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.UserMuteNotificationsArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
});
exports.UserMessagesByMessageIndexArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    messages: typebox_1.Type.Array(exports.MessageIndex),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserApproveTransferArgs = typebox_1.Type.Object({
    spender: exports.AccountICRC1,
    ledger_canister_id: exports.TSBytes,
    amount: typebox_1.Type.BigInt(),
    expires_in: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserDeleteGroupArgs = typebox_1.Type.Object({
    chat_id: exports.ChatId,
});
exports.UserEndVideoCallArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    message_id: exports.MessageId,
});
exports.UserTokenSwapsTokenSwap = typebox_1.Type.Object({
    args: exports.UserSwapTokensArgs,
    started: typebox_1.Type.BigInt(),
    icrc2: typebox_1.Type.Boolean(),
    transfer_or_approval: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.BigInt(),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Undefined(),
    ])),
    notified_dex: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.Null(),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Undefined(),
    ])),
    amount_swapped: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.Union([
                typebox_1.Type.Object({
                    Ok: typebox_1.Type.BigInt(),
                }),
                typebox_1.Type.Object({
                    Err: typebox_1.Type.String(),
                }),
            ]),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Undefined(),
    ])),
    withdrawn_from_dex: typebox_1.Type.Optional(typebox_1.Type.Union([
        typebox_1.Type.Object({
            Ok: typebox_1.Type.BigInt(),
        }),
        typebox_1.Type.Object({
            Err: typebox_1.Type.String(),
        }),
        typebox_1.Type.Undefined(),
    ])),
    success: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
});
exports.UserTokenSwapsSuccessResult = typebox_1.Type.Object({
    total: typebox_1.Type.Number(),
    swaps: typebox_1.Type.Array(exports.UserTokenSwapsTokenSwap),
});
exports.UserRemoveReactionArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    reaction: exports.Reaction,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.UserSetContactOptionalContact = typebox_1.Type.Object({
    user_id: exports.UserId,
    nickname: exports.OptionUpdateString,
});
exports.UserSetContactArgs = typebox_1.Type.Object({
    contact: exports.UserSetContactOptionalContact,
});
exports.UserAddReactionArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    reaction: exports.Reaction,
    correlation_id: typebox_1.Type.BigInt(),
});
exports.UserReferral = typebox_1.Type.Object({
    user_id: exports.UserId,
    status: exports.ReferralStatus,
});
exports.UserBlockUserArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
});
exports.UserSetCommunityIndexesArgs = typebox_1.Type.Object({
    indexes: typebox_1.Type.Array(typebox_1.Type.Tuple([exports.CommunityId, typebox_1.Type.Number()])),
});
exports.UserStartVideoCallArgs = typebox_1.Type.Object({
    message_id: exports.MessageId,
    initiator: exports.UserId,
    initiator_username: typebox_1.Type.String(),
    initiator_display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    initiator_avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    max_duration: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    call_type: exports.VideoCallType,
});
exports.UserSendMessageSuccessResult = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    event_index: exports.EventIndex,
    message_index: exports.MessageIndex,
    timestamp: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserEventsByIndexArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    events: typebox_1.Type.Array(exports.EventIndex),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserCreateCommunitySuccessResult = typebox_1.Type.Object({
    community_id: exports.CommunityId,
});
exports.UserCreateCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserCreateCommunitySuccessResult,
    }),
    typebox_1.Type.Object({
        NameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("NameReserved"),
    typebox_1.Type.Object({
        DescriptionTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        RulesTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        RulesTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        AvatarTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        BannerTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("AccessGateInvalid"),
    typebox_1.Type.Object({
        MaxCommunitiesCreated: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Literal("Throttled"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("Unauthorized"),
    typebox_1.Type.Literal("DefaultChannelsInvalid"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserMarkReadChatMessagesRead = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    read_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    threads: typebox_1.Type.Array(exports.UserMarkReadThreadRead),
    date_read_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserMarkReadCommunityMessagesRead = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    channels_read: typebox_1.Type.Array(exports.UserMarkReadChannelMessagesRead),
});
exports.UserEventsArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    start_index: exports.EventIndex,
    ascending: typebox_1.Type.Boolean(),
    max_messages: typebox_1.Type.Number(),
    max_events: typebox_1.Type.Number(),
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.UserLeaveCommunityArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
});
exports.UserAcceptP2pSwapArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserDeleteCommunityArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
});
exports.UserChitEventsSuccessResult = typebox_1.Type.Object({
    events: typebox_1.Type.Array(exports.ChitEarned),
    total: typebox_1.Type.Number(),
});
exports.UserReportMessageArgs = typebox_1.Type.Object({
    them: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    delete: typebox_1.Type.Boolean(),
});
exports.VideoContent = typebox_1.Type.Object({
    width: typebox_1.Type.Number(),
    height: typebox_1.Type.Number(),
    thumbnail_data: exports.ThumbnailData,
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    mime_type: typebox_1.Type.String(),
    image_blob_reference: typebox_1.Type.Optional(typebox_1.Type.Union([exports.BlobReference, typebox_1.Type.Undefined()])),
    video_blob_reference: typebox_1.Type.Optional(typebox_1.Type.Union([exports.BlobReference, typebox_1.Type.Undefined()])),
});
exports.GroupPermissions = typebox_1.Type.Object({
    change_roles: exports.GroupPermissionRole,
    update_group: exports.GroupPermissionRole,
    add_members: exports.GroupPermissionRole,
    invite_users: exports.GroupPermissionRole,
    remove_members: exports.GroupPermissionRole,
    delete_messages: exports.GroupPermissionRole,
    pin_messages: exports.GroupPermissionRole,
    react_to_messages: exports.GroupPermissionRole,
    mention_all_members: exports.GroupPermissionRole,
    start_video_call: exports.GroupPermissionRole,
    message_permissions: exports.MessagePermissions,
    thread_permissions: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessagePermissions, typebox_1.Type.Undefined()])),
});
exports.GroupSubtype = typebox_1.Type.Object({
    GovernanceProposals: exports.GovernanceProposalsSubtype,
});
exports.SignedDelegation = typebox_1.Type.Object({
    delegation: exports.Delegation,
    signature: exports.TSBytes,
});
exports.P2PSwapReserved = typebox_1.Type.Object({
    reserved_by: exports.UserId,
});
exports.UserSummary = typebox_1.Type.Object({
    user_id: exports.UserId,
    username: typebox_1.Type.String(),
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    is_bot: typebox_1.Type.Boolean(),
    suspended: typebox_1.Type.Boolean(),
    diamond_member: typebox_1.Type.Boolean(),
    diamond_membership_status: exports.DiamondMembershipStatus,
    total_chit_earned: typebox_1.Type.Number(),
    chit_balance: typebox_1.Type.Number(),
    streak: typebox_1.Type.Number(),
    is_unique_person: typebox_1.Type.Boolean(),
});
exports.CompletedCryptoTransactionICRC2 = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: typebox_1.Type.BigInt(),
    spender: exports.UserId,
    from: exports.CryptoAccountICRC1,
    to: exports.CryptoAccountICRC1,
    fee: typebox_1.Type.BigInt(),
    memo: typebox_1.Type.Optional(typebox_1.Type.Union([exports.TSBytes, typebox_1.Type.Undefined()])),
    created: typebox_1.Type.BigInt(),
    block_index: typebox_1.Type.BigInt(),
});
exports.AvatarChanged = typebox_1.Type.Object({
    new_avatar: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    previous_avatar: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    changed_by: exports.UserId,
});
exports.MembersRemoved = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
    removed_by: exports.UserId,
});
exports.SwapStatusErrorReserved = typebox_1.Type.Object({
    reserved_by: exports.UserId,
});
exports.MessagePinned = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    pinned_by: exports.UserId,
});
exports.P2PSwapContentInitial = typebox_1.Type.Object({
    token0: exports.TokenInfo,
    token0_amount: typebox_1.Type.BigInt(),
    token1: exports.TokenInfo,
    token1_amount: typebox_1.Type.BigInt(),
    expires_in: typebox_1.Type.BigInt(),
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.GroupDescriptionChanged = typebox_1.Type.Object({
    new_description: typebox_1.Type.String(),
    previous_description: typebox_1.Type.String(),
    changed_by: exports.UserId,
});
exports.PrizeContent = typebox_1.Type.Object({
    prizes_remaining: typebox_1.Type.Number(),
    prizes_pending: typebox_1.Type.Number(),
    winners: typebox_1.Type.Array(exports.UserId),
    winner_count: typebox_1.Type.Number(),
    user_is_winner: typebox_1.Type.Boolean(),
    token: exports.Cryptocurrency,
    end_date: typebox_1.Type.BigInt(),
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    diamond_only: typebox_1.Type.Boolean(),
    lifetime_diamond_only: typebox_1.Type.Boolean(),
    unique_person_only: typebox_1.Type.Boolean(),
    streak_only: typebox_1.Type.Number(),
});
exports.GroupRulesChanged = typebox_1.Type.Object({
    enabled: typebox_1.Type.Boolean(),
    prev_enabled: typebox_1.Type.Boolean(),
    changed_by: exports.UserId,
});
exports.GroupCreated = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    created_by: exports.UserId,
});
exports.UserSummaryV2 = typebox_1.Type.Object({
    user_id: exports.UserId,
    stable: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserSummaryStable, typebox_1.Type.Undefined()])),
    volatile: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserSummaryVolatile, typebox_1.Type.Undefined()])),
});
exports.ExternalUrlUpdated = typebox_1.Type.Object({
    updated_by: exports.UserId,
    new_url: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.DeletedGroupInfo = typebox_1.Type.Object({
    id: exports.ChatId,
    timestamp: typebox_1.Type.BigInt(),
    deleted_by: exports.UserId,
    group_name: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    public: typebox_1.Type.Boolean(),
});
exports.SwapStatusErrorAccepted = typebox_1.Type.Object({
    accepted_by: exports.UserId,
    token1_txn_in: typebox_1.Type.BigInt(),
});
exports.P2PSwapCompleted = typebox_1.Type.Object({
    accepted_by: exports.UserId,
    token1_txn_in: typebox_1.Type.BigInt(),
    token0_txn_out: typebox_1.Type.BigInt(),
    token1_txn_out: typebox_1.Type.BigInt(),
});
exports.GroupInviteCodeChanged = typebox_1.Type.Object({
    change: exports.GroupInviteCodeChange,
    changed_by: exports.UserId,
});
exports.GroupNameChanged = typebox_1.Type.Object({
    new_name: typebox_1.Type.String(),
    previous_name: typebox_1.Type.String(),
    changed_by: exports.UserId,
});
exports.AccessGateNonComposite = typebox_1.Type.Union([
    typebox_1.Type.Literal("DiamondMember"),
    typebox_1.Type.Literal("LifetimeDiamondMember"),
    typebox_1.Type.Literal("UniquePerson"),
    typebox_1.Type.Object({
        VerifiedCredential: exports.VerifiedCredentialGate,
    }),
    typebox_1.Type.Object({
        SnsNeuron: exports.SnsNeuronGate,
    }),
    typebox_1.Type.Object({
        Payment: exports.PaymentGate,
    }),
    typebox_1.Type.Object({
        TokenBalance: exports.TokenBalanceGate,
    }),
    typebox_1.Type.Literal("Locked"),
    typebox_1.Type.Literal("ReferredByMember"),
]);
exports.Chat = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Direct: exports.ChatId,
    }),
    typebox_1.Type.Object({
        Group: exports.ChatId,
    }),
    typebox_1.Type.Object({
        Channel: typebox_1.Type.Tuple([exports.CommunityId, exports.ChannelId]),
    }),
]);
exports.DeletedBy = typebox_1.Type.Object({
    deleted_by: exports.UserId,
    timestamp: typebox_1.Type.BigInt(),
});
exports.CompletedCryptoTransaction = typebox_1.Type.Union([
    typebox_1.Type.Object({
        NNS: exports.CompletedCryptoTransactionNNS,
    }),
    typebox_1.Type.Object({
        ICRC1: exports.CompletedCryptoTransactionICRC1,
    }),
    typebox_1.Type.Object({
        ICRC2: exports.CompletedCryptoTransactionICRC2,
    }),
]);
exports.P2PSwapAccepted = typebox_1.Type.Object({
    accepted_by: exports.UserId,
    token1_txn_in: typebox_1.Type.BigInt(),
});
exports.GroupMember = typebox_1.Type.Object({
    user_id: exports.UserId,
    date_added: typebox_1.Type.BigInt(),
    role: exports.GroupRole,
    lapsed: typebox_1.Type.Boolean(),
});
exports.MessageUnpinned = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    unpinned_by: exports.UserId,
    due_to_message_deleted: typebox_1.Type.Boolean(),
});
exports.TotalVotes = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Visible: typebox_1.Type.Record(typebox_1.Type.Number(), typebox_1.Type.Array(exports.UserId)),
    }),
    typebox_1.Type.Object({
        Anonymous: typebox_1.Type.Record(typebox_1.Type.Number(), typebox_1.Type.Number()),
    }),
    typebox_1.Type.Object({
        Hidden: typebox_1.Type.Number(),
    }),
]);
exports.MultiUserChat = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Group: exports.ChatId,
    }),
    typebox_1.Type.Object({
        Channel: typebox_1.Type.Tuple([exports.CommunityId, exports.ChannelId]),
    }),
]);
exports.UsersUnblocked = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
    unblocked_by: exports.UserId,
});
exports.Tips = typebox_1.Type.Array(typebox_1.Type.Tuple([exports.TSBytes, typebox_1.Type.Array(typebox_1.Type.Tuple([exports.UserId, typebox_1.Type.BigInt()]))]));
exports.CallParticipant = typebox_1.Type.Object({
    user_id: exports.UserId,
    joined: typebox_1.Type.BigInt(),
});
exports.PermissionsChanged = typebox_1.Type.Object({
    old_permissions_v2: exports.GroupPermissions,
    new_permissions_v2: exports.GroupPermissions,
    changed_by: exports.UserId,
});
exports.GroupFrozen = typebox_1.Type.Object({
    frozen_by: exports.UserId,
    reason: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.AccessTokenType = typebox_1.Type.Union([
    typebox_1.Type.Object({
        StartVideoCallV2: exports.VideoCallAccessTokenArgs,
    }),
    typebox_1.Type.Literal("JoinVideoCall"),
    typebox_1.Type.Literal("MarkVideoCallAsEnded"),
    typebox_1.Type.Object({
        BotCommand: exports.BotCommandArgs,
    }),
]);
exports.FailedCryptoTransactionICRC2 = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: typebox_1.Type.BigInt(),
    fee: typebox_1.Type.BigInt(),
    spender: exports.UserId,
    from: exports.CryptoAccountICRC1,
    to: exports.CryptoAccountICRC1,
    memo: typebox_1.Type.Optional(typebox_1.Type.Union([exports.TSBytes, typebox_1.Type.Undefined()])),
    created: typebox_1.Type.BigInt(),
    error_message: typebox_1.Type.String(),
});
exports.Proposal = typebox_1.Type.Union([
    typebox_1.Type.Object({
        NNS: exports.NnsProposal,
    }),
    typebox_1.Type.Object({
        SNS: exports.SnsProposal,
    }),
]);
exports.UsersInvited = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
    invited_by: exports.UserId,
});
exports.PendingCryptoTransactionNNS = typebox_1.Type.Object({
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: exports.Tokens,
    to: exports.UserOrAccount,
    fee: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Tokens, typebox_1.Type.Undefined()])),
    memo: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    created: typebox_1.Type.BigInt(),
});
exports.DeletedCommunityInfo = typebox_1.Type.Object({
    id: exports.CommunityId,
    timestamp: typebox_1.Type.BigInt(),
    deleted_by: exports.UserId,
    name: typebox_1.Type.String(),
    public: typebox_1.Type.Boolean(),
});
exports.VideoCallParticipants = typebox_1.Type.Object({
    participants: typebox_1.Type.Array(exports.CallParticipant),
    hidden: typebox_1.Type.Array(exports.CallParticipant),
    last_updated: typebox_1.Type.BigInt(),
});
exports.SwapStatusErrorCompleted = typebox_1.Type.Object({
    accepted_by: exports.UserId,
    token1_txn_in: typebox_1.Type.BigInt(),
    token0_txn_out: typebox_1.Type.BigInt(),
    token1_txn_out: typebox_1.Type.BigInt(),
});
exports.AirdropConfig = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    channel_id: exports.ChannelId,
    community_name: typebox_1.Type.String(),
    channel_name: typebox_1.Type.String(),
});
exports.MembersAdded = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
    added_by: exports.UserId,
    unblocked: typebox_1.Type.Array(exports.UserId),
});
exports.FrozenGroupInfo = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    frozen_by: exports.UserId,
    reason: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.GroupUnfrozen = typebox_1.Type.Object({
    unfrozen_by: exports.UserId,
});
exports.EventsTimeToLiveUpdated = typebox_1.Type.Object({
    updated_by: exports.UserId,
    new_ttl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.MemberJoined = typebox_1.Type.Object({
    user_id: exports.UserId,
    invited_by: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserId, typebox_1.Type.Undefined()])),
});
exports.RoleChanged = typebox_1.Type.Object({
    user_ids: typebox_1.Type.Array(exports.UserId),
    changed_by: exports.UserId,
    old_role: exports.GroupRole,
    new_role: exports.GroupRole,
});
exports.GroupVisibilityChanged = typebox_1.Type.Object({
    public: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    messages_visible_to_non_members: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    changed_by: exports.UserId,
});
exports.SelectedGroupUpdates = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    last_updated: typebox_1.Type.BigInt(),
    latest_event_index: exports.EventIndex,
    members_added_or_updated: typebox_1.Type.Array(exports.GroupMember),
    members_removed: typebox_1.Type.Array(exports.UserId),
    blocked_users_added: typebox_1.Type.Array(exports.UserId),
    blocked_users_removed: typebox_1.Type.Array(exports.UserId),
    invited_users: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.UserId), typebox_1.Type.Undefined()])),
    pinned_messages_added: typebox_1.Type.Array(exports.MessageIndex),
    pinned_messages_removed: typebox_1.Type.Array(exports.MessageIndex),
    chat_rules: typebox_1.Type.Optional(typebox_1.Type.Union([exports.VersionedRules, typebox_1.Type.Undefined()])),
});
exports.OptionUpdateFrozenGroupInfo = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.FrozenGroupInfo,
    }),
], { default: "NoChange" });
exports.ProposalContent = typebox_1.Type.Object({
    governance_canister_id: exports.TSBytes,
    proposal: exports.Proposal,
    my_vote: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
});
exports.ReplyContext = typebox_1.Type.Object({
    chat_if_other: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Tuple([exports.Chat, typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Null()])]), typebox_1.Type.Undefined()])),
    event_index: exports.EventIndex,
});
exports.ReportedMessage = typebox_1.Type.Object({
    reports: typebox_1.Type.Array(exports.MessageReport),
    count: typebox_1.Type.Number(),
});
exports.OptionUpdateAirdropConfig = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.AirdropConfig,
    }),
], { default: "NoChange" });
exports.DiamondMembershipStatusFull = typebox_1.Type.Union([
    typebox_1.Type.Literal("Inactive"),
    typebox_1.Type.Object({
        Active: exports.DiamondMembershipDetails,
    }),
    typebox_1.Type.Literal("Lifetime"),
]);
exports.OptionUpdateGroupSubtype = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.GroupSubtype,
    }),
], { default: "NoChange" });
exports.GroupIndexActiveGroupsSuccessResult = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    active_groups: typebox_1.Type.Array(exports.ChatId),
    active_communities: typebox_1.Type.Array(exports.CommunityId),
    deleted_groups: typebox_1.Type.Array(exports.DeletedGroupInfo),
    deleted_communities: typebox_1.Type.Array(exports.DeletedCommunityInfo),
});
exports.RegistryUpdatesSuccessResult = typebox_1.Type.Object({
    last_updated: typebox_1.Type.BigInt(),
    token_details: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.RegistryTokenDetails), typebox_1.Type.Undefined()])),
    nervous_system_details: typebox_1.Type.Array(exports.RegistryNervousSystemSummary),
    message_filters_added: typebox_1.Type.Array(exports.RegistryMessageFilterSummary),
    message_filters_removed: typebox_1.Type.Array(typebox_1.Type.BigInt()),
    swap_providers: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.ExchangeId), typebox_1.Type.Undefined()])),
    airdrop_config: exports.OptionUpdateAirdropConfig,
});
exports.RegistryUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.RegistryUpdatesSuccessResult,
    }),
    typebox_1.Type.Literal("SuccessNoUpdates"),
]);
exports.UserIndexPlatformModeratorsResponse = typebox_1.Type.Object({
    Success: exports.UserIndexPlatformModeratorsSuccessResult,
});
exports.UserIndexSuspectedBotsResponse = typebox_1.Type.Object({
    Success: exports.UserIndexSuspectedBotsSuccessResult,
});
exports.UserIndexUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserSummary,
    }),
    typebox_1.Type.Literal("UserNotFound"),
]);
exports.UserIndexSearchResult = typebox_1.Type.Object({
    users: typebox_1.Type.Array(exports.UserSummary),
    timestamp: typebox_1.Type.BigInt(),
});
exports.UserIndexSearchResponse = typebox_1.Type.Object({
    Success: exports.UserIndexSearchResult,
});
exports.UserIndexChitLeaderboardSuccessResult = typebox_1.Type.Object({
    all_time: typebox_1.Type.Array(exports.UserIndexChitLeaderboardChitUserBalance),
    this_month: typebox_1.Type.Array(exports.UserIndexChitLeaderboardChitUserBalance),
    last_month: typebox_1.Type.Array(exports.UserIndexChitLeaderboardChitUserBalance),
});
exports.UserIndexChitLeaderboardResponse = typebox_1.Type.Object({
    SuccessV2: exports.UserIndexChitLeaderboardSuccessResult,
});
exports.UserIndexCurrentUserSuccessResult = typebox_1.Type.Object({
    user_id: exports.UserId,
    username: typebox_1.Type.String(),
    date_created: typebox_1.Type.BigInt(),
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    canister_upgrade_status: exports.CanisterUpgradeStatus,
    wasm_version: exports.BuildVersion,
    icp_account: typebox_1.Type.Tuple([
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
        typebox_1.Type.Number(),
    ]),
    referrals: typebox_1.Type.Array(exports.UserId),
    is_platform_moderator: typebox_1.Type.Boolean(),
    is_platform_operator: typebox_1.Type.Boolean(),
    suspension_details: typebox_1.Type.Optional(typebox_1.Type.Union([exports.SuspensionDetails, typebox_1.Type.Undefined()])),
    is_suspected_bot: typebox_1.Type.Boolean(),
    diamond_membership_details: typebox_1.Type.Optional(typebox_1.Type.Union([exports.DiamondMembershipDetails, typebox_1.Type.Undefined()])),
    diamond_membership_status: exports.DiamondMembershipStatusFull,
    moderation_flags_enabled: typebox_1.Type.Number(),
    is_unique_person: typebox_1.Type.Boolean(),
});
exports.UserIndexCurrentUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserIndexCurrentUserSuccessResult,
    }),
    typebox_1.Type.Literal("UserNotFound"),
]);
exports.LocalUserIndexAccessTokenArgs = typebox_1.Type.Object({
    token_type: exports.AccessTokenType,
    chat: exports.Chat,
});
exports.LocalUserIndexRegisterUserResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.LocalUserIndexRegisterUserSuccessResult,
    }),
    typebox_1.Type.Literal("RegistrationInProgress"),
    typebox_1.Type.Literal("AlreadyRegistered"),
    typebox_1.Type.Literal("UserLimitReached"),
    typebox_1.Type.Literal("UsernameInvalid"),
    typebox_1.Type.Object({
        UsernameTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        UsernameTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("CyclesBalanceTooLow"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        PublicKeyInvalid: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("ReferralCodeInvalid"),
    typebox_1.Type.Literal("ReferralCodeAlreadyClaimed"),
    typebox_1.Type.Literal("ReferralCodeExpired"),
]);
exports.LocalUserIndexChatEventsEventsArgs = typebox_1.Type.Object({
    context: exports.LocalUserIndexChatEventsEventsContext,
    args: exports.LocalUserIndexChatEventsEventsArgsInner,
    latest_known_update: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.LocalUserIndexInviteUsersToChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        PartialSuccess: exports.LocalUserIndexInviteUsersToChannelPartialSuccessResult,
    }),
    typebox_1.Type.Object({
        Failed: exports.LocalUserIndexInviteUsersToChannelFailedResult,
    }),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        TooManyInvites: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexReportMessageArgs = typebox_1.Type.Object({
    chat_id: exports.MultiUserChat,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    event_index: exports.EventIndex,
    reason_code: typebox_1.Type.Number(),
    notes: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.CommunitySelectedChannelUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.SelectedGroupUpdates,
    }),
    typebox_1.Type.Object({
        SuccessNoUpdates: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Literal("PrivateCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("PrivateChannel"),
]);
exports.CommunitySelectedChannelInitialSuccessResult = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    last_updated: typebox_1.Type.BigInt(),
    latest_event_index: exports.EventIndex,
    members: typebox_1.Type.Array(exports.GroupMember),
    basic_members: typebox_1.Type.Array(exports.UserId),
    blocked_users: typebox_1.Type.Array(exports.UserId),
    invited_users: typebox_1.Type.Array(exports.UserId),
    pinned_messages: typebox_1.Type.Array(exports.MessageIndex),
    chat_rules: exports.VersionedRules,
});
exports.CommunityCommunityMembersResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityCommunityMembersSuccessResult,
    }),
    typebox_1.Type.Literal("PrivateCommunity"),
]);
exports.CommunityAddMembersToChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        PartialSuccess: exports.CommunityAddMembersToChannelPartialSuccessResult,
    }),
    typebox_1.Type.Object({
        Failed: exports.CommunityAddMembersToChannelFailedResult,
    }),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("CommunityPublic"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Object({
        UserLimitReached: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.CommunitySelectedInitialResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunitySelectedInitialSuccessResult,
    }),
    typebox_1.Type.Literal("PrivateCommunity"),
]);
exports.CommunityVideoCallParticipantsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.VideoCallParticipants,
    }),
    typebox_1.Type.Literal("VideoCallNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("ChannelNotFound"),
]);
exports.ProposalsBotProposalToSubmitAction = typebox_1.Type.Union([
    typebox_1.Type.Literal("Motion"),
    typebox_1.Type.Object({
        TransferSnsTreasuryFunds: exports.ProposalsBotTransferSnsTreasuryFunds,
    }),
    typebox_1.Type.Literal("UpgradeSnsToNextVersion"),
    typebox_1.Type.Object({
        UpgradeSnsControlledCanister: exports.ProposalsBotUpgradeSnsControlledCanister,
    }),
    typebox_1.Type.Object({
        ExecuteGenericNervousSystemFunction: exports.ProposalsBotExecuteGenericNervousSystemFunction,
    }),
]);
exports.ProposalsBotProposalToSubmit = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    summary: typebox_1.Type.String(),
    url: typebox_1.Type.String(),
    action: exports.ProposalsBotProposalToSubmitAction,
});
exports.OnlineUsersLastOnlineResponse = typebox_1.Type.Object({
    Success: typebox_1.Type.Array(exports.OnlineUsersLastOnlineUserLastOnline),
});
exports.GroupSelectedInitialSuccessResult = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    last_updated: typebox_1.Type.BigInt(),
    latest_event_index: exports.EventIndex,
    participants: typebox_1.Type.Array(exports.GroupMember),
    basic_members: typebox_1.Type.Array(exports.UserId),
    blocked_users: typebox_1.Type.Array(exports.UserId),
    invited_users: typebox_1.Type.Array(exports.UserId),
    pinned_messages: typebox_1.Type.Array(exports.MessageIndex),
    chat_rules: exports.VersionedRules,
});
exports.GroupSelectedInitialResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupSelectedInitialSuccessResult,
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
]);
exports.GroupVideoCallParticipantsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.VideoCallParticipants,
    }),
    typebox_1.Type.Literal("VideoCallNotFound"),
    typebox_1.Type.Literal("CallerNotInGroup"),
]);
exports.GroupSelectedUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.SelectedGroupUpdates,
    }),
    typebox_1.Type.Object({
        SuccessNoUpdates: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
]);
exports.UserManageFavouriteChatsArgs = typebox_1.Type.Object({
    to_add: typebox_1.Type.Array(exports.Chat),
    to_remove: typebox_1.Type.Array(exports.Chat),
});
exports.UserMessageActivityEvent = typebox_1.Type.Object({
    chat: exports.Chat,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_index: exports.MessageIndex,
    message_id: exports.MessageId,
    event_index: exports.EventIndex,
    activity: exports.UserMessageActivity,
    timestamp: typebox_1.Type.BigInt(),
    user_id: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserId, typebox_1.Type.Undefined()])),
});
exports.UserCreateGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserCreateGroupSuccessResult,
    }),
    typebox_1.Type.Object({
        NameTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        NameTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("NameReserved"),
    typebox_1.Type.Object({
        DescriptionTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        RulesTooShort: exports.FieldTooShortResult,
    }),
    typebox_1.Type.Object({
        RulesTooLong: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Object({
        AvatarTooBig: exports.FieldTooLongResult,
    }),
    typebox_1.Type.Literal("AccessGateInvalid"),
    typebox_1.Type.Object({
        MaxGroupsCreated: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("NameTaken"),
    typebox_1.Type.Literal("Throttled"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UnauthorizedToCreatePublicGroup"),
    typebox_1.Type.Literal("InternalError"),
]);
exports.UserSetPinNumberPinNumberVerification = typebox_1.Type.Union([
    typebox_1.Type.Literal("None"),
    typebox_1.Type.Object({
        PIN: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        Delegation: exports.SignedDelegation,
    }),
]);
exports.UserSetPinNumberArgs = typebox_1.Type.Object({
    new: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    verification: exports.UserSetPinNumberPinNumberVerification,
});
exports.UserMessageActivityFeedSuccessResult = typebox_1.Type.Object({
    events: typebox_1.Type.Array(exports.UserMessageActivityEvent),
    total: typebox_1.Type.Number(),
});
exports.UserMessageActivityFeedResponse = typebox_1.Type.Object({
    Success: exports.UserMessageActivityFeedSuccessResult,
});
exports.UserTipMessageArgs = typebox_1.Type.Object({
    chat: exports.Chat,
    recipient: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    amount: typebox_1.Type.BigInt(),
    fee: typebox_1.Type.BigInt(),
    decimals: typebox_1.Type.Number(),
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserChatInList = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Direct: exports.ChatId,
    }),
    typebox_1.Type.Object({
        Group: exports.ChatId,
    }),
    typebox_1.Type.Object({
        Favourite: exports.Chat,
    }),
    typebox_1.Type.Object({
        Community: typebox_1.Type.Tuple([exports.CommunityId, exports.ChannelId]),
    }),
]);
exports.UserPinChatArgs = typebox_1.Type.Object({
    chat: exports.UserChatInList,
});
exports.UserContactsResponse = typebox_1.Type.Object({
    Success: exports.UserContactsSuccessResult,
});
exports.UserInitialStateFavouriteChatsInitial = typebox_1.Type.Object({
    chats: typebox_1.Type.Array(exports.Chat),
    pinned: typebox_1.Type.Array(exports.Chat),
});
exports.UserUpdatesFavouriteChatsUpdates = typebox_1.Type.Object({
    chats: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.Chat), typebox_1.Type.Undefined()])),
    pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.Chat), typebox_1.Type.Undefined()])),
});
exports.UserSubmitProposalArgs = typebox_1.Type.Object({
    governance_canister_id: exports.TSBytes,
    proposal: exports.ProposalsBotProposalToSubmit,
    ledger: exports.TSBytes,
    token: exports.Cryptocurrency,
    proposal_rejection_fee: typebox_1.Type.BigInt(),
    transaction_fee: typebox_1.Type.BigInt(),
});
exports.UserSendMessageWithTransferToGroupSuccessResult = typebox_1.Type.Object({
    event_index: exports.EventIndex,
    message_index: exports.MessageIndex,
    timestamp: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    transfer: exports.CompletedCryptoTransaction,
});
exports.UserSetMessageReminderArgs = typebox_1.Type.Object({
    chat: exports.Chat,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    event_index: exports.EventIndex,
    notes: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    remind_at: typebox_1.Type.BigInt(),
});
exports.UserTokenSwapsResponse = typebox_1.Type.Object({
    Success: exports.UserTokenSwapsSuccessResult,
});
exports.UserArchiveUnarchiveChatsArgs = typebox_1.Type.Object({
    to_archive: typebox_1.Type.Array(exports.Chat),
    to_unarchive: typebox_1.Type.Array(exports.Chat),
});
exports.UserArchiveUnarchiveChatsPartialSuccessResult = typebox_1.Type.Object({
    chats_not_found: typebox_1.Type.Array(exports.Chat),
});
exports.UserSendMessageTransferSuccessV2Result = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    event_index: exports.EventIndex,
    message_index: exports.MessageIndex,
    timestamp: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    transfer: exports.CompletedCryptoTransaction,
});
exports.UserSendMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserSendMessageSuccessResult,
    }),
    typebox_1.Type.Object({
        TransferSuccessV2: exports.UserSendMessageTransferSuccessV2Result,
    }),
    typebox_1.Type.Literal("MessageEmpty"),
    typebox_1.Type.Object({
        TextTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("RecipientBlocked"),
    typebox_1.Type.Literal("RecipientNotFound"),
    typebox_1.Type.Object({
        InvalidPoll: exports.InvalidPollReason,
    }),
    typebox_1.Type.Object({
        InvalidRequest: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        TransferFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("TransferCannotBeZero"),
    typebox_1.Type.Literal("TransferCannotBeToSelf"),
    typebox_1.Type.Object({
        P2PSwapSetUpFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("DuplicateMessageId"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserSendMessageWithTransferToChannelSuccessResult = typebox_1.Type.Object({
    event_index: exports.EventIndex,
    message_index: exports.MessageIndex,
    timestamp: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    transfer: exports.CompletedCryptoTransaction,
});
exports.UserMarkReadArgs = typebox_1.Type.Object({
    messages_read: typebox_1.Type.Array(exports.UserMarkReadChatMessagesRead),
    community_messages_read: typebox_1.Type.Array(exports.UserMarkReadCommunityMessagesRead),
});
exports.UserChitEventsResponse = typebox_1.Type.Object({
    Success: exports.UserChitEventsSuccessResult,
});
exports.UserUnpinChatArgs = typebox_1.Type.Object({
    chat: exports.UserChatInList,
});
exports.PrizeWinnerContent = typebox_1.Type.Object({
    winner: exports.UserId,
    transaction: exports.CompletedCryptoTransaction,
    prize_message: exports.MessageIndex,
});
exports.VideoCallContent = typebox_1.Type.Object({
    call_type: exports.VideoCallType,
    ended: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    participants: typebox_1.Type.Array(exports.CallParticipant),
    hidden_participants: typebox_1.Type.Number(),
});
exports.EventWrapperGroupFrozen = typebox_1.Type.Object({
    index: exports.EventIndex,
    timestamp: typebox_1.Type.BigInt(),
    correlation_id: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    event: exports.GroupFrozen,
});
exports.FailedCryptoTransaction = typebox_1.Type.Union([
    typebox_1.Type.Object({
        NNS: exports.FailedCryptoTransactionNNS,
    }),
    typebox_1.Type.Object({
        ICRC1: exports.FailedCryptoTransactionICRC1,
    }),
    typebox_1.Type.Object({
        ICRC2: exports.FailedCryptoTransactionICRC2,
    }),
]);
exports.CompositeGate = typebox_1.Type.Object({
    inner: typebox_1.Type.Array(exports.AccessGateNonComposite),
    and: typebox_1.Type.Boolean(),
});
exports.EventWrapperGroupUnfrozen = typebox_1.Type.Object({
    index: exports.EventIndex,
    timestamp: typebox_1.Type.BigInt(),
    correlation_id: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    event: exports.GroupUnfrozen,
});
exports.PendingCryptoTransaction = typebox_1.Type.Union([
    typebox_1.Type.Object({
        NNS: exports.PendingCryptoTransactionNNS,
    }),
    typebox_1.Type.Object({
        ICRC1: exports.PendingCryptoTransactionICRC1,
    }),
    typebox_1.Type.Object({
        ICRC2: exports.PendingCryptoTransactionICRC2,
    }),
]);
exports.CryptoTransaction = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Pending: exports.PendingCryptoTransaction,
    }),
    typebox_1.Type.Object({
        Completed: exports.CompletedCryptoTransaction,
    }),
    typebox_1.Type.Object({
        Failed: exports.FailedCryptoTransaction,
    }),
]);
exports.P2PSwapStatus = typebox_1.Type.Union([
    typebox_1.Type.Literal("Open"),
    typebox_1.Type.Object({
        Cancelled: exports.P2PSwapCancelled,
    }),
    typebox_1.Type.Object({
        Expired: exports.P2PSwapCancelled,
    }),
    typebox_1.Type.Object({
        Reserved: exports.P2PSwapReserved,
    }),
    typebox_1.Type.Object({
        Accepted: exports.P2PSwapAccepted,
    }),
    typebox_1.Type.Object({
        Completed: exports.P2PSwapCompleted,
    }),
]);
exports.PollVotes = typebox_1.Type.Object({
    total: exports.TotalVotes,
    user: typebox_1.Type.Array(typebox_1.Type.Number()),
});
exports.CurrentUserSummary = typebox_1.Type.Object({
    user_id: exports.UserId,
    username: typebox_1.Type.String(),
    display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    is_bot: typebox_1.Type.Boolean(),
    is_platform_moderator: typebox_1.Type.Boolean(),
    is_platform_operator: typebox_1.Type.Boolean(),
    suspension_details: typebox_1.Type.Optional(typebox_1.Type.Union([exports.SuspensionDetails, typebox_1.Type.Undefined()])),
    is_suspected_bot: typebox_1.Type.Boolean(),
    diamond_membership_details: typebox_1.Type.Optional(typebox_1.Type.Union([exports.DiamondMembershipDetails, typebox_1.Type.Undefined()])),
    diamond_membership_status: exports.DiamondMembershipStatusFull,
    moderation_flags_enabled: typebox_1.Type.Number(),
    is_unique_person: typebox_1.Type.Boolean(),
});
exports.SwapStatusError = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Reserved: exports.SwapStatusErrorReserved,
    }),
    typebox_1.Type.Object({
        Accepted: exports.SwapStatusErrorAccepted,
    }),
    typebox_1.Type.Object({
        Completed: exports.SwapStatusErrorCompleted,
    }),
    typebox_1.Type.Object({
        Expired: exports.SwapStatusErrorExpired,
    }),
    typebox_1.Type.Object({
        Cancelled: exports.SwapStatusErrorCancelled,
    }),
]);
exports.P2PSwapContent = typebox_1.Type.Object({
    swap_id: typebox_1.Type.Number(),
    token0: exports.TokenInfo,
    token0_amount: typebox_1.Type.BigInt(),
    token1: exports.TokenInfo,
    token1_amount: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.BigInt(),
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    token0_txn_in: typebox_1.Type.BigInt(),
    status: exports.P2PSwapStatus,
});
exports.AccessGate = typebox_1.Type.Union([
    typebox_1.Type.Literal("DiamondMember"),
    typebox_1.Type.Literal("LifetimeDiamondMember"),
    typebox_1.Type.Literal("UniquePerson"),
    typebox_1.Type.Object({
        VerifiedCredential: exports.VerifiedCredentialGate,
    }),
    typebox_1.Type.Object({
        SnsNeuron: exports.SnsNeuronGate,
    }),
    typebox_1.Type.Object({
        Payment: exports.PaymentGate,
    }),
    typebox_1.Type.Object({
        TokenBalance: exports.TokenBalanceGate,
    }),
    typebox_1.Type.Object({
        Composite: exports.CompositeGate,
    }),
    typebox_1.Type.Literal("Locked"),
    typebox_1.Type.Literal("ReferredByMember"),
]);
exports.GroupIndexFreezeGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.EventWrapperGroupFrozen,
    }),
    typebox_1.Type.Literal("ChatAlreadyFrozen"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexUnfreezeCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.EventWrapperGroupUnfrozen,
    }),
    typebox_1.Type.Literal("CommunityNotFrozen"),
    typebox_1.Type.Literal("CommunityNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexFreezeCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.EventWrapperGroupFrozen,
    }),
    typebox_1.Type.Literal("CommunityAlreadyFrozen"),
    typebox_1.Type.Literal("CommunityNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupIndexActiveGroupsResponse = typebox_1.Type.Object({
    Success: exports.GroupIndexActiveGroupsSuccessResult,
});
exports.GroupIndexUnfreezeGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.EventWrapperGroupUnfrozen,
    }),
    typebox_1.Type.Literal("ChatNotFrozen"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserIndexUsersResult = typebox_1.Type.Object({
    users: typebox_1.Type.Array(exports.UserSummaryV2),
    current_user: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CurrentUserSummary, typebox_1.Type.Undefined()])),
    deleted: typebox_1.Type.Array(exports.UserId),
    timestamp: typebox_1.Type.BigInt(),
});
exports.UserIndexUsersResponse = typebox_1.Type.Object({
    Success: exports.UserIndexUsersResult,
});
exports.LocalUserIndexChatEventsArgs = typebox_1.Type.Object({
    requests: typebox_1.Type.Array(exports.LocalUserIndexChatEventsEventsArgs),
});
exports.CommunityClaimPrizeResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("AlreadyClaimed"),
    typebox_1.Type.Literal("PrizeFullyClaimed"),
    typebox_1.Type.Literal("PrizeEnded"),
    typebox_1.Type.Literal("LedgerError"),
    typebox_1.Type.Object({
        TransferFailed: typebox_1.Type.Tuple([typebox_1.Type.String(), exports.FailedCryptoTransaction]),
    }),
    typebox_1.Type.Object({
        FailedAfterTransfer: typebox_1.Type.Tuple([typebox_1.Type.String(), exports.CompletedCryptoTransaction]),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityRegisterPollVoteResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.PollVotes,
    }),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserCannotChangeVote"),
    typebox_1.Type.Literal("PollNotFound"),
    typebox_1.Type.Literal("PollEnded"),
    typebox_1.Type.Literal("OptionIndexOutOfRange"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityCancelP2pSwapResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        StatusError: exports.SwapStatusError,
    }),
    typebox_1.Type.Literal("SwapNotFound"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.CommunitySelectedChannelInitialResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunitySelectedChannelInitialSuccessResult,
    }),
    typebox_1.Type.Literal("PrivateCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("PrivateChannel"),
]);
exports.CommunityAcceptP2pSwapResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.AcceptSwapSuccess,
    }),
    typebox_1.Type.Literal("InsufficientFunds"),
    typebox_1.Type.Object({
        StatusError: exports.SwapStatusError,
    }),
    typebox_1.Type.Literal("SwapNotFound"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.GroupClaimPrizeResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("AlreadyClaimed"),
    typebox_1.Type.Literal("PrizeFullyClaimed"),
    typebox_1.Type.Literal("PrizeEnded"),
    typebox_1.Type.Literal("LedgerError"),
    typebox_1.Type.Object({
        TransferFailed: typebox_1.Type.Tuple([typebox_1.Type.String(), exports.FailedCryptoTransaction]),
    }),
    typebox_1.Type.Object({
        FailedAfterTransfer: typebox_1.Type.Tuple([typebox_1.Type.String(), exports.CompletedCryptoTransaction]),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.GroupRegisterPollVoteResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.PollVotes,
    }),
    typebox_1.Type.Literal("PollNotFound"),
    typebox_1.Type.Literal("PollEnded"),
    typebox_1.Type.Literal("OptionIndexOutOfRange"),
    typebox_1.Type.Literal("UserCannotChangeVote"),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupCancelP2pSwapResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        StatusError: exports.SwapStatusError,
    }),
    typebox_1.Type.Literal("SwapNotFound"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.GroupAcceptP2pSwapResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.AcceptSwapSuccess,
    }),
    typebox_1.Type.Literal("InsufficientFunds"),
    typebox_1.Type.Object({
        StatusError: exports.SwapStatusError,
    }),
    typebox_1.Type.Literal("SwapNotFound"),
    typebox_1.Type.Literal("UserNotInGroup"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserCancelP2pSwapResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Object({
        StatusError: exports.SwapStatusError,
    }),
    typebox_1.Type.Literal("SwapNotFound"),
]);
exports.UserSendMessageWithTransferToGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserSendMessageWithTransferToGroupSuccessResult,
    }),
    typebox_1.Type.Object({
        TextTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("RecipientBlocked"),
    typebox_1.Type.Object({
        CallerNotInGroup: typebox_1.Type.Union([exports.CompletedCryptoTransaction, typebox_1.Type.Null()]),
    }),
    typebox_1.Type.Object({
        CryptocurrencyNotSupported: exports.Cryptocurrency,
    }),
    typebox_1.Type.Object({
        InvalidRequest: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        TransferFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("TransferCannotBeZero"),
    typebox_1.Type.Literal("TransferCannotBeToSelf"),
    typebox_1.Type.Object({
        P2PSwapSetUpFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Literal("RulesNotAccepted"),
    typebox_1.Type.Object({
        Retrying: typebox_1.Type.Tuple([typebox_1.Type.String(), exports.CompletedCryptoTransaction]),
    }),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserWithdrawCryptoArgs = typebox_1.Type.Object({
    withdrawal: exports.PendingCryptoTransaction,
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserWithdrawCryptoResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CompletedCryptoTransaction,
    }),
    typebox_1.Type.Object({
        TransactionFailed: exports.FailedCryptoTransaction,
    }),
    typebox_1.Type.Literal("CurrencyNotSupported"),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserArchiveUnarchiveChatsResponse = typebox_1.Type.Union([
    typebox_1.Type.Literal("Success"),
    typebox_1.Type.Object({
        PartialSuccess: exports.UserArchiveUnarchiveChatsPartialSuccessResult,
    }),
    typebox_1.Type.Literal("Failure"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.UserSendMessageWithTransferToChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserSendMessageWithTransferToChannelSuccessResult,
    }),
    typebox_1.Type.Object({
        TextTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("RecipientBlocked"),
    typebox_1.Type.Object({
        UserNotInCommunity: typebox_1.Type.Union([exports.CompletedCryptoTransaction, typebox_1.Type.Null()]),
    }),
    typebox_1.Type.Object({
        UserNotInChannel: exports.CompletedCryptoTransaction,
    }),
    typebox_1.Type.Object({
        ChannelNotFound: exports.CompletedCryptoTransaction,
    }),
    typebox_1.Type.Object({
        CryptocurrencyNotSupported: exports.Cryptocurrency,
    }),
    typebox_1.Type.Object({
        InvalidRequest: typebox_1.Type.String(),
    }),
    typebox_1.Type.Object({
        TransferFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("TransferCannotBeZero"),
    typebox_1.Type.Literal("TransferCannotBeToSelf"),
    typebox_1.Type.Object({
        P2PSwapSetUpFailed: typebox_1.Type.String(),
    }),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("RulesNotAccepted"),
    typebox_1.Type.Literal("CommunityRulesNotAccepted"),
    typebox_1.Type.Object({
        Retrying: typebox_1.Type.Tuple([typebox_1.Type.String(), exports.CompletedCryptoTransaction]),
    }),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.UserAcceptP2pSwapResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.AcceptSwapSuccess,
    }),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("InsufficientFunds"),
    typebox_1.Type.Object({
        StatusError: exports.SwapStatusError,
    }),
    typebox_1.Type.Literal("SwapNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("PinRequired"),
    typebox_1.Type.Object({
        PinIncorrect: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        TooManyFailedPinAttempts: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.PollContent = typebox_1.Type.Object({
    config: exports.PollConfig,
    votes: exports.PollVotes,
    ended: typebox_1.Type.Boolean(),
});
exports.CryptoContent = typebox_1.Type.Object({
    recipient: exports.UserId,
    transfer: exports.CryptoTransaction,
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.PrizeContentInitial = typebox_1.Type.Object({
    prizes_v2: typebox_1.Type.Array(typebox_1.Type.BigInt()),
    transfer: exports.CryptoTransaction,
    end_date: typebox_1.Type.BigInt(),
    caption: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    diamond_only: typebox_1.Type.Boolean(),
    lifetime_diamond_only: typebox_1.Type.Boolean(),
    unique_person_only: typebox_1.Type.Boolean(),
    streak_only: typebox_1.Type.Number(),
});
exports.OptionUpdateAccessGate = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.AccessGate,
    }),
], { default: "NoChange" });
exports.MessageContent = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Text: exports.TextContent,
    }),
    typebox_1.Type.Object({
        Image: exports.ImageContent,
    }),
    typebox_1.Type.Object({
        Video: exports.VideoContent,
    }),
    typebox_1.Type.Object({
        Audio: exports.AudioContent,
    }),
    typebox_1.Type.Object({
        File: exports.FileContent,
    }),
    typebox_1.Type.Object({
        Poll: exports.PollContent,
    }),
    typebox_1.Type.Object({
        Crypto: exports.CryptoContent,
    }),
    typebox_1.Type.Object({
        Deleted: exports.DeletedBy,
    }),
    typebox_1.Type.Object({
        Giphy: exports.GiphyContent,
    }),
    typebox_1.Type.Object({
        GovernanceProposal: exports.ProposalContent,
    }),
    typebox_1.Type.Object({
        Prize: exports.PrizeContent,
    }),
    typebox_1.Type.Object({
        PrizeWinner: exports.PrizeWinnerContent,
    }),
    typebox_1.Type.Object({
        MessageReminderCreated: exports.MessageReminderCreatedContent,
    }),
    typebox_1.Type.Object({
        MessageReminder: exports.MessageReminderContent,
    }),
    typebox_1.Type.Object({
        ReportedMessage: exports.ReportedMessage,
    }),
    typebox_1.Type.Object({
        P2PSwap: exports.P2PSwapContent,
    }),
    typebox_1.Type.Object({
        VideoCall: exports.VideoCallContent,
    }),
    typebox_1.Type.Object({
        Custom: exports.CustomContent,
    }),
]);
exports.GroupMatch = typebox_1.Type.Object({
    id: exports.ChatId,
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    member_count: typebox_1.Type.Number(),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    subtype: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupSubtype, typebox_1.Type.Undefined()])),
});
exports.AccessGateConfig = typebox_1.Type.Object({
    gate: exports.AccessGate,
    expiry: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
});
exports.MessageContentInitial = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Text: exports.TextContent,
    }),
    typebox_1.Type.Object({
        Image: exports.ImageContent,
    }),
    typebox_1.Type.Object({
        Video: exports.VideoContent,
    }),
    typebox_1.Type.Object({
        Audio: exports.AudioContent,
    }),
    typebox_1.Type.Object({
        File: exports.FileContent,
    }),
    typebox_1.Type.Object({
        Poll: exports.PollContent,
    }),
    typebox_1.Type.Object({
        Crypto: exports.CryptoContent,
    }),
    typebox_1.Type.Object({
        Deleted: exports.DeletedBy,
    }),
    typebox_1.Type.Object({
        Giphy: exports.GiphyContent,
    }),
    typebox_1.Type.Object({
        GovernanceProposal: exports.ProposalContent,
    }),
    typebox_1.Type.Object({
        Prize: exports.PrizeContentInitial,
    }),
    typebox_1.Type.Object({
        MessageReminderCreated: exports.MessageReminderCreatedContent,
    }),
    typebox_1.Type.Object({
        MessageReminder: exports.MessageReminderContent,
    }),
    typebox_1.Type.Object({
        P2PSwap: exports.P2PSwapContentInitial,
    }),
    typebox_1.Type.Object({
        Custom: exports.CustomContent,
    }),
]);
exports.OptionUpdateAccessGateConfig = typebox_1.Type.Union([
    typebox_1.Type.Literal("NoChange"),
    typebox_1.Type.Literal("SetToNone"),
    typebox_1.Type.Object({
        SetToSome: exports.AccessGateConfig,
    }),
], { default: "NoChange" });
exports.GroupGateUpdated = typebox_1.Type.Object({
    updated_by: exports.UserId,
    new_gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    new_gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
});
exports.GroupIndexExploreGroupsSuccessResult = typebox_1.Type.Object({
    matches: typebox_1.Type.Array(exports.GroupMatch),
    total: typebox_1.Type.Number(),
});
exports.GroupIndexExploreGroupsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupIndexExploreGroupsSuccessResult,
    }),
    typebox_1.Type.Object({
        TermTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TermTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("InvalidTerm"),
]);
exports.CommunityDeletedMessageSuccessResult = typebox_1.Type.Object({
    content: exports.MessageContent,
});
exports.CommunityDeletedMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityDeletedMessageSuccessResult,
    }),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("MessageHardDeleted"),
]);
exports.CommunityUpdateCommunityArgs = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    description: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    rules: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UpdatedRules, typebox_1.Type.Undefined()])),
    avatar: exports.OptionUpdateDocument,
    banner: exports.OptionUpdateDocument,
    permissions: typebox_1.Type.Optional(typebox_1.Type.Union([exports.OptionalCommunityPermissions, typebox_1.Type.Undefined()])),
    gate: exports.OptionUpdateAccessGate,
    gate_config: exports.OptionUpdateAccessGateConfig,
    public: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    primary_language: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.CommunitySendMessageArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    content: exports.MessageContentInitial,
    sender_name: typebox_1.Type.String(),
    sender_display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    replies_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupReplyContext, typebox_1.Type.Undefined()])),
    mentioned: typebox_1.Type.Array(exports.User),
    forwarding: typebox_1.Type.Boolean(),
    block_level_markdown: typebox_1.Type.Boolean(),
    community_rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
    channel_rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
    message_filter_failed: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunityCreateChannelArgs = typebox_1.Type.Object({
    is_public: typebox_1.Type.Boolean(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    rules: exports.Rules,
    subtype: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupSubtype, typebox_1.Type.Undefined()])),
    avatar: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Document, typebox_1.Type.Undefined()])),
    history_visible_to_new_joiners: typebox_1.Type.Boolean(),
    messages_visible_to_non_members: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    permissions_v2: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissions, typebox_1.Type.Undefined()])),
    events_ttl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
    external_url: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.CommunityEditMessageArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    content: exports.MessageContentInitial,
    block_level_markdown: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
});
exports.CommunityUpdateChannelArgs = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    description: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    rules: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UpdatedRules, typebox_1.Type.Undefined()])),
    avatar: exports.OptionUpdateDocument,
    permissions_v2: typebox_1.Type.Optional(typebox_1.Type.Union([exports.OptionalGroupPermissions, typebox_1.Type.Undefined()])),
    events_ttl: exports.OptionUpdateU64,
    gate: exports.OptionUpdateAccessGate,
    gate_config: exports.OptionUpdateAccessGateConfig,
    public: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    messages_visible_to_non_members: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    external_url: exports.OptionUpdateString,
});
exports.GroupDeletedMessageSuccessResult = typebox_1.Type.Object({
    content: exports.MessageContent,
});
exports.GroupUpdateGroupArgs = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    description: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    rules: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UpdatedRules, typebox_1.Type.Undefined()])),
    avatar: exports.OptionUpdateDocument,
    permissions_v2: typebox_1.Type.Optional(typebox_1.Type.Union([exports.OptionalGroupPermissions, typebox_1.Type.Undefined()])),
    events_ttl: exports.OptionUpdateU64,
    gate: exports.OptionUpdateAccessGate,
    gate_config: exports.OptionUpdateAccessGateConfig,
    public: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    messages_visible_to_non_members: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupSendMessageArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    content: exports.MessageContentInitial,
    sender_name: typebox_1.Type.String(),
    sender_display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    replies_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupReplyContext, typebox_1.Type.Undefined()])),
    mentioned: typebox_1.Type.Array(exports.User),
    forwarding: typebox_1.Type.Boolean(),
    block_level_markdown: typebox_1.Type.Boolean(),
    rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
    message_filter_failed: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.GroupEditMessageArgs = typebox_1.Type.Object({
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    content: exports.MessageContentInitial,
    block_level_markdown: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    new_achievement: typebox_1.Type.Boolean(),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.UserCreateGroupArgs = typebox_1.Type.Object({
    is_public: typebox_1.Type.Boolean(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    rules: exports.Rules,
    avatar: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Document, typebox_1.Type.Undefined()])),
    history_visible_to_new_joiners: typebox_1.Type.Boolean(),
    messages_visible_to_non_members: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    permissions_v2: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissions, typebox_1.Type.Undefined()])),
    events_ttl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
});
exports.UserDeletedMessageSuccessResult = typebox_1.Type.Object({
    content: exports.MessageContent,
});
exports.UserDeletedMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserDeletedMessageSuccessResult,
    }),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("MessageHardDeleted"),
]);
exports.UserSendMessageWithTransferToGroupArgs = typebox_1.Type.Object({
    group_id: exports.ChatId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    content: exports.MessageContentInitial,
    sender_name: typebox_1.Type.String(),
    sender_display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    replies_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupReplyContext, typebox_1.Type.Undefined()])),
    mentioned: typebox_1.Type.Array(exports.User),
    block_level_markdown: typebox_1.Type.Boolean(),
    correlation_id: typebox_1.Type.BigInt(),
    rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
    message_filter_failed: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserSendMessageArgs = typebox_1.Type.Object({
    recipient: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    content: exports.MessageContentInitial,
    replies_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ReplyContext, typebox_1.Type.Undefined()])),
    forwarding: typebox_1.Type.Boolean(),
    block_level_markdown: typebox_1.Type.Boolean(),
    message_filter_failed: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.UserCreateCommunityArgs = typebox_1.Type.Object({
    is_public: typebox_1.Type.Boolean(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    rules: exports.Rules,
    avatar: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Document, typebox_1.Type.Undefined()])),
    banner: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Document, typebox_1.Type.Undefined()])),
    history_visible_to_new_joiners: typebox_1.Type.Boolean(),
    permissions: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissions, typebox_1.Type.Undefined()])),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
    default_channels: typebox_1.Type.Array(typebox_1.Type.String()),
    default_channel_rules: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Rules, typebox_1.Type.Undefined()])),
    primary_language: typebox_1.Type.String(),
});
exports.UserSendMessageWithTransferToChannelArgs = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    channel_id: exports.ChannelId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    content: exports.MessageContentInitial,
    sender_name: typebox_1.Type.String(),
    sender_display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    replies_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupReplyContext, typebox_1.Type.Undefined()])),
    mentioned: typebox_1.Type.Array(exports.User),
    block_level_markdown: typebox_1.Type.Boolean(),
    community_rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
    channel_rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([exports.Version, typebox_1.Type.Undefined()])),
    message_filter_failed: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    pin: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.UserEditMessageArgs = typebox_1.Type.Object({
    user_id: exports.UserId,
    thread_root_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    message_id: exports.MessageId,
    content: exports.MessageContentInitial,
    block_level_markdown: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    correlation_id: typebox_1.Type.BigInt(),
});
exports.ChannelMatch = typebox_1.Type.Object({
    id: exports.ChannelId,
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    member_count: typebox_1.Type.Number(),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
    subtype: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupSubtype, typebox_1.Type.Undefined()])),
});
exports.Message = typebox_1.Type.Object({
    message_index: exports.MessageIndex,
    message_id: exports.MessageId,
    sender: exports.UserId,
    content: exports.MessageContent,
    replies_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ReplyContext, typebox_1.Type.Undefined()])),
    reactions: typebox_1.Type.Array(typebox_1.Type.Tuple([exports.Reaction, typebox_1.Type.Array(exports.UserId)])),
    tips: exports.Tips,
    thread_summary: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ThreadSummary, typebox_1.Type.Undefined()])),
    edited: typebox_1.Type.Boolean(),
    forwarded: typebox_1.Type.Boolean(),
    block_level_markdown: typebox_1.Type.Boolean(),
});
exports.CommunityMatch = typebox_1.Type.Object({
    id: exports.CommunityId,
    score: typebox_1.Type.Number(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    banner_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    member_count: typebox_1.Type.Number(),
    channel_count: typebox_1.Type.Number(),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
    moderation_flags: typebox_1.Type.Number(),
    primary_language: typebox_1.Type.String(),
});
exports.EventWrapperMessage = typebox_1.Type.Object({
    index: exports.EventIndex,
    timestamp: typebox_1.Type.BigInt(),
    correlation_id: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    event: exports.Message,
});
exports.ChatEvent = typebox_1.Type.Union([
    typebox_1.Type.Literal("Empty"),
    typebox_1.Type.Object({
        Message: exports.Message,
    }),
    typebox_1.Type.Object({
        GroupChatCreated: exports.GroupCreated,
    }),
    typebox_1.Type.Object({
        DirectChatCreated: exports.DirectChatCreated,
    }),
    typebox_1.Type.Object({
        GroupNameChanged: exports.GroupNameChanged,
    }),
    typebox_1.Type.Object({
        GroupDescriptionChanged: exports.GroupDescriptionChanged,
    }),
    typebox_1.Type.Object({
        GroupRulesChanged: exports.GroupRulesChanged,
    }),
    typebox_1.Type.Object({
        AvatarChanged: exports.AvatarChanged,
    }),
    typebox_1.Type.Object({
        ParticipantsAdded: exports.MembersAdded,
    }),
    typebox_1.Type.Object({
        ParticipantsRemoved: exports.MembersRemoved,
    }),
    typebox_1.Type.Object({
        ParticipantJoined: exports.MemberJoined,
    }),
    typebox_1.Type.Object({
        ParticipantLeft: exports.MemberLeft,
    }),
    typebox_1.Type.Object({
        RoleChanged: exports.RoleChanged,
    }),
    typebox_1.Type.Object({
        UsersBlocked: exports.UsersBlocked,
    }),
    typebox_1.Type.Object({
        UsersUnblocked: exports.UsersUnblocked,
    }),
    typebox_1.Type.Object({
        MessagePinned: exports.MessagePinned,
    }),
    typebox_1.Type.Object({
        MessageUnpinned: exports.MessageUnpinned,
    }),
    typebox_1.Type.Object({
        PermissionsChanged: exports.PermissionsChanged,
    }),
    typebox_1.Type.Object({
        GroupVisibilityChanged: exports.GroupVisibilityChanged,
    }),
    typebox_1.Type.Object({
        GroupInviteCodeChanged: exports.GroupInviteCodeChanged,
    }),
    typebox_1.Type.Object({
        ChatFrozen: exports.GroupFrozen,
    }),
    typebox_1.Type.Object({
        ChatUnfrozen: exports.GroupUnfrozen,
    }),
    typebox_1.Type.Object({
        EventsTimeToLiveUpdated: exports.EventsTimeToLiveUpdated,
    }),
    typebox_1.Type.Object({
        GroupGateUpdated: exports.GroupGateUpdated,
    }),
    typebox_1.Type.Object({
        UsersInvited: exports.UsersInvited,
    }),
    typebox_1.Type.Object({
        MembersAddedToDefaultChannel: exports.MembersAddedToDefaultChannel,
    }),
    typebox_1.Type.Object({
        ExternalUrlUpdated: exports.ExternalUrlUpdated,
    }),
    typebox_1.Type.Literal("FailedToDeserialize"),
]);
exports.CommunityCanisterChannelSummaryUpdates = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    last_updated: typebox_1.Type.BigInt(),
    name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    description: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    subtype: exports.OptionUpdateGroupSubtype,
    avatar_id: exports.OptionUpdateU128,
    is_public: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    messages_visible_to_non_members: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    latest_message: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventWrapperMessage, typebox_1.Type.Undefined()])),
    latest_message_sender_display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    latest_event_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventIndex, typebox_1.Type.Undefined()])),
    latest_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    member_count: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Number(), typebox_1.Type.Undefined()])),
    permissions_v2: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissions, typebox_1.Type.Undefined()])),
    updated_events: typebox_1.Type.Array(typebox_1.Type.Tuple([typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Null()]), exports.EventIndex, typebox_1.Type.BigInt()])),
    metrics: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChatMetrics, typebox_1.Type.Undefined()])),
    date_last_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    events_ttl: exports.OptionUpdateU64,
    events_ttl_last_updated: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    gate: exports.OptionUpdateAccessGate,
    gate_config: exports.OptionUpdateAccessGateConfig,
    membership: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupMembershipUpdates, typebox_1.Type.Undefined()])),
    video_call_in_progress: exports.OptionUpdateVideoCall,
    external_url: exports.OptionUpdateString,
});
exports.GroupIndexExploreCommunitiesSuccessResult = typebox_1.Type.Object({
    matches: typebox_1.Type.Array(exports.CommunityMatch),
    total: typebox_1.Type.Number(),
});
exports.GroupIndexExploreCommunitiesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupIndexExploreCommunitiesSuccessResult,
    }),
    typebox_1.Type.Object({
        TermTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TermTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("InvalidTerm"),
    typebox_1.Type.Literal("InvalidFlags"),
]);
exports.CommunityUndeleteMessagesSuccessResult = typebox_1.Type.Object({
    messages: typebox_1.Type.Array(exports.Message),
});
exports.CommunityUndeleteMessagesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityUndeleteMessagesSuccessResult,
    }),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("GroupNotFound"),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("UserLapsed"),
]);
exports.CommunityExploreChannelsSuccessResult = typebox_1.Type.Object({
    matches: typebox_1.Type.Array(exports.ChannelMatch),
    total: typebox_1.Type.Number(),
});
exports.CommunityExploreChannelsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityExploreChannelsSuccessResult,
    }),
    typebox_1.Type.Object({
        TermTooShort: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Object({
        TermTooLong: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("InvalidTerm"),
    typebox_1.Type.Literal("PrivateCommunity"),
]);
exports.GroupDeletedMessageResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupDeletedMessageSuccessResult,
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("NotAuthorized"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("MessageHardDeleted"),
]);
exports.GroupUndeleteMessagesSuccessResult = typebox_1.Type.Object({
    messages: typebox_1.Type.Array(exports.Message),
});
exports.GroupUndeleteMessagesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupUndeleteMessagesSuccessResult,
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("MessageNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Literal("ChatFrozen"),
]);
exports.UserUndeleteMessagesSuccessResult = typebox_1.Type.Object({
    messages: typebox_1.Type.Array(exports.Message),
});
exports.UserUndeleteMessagesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserUndeleteMessagesSuccessResult,
    }),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
]);
exports.DirectChatSummary = typebox_1.Type.Object({
    them: exports.UserId,
    last_updated: typebox_1.Type.BigInt(),
    latest_message: exports.EventWrapperMessage,
    latest_event_index: exports.EventIndex,
    latest_message_index: exports.MessageIndex,
    date_created: typebox_1.Type.BigInt(),
    read_by_me_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    read_by_them_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    notifications_muted: typebox_1.Type.Boolean(),
    metrics: exports.ChatMetrics,
    my_metrics: exports.ChatMetrics,
    archived: typebox_1.Type.Boolean(),
    events_ttl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    events_ttl_last_updated: typebox_1.Type.BigInt(),
    video_call_in_progress: typebox_1.Type.Optional(typebox_1.Type.Union([exports.VideoCall, typebox_1.Type.Undefined()])),
});
exports.MessagesResponse = typebox_1.Type.Object({
    messages: typebox_1.Type.Array(exports.EventWrapperMessage),
    latest_event_index: exports.EventIndex,
    chat_last_updated: typebox_1.Type.BigInt(),
});
exports.GroupCanisterGroupChatSummary = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    local_user_index_canister_id: exports.TSBytes,
    last_updated: typebox_1.Type.BigInt(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    subtype: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupSubtype, typebox_1.Type.Undefined()])),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    is_public: typebox_1.Type.Boolean(),
    history_visible_to_new_joiners: typebox_1.Type.Boolean(),
    messages_visible_to_non_members: typebox_1.Type.Boolean(),
    min_visible_event_index: exports.EventIndex,
    min_visible_message_index: exports.MessageIndex,
    latest_message: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventWrapperMessage, typebox_1.Type.Undefined()])),
    latest_event_index: exports.EventIndex,
    latest_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    joined: typebox_1.Type.BigInt(),
    participant_count: typebox_1.Type.Number(),
    role: exports.GroupRole,
    mentions: typebox_1.Type.Array(exports.HydratedMention),
    wasm_version: exports.BuildVersion,
    permissions_v2: exports.GroupPermissions,
    notifications_muted: typebox_1.Type.Boolean(),
    metrics: exports.ChatMetrics,
    my_metrics: exports.ChatMetrics,
    latest_threads: typebox_1.Type.Array(exports.GroupCanisterThreadDetails),
    frozen: typebox_1.Type.Optional(typebox_1.Type.Union([exports.FrozenGroupInfo, typebox_1.Type.Undefined()])),
    date_last_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    events_ttl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    events_ttl_last_updated: typebox_1.Type.BigInt(),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
    rules_accepted: typebox_1.Type.Boolean(),
    membership: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupMembership, typebox_1.Type.Undefined()])),
    video_call_in_progress: typebox_1.Type.Optional(typebox_1.Type.Union([exports.VideoCall, typebox_1.Type.Undefined()])),
});
exports.EventWrapperChatEvent = typebox_1.Type.Object({
    index: exports.EventIndex,
    timestamp: typebox_1.Type.BigInt(),
    correlation_id: typebox_1.Type.BigInt(),
    expires_at: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    event: exports.ChatEvent,
});
exports.ThreadPreview = typebox_1.Type.Object({
    root_message: exports.EventWrapperMessage,
    latest_replies: typebox_1.Type.Array(exports.EventWrapperMessage),
    total_replies: typebox_1.Type.Number(),
});
exports.GroupCanisterGroupChatSummaryUpdates = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    last_updated: typebox_1.Type.BigInt(),
    name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    description: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    subtype: exports.OptionUpdateGroupSubtype,
    avatar_id: exports.OptionUpdateU128,
    latest_message: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventWrapperMessage, typebox_1.Type.Undefined()])),
    latest_event_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventIndex, typebox_1.Type.Undefined()])),
    latest_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    participant_count: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Number(), typebox_1.Type.Undefined()])),
    role: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupRole, typebox_1.Type.Undefined()])),
    mentions: typebox_1.Type.Array(exports.HydratedMention),
    wasm_version: typebox_1.Type.Optional(typebox_1.Type.Union([exports.BuildVersion, typebox_1.Type.Undefined()])),
    permissions_v2: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupPermissions, typebox_1.Type.Undefined()])),
    updated_events: typebox_1.Type.Array(typebox_1.Type.Tuple([typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Null()]), exports.EventIndex, typebox_1.Type.BigInt()])),
    metrics: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChatMetrics, typebox_1.Type.Undefined()])),
    my_metrics: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChatMetrics, typebox_1.Type.Undefined()])),
    is_public: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    messages_visible_to_non_members: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    latest_threads: typebox_1.Type.Array(exports.GroupCanisterThreadDetails),
    unfollowed_threads: typebox_1.Type.Array(exports.MessageIndex),
    notifications_muted: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    frozen: exports.OptionUpdateFrozenGroupInfo,
    date_last_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    events_ttl: exports.OptionUpdateU64,
    events_ttl_last_updated: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    gate: exports.OptionUpdateAccessGate,
    gate_config: exports.OptionUpdateAccessGateConfig,
    rules_accepted: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    membership: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupMembershipUpdates, typebox_1.Type.Undefined()])),
    video_call_in_progress: exports.OptionUpdateVideoCall,
});
exports.DirectChatSummaryUpdates = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    last_updated: typebox_1.Type.BigInt(),
    latest_message: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventWrapperMessage, typebox_1.Type.Undefined()])),
    latest_event_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventIndex, typebox_1.Type.Undefined()])),
    latest_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    read_by_me_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    read_by_them_up_to: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    notifications_muted: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    updated_events: typebox_1.Type.Array(typebox_1.Type.Tuple([exports.EventIndex, typebox_1.Type.BigInt()])),
    metrics: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChatMetrics, typebox_1.Type.Undefined()])),
    my_metrics: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChatMetrics, typebox_1.Type.Undefined()])),
    archived: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    events_ttl: exports.OptionUpdateU64,
    events_ttl_last_updated: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    video_call_in_progress: exports.OptionUpdateVideoCall,
});
exports.PublicGroupSummary = typebox_1.Type.Object({
    chat_id: exports.ChatId,
    local_user_index_canister_id: exports.TSBytes,
    last_updated: typebox_1.Type.BigInt(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    subtype: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupSubtype, typebox_1.Type.Undefined()])),
    history_visible_to_new_joiners: typebox_1.Type.Boolean(),
    messages_visible_to_non_members: typebox_1.Type.Boolean(),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    latest_message: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventWrapperMessage, typebox_1.Type.Undefined()])),
    latest_event_index: exports.EventIndex,
    latest_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    participant_count: typebox_1.Type.Number(),
    wasm_version: exports.BuildVersion,
    is_public: typebox_1.Type.Boolean(),
    frozen: typebox_1.Type.Optional(typebox_1.Type.Union([exports.FrozenGroupInfo, typebox_1.Type.Undefined()])),
    events_ttl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    events_ttl_last_updated: typebox_1.Type.BigInt(),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
});
exports.CommunityCanisterChannelSummary = typebox_1.Type.Object({
    channel_id: exports.ChannelId,
    last_updated: typebox_1.Type.BigInt(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    subtype: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupSubtype, typebox_1.Type.Undefined()])),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    is_public: typebox_1.Type.Boolean(),
    history_visible_to_new_joiners: typebox_1.Type.Boolean(),
    messages_visible_to_non_members: typebox_1.Type.Boolean(),
    min_visible_event_index: exports.EventIndex,
    min_visible_message_index: exports.MessageIndex,
    latest_message: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventWrapperMessage, typebox_1.Type.Undefined()])),
    latest_message_sender_display_name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    latest_event_index: exports.EventIndex,
    latest_message_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.MessageIndex, typebox_1.Type.Undefined()])),
    member_count: typebox_1.Type.Number(),
    permissions_v2: exports.GroupPermissions,
    metrics: exports.ChatMetrics,
    date_last_pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    events_ttl: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    events_ttl_last_updated: typebox_1.Type.BigInt(),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
    membership: typebox_1.Type.Optional(typebox_1.Type.Union([exports.GroupMembership, typebox_1.Type.Undefined()])),
    video_call_in_progress: typebox_1.Type.Optional(typebox_1.Type.Union([exports.VideoCall, typebox_1.Type.Undefined()])),
    is_invited: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    external_url: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
});
exports.GroupIndexRecommendedGroupsSuccessResult = typebox_1.Type.Object({
    groups: typebox_1.Type.Array(exports.PublicGroupSummary),
});
exports.GroupIndexRecommendedGroupsResponse = typebox_1.Type.Object({
    Success: exports.GroupIndexRecommendedGroupsSuccessResult,
});
exports.LocalUserIndexJoinGroupResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupCanisterGroupChatSummary,
    }),
    typebox_1.Type.Literal("AlreadyInGroup"),
    typebox_1.Type.Object({
        AlreadyInGroupV2: exports.GroupCanisterGroupChatSummary,
    }),
    typebox_1.Type.Object({
        GateCheckFailed: exports.GateCheckFailedReason,
    }),
    typebox_1.Type.Literal("GroupNotFound"),
    typebox_1.Type.Literal("GroupNotPublic"),
    typebox_1.Type.Literal("NotInvited"),
    typebox_1.Type.Object({
        ParticipantLimitReached: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("Blocked"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("ChatFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.CommunityChannelSummaryUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        SuccessAdded: exports.CommunityCanisterChannelSummary,
    }),
    typebox_1.Type.Object({
        SuccessUpdated: exports.CommunityCanisterChannelSummaryUpdates,
    }),
    typebox_1.Type.Literal("SuccessNoUpdates"),
    typebox_1.Type.Literal("PrivateCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("PrivateChannel"),
]);
exports.CommunityChannelSummaryResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityCanisterChannelSummary,
    }),
    typebox_1.Type.Literal("PrivateCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("PrivateChannel"),
]);
exports.CommunityMessagesByMessageIndexResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.MessagesResponse,
    }),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("ThreadNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Object({
        ReplicaNotUpToDateV2: typebox_1.Type.BigInt(),
    }),
]);
exports.CommunityThreadPreviewsSuccessResult = typebox_1.Type.Object({
    threads: typebox_1.Type.Array(exports.ThreadPreview),
    timestamp: typebox_1.Type.BigInt(),
});
exports.CommunityThreadPreviewsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityThreadPreviewsSuccessResult,
    }),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Object({
        ReplicaNotUpToDate: typebox_1.Type.BigInt(),
    }),
]);
exports.GroupSummaryUpdatesSuccessResult = typebox_1.Type.Object({
    updates: exports.GroupCanisterGroupChatSummaryUpdates,
});
exports.GroupSummaryUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupSummaryUpdatesSuccessResult,
    }),
    typebox_1.Type.Literal("SuccessNoUpdates"),
    typebox_1.Type.Literal("CallerNotInGroup"),
]);
exports.GroupMessagesByMessageIndexResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.MessagesResponse,
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("ThreadMessageNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Object({
        ReplicaNotUpToDateV2: typebox_1.Type.BigInt(),
    }),
]);
exports.GroupPublicSummarySuccessResult = typebox_1.Type.Object({
    summary: exports.PublicGroupSummary,
    is_invited: typebox_1.Type.Boolean(),
});
exports.GroupPublicSummaryResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupPublicSummarySuccessResult,
    }),
    typebox_1.Type.Literal("NotAuthorized"),
]);
exports.GroupThreadPreviewsSuccessResult = typebox_1.Type.Object({
    threads: typebox_1.Type.Array(exports.ThreadPreview),
    timestamp: typebox_1.Type.BigInt(),
});
exports.GroupSummarySuccessResult = typebox_1.Type.Object({
    summary: exports.GroupCanisterGroupChatSummary,
});
exports.GroupSummaryResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupSummarySuccessResult,
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
]);
exports.UserInitialStateDirectChatsInitial = typebox_1.Type.Object({
    summaries: typebox_1.Type.Array(exports.DirectChatSummary),
    pinned: typebox_1.Type.Array(exports.ChatId),
});
exports.UserUpdatesDirectChatsUpdates = typebox_1.Type.Object({
    added: typebox_1.Type.Array(exports.DirectChatSummary),
    updated: typebox_1.Type.Array(exports.DirectChatSummaryUpdates),
    removed: typebox_1.Type.Array(exports.ChatId),
    pinned: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.ChatId), typebox_1.Type.Undefined()])),
});
exports.UserMessagesByMessageIndexResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.MessagesResponse,
    }),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("ThreadMessageNotFound"),
    typebox_1.Type.Object({
        ReplicaNotUpToDateV2: typebox_1.Type.BigInt(),
    }),
]);
exports.EventsResponse = typebox_1.Type.Object({
    events: typebox_1.Type.Array(exports.EventWrapperChatEvent),
    expired_event_ranges: typebox_1.Type.Array(typebox_1.Type.Tuple([exports.EventIndex, exports.EventIndex])),
    expired_message_ranges: typebox_1.Type.Array(typebox_1.Type.Tuple([exports.MessageIndex, exports.MessageIndex])),
    latest_event_index: exports.EventIndex,
    chat_last_updated: typebox_1.Type.BigInt(),
});
exports.CommunityCanisterCommunitySummary = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    local_user_index_canister_id: exports.TSBytes,
    last_updated: typebox_1.Type.BigInt(),
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    banner_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    is_public: typebox_1.Type.Boolean(),
    member_count: typebox_1.Type.Number(),
    permissions: exports.CommunityPermissions,
    frozen: typebox_1.Type.Optional(typebox_1.Type.Union([exports.FrozenGroupInfo, typebox_1.Type.Undefined()])),
    gate: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGate, typebox_1.Type.Undefined()])),
    gate_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.AccessGateConfig, typebox_1.Type.Undefined()])),
    primary_language: typebox_1.Type.String(),
    latest_event_index: exports.EventIndex,
    channels: typebox_1.Type.Array(exports.CommunityCanisterChannelSummary),
    membership: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityMembership, typebox_1.Type.Undefined()])),
    user_groups: typebox_1.Type.Array(exports.UserGroupSummary),
    is_invited: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    metrics: exports.ChatMetrics,
});
exports.CommunityCanisterCommunitySummaryUpdates = typebox_1.Type.Object({
    community_id: exports.CommunityId,
    last_updated: typebox_1.Type.BigInt(),
    name: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    description: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    avatar_id: exports.OptionUpdateU128,
    banner_id: exports.OptionUpdateU128,
    is_public: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    member_count: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Number(), typebox_1.Type.Undefined()])),
    permissions: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityPermissions, typebox_1.Type.Undefined()])),
    frozen: exports.OptionUpdateFrozenGroupInfo,
    gate: exports.OptionUpdateAccessGate,
    gate_config: exports.OptionUpdateAccessGateConfig,
    primary_language: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    latest_event_index: typebox_1.Type.Optional(typebox_1.Type.Union([exports.EventIndex, typebox_1.Type.Undefined()])),
    channels_added: typebox_1.Type.Array(exports.CommunityCanisterChannelSummary),
    channels_updated: typebox_1.Type.Array(exports.CommunityCanisterChannelSummaryUpdates),
    channels_removed: typebox_1.Type.Array(exports.ChannelId),
    membership: typebox_1.Type.Optional(typebox_1.Type.Union([exports.CommunityMembershipUpdates, typebox_1.Type.Undefined()])),
    user_groups: typebox_1.Type.Array(exports.UserGroupSummary),
    user_groups_deleted: typebox_1.Type.Array(typebox_1.Type.Number()),
    metrics: typebox_1.Type.Optional(typebox_1.Type.Union([exports.ChatMetrics, typebox_1.Type.Undefined()])),
});
exports.LocalUserIndexChatEventsEventsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.EventsResponse,
    }),
    typebox_1.Type.Literal("NotFound"),
    typebox_1.Type.Object({
        ReplicaNotUpToDate: typebox_1.Type.BigInt(),
    }),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexChatEventsSuccessResult = typebox_1.Type.Object({
    responses: typebox_1.Type.Array(exports.LocalUserIndexChatEventsEventsResponse),
    timestamp: typebox_1.Type.BigInt(),
});
exports.LocalUserIndexChatEventsResponse = typebox_1.Type.Object({
    Success: exports.LocalUserIndexChatEventsSuccessResult,
});
exports.LocalUserIndexJoinCommunityResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityCanisterCommunitySummary,
    }),
    typebox_1.Type.Object({
        AlreadyInCommunity: exports.CommunityCanisterCommunitySummary,
    }),
    typebox_1.Type.Object({
        GateCheckFailed: exports.GateCheckFailedReason,
    }),
    typebox_1.Type.Literal("CommunityNotFound"),
    typebox_1.Type.Literal("CommunityNotPublic"),
    typebox_1.Type.Literal("NotInvited"),
    typebox_1.Type.Object({
        MemberLimitReached: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("UserBlocked"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexJoinChannelResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityCanisterChannelSummary,
    }),
    typebox_1.Type.Object({
        SuccessJoinedCommunity: exports.CommunityCanisterCommunitySummary,
    }),
    typebox_1.Type.Object({
        AlreadyInChannel: exports.CommunityCanisterChannelSummary,
    }),
    typebox_1.Type.Object({
        GateCheckFailed: exports.GateCheckFailedReason,
    }),
    typebox_1.Type.Literal("CommunityNotFound"),
    typebox_1.Type.Literal("CommunityNotPublic"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Object({
        MemberLimitReached: typebox_1.Type.Number(),
    }),
    typebox_1.Type.Literal("UserBlocked"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("CommunityFrozen"),
    typebox_1.Type.Literal("NotInvited"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexGroupAndCommunitySummaryUpdatesSummaryUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        SuccessGroup: exports.GroupCanisterGroupChatSummary,
    }),
    typebox_1.Type.Object({
        SuccessCommunity: exports.CommunityCanisterCommunitySummary,
    }),
    typebox_1.Type.Object({
        SuccessGroupUpdates: exports.GroupCanisterGroupChatSummaryUpdates,
    }),
    typebox_1.Type.Object({
        SuccessCommunityUpdates: exports.CommunityCanisterCommunitySummaryUpdates,
    }),
    typebox_1.Type.Literal("SuccessNoUpdates"),
    typebox_1.Type.Literal("NotFound"),
    typebox_1.Type.Object({
        InternalError: typebox_1.Type.String(),
    }),
]);
exports.LocalUserIndexGroupAndCommunitySummaryUpdatesResponse = typebox_1.Type.Object({
    Success: typebox_1.Type.Array(exports.LocalUserIndexGroupAndCommunitySummaryUpdatesSummaryUpdatesResponse),
});
exports.CommunitySummaryUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityCanisterCommunitySummaryUpdates,
    }),
    typebox_1.Type.Literal("SuccessNoUpdates"),
    typebox_1.Type.Literal("PrivateCommunity"),
]);
exports.CommunityEventsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.EventsResponse,
    }),
    typebox_1.Type.Literal("UserNotInCommunity"),
    typebox_1.Type.Literal("UserNotInChannel"),
    typebox_1.Type.Literal("ChannelNotFound"),
    typebox_1.Type.Literal("ThreadNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Object({
        ReplicaNotUpToDateV2: typebox_1.Type.BigInt(),
    }),
]);
exports.CommunitySummaryResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.CommunityCanisterCommunitySummary,
    }),
    typebox_1.Type.Literal("PrivateCommunity"),
]);
exports.GroupThreadPreviewsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.GroupThreadPreviewsSuccessResult,
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Object({
        ReplicaNotUpToDate: typebox_1.Type.BigInt(),
    }),
]);
exports.GroupEventsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.EventsResponse,
    }),
    typebox_1.Type.Literal("CallerNotInGroup"),
    typebox_1.Type.Literal("ThreadMessageNotFound"),
    typebox_1.Type.Literal("UserSuspended"),
    typebox_1.Type.Literal("UserLapsed"),
    typebox_1.Type.Object({
        ReplicaNotUpToDateV2: typebox_1.Type.BigInt(),
    }),
]);
exports.UserEventsResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.EventsResponse,
    }),
    typebox_1.Type.Literal("ChatNotFound"),
    typebox_1.Type.Literal("ThreadMessageNotFound"),
    typebox_1.Type.Object({
        ReplicaNotUpToDateV2: typebox_1.Type.BigInt(),
    }),
]);
exports.UserInitialStateSuccessResult = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    direct_chats: exports.UserInitialStateDirectChatsInitial,
    group_chats: exports.UserInitialStateGroupChatsInitial,
    favourite_chats: exports.UserInitialStateFavouriteChatsInitial,
    communities: exports.UserInitialStateCommunitiesInitial,
    avatar_id: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    blocked_users: typebox_1.Type.Array(exports.UserId),
    suspended: typebox_1.Type.Boolean(),
    pin_number_settings: typebox_1.Type.Optional(typebox_1.Type.Union([exports.PinNumberSettings, typebox_1.Type.Undefined()])),
    local_user_index_canister_id: exports.TSBytes,
    achievements: typebox_1.Type.Array(exports.ChitEarned),
    achievements_last_seen: typebox_1.Type.BigInt(),
    total_chit_earned: typebox_1.Type.Number(),
    chit_balance: typebox_1.Type.Number(),
    streak: typebox_1.Type.Number(),
    streak_ends: typebox_1.Type.BigInt(),
    next_daily_claim: typebox_1.Type.BigInt(),
    is_unique_person: typebox_1.Type.Boolean(),
    wallet_config: exports.UserWalletConfig,
    referrals: typebox_1.Type.Array(exports.UserReferral),
    message_activity_summary: exports.UserMessageActivitySummary,
});
exports.UserInitialStateResponse = typebox_1.Type.Object({
    Success: exports.UserInitialStateSuccessResult,
});
exports.UserUpdatesSuccessResult = typebox_1.Type.Object({
    timestamp: typebox_1.Type.BigInt(),
    username: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Undefined()])),
    display_name: exports.OptionUpdateString,
    direct_chats: exports.UserUpdatesDirectChatsUpdates,
    group_chats: exports.UserUpdatesGroupChatsUpdates,
    favourite_chats: exports.UserUpdatesFavouriteChatsUpdates,
    communities: exports.UserUpdatesCommunitiesUpdates,
    avatar_id: exports.OptionUpdateU128,
    blocked_users: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Array(exports.UserId), typebox_1.Type.Undefined()])),
    suspended: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    pin_number_settings: exports.OptionUpdatePinNumberSettings,
    achievements: typebox_1.Type.Array(exports.ChitEarned),
    achievements_last_seen: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.BigInt(), typebox_1.Type.Undefined()])),
    total_chit_earned: typebox_1.Type.Number(),
    chit_balance: typebox_1.Type.Number(),
    streak: typebox_1.Type.Number(),
    streak_ends: typebox_1.Type.BigInt(),
    next_daily_claim: typebox_1.Type.BigInt(),
    is_unique_person: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Boolean(), typebox_1.Type.Undefined()])),
    wallet_config: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserWalletConfig, typebox_1.Type.Undefined()])),
    referrals: typebox_1.Type.Array(exports.UserReferral),
    message_activity_summary: typebox_1.Type.Optional(typebox_1.Type.Union([exports.UserMessageActivitySummary, typebox_1.Type.Undefined()])),
});
exports.UserUpdatesResponse = typebox_1.Type.Union([
    typebox_1.Type.Object({
        Success: exports.UserUpdatesSuccessResult,
    }),
    typebox_1.Type.Literal("SuccessNoUpdates"),
]);
