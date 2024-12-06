"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalUserIndexClient = void 0;
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const chatMappersV2_1 = require("../common/chatMappersV2");
const openchat_shared_1 = require("openchat-shared");
const mapping_1 = require("../../utils/mapping");
const caching_1 = require("../../utils/caching");
const typebox_1 = require("../../typebox");
class LocalUserIndexClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId, db) {
        super(identity, agent, canisterId);
        this.db = db;
    }
    groupAndCommunitySummaryUpdates(requests) {
        const args = {
            requests: requests.map((r) => ({
                canister_id: (0, mapping_1.principalStringToBytes)(r.canisterId),
                is_community: r.isCommunity,
                invite_code: r.inviteCode,
                updates_since: r.updatesSince,
            })),
        };
        return this.executeMsgpackQuery("group_and_community_summary_updates", args, mappers_1.groupAndCommunitySummaryUpdates, typebox_1.LocalUserIndexGroupAndCommunitySummaryUpdatesArgs, typebox_1.LocalUserIndexGroupAndCommunitySummaryUpdatesResponse);
    }
    async chatEvents(requests, cachePrimer = false) {
        const responses = [];
        const partialCachedResults = [];
        const requestsToBackend = [];
        for (let i = 0; i < requests.length; i++) {
            const request = requests[i];
            const [cached, missing] = await this.getEventsFromCache(request.context, request.args);
            if (missing.size === 0) {
                responses[i] = {
                    kind: "success",
                    result: cached,
                };
                if (cachePrimer && request.latestKnownUpdate !== undefined) {
                    (0, caching_1.setCachePrimerTimestamp)(this.db, request.context.chatId, request.latestKnownUpdate);
                }
            }
            else if (missing.size > openchat_shared_1.MAX_MISSING) {
                requestsToBackend.push(request);
            }
            else {
                partialCachedResults[i] = cached.events;
                requestsToBackend.push({
                    context: request.context,
                    args: {
                        kind: "by_index",
                        events: [...missing],
                    },
                    latestKnownUpdate: request.latestKnownUpdate,
                });
            }
        }
        if (requestsToBackend.length > 0) {
            const batchResponse = await this.getChatEventsFromBackend(requestsToBackend);
            for (let i = 0; i < batchResponse.responses.length; i++) {
                const request = requestsToBackend[i];
                const response = batchResponse.responses[i];
                if (response.kind === "success") {
                    (0, caching_1.setCachedEvents)(this.db, request.context.chatId, response.result, request.context.threadRootMessageIndex);
                    if (cachePrimer) {
                        (0, caching_1.setCachePrimerTimestamp)(this.db, request.context.chatId, batchResponse.timestamp);
                    }
                }
                for (let j = i; j <= responses.length; j++) {
                    if (responses[j] === undefined) {
                        if (response.kind === "success") {
                            const fromCache = partialCachedResults[j];
                            if (fromCache !== undefined) {
                                response.result.events = [
                                    ...response.result.events,
                                    ...fromCache,
                                ].sort((a, b) => a.index - b.index);
                            }
                        }
                        responses[j] = response;
                        break;
                    }
                }
            }
        }
        return responses;
    }
    async getEventsFromCache(context, args) {
        if (args.kind === "page") {
            return await (0, caching_1.getCachedEvents)(this.db, args.eventIndexRange, context, args.startIndex, args.ascending, undefined, undefined, 1);
        }
        if (args.kind === "window") {
            const [cached, missing, _] = await (0, caching_1.getCachedEventsWindowByMessageIndex)(this.db, args.eventIndexRange, context, args.midPoint, undefined, undefined, 1);
            return [cached, missing];
        }
        if (args.kind === "by_index") {
            return await (0, caching_1.getCachedEventsByIndex)(this.db, args.events, context);
        }
        throw new openchat_shared_1.UnsupportedValueError("Unexpected ChatEventsArgs type", args);
    }
    getChatEventsFromBackend(requests) {
        const args = {
            requests: requests.map(mappers_1.chatEventsArgs),
        };
        return this.executeMsgpackQuery("chat_events", args, (resp) => (0, mappers_1.chatEventsBatchResponse)(this.principal, requests, resp), typebox_1.LocalUserIndexChatEventsArgs, typebox_1.LocalUserIndexChatEventsResponse);
    }
    registerUser(username, referralCode) {
        return this.executeMsgpackUpdate("register_user", {
            username,
            referral_code: referralCode,
            public_key: new Uint8Array(this.identity.getPublicKey().toDer()),
        }, mappers_1.registerUserResponse, typebox_1.LocalUserIndexRegisterUserArgs, typebox_1.LocalUserIndexRegisterUserResponse);
    }
    joinCommunity(communityId, inviteCode, credentialArgs, referredBy) {
        return this.executeMsgpackUpdate("join_community", {
            community_id: (0, mapping_1.principalStringToBytes)(communityId),
            invite_code: (0, mapping_1.mapOptional)(inviteCode, openchat_shared_1.textToCode),
            verified_credential_args: (0, mapping_1.mapOptional)(credentialArgs, mappers_1.apiVerifiedCredentialArgs),
            referred_by: (0, mapping_1.maybePrincipalStringToBytes)(referredBy),
        }, mappers_1.joinCommunityResponse, typebox_1.LocalUserIndexJoinCommunityArgs, typebox_1.LocalUserIndexJoinCommunityResponse);
    }
    joinGroup(chatId, inviteCode, credentialArgs) {
        return this.executeMsgpackUpdate("join_group", {
            chat_id: (0, mapping_1.principalStringToBytes)(chatId),
            invite_code: (0, mapping_1.mapOptional)(inviteCode, openchat_shared_1.textToCode),
            verified_credential_args: (0, mapping_1.mapOptional)(credentialArgs, mappers_1.apiVerifiedCredentialArgs),
            correlation_id: BigInt(0),
        }, chatMappersV2_1.joinGroupResponse, typebox_1.LocalUserIndexJoinGroupArgs, typebox_1.LocalUserIndexJoinGroupResponse);
    }
    joinChannel(id, inviteCode, credentialArgs, referredBy) {
        return this.executeMsgpackUpdate("join_channel", {
            community_id: (0, mapping_1.principalStringToBytes)(id.communityId),
            channel_id: BigInt(id.channelId),
            invite_code: (0, mapping_1.mapOptional)(inviteCode, openchat_shared_1.textToCode),
            verified_credential_args: (0, mapping_1.mapOptional)(credentialArgs, mappers_1.apiVerifiedCredentialArgs),
            referred_by: (0, mapping_1.maybePrincipalStringToBytes)(referredBy),
        }, (resp) => {
            return (0, mappers_1.joinChannelResponse)(resp, id.communityId);
        }, typebox_1.LocalUserIndexJoinChannelArgs, typebox_1.LocalUserIndexJoinChannelResponse);
    }
    inviteUsersToCommunity(communityId, userIds, callerUsername) {
        return this.executeMsgpackUpdate("invite_users_to_community", {
            community_id: (0, mapping_1.principalStringToBytes)(communityId),
            user_ids: userIds.map(mapping_1.principalStringToBytes),
            caller_username: callerUsername,
        }, mappers_1.inviteUsersResponse, typebox_1.LocalUserIndexInviteUsersToCommunityArgs, typebox_1.LocalUserIndexInviteUsersToCommunityResponse);
    }
    inviteUsersToGroup(chatId, userIds, callerUsername) {
        return this.executeMsgpackUpdate("invite_users_to_group", {
            group_id: (0, mapping_1.principalStringToBytes)(chatId),
            user_ids: userIds.map(mapping_1.principalStringToBytes),
            caller_username: callerUsername,
            correlation_id: BigInt(0),
        }, mappers_1.inviteUsersResponse, typebox_1.LocalUserIndexInviteUsersToGroupArgs, typebox_1.LocalUserIndexInviteUsersToGroupResponse);
    }
    inviteUsersToChannel(communityId, channelId, userIds, callerUsername) {
        return this.executeMsgpackUpdate("invite_users_to_channel", {
            community_id: (0, mapping_1.principalStringToBytes)(communityId),
            channel_id: BigInt(channelId),
            user_ids: userIds.map(mapping_1.principalStringToBytes),
            caller_username: callerUsername,
        }, mappers_1.inviteUsersResponse, typebox_1.LocalUserIndexInviteUsersToChannelArgs, typebox_1.LocalUserIndexInviteUsersToChannelResponse);
    }
    getAccessToken(chatId, accessType) {
        return this.executeMsgpackQuery("access_token", {
            chat: (0, chatMappersV2_1.apiChatIdentifier)(chatId),
            token_type: (0, mappers_1.apiAccessTokenType)(accessType),
        }, mappers_1.accessTokenResponse, typebox_1.LocalUserIndexAccessTokenArgs, typebox_1.LocalUserIndexAccessTokenResponse);
    }
}
exports.LocalUserIndexClient = LocalUserIndexClient;
