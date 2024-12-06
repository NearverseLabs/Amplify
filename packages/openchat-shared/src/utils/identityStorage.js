"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeIdentity = exports.IdentityStorage = void 0;
const auth_client_1 = require("@dfinity/auth-client");
const identity_1 = require("@dfinity/identity");
const KEY_STORAGE_AUTH_PRINCIPAL = "auth_principal";
const KEY_STORAGE_KEY = "identity";
const KEY_STORAGE_DELEGATION = "delegation";
class IdentityStorage {
    constructor() {
        this.storage = new auth_client_1.IdbStorage({ dbName: "oc-auth-db" });
    }
    async get(authPrincipal) {
        const storedAuthPrincipal = await this.storage.get(KEY_STORAGE_AUTH_PRINCIPAL);
        if (storedAuthPrincipal == null)
            return undefined;
        if (storedAuthPrincipal !== authPrincipal) {
            this.remove();
            return undefined;
        }
        const key = await this.storage.get(KEY_STORAGE_KEY);
        if (key == null)
            return undefined;
        const chain = await this.storage.get(KEY_STORAGE_DELEGATION);
        if (chain == null)
            return undefined;
        const id = await identity_1.ECDSAKeyIdentity.fromKeyPair(key);
        return identity_1.DelegationIdentity.fromDelegation(id, identity_1.DelegationChain.fromJSON(chain));
    }
    async set(authPrincipal, key, chain) {
        await this.storage.set(KEY_STORAGE_AUTH_PRINCIPAL, authPrincipal);
        await storeIdentity(this.storage, key, chain);
    }
    async remove() {
        await this.storage.remove(KEY_STORAGE_AUTH_PRINCIPAL);
        await this.storage.remove(KEY_STORAGE_KEY);
        await this.storage.remove(KEY_STORAGE_DELEGATION);
    }
}
exports.IdentityStorage = IdentityStorage;
async function storeIdentity(storage, key, chain) {
    await storage.set(KEY_STORAGE_KEY, key.getKeyPair());
    await storage.set(KEY_STORAGE_DELEGATION, JSON.stringify(chain.toJSON()));
}
exports.storeIdentity = storeIdentity;
