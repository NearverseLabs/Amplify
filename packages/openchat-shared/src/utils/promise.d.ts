export type WaitAllResult<T> = {
    success: T[];
    errors: unknown[];
};
export declare function waitAll<T>(promises: Promise<T>[]): Promise<WaitAllResult<T>>;
