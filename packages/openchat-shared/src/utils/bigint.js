"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigIntMin = exports.bigIntMax = void 0;
function bigIntMax(...args) {
    return args.reduce((m, e) => e > m ? e : m);
}
exports.bigIntMax = bigIntMax;
function bigIntMin(...args) {
    return args.reduce((m, e) => e < m ? e : m);
}
exports.bigIntMin = bigIntMin;
