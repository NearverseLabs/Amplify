"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SonicSwapsClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../../../candidService");
const mappers_1 = require("./mappers");
const principal_1 = require("@dfinity/principal");
const SONIC_INDEX_CANISTER_ID = "3xwpq-ziaaa-aaaah-qcn4a-cai";
class SonicSwapsClient extends candidService_1.CandidService {
    constructor(identity, agent) {
        super(identity, agent, SONIC_INDEX_CANISTER_ID);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    getPoolClient(_canisterId, _token0, _token1) {
        return this;
    }
    getPools() {
        return this.handleQueryResponse(this.service.getAllPairs, (resp) => (0, mappers_1.getAllPairsResponse)(resp, SONIC_INDEX_CANISTER_ID));
    }
    async quote(inputToken, outputToken, amountIn) {
        const pair = await this.handleQueryResponse(() => this.service.getPair(principal_1.Principal.fromText(inputToken), principal_1.Principal.fromText(outputToken)), mappers_1.getPairResponse);
        if (pair === undefined)
            return BigInt(0);
        const zeroForOne = pair.token0 === inputToken;
        const reserveIn = zeroForOne ? pair.reserve0 : pair.reserve1;
        const reserveOut = zeroForOne ? pair.reserve1 : pair.reserve0;
        const amountInWithFee = amountIn * BigInt(997);
        const numerator = amountInWithFee * reserveOut;
        const denominator = reserveIn * BigInt(1000) + amountInWithFee;
        return numerator / denominator;
    }
}
exports.SonicSwapsClient = SonicSwapsClient;
