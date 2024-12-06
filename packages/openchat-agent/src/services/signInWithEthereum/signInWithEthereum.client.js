"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInWithEthereumClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
class SignInWithEthereumClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    prepareLogin(address) {
        return this.handleResponse(this.service.siwe_prepare_login(address), mappers_1.prepareLoginResponse, address);
    }
    login(signature, address, sessionKey) {
        return this.handleResponse(this.service.siwe_login(signature, address, sessionKey), mappers_1.loginResponse, [signature, address, sessionKey]);
    }
    getDelegation(address, sessionKey, expiration) {
        return this.handleQueryResponse(() => this.service.siwe_get_delegation(address, sessionKey, expiration), mappers_1.getDelegationResponse, [address, sessionKey, expiration]);
    }
}
exports.SignInWithEthereumClient = SignInWithEthereumClient;
