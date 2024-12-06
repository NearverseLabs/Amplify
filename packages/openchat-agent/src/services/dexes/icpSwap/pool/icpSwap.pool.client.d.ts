import type { HttpAgent, Identity } from "@dfinity/agent";
import { CandidService } from "../../../candidService";
import type { SwapPoolClient } from "../../index";
export declare class IcpSwapPoolClient extends CandidService implements SwapPoolClient {
    private token0;
    private token1;
    private service;
    constructor(identity: Identity, agent: HttpAgent, canisterId: string, token0: string, token1: string);
    quote(inputToken: string, outputToken: string, amountIn: bigint): Promise<bigint>;
    private zeroForOne;
}
