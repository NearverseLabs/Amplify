"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmailSignInSession = exports.getEmailSignInSession = exports.storeEmailSignInSession = void 0;
const identity_1 = require("@dfinity/identity");
const KEY_STORAGE_EMAIL_LINK = "email_link";
const KEY_STORAGE_EMAIL_LINK_CONTEXT = "email_link_context";
async function storeEmailSignInSession(storage, session) {
    await storage.set(KEY_STORAGE_EMAIL_LINK, session.key.getKeyPair());
    await storage.set(KEY_STORAGE_EMAIL_LINK_CONTEXT, JSON.stringify({
        email: session.email,
        userKey: Array.from(session.userKey),
        expiration: session.expiration.toString(),
    }));
}
exports.storeEmailSignInSession = storeEmailSignInSession;
async function getEmailSignInSession(storage) {
    const keyPair = (await storage.get(KEY_STORAGE_EMAIL_LINK));
    if (keyPair == null)
        return undefined;
    const contextString = (await storage.get(KEY_STORAGE_EMAIL_LINK_CONTEXT));
    if (contextString == null)
        return undefined;
    const key = await identity_1.ECDSAKeyIdentity.fromKeyPair(keyPair);
    const context = JSON.parse(contextString);
    return {
        key,
        email: context.email,
        userKey: Uint8Array.from(context.userKey),
        expiration: BigInt(context.expiration),
    };
}
exports.getEmailSignInSession = getEmailSignInSession;
async function removeEmailSignInSession(storage) {
    storage.remove(KEY_STORAGE_EMAIL_LINK);
    storage.remove(KEY_STORAGE_EMAIL_LINK_CONTEXT);
}
exports.removeEmailSignInSession = removeEmailSignInSession;
