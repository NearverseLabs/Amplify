"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeUntilSessionExpiryMs = void 0;
function getTimeUntilSessionExpiryMs(identity) {
    if (!("getDelegation" in identity)) {
        return 0;
    }
    const expiryDateTimestampMs = Number(identity
        .getDelegation()
        .delegations.map((d) => d.delegation.expiration)
        .reduce((current, next) => (next < current ? next : current)) / BigInt(1000000));
    return expiryDateTimestampMs - Date.now();
}
exports.getTimeUntilSessionExpiryMs = getTimeUntilSessionExpiryMs;
