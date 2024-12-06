"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolsResponse = void 0;
function getPoolsResponse(candid) {
    if ("ok" in candid) {
        return candid.ok
            .filter((p) => isStandardSupported(p.token0.standard) &&
            isStandardSupported(p.token1.standard))
            .map((p) => ({
            dex: "icpswap",
            dexName: "ICPSwap",
            canisterId: p.canisterId.toString(),
            token0: p.token0.address,
            token1: p.token1.address,
        }));
    }
    throw new Error("Unable to get pools from ICPSwap: " + JSON.stringify(candid));
}
exports.getPoolsResponse = getPoolsResponse;
function isStandardSupported(standard) {
    return standard === "ICP" || standard.includes("ICRC");
}
