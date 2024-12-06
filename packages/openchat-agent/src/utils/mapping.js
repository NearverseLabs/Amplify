"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.durationToTimestamp = exports.bytesToBigint = exports.bigintToBytes = exports.maybePrincipalStringToBytes = exports.principalStringToBytes = exports.principalBytesToString = exports.bytesToHexString = exports.consolidateBytes = exports.hexStringToBytes = exports.toVoid = exports.identity = exports.apiOptionUpdateV2 = exports.apiOptionUpdate = exports.optionUpdateV2 = exports.optionUpdate = exports.mapOptional = exports.optional = void 0;
const openchat_shared_1 = require("openchat-shared");
const principal_1 = require("@dfinity/principal");
function optional(candid, mapper) {
    return candid[0] !== undefined ? mapper(candid[0]) : undefined;
}
exports.optional = optional;
function mapOptional(input, mapper) {
    return input != null ? mapper(input) : undefined;
}
exports.mapOptional = mapOptional;
function optionUpdate(candid, mapper) {
    if ("NoChange" in candid)
        return undefined;
    if ("SetToNone" in candid)
        return "set_to_none";
    if ("SetToSome" in candid)
        return { value: mapper(candid.SetToSome) };
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiOptionUpdate type returned", candid);
}
exports.optionUpdate = optionUpdate;
function optionUpdateV2(value, mapper) {
    if (value === "NoChange")
        return undefined;
    if (value === "SetToNone")
        return "set_to_none";
    if ("SetToSome" in value)
        return { value: mapper(value.SetToSome) };
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiOptionUpdate type returned", value);
}
exports.optionUpdateV2 = optionUpdateV2;
function apiOptionUpdate(mapper, domain) {
    if (domain === undefined)
        return { NoChange: null };
    if (domain === "set_to_none")
        return { SetToNone: null };
    return { SetToSome: mapper(domain.value) };
}
exports.apiOptionUpdate = apiOptionUpdate;
function apiOptionUpdateV2(mapper, domain) {
    if (domain === undefined)
        return "NoChange";
    if (domain === "set_to_none")
        return "SetToNone";
    return { SetToSome: mapper(domain.value) };
}
exports.apiOptionUpdateV2 = apiOptionUpdateV2;
function identity(x) {
    return x;
}
exports.identity = identity;
function toVoid(_x) {
    return;
}
exports.toVoid = toVoid;
function hexStringToBytes(hex) {
    const bytes = [];
    for (let c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return new Uint8Array(bytes);
}
exports.hexStringToBytes = hexStringToBytes;
function consolidateBytes(bytes) {
    return Array.isArray(bytes) ? new Uint8Array(bytes) : bytes;
}
exports.consolidateBytes = consolidateBytes;
function bytesToHexString(bytes) {
    return consolidateBytes(bytes).reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
}
exports.bytesToHexString = bytesToHexString;
function principalBytesToString(bytes) {
    return principal_1.Principal.fromUint8Array(bytes).toString();
}
exports.principalBytesToString = principalBytesToString;
function principalStringToBytes(principal) {
    return principal_1.Principal.fromText(principal).toUint8Array();
}
exports.principalStringToBytes = principalStringToBytes;
function maybePrincipalStringToBytes(principal) {
    if (principal === undefined)
        return undefined;
    try {
        return principalStringToBytes(principal);
    }
    catch (err) {
        console.warn("Unable to convert principal string to bytes", principal, err);
    }
    return undefined;
}
exports.maybePrincipalStringToBytes = maybePrincipalStringToBytes;
function bigintToBytes(value) {
    return hexStringToBytes(value.toString(16));
}
exports.bigintToBytes = bigintToBytes;
function bytesToBigint(bytes) {
    return BigInt("0x" + bytesToHexString(bytes));
}
exports.bytesToBigint = bytesToBigint;
function durationToTimestamp(duration) {
    return BigInt(Date.now() + Number(duration));
}
exports.durationToTimestamp = durationToTimestamp;
