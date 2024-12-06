export type Logger = {
    error(message: unknown, error: unknown, ...optionalParams: unknown[]): void;
    log(message?: unknown, ...optionalParams: unknown[]): void;
    debug(message?: unknown, ...optionalParams: unknown[]): void;
};
export declare function inititaliseLogger(apikey: string, version: string, env: string): Logger;
export declare function debug<T>(data: T, msg?: string): T;
export declare function logDuration(msg: string, started: number): void;
