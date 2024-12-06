"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInWithEmailClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const mappers_2 = require("../identity/mappers");
class SignInWithEmailClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    generateMagicLink(email, sessionKey) {
        const args = { email, session_key: sessionKey, max_time_to_live: [] };
        return this.handleResponse(this.service.generate_magic_link(args), mappers_1.generateMagicLinkResponse, args);
    }
    getDelegation(email, sessionKey, expiration) {
        const args = {
            email,
            session_key: sessionKey,
            expiration,
        };
        return this.handleQueryResponse(() => this.service.get_delegation(args), mappers_2.getDelegationResponse, args);
    }
}
exports.SignInWithEmailClient = SignInWithEmailClient;
