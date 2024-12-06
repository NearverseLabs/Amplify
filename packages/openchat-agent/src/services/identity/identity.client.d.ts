import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
import type { ApproveIdentityLinkResponse, AuthenticationPrincipalsResponse, ChallengeAttempt, CheckAuthPrincipalResponse, CreateIdentityResponse, GenerateChallengeResponse, GetDelegationResponse, InitiateIdentityLinkResponse, PrepareDelegationResponse } from "openchat-shared";
export declare class IdentityClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, identityCanister: string);
    createIdentity(sessionKey: Uint8Array, isIIPrincipal: boolean | undefined, challengeAttempt: ChallengeAttempt | undefined): Promise<CreateIdentityResponse>;
    checkAuthPrincipal(): Promise<CheckAuthPrincipalResponse>;
    prepareDelegation(sessionKey: Uint8Array, isIIPrincipal: boolean | undefined): Promise<PrepareDelegationResponse>;
    getDelegation(sessionKey: Uint8Array, expiration: bigint): Promise<GetDelegationResponse>;
    generateChallenge(): Promise<GenerateChallengeResponse>;
    initiateIdentityLink(linkToPrincipal: string, isIIPrincipal: boolean | undefined): Promise<InitiateIdentityLinkResponse>;
    approveIdentityLink(linkInitiatedBy: string): Promise<ApproveIdentityLinkResponse>;
    getAuthenticationPrincipals(): Promise<AuthenticationPrincipalsResponse>;
    private publicKey;
}
