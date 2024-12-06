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
function timestampToDate(ts) {
    return new Date(Number(ts.timestamp_nanos / 1000000n));
}
function transaction(candid) {
    const timestamp = (0, mapping_1.optional)(candid.transaction.timestamp, timestampToDate) ?? new Date();
    const memo = (0, mapping_1.optional)(candid.transaction.icrc1_memo, convertMemo) ?? candid.transaction.memo.toString();
    const createdAt = (0, mapping_1.optional)(candid.transaction.created_at_time, timestampToDate);
    if ("Transfer" in candid.transaction.operation) {
        const transfer = candid.transaction.operation.Transfer;
        return {
            id: candid.id,
            kind: "transfer",
            timestamp,
            memo,
            createdAt,
            amount: transfer.amount.e8s,
            fee: transfer.fee.e8s,
            to: transfer.to,
            from: transfer.from,
            spender: (0, mapping_1.optional)(transfer.spender, mapping_1.identity),
        };
    }
    if ("Burn" in candid.transaction.operation) {
        const burn = candid.transaction.operation.Burn;
        return {
            id: candid.id,
            kind: "burn",
            timestamp,
            memo,
            createdAt,
            amount: burn.amount.e8s,
            from: burn.from,
            spender: (0, mapping_1.optional)(burn.spender, mapping_1.identity),
        };
    }
    if ("Mint" in candid.transaction.operation) {
        const mint = candid.transaction.operation.Mint;
        return {
            id: candid.id,
            kind: "mint",
            timestamp,
            memo,
            createdAt,
            amount: mint.amount.e8s,
            to: mint.to,
        };
    }
    if ("Approve" in candid.transaction.operation) {
        const approve = candid.transaction.operation.Approve;
        return {
            id: candid.id,
            kind: "approve",
            timestamp,
            memo,
            createdAt,
            amount: approve.allowance.e8s,
            fee: approve.fee.e8s,
            from: approve.from,
            expectedAllowance: (0, mapping_1.optional)(approve.expected_allowance, (a) => a.e8s),
            expiredAt: (0, mapping_1.optional)(approve.expires_at, (ts) => ts.timestamp_nanos),
            spender: approve.spender,
        };
    }
    throw new Error(`Unexpected transaction type received: ${candid.transaction}`);
}
function convertMemo(candid) {
    return [...candid].map((n) => String.fromCharCode(n)).join("");
}
