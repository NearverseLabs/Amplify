"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestResponse = void 0;
function getLatestResponse(candid) {
    const exchangeRates = {};
    for (const row of candid) {
        const [_pair, pairText, rate] = row;
        const [from, to] = parseSymbolPair(pairText);
        if (to === "usd") {
            exchangeRates[from] = { ...exchangeRates[from], toUSD: rate };
        }
        else if (to === "icp") {
            exchangeRates[from] = { ...exchangeRates[from], toICP: rate };
        }
    }
    exchangeRates["icp"] = { ...exchangeRates["icp"], toICP: 1 };
    const icpToUsd = exchangeRates["icp"]["toUSD"];
    if (icpToUsd !== undefined) {
        exchangeRates["ckusdc"] = { toICP: 1 / icpToUsd, toUSD: 1 };
    }
    return exchangeRates;
}
exports.getLatestResponse = getLatestResponse;
function parseSymbolPair(pair) {
    const parts = pair.split("/");
    return [parts[0].toLowerCase(), parts[1].toLowerCase()];
}
