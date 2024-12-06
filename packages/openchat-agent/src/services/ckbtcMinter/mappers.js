"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBtcBalanceResponse = void 0;
const openchat_shared_1 = require("openchat-shared");
const mapping_1 = require("../../utils/mapping");
function updateBtcBalanceResponse(candid) {
    if ("Ok" in candid) {
        return {
            kind: "success",
            result: candid.Ok.map(utxoStatus),
        };
    }
    return updateBtcBalanceError(candid.Err);
}
exports.updateBtcBalanceResponse = updateBtcBalanceResponse;
function updateBtcBalanceError(candid) {
    if ("GenericError" in candid) {
        return {
            kind: "generic_error",
            errorMessage: candid.GenericError.error_message,
            errorCode: candid.GenericError.error_code,
        };
    }
    if ("TemporarilyUnavailable" in candid) {
        return {
            kind: "temporarily_unavailable",
            message: candid.TemporarilyUnavailable,
        };
    }
    if ("AlreadyProcessing" in candid) {
        return {
            kind: "already_processing",
        };
    }
    if ("NoNewUtxos" in candid) {
        return {
            kind: "no_new_utxos",
            requiredConfirmations: candid.NoNewUtxos.required_confirmations,
            pendingUtxos: (0, mapping_1.optional)(candid.NoNewUtxos.pending_utxos, (p) => p.map(pendingUtxo)) ?? [],
            currentConfirmations: (0, mapping_1.optional)(candid.NoNewUtxos.current_confirmations, mapping_1.identity),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected UpdateBtcBalanceResponse type received", candid);
}
function utxoStatus(candid) {
    if ("ValueTooSmall" in candid) {
        return {
            kind: "value_too_small",
            utxo: utxo(candid.ValueTooSmall),
        };
    }
    if ("Tainted" in candid) {
        return {
            kind: "tainted",
            utxo: utxo(candid.Tainted),
        };
    }
    if ("Minted" in candid) {
        return {
            kind: "minted",
            mintedAmount: candid.Minted.minted_amount,
            blockIndex: candid.Minted.block_index,
            utxo: utxo(candid.Minted.utxo),
        };
    }
    if ("Checked" in candid) {
        return {
            kind: "checked",
            utxo: utxo(candid.Checked),
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiUtxoStatus type received", candid);
}
function utxo(candid) {
    return {
        height: candid.height,
        value: candid.value,
        outpoint: outpoint(candid.outpoint),
    };
}
function pendingUtxo(candid) {
    return {
        confirmations: candid.confirmations,
        value: candid.value,
        outpoint: outpoint(candid.outpoint),
    };
}
function outpoint(candid) {
    return {
        txid: (0, mapping_1.consolidateBytes)(candid.txid),
        vout: candid.vout,
    };
}
