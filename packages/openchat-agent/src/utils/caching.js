"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setActivityFeedEvents = exports.getActivityFeedEvents = exports.setCachedExternalAchievements = exports.getCachedExternalAchievements = exports.clearCache = exports.cacheLocalUserIndexForUser = exports.getLocalUserIndexForUser = exports.setCurrentUserDiamondStatusInCache = exports.setCachedCurrentUser = exports.mergeCachedCurrentUser = exports.getCachedCurrentUser = exports.loadMessagesByMessageIndex = exports.closeDb = exports.initDb = exports.getDb = exports.setCachedGroupDetails = exports.setCachedCommunityDetails = exports.getCachedGroupDetails = exports.getCachedCommunityDetails = exports.setCachePrimerTimestamp = exports.getCachePrimerTimestamps = exports.setCachedMessageIfNotExists = exports.setCachedMessageFromSendResponse = exports.setCachedEvents = exports.loadFailedMessages = exports.recordFailedMessage = exports.removeFailedMessage = exports.mergeSuccessResponses = exports.getNearestCachedEventIndexForMessageIndex = exports.getCachedEventsByIndex = exports.getCachedEventByIndex = exports.getCachedEventsWindow = exports.getCachedEventsWindowByMessageIndex = exports.getCachedEvents = exports.setCachedChats = exports.getCachedChats = exports.openDbAndGetCachedChats = exports.openCache = exports.createCacheKey = exports.createFailedCacheKey = void 0;
const idb_1 = require("idb");
const openchat_shared_1 = require("openchat-shared");
const CACHE_VERSION = 119;
const EARLIEST_SUPPORTED_MIGRATION = 115;
const MAX_INDEX = 9999999999;
async function createActivityFeed(db, _principal, _tx) {
    if (db.objectStoreNames.contains("activityFeed")) {
        db.deleteObjectStore("activityFeed");
    }
    db.createObjectStore("activityFeed");
}
async function clearChatsStore(_db, _principal, tx) {
    await tx.objectStore("chats").clear();
}
async function clearGroupDetailsStore(_db, _principal, tx) {
    await tx.objectStore("group_details").clear();
}
async function clearCommunityDetailsStore(_db, _principal, tx) {
    await tx.objectStore("community_details").clear();
}
async function clearEverything(db, _principal, _tx) {
    nuke(db);
}
async function clearChatAndGroups(_db, _principal, tx) {
    await clearChatsStore(_db, _principal, tx);
    await clearGroupDetailsStore(_db, _principal, tx);
}
async function clearExternalAchievements(_db, _principal, tx) {
    await tx.objectStore("externalAchievements").clear();
}
const migrations = {
    115: clearEverything,
    116: async (db, principal, transaction) => {
        await Promise.all([
            clearGroupDetailsStore(db, principal, transaction),
            clearCommunityDetailsStore(db, principal, transaction),
        ]);
    },
    117: clearChatAndGroups,
    118: async (db, principal, tx) => {
        await Promise.all([
            clearChatsStore(db, principal, tx),
            createActivityFeed(db, principal, tx),
        ]);
    },
    119: clearExternalAchievements,
};
async function migrate(db, principal, from, to, transaction) {
    for (let version = from + 1; version <= to; version++) {
        if (migrations[version]) {
            console.debug(`DB: applying migration for version ${version}`);
            await migrations[version](db, principal, transaction);
        }
    }
}
function nuke(db) {
    if (db.objectStoreNames.contains("chat_events")) {
        db.deleteObjectStore("chat_events");
    }
    if (db.objectStoreNames.contains("thread_events")) {
        db.deleteObjectStore("thread_events");
    }
    if (db.objectStoreNames.contains("expiredMessageRanges")) {
        db.deleteObjectStore("expiredMessageRanges");
    }
    if (db.objectStoreNames.contains("chats")) {
        db.deleteObjectStore("chats");
    }
    if (db.objectStoreNames.contains("group_details")) {
        db.deleteObjectStore("group_details");
    }
    if (db.objectStoreNames.contains("community_details")) {
        db.deleteObjectStore("community_details");
    }
    if (db.objectStoreNames.contains("failed_chat_messages")) {
        db.deleteObjectStore("failed_chat_messages");
    }
    if (db.objectStoreNames.contains("failed_thread_messages")) {
        db.deleteObjectStore("failed_thread_messages");
    }
    if (db.objectStoreNames.contains("cachePrimer")) {
        db.deleteObjectStore("cachePrimer");
    }
    if (db.objectStoreNames.contains("currentUser")) {
        db.deleteObjectStore("currentUser");
    }
    if (db.objectStoreNames.contains("localUserIndex")) {
        db.deleteObjectStore("localUserIndex");
    }
    if (db.objectStoreNames.contains("externalAchievements")) {
        db.deleteObjectStore("externalAchievements");
    }
    if (db.objectStoreNames.contains("activityFeed")) {
        db.deleteObjectStore("activityFeed");
    }
    const chatEvents = db.createObjectStore("chat_events");
    chatEvents.createIndex("messageIdx", "messageKey");
    chatEvents.createIndex("expiresAt", "expiresAt");
    const threadEvents = db.createObjectStore("thread_events");
    threadEvents.createIndex("messageIdx", "messageKey");
    db.createObjectStore("chats");
    db.createObjectStore("group_details");
    db.createObjectStore("community_details");
    db.createObjectStore("failed_chat_messages");
    db.createObjectStore("failed_thread_messages");
    db.createObjectStore("cachePrimer");
    db.createObjectStore("currentUser");
    db.createObjectStore("localUserIndex");
    db.createObjectStore("externalAchievements");
    db.createObjectStore("activityFeed");
}
function padMessageIndex(i) {
    return i.toString().padStart(10, "0");
}
function createFailedCacheKey(context, messageId) {
    return JSON.stringify({
        ...context,
        messageId,
    });
}
exports.createFailedCacheKey = createFailedCacheKey;
function messageContextToString({ chatId, threadRootMessageIndex }) {
    return threadRootMessageIndex === undefined
        ? (0, openchat_shared_1.chatIdentifierToString)(chatId)
        : `${(0, openchat_shared_1.chatIdentifierToString)(chatId)}_${threadRootMessageIndex}`;
}
function createCacheKey(context, index) {
    return `${messageContextToString(context)}_${padMessageIndex(index)}`;
}
exports.createCacheKey = createCacheKey;
function openCache(principal) {
    return (0, idb_1.openDB)(`openchat_db_${principal}`, CACHE_VERSION, {
        upgrade(db, previousVersion, newVersion, transaction) {
            if (previousVersion == null ||
                previousVersion < EARLIEST_SUPPORTED_MIGRATION ||
                newVersion == null) {
                nuke(db);
            }
            else {
                console.debug(`DB: migrating database from ${previousVersion} to ${newVersion}`);
                migrate(db, principal, previousVersion, newVersion, transaction).then(() => {
                    console.debug(`DB: migration from ${previousVersion} to ${newVersion} complete`);
                });
            }
        },
    });
}
exports.openCache = openCache;
async function openDbAndGetCachedChats(principal) {
    const db = openCache(principal);
    if (db !== undefined) {
        return getCachedChats(db, principal);
    }
}
exports.openDbAndGetCachedChats = openDbAndGetCachedChats;
async function getCachedChats(db, principal) {
    const resolvedDb = await db;
    const chats = await resolvedDb.get("chats", principal.toString());
    if (chats !== undefined &&
        chats.latestUserCanisterUpdates < BigInt(Date.now() - 30 * openchat_shared_1.ONE_DAY)) {
        const storeNames = resolvedDb.objectStoreNames;
        for (let i = 0; i < storeNames.length; i++) {
            await resolvedDb.clear(storeNames[i]);
        }
        return undefined;
    }
    return chats;
}
exports.getCachedChats = getCachedChats;
async function setCachedChats(db, principal, chatState, updatedEvents) {
    const directChats = chatState.directChats.map(makeChatSummarySerializable);
    const groupChats = chatState.groupChats.map(makeChatSummarySerializable);
    const communities = chatState.communities.map(makeCommunitySerializable);
    const stateToCache = {
        ...chatState,
        directChats,
        groupChats,
        communities,
    };
    const tx = (await db).transaction(["chats", "chat_events", "thread_events"], "readwrite");
    const chatsStore = tx.objectStore("chats");
    const eventsStore = tx.objectStore("chat_events");
    const threadsStore = tx.objectStore("thread_events");
    const deleteRequests = updatedEvents.entries().flatMap(([chatId, indexes]) => {
        return indexes.map((i) => {
            const key = createCacheKey({ chatId, threadRootMessageIndex: i.threadRootMessageIndex }, i.eventIndex);
            return i.threadRootMessageIndex === undefined
                ? eventsStore.delete(key)
                : threadsStore.delete(key);
        });
    });
    const promises = [chatsStore.put(stateToCache, principal.toString()), ...deleteRequests];
    await Promise.all(promises);
    await tx.done;
}
exports.setCachedChats = setCachedChats;
async function getCachedEvents(db, eventIndexRange, context, startIndex, ascending, maxEvents = openchat_shared_1.MAX_EVENTS, maxMessages = openchat_shared_1.MAX_MESSAGES, maxMissing = 50) {
    console.debug("CACHE: ", context, eventIndexRange, startIndex, ascending);
    const start = Date.now();
    const [events, expiredEventRanges, missing] = await iterateCachedEvents(await db, eventIndexRange, context, startIndex, ascending, maxEvents, maxMessages, maxMissing);
    if (missing.size === 0) {
        console.debug("CACHE: hit: ", events.length, Date.now() - start);
    }
    else {
        console.debug("CACHE: miss: ", missing);
    }
    return [
        {
            events: events,
            expiredEventRanges,
            expiredMessageRanges: [],
            latestEventIndex: undefined,
        },
        missing,
    ];
}
exports.getCachedEvents = getCachedEvents;
async function getCachedEventsWindowByMessageIndex(db, eventIndexRange, context, messageIndex, maxEvents = openchat_shared_1.MAX_EVENTS, maxMessages = openchat_shared_1.MAX_MESSAGES, maxMissing = 50) {
    const eventIndex = await getNearestCachedEventIndexForMessageIndex(db, context, messageIndex);
    if (eventIndex === undefined) {
        return [
            {
                events: [],
                expiredEventRanges: [],
                expiredMessageRanges: [],
                latestEventIndex: undefined,
            },
            new Set(),
            true,
        ];
    }
    const [events, missing] = await getCachedEventsWindow(db, eventIndexRange, context, eventIndex, maxEvents, maxMessages, maxMissing);
    return [events, missing, false];
}
exports.getCachedEventsWindowByMessageIndex = getCachedEventsWindowByMessageIndex;
async function getCachedEventsWindow(db, eventIndexRange, context, startIndex, maxEvents = openchat_shared_1.MAX_EVENTS, maxMessages = openchat_shared_1.MAX_MESSAGES, maxMissing = 50) {
    console.debug("CACHE: window: ", eventIndexRange, startIndex);
    const start = Date.now();
    const resolvedDb = await db;
    const promises = [];
    if (eventIndexRange[0] <= startIndex - 1) {
        promises.push(iterateCachedEvents(resolvedDb, eventIndexRange, context, startIndex - 1, false, maxEvents / 2, maxMessages / 2, maxMissing / 2));
    }
    if (eventIndexRange[1] >= startIndex) {
        promises.push(iterateCachedEvents(resolvedDb, eventIndexRange, context, startIndex, true, maxEvents / 2, maxMessages / 2, maxMissing / 2));
    }
    const results = {
        events: [],
        expiredEventRanges: [],
        expiredMessageRanges: [],
        latestEventIndex: undefined,
    };
    const combinedMissing = new Set();
    for (const [events, expiredEventRanges, missing] of await Promise.all(promises)) {
        events.forEach((e) => results.events.push(e));
        expiredEventRanges.forEach((r) => results.expiredEventRanges.push(r));
        missing.forEach((m) => combinedMissing.add(m));
    }
    if (combinedMissing.size === 0) {
        console.debug("CACHE: hit: ", results.events.length, Date.now() - start);
    }
    return [results, combinedMissing];
}
exports.getCachedEventsWindow = getCachedEventsWindow;
async function getCachedEventByIndex(db, eventIndex, context, now = Date.now()) {
    const storeName = context.threadRootMessageIndex === undefined ? "chat_events" : "thread_events";
    const key = createCacheKey(context, eventIndex);
    const upperBound = createCacheKey(context, MAX_INDEX);
    const event = processEventExpiry(await db.get(storeName, IDBKeyRange.bound(key, upperBound)), now);
    if ((event?.kind === "event" && event.index === eventIndex) ||
        (event?.kind === "expired_events_range" && event.start <= eventIndex)) {
        return event;
    }
    return undefined;
}
exports.getCachedEventByIndex = getCachedEventByIndex;
async function getCachedEventsByIndex(db, eventIndexes, context) {
    const events = [];
    const expiredEventRanges = [];
    const missing = new Set();
    const resolvedDb = await db;
    const now = Date.now();
    await Promise.all(eventIndexes.map(async (idx) => {
        const evt = await getCachedEventByIndex(resolvedDb, idx, context, now);
        if (evt === undefined) {
            missing.add(idx);
        }
        else if (evt.kind === "event") {
            events.push(evt);
        }
        else {
            expiredEventRanges.push(evt);
        }
    }));
    return [
        {
            events: events,
            expiredEventRanges,
            expiredMessageRanges: [],
            latestEventIndex: undefined,
        },
        missing,
    ];
}
exports.getCachedEventsByIndex = getCachedEventsByIndex;
async function getNearestCachedEventIndexForMessageIndex(db, context, messageIndex, iterations = 0) {
    const eventIndex = await getCachedEventIndexByMessageIndex(db, context, messageIndex);
    if (eventIndex === undefined && iterations === 0 && messageIndex > 0) {
        console.debug("EV: we didn't find the event index for ", messageIndex, " recursing to look for event index for ", messageIndex - 1);
        return getNearestCachedEventIndexForMessageIndex(db, context, messageIndex - 1, iterations + 1);
    }
    return eventIndex;
}
exports.getNearestCachedEventIndexForMessageIndex = getNearestCachedEventIndexForMessageIndex;
async function getCachedEventIndexByMessageIndex(db, context, messageIndex) {
    const store = context.threadRootMessageIndex !== undefined ? "thread_events" : "chat_events";
    const cacheKey = createCacheKey(context, messageIndex);
    const cacheKeyUpperBound = createCacheKey(context, MAX_INDEX);
    const resolvedDb = await db;
    const value = await resolvedDb.getFromIndex(store, "messageIdx", IDBKeyRange.bound(cacheKey, cacheKeyUpperBound));
    if (value !== undefined &&
        value.kind === "event" &&
        value.event.kind === "message" &&
        value.event.messageIndex === messageIndex) {
        return value.index;
    }
    return undefined;
}
function mergeSuccessResponses(a, b) {
    return {
        events: [...a.events, ...b.events].sort((a, b) => getIndex(a) - getIndex(b)),
        expiredEventRanges: [...a.expiredEventRanges, ...b.expiredEventRanges],
        expiredMessageRanges: [...a.expiredMessageRanges, ...b.expiredMessageRanges],
        latestEventIndex: a.latestEventIndex === undefined && b.latestEventIndex === undefined
            ? undefined
            : Math.max(a.latestEventIndex ?? -1, b.latestEventIndex ?? -1),
    };
}
exports.mergeSuccessResponses = mergeSuccessResponses;
function getIndex(event) {
    if ("index" in event)
        return event.index;
    return event.start;
}
function makeSerialisable(ev, chatId, removeBlobs, threadRootMessageIndex) {
    if (ev.event.kind !== "message")
        return { ...ev, kind: "event", chatId: { ...chatId }, messageKey: undefined };
    return {
        ...ev,
        kind: "event",
        chatId: { ...chatId },
        messageKey: createCacheKey({ chatId, threadRootMessageIndex }, ev.event.messageIndex),
        event: {
            ...ev.event,
            content: removeBlobs ? removeBlobData(ev.event.content) : ev.event.content,
            repliesTo: removeReplyContent(ev.event.repliesTo, chatId),
        },
    };
}
function dataToBlobUrl(data, type) {
    const options = type ? { type } : undefined;
    const blob = new Blob([data], options);
    return URL.createObjectURL(blob);
}
function removeBlobData(content) {
    if ("blobData" in content && content.blobData !== undefined) {
        return {
            ...content,
            blobData: undefined,
        };
    }
    return content;
}
function removeReplyContent(repliesTo, chatId) {
    if (repliesTo?.kind === "rehydrated_reply_context") {
        return {
            kind: "raw_reply_context",
            sourceContext: (0, openchat_shared_1.chatIdentifiersEqual)(repliesTo.sourceContext.chatId, chatId)
                ? undefined
                : repliesTo.sourceContext,
            eventIndex: repliesTo.eventIndex,
        };
    }
    return repliesTo;
}
async function removeFailedMessage(db, chatId, messageId, threadRootMessageIndex) {
    const store = threadRootMessageIndex !== undefined ? "failed_thread_messages" : "failed_chat_messages";
    (await db).delete(store, createFailedCacheKey({ chatId, threadRootMessageIndex }, messageId));
}
exports.removeFailedMessage = removeFailedMessage;
async function recordFailedMessage(db, chatId, event, threadRootMessageIndex) {
    if (!(0, openchat_shared_1.canRetryMessage)(event.event.content)) {
        return;
    }
    const store = threadRootMessageIndex !== undefined ? "failed_thread_messages" : "failed_chat_messages";
    const key = createFailedCacheKey({ chatId, threadRootMessageIndex }, event.event.messageId);
    (await db).put(store, {
        ...makeSerialisable(event, chatId, false, threadRootMessageIndex),
        messageKey: key,
    }, key);
}
exports.recordFailedMessage = recordFailedMessage;
function rebuildBlobUrls(content) {
    if ((content.kind === "image_content" ||
        content.kind === "file_content" ||
        content.kind === "audio_content") &&
        content.blobData !== undefined) {
        content.blobUrl = dataToBlobUrl(content.blobData);
    }
    if (content.kind === "video_content") {
        if (content.imageData.blobData !== undefined) {
            content.imageData.blobUrl = dataToBlobUrl(content.imageData.blobData);
        }
        if (content.videoData.blobData !== undefined) {
            content.videoData.blobUrl = dataToBlobUrl(content.videoData.blobData);
        }
    }
    return content;
}
async function loadFailedMessages(db) {
    const chatMessages = await (await db).getAll("failed_chat_messages");
    const threadMessages = await (await db).getAll("failed_thread_messages");
    return [...chatMessages, ...threadMessages].reduce((res, ev) => {
        if (ev.messageKey === undefined)
            return res;
        const parsedKey = JSON.parse(ev.messageKey);
        const context = {
            chatId: parsedKey.chatId,
            threadRootMessageIndex: parsedKey.threadRootMessageIndex,
        };
        const val = res.get(context) ?? {};
        ev.event.content = rebuildBlobUrls(ev.event.content);
        val[ev.event.messageId.toString()] = ev;
        res.set(context, val);
        return res;
    }, new openchat_shared_1.MessageContextMap());
}
exports.loadFailedMessages = loadFailedMessages;
async function setCachedEvents(db, chatId, resp, threadRootMessageIndex) {
    if (resp === "events_failed")
        return;
    const store = threadRootMessageIndex !== undefined ? "thread_events" : "chat_events";
    const tx = (await db).transaction([store], "readwrite", {
        durability: "relaxed",
    });
    const eventStore = tx.objectStore(store);
    const promises = resp.events.map((event) => eventStore
        .put(makeSerialisable(event, chatId, true, threadRootMessageIndex), createCacheKey({ chatId, threadRootMessageIndex }, event.index))
        .then((_) => { }));
    if (resp.expiredEventRanges.length > 0) {
        for (const range of resp.expiredEventRanges) {
            const boundaryKeys = [createCacheKey({ chatId, threadRootMessageIndex }, range.start)];
            if (range.start !== range.end) {
                boundaryKeys.push(createCacheKey({ chatId, threadRootMessageIndex }, range.end));
            }
            promises.push(...boundaryKeys.map((k) => eventStore.put(range, k).then((_) => { })));
            if (range.start < range.end - 1) {
                promises.push(eventStore.delete(IDBKeyRange.bound(createCacheKey({ chatId, threadRootMessageIndex }, range.start + 1), createCacheKey({ chatId, threadRootMessageIndex }, range.end - 1))));
            }
        }
    }
    await Promise.all(promises);
    await tx.done;
}
exports.setCachedEvents = setCachedEvents;
function setCachedMessageFromSendResponse(db, chatId, sentEvent, threadRootMessageIndex) {
    return ([resp, message]) => {
        if (resp.kind !== "success" && resp.kind !== "transfer_success") {
            recordFailedMessage(db, chatId, sentEvent, threadRootMessageIndex);
            return [resp, message];
        }
        const event = messageToEvent(message, resp);
        setCachedMessageIfNotExists(db, chatId, event, threadRootMessageIndex);
        return [resp, event.event];
    };
}
exports.setCachedMessageFromSendResponse = setCachedMessageFromSendResponse;
async function setCachedMessageIfNotExists(db, chatId, messageEvent, threadRootMessageIndex) {
    const key = createCacheKey({ chatId, threadRootMessageIndex }, messageEvent.index);
    const store = threadRootMessageIndex !== undefined ? "thread_events" : "chat_events";
    const tx = (await db).transaction([store], "readwrite", {
        durability: "relaxed",
    });
    const eventStore = tx.objectStore(store);
    if ((await eventStore.count(key)) === 0) {
        await eventStore.add(makeSerialisable(messageEvent, chatId, true, threadRootMessageIndex), key);
    }
    await tx.done;
}
exports.setCachedMessageIfNotExists = setCachedMessageIfNotExists;
function getCachePrimerTimestamps(db) {
    return readAll(db, "cachePrimer");
}
exports.getCachePrimerTimestamps = getCachePrimerTimestamps;
async function setCachePrimerTimestamp(db, chatId, timestamp) {
    await (await db).put("cachePrimer", timestamp, (0, openchat_shared_1.chatIdentifierToString)(chatId));
}
exports.setCachePrimerTimestamp = setCachePrimerTimestamp;
function messageToEvent(message, resp) {
    let content = message.content;
    if (resp.kind === "transfer_success") {
        switch (message.content.kind) {
            case "crypto_content":
                content = { ...message.content, transfer: resp.transfer };
                break;
            case "prize_content_initial":
                content = {
                    kind: "prize_content",
                    prizesRemaining: message.content.prizes.length,
                    prizesPending: 0,
                    winners: [],
                    token: message.content.transfer.token,
                    endDate: message.content.endDate,
                    caption: message.content.caption,
                    diamondOnly: message.content.diamondOnly,
                    lifetimeDiamondOnly: message.content.lifetimeDiamondOnly,
                    uniquePersonOnly: message.content.uniquePersonOnly,
                    streakOnly: message.content.streakOnly,
                };
                break;
            case "p2p_swap_content_initial":
                content = {
                    kind: "p2p_swap_content",
                    token0: message.content.token0,
                    token0Amount: message.content.token0Amount,
                    token1: message.content.token1,
                    token1Amount: message.content.token1Amount,
                    caption: message.content.caption,
                    expiresAt: BigInt(Date.now()) + message.content.expiresIn,
                    status: { kind: "p2p_swap_open" },
                    token0TxnIn: resp.transfer.blockIndex,
                    swapId: 0,
                };
                break;
        }
    }
    return {
        event: {
            ...message,
            messageIndex: resp.messageIndex,
            content,
        },
        index: resp.eventIndex,
        timestamp: resp.timestamp,
        expiresAt: resp.expiresAt,
    };
}
async function getCachedCommunityDetails(db, communityId) {
    return (await db).get("community_details", communityId);
}
exports.getCachedCommunityDetails = getCachedCommunityDetails;
async function getCachedGroupDetails(db, chatId) {
    return (await db).get("group_details", chatId);
}
exports.getCachedGroupDetails = getCachedGroupDetails;
async function setCachedCommunityDetails(db, communityId, communityDetails) {
    await (await db).put("community_details", communityDetails, communityId);
}
exports.setCachedCommunityDetails = setCachedCommunityDetails;
async function setCachedGroupDetails(db, chatId, groupDetails) {
    await (await db).put("group_details", groupDetails, chatId);
}
exports.setCachedGroupDetails = setCachedGroupDetails;
let db;
function getDb() {
    return db;
}
exports.getDb = getDb;
function initDb(principal) {
    db = openCache(principal);
    return db;
}
exports.initDb = initDb;
function closeDb() {
    db = undefined;
}
exports.closeDb = closeDb;
async function loadMessagesByMessageIndex(db, chatId, messagesIndexes) {
    const resolvedDb = await db;
    const missing = new Set();
    const messages = [];
    await Promise.all([...messagesIndexes].map(async (msgIdx) => {
        const evt = await resolvedDb.getFromIndex("chat_events", "messageIdx", createCacheKey({ chatId }, msgIdx));
        if (evt?.kind === "event" && evt.event.kind === "message") {
            messages.push(evt);
            return evt.event;
        }
        missing.add(msgIdx);
        return undefined;
    }));
    return {
        messageEvents: messages,
        missing,
    };
}
exports.loadMessagesByMessageIndex = loadMessagesByMessageIndex;
function makeCommunitySerializable(community) {
    const channels = community.channels.map(makeChatSummarySerializable);
    const avatar = removeBlobData(community.avatar);
    const banner = removeBlobData(community.banner);
    return {
        ...community,
        channels,
        avatar,
        banner,
    };
}
function makeChatSummarySerializable(chat) {
    if (chat.latestMessage === undefined)
        return chat;
    return {
        ...chat,
        latestMessage: makeSerialisable(chat.latestMessage, chat.id, true),
    };
}
async function readAll(db, storeName) {
    const transaction = (await db).transaction([storeName]);
    const store = transaction.objectStore(storeName);
    const cursor = await store.openCursor();
    const values = {};
    while (cursor?.key !== undefined) {
        values[cursor.key] = cursor.value;
        try {
            await cursor.continue();
        }
        catch {
            break;
        }
    }
    return values;
}
async function iterateCachedEvents(db, eventIndexRange, context, startIndex, ascending, maxEvents, maxMessages, maxMissing) {
    const bound = ascending ? eventIndexRange[1] : eventIndexRange[0];
    const iterator = await EventsIterator.create(db, context, startIndex, ascending, bound);
    const events = [];
    const expiredEventRanges = [];
    const missing = new Set();
    let messageCount = 0;
    let expectedNextIndex = startIndex;
    while (events.length < maxEvents) {
        const next = await iterator.getNext();
        if (next === undefined) {
            let remainingMissingCount = Math.min(maxMessages - messageCount, maxEvents - events.length);
            if (ascending) {
                for (let i = expectedNextIndex; i <= bound; i++) {
                    missing.add(i);
                    if (--remainingMissingCount === 0)
                        break;
                }
            }
            else {
                for (let i = expectedNextIndex; i >= bound; i--) {
                    missing.add(i);
                    if (--remainingMissingCount === 0)
                        break;
                }
            }
            break;
        }
        if (ascending) {
            const [startIndex, endIndex] = next.kind === "event" ? [next.index, next.index] : [next.start, next.end];
            for (let i = expectedNextIndex; i < startIndex; i++) {
                missing.add(i);
                if (missing.size > maxMissing) {
                    break;
                }
            }
            expectedNextIndex = endIndex + 1;
        }
        else {
            const [startIndex, endIndex] = next.kind === "event" ? [next.index, next.index] : [next.end, next.start];
            for (let i = expectedNextIndex; i > startIndex; i--) {
                missing.add(i);
                if (missing.size > maxMissing) {
                    break;
                }
            }
            expectedNextIndex = endIndex - 1;
        }
        if (next.kind === "event") {
            events.push(next);
            if (next.event.kind === "message") {
                if (++messageCount == maxMessages) {
                    break;
                }
            }
        }
        else {
            expiredEventRanges.push(next);
        }
    }
    return [events, expiredEventRanges, missing];
}
function mergeRanges(left, right) {
    return {
        kind: "expired_events_range",
        start: Math.min(left.start, right.start),
        end: Math.max(left.end, right.end),
    };
}
function isContiguous(left, right) {
    if (left.start <= right.start) {
        return right.start >= left.end + 1;
    }
    else {
        return left.start <= right.end + 1;
    }
}
class EventsIterator {
    constructor(cursor, onComplete) {
        this.cursor = cursor;
        this.onComplete = onComplete;
        this.now = Date.now();
        this.current = processEventExpiry(cursor?.value, this.now);
    }
    static async create(db, messageContext, startIndex, ascending, bound) {
        if ((ascending && startIndex > bound) || (!ascending && startIndex < bound)) {
            throw new Error(`Start index exceeds bound. ${JSON.stringify({
                messageContext,
                startIndex,
                ascending,
                bound,
            })}`);
        }
        const storeName = messageContext.threadRootMessageIndex === undefined ? "chat_events" : "thread_events";
        const transaction = db.transaction([storeName]);
        const store = transaction.objectStore(storeName);
        const startKey = createCacheKey(messageContext, startIndex);
        const [lower, upper] = ascending
            ? [startKey, createCacheKey(messageContext, bound)]
            : [createCacheKey(messageContext, bound), startKey];
        const cursor = await store.openCursor(IDBKeyRange.bound(lower, upper), ascending ? "next" : "prev");
        return new EventsIterator(cursor, () => transaction.done);
    }
    async getNext() {
        const current = this.current;
        if (current === undefined) {
            return undefined;
        }
        await this.advance();
        const next = processEventExpiry(this.cursor?.value, this.now);
        if (next?.kind === "expired_events_range" &&
            current?.kind === "expired_events_range" &&
            isContiguous(current, next)) {
            this.current = mergeRanges(current, next);
            return await this.getNext();
        }
        this.current = next;
        return current;
    }
    async advance() {
        try {
            await this.cursor?.advance(1);
            return true;
        }
        catch {
            this.cursor = undefined;
            if (this.onComplete !== undefined) {
                await this.onComplete();
            }
            return false;
        }
    }
}
function processEventExpiry(event, now) {
    if (event === undefined ||
        event.kind === "expired_events_range" ||
        event.expiresAt === undefined ||
        event.expiresAt > now) {
        return event;
    }
    tryStartExpiredEventSweeper();
    return {
        kind: "expired_events_range",
        start: event.index,
        end: event.index,
    };
}
let expiredEventSweeperJob;
function tryStartExpiredEventSweeper() {
    if (expiredEventSweeperJob !== undefined)
        return;
    expiredEventSweeperJob = setTimeout(runExpiredEventSweeper, 5000);
}
async function runExpiredEventSweeper() {
    if (db === undefined)
        return;
    const transaction = (await db).transaction(["chat_events", "thread_events"], "readwrite");
    const eventsStore = transaction.objectStore("chat_events");
    const threadEventsStore = transaction.objectStore("thread_events");
    const index = eventsStore.index("expiresAt");
    const batchSize = 100;
    const expiredKeys = await index.getAllKeys(IDBKeyRange.upperBound(Date.now()), batchSize);
    async function deleteKey(key) {
        const value = await eventsStore.get(key);
        if (value?.kind !== "event") {
            return;
        }
        const promises = [eventsStore.delete(key)];
        if (value.event.kind === "message" &&
            value.event.thread !== undefined &&
            value.messageKey !== undefined) {
            const threadKey = value.messageKey.replace(/_0+/, "_");
            promises.push(threadEventsStore.delete(IDBKeyRange.bound(threadKey + "_", threadKey + "_Z")));
        }
        await Promise.all(promises);
    }
    await Promise.all(expiredKeys.map(deleteKey));
    expiredEventSweeperJob = undefined;
    if (expiredKeys.length === batchSize) {
        tryStartExpiredEventSweeper();
    }
}
async function getCachedCurrentUser(principal) {
    if (db === undefined)
        return;
    return (await db).get("currentUser", principal);
}
exports.getCachedCurrentUser = getCachedCurrentUser;
async function mergeCachedCurrentUser(principal, updated) {
    if (db === undefined)
        return;
    const current = await getCachedCurrentUser(principal);
    if (current) {
        const merged = (0, openchat_shared_1.updateCreatedUser)(current, updated);
        (await db).put("currentUser", merged, principal);
    }
}
exports.mergeCachedCurrentUser = mergeCachedCurrentUser;
async function setCachedCurrentUser(principal, user) {
    if (db === undefined)
        return;
    (await db).put("currentUser", user, principal);
}
exports.setCachedCurrentUser = setCachedCurrentUser;
async function setCurrentUserDiamondStatusInCache(principal, diamondStatus) {
    const user = await getCachedCurrentUser(principal);
    if (user === undefined || db === undefined)
        return;
    (await db).put("currentUser", {
        ...user,
        diamondStatus,
    }, principal);
}
exports.setCurrentUserDiamondStatusInCache = setCurrentUserDiamondStatusInCache;
async function getLocalUserIndexForUser(userId) {
    if (db === undefined)
        return;
    return (await db).get("localUserIndex", userId);
}
exports.getLocalUserIndexForUser = getLocalUserIndexForUser;
async function cacheLocalUserIndexForUser(userId, localUserIndex) {
    if (db === undefined)
        return localUserIndex;
    (await db).put("localUserIndex", localUserIndex, userId);
    return localUserIndex;
}
exports.cacheLocalUserIndexForUser = cacheLocalUserIndexForUser;
async function clearCache(principal) {
    const name = `openchat_db_${principal}`;
    try {
        if (db !== undefined) {
            (await db).close();
        }
        await (0, idb_1.deleteDB)(name);
        console.error("deleted db: ", name);
    }
    catch (err) {
        console.error("Unable to delete db: ", name, err);
    }
}
exports.clearCache = clearCache;
async function getCachedExternalAchievements() {
    if (db === undefined)
        return undefined;
    return (await db).get("externalAchievements", "value");
}
exports.getCachedExternalAchievements = getCachedExternalAchievements;
async function setCachedExternalAchievements(lastUpdated, achievements) {
    if (db === undefined)
        return;
    (await db).put("externalAchievements", { lastUpdated, achievements }, "value");
}
exports.setCachedExternalAchievements = setCachedExternalAchievements;
async function getActivityFeedEvents() {
    if (db === undefined)
        return [];
    const result = await (await db).get("activityFeed", "value");
    return result ?? [];
}
exports.getActivityFeedEvents = getActivityFeedEvents;
async function setActivityFeedEvents(activity) {
    if (db === undefined)
        return;
    (await db).put("activityFeed", activity, "value");
}
exports.setActivityFeedEvents = setActivityFeedEvents;
