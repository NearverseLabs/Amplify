"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDelegationResponse = exports.loginResponse = exports.prepareLoginResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
const mappers_1 = require("../identity/mappers");
const mapping_1 = require("../../utils/mapping");
function prepareLoginResponse(candid) {
    if ("Ok" in candid) {
        return {
            kind: "success",
            siweMessage: candid.Ok,
        };
    }
    if ("Err" in candid) {
        return {
            kind: "error",
            error: candid.Err,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiPrepareLoginResponse type received", candid);
}
exports.prepareLoginResponse = prepareLoginResponse;
function loginResponse(candid) {
    if ("Ok" in candid) {
        return {
            kind: "success",
            userKey: (0, mapping_1.consolidateBytes)(candid.Ok.user_canister_pubkey),
            expiration: candid.Ok.expiration,
        };
    }
    if ("Err" in candid) {
        return { kind: "error", error: candid.Err };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiLoginResponse type received", candid);
}
exports.loginResponse = loginResponse;
function getDelegationResponse(candid) {
    if ("Ok" in candid) {
        return (0, mappers_1.signedDelegation)(candid.Ok);
    }
    if ("Err" in candid) {
        return {
            kind: "error",
            error: candid.Err,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiGetDelegationResponse type received", candid);
}
exports.getDelegationResponse = getDelegationResponse;
