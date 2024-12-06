import { HttpAgent, type Identity } from "@dfinity/agent";
export declare function createHttpAgentSync(identity: Identity, icUrl: string): HttpAgent;
export declare function createHttpAgent(identity: Identity, icUrl: string): Promise<HttpAgent>;
