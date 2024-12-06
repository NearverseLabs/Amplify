"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitAll = void 0;
async function waitAll(promises) {
    const results = await Promise.allSettled(promises);
    const success = [];
    const errors = [];
    for (const result of results) {
        if (result.status === "fulfilled") {
            success.push(result.value);
        }
        else {
            errors.push(result.reason);
        }
    }
    return {
        success,
        errors,
    };
}
exports.waitAll = waitAll;
