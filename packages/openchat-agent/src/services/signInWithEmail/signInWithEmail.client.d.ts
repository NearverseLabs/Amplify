import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
import type { GenerateMagicLinkResponse, GetDelegationResponse } from "openchat-shared";
export declare class SignInWithEmailClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    generateMagicLink(email: string, sessionKey: Uint8Array): Promise<GenerateMagicLinkResponse>;
    getDelegation(email: string, sessionKey: Uint8Array, expiration: bigint): Promise<GetDelegationResponse>;
}
