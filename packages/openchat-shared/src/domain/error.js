"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousOperationError = exports.InvalidDelegationError = exports.ResponseTooLargeError = exports.DestinationInvalidError = exports.SessionExpiryError = exports.AuthError = exports.NoMeetingToJoin = exports.HttpError = exports.UnsupportedValueError = void 0;
class UnsupportedValueError extends Error {
    constructor(msg, value) {
        super(`${msg}: ${value}`);
    }
}
exports.UnsupportedValueError = UnsupportedValueError;
class HttpError extends Error {
    constructor(code, error) {
        super(error.message);
        this.code = code;
        this.stack = error.stack;
        this.name = "HttpError";
    }
}
exports.HttpError = HttpError;
class NoMeetingToJoin extends Error {
}
exports.NoMeetingToJoin = NoMeetingToJoin;
class AuthError extends HttpError {
    constructor(code, error) {
        super(code, error);
        this.code = code;
        this.name = "AuthError";
    }
}
exports.AuthError = AuthError;
class SessionExpiryError extends HttpError {
    constructor(code, error) {
        super(code, error);
        this.code = code;
        this.name = "SessionExpiryError";
    }
}
exports.SessionExpiryError = SessionExpiryError;
class DestinationInvalidError extends HttpError {
    constructor(error) {
        super(404, error);
        this.name = "DestinationInvalidError";
    }
}
exports.DestinationInvalidError = DestinationInvalidError;
class ResponseTooLargeError extends HttpError {
    constructor(error, size, maxSize) {
        super(500, error);
        this.size = size;
        this.maxSize = maxSize;
        this.name = "ResponseTooLargeError";
    }
}
exports.ResponseTooLargeError = ResponseTooLargeError;
class InvalidDelegationError extends HttpError {
    constructor(error) {
        super(403, error);
        this.name = "InvalidDelegationError";
    }
}
exports.InvalidDelegationError = InvalidDelegationError;
class AnonymousOperationError extends Error {
    constructor() {
        super();
        this.name = "AnonymousOperationError";
    }
}
exports.AnonymousOperationError = AnonymousOperationError;
