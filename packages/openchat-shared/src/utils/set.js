"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSet = void 0;
class ObjectSet {
    constructor(_set = new Set()) {
        this._set = _set;
    }
    toString(value) {
        return JSON.stringify(value);
    }
    clone() {
        const clone = new ObjectSet(new Set(this._set));
        return clone;
    }
    empty() {
        return new ObjectSet();
    }
    clear() {
        this._set.clear();
    }
    values() {
        return Array.from(this._set).map((value) => JSON.parse(value));
    }
    delete(value) {
        return this._set.delete(this.toString(value));
    }
    has(value) {
        return this._set.has(this.toString(value));
    }
    add(value) {
        this._set.add(this.toString(value));
        return this;
    }
    get size() {
        return this._set.size;
    }
    toSet() {
        return this._set;
    }
    static fromList(values) {
        const set = new ObjectSet();
        values.forEach((value) => set.add(value));
        return set;
    }
}
exports.ObjectSet = ObjectSet;
