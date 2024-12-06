"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinNumberFailureResponseV2 = void 0;
const mapping_1 = require("../../utils/mapping");
function pinNumberFailureResponseV2(value) {
    if (value === "PinRequired") {
        return {
            kind: "pin_required",
        };
    }
    if ("PinIncorrect" in value) {
        return {
            kind: "pin_incorrect",
            nextRetryAt: value.PinIncorrect > 0n ? (0, mapping_1.durationToTimestamp)(value.PinIncorrect) : 0n,
        };
    }
    if ("TooManyFailedPinAttempts" in value) {
        return {
            kind: "too_main_failed_pin_attempts",
            nextRetryAt: (0, mapping_1.durationToTimestamp)(value.TooManyFailedPinAttempts),
        };
    }
    throw new Error("Unexpected ApiPinNumberResponse type received");
}
exports.pinNumberFailureResponseV2 = pinNumberFailureResponseV2;
