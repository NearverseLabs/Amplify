"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapAmountsResponse = exports.tokensResponse = void 0;
function tokensResponse(candid) {
    const tokens = [];
    if ("Ok" in candid) {
        for (const token of candid.Ok) {
            if ("IC" in token && token.IC.on_kong) {
                tokens.push(token.IC.canister_id);
            }
        }
    }
    return tokens;
}
exports.tokensResponse = tokensResponse;
function swapAmountsResponse(candid) {
    return "Ok" in candid ? candid.Ok.receive_amount : BigInt(0);
}
exports.swapAmountsResponse = swapAmountsResponse;
