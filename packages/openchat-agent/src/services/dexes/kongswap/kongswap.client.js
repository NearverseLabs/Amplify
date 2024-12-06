"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KongSwapClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../../candidService");
const mappers_1 = require("./mappers");
const KONG_SWAP_CANISTER_ID = "2ipq2-uqaaa-aaaar-qailq-cai";
class KongSwapClient extends candidService_1.CandidService {
    constructor(identity, agent) {
        super(identity, agent, KONG_SWAP_CANISTER_ID);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    getPoolClient(_canisterId, _token0, _token1) {
        return this;
    }
    async getPools() {
        const tokens = await this.handleQueryResponse(() => this.service.tokens([]), mappers_1.tokensResponse);
        const pools = [];
        for (let i = 0; i < tokens.length - 1; i++) {
            for (let j = i + 1; j < tokens.length; j++) {
                pools.push({
                    dex: "kongswap",
                    canisterId: KONG_SWAP_CANISTER_ID,
                    token0: tokens[i],
                    token1: tokens[j],
                });
            }
        }
        return pools;
    }
    quote(inputToken, outputToken, amountIn) {
        return this.handleQueryResponse(() => this.service.swap_amounts(`IC.${inputToken}`, amountIn, `IC.${outputToken}`), mappers_1.swapAmountsResponse);
    }
}
exports.KongSwapClient = KongSwapClient;
