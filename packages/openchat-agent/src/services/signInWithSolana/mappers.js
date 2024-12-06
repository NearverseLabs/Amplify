"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareLoginResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
function prepareLoginResponse(candid) {
    if ("Ok" in candid) {
        return {
            kind: "success",
            siwsMessage: {
                uri: candid.Ok.uri,
                issuedAt: candid.Ok.issued_at,
                domain: candid.Ok.domain,
                statement: candid.Ok.statement,
                version: candid.Ok.version,
                chainId: candid.Ok.chain_id,
                address: candid.Ok.address,
                nonce: candid.Ok.nonce,
                expirationTime: candid.Ok.expiration_time,
            },
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
