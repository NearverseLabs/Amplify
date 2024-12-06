"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexesAgent = void 0;
const agent_1 = require("@dfinity/agent");
const icpSwap_index_client_1 = require("./icpSwap/index/icpSwap.index.client");
const kongswap_client_1 = require("./kongswap/kongswap.client");
const sonic_swaps_client_1 = require("./sonic/swaps/sonic.swaps.client");
const TEN_MINUTES = 10 * 60 * 1000;
class DexesAgent {
    constructor(agent) {
        this.agent = agent;
        this._poolsCache = {};
        this._identity = new agent_1.AnonymousIdentity();
        this._swapIndexClients = {
            icpswap: new icpSwap_index_client_1.IcpSwapIndexClient(this._identity, this.agent),
            kongswap: new kongswap_client_1.KongSwapClient(this._identity, this.agent),
            sonic: new sonic_swaps_client_1.SonicSwapsClient(this._identity, this.agent),
        };
    }
    async getSwapPools(inputToken, outputTokens, swapProviders) {
        const allPools = await this.getAllSwapPools(swapProviders);
        return allPools.filter((p) => (p.token0 === inputToken && outputTokens.has(p.token1)) ||
            (p.token1 === inputToken && outputTokens.has(p.token0)));
    }
    async canSwap(tokens, swapProviders) {
        const allPools = await this.getAllSwapPools(swapProviders);
        const available = new Set();
        for (const p of allPools) {
            if (tokens.has(p.token0) && tokens.has(p.token1)) {
                available.add(p.token0);
                available.add(p.token1);
            }
        }
        return available;
    }
    async quoteSwap(inputToken, outputToken, amountIn, swapProviders) {
        const pools = await this.getSwapPools(inputToken, new Set([outputToken]), swapProviders);
        return await Promise.all(pools.map((p) => this.quoteSingle(p, inputToken, outputToken, amountIn).then((quote) => [p.dex, quote])));
    }
    getAllSwapPools(swapProviders) {
        const promises = [];
        for (const swapProvider of swapProviders) {
            const cached = this.tryGetAllSwapPoolsFromCache(swapProvider);
            if (cached !== undefined) {
                promises.push(Promise.resolve(cached));
                continue;
            }
            const client = this._swapIndexClients[swapProvider];
            if (client === undefined) {
                continue;
            }
            promises.push(client.getPools().then((pools) => {
                this._poolsCache[swapProvider] = [pools, Date.now()];
                return pools;
            }));
        }
        return Promise.allSettled(promises).then((result) => result.flatMap((r) => (r.status === "fulfilled" ? r.value : [])));
    }
    quoteSingle(pool, inputToken, outputToken, amountIn) {
        const indexClient = this._swapIndexClients[pool.dex];
        if (indexClient === undefined) {
            return Promise.resolve(BigInt(0));
        }
        const poolClient = indexClient.getPoolClient(pool.canisterId, pool.token0, pool.token1);
        return poolClient.quote(inputToken, outputToken, amountIn);
    }
    tryGetAllSwapPoolsFromCache(dex) {
        const cached = this._poolsCache[dex];
        if (cached === undefined) {
            return undefined;
        }
        const [pools, timestamp] = cached;
        const now = Date.now();
        return now - timestamp < TEN_MINUTES ? pools : undefined;
    }
}
exports.DexesAgent = DexesAgent;
