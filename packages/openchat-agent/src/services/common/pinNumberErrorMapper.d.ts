import type { PinNumberFailures } from "openchat-shared";
export declare function pinNumberFailureResponseV2(value: "PinRequired" | {
    PinIncorrect: bigint;
} | {
    TooManyFailedPinAttempts: bigint;
}): PinNumberFailures;
