"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFromOptions = exports.mapOptionUpdate = exports.applyOptionUpdate = void 0;
function applyOptionUpdate(original, update) {
    if (update === undefined)
        return original;
    if (update === "set_to_none")
        return undefined;
    return update.value;
}
exports.applyOptionUpdate = applyOptionUpdate;
function mapOptionUpdate(original, mapper) {
    if (original === undefined || original === "set_to_none")
        return original;
    return { value: mapper(original.value) };
}
exports.mapOptionUpdate = mapOptionUpdate;
function updateFromOptions(original, updated) {
    return original === updated
        ? undefined
        : updated === undefined
            ? "set_to_none"
            : { value: updated };
}
exports.updateFromOptions = updateFromOptions;
