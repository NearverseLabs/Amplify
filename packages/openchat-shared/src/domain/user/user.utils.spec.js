"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_utils_1 = require("./user.utils");
const vitest_1 = require("vitest");
const now = Date.now();
vitest_1.vi.setSystemTime(now);
const lookup = new Map([
    [
        "a",
        {
            kind: "user",
            userId: "a",
            username: "a",
            displayName: undefined,
            updated: BigInt(0),
            suspended: false,
            diamondStatus: "inactive",
            chitBalance: 0,
            streak: 0,
            isUniquePerson: false,
            totalChitEarned: 0,
        },
    ],
    [
        "b",
        {
            kind: "user",
            userId: "b",
            username: "b",
            displayName: undefined,
            updated: BigInt(0),
            suspended: false,
            diamondStatus: "inactive",
            chitBalance: 0,
            streak: 0,
            isUniquePerson: false,
            totalChitEarned: 0,
        },
    ],
    [
        "xyz",
        {
            kind: "user",
            userId: "xyz",
            username: "julian_jelfs",
            displayName: undefined,
            updated: BigInt(0),
            suspended: false,
            diamondStatus: "inactive",
            chitBalance: 0,
            streak: 0,
            isUniquePerson: false,
            totalChitEarned: 0,
        },
    ],
    [
        "alpha",
        {
            kind: "user",
            userId: "alpha",
            username: "alpha",
            displayName: undefined,
            updated: BigInt(0),
            suspended: false,
            diamondStatus: "inactive",
            chitBalance: 0,
            streak: 0,
            isUniquePerson: false,
            totalChitEarned: 0,
        },
    ],
]);
describe("extract user ids from mentions", () => {
    test("extract a single user id", () => {
        const parsed = (0, user_utils_1.extractUserIdsFromMentions)("hello there @UserId(xyz), how are you?");
        expect(parsed).toEqual(["xyz"]);
    });
    test("extract multiple user ids", () => {
        const parsed = (0, user_utils_1.extractUserIdsFromMentions)("hello there @UserId(xyz) and hello @UserId(abc), how are you?");
        expect(parsed).toEqual(["xyz", "abc"]);
    });
    test("when there are no userIds to extract", () => {
        const parsed = (0, user_utils_1.extractUserIdsFromMentions)("this is a string that doesn't have any userIds");
        expect(parsed).toEqual([]);
    });
});
describe("missing userIds", () => {
    test("should work", () => {
        const missing = (0, user_utils_1.missingUserIds)(lookup, new Set(["a", "b", "c", "d", "e"]));
        ["c", "d", "e"].forEach((u) => expect(missing.includes(u)).toBe(true));
    });
});
