"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.setChitInfoInCache = exports.setSuspendedUsersSyncedUpTo = exports.getSuspendedUsersSyncedUpTo = exports.setUserDiamondStatusInCache = exports.setDisplayNameInCache = exports.setUsernameInCache = exports.writeCachedUsersToDatabase = exports.setCachedDeletedUserIds = exports.setCachedUsers = exports.getCachedDeletedUserIds = exports.getAllUsers = exports.getCachedUsers = exports.lazyOpenUserCache = void 0;
const idb_1 = require("idb");
const openchat_shared_1 = require("openchat-shared");
const CACHE_VERSION = 11;
let db;
function lazyOpenUserCache() {
    if (db)
        return db;
    console.log("user db undefined, opening db");
    db = openUserCache();
    return db;
}
exports.lazyOpenUserCache = lazyOpenUserCache;
function openUserCache() {
    return (0, idb_1.openDB)(`openchat_users`, CACHE_VERSION, {
        upgrade(db, _oldVersion, _newVersion, _transaction) {
            if (db.objectStoreNames.contains("users")) {
                db.deleteObjectStore("users");
            }
            if (db.objectStoreNames.contains("suspendedUsersSyncedUpTo")) {
                db.deleteObjectStore("suspendedUsersSyncedUpTo");
            }
            if (db.objectStoreNames.contains("deletedUserIds")) {
                db.deleteObjectStore("deletedUserIds");
            }
            db.createObjectStore("users");
            db.createObjectStore("suspendedUsersSyncedUpTo");
            db.createObjectStore("deletedUserIds");
        },
    });
}
async function getCachedUsers(userIds) {
    const resolvedDb = await lazyOpenUserCache();
    const fromCache = await Promise.all(userIds.map((u) => resolvedDb.get("users", u)));
    return fromCache.reduce((users, next) => {
        if (next !== undefined)
            users.push(next);
        return users;
    }, []);
}
exports.getCachedUsers = getCachedUsers;
async function getAllUsers() {
    const users = await (await lazyOpenUserCache()).getAll("users");
    const deleted = await getDeletedUserIdsList();
    const userIds = new Set(users.map((u) => u.userId));
    const reallyDeleted = deleted.filter((u) => !userIds.has(u));
    return [...users, ...reallyDeleted.map(openchat_shared_1.deletedUser)];
}
exports.getAllUsers = getAllUsers;
async function getDeletedUserIdsList() {
    return (await lazyOpenUserCache()).getAll("deletedUserIds");
}
async function getCachedDeletedUserIds() {
    return getDeletedUserIdsList().then((list) => new Set(list));
}
exports.getCachedDeletedUserIds = getCachedDeletedUserIds;
async function setCachedUsers(users) {
    if (users.length === 0)
        return;
    writeCachedUsersToDatabase(lazyOpenUserCache(), users);
}
exports.setCachedUsers = setCachedUsers;
async function setCachedDeletedUserIds(deletedUserIds) {
    if (deletedUserIds.size === 0)
        return;
    const db = await lazyOpenUserCache();
    const tx = (await db).transaction(["deletedUserIds", "users"], "readwrite", {
        durability: "relaxed",
    });
    const deletedStore = tx.objectStore("deletedUserIds");
    const userStore = tx.objectStore("users");
    const inserts = [...deletedUserIds].map((userId) => deletedStore.put(userId, userId));
    const deletes = [...deletedUserIds].map((userId) => userStore.delete(userId));
    Promise.all([...inserts, ...deletes]);
    await tx.done;
}
exports.setCachedDeletedUserIds = setCachedDeletedUserIds;
async function writeCachedUsersToDatabase(db, users) {
    const tx = (await db).transaction("users", "readwrite", {
        durability: "relaxed",
    });
    const store = tx.objectStore("users");
    Promise.all(users.map((u) => store.put(u, u.userId)));
    await tx.done;
}
exports.writeCachedUsersToDatabase = writeCachedUsersToDatabase;
async function setUsernameInCache(userId, username) {
    const tx = (await lazyOpenUserCache()).transaction("users", "readwrite", {
        durability: "relaxed",
    });
    const store = tx.objectStore("users");
    const user = await store.get(userId);
    if (user !== undefined) {
        user.username = username;
        await store.put(user, userId);
    }
    await tx.done;
}
exports.setUsernameInCache = setUsernameInCache;
async function setDisplayNameInCache(userId, displayName) {
    const tx = (await lazyOpenUserCache()).transaction("users", "readwrite", {
        durability: "relaxed",
    });
    const store = tx.objectStore("users");
    const user = await store.get(userId);
    if (user !== undefined) {
        user.displayName = displayName;
        await store.put(user, userId);
    }
    await tx.done;
}
exports.setDisplayNameInCache = setDisplayNameInCache;
async function setUserDiamondStatusInCache(userId, status) {
    const tx = (await lazyOpenUserCache()).transaction("users", "readwrite", {
        durability: "relaxed",
    });
    const store = tx.objectStore("users");
    const user = await store.get(userId);
    if (user !== undefined) {
        user.diamondStatus = status.kind;
        await store.put(user, userId);
    }
    await tx.done;
}
exports.setUserDiamondStatusInCache = setUserDiamondStatusInCache;
async function getSuspendedUsersSyncedUpTo() {
    const resolvedDb = await lazyOpenUserCache();
    return await resolvedDb.get("suspendedUsersSyncedUpTo", "value");
}
exports.getSuspendedUsersSyncedUpTo = getSuspendedUsersSyncedUpTo;
async function setSuspendedUsersSyncedUpTo(value) {
    const resolvedDb = await lazyOpenUserCache();
    await resolvedDb.put("suspendedUsersSyncedUpTo", value, "value");
}
exports.setSuspendedUsersSyncedUpTo = setSuspendedUsersSyncedUpTo;
async function setChitInfoInCache(userId, chitBalance, streak) {
    const tx = (await lazyOpenUserCache()).transaction("users", "readwrite", {
        durability: "relaxed",
    });
    const store = tx.objectStore("users");
    const user = await store.get(userId);
    if (user !== undefined) {
        user.chitBalance = chitBalance;
        user.streak = streak;
        await store.put(user, userId);
    }
    await tx.done;
}
exports.setChitInfoInCache = setChitInfoInCache;
async function clearCache() {
    const name = `openchat_users`;
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
