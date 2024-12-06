import { type MessageContext, MessageContextMap } from "openchat-shared";
export declare class AsyncMessageContextMap<T> extends MessageContextMap<T[]> {
    insert(context: MessageContext, val: T): void;
    get length(): number;
    lookup(key: MessageContext): T[];
    asyncMap<A>(fn: (k: MessageContext, t: T[]) => Promise<[MessageContext, A[]]>): Promise<AsyncMessageContextMap<A>>;
}
