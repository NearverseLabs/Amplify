"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDuration = exports.debug = exports.inititaliseLogger = void 0;
const rollbar_1 = __importDefault(require("rollbar"));
const network_1 = require("./network");
const domain_1 = require("../domain");
let rollbar;
function inititaliseLogger(apikey, version, env) {
    if (env === "production") {
        rollbar = rollbar_1.default.init({
            accessToken: apikey,
            captureUncaught: true,
            autoInstrument: false,
            logLevel: "error",
            environment: env,
            enabled: env === "production",
            captureUnhandledRejections: true,
            payload: {
                environment: env,
                client: {
                    javascript: {
                        source_map_enabled: true,
                        code_version: version,
                        guess_uncaught_frames: true,
                    },
                },
            },
        });
    }
    return {
        error(message, error, ...optionalParams) {
            if (error instanceof domain_1.AnonymousOperationError)
                return;
            console.error(message, error, optionalParams);
            if (!(0, network_1.offline)()) {
                rollbar?.error(error, message, optionalParams);
            }
        },
        log(message, ...optionalParams) {
            console.log(message, optionalParams);
        },
        debug(message, ...optionalParams) {
            console.debug(message, optionalParams);
        },
    };
}
exports.inititaliseLogger = inititaliseLogger;
function debug(data, msg) {
    if (msg) {
        console.log(msg, data);
    }
    else {
        console.log(data);
    }
    return data;
}
exports.debug = debug;
function logDuration(msg, started) {
    console.debug(`PERF: ${msg}`, Date.now() - started);
}
exports.logDuration = logDuration;
