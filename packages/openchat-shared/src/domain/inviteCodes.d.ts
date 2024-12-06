import type { MultiUserChatIdentifier } from "./chat";
import type { CommunityIdentifier } from "./community";
export declare function codeToText(code: bigint): string;
export declare function textToCode(codeStr: string): bigint;
export type GroupInvite = {
    chatId: MultiUserChatIdentifier;
    code: string;
};
export type CommunityInvite = {
    id: CommunityIdentifier;
    code: string;
};
