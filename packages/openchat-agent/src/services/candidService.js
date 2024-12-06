"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidService = void 0;
const agent_1 = require("@dfinity/agent");
const principal_1 = require("@dfinity/principal");
const openchat_shared_1 = require("openchat-shared");
const error_1 = require("./error");
const msgpackr_1 = require("msgpackr");
const value_1 = require("@sinclair/typebox/value");
const MAX_RETRIES = process.env.NODE_ENV === "production" ? 7 : 3;
const RETRY_DELAY = 100;
function debug(msg) {
    console.log(msg);
}
const Packer = new msgpackr_1.Packr({
    useRecords: false,
    skipValues: [undefined],
    largeBigIntToString: true,
});
class CandidService {
    createServiceClient(factory) {
        return agent_1.Actor.createActor(factory, {
            agent: this.agent,
            canisterId: this.canisterId,
        });
    }
    get principal() {
        return this.identity.getPrincipal();
    }
    async executeMsgpackQuery(methodName, args, mapper, requestValidator, responseValidator) {
        const payload = CandidService.prepareMsgpackArgs(args, requestValidator);
        return await this.handleQueryResponse(() => this.agent.query(this.canisterId, {
            methodName: methodName + "_msgpack",
            arg: payload,
        }), (resp) => {
            if (resp.status === "replied") {
                return Promise.resolve(CandidService.processMsgpackResponse(resp.reply.arg, mapper, responseValidator));
            }
            else {
                throw new agent_1.QueryCallRejectedError(principal_1.Principal.fromText(this.canisterId), methodName, resp);
            }
        }, args);
    }
    async executeMsgpackUpdate(methodName, args, mapper, requestValidator, responseValidator, onRequestAccepted) {
        const payload = CandidService.prepareMsgpackArgs(args, requestValidator);
        try {
            const { requestId, response } = await this.sendRequestToCanister(() => this.agent.call(this.canisterId, {
                methodName: methodName + "_msgpack",
                arg: payload,
                callSync: onRequestAccepted === undefined,
            }));
            const canisterId = principal_1.Principal.fromText(this.canisterId);
            if (!response.ok) {
                throw new agent_1.UpdateCallRejectedError(canisterId, methodName, requestId, response);
            }
            if (onRequestAccepted !== undefined) {
                onRequestAccepted();
            }
            if (response.body && response.body.certificate) {
                const certTime = this.agent.replicaTime;
                const certificate = await agent_1.Certificate.create({
                    certificate: (0, agent_1.bufFromBufLike)(response.body.certificate),
                    rootKey: this.agent.rootKey,
                    canisterId: principal_1.Principal.from(canisterId),
                    certTime,
                });
                const path = [new TextEncoder().encode("request_status"), requestId];
                const status = new TextDecoder().decode((0, agent_1.lookupResultToBuffer)(certificate.lookup([...path, "status"])));
                switch (status) {
                    case "replied": {
                        const reply = (0, agent_1.lookupResultToBuffer)(certificate.lookup([...path, "reply"]));
                        if (reply) {
                            return Promise.resolve(CandidService.processMsgpackResponse(reply, mapper, responseValidator));
                        }
                        break;
                    }
                    case "rejected":
                        throw new agent_1.UpdateCallRejectedError(canisterId, methodName, requestId, response);
                }
            }
            const { reply } = await this.sendRequestToCanister(() => agent_1.polling.pollForResponse(this.agent, canisterId, requestId, agent_1.polling.defaultStrategy()));
            return Promise.resolve(CandidService.processMsgpackResponse(reply, mapper, responseValidator));
        }
        catch (err) {
            console.log(err, args);
            throw (0, error_1.toCanisterResponseError)(err, this.identity);
        }
    }
    handleResponse(service, mapper, args) {
        return service.then(mapper).catch((err) => {
            console.log(err, args);
            throw (0, error_1.toCanisterResponseError)(err, this.identity);
        });
    }
    handleQueryResponse(serviceCall, mapper, args, retries = 0) {
        return this.sendRequestToCanister(() => serviceCall())
            .then(mapper)
            .catch((err) => {
            const responseErr = (0, error_1.toCanisterResponseError)(err, this.identity);
            const debugInfo = `error: ${JSON.stringify(responseErr, Object.getOwnPropertyNames(responseErr))}, args: ${JSON.stringify(args)}`;
            if (!(responseErr instanceof openchat_shared_1.ResponseTooLargeError) &&
                !(responseErr instanceof openchat_shared_1.SessionExpiryError) &&
                !(responseErr instanceof openchat_shared_1.DestinationInvalidError) &&
                !(responseErr instanceof openchat_shared_1.AuthError) &&
                retries < MAX_RETRIES) {
                const delay = RETRY_DELAY * Math.pow(2, retries);
                if (responseErr instanceof error_1.ReplicaNotUpToDateError) {
                    debug(`query: replica not up to date, retrying in ${delay}ms. retries: ${retries}. ${debugInfo}`);
                }
                else {
                    debug(`query: error occurred, retrying in ${delay}ms. retries: ${retries}. ${debugInfo}`);
                }
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        this.handleQueryResponse(serviceCall, mapper, args, retries + 1)
                            .then(resolve)
                            .catch(reject);
                    }, delay);
                });
            }
            else {
                debug(`query: Error performing query request, exiting retry loop. retries: ${retries}. ${debugInfo}`);
                throw responseErr;
            }
        });
    }
    async sendRequestToCanister(requestFn, isRetry = false) {
        try {
            return await requestFn();
        }
        catch (err) {
            if (!isRetry && err instanceof agent_1.ReplicaTimeError) {
                this.agent.replicaTime = err.replicaTime;
                console.log("Set replica time to " + err.replicaTime);
                return await this.sendRequestToCanister(requestFn, true);
            }
            throw err;
        }
    }
    static validate(value, validator) {
        try {
            return value_1.Value.Parse(validator, value);
        }
        catch (err) {
            throw new Error("Validation failed: " + JSON.stringify(err));
        }
    }
    static prepareMsgpackArgs(value, validator) {
        const validated = CandidService.validate(value, validator);
        return Packer.pack(validated);
    }
    static processMsgpackResponse(responseBytes, mapper, validator) {
        const response = Packer.unpack(new Uint8Array(responseBytes));
        try {
            const validated = CandidService.validate(response, validator);
            return mapper(validated);
        }
        catch (err) {
            console.error("Validation failed for response: ", response);
            throw err;
        }
    }
    constructor(identity, agent, canisterId) {
        this.identity = identity;
        this.agent = agent;
        this.canisterId = canisterId;
    }
}
exports.CandidService = CandidService;
