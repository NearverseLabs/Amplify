"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcpSwapPoolClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../../../candidService");
const mappers_1 = require("./mappers");
class IcpSwapPoolClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId, token0, token1) {
        super(identity, agent, canisterId);
        this.token0 = token0;
        this.token1 = token1;
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    quote(inputToken, outputToken, amountIn) {
        const zeroForOne = this.zeroForOne(inputToken, outputToken);
        const args = {
            amountIn: amountIn.toString(),
            amountOutMinimum: "0",
            zeroForOne,
        };
        return this.handleQueryResponse(() => this.service.quoteForAll(args), mappers_1.quoteResponse, args);
    }
    zeroForOne(inputToken, outputToken) {
        if (inputToken === this.token0 && outputToken === this.token1)
            return true;
        if (inputToken === this.token1 && outputToken === this.token0)
            return false;
        throw new Error("ICPSwap pool does not match requested tokens");
    }
}
exports.IcpSwapPoolClient = IcpSwapPoolClient;
