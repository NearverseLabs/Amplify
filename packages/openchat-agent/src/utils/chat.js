"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextIndex = exports.emptyChatMetrics = exports.buildUserAvatarUrl = exports.buildTokenLogoUrl = exports.buildBlobUrl = exports.getUpdatedEvents = exports.mergeGroupChats = exports.mergeGroupChatUpdates = exports.mergeDirectChatUpdates = exports.mergeGroupChatDetails = exports.mergeCommunityDetails = void 0;
const openchat_shared_1 = require("openchat-shared");
const list_1 = require("./list");
const mapping_1 = require("./mapping");
const identicon_js_1 = __importDefault(require("identicon.js"));
const md5_1 = __importDefault(require("md5"));
function mergeThings(keyFn, mergeFn, things, updates) {
    if (updates.added.length === 0 && updates.updated.length === 0 && updates.removed.size === 0)
        return things;
    const dict = (0, list_1.toRecord)(things.concat(updates.added), keyFn);
    updates.removed.forEach((key) => {
        delete dict[key];
    });
    const updated = updates.updated.reduce((dict, updated) => {
        const key = keyFn(updated);
        const merged = mergeFn(dict[key], updated);
        if (merged) {
            dict[key] = merged;
        }
        return dict;
    }, dict);
    return Object.values(updated);
}
function mergeCommunityDetails(previous, updates) {
    return {
        lastUpdated: updates.lastUpdated,
        members: mergeThings((p) => p.userId, mergeParticipants, previous.members, {
            added: [],
            updated: updates.membersAddedOrUpdated,
            removed: updates.membersRemoved,
        }),
        blockedUsers: new Set(mergeThings(mapping_1.identity, mapping_1.identity, [...previous.blockedUsers], {
            added: [...updates.blockedUsersAdded],
            updated: [],
            removed: updates.blockedUsersRemoved,
        })),
        referrals: new Set(mergeThings(mapping_1.identity, mapping_1.identity, [...previous.referrals], {
            added: [...updates.referralsAdded],
            updated: [],
            removed: updates.referralsRemoved,
        })),
        invitedUsers: updates.invitedUsers ?? previous.invitedUsers,
        rules: updates.rules ?? previous.rules,
        userGroups: mergeUserGroups(previous.userGroups, updates.userGroups, updates.userGroupsDeleted),
    };
}
exports.mergeCommunityDetails = mergeCommunityDetails;
function mergeUserGroups(previous, updated, deleted) {
    deleted.forEach((id) => previous.delete(id));
    updated.forEach((g) => previous.set(g.id, g));
    return new Map(previous);
}
function mergeGroupChatDetails(previous, updates) {
    return {
        timestamp: updates.timestamp,
        members: mergeThings((p) => p.userId, mergeParticipants, previous.members, {
            added: [],
            updated: updates.membersAddedOrUpdated,
            removed: updates.membersRemoved,
        }),
        blockedUsers: new Set(mergeThings(mapping_1.identity, mapping_1.identity, [...previous.blockedUsers], {
            added: [...updates.blockedUsersAdded],
            updated: [],
            removed: updates.blockedUsersRemoved,
        })),
        invitedUsers: updates.invitedUsers ?? previous.invitedUsers,
        pinnedMessages: mergePinnedMessages(previous.pinnedMessages, updates.pinnedMessagesAdded, updates.pinnedMessagesRemoved),
        rules: updates.rules ?? previous.rules,
    };
}
exports.mergeGroupChatDetails = mergeGroupChatDetails;
function mergePinnedMessages(current, added, removed) {
    removed.forEach((m) => current.delete(m));
    added.forEach((m) => current.add(m));
    return current;
}
function mergeParticipants(_, updated) {
    return updated;
}
function mergeDirectChatUpdates(directChats, updates) {
    const lookup = openchat_shared_1.ChatMap.fromList(updates);
    return directChats.map((c) => {
        const u = lookup.get(c.id);
        if (u === undefined)
            return c;
        return {
            kind: "direct_chat",
            id: c.id,
            them: c.them,
            readByThemUpTo: u.readByThemUpTo ?? c.readByThemUpTo,
            dateCreated: c.dateCreated,
            lastUpdated: u.lastUpdated,
            latestEventIndex: u.latestEventIndex ?? c.latestEventIndex,
            latestMessage: u.latestMessage ?? c.latestMessage,
            latestMessageIndex: u.latestMessageIndex ?? c.latestMessageIndex,
            metrics: u.metrics ?? c.metrics,
            eventsTTL: (0, openchat_shared_1.applyOptionUpdate)(c.eventsTTL, u.eventsTTL),
            eventsTtlLastUpdated: (0, openchat_shared_1.bigIntMax)(c.eventsTtlLastUpdated ?? BigInt(0), u.eventsTtlLastUpdated ?? BigInt(0)),
            videoCallInProgress: (0, openchat_shared_1.applyOptionUpdate)(c.videoCallInProgress, u.videoCallInProgress),
            membership: {
                ...c.membership,
                readByMeUpTo: u.readByMeUpTo ?? c.membership.readByMeUpTo,
                notificationsMuted: u.notificationsMuted ?? c.membership.notificationsMuted,
                myMetrics: u.myMetrics ?? c.membership.myMetrics,
                archived: u.archived ?? c.membership.archived,
                rulesAccepted: false,
                lapsed: false,
            },
        };
    });
}
exports.mergeDirectChatUpdates = mergeDirectChatUpdates;
function mergeGroupChatUpdates(groupChats, userCanisterUpdates, groupCanisterUpdates) {
    const userLookup = openchat_shared_1.ChatMap.fromList(userCanisterUpdates);
    const groupLookup = openchat_shared_1.ChatMap.fromList(groupCanisterUpdates);
    return groupChats.map((c) => {
        const u = userLookup.get(c.id);
        const g = groupLookup.get(c.id);
        if (u === undefined && g === undefined)
            return c;
        const latestMessageIndex = g?.latestMessageIndex ?? c.latestMessageIndex;
        let latestMessage = g?.latestMessage ?? c.latestMessage;
        if (latestMessage !== undefined &&
            latestMessage.event.messageIndex !== latestMessageIndex) {
            latestMessage = undefined;
        }
        const readByMeUpTo = u?.readByMeUpTo ?? c.membership.readByMeUpTo;
        const blobReferenceUpdate = (0, openchat_shared_1.mapOptionUpdate)(g?.avatarId, (avatarId) => ({
            blobId: avatarId,
            canisterId: c.id.groupId,
        }));
        return {
            kind: "group_chat",
            id: c.id,
            name: g?.name ?? c.name,
            description: g?.description ?? c.description,
            minVisibleEventIndex: c.minVisibleEventIndex,
            minVisibleMessageIndex: c.minVisibleMessageIndex,
            lastUpdated: g?.lastUpdated ?? c.lastUpdated,
            memberCount: g?.memberCount ?? c.memberCount,
            public: g?.public ?? c.public,
            permissions: g?.permissions ?? c.permissions,
            historyVisible: c.historyVisible,
            subtype: (0, openchat_shared_1.applyOptionUpdate)(c.subtype, g?.subtype),
            previewed: false,
            frozen: (0, openchat_shared_1.applyOptionUpdate)(c.frozen, g?.frozen) ?? false,
            latestEventIndex: g?.latestEventIndex ?? c.latestEventIndex,
            latestMessage,
            latestMessageIndex,
            metrics: g?.metrics ?? c.metrics,
            blobReference: (0, openchat_shared_1.applyOptionUpdate)(c.blobReference, blobReferenceUpdate),
            dateLastPinned: g?.dateLastPinned ?? c.dateLastPinned,
            dateReadPinned: u?.dateReadPinned ?? c.dateReadPinned,
            gateConfig: (0, openchat_shared_1.applyOptionUpdate)(c.gateConfig, g?.gateConfig) ?? {
                gate: { kind: "no_gate" },
                expiry: undefined,
            },
            level: "group",
            eventsTTL: (0, openchat_shared_1.applyOptionUpdate)(c.eventsTTL, g?.eventsTTL),
            eventsTtlLastUpdated: (0, openchat_shared_1.bigIntMax)(c.eventsTtlLastUpdated ?? BigInt(0), g?.eventsTtlLastUpdated ?? BigInt(0)),
            membership: {
                ...c.membership,
                mentions: g === undefined
                    ? c.membership.mentions
                    : [...(g?.membership?.mentions ?? []), ...c.membership.mentions],
                role: g?.membership?.myRole ?? c.membership.role,
                latestThreads: mergeThreads(c.membership.latestThreads, g?.membership?.latestThreads ?? [], g?.membership?.unfollowedThreads ?? [], u?.threadsRead ?? {}),
                readByMeUpTo: readByMeUpTo !== undefined && latestMessage !== undefined
                    ? Math.min(readByMeUpTo, latestMessage.event.messageIndex)
                    : readByMeUpTo,
                notificationsMuted: g?.membership?.notificationsMuted ?? c.membership.notificationsMuted,
                myMetrics: g?.membership?.myMetrics ?? c.membership.myMetrics,
                archived: u?.archived ?? c.membership.archived,
                rulesAccepted: g?.membership?.rulesAccepted ?? c.membership.rulesAccepted,
                lapsed: g?.membership?.lapsed ?? c.membership.lapsed,
            },
            localUserIndex: c.localUserIndex,
            videoCallInProgress: (0, openchat_shared_1.applyOptionUpdate)(c.videoCallInProgress, g?.videoCallInProgress),
            isInvited: false,
            messagesVisibleToNonMembers: g?.messagesVisibleToNonMembers ?? c.messagesVisibleToNonMembers,
        };
    });
}
exports.mergeGroupChatUpdates = mergeGroupChatUpdates;
function mergeGroupChats(userCanisterGroups, groupCanisterGroups) {
    const userCanisterGroupLookup = openchat_shared_1.ChatMap.fromList(userCanisterGroups);
    return groupCanisterGroups.map((g) => {
        const u = userCanisterGroupLookup.get(g.id);
        return {
            kind: "group_chat",
            id: g.id,
            name: g.name,
            description: g.description,
            minVisibleEventIndex: g.minVisibleEventIndex,
            minVisibleMessageIndex: g.minVisibleMessageIndex,
            lastUpdated: g.lastUpdated,
            memberCount: g.memberCount,
            public: g.public,
            permissions: g.permissions,
            historyVisible: g.historyVisible,
            subtype: g.subtype,
            previewed: false,
            frozen: g.frozen,
            latestEventIndex: g.latestEventIndex,
            latestMessage: g.latestMessage,
            latestMessageIndex: g.latestMessageIndex,
            metrics: g.metrics,
            blobReference: g.avatarId !== undefined
                ? { blobId: g.avatarId, canisterId: g.id.groupId }
                : undefined,
            dateLastPinned: g.dateLastPinned,
            dateReadPinned: u?.dateReadPinned,
            gateConfig: g.gateConfig,
            level: "group",
            eventsTTL: g.eventsTTL,
            eventsTtlLastUpdated: g.eventsTtlLastUpdated,
            membership: {
                ...g.membership,
                latestThreads: mergeThreads([], g.membership.latestThreads, [], u?.threadsRead ?? {}),
                readByMeUpTo: u?.readByMeUpTo,
                archived: u?.archived ?? false,
            },
            localUserIndex: g.localUserIndex,
            videoCallInProgress: g.videoCallInProgress,
            isInvited: false,
            messagesVisibleToNonMembers: g.messagesVisibleToNonMembers,
        };
    });
}
exports.mergeGroupChats = mergeGroupChats;
function mergeThreads(current, groupCanisterUpdates, groupCanisterUnfollowedThreads, readUpToUpdates) {
    const initial = current.filter((t) => !groupCanisterUnfollowedThreads.includes(t.threadRootMessageIndex));
    const threadsRecord = (0, list_1.toRecord)(initial, (t) => t.threadRootMessageIndex);
    for (const groupUpdate of groupCanisterUpdates) {
        threadsRecord[groupUpdate.threadRootMessageIndex] = {
            ...threadsRecord[groupUpdate.threadRootMessageIndex],
            ...groupUpdate,
        };
    }
    return Object.values(threadsRecord).map((t) => {
        const readUpToUpdate = readUpToUpdates[t.threadRootMessageIndex];
        return readUpToUpdate !== undefined && readUpToUpdate > (t.readUpTo ?? -1)
            ? { ...t, readUpTo: readUpToUpdate }
            : t;
    });
}
function getUpdatedEvents(directChats, groupChats, communities) {
    const result = new openchat_shared_1.ChatMap();
    directChats
        .filter((c) => c.updatedEvents.length > 0)
        .forEach((c) => result.set(c.id, c.updatedEvents));
    groupChats
        .filter((c) => c.updatedEvents.length > 0)
        .forEach((c) => result.set(c.id, c.updatedEvents));
    communities
        .flatMap((c) => c.channelsUpdated)
        .filter((c) => c.updatedEvents.length > 0)
        .forEach((c) => result.set(c.id, c.updatedEvents));
    return result;
}
exports.getUpdatedEvents = getUpdatedEvents;
function buildBlobUrl(pattern, canisterId, blobId, blobType, channelId) {
    const blobTypeFragment = channelId === undefined ? blobType : `channel/${channelId.channelId}/${blobType}`;
    return `${pattern
        .replace("{canisterId}", canisterId)
        .replace("{blobType}", blobTypeFragment)}/${blobId}`;
}
exports.buildBlobUrl = buildBlobUrl;
function buildTokenLogoUrl(pattern, canisterId, ledger, logoId) {
    return `${pattern
        .replace("{canisterId}", canisterId)
        .replace("{blobType}", "logo")}?ledger=${ledger}&id=${logoId}`;
}
exports.buildTokenLogoUrl = buildTokenLogoUrl;
function buildUserAvatarUrl(pattern, userId, avatarId) {
    return avatarId !== undefined
        ? buildBlobUrl(pattern, userId, avatarId, "avatar")
        : userId === openchat_shared_1.OPENCHAT_BOT_USER_ID
            ? openchat_shared_1.OPENCHAT_BOT_AVATAR_URL
            : userId === openchat_shared_1.OPENCHAT_VIDEO_CALL_USER_ID
                ? openchat_shared_1.OPENCHAT_VIDEO_CALL_AVATAR_URL
                : buildIdenticonUrl(userId);
}
exports.buildUserAvatarUrl = buildUserAvatarUrl;
function buildIdenticonUrl(userId) {
    const identicon = new identicon_js_1.default((0, md5_1.default)(userId), {
        margin: 0,
        format: "svg",
    });
    return `data:image/svg+xml;base64,${identicon}`;
}
function emptyChatMetrics() {
    return {
        audioMessages: 0,
        edits: 0,
        icpMessages: 0,
        sns1Messages: 0,
        ckbtcMessages: 0,
        giphyMessages: 0,
        deletedMessages: 0,
        reportedMessages: 0,
        fileMessages: 0,
        pollVotes: 0,
        textMessages: 0,
        imageMessages: 0,
        replies: 0,
        videoMessages: 0,
        polls: 0,
        reactions: 0,
    };
}
exports.emptyChatMetrics = emptyChatMetrics;
function nextIndex(ascending, events) {
    if (events.length === 0)
        return undefined;
    return ascending ? events[events.length - 1].index + 1 : events[0].index - 1;
}
exports.nextIndex = nextIndex;
