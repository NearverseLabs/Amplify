"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCachedRegistry = exports.getCachedRegistry = exports.lazyOpenRegistryCache = void 0;
const idb_1 = require("idb");
const CACHE_VERSION = 13;
const KEY = "registry";
let db;
function lazyOpenRegistryCache() {
    if (db)
        return db;
    console.log("registry db undefined, opening db");
    db = openRegistryCache();
    return db;
}
exports.lazyOpenRegistryCache = lazyOpenRegistryCache;
function openRegistryCache() {
    return (0, idb_1.openDB)(`openchat_registry`, CACHE_VERSION, {
        upgrade(db, _oldVersion, _newVersion, _transaction) {
            if (db.objectStoreNames.contains("registry")) {
                db.deleteObjectStore("registry");
            }
            db.createObjectStore("registry");
        },
    });
}
async function getCachedRegistry() {
    const resolvedDb = await lazyOpenRegistryCache();
    return await resolvedDb.get(KEY, KEY);
}
exports.getCachedRegistry = getCachedRegistry;
async function setCachedRegistry(value) {
    const resolvedDb = await lazyOpenRegistryCache();
    await resolvedDb.put(KEY, value, KEY);
}
exports.setCachedRegistry = setCachedRegistry;
