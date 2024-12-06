"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.measure = void 0;
function end(start, key) {
    return (result) => {
        const end = performance.now();
        const duration = end - start;
        console.log(`${key}: ${duration}ms`);
        return result;
    };
}
function measure(key, fn) {
    const start = performance.now();
    return fn().then((res) => {
        const end = performance.now();
        console.log(key, end - start);
        return res;
    });
}
exports.measure = measure;
const profile = (service) => (_target, _propertyKey, descriptor) => {
    return descriptor;
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const start = performance.now();
        const key = `${service}.${originalMethod.name}`;
        const result = originalMethod.apply(this, args);
        if (result instanceof Promise) {
            return result.then(end(start, key));
        }
        else {
            return end(start, key)(result);
        }
    };
    return descriptor;
};
exports.profile = profile;
