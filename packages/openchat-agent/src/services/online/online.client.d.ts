import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
export declare class OnlineClient extends CandidService {
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    lastOnline(userIds: string[]): Promise<Record<string, number>>;
    markAsOnline(): Promise<void>;
}
