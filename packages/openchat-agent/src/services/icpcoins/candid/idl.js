"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.idlFactory = void 0;
const idlFactory = ({ IDL }) => {
    const TokenId = IDL.Nat;
    const LatestTokenRow = IDL.Tuple(IDL.Tuple(TokenId, TokenId), IDL.Text, IDL.Float64);
    return IDL.Service({
        'get_latest': IDL.Func([], [IDL.Vec(LatestTokenRow)], ['query']),
    });
};
exports.idlFactory = idlFactory;
const init = ({ IDL }) => { return []; };
exports.init = init;
