"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveIdentityLinkResponse = exports.authPrincipalsResponse = exports.initiateIdentityLinkResponse = exports.generateChallengeResponse = exports.signedDelegation = exports.getDelegationResponse = exports.prepareDelegationResponse = exports.checkAuthPrincipalResponse = exports.createIdentityResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
const mapping_1 = require("../../utils/mapping");
const identity_1 = require("@dfinity/identity");
function createIdentityResponse(candid) {
    if ("Success" in candid) {
        return prepareDelegationSuccess(candid.Success);
    }
    if ("AlreadyRegistered" in candid) {
        return { kind: "already_registered" };
    }
    if ("PublicKeyInvalid" in candid) {
        return { kind: "public_key_invalid" };
    }
    if ("OriginatingCanisterInvalid" in candid) {
        return { kind: "originating_canister_invalid" };
    }
    if ("ChallengeFailed" in candid) {
        return { kind: "challenge_failed" };
    }
    if ("ChallengeRequired" in candid) {
        return { kind: "challenge_required" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiCreateIdentityResponse type received", candid);
}
exports.createIdentityResponse = createIdentityResponse;
function checkAuthPrincipalResponse(candid) {
    if ("Success" in candid) {
        return { kind: "success" };
    }
    if ("NotFound" in candid) {
        return { kind: "not_found" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiCheckAuthPrincipalResponse type received", candid);
}
exports.checkAuthPrincipalResponse = checkAuthPrincipalResponse;
function prepareDelegationResponse(candid) {
    if ("Success" in candid) {
        return prepareDelegationSuccess(candid.Success);
    }
    if ("NotFound" in candid) {
        return { kind: "not_found" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiPrepareDelegationResponse type received", candid);
}
exports.prepareDelegationResponse = prepareDelegationResponse;
function getDelegationResponse(candid) {
    if ("Success" in candid) {
        return signedDelegation(candid.Success);
    }
    if ("NotFound" in candid) {
        return { kind: "not_found" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiGetDelegationResponse type received", candid);
}
exports.getDelegationResponse = getDelegationResponse;
function signedDelegation(signedDelegation) {
    return {
        kind: "success",
        delegation: new identity_1.Delegation((0, mapping_1.consolidateBytes)(signedDelegation.delegation.pubkey), signedDelegation.delegation.expiration),
        signature: (0, mapping_1.consolidateBytes)(signedDelegation.signature),
    };
}
exports.signedDelegation = signedDelegation;
function prepareDelegationSuccess(candid) {
    return {
        kind: "success",
        userKey: (0, mapping_1.consolidateBytes)(candid.user_key),
        expiration: candid.expiration,
    };
}
function generateChallengeResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "success",
            key: candid.Success.key,
            pngBase64: candid.Success.png_base64,
        };
    }
    if ("AlreadyRegistered" in candid) {
        return { kind: "already_registered" };
    }
    if ("Throttled" in candid) {
        return { kind: "throttled" };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiGenerateChallengeResponse type received", candid);
}
exports.generateChallengeResponse = generateChallengeResponse;
function initiateIdentityLinkResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    if ("AlreadyRegistered" in candid) {
        return "already_registered";
    }
    if ("AlreadyLinkedToPrincipal" in candid) {
        return "already_linked_to_principal";
    }
    if ("TargetUserNotFound" in candid) {
        return "target_user_not_found";
    }
    if ("PublicKeyInvalid" in candid) {
        return "public_key_invalid";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiInitiateIdentityLinkResponse type received", candid);
}
exports.initiateIdentityLinkResponse = initiateIdentityLinkResponse;
function authPrincipalsResponse(candid) {
    if ("NotFound" in candid) {
        return [];
    }
    if ("Success" in candid) {
        return candid.Success.map((p) => ({
            principal: p.principal.toString(),
            originatingCanister: p.originating_canister.toString(),
            isIIPrincipal: p.is_ii_principal,
        }));
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiAuthPrincipalResponse type received", candid);
}
exports.authPrincipalsResponse = authPrincipalsResponse;
function approveIdentityLinkResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    if ("CallerNotRecognised" in candid) {
        return "caller_not_recognised";
    }
    if ("LinkRequestNotFound" in candid) {
        return "link_request_not_found";
    }
    if ("PrincipalAlreadyLinkedToAnotherOcUser" in candid) {
        return "principal_linked_to_another_oc_user";
    }
    if ("MalformedSignature" in candid || "InvalidSignature" in candid) {
        return "invalid_signature";
    }
    if ("DelegationTooOld" in candid) {
        return "delegation_too_old";
    }
    if ("PrincipalAlreadyLinkedToAnotherOcUser" in candid) {
        return "principal_linked_to_another_oc_user";
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiApproveIdentityLinkResponse type received", candid);
}
exports.approveIdentityLinkResponse = approveIdentityLinkResponse;
