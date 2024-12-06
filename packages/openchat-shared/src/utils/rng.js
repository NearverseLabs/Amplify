"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random128 = exports.random64 = exports.random32 = void 0;
function random32() {
    const bytes = new Uint32Array(1);
    crypto.getRandomValues(bytes);
    return bytes[0];
}
exports.random32 = random32;
function random64() {
    const bytes = new BigUint64Array(1);
    crypto.getRandomValues(bytes);
    return bytes[0];
}
exports.random64 = random64;
function random128() {
    const bytes = new BigUint64Array(2);
    crypto.getRandomValues(bytes);
    return (bytes[0] << BigInt(64)) + bytes[1];
}
exports.random128 = random128;
