"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const chatMappers_1 = require("../common/chatMappers");
const mapping_1 = require("../../utils/mapping");
const principal_1 = require("@dfinity/principal");
const id_1 = require("../../utils/id");
class IdentityClient extends candidService_1.CandidService {
    constructor(identity, agent, identityCanister) {
        super(identity, agent, identityCanister);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    createIdentity(sessionKey, isIIPrincipal, challengeAttempt) {
        const args = {
            public_key: this.publicKey(),
            session_key: sessionKey,
            is_ii_principal: (0, chatMappers_1.apiOptional)(mapping_1.identity, isIIPrincipal),
            max_time_to_live: [],
            challenge_attempt: (0, chatMappers_1.apiOptional)(mapping_1.identity, challengeAttempt),
        };
        return this.handleResponse(this.service.create_identity(args), mappers_1.createIdentityResponse, args);
    }
    checkAuthPrincipal() {
        return this.handleQueryResponse(() => this.service.check_auth_principal({}), mappers_1.checkAuthPrincipalResponse, {});
    }
    prepareDelegation(sessionKey, isIIPrincipal) {
        const args = {
            session_key: sessionKey,
            is_ii_principal: (0, chatMappers_1.apiOptional)(mapping_1.identity, isIIPrincipal),
            max_time_to_live: [],
        };
        return this.handleResponse(this.service.prepare_delegation(args), mappers_1.prepareDelegationResponse, args);
    }
    getDelegation(sessionKey, expiration) {
        const args = {
            session_key: sessionKey,
            expiration,
        };
        return this.handleQueryResponse(() => this.service.get_delegation(args), mappers_1.getDelegationResponse, args);
    }
    generateChallenge() {
        return this.handleResponse(this.service.generate_challenge({}), mappers_1.generateChallengeResponse);
    }
    initiateIdentityLink(linkToPrincipal, isIIPrincipal) {
        return this.handleResponse(this.service.initiate_identity_link({
            link_to_principal: principal_1.Principal.fromText(linkToPrincipal),
            public_key: this.publicKey(),
            is_ii_principal: (0, chatMappers_1.apiOptional)(mapping_1.identity, isIIPrincipal),
        }), mappers_1.initiateIdentityLinkResponse);
    }
    approveIdentityLink(linkInitiatedBy) {
        return this.handleResponse(this.service.approve_identity_link({
            link_initiated_by: principal_1.Principal.fromText(linkInitiatedBy),
            public_key: this.publicKey(),
            delegation: (0, id_1.signedDelegation)(this.identity.getDelegation()),
        }), mappers_1.approveIdentityLinkResponse);
    }
    getAuthenticationPrincipals() {
        return this.handleQueryResponse(() => this.service.auth_principals({}), mappers_1.authPrincipalsResponse);
    }
    publicKey() {
        return new Uint8Array(this.identity.getPublicKey().toDer());
    }
}
exports.IdentityClient = IdentityClient;
