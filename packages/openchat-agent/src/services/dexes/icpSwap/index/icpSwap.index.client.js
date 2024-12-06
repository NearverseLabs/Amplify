"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcpSwapIndexClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../../../candidService");
const mappers_1 = require("./mappers");
const icpSwap_pool_client_1 = require("../pool/icpSwap.pool.client");
const ICPSWAP_INDEX_CANISTER_ID = "4mmnk-kiaaa-aaaag-qbllq-cai";
class IcpSwapIndexClient extends candidService_1.CandidService {
    constructor(identity, agent) {
        super(identity, agent, ICPSWAP_INDEX_CANISTER_ID);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    getPoolClient(canisterId, token0, token1) {
        return new icpSwap_pool_client_1.IcpSwapPoolClient(this.identity, this.agent, canisterId, token0, token1);
    }
    getPools() {
        return this.handleQueryResponse(this.service.getPools, mappers_1.getPoolsResponse);
    }
}
exports.IcpSwapIndexClient = IcpSwapIndexClient;
