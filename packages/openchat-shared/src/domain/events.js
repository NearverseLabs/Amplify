"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesReadFromServer = exports.UsersLoaded = exports.StorageUpdated = void 0;
class StorageUpdated extends CustomEvent {
    constructor(detail) {
        super("openchat_event", { detail });
    }
}
exports.StorageUpdated = StorageUpdated;
class UsersLoaded extends CustomEvent {
    constructor(detail) {
        super("openchat_event", { detail });
    }
}
exports.UsersLoaded = UsersLoaded;
class MessagesReadFromServer extends CustomEvent {
    constructor(chatId, readByMeUpTo, threadsRead, dateReadPinned) {
        super("openchat_event", {
            detail: {
                chatId,
                readByMeUpTo,
                threadsRead,
                dateReadPinned,
            },
        });
    }
}
exports.MessagesReadFromServer = MessagesReadFromServer;
