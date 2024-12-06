import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
export declare class NotificationsClient extends CandidService {
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    subscriptionExists(p256dh_key: string): Promise<boolean>;
    pushSubscription(subscription: PushSubscriptionJSON): Promise<void>;
    removeSubscription(subscription: PushSubscriptionJSON): Promise<void>;
}
