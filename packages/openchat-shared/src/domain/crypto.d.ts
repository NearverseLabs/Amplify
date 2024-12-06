import type { Failure, Success } from "./response";
export declare const E8S_PER_TOKEN = 100000000;
export declare const CHAT_SYMBOL = "CHAT";
export declare const ICP_SYMBOL = "ICP";
export declare const CKBTC_SYMBOL = "ckBTC";
export declare const SNS1_SYMBOL = "SNS1";
export declare const KINIC_SYMBOL = "KINIC";
export declare const HOTORNOT_SYMBOL = "HOT";
export declare const GHOST_SYMBOL = "GHOST";
export declare const LEDGER_CANISTER_ICP = "ryjl3-tyaaa-aaaaa-aaaba-cai";
export declare const LEDGER_CANISTER_CHAT = "2ouva-viaaa-aaaaq-aaamq-cai";
export declare const DEFAULT_TOKENS: string[];
export type CryptocurrencyDetails = {
    name: string;
    symbol: string;
    ledger: string;
    decimals: number;
    transferFee: bigint;
    logo: string;
    howToBuyUrl: string;
    infoUrl: string;
    transactionUrlFormat: string;
    supportedStandards: string[];
    added: bigint;
    enabled: boolean;
    lastUpdated: bigint;
};
export type EnhancedTokenDetails = CryptocurrencyDetails & {
    balance: bigint;
    dollarBalance: number | undefined;
    icpBalance: number | undefined;
    btcBalance: number | undefined;
    ethBalance: number | undefined;
    zero: boolean;
    urlFormat: string;
};
export type NervousSystemSummary = {
    rootCanisterId: string;
    governanceCanisterId: string;
    ledgerCanisterId: string;
    indexCanisterId: string;
    isNns: boolean;
    proposalRejectionFee: bigint;
    submittingProposalsEnabled: boolean;
};
export type NervousSystemDetails = {
    governanceCanisterId: string;
    rootCanisterId: string;
    ledgerCanisterId: string;
    indexCanisterId: string;
    isNns: boolean;
    proposalRejectionFee: bigint;
    submittingProposalsEnabled: boolean;
    token: CryptocurrencyDetails;
};
type AccountTransactionCommon = {
    timestamp: Date;
    id: bigint;
    memo?: string;
    createdAt?: Date;
    amount: bigint;
    to?: string;
    from?: string;
};
type AccountTransactionBurn = AccountTransactionCommon & {
    kind: "burn";
    spender?: string;
};
type AccountTransactionMint = AccountTransactionCommon & {
    kind: "mint";
};
type AccountTransactionApprove = AccountTransactionCommon & {
    kind: "approve";
    fee?: bigint;
    expectedAllowance?: bigint;
    expiredAt?: bigint;
    spender?: string;
};
type AccountTransactionTransfer = AccountTransactionCommon & {
    kind: "transfer";
    fee?: bigint;
    spender?: string;
};
export type AccountTransaction = AccountTransactionBurn | AccountTransactionMint | AccountTransactionTransfer | AccountTransactionApprove;
export type AccountTransactions = {
    transactions: AccountTransaction[];
    oldestTransactionId?: bigint;
};
export type AccountTransactionResult = Failure | (Success & AccountTransactions);
export type TokenExchangeRates = {
    toICP: number | undefined;
    toUSD: number | undefined;
};
export type WalletConfig = AutoWallet | ManualWallet;
export type AutoWallet = {
    kind: "auto_wallet";
    minDollarValue: number;
};
export type ManualWallet = {
    kind: "manual_wallet";
    tokens: Set<string>;
};
export {};
