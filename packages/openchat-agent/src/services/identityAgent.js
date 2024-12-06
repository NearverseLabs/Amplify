"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityAgent = void 0;
const identity_client_1 = require("./identity/identity.client");
const openchat_shared_1 = require("openchat-shared");
const httpAgent_1 = require("../utils/httpAgent");
class IdentityAgent {
    constructor(identity, agent, identityCanister, isIIPrincipal) {
        this._identityClient = new identity_client_1.IdentityClient(identity, agent, identityCanister);
        this._isIIPrincipal = isIIPrincipal;
    }
    static async create(identity, identityCanister, icUrl, isIIPrincipal) {
        const agent = await (0, httpAgent_1.createHttpAgent)(identity, icUrl);
        return new IdentityAgent(identity, agent, identityCanister, isIIPrincipal);
    }
    checkOpenChatIdentityExists() {
        return this._identityClient.checkAuthPrincipal().then((resp) => resp.kind === "success");
    }
    async createOpenChatIdentity(sessionKey, challengeAttempt) {
        const sessionKeyDer = (0, openchat_shared_1.toDer)(sessionKey);
        const createIdentityResponse = await this._identityClient.createIdentity(sessionKeyDer, this._isIIPrincipal, challengeAttempt);
        if (createIdentityResponse.kind === "success") {
            const delegation = await this.getDelegation(createIdentityResponse.userKey, sessionKey, sessionKeyDer, createIdentityResponse.expiration);
            if (delegation === undefined) {
                throw new Error("Delegation not found, this should never happen");
            }
            return delegation;
        }
        return createIdentityResponse.kind;
    }
    async getOpenChatIdentity(sessionKey) {
        const sessionKeyDer = (0, openchat_shared_1.toDer)(sessionKey);
        const prepareDelegationResponse = await this._identityClient.prepareDelegation(sessionKeyDer, this._isIIPrincipal);
        return prepareDelegationResponse.kind === "success"
            ? this.getDelegation(prepareDelegationResponse.userKey, sessionKey, sessionKeyDer, prepareDelegationResponse.expiration)
            : undefined;
    }
    generateChallenge() {
        return this._identityClient.generateChallenge();
    }
    initiateIdentityLink(linkToPrincipal) {
        return this._identityClient.initiateIdentityLink(linkToPrincipal, this._isIIPrincipal);
    }
    approveIdentityLink(linkInitiatedBy) {
        return this._identityClient.approveIdentityLink(linkInitiatedBy);
    }
    getAuthenticationPrincipals() {
        return this._identityClient.getAuthenticationPrincipals();
    }
    async getDelegation(userKey, sessionKey, sessionKeyDer, expiration) {
        const getDelegationResponse = await this._identityClient.getDelegation(sessionKeyDer, expiration);
        if (getDelegationResponse.kind !== "success") {
            return undefined;
        }
        return (0, openchat_shared_1.buildDelegationIdentity)(userKey, sessionKey, getDelegationResponse.delegation, getDelegationResponse.signature);
    }
}
exports.IdentityAgent = IdentityAgent;
