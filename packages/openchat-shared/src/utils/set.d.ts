export declare class ObjectSet<V> {
    protected _set: Set<string>;
    constructor(_set?: Set<string>);
    private toString;
    clone(): ObjectSet<V>;
    empty(): ObjectSet<V>;
    clear(): void;
    values(): V[];
    delete(value: V): boolean;
    has(value: V): boolean;
    add(value: V): this;
    get size(): number;
    toSet(): Set<string>;
    static fromList<V>(values: V[]): ObjectSet<V>;
}
