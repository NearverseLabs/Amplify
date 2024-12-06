"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrors = void 0;
class ValidationErrors {
    constructor() {
        this.errors = new Map();
    }
    addErrors(key, errors) {
        if (!Array.isArray(errors))
            errors = [errors];
        if (errors.length === 0)
            return;
        const current = this.errors.get(key) ?? [];
        errors.forEach((e) => current.push(e));
        this.errors.set(key, current);
    }
    has(key) {
        return this.errors.has(key);
    }
    get(key) {
        return this.errors.get(key) ?? [];
    }
    get size() {
        return this.errors.size;
    }
}
exports.ValidationErrors = ValidationErrors;
