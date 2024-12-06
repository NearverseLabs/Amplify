"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = exports.isHexString = exports.isAccountIdentifierValid = exports.isSubAccountValid = exports.isPrincipalValid = exports.toTitleCase = exports.HEX_REGEX = void 0;
const principal_1 = require("@dfinity/principal");
exports.HEX_REGEX = new RegExp("^[A-Fa-f0-9]+$");
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
exports.toTitleCase = toTitleCase;
function isPrincipalValid(text) {
    try {
        principal_1.Principal.fromText(text);
        return true;
    }
    catch (_e) {
        return false;
    }
}
exports.isPrincipalValid = isPrincipalValid;
function isSubAccountValid(text) {
    return text.length <= 64 && isHexString(text);
}
exports.isSubAccountValid = isSubAccountValid;
function isAccountIdentifierValid(text) {
    return text.length === 64 && isHexString(text);
}
exports.isAccountIdentifierValid = isAccountIdentifierValid;
function isHexString(text) {
    return exports.HEX_REGEX.test(text);
}
exports.isHexString = isHexString;
function isUrl(text) {
    try {
        new URL(text);
        return true;
    }
    catch {
        return false;
    }
}
exports.isUrl = isUrl;
