"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncMessageContextMap = void 0;
const openchat_shared_1 = require("openchat-shared");
class AsyncMessageContextMap extends openchat_shared_1.MessageContextMap {
    insert(context, val) {
        if (!this.has(context)) {
            this.set(context, []);
        }
        this.get(context)?.push(val);
    }
    get length() {
        return this.size;
    }
    lookup(key) {
        return this.get(key) ?? [];
    }
    async asyncMap(fn) {
        const intermediate = this.entries().map(([key, val]) => fn(key, val));
        const result = await (0, openchat_shared_1.waitAll)(intermediate);
        if (result.errors.length > 0) {
            console.error("Some missing indexes could not be resolved: ", result.errors);
        }
        return result.success.reduce((res, [messageContext, messages]) => {
            res.set(messageContext, (res.get(messageContext) ?? []).concat(messages));
            return res;
        }, new AsyncMessageContextMap());
    }
}
exports.AsyncMessageContextMap = AsyncMessageContextMap;
