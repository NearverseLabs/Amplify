"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrAdd = exports.MessageMap = exports.CommunityMap = exports.MessageContextMap = exports.ChatMap = exports.GlobalMap = exports.SafeMap = void 0;
class SafeMap {
    constructor(toString, fromString, _map = new Map()) {
        this.toString = toString;
        this.fromString = fromString;
        this._map = _map;
    }
    map(fn) {
        const mapped = [...this._map.entries()].map(([k, v]) => {
            return [k, fn(this.fromString(k), v)];
        });
        return new SafeMap(this.toString, this.fromString, new Map(mapped));
    }
    merge(other) {
        other.forEach((val, key) => {
            this.set(key, val);
        });
        return this;
    }
    filter(fn) {
        return this.entries()
            .filter(([k, v]) => {
            return fn(v, k);
        })
            .reduce((agg, [k, v]) => {
            agg.set(k, v);
            return agg;
        }, new SafeMap(this.toString, this.fromString));
    }
    clone() {
        const clone = new SafeMap(this.toString, this.fromString, new Map(this._map));
        return clone;
    }
    empty() {
        return new SafeMap(this.toString, this.fromString);
    }
    clear() {
        this._map.clear();
    }
    values() {
        return [...this._map.values()];
    }
    keys() {
        return [...this._map.keys()].map((k) => this.fromString(k));
    }
    entries() {
        return [...this._map.entries()].map(([key, value]) => [
            this.fromString(key),
            value,
        ]);
    }
    delete(key) {
        if (this._map.size === 0)
            return false;
        return this._map.delete(this.toString(key));
    }
    forEach(callbackfn) {
        this._map.forEach((value, key) => {
            callbackfn(value, this.fromString(key));
        });
    }
    get(key) {
        if (this._map.size === 0)
            return undefined;
        return this._map.get(this.toString(key));
    }
    has(key) {
        if (this._map.size === 0)
            return false;
        return this._map.has(this.toString(key));
    }
    set(key, value) {
        this._map.set(this.toString(key), value);
        return this;
    }
    get size() {
        return this._map.size;
    }
    toMap() {
        return this._map;
    }
}
exports.SafeMap = SafeMap;
class GlobalMap extends SafeMap {
    constructor(_map = new Map()) {
        super((_) => "global", (_) => "global", _map);
    }
}
exports.GlobalMap = GlobalMap;
class ChatMap extends SafeMap {
    constructor(_map = new Map()) {
        super((k) => JSON.stringify(k), (k) => JSON.parse(k), _map);
    }
    static fromList(things) {
        return things.reduce((map, c) => {
            map.set(c.id, c);
            return map;
        }, new ChatMap());
    }
    static fromMap(map) {
        return new ChatMap(map);
    }
    static fromJSON(json) {
        return new ChatMap(new Map(JSON.parse(json)));
    }
}
exports.ChatMap = ChatMap;
class MessageContextMap extends SafeMap {
    constructor(_map = new Map()) {
        super((k) => JSON.stringify(k), (k) => JSON.parse(k), _map);
    }
    static fromMap(map) {
        return new MessageContextMap(map);
    }
}
exports.MessageContextMap = MessageContextMap;
class CommunityMap extends SafeMap {
    constructor() {
        super((k) => k.communityId, (k) => ({ kind: "community", communityId: k }));
    }
    static fromList(things) {
        return things.reduce((map, c) => {
            map.set(c.id, c);
            return map;
        }, new CommunityMap());
    }
}
exports.CommunityMap = CommunityMap;
class MessageMap extends SafeMap {
    constructor(entries) {
        super((k) => k.toString(), (k) => BigInt(k));
        if (entries !== undefined) {
            for (const [k, v] of entries) {
                this.set(k, v);
            }
        }
    }
}
exports.MessageMap = MessageMap;
function getOrAdd(map, key, value) {
    const existing = map.get(key);
    if (existing !== undefined) {
        return existing;
    }
    map.set(key, value);
    return value;
}
exports.getOrAdd = getOrAdd;
