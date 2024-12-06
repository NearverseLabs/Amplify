"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCanisterResponseError = exports.ReplicaNotUpToDateError = void 0;
const openchat_shared_1 = require("openchat-shared");
const openchat_shared_2 = require("openchat-shared");
class ReplicaNotUpToDateError extends Error {
    static byTimestamp(replicaTimestamp, clientTimestamp, failedPostCheck) {
        const message = `Replica not up to date (timestamp). Client: ${clientTimestamp}. Replica: ${replicaTimestamp}. FailedPostCheck: ${failedPostCheck}`;
        return new ReplicaNotUpToDateError(message);
    }
    constructor(message) {
        super(message);
    }
}
exports.ReplicaNotUpToDateError = ReplicaNotUpToDateError;
function responseTooLarge(error) {
    const regex = /application payload size \((\d+)\) cannot be larger than (\d+)/;
    const match = error.message.match(regex);
    if (match) {
        const size = parseInt(match[1]);
        const maxSize = parseInt(match[2]);
        return new openchat_shared_1.ResponseTooLargeError(error, size, maxSize);
    }
    return undefined;
}
function toCanisterResponseError(error, identity) {
    if (error instanceof ReplicaNotUpToDateError) {
        return error;
    }
    let code = 500;
    if (error.message.includes("DestinationInvalid")) {
        return new openchat_shared_2.DestinationInvalidError(error);
    }
    const tooLarge = responseTooLarge(error);
    if (tooLarge) {
        return tooLarge;
    }
    const statusLine = error.message
        .split("\n")
        .map((l) => l.trim().toLowerCase())
        .find((l) => l.startsWith("code:") || l.startsWith("http status code:"));
    if (statusLine) {
        const parts = statusLine.split(":");
        if (parts && parts.length > 1) {
            let valueText = parts[1].trim();
            const valueParts = valueText.split(" ");
            if (valueParts && valueParts.length > 1) {
                valueText = valueParts[0].trim();
            }
            code = parseInt(valueText, 10);
            if (isNaN(code)) {
                code = 500;
            }
        }
    }
    if (code === 400 && (0, openchat_shared_2.getTimeUntilSessionExpiryMs)(identity) < 0) {
        console.debug("SESSION: we received a 400 response and the session has timed out: ", (0, openchat_shared_2.getTimeUntilSessionExpiryMs)(identity));
        return new openchat_shared_2.SessionExpiryError(code, error);
    }
    if (code === 403 && error.message.includes("Invalid delegation")) {
        return new openchat_shared_2.InvalidDelegationError(error);
    }
    return code === 401 || code === 403 ? new openchat_shared_2.AuthError(code, error) : new openchat_shared_2.HttpError(code, error);
}
exports.toCanisterResponseError = toCanisterResponseError;
