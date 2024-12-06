import type { Identity } from "@dfinity/agent";
import { HttpError } from "openchat-shared";
export declare class ReplicaNotUpToDateError extends Error {
    static byTimestamp(replicaTimestamp: bigint, clientTimestamp: bigint, failedPostCheck: boolean): ReplicaNotUpToDateError;
    private constructor();
}
export declare function toCanisterResponseError(error: Error, identity: Identity): HttpError | ReplicaNotUpToDateError;
