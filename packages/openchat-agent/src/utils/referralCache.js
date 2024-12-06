"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.getCommunityReferral = exports.deleteCommunityReferral = exports.setCommunityReferral = exports.lazyOpenReferralCache = void 0;
const idb_1 = require("idb");
const CACHE_VERSION = 2;
let db;
function lazyOpenReferralCache() {
    if (db)
        return db;
    console.log("referral db undefined, opening db");
    db = openReferralCache();
    return db;
}
exports.lazyOpenReferralCache = lazyOpenReferralCache;
function openReferralCache() {
    return (0, idb_1.openDB)(`openchat_referrals`, CACHE_VERSION, {
        upgrade(db, _oldVersion, _newVersion, _transaction) {
            if (db.objectStoreNames.contains("community_referrals")) {
                db.deleteObjectStore("community_referrals");
            }
            db.createObjectStore("community_referrals");
        },
    });
}
async function setCommunityReferral(communityId, userId, timestamp) {
    const resolvedDb = await lazyOpenReferralCache();
    await resolvedDb.put("community_referrals", { userId, timestamp }, communityId);
}
exports.setCommunityReferral = setCommunityReferral;
async function deleteCommunityReferral(communityId) {
    const resolvedDb = await lazyOpenReferralCache();
    resolvedDb.delete("community_referrals", communityId);
}
exports.deleteCommunityReferral = deleteCommunityReferral;
async function getCommunityReferral(communityId, timestamp) {
    const resolvedDb = await lazyOpenReferralCache();
    const referral = await resolvedDb.get("community_referrals", communityId);
    if (referral) {
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
        if (timestamp - referral.timestamp > oneWeekInMs) {
            return undefined;
        }
        return referral.userId;
    }
    return undefined;
}
exports.getCommunityReferral = getCommunityReferral;
async function clearCache() {
    const name = `openchat_referrals`;
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
