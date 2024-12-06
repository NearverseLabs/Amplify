"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToBigint = exports.bigintToBase64 = exports.toUint8Array = void 0;
function toUint8Array(base64String) {
    return Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
}
exports.toUint8Array = toUint8Array;
function bigintToBase64(bn) {
    let hex = bn.toString(16);
    if (hex.length % 2) {
        hex = "0" + hex;
    }
    const bin = [];
    let i = 0;
    let d;
    let b;
    while (i < hex.length) {
        d = parseInt(hex.slice(i, i + 2), 16);
        b = String.fromCharCode(d);
        bin.push(b);
        i += 2;
    }
    return btoa(bin.join(""));
}
exports.bigintToBase64 = bigintToBase64;
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
exports.base64ToBigint = base64ToBigint;
