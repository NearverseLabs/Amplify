"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpAgent = exports.createHttpAgentSync = void 0;
const agent_1 = require("@dfinity/agent");
const network_1 = require("./network");
const openchat_shared_1 = require("openchat-shared");
function createHttpAgentSync(identity, icUrl) {
    const [agent] = createHttpAgentInternal(identity, icUrl);
    return agent;
}
exports.createHttpAgentSync = createHttpAgentSync;
async function createHttpAgent(identity, icUrl) {
    const [agent, fetchRootKeyPromise] = createHttpAgentInternal(identity, icUrl);
    await fetchRootKeyPromise;
    return agent;
}
exports.createHttpAgent = createHttpAgent;
function createHttpAgentInternal(identity, icUrl) {
    const agent = agent_1.HttpAgent.createSync({
        identity,
        host: icUrl,
        verifyQuerySignatures: false,
    });
    const fetchRootKey = !(0, network_1.isMainnet)(icUrl) && !(0, openchat_shared_1.offline)();
    const fetchRootKeyPromise = fetchRootKey
        ? agent.fetchRootKey().then((_) => { })
        : Promise.resolve();
    return [agent, fetchRootKeyPromise];
}
