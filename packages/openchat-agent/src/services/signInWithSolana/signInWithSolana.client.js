"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInWithSolanaClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const mappers_2 = require("../signInWithEthereum/mappers");
class SignInWithSolanaClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    prepareLogin(address) {
        return this.handleResponse(this.service.siws_prepare_login(address), mappers_1.prepareLoginResponse, address);
    }
    login(signature, address, sessionKey) {
        return this.handleResponse(this.service.siws_login(signature, address, sessionKey), mappers_2.loginResponse, [signature, address, sessionKey]);
    }
    getDelegation(address, sessionKey, expiration) {
        return this.handleQueryResponse(() => this.service.siws_get_delegation(address, sessionKey, expiration), mappers_2.getDelegationResponse, [address, sessionKey, expiration]);
    }
}
exports.SignInWithSolanaClient = SignInWithSolanaClient;
