"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offline = void 0;
const constants_1 = require("../constants");
function offline() {
    return !navigator.onLine || criticalBandwith();
}
exports.offline = offline;
function criticalBandwith() {
    return ("connection" in navigator &&
        navigator.connection !== undefined &&
        navigator.connection.downlink < constants_1.MIN_DOWNLINK);
}
