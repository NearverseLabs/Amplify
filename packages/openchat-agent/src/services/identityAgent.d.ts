import { type Identity, type SignIdentity } from "@dfinity/agent";
import { DelegationIdentity } from "@dfinity/identity";
import type { ApproveIdentityLinkResponse, AuthenticationPrincipalsResponse, ChallengeAttempt, CreateOpenChatIdentityError, GenerateChallengeResponse, InitiateIdentityLinkResponse } from "openchat-shared";
export declare class IdentityAgent {
    private readonly _identityClient;
    private readonly _isIIPrincipal;
    private constructor();
    static create(identity: Identity, identityCanister: string, icUrl: string, isIIPrincipal: boolean | undefined): Promise<IdentityAgent>;
    checkOpenChatIdentityExists(): Promise<boolean>;
    createOpenChatIdentity(sessionKey: SignIdentity, challengeAttempt: ChallengeAttempt | undefined): Promise<DelegationIdentity | CreateOpenChatIdentityError>;
    getOpenChatIdentity(sessionKey: SignIdentity): Promise<DelegationIdentity | undefined>;
    generateChallenge(): Promise<GenerateChallengeResponse>;
    initiateIdentityLink(linkToPrincipal: string): Promise<InitiateIdentityLinkResponse>;
    approveIdentityLink(linkInitiatedBy: string): Promise<ApproveIdentityLinkResponse>;
    getAuthenticationPrincipals(): Promise<AuthenticationPrincipalsResponse>;
    private getDelegation;
}
