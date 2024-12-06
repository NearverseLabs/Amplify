"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRecord2 = exports.toRecord = exports.findLast = exports.chunk = exports.zip = exports.distinctBy = exports.flatMap = exports.groupBy = exports.groupWhile = void 0;
function groupWhile(predicate, items) {
    if (items.length === 0)
        return [];
    const [, grouped] = items.reduce(([prev, groups], item) => {
        if (!prev) {
            return [item, [[item]]];
        }
        if (predicate(prev, item)) {
            const lastGroup = groups[groups.length - 1];
            lastGroup.push(item);
            return [item, groups];
        }
        else {
            groups.push([item]);
            return [item, groups];
        }
    }, [undefined, [[]]]);
    return grouped;
}
exports.groupWhile = groupWhile;
function groupBy(items, keySelector) {
    const grouped = new Map();
    for (const item of items) {
        const key = keySelector(item);
        const existing = grouped.get(key);
        if (existing !== undefined) {
            existing.push(item);
        }
        else {
            grouped.set(key, [item]);
        }
    }
    return grouped;
}
exports.groupBy = groupBy;
function flatMap(things, fn) {
    return things.reduce((agg, thing) => {
        agg.push(...fn(thing));
        return agg;
    }, []);
}
exports.flatMap = flatMap;
function distinctBy(things, keyFn) {
    if (things.length == 0)
        return things;
    const set = new Set();
    const output = [];
    for (const thing of things) {
        const key = keyFn(thing);
        if (!set.has(key)) {
            set.add(key);
            output.push(thing);
        }
    }
    return output;
}
exports.distinctBy = distinctBy;
function zip(a, b) {
    const l = Math.min(a.length, b.length);
    const res = [];
    for (let i = 0; i < l; i++) {
        res.push([a[i], b[i]]);
    }
    return res;
}
exports.zip = zip;
function chunk(array, size) {
    const chunkCount = Math.floor((array.length - 1) / size) + 1;
    const chunks = [];
    for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
        const start = chunkIndex * size;
        const end = start + size;
        chunks.push(array.slice(start, end));
    }
    return chunks;
}
exports.chunk = chunk;
function findLast(array, predicate) {
    for (let i = array.length - 1; i >= 0; i--) {
        const item = array[i];
        if (predicate(item))
            return item;
    }
    return undefined;
}
exports.findLast = findLast;
function toRecord(xs, keyFn) {
    return xs.reduce((rec, x) => {
        rec[keyFn(x)] = x;
        return rec;
    }, {});
}
exports.toRecord = toRecord;
function toRecord2(xs, keyFn, valFn) {
    return xs.reduce((rec, x) => {
        rec[keyFn(x)] = valFn(x);
        return rec;
    }, {});
}
exports.toRecord2 = toRecord2;
