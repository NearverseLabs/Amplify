"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPairResponse = exports.getAllPairsResponse = void 0;
const mapping_1 = require("../../../../utils/mapping");
function getAllPairsResponse(candid, canisterId) {
    return candid.map((p) => ({
        dex: "sonic",
        canisterId,
        token0: p.token0,
        token1: p.token1,
    }));
}
exports.getAllPairsResponse = getAllPairsResponse;
function getPairResponse(candid) {
    return (0, mapping_1.optional)(candid, pair);
}
exports.getPairResponse = getPairResponse;
function pair(candid) {
    return {
        token0: candid.token0,
        reserve0: candid.reserve0,
        token1: candid.token1,
        reserve1: candid.reserve1,
    };
}
