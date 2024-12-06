"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMagicLinkResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
const mapping_1 = require("../../utils/mapping");
function generateMagicLinkResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "success",
            userKey: (0, mapping_1.consolidateBytes)(candid.Success.user_key),
            code: candid.Success.code,
            expiration: candid.Success.expiration,
        };
    }
    if ("EmailInvalid" in candid) {
        return {
            kind: "email_invalid",
        };
    }
    if ("Blocked" in candid) {
        return {
            kind: "blocked",
            duration: Number(candid.Blocked),
        };
    }
    if ("FailedToSendEmail" in candid) {
        return {
            kind: "failed_to_send_email",
            error: candid.FailedToSendEmail,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiGenerateMagicLinkResponse type received", candid);
}
exports.generateMagicLinkResponse = generateMagicLinkResponse;
