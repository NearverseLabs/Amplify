"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMainnet = void 0;
function isMainnet(icUrl) {
    return icUrl.includes("icp-api.io");
}
exports.isMainnet = isMainnet;
