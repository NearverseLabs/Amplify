"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUint64 = void 0;
const max32 = Math.pow(2, 32) - 1;
function generateUint64() {
    const rand1 = Math.floor(Math.random() * max32);
    const rand2 = Math.floor(Math.random() * max32);
    return (BigInt(rand1) << BigInt(32)) + BigInt(rand2);
}
exports.generateUint64 = generateUint64;
