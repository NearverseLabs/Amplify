import type { Principal } from "@dfinity/principal";
import { type ChatIdentifier, type ReplicaNotUpToDate } from "openchat-shared";
export declare function ensureReplicaIsUpToDate(principal: Principal, chatId: ChatIdentifier, replicaChatLastUpdated: bigint, suppressError?: boolean): Promise<undefined | ReplicaNotUpToDate>;
export declare function excludeLatestKnownUpdateIfBeforeFix(latestKnownUpdate: bigint | undefined): bigint | undefined;
