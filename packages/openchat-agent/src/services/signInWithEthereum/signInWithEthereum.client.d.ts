import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../candidService";
import type { GetDelegationResponse, PrepareDelegationResponse, SiwePrepareLoginResponse } from "openchat-shared";
export declare class SignInWithEthereumClient extends CandidService {
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
    prepareLogin(address: string): Promise<SiwePrepareLoginResponse>;
    login(signature: string, address: string, sessionKey: Uint8Array): Promise<PrepareDelegationResponse>;
    getDelegation(address: string, sessionKey: Uint8Array, expiration: bigint): Promise<GetDelegationResponse>;
}
