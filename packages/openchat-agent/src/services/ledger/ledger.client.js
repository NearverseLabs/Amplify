"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const principal_1 = require("@dfinity/principal");
class LedgerClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    accountBalance(principal) {
        return this.handleResponse(this.service.icrc1_balance_of({ owner: principal_1.Principal.fromText(principal), subaccount: [] }), (balance) => {
            return balance;
        });
    }
}
exports.LedgerClient = LedgerClient;
