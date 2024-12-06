"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAuthClientStorage = exports.AuthProvider = void 0;
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["II"] = "Internet Identity";
    AuthProvider["EMAIL"] = "Email";
    AuthProvider["ETH"] = "Ethereum";
    AuthProvider["SOL"] = "Solana";
    AuthProvider["NFID"] = "Google via NFID";
})(AuthProvider || (exports.AuthProvider = AuthProvider = {}));
class InMemoryAuthClientStorage {
    constructor() {
        this._map = new Map();
    }
    get(key) {
        return Promise.resolve(this._map.get(key) ?? null);
    }
    set(key, value) {
        this._map.set(key, value);
        return Promise.resolve();
    }
    remove(key) {
        this._map.delete(key);
        return Promise.resolve();
    }
}
exports.InMemoryAuthClientStorage = InMemoryAuthClientStorage;
