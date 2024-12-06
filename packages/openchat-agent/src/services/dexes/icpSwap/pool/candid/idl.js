"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.idlFactory = void 0;
const idlFactory = ({ IDL }) => {
    const QuoteArgs = IDL.Record({
        'amountIn': IDL.Text,
        'zeroForOne': IDL.Bool,
        'amountOutMinimum': IDL.Text,
    });
    const Error = IDL.Variant({
        'CommonError': IDL.Null,
        'InternalError': IDL.Text,
        'UnsupportedToken': IDL.Text,
        'InsufficientFunds': IDL.Null,
    });
    const QuoteResponse = IDL.Variant({ 'ok': IDL.Nat, 'err': Error });
    return IDL.Service({
        'quoteForAll': IDL.Func([QuoteArgs], [QuoteResponse], ['query']),
    });
};
exports.idlFactory = idlFactory;
const init = ({ IDL }) => { return []; };
exports.init = init;
