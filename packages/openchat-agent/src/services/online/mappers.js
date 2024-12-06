"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastOnlineResponse = void 0;
const mapping_1 = require("../../utils/mapping");
function lastOnlineResponse(value) {
    const now = Date.now();
    return value.Success.reduce((res, next) => {
        res[(0, mapping_1.principalBytesToString)(next.user_id)] =
            now - Number(next.duration_since_last_online);
        return res;
    }, {});
}
exports.lastOnlineResponse = lastOnlineResponse;
