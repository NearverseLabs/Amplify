"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureRestricted = void 0;
const featureRestrictions = {
    gb: new Set(["swap"]),
};
function featureRestricted(jurisdiction, feature) {
    return (jurisdiction === undefined ||
        (featureRestrictions[jurisdiction.toLowerCase()]?.has(feature) ?? false));
}
exports.featureRestricted = featureRestricted;
