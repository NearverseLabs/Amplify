import type { CommunityIdentifier } from "../domain";
import type { ChatIdentifier, MessageContext } from "../domain/chat";
export declare class SafeMap<K, V> {
    private toString;
    private fromString;
    protected _map: Map<string, V>;
    protected constructor(toString: (key: K) => string, fromString: (key: string) => K, _map?: Map<string, V>);
    map<A>(fn: (key: K, val: V) => A): SafeMap<K, A>;
    merge(other: SafeMap<K, V>): SafeMap<K, V>;
    filter(fn: (value: V, key: K) => boolean): SafeMap<K, V>;
    clone(): SafeMap<K, V>;
    empty(): SafeMap<K, V>;
    clear(): void;
    values(): V[];
    keys(): K[];
    entries(): [K, V][];
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K) => void): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    get size(): number;
    toMap(): Map<string, V>;
}
export declare class GlobalMap<V> extends SafeMap<"global", V> {
    constructor(_map?: Map<"global", V>);
}
export declare class ChatMap<V> extends SafeMap<ChatIdentifier, V> {
    constructor(_map?: Map<string, V>);
    static fromList<T extends {
        id: ChatIdentifier;
    }>(things: T[]): ChatMap<T>;
    static fromMap<V>(map: Map<string, V>): ChatMap<V>;
    static fromJSON<V>(json: string): ChatMap<V>;
}
export declare class MessageContextMap<V> extends SafeMap<MessageContext, V> {
    constructor(_map?: Map<string, V>);
    static fromMap<V>(map: Map<string, V>): MessageContextMap<V>;
}
export declare class CommunityMap<V> extends SafeMap<CommunityIdentifier, V> {
    constructor();
    static fromList<T extends {
        id: CommunityIdentifier;
    }>(things: T[]): CommunityMap<T>;
}
export declare class MessageMap<V> extends SafeMap<bigint, V> {
    constructor(entries?: readonly (readonly [bigint, V])[] | undefined);
}
export declare function getOrAdd<K, V>(map: Map<K, V>, key: K, value: V): V;
