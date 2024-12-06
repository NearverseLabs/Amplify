"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountTransactions = void 0;
const mapping_1 = require("../../utils/mapping");
const openchat_shared_1 = require("openchat-shared");
function accountTransactions(candid) {
    if ("Err" in candid) {
        return openchat_shared_1.CommonResponses.failure();
    }
    if ("Ok" in candid) {
        return getTransactions(candid.Ok);
    }
    throw new openchat_shared_1.UnsupportedValueError("Unknown ApiGetTransactionsResult type", candid);
}
exports.accountTransactions = accountTransactions;
function getTransactions(candid) {
    return {
        kind: "success",
        transactions: candid.transactions.map(transaction),
        oldestTransactionId: (0, mapping_1.optional)(candid.oldest_tx_id, mapping_1.identity),
    };
}
function nanosToDate(n) {
    return new Date(Number(n / 1000000n));
}
function transaction(candid) {
    if (candid.transaction.burn[0] !== undefined) {
        const burn = candid.transaction.burn[0];
        return {
            id: candid.id,
            kind: "burn",
            timestamp: nanosToDate(candid.transaction.timestamp),
            memo: (0, mapping_1.optional)(burn.memo, memo),
            createdAt: (0, mapping_1.optional)(burn.created_at_time, nanosToDate),
            amount: burn.amount,
            from: account(burn.from),
            spender: (0, mapping_1.optional)(burn.spender, account),
        };
    }
    if (candid.transaction.mint[0] !== undefined) {
        const mint = candid.transaction.mint[0];
        return {
            id: candid.id,
            kind: "mint",
            timestamp: nanosToDate(candid.transaction.timestamp),
            memo: (0, mapping_1.optional)(mint.memo, memo),
            createdAt: (0, mapping_1.optional)(mint.created_at_time, nanosToDate),
            amount: mint.amount,
            to: account(mint.to),
        };
    }
    if (candid.transaction.approve[0] !== undefined) {
        const approve = candid.transaction.approve[0];
        return {
            id: candid.id,
            kind: "approve",
            timestamp: nanosToDate(candid.transaction.timestamp),
            memo: (0, mapping_1.optional)(approve.memo, memo),
            createdAt: (0, mapping_1.optional)(approve.created_at_time, nanosToDate),
            amount: approve.amount,
            fee: (0, mapping_1.optional)(approve.fee, mapping_1.identity),
            from: account(approve.from),
            expectedAllowance: (0, mapping_1.optional)(approve.expected_allowance, mapping_1.identity),
            expiredAt: (0, mapping_1.optional)(approve.expires_at, mapping_1.identity),
            spender: account(approve.spender),
        };
    }
    if (candid.transaction.transfer[0] !== undefined) {
        const transfer = candid.transaction.transfer[0];
        return {
            id: candid.id,
            kind: "transfer",
            timestamp: nanosToDate(candid.transaction.timestamp),
            memo: (0, mapping_1.optional)(transfer.memo, memo),
            createdAt: (0, mapping_1.optional)(transfer.created_at_time, nanosToDate),
            amount: transfer.amount,
            fee: (0, mapping_1.optional)(transfer.fee, mapping_1.identity),
            to: account(transfer.to),
            from: account(transfer.from),
            spender: (0, mapping_1.optional)(transfer.spender, account),
        };
    }
    throw new Error(`Unexpected transaction type received: ${candid.transaction}`);
}
function memo(candid) {
    return [...candid].map((n) => String.fromCharCode(n)).join("");
}
function account(candid) {
    return candid.owner.toString();
}
