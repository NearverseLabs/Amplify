"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signedDelegation = exports.getPrincipal = exports.getIdentity = void 0;
const auth_client_1 = require("@dfinity/auth-client");
const auth = auth_client_1.AuthClient.create({
    idleOptions: {
        disableIdle: true,
    },
    storage: new auth_client_1.IdbStorage(),
});
function getIdentity() {
    return auth.then((a) => {
        const id = a.getIdentity();
        const p = id.getPrincipal();
        if (p.isAnonymous()) {
            return undefined;
        }
        return id;
    });
}
exports.getIdentity = getIdentity;
function getPrincipal() {
    return auth.then((a) => {
        return a.getIdentity().getPrincipal();
    });
}
exports.getPrincipal = getPrincipal;
function signedDelegation(chain) {
    const delegation = chain.delegations[0];
    return {
        signature: new Uint8Array(delegation.signature),
        delegation: {
            pubkey: new Uint8Array(delegation.delegation.pubkey),
            expiration: delegation.delegation.expiration,
        },
    };
}
exports.signedDelegation = signedDelegation;
