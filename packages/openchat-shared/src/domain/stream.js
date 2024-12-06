"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = void 0;
class Stream {
    constructor(initialiser) {
        this.subscribed = false;
        initialiser((val, final) => {
            if (this.onResult) {
                this.onResult(val, final);
            }
            if (final && this.onEnd) {
                this.onEnd();
            }
        }, (reason) => {
            if (this.onError) {
                this.onError(reason);
            }
        });
    }
    subscribe(subscription) {
        if (this.subscribed) {
            throw new Error("Already subscribed");
        }
        this.subscribed = true;
        this.onResult = subscription.onResult;
        this.onError = subscription.onError;
        this.onEnd = subscription.onEnd;
    }
}
exports.Stream = Stream;
