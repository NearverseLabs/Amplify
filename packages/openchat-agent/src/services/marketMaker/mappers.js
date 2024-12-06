"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfigResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
function updateConfigResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    if ("ExchangeNotFound" in candid) {
        return "exchange_not_found";
    }
    if ("NotAuthorized" in candid) {
        return "not_authorized";
    }
    if ("InternalError" in candid) {
        return "internal_error";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiRole type received", candid);
}
exports.updateConfigResponse = updateConfigResponse;
