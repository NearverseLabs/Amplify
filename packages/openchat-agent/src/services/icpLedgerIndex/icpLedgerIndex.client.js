"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcpLedgerIndexClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const principal_1 = require("@dfinity/principal");
const mappers_1 = require("./mappers");
const chatMappers_1 = require("../common/chatMappers");
const mapping_1 = require("../../utils/mapping");
class IcpLedgerIndexClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    getAccountTransactions(principal, fromId) {
        return this.handleQueryResponse(() => this.service.get_account_transactions({
            max_results: 100n,
            start: (0, chatMappers_1.apiOptional)(mapping_1.identity, fromId),
            account: { owner: principal_1.Principal.fromText(principal), subaccount: [] },
        }), mappers_1.accountTransactions);
    }
}
exports.IcpLedgerIndexClient = IcpLedgerIndexClient;
