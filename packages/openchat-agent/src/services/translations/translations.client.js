"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
class TranslationsClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.translationService = this.createServiceClient(idl_1.idlFactory);
    }
    propose(locale, key, value) {
        return this.handleResponse(this.translationService.propose({
            key,
            locale,
            value,
        }), mappers_1.proposeResponse);
    }
    approve(id) {
        return this.handleResponse(this.translationService.approve({
            id,
        }), mappers_1.approveResponse);
    }
    reject(id, reason) {
        return this.handleResponse(this.translationService.reject({
            id,
            reason: (0, mappers_1.apiRejectReason)(reason),
        }), mappers_1.rejectResponse);
    }
    markDeployed() {
        return this.handleResponse(this.translationService.mark_deployed({
            latest_approval: BigInt(Date.now()),
        }), mappers_1.markDeployedResponse);
    }
    proposed() {
        return this.handleQueryResponse(() => this.translationService.proposed({}), mappers_1.proposedResponse);
    }
    pendingDeployment() {
        return this.handleQueryResponse(() => this.translationService.pending_deployment({}), mappers_1.pendingDeploymentResponse);
    }
}
exports.TranslationsClient = TranslationsClient;
