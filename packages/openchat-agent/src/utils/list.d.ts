export declare function groupWhile<T>(predicate: (a1: T, a2: T) => boolean, items: T[]): T[][];
export declare function groupBy<T, K>(items: T[], keySelector: (item: T) => K): Map<K, T[]>;
export declare function flatMap<A, B>(things: A[], fn: (thing: A) => B[]): B[];
export declare function distinctBy<T, K>(things: T[], keyFn: ((thing: T) => K)): T[];
export declare function zip<A, B>(a: A[], b: B[]): [A, B][];
export declare function chunk<T>(array: T[], size: number): T[][];
export declare function findLast<T>(array: T[], predicate: (item: T) => boolean): T | undefined;
export declare function toRecord<T, K extends string | number | symbol>(xs: T[], keyFn: (x: T) => K): Record<K, T>;
export declare function toRecord2<T, K extends string | number | symbol, V>(xs: T[], keyFn: (x: T) => K, valFn: (x: T) => V): Record<K, V>;
