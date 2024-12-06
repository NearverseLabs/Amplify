"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textToCode = exports.codeToText = void 0;
function codeToText(code) {
    return code.toString(16).padStart(16, "0");
}
exports.codeToText = codeToText;
function textToCode(codeStr) {
    return codeStr.length === 16 ? BigInt("0x" + codeStr) : base64ToBigint(codeStr);
}
exports.textToCode = textToCode;
function base64ToBigint(b64) {
    const bin = atob(b64);
    const hex = [];
    bin.split("").forEach(function (ch) {
        let h = ch.charCodeAt(0).toString(16);
        if (h.length % 2) {
            h = "0" + h;
        }
        hex.push(h);
    });
    return BigInt("0x" + hex.join(""));
}
