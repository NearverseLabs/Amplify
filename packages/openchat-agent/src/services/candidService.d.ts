import { HttpAgent, type Identity } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import type { Static, TSchema } from "@sinclair/typebox";
export declare abstract class CandidService {
    protected identity: Identity;
    protected agent: HttpAgent;
    protected canisterId: string;
    protected createServiceClient<T>(factory: IDL.InterfaceFactory): T;
    protected get principal(): Principal;
    protected executeMsgpackQuery<In extends TSchema, Resp extends TSchema, Out>(methodName: string, args: Static<In>, mapper: (from: Static<Resp>) => Out | Promise<Out>, requestValidator: In, responseValidator: Resp): Promise<Out>;
    protected executeMsgpackUpdate<In extends TSchema, Resp extends TSchema, Out>(methodName: string, args: Static<In>, mapper: (from: Static<Resp>) => Out | Promise<Out>, requestValidator: In, responseValidator: Resp, onRequestAccepted?: () => void): Promise<Out>;
    protected handleResponse<From, To>(service: Promise<From>, mapper: (from: From) => To, args?: unknown): Promise<To>;
    protected handleQueryResponse<From, To>(serviceCall: () => Promise<From>, mapper: (from: From) => To | Promise<To>, args?: unknown, retries?: number): Promise<To>;
    private sendRequestToCanister;
    private static validate;
    private static prepareMsgpackArgs;
    private static processMsgpackResponse;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string);
}
