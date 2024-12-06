"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIndexClient = void 0;
const list_1 = require("../../utils/list");
const openchat_shared_1 = require("openchat-shared");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const userCache_1 = require("../../utils/userCache");
const caching_1 = require("../../utils/caching");
const mapping_1 = require("../../utils/mapping");
const typebox_1 = require("../../typebox");
const chatMappersV2_1 = require("../common/chatMappersV2");
class UserIndexClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
    }
    getCurrentUser() {
        return new openchat_shared_1.Stream(async (resolve, reject) => {
            try {
                const principal = this.identity.getPrincipal().toString();
                const cachedUser = await (0, caching_1.getCachedCurrentUser)(principal);
                const isOffline = (0, openchat_shared_1.offline)();
                if (cachedUser !== undefined) {
                    resolve(cachedUser, isOffline);
                }
                if (!isOffline) {
                    const liveUser = await this.executeMsgpackQuery("current_user", {}, mappers_1.currentUserResponse, typebox_1.Empty, typebox_1.UserIndexCurrentUserResponse);
                    if (liveUser.kind === "created_user") {
                        (0, caching_1.setCachedCurrentUser)(principal, liveUser);
                    }
                    resolve(liveUser, true);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    setModerationFlags(flags) {
        return this.executeMsgpackUpdate("set_moderation_flags", {
            moderation_flags_enabled: flags,
        }, (_) => true, typebox_1.UserIndexSetModerationFlagsArgs, typebox_1.UserIndexSetModerationFlagsResponse);
    }
    userRegistrationCanister() {
        return this.executeMsgpackQuery("user_registration_canister", {}, mappers_1.userRegistrationCanisterResponse, typebox_1.Empty, typebox_1.UserIndexUserRegistrationCanisterResponse);
    }
    searchUsers(searchTerm, maxResults = 20) {
        const args = {
            search_term: searchTerm,
            max_results: maxResults,
        };
        return this.executeMsgpackQuery("search", args, mappers_1.userSearchResponse, typebox_1.UserIndexSearchArgs, typebox_1.UserIndexSearchResponse);
    }
    async getUsers(chitState, users, allowStale) {
        const allUsers = users.userGroups.flatMap((g) => g.users);
        const fromCache = await (0, userCache_1.getCachedUsers)(allUsers);
        const cachedDeletedUserIds = await (0, userCache_1.getCachedDeletedUserIds)();
        const suspendedUsersSyncedTo = await (0, userCache_1.getSuspendedUsersSyncedUpTo)();
        const args = this.buildGetUsersArgs(allUsers, fromCache, allowStale, cachedDeletedUserIds);
        const requestedFromServer = new Set([...args.userGroups.flatMap((g) => g.users)]);
        const apiResponse = await this.getUsersFromBackend(args, suspendedUsersSyncedTo);
        const mergedResponse = this.mergeGetUsersResponse(chitState, allUsers, requestedFromServer, apiResponse, fromCache);
        (0, userCache_1.setCachedUsers)(mergedResponse.users).catch((err) => console.error("Failed to save users to the cache", err));
        if (mergedResponse.currentUser) {
            (0, caching_1.mergeCachedCurrentUser)(this.principal.toString(), mergedResponse.currentUser);
        }
        if (mergedResponse.serverTimestamp !== undefined) {
            (0, userCache_1.setSuspendedUsersSyncedUpTo)(mergedResponse.serverTimestamp).catch((err) => console.error("Failed to set 'suspended users synced up to' in the cache", err));
        }
        return mergedResponse;
    }
    getUsersFromBackend(users, suspendedUsersSyncedUpTo) {
        if ((0, openchat_shared_1.offline)())
            return Promise.resolve({
                serverTimestamp: 0n,
                users: [],
                deletedUserIds: new Set(),
            });
        const userGroups = users.userGroups.filter((g) => g.users.length > 0);
        const args = {
            user_groups: userGroups.map(({ users, updatedSince }) => ({
                users: users.map(mapping_1.principalStringToBytes),
                updated_since: updatedSince,
            })),
            users_suspended_since: suspendedUsersSyncedUpTo,
        };
        return this.executeMsgpackQuery("users", args, mappers_1.usersApiResponse, typebox_1.UserIndexUsersArgs, typebox_1.UserIndexUsersResponse);
    }
    buildGetUsersArgs(users, fromCache, allowStale, _cachedDeletedUserIds) {
        const fromCacheGrouped = (0, list_1.groupBy)(fromCache, (u) => u.updated);
        const fromCacheSet = new Set(fromCache.map((u) => u.userId));
        const args = {
            userGroups: [],
        };
        const notFoundInCache = users.filter((u) => !fromCacheSet.has(u));
        if (notFoundInCache.length > 0) {
            args.userGroups.push({
                users: notFoundInCache,
                updatedSince: BigInt(0),
            });
        }
        if (!allowStale) {
            for (const [updatedSince, users] of fromCacheGrouped) {
                args.userGroups.push({
                    users: users
                        .map((u) => u.userId),
                    updatedSince,
                });
            }
        }
        return args;
    }
    mergeGetUsersResponse(chitState, allUsersRequested, requestedFromServer, apiResponse, fromCache) {
        const fromCacheMap = new Map(fromCache.map((u) => [u.userId, u]));
        const apiResponseMap = new Map(apiResponse.users.map((u) => [u.userId, u]));
        const users = [];
        for (const userId of allUsersRequested) {
            const cached = fromCacheMap.get(userId);
            const fromServer = apiResponseMap.get(userId);
            if (fromServer !== undefined) {
                apiResponseMap.delete(userId);
                const merged = (0, openchat_shared_1.mergeUserSummaryWithUpdates)(cached, fromServer, apiResponse.serverTimestamp);
                if (merged !== undefined) {
                    users.push(merged);
                }
            }
            else if (cached !== undefined) {
                if (cached.userId !== apiResponse.currentUser?.userId) {
                    if (requestedFromServer.has(userId)) {
                        users.push({
                            ...cached,
                            updated: apiResponse.serverTimestamp,
                        });
                    }
                    else {
                        users.push(cached);
                    }
                }
            }
            else {
                console.debug("USERS: userId requested not in cache and not returned from server", userId);
            }
        }
        for (const user of apiResponseMap.values()) {
            const cached = fromCacheMap.get(user.userId);
            const merged = (0, openchat_shared_1.mergeUserSummaryWithUpdates)(cached, user, apiResponse.serverTimestamp);
            if (merged !== undefined) {
                users.push(merged);
            }
        }
        if (apiResponse.currentUser !== undefined) {
            users.push((0, openchat_shared_1.userSummaryFromCurrentUserSummary)(chitState, apiResponse.currentUser));
        }
        return {
            serverTimestamp: apiResponse.serverTimestamp,
            users,
            currentUser: apiResponse.currentUser,
            deletedUserIds: apiResponse.deletedUserIds,
        };
    }
    checkUsername(username) {
        const args = {
            username: username,
        };
        return this.executeMsgpackQuery("check_username", args, mappers_1.checkUsernameResponse, typebox_1.UserIndexCheckUsernameArgs, typebox_1.UserIndexCheckUsernameResponse);
    }
    setUsername(userId, username) {
        return this.executeMsgpackUpdate("set_username", { username }, mappers_1.setUsernameResponse, typebox_1.UserIndexSetUsernameArgs, typebox_1.UserIndexSetUsernameResponse).then((res) => {
            if (res === "success") {
                (0, userCache_1.setUsernameInCache)(userId, username);
            }
            return res;
        });
    }
    setDisplayName(userId, displayName) {
        return this.executeMsgpackUpdate("set_display_name", {
            display_name: displayName,
        }, mappers_1.setDisplayNameResponse, typebox_1.UserIndexSetDisplayNameArgs, typebox_1.UserIndexSetDisplayNameResponse).then((res) => {
            if (res === "success") {
                (0, userCache_1.setDisplayNameInCache)(userId, displayName);
            }
            return res;
        });
    }
    suspendUser(userId, reason) {
        return this.executeMsgpackUpdate("suspend_user", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
            reason,
        }, mappers_1.suspendUserResponse, typebox_1.UserIndexSuspendUserArgs, typebox_1.UserIndexSuspendUserResponse);
    }
    unsuspendUser(userId) {
        return this.executeMsgpackUpdate("unsuspend_user", {
            user_id: (0, mapping_1.principalStringToBytes)(userId),
        }, mappers_1.unsuspendUserResponse, typebox_1.UserIndexUnsuspendUserArgs, typebox_1.UserIndexUnsuspendUserResponse);
    }
    payForDiamondMembership(userId, token, duration, recurring, expectedPriceE8s) {
        return this.executeMsgpackUpdate("pay_for_diamond_membership", {
            token: (0, chatMappersV2_1.apiToken)(token),
            duration: (0, mappers_1.apiJsonDiamondDuration)(duration),
            recurring,
            expected_price_e8s: expectedPriceE8s,
        }, (res) => (0, mappers_1.payForDiamondMembershipResponse)(duration, res), typebox_1.UserIndexPayForDiamondMembershipArgs, typebox_1.UserIndexPayForDiamondMembershipResponse).then((res) => {
            if (res.kind === "success") {
                const principal = this.identity.getPrincipal().toString();
                (0, userCache_1.setUserDiamondStatusInCache)(userId, res.status);
                (0, caching_1.setCurrentUserDiamondStatusInCache)(principal, res.status);
            }
            return res;
        });
    }
    setUserUpgradeConcurrency(value) {
        return this.executeMsgpackUpdate("set_user_upgrade_concurrency", { value }, () => "success", typebox_1.UserIndexSetUserUpgradeConcurrencyArgs, typebox_1.UserIndexSetUserUpgradeConcurrencyResponse);
    }
    getPlatformModeratorGroup() {
        return this.executeMsgpackQuery("platform_moderators_group", {}, (res) => (0, mapping_1.principalBytesToString)(res.Success), typebox_1.Empty, typebox_1.UserIndexPlatformModeratorsGroupResponse);
    }
    diamondMembershipFees() {
        return this.executeMsgpackQuery("diamond_membership_fees", {}, mappers_1.diamondMembershipFeesResponse, typebox_1.Empty, typebox_1.UserIndexDiamondMembershipFeesResponse);
    }
    setDiamondMembershipFees(fees) {
        const chatFees = fees.find((f) => f.token === "CHAT");
        const icpFees = fees.find((f) => f.token === "ICP");
        if (chatFees === undefined || icpFees === undefined) {
            return Promise.resolve(false);
        }
        const args = {
            fees: {
                chat_fees: {
                    one_month: chatFees.oneMonth,
                    three_months: chatFees.threeMonths,
                    one_year: chatFees.oneYear,
                    lifetime: chatFees.lifetime,
                },
                icp_fees: {
                    one_month: icpFees.oneMonth,
                    three_months: icpFees.threeMonths,
                    one_year: icpFees.oneYear,
                    lifetime: icpFees.lifetime,
                },
            },
        };
        return this.executeMsgpackUpdate("set_diamond_membership_fees", args, (res) => res === "Success", typebox_1.UserIndexSetDiamondMembershipFeesArgs, typebox_1.UserIndexSetDiamondMembershipFeesResponse);
    }
    reportedMessages(userId) {
        return this.executeMsgpackQuery("reported_messages", {
            user_id: (0, mapping_1.mapOptional)(userId, mapping_1.principalStringToBytes),
        }, (res) => res.Success.json, typebox_1.UserIndexReportedMessagesArgs, typebox_1.UserIndexReportedMessagesResponse);
    }
    chitLeaderboard() {
        return this.executeMsgpackQuery("chit_leaderboard", {}, mappers_1.chitLeaderboardResponse, typebox_1.Empty, typebox_1.UserIndexChitLeaderboardResponse);
    }
    submitProofOfUniquePersonhood(iiPrincipal, credential) {
        const args = {
            user_ii_principal: (0, mapping_1.principalStringToBytes)(iiPrincipal),
            credential_jwt: credential,
        };
        return this.executeMsgpackUpdate("submit_proof_of_unique_personhood", args, mappers_1.submitProofOfUniquePersonhoodResponse, typebox_1.UserIndexSubmitProofOfUniquePersonhoodArgs, typebox_1.UserIndexSubmitProofOfUniquePersonhoodResponse);
    }
    getExternalAchievements(updatesSince) {
        return this.executeMsgpackQuery("external_achievements", { updates_since: updatesSince }, mappers_1.externalAchievementsResponse, typebox_1.UserIndexExternalAchievementsArgs, typebox_1.UserIndexExternalAchievementsResponse);
    }
    deleteUser(userId) {
        return this.executeMsgpackUpdate("delete_user", { user_id: (0, mapping_1.principalStringToBytes)(userId) }, (resp) => resp === "Success", typebox_1.UserIndexDeleteUserArgs, typebox_1.UserIndexDeleteUserResponse);
    }
}
exports.UserIndexClient = UserIndexClient;
