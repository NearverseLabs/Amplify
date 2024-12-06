"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiVerifiedCredentialArgs = exports.joinCommunityResponse = exports.inviteUsersResponse = exports.registerUserResponse = exports.joinChannelResponse = exports.chatEventsBatchResponse = exports.chatEventsArgs = exports.groupAndCommunitySummaryUpdates = exports.accessTokenResponse = exports.apiCallType = exports.apiAccessTokenType = void 0;
const openchat_shared_1 = require("openchat-shared");
const mapping_1 = require("../../utils/mapping");
const chatMappersV2_1 = require("../common/chatMappersV2");
const mappersV2_1 = require("../group/mappersV2");
const mappersV2_2 = require("../community/mappersV2");
const replicaUpToDateChecker_1 = require("../common/replicaUpToDateChecker");
function apiAccessTokenType(domain) {
    switch (domain.kind) {
        case "join_video_call":
            return "JoinVideoCall";
        case "start_video_call":
            return {
                StartVideoCallV2: {
                    call_type: apiCallType(domain.callType),
                },
            };
    }
}
exports.apiAccessTokenType = apiAccessTokenType;
function apiCallType(domain) {
    if (domain === "broadcast")
        return "Broadcast";
    if (domain === "default")
        return "Default";
    throw new openchat_shared_1.UnsupportedValueError("Unexpected VideoCallType received", domain);
}
exports.apiCallType = apiCallType;
function accessTokenResponse(value) {
    if (typeof value === "object" && "Success" in value) {
        return value.Success;
    }
    console.warn("Unable to get access token: ", value);
    return undefined;
}
exports.accessTokenResponse = accessTokenResponse;
function groupAndCommunitySummaryUpdates(value) {
    const results = [];
    for (const result of value.Success) {
        if (result === "SuccessNoUpdates") {
            results.push({
                kind: "no_updates",
            });
        }
        else if (result === "NotFound") {
            results.push({
                kind: "not_found",
            });
        }
        else if ("SuccessGroup" in result) {
            results.push({
                kind: "group",
                value: (0, mappersV2_1.groupChatSummary)(result.SuccessGroup),
            });
        }
        else if ("SuccessGroupUpdates" in result) {
            results.push({
                kind: "group_updates",
                value: (0, mappersV2_1.groupChatSummaryUpdates)(result.SuccessGroupUpdates),
            });
        }
        else if ("SuccessCommunity" in result) {
            results.push({
                kind: "community",
                value: (0, chatMappersV2_1.communitySummary)(result.SuccessCommunity),
            });
        }
        else if ("SuccessCommunityUpdates" in result) {
            results.push({
                kind: "community_updates",
                value: (0, mappersV2_2.communitySummaryUpdates)(result.SuccessCommunityUpdates),
            });
        }
        else if ("InternalError" in result) {
            results.push({
                kind: "error",
                error: result.InternalError,
            });
        }
        else {
            throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSummaryUpdatesResponse type received", result);
        }
    }
    return results;
}
exports.groupAndCommunitySummaryUpdates = groupAndCommunitySummaryUpdates;
function chatEventsArgs(eventArgs) {
    return {
        context: eventsContext(eventArgs.context),
        args: eventsArgsInner(eventArgs.args),
        latest_known_update: eventArgs.latestKnownUpdate,
    };
}
exports.chatEventsArgs = chatEventsArgs;
function eventsContext(context) {
    switch (context.chatId.kind) {
        case "direct_chat":
            return {
                Direct: (0, mapping_1.principalStringToBytes)(context.chatId.userId),
            };
        case "group_chat":
            return {
                Group: [
                    (0, mapping_1.principalStringToBytes)(context.chatId.groupId),
                    context.threadRootMessageIndex ?? null,
                ],
            };
        case "channel":
            return {
                Channel: [
                    (0, mapping_1.principalStringToBytes)(context.chatId.communityId),
                    BigInt(context.chatId.channelId),
                    context.threadRootMessageIndex ?? null,
                ],
            };
    }
}
function eventsArgsInner(args) {
    switch (args.kind) {
        case "page":
            return {
                Page: {
                    max_messages: openchat_shared_1.MAX_MESSAGES,
                    max_events: openchat_shared_1.MAX_EVENTS,
                    ascending: args.ascending,
                    start_index: args.startIndex,
                },
            };
        case "by_index":
            return {
                ByIndex: {
                    events: args.events,
                },
            };
        case "window": {
            return {
                Window: {
                    mid_point: args.midPoint,
                    max_messages: openchat_shared_1.MAX_MESSAGES,
                    max_events: openchat_shared_1.MAX_EVENTS,
                },
            };
        }
    }
}
async function chatEventsBatchResponse(principal, requests, value) {
    const responses = [];
    for (let i = 0; i < requests.length; i++) {
        const response = value.Success.responses[i];
        const args = requests[i];
        if (response === "NotFound") {
            responses.push({
                kind: "not_found",
            });
        }
        else if ("Success" in response) {
            const error = await (0, replicaUpToDateChecker_1.ensureReplicaIsUpToDate)(principal, args.context.chatId, response.Success.chat_last_updated, true);
            responses.push(error ?? {
                kind: "success",
                result: (0, chatMappersV2_1.eventsSuccessResponse)(response.Success),
            });
        }
        else if ("ReplicaNotUpToDate" in response) {
            responses.push({
                kind: "replica_not_up_to_date",
                replicaTimestamp: response.ReplicaNotUpToDate,
                clientTimestamp: args.latestKnownUpdate ?? BigInt(-1),
            });
        }
        else {
            responses.push({
                kind: "internal_error",
                error: response.InternalError,
            });
        }
    }
    return {
        responses,
        timestamp: value.Success.timestamp,
    };
}
exports.chatEventsBatchResponse = chatEventsBatchResponse;
function joinChannelResponse(value, communityId) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return { kind: "success", group: (0, chatMappersV2_1.communityChannelSummary)(value.Success, communityId) };
        }
        else if ("AlreadyInChannel" in value) {
            return {
                kind: "success",
                group: (0, chatMappersV2_1.communityChannelSummary)(value.AlreadyInChannel, communityId),
            };
        }
        else if ("SuccessJoinedCommunity" in value) {
            return {
                kind: "success_joined_community",
                community: (0, chatMappersV2_1.communitySummary)(value.SuccessJoinedCommunity),
            };
        }
        else if ("GateCheckFailed" in value) {
            return {
                kind: "gate_check_failed",
                reason: (0, chatMappersV2_1.gateCheckFailedReason)(value.GateCheckFailed),
            };
        }
    }
    if (value === "UserBlocked") {
        return openchat_shared_1.CommonResponses.userBlocked();
    }
    else {
        console.warn("Join group failed with: ", value);
        return openchat_shared_1.CommonResponses.failure();
    }
}
exports.joinChannelResponse = joinChannelResponse;
function registerUserResponse(value) {
    if (value === "UsernameInvalid") {
        return { kind: "username_invalid" };
    }
    if (value === "AlreadyRegistered") {
        return { kind: "already_registered" };
    }
    if (value === "UserLimitReached") {
        return { kind: "user_limit_reached" };
    }
    if (value === "RegistrationInProgress") {
        return { kind: "registration_in_progress" };
    }
    if (value === "CyclesBalanceTooLow") {
        return { kind: "cycles_balance_too_low" };
    }
    if (value === "ReferralCodeInvalid") {
        return { kind: "referral_code_invalid" };
    }
    if (value === "ReferralCodeAlreadyClaimed") {
        return { kind: "referral_code_already_claimed" };
    }
    if (value === "ReferralCodeExpired") {
        return { kind: "referral_code_expired" };
    }
    if ("Success" in value) {
        return {
            kind: "success",
            userId: (0, mapping_1.principalBytesToString)(value.Success.user_id),
            icpAccount: (0, mapping_1.bytesToHexString)(value.Success.icp_account),
        };
    }
    if ("UsernameTooShort" in value) {
        return { kind: "username_too_short" };
    }
    if ("UsernameTooLong" in value) {
        return { kind: "username_too_long" };
    }
    if ("NotSupported" in value) {
        return { kind: "not_supported" };
    }
    if ("InternalError" in value) {
        return { kind: "internal_error" };
    }
    if ("PublicKeyInvalid" in value) {
        return { kind: "public_key_invalid" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiRegisterUserResponse type received", value);
}
exports.registerUserResponse = registerUserResponse;
function inviteUsersResponse(value) {
    if (value === "Success") {
        return true;
    }
    else {
        console.warn("InviteUsersResponse was unsuccessful", value);
        return false;
    }
}
exports.inviteUsersResponse = inviteUsersResponse;
function joinCommunityResponse(value) {
    if (typeof value === "object") {
        if ("Success" in value) {
            return { kind: "success", community: (0, chatMappersV2_1.communitySummary)(value.Success) };
        }
        else if ("AlreadyInCommunity" in value) {
            return { kind: "success", community: (0, chatMappersV2_1.communitySummary)(value.AlreadyInCommunity) };
        }
        else if ("GateCheckFailed" in value) {
            return {
                kind: "gate_check_failed",
                reason: (0, chatMappersV2_1.gateCheckFailedReason)(value.GateCheckFailed),
            };
        }
    }
    console.warn("Join community failed with: ", value);
    return openchat_shared_1.CommonResponses.failure();
}
exports.joinCommunityResponse = joinCommunityResponse;
function apiVerifiedCredentialArgs(domain) {
    return {
        user_ii_principal: (0, mapping_1.principalStringToBytes)(domain.userIIPrincipal),
        ii_origin: domain.iiOrigin,
        credential_jwts: domain.credentialJwts,
        credential_jwt: domain.credentialJwts[0],
    };
}
exports.apiVerifiedCredentialArgs = apiVerifiedCredentialArgs;
