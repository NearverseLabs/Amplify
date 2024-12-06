"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryClient = void 0;
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const mapping_1 = require("../../utils/mapping");
const typebox_1 = require("../../typebox");
const chatMappersV2_1 = require("../common/chatMappersV2");
class RegistryClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId, blobUrlPattern) {
        super(identity, agent, canisterId);
        this.blobUrlPattern = blobUrlPattern;
    }
    updates(since) {
        const args = {
            since,
        };
        return this.executeMsgpackQuery("updates", args, (resp) => (0, mappers_1.updatesResponse)(resp, this.blobUrlPattern, this.canisterId), typebox_1.RegistryUpdatesArgs, typebox_1.RegistryUpdatesResponse);
    }
    addRemoveSwapProvider(swapProvider, add) {
        return this.executeMsgpackUpdate("add_remove_swap_provider", {
            swap_provider: (0, chatMappersV2_1.apiDexId)(swapProvider),
            add,
        }, (resp) => resp === "Success", typebox_1.RegistryAddRemoveSwapProviderArgs, typebox_1.RegistryAddRemoveSwapProviderResponse);
    }
    addMessageFilter(regex) {
        return this.executeMsgpackUpdate("add_message_filter", { regex }, (resp) => {
            if (typeof resp !== "string" && "Success" in resp) {
                console.log(`New message filter id: ${resp.Success}`);
                return true;
            }
            else {
                console.debug("Error calling add_message_filter", resp);
                return false;
            }
        }, typebox_1.RegistryAddMessageFilterArgs, typebox_1.RegistryAddMessageFilterResponse);
    }
    removeMessageFilter(id) {
        return this.executeMsgpackUpdate("remove_message_filter", { id }, (resp) => typeof resp === "object" && "Success" in resp, typebox_1.RegistryRemoveMessageFilterArgs, typebox_1.RegistryAddMessageFilterResponse);
    }
    setTokenEnabled(ledger, enabled) {
        return this.executeMsgpackUpdate("set_token_enabled", {
            ledger_canister_id: (0, mapping_1.principalStringToBytes)(ledger),
            enabled,
        }, (resp) => resp === "Success", typebox_1.RegistrySetTokenEnabledArgs, typebox_1.RegistrySetTokenEnabledResponse);
    }
}
exports.RegistryClient = RegistryClient;
