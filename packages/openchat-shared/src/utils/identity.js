"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDer = exports.buildDelegationIdentity = void 0;
const identity_1 = require("@dfinity/identity");
function buildDelegationIdentity(userKey, sessionKey, delegation, signature) {
    const delegations = [
        {
            delegation,
            signature,
        },
    ];
    const delegationChain = identity_1.DelegationChain.fromDelegations(delegations, userKey.buffer);
    return identity_1.DelegationIdentity.fromDelegation(sessionKey, delegationChain);
}
exports.buildDelegationIdentity = buildDelegationIdentity;
function toDer(key) {
    return new Uint8Array(key.getPublicKey().toDer());
}
exports.toDer = toDer;
