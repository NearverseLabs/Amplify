import { type DBSchema, type IDBPDatabase } from "idb";
export type ReferralDatabase = Promise<IDBPDatabase<ReferralSchema>>;
export interface ReferralSchema extends DBSchema {
    community_referrals: {
        key: string;
        value: {
            userId: string;
            timestamp: number;
        };
    };
}
export declare function lazyOpenReferralCache(): ReferralDatabase;
export declare function setCommunityReferral(communityId: string, userId: string, timestamp: number): Promise<void>;
export declare function deleteCommunityReferral(communityId: string): Promise<void>;
export declare function getCommunityReferral(communityId: string, timestamp: number): Promise<string | undefined>;
export declare function clearCache(): Promise<void>;
