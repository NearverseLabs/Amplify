export type OptionUpdate<T> = undefined | "set_to_none" | {
    value: T;
};
export type ApiOptionUpdate<T> = {
    NoChange: null;
} | {
    SetToNone: null;
} | {
    SetToSome: T;
};
export type ApiOptionUpdateV2<T> = "NoChange" | "SetToNone" | {
    SetToSome: T;
};
export declare function applyOptionUpdate<T>(original: T | undefined, update: OptionUpdate<T>): T | undefined;
export declare function mapOptionUpdate<A, B>(original: OptionUpdate<A>, mapper: (a: A) => B): OptionUpdate<B>;
export declare function updateFromOptions<T>(original: T | undefined, updated: T | undefined): OptionUpdate<T>;
