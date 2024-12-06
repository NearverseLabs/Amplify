"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcpCoinsClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const ICPCOINS_CANISTER_ID = "u45jl-liaaa-aaaam-abppa-cai";
class IcpCoinsClient extends candidService_1.CandidService {
    constructor(identity, agent) {
        super(identity, agent, ICPCOINS_CANISTER_ID);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    exchangeRates() {
        return this.handleQueryResponse(() => this.service.get_latest(), mappers_1.getLatestResponse);
    }
}
exports.IcpCoinsClient = IcpCoinsClient;
