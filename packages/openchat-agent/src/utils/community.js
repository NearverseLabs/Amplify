"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuccessfulCommunitySummaryResponse = exports.mergeCommunityUpdates = exports.mergeChannels = exports.mergeCommunities = void 0;
const openchat_shared_1 = require("openchat-shared");
const list_1 = require("./list");
function mergeCommunities(userCanisterCommunities, communityCanisterCommunities) {
    const userCanisterCommunityLookup = openchat_shared_1.CommunityMap.fromList(userCanisterCommunities);
    return communityCanisterCommunities.map((community) => {
        const u = userCanisterCommunityLookup.get(community.id);
        return {
            ...community,
            membership: {
                ...community.membership,
                archived: u?.archived ?? community.membership.archived,
                pinned: u?.pinned ?? community.membership.pinned,
                index: u?.index ?? community.membership.index,
            },
            channels: mergeChannels(u?.channels ?? [], community.channels),
        };
    });
}
exports.mergeCommunities = mergeCommunities;
function mergeChannels(userCanisterChannels, communityCanisterChannels) {
    const userCanisterGroupLookup = openchat_shared_1.ChatMap.fromList(userCanisterChannels);
    return communityCanisterChannels.map((c) => {
        const u = userCanisterGroupLookup.get(c.id);
        return {
            ...c,
            dateReadPinned: u?.dateReadPinned,
            membership: {
                ...c.membership,
                latestThreads: mergeThreads([], c.membership.latestThreads, [], u?.threadsRead ?? {}),
                readByMeUpTo: u?.readByMeUpTo,
                archived: u?.archived ?? false,
            },
        };
    });
}
exports.mergeChannels = mergeChannels;
function mergeCommunityUpdates(communities, userCanisterUpdates, communityCanisterUpdates) {
    const userLookup = openchat_shared_1.CommunityMap.fromList(userCanisterUpdates);
    const communityLookup = openchat_shared_1.CommunityMap.fromList(communityCanisterUpdates);
    return communities.map((community) => {
        const u = userLookup.get(community.id);
        const c = communityLookup.get(community.id);
        const avatarUpdate = (0, openchat_shared_1.mapOptionUpdate)(c?.avatarId, (avatarId) => ({
            blobId: avatarId,
            canisterId: community.id.communityId,
        }));
        const bannerUpdate = (0, openchat_shared_1.mapOptionUpdate)(c?.bannerId, (bannerId) => ({
            blobId: bannerId,
            canisterId: community.id.communityId,
        }));
        const channelsRemoved = new Set((c?.channelsRemoved ?? []).map((c) => c.channelId));
        const channelsAdded = c?.channelsAdded ?? [];
        const currentChannels = community.channels
            .filter((c) => !channelsRemoved.has(c.id.channelId))
            .concat(channelsAdded);
        return {
            kind: community.kind,
            id: community.id,
            name: c?.name ?? community?.name,
            latestEventIndex: c?.latestEventIndex ?? community.latestEventIndex,
            lastUpdated: c?.lastUpdated ?? community.lastUpdated,
            description: c?.description ?? community.description,
            memberCount: c?.memberCount ?? community.memberCount,
            metrics: c?.metrics ?? community.metrics,
            avatar: {
                ...community.avatar,
                blobReference: (0, openchat_shared_1.applyOptionUpdate)(community.avatar.blobReference, avatarUpdate),
            },
            banner: {
                ...community.banner,
                blobReference: (0, openchat_shared_1.applyOptionUpdate)(community.banner.blobReference, bannerUpdate),
            },
            membership: {
                ...community.membership,
                role: c?.membership?.role ?? community.membership.role,
                archived: u?.archived ?? community.membership.archived,
                pinned: u?.pinned ?? community.membership.pinned,
                index: u?.index ?? community.membership.index,
                displayName: (0, openchat_shared_1.applyOptionUpdate)(community.membership.displayName, c?.membership?.displayName),
                rulesAccepted: c?.membership?.rulesAccepted ?? community.membership.rulesAccepted,
                lapsed: c?.membership?.lapsed ?? community.membership.lapsed,
            },
            channels: mergeChannelUpdates(currentChannels, u?.channels ?? [], c?.channelsUpdated ?? []),
            gateConfig: (0, openchat_shared_1.applyOptionUpdate)(community.gateConfig, c?.gateConfig) ?? {
                gate: { kind: "no_gate" },
                expiry: undefined,
            },
            level: "community",
            public: c?.public ?? community.public,
            frozen: (0, openchat_shared_1.applyOptionUpdate)(community.frozen, c?.frozen) ?? false,
            historyVisible: community.historyVisible,
            permissions: c?.permissions ?? community.permissions,
            primaryLanguage: c?.primaryLanguage ?? community.primaryLanguage,
            userGroups: mergeUserGroups(community.userGroups, c?.userGroups ?? [], c?.userGroupsDeleted ?? new Set()),
            localUserIndex: community.localUserIndex,
            isInvited: false,
        };
    });
}
exports.mergeCommunityUpdates = mergeCommunityUpdates;
function mergeUserGroups(existing, updated, deleted) {
    deleted.forEach((id) => existing.delete(id));
    updated.forEach((g) => existing.set(g.id, g));
    return new Map(existing);
}
function mergeChannelUpdates(channels, userCanisterUpdates, communityCanisterUpdates) {
    const userLookup = openchat_shared_1.ChatMap.fromList(userCanisterUpdates);
    const channelLookup = openchat_shared_1.ChatMap.fromList(communityCanisterUpdates);
    return channels.map((channel) => {
        const u = userLookup.get(channel.id);
        const c = channelLookup.get(channel.id);
        if (u === undefined && c === undefined)
            return channel;
        const latestMessage = c?.latestMessage ?? channel.latestMessage;
        const readByMeUpTo = u?.readByMeUpTo ?? channel.membership.readByMeUpTo;
        const blobReferenceUpdate = (0, openchat_shared_1.mapOptionUpdate)(c?.avatarId, (avatarId) => ({
            blobId: avatarId,
            canisterId: channel.id.communityId,
        }));
        const description = c?.description ?? channel.description;
        return {
            kind: "channel",
            id: channel.id,
            name: c?.name ?? channel.name,
            description,
            minVisibleEventIndex: channel.minVisibleEventIndex,
            minVisibleMessageIndex: channel.minVisibleMessageIndex,
            lastUpdated: c?.lastUpdated ?? channel.lastUpdated,
            memberCount: c?.memberCount ?? channel.memberCount,
            public: c?.public ?? channel.public,
            permissions: c?.permissions ?? channel.permissions,
            historyVisible: channel.historyVisible,
            subtype: (0, openchat_shared_1.applyOptionUpdate)(channel.subtype, c?.subtype),
            previewed: false,
            frozen: channel.frozen,
            latestEventIndex: c?.latestEventIndex ?? channel.latestEventIndex,
            latestMessageIndex: c?.latestMessageIndex ?? channel.latestMessageIndex,
            latestMessage,
            metrics: c?.metrics ?? channel.metrics,
            blobReference: (0, openchat_shared_1.applyOptionUpdate)(channel.blobReference, blobReferenceUpdate),
            dateLastPinned: c?.dateLastPinned ?? channel.dateLastPinned,
            dateReadPinned: u?.dateReadPinned ?? channel.dateReadPinned,
            gateConfig: (0, openchat_shared_1.applyOptionUpdate)(channel.gateConfig, c?.gateConfig) ?? {
                gate: { kind: "no_gate" },
                expiry: undefined,
            },
            level: "channel",
            eventsTTL: (0, openchat_shared_1.applyOptionUpdate)(channel.eventsTTL, c?.eventsTTL),
            eventsTtlLastUpdated: (0, openchat_shared_1.bigIntMax)(channel.eventsTtlLastUpdated, c?.eventsTtlLastUpdated ?? BigInt(0)),
            videoCallInProgress: (0, openchat_shared_1.applyOptionUpdate)(channel.videoCallInProgress, c?.videoCallInProgress),
            membership: {
                ...channel.membership,
                mentions: c === undefined
                    ? channel.membership.mentions
                    : [...(c.membership?.mentions ?? []), ...channel.membership.mentions],
                role: c?.membership?.myRole ?? channel.membership.role,
                latestThreads: mergeThreads(channel.membership.latestThreads, c?.membership?.latestThreads ?? [], c?.membership?.unfollowedThreads ?? [], u?.threadsRead ?? {}),
                readByMeUpTo: readByMeUpTo !== undefined && latestMessage !== undefined
                    ? Math.min(readByMeUpTo, latestMessage.event.messageIndex)
                    : readByMeUpTo,
                notificationsMuted: c?.membership?.notificationsMuted ?? channel.membership.notificationsMuted,
                myMetrics: c?.membership?.myMetrics ?? channel.membership.myMetrics,
                archived: u?.archived ?? channel.membership.archived,
                rulesAccepted: c?.membership?.rulesAccepted ?? channel.membership.rulesAccepted,
                lapsed: c?.membership?.lapsed ?? channel.membership.lapsed,
            },
            isInvited: false,
            messagesVisibleToNonMembers: c?.messageVisibleToNonMembers ?? channel.messagesVisibleToNonMembers,
            externalUrl: (0, openchat_shared_1.applyOptionUpdate)(channel.externalUrl, c?.externalUrl),
        };
    });
}
function mergeThreads(current, communityCanisterUpdates, unfollowedThreads, readUpToUpdates) {
    const initial = current.filter((t) => !unfollowedThreads.includes(t.threadRootMessageIndex));
    const threadsRecord = (0, list_1.toRecord)(initial, (t) => t.threadRootMessageIndex);
    for (const groupUpdate of communityCanisterUpdates) {
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
function isSuccessfulCommunitySummaryResponse(response) {
    return "id" in response;
}
exports.isSuccessfulCommunitySummaryResponse = isSuccessfulCommunitySummaryResponse;
