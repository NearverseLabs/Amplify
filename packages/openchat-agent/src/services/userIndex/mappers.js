"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalAchievementsResponse = exports.submitProofOfUniquePersonhoodResponse = exports.chitLeaderboardResponse = exports.diamondMembershipFeesResponse = exports.apiJsonDiamondDuration = exports.payForDiamondMembershipResponse = exports.unsuspendUserResponse = exports.suspendUserResponse = exports.setDisplayNameResponse = exports.setUsernameResponse = exports.checkUsernameResponse = exports.currentUserResponse = exports.userRegistrationCanisterResponse = exports.diamondStatus = exports.userSummary = exports.userSummaryUpdate = exports.currentUserSummary = exports.usersApiResponse = exports.userSearchResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
const mapping_1 = require("../../utils/mapping");
const chatMappersV2_1 = require("../common/chatMappersV2");
function userSearchResponse(value) {
    if ("Success" in value) {
        const timestamp = value.Success.timestamp;
        return value.Success.users.map((u) => userSummary(u, timestamp));
    }
    throw new Error(`Unknown UserIndex.SearchResponse of ${value}`);
}
exports.userSearchResponse = userSearchResponse;
function usersApiResponse(value) {
    if ("Success" in value) {
        const timestamp = value.Success.timestamp;
        return {
            serverTimestamp: timestamp,
            users: value.Success.users.map(userSummaryUpdate),
            deletedUserIds: new Set(value.Success.deleted.map(mapping_1.principalBytesToString)),
            currentUser: (0, mapping_1.mapOptional)(value.Success.current_user, (u) => currentUserSummary(u, timestamp)),
        };
    }
    throw new Error(`Unknown UserIndex.UsersResponse of ${value}`);
}
exports.usersApiResponse = usersApiResponse;
function currentUserSummary(value, timestamp) {
    return {
        kind: "current_user_summary",
        username: value.username,
        isPlatformOperator: value.is_platform_operator,
        diamondStatus: diamondMembershipStatus(value.diamond_membership_status),
        userId: (0, mapping_1.principalBytesToString)(value.user_id),
        isBot: value.is_bot,
        displayName: (0, mapping_1.mapOptional)(value.display_name, mapping_1.identity),
        moderationFlagsEnabled: value.moderation_flags_enabled,
        isSuspectedBot: value.is_suspected_bot,
        suspensionDetails: (0, mapping_1.mapOptional)(value.suspension_details, suspensionDetails),
        isPlatformModerator: value.is_platform_moderator,
        diamondDetails: (0, mapping_1.mapOptional)(value.diamond_membership_details, diamondMembership),
        updated: timestamp,
        blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (id) => ({
            blobId: id,
            canisterId: (0, mapping_1.principalBytesToString)(value.user_id),
        })),
        isUniquePerson: value.is_unique_person,
    };
}
exports.currentUserSummary = currentUserSummary;
function userSummaryUpdate(value) {
    return {
        userId: (0, mapping_1.principalBytesToString)(value.user_id),
        stable: (0, mapping_1.mapOptional)(value.stable, (s) => ({
            username: s.username,
            diamondStatus: diamondStatus(s.diamond_membership_status),
            isBot: s.is_bot,
            displayName: (0, mapping_1.mapOptional)(s.display_name, mapping_1.identity),
            blobReference: (0, mapping_1.mapOptional)(s.avatar_id, (id) => ({
                blobId: id,
                canisterId: (0, mapping_1.principalBytesToString)(value.user_id),
            })),
            suspended: s.suspended,
            isUniquePerson: s.is_unique_person,
        })),
        volatile: (0, mapping_1.mapOptional)(value.volatile, (v) => ({
            chitBalance: v.chit_balance,
            streak: v.streak,
            totalChitEarned: v.total_chit_earned,
        })),
    };
}
exports.userSummaryUpdate = userSummaryUpdate;
function userSummary(value, timestamp) {
    return {
        kind: value.is_bot ? "bot" : "user",
        userId: (0, mapping_1.principalBytesToString)(value.user_id),
        username: value.username,
        displayName: (0, mapping_1.mapOptional)(value.display_name, mapping_1.identity),
        blobReference: (0, mapping_1.mapOptional)(value.avatar_id, (id) => ({
            blobId: id,
            canisterId: (0, mapping_1.principalBytesToString)(value.user_id),
        })),
        updated: timestamp,
        suspended: value.suspended,
        diamondStatus: diamondStatus(value.diamond_membership_status),
        chitBalance: value.chit_balance,
        totalChitEarned: value.total_chit_earned,
        streak: value.streak,
        isUniquePerson: value.is_unique_person,
    };
}
exports.userSummary = userSummary;
function diamondStatus(value) {
    if (value === "Inactive") {
        return "inactive";
    }
    if (value === "Active") {
        return "active";
    }
    if (value === "Lifetime") {
        return "lifetime";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected DiamondMembershipStatus type received", value);
}
exports.diamondStatus = diamondStatus;
function userRegistrationCanisterResponse(value) {
    if (value !== "NewRegistrationsClosed" && "Success" in value) {
        return (0, mapping_1.principalBytesToString)(value.Success);
    }
    throw new Error(`Unexpected UserRegistrationCanisterResponse type received: ${value}`);
}
exports.userRegistrationCanisterResponse = userRegistrationCanisterResponse;
function currentUserResponse(value) {
    if (value === "UserNotFound") {
        return { kind: "unknown_user" };
    }
    if ("Success" in value) {
        const r = value.Success;
        console.log("User: ", r);
        return {
            kind: "created_user",
            userId: (0, mapping_1.principalBytesToString)(r.user_id),
            username: r.username,
            dateCreated: r.date_created,
            displayName: r.display_name ?? undefined,
            cryptoAccount: (0, mapping_1.bytesToHexString)(r.icp_account),
            isPlatformModerator: r.is_platform_moderator,
            isPlatformOperator: r.is_platform_operator,
            suspensionDetails: (0, mapping_1.mapOptional)(r.suspension_details, suspensionDetails),
            isSuspectedBot: r.is_suspected_bot,
            diamondStatus: diamondMembershipStatus(r.diamond_membership_status),
            moderationFlagsEnabled: r.moderation_flags_enabled,
            isBot: false,
            updated: BigInt(Date.now()),
            isUniquePerson: value.Success.is_unique_person,
        };
    }
    throw new Error(`Unexpected CurrentUserResponse type received: ${value}`);
}
exports.currentUserResponse = currentUserResponse;
function diamondMembershipStatus(value) {
    if (value === "Inactive") {
        return { kind: "inactive" };
    }
    if (value === "Lifetime") {
        return { kind: "lifetime" };
    }
    if ("Active" in value) {
        return {
            kind: "active",
            ...diamondMembership(value.Active),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected DiamondMembershipStatusFullJson type received", value);
}
function diamondMembership(value) {
    return {
        expiresAt: value.expires_at,
        subscription: diamondMembershipSubscription(value.subscription),
        payInChat: value.pay_in_chat,
    };
}
function diamondMembershipSubscription(value) {
    if (value === "OneMonth") {
        return "one_month";
    }
    if (value === "ThreeMonths") {
        return "three_months";
    }
    if (value === "OneYear") {
        return "one_year";
    }
    if (value === "Disabled") {
        return "disabled";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected DiamondMembershipSubscriptionJson type received", value);
}
function suspensionDetails(value) {
    return {
        reason: value.reason,
        action: suspensionAction(value.action),
        suspendedBy: (0, mapping_1.principalBytesToString)(value.suspended_by),
    };
}
function suspensionAction(value) {
    if ("Unsuspend" in value) {
        return {
            kind: "unsuspend_action",
            timestamp: value.Unsuspend,
        };
    }
    else if ("Delete" in value) {
        return {
            kind: "delete_action",
            timestamp: value.Delete,
        };
    }
    throw new Error(`Unexpected SuspensionAction type received: ${value}`);
}
function checkUsernameResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "UsernameTaken") {
        return "username_taken";
    }
    if (value === "UsernameInvalid") {
        return "username_invalid";
    }
    if ("UsernameTooShort" in value) {
        return "username_too_short";
    }
    if ("UsernameTooLong" in value) {
        return "username_too_long";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected CheckUsernameResponse type received", value);
}
exports.checkUsernameResponse = checkUsernameResponse;
function setUsernameResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "UsernameTaken") {
        return "username_taken";
    }
    if (value === "UserNotFound") {
        return "user_not_found";
    }
    if (value === "UsernameInvalid") {
        return "username_invalid";
    }
    if ("UsernameTooShort" in value) {
        return "username_too_short";
    }
    if ("UsernameTooLong" in value) {
        return "username_too_long";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected SetUsernameResponse type received", value);
}
exports.setUsernameResponse = setUsernameResponse;
function setDisplayNameResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "UserNotFound") {
        return "user_not_found";
    }
    if (value === "DisplayNameInvalid") {
        return "display_name_invalid";
    }
    if ("DisplayNameTooShort" in value) {
        return "display_name_too_short";
    }
    if ("DisplayNameTooLong" in value) {
        return "display_name_too_long";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected SetDisplayNameResponse type received", value);
}
exports.setDisplayNameResponse = setDisplayNameResponse;
function suspendUserResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "UserAlreadySuspended") {
        return "user_already_suspended";
    }
    if (value === "UserNotFound") {
        return "user_not_found";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected SuspendUserResponse type received", value);
}
exports.suspendUserResponse = suspendUserResponse;
function unsuspendUserResponse(value) {
    if (value === "Success") {
        return "success";
    }
    if (value === "UserNotFound") {
        return "user_not_found";
    }
    if (value === "UserNotSuspended") {
        return "user_not_suspended";
    }
    if ("InternalError" in value) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected UnsuspendUserResponse type received", value);
}
exports.unsuspendUserResponse = unsuspendUserResponse;
function payForDiamondMembershipResponse(duration, value) {
    if (value === "PaymentAlreadyInProgress") {
        return { kind: "payment_already_in_progress" };
    }
    if (value === "CurrencyNotSupported") {
        return { kind: "currency_not_supported" };
    }
    if (value === "UserNotFound") {
        return { kind: "user_not_found" };
    }
    if (value === "PriceMismatch") {
        return { kind: "price_mismatch" };
    }
    if (value === "AlreadyLifetimeDiamondMember") {
        return { kind: "already_lifetime_diamond_member" };
    }
    if ("Success" in value) {
        return {
            kind: "success",
            proof: value.Success.proof_jwt,
            status: duration === "lifetime"
                ? { kind: "lifetime" }
                : { kind: "active", ...diamondMembership(value.Success) },
        };
    }
    if ("TransferFailed" in value) {
        return { kind: "transfer_failed" };
    }
    if ("InternalError" in value) {
        return { kind: "internal_error" };
    }
    if ("InsufficientFunds" in value) {
        return { kind: "insufficient_funds" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiPayForDiamondMembershipResponse type received", value);
}
exports.payForDiamondMembershipResponse = payForDiamondMembershipResponse;
function apiJsonDiamondDuration(domain) {
    if (domain === "one_month") {
        return "OneMonth";
    }
    if (domain === "three_months") {
        return "ThreeMonths";
    }
    if (domain === "one_year") {
        return "OneYear";
    }
    if (domain === "lifetime") {
        return "Lifetime";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected DiamondMembershipDuration type received", domain);
}
exports.apiJsonDiamondDuration = apiJsonDiamondDuration;
function diamondMembershipFeesResponse(value) {
    if ("Success" in value) {
        return value.Success.map((f) => ({
            token: (0, chatMappersV2_1.token)(f.token),
            oneMonth: f.one_month,
            threeMonths: f.three_months,
            oneYear: f.one_year,
            lifetime: f.lifetime,
        }));
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected DiamondMembershipFeesResponse type received", value);
}
exports.diamondMembershipFeesResponse = diamondMembershipFeesResponse;
function chitLeaderboardResponse(value) {
    if ("SuccessV2" in value) {
        return {
            allTime: value.SuccessV2.all_time.map(chitUserBalance),
            lastMonth: value.SuccessV2.last_month.map(chitUserBalance),
            thisMonth: value.SuccessV2.this_month.map(chitUserBalance),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ChitLeaderboardResponse type received", value);
}
exports.chitLeaderboardResponse = chitLeaderboardResponse;
function chitUserBalance(value) {
    return {
        userId: (0, mapping_1.principalBytesToString)(value.user_id),
        balance: value.balance,
        username: value.username,
    };
}
function submitProofOfUniquePersonhoodResponse(value) {
    if (value === "Success") {
        return openchat_shared_1.CommonResponses.success();
    }
    if (value === "UserNotFound") {
        return openchat_shared_1.CommonResponses.userNotFound();
    }
    if ("Invalid" in value) {
        return openchat_shared_1.CommonResponses.invalid();
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected SubmitProofOfUniquePersonhoodResponse type received", value);
}
exports.submitProofOfUniquePersonhoodResponse = submitProofOfUniquePersonhoodResponse;
function externalAchievementsResponse(value) {
    if (value === "SuccessNoUpdates") {
        return { kind: "success_no_updates" };
    }
    if ("Success" in value) {
        return {
            kind: "success",
            addedOrUpdated: value.Success.added_or_updated.map(externalAchievement),
            lastUpdated: value.Success.last_updated,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ExternalAchievementsResponse type received", value);
}
exports.externalAchievementsResponse = externalAchievementsResponse;
function externalAchievement(value) {
    return {
        id: value.id,
        url: value.url,
        name: value.name,
        chitReward: value.chit_reward,
        expires: value.expires,
        budgetExhausted: value.budget_exhausted,
    };
}
