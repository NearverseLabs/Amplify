"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineClient = void 0;
const candidService_1 = require("../candidService");
const mapping_1 = require("../../utils/mapping");
const mappers_1 = require("./mappers");
const typebox_1 = require("../../typebox");
class OnlineClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
    }
    lastOnline(userIds) {
        const args = {
            user_ids: userIds.map(mapping_1.principalStringToBytes),
        };
        return this.executeMsgpackQuery("last_online", args, mappers_1.lastOnlineResponse, typebox_1.OnlineUsersLastOnlineArgs, typebox_1.OnlineUsersLastOnlineResponse);
    }
    markAsOnline() {
        return this.executeMsgpackUpdate("mark_as_online", {}, mapping_1.toVoid, typebox_1.Empty, typebox_1.OnlineUsersMarkAsOnlineResponse);
    }
}
exports.OnlineClient = OnlineClient;
