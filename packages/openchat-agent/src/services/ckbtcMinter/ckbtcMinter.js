"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CkbtcMinterClient = void 0;
const principal_1 = require("@dfinity/principal");
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const chatMappers_1 = require("../common/chatMappers");
const CKBTC_MINTER_CANISTER_ID = "mqygn-kiaaa-aaaar-qaadq-cai";
class CkbtcMinterClient extends candidService_1.CandidService {
    constructor(identity, agent) {
        super(identity, agent, CKBTC_MINTER_CANISTER_ID);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    updateBalance(userId) {
        return this.handleResponse(this.service.update_balance({
            owner: (0, chatMappers_1.apiOptional)((u) => principal_1.Principal.fromText(u), userId),
            subaccount: [],
        }), mappers_1.updateBtcBalanceResponse);
    }
}
exports.CkbtcMinterClient = CkbtcMinterClient;
