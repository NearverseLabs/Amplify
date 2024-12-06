"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markDeployedResponse = exports.apiRejectReason = exports.rejectResponse = exports.approveResponse = exports.proposeResponse = exports.pendingDeploymentResponse = exports.proposedResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
function candidateTranslation(candid) {
    return {
        id: candid.id,
        value: candid.value,
        proposedAt: candid.proposed_at,
        proposedBy: candid.proposed_by.toString(),
    };
}
function proposedResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "success",
            proposed: candid.Success.records.map((c) => ({
                key: c.key,
                locale: c.locale,
                deploymentCount: c.deployment_count,
                candidates: c.candidates.map(candidateTranslation),
            })),
        };
    }
    console.warn("proposed translations failed with: ", candid);
    return { kind: "failure" };
}
exports.proposedResponse = proposedResponse;
function pendingDeploymentResponse(candid) {
    if ("Success" in candid) {
        return {
            kind: "success",
            latestApproval: candid.Success.latest_approval,
            translations: candid.Success.translations.map(({ locale, key, value }) => ({
                locale,
                key,
                value,
            })),
        };
    }
    console.warn("pending deployments failed with", candid);
    return { kind: "failure" };
}
exports.pendingDeploymentResponse = pendingDeploymentResponse;
function proposeResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    if ("AlreadyProposed" in candid) {
        return "already_proposed";
    }
    console.warn("propose translation failed with: ", candid);
    return "failure";
}
exports.proposeResponse = proposeResponse;
function approveResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    console.warn("approve translation failed with: ", candid);
    return "failure";
}
exports.approveResponse = approveResponse;
function rejectResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    console.warn("reject translation failed with: ", candid);
    return "failure";
}
exports.rejectResponse = rejectResponse;
function apiRejectReason(domain) {
    if (domain === "incorrect_meaning") {
        return {
            IncorrectMeaning: null,
        };
    }
    if (domain === "too_long") {
        return {
            TooLong: null,
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown reject reason: ", domain);
}
exports.apiRejectReason = apiRejectReason;
function markDeployedResponse(candid) {
    if ("Success" in candid) {
        return "success";
    }
    console.warn("mark translations deployed failed with: ", candid);
    return "failure";
}
exports.markDeployedResponse = markDeployedResponse;
