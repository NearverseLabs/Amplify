"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultChatRules = exports.isDiamondGate = exports.isLifetimeDiamondGate = exports.isUniquePersonGate = exports.isCredentialGate = exports.isBalanceGate = exports.isPaymentGate = exports.isNeuronGate = exports.isCompositeGate = exports.isLocked = exports.shouldPreprocessGate = exports.isLeafGate = void 0;
function isLeafGate(gate) {
    return gate.kind !== "composite_gate";
}
exports.isLeafGate = isLeafGate;
function shouldPreprocessGate(gate) {
    return [
        "unique_person_gate",
        "credential_gate",
        "payment_gate",
        "lifetime_diamond_gate",
        "diamond_gate",
    ].includes(gate.kind);
}
exports.shouldPreprocessGate = shouldPreprocessGate;
function isLocked(gate) {
    if (gate === undefined)
        return false;
    if (isCompositeGate(gate)) {
        switch (gate.operator) {
            case "and":
                return gate.gates.some(isLockedGate);
            case "or":
                return gate.gates.every(isLockedGate);
        }
    }
    else {
        return isLockedGate(gate);
    }
}
exports.isLocked = isLocked;
function isLockedGate(gate) {
    return gate.kind === "locked_gate";
}
function isCompositeGate(gate) {
    return gate.kind === "composite_gate";
}
exports.isCompositeGate = isCompositeGate;
function isNeuronGate(gate) {
    return gate.kind === "neuron_gate";
}
exports.isNeuronGate = isNeuronGate;
function isPaymentGate(gate) {
    return gate.kind === "payment_gate";
}
exports.isPaymentGate = isPaymentGate;
function isBalanceGate(gate) {
    return gate.kind === "token_balance_gate";
}
exports.isBalanceGate = isBalanceGate;
function isCredentialGate(gate) {
    return gate.kind === "credential_gate";
}
exports.isCredentialGate = isCredentialGate;
function isUniquePersonGate(gate) {
    return gate.kind === "unique_person_gate";
}
exports.isUniquePersonGate = isUniquePersonGate;
function isLifetimeDiamondGate(gate) {
    return gate.kind === "lifetime_diamond_gate";
}
exports.isLifetimeDiamondGate = isLifetimeDiamondGate;
function isDiamondGate(gate) {
    return gate.kind === "diamond_gate";
}
exports.isDiamondGate = isDiamondGate;
function defaultChatRules(level) {
    let text = "";
    if (level !== "channel") {
        text = `- Do not impersonate others in a deceptive or misleading manner
- Do not intentionally share false or misleading information
- Keep messages relevant to the ${level === "community" ? "channel" : "group"}

If you break the rules you might be blocked and/or have your message(s) deleted.`;
    }
    return {
        text,
        enabled: false,
        version: 0,
    };
}
exports.defaultChatRules = defaultChatRules;
