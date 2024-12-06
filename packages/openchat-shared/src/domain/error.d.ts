export declare class UnsupportedValueError extends Error {
    constructor(msg: string, value: never);
}
export declare class HttpError extends Error {
    code: number;
    constructor(code: number, error: Error);
}
export declare class NoMeetingToJoin extends Error {
}
export declare class AuthError extends HttpError {
    code: number;
    constructor(code: number, error: Error);
}
export declare class SessionExpiryError extends HttpError {
    code: number;
    constructor(code: number, error: Error);
}
export declare class DestinationInvalidError extends HttpError {
    constructor(error: Error);
}
export declare class ResponseTooLargeError extends HttpError {
    size: number;
    maxSize: number;
    constructor(error: Error, size: number, maxSize: number);
}
export declare class InvalidDelegationError extends HttpError {
    constructor(error: Error);
}
export declare class AnonymousOperationError extends Error {
    constructor();
}
