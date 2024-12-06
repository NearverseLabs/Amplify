import { type GroupChatSummary, type PublicGroupSummaryResponse } from "openchat-shared";
import type { GroupPublicSummaryResponse, PublicGroupSummary as TPublicGroupSummary } from "../../typebox";
export declare function publicGroupSummary(value: TPublicGroupSummary, isInvited: boolean): GroupChatSummary;
export declare function publicSummaryResponse(value: GroupPublicSummaryResponse): PublicGroupSummaryResponse;
