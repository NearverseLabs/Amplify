"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteResponse = void 0;
function quoteResponse(candid) {
    if ("ok" in candid) {
        return candid.ok;
    }
    throw new Error("Unable to get quote from ICPSwap: " + JSON.stringify(candid));
}
exports.quoteResponse = quoteResponse;
