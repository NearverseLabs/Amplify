"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkedChatEventsWindowFromBackend = exports.chunkedChatEventsFromBackend = void 0;
const openchat_shared_1 = require("openchat-shared");
function mergeEventsResponse(a, b) {
    return {
        events: [...a.events, ...b.events],
        expiredEventRanges: [...a.expiredEventRanges, ...b.expiredEventRanges],
        expiredMessageRanges: [...a.expiredMessageRanges, ...b.expiredMessageRanges],
        latestEventIndex: Math.max(a.latestEventIndex ?? 0, b.latestEventIndex ?? 0),
    };
}
async function chunkedChatEventsFromBackend(eventsFn, [minIndex, maxIndex], startIndex, ascending) {
    const chunkSize = openchat_shared_1.MAX_EVENTS / 5;
    let index = startIndex;
    let aggregatedResponse = {
        events: [],
        expiredEventRanges: [],
        expiredMessageRanges: [],
        latestEventIndex: undefined,
    };
    while (aggregatedResponse.events.length < openchat_shared_1.MAX_EVENTS &&
        index >= minIndex &&
        index <= maxIndex) {
        try {
            const resp = await eventsFn(index, chunkSize);
            if (resp === "events_failed")
                return resp;
            aggregatedResponse = ascending
                ? mergeEventsResponse(aggregatedResponse, resp)
                : mergeEventsResponse(resp, aggregatedResponse);
            if (resp.events.length > 0) {
                index = ascending
                    ? resp.events[resp.events.length - 1].index + 1
                    : resp.events[0].index - 1;
            }
        }
        catch (err) {
            if (err instanceof openchat_shared_1.ResponseTooLargeError) {
                console.error("Response size still too large with chunk size: ", chunkSize);
            }
            throw err;
        }
    }
    return aggregatedResponse;
}
exports.chunkedChatEventsFromBackend = chunkedChatEventsFromBackend;
async function chunkedChatEventsWindowFromBackend(eventsFn, eventsWindowFn, [minIndex, maxIndex], messageIndex) {
    const chunkSize = openchat_shared_1.MAX_EVENTS / 5;
    let highIndex = messageIndex;
    let lowIndex = messageIndex;
    let aggregatedResponse = {
        events: [],
        expiredEventRanges: [],
        expiredMessageRanges: [],
        latestEventIndex: undefined,
    };
    while (aggregatedResponse.events.length < openchat_shared_1.MAX_EVENTS &&
        (lowIndex >= minIndex || highIndex <= maxIndex)) {
        try {
            if (lowIndex === highIndex) {
                const resp = await eventsWindowFn(lowIndex, chunkSize);
                if (resp === "events_failed")
                    return resp;
                aggregatedResponse = mergeEventsResponse(aggregatedResponse, resp);
            }
            else {
                if (lowIndex >= minIndex) {
                    const above = await eventsFn(lowIndex, false, chunkSize);
                    if (above === "events_failed")
                        return "events_failed";
                    aggregatedResponse = mergeEventsResponse(above, aggregatedResponse);
                }
                if (highIndex <= maxIndex) {
                    const below = await eventsFn(highIndex, true, chunkSize);
                    if (below === "events_failed")
                        return "events_failed";
                    aggregatedResponse = mergeEventsResponse(aggregatedResponse, below);
                }
            }
            if (aggregatedResponse.events.length > 0) {
                lowIndex = aggregatedResponse.events[0].index - 1;
                highIndex =
                    aggregatedResponse.events[aggregatedResponse.events.length - 1].index + 1;
            }
        }
        catch (err) {
            if (err instanceof openchat_shared_1.ResponseTooLargeError) {
                console.error("Response size still too large with chunk size: ", chunkSize);
            }
            throw err;
        }
    }
    return aggregatedResponse;
}
exports.chunkedChatEventsWindowFromBackend = chunkedChatEventsWindowFromBackend;
