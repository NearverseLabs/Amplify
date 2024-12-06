import type { Level } from "./structure";
export type EnhancedAccessGate = {
    level: Level;
    expiry: bigint | undefined;
} & AccessGate;
export type AccessGate = LeafGate | CompositeGate;
export type AccessGateConfig = {
    gate: AccessGate;
    expiry: bigint | undefined;
};
export type ActiveLeafGate = Exclude<LeafGate, NoGate>;
export type PreprocessedGate = CredentialGate | PaymentGate | UniquePersonGate;
export type MergeableAccessGate = DiamondGate | LifetimeDiamondGate | UniquePersonGate | LockedGate | ReferredByMemberGate;
export type LeafGate = NoGate | NeuronGate | PaymentGate | DiamondGate | LifetimeDiamondGate | NftGate | CredentialGate | TokenBalanceGate | UniquePersonGate | LockedGate | ReferredByMemberGate;
export type ReferredByMemberGate = {
    kind: "referred_by_member_gate";
};
export type LockedGate = {
    kind: "locked_gate";
};
export type CompositeGate = {
    kind: "composite_gate";
    gates: LeafGate[];
    operator: "and" | "or";
};
export type NoGate = {
    kind: "no_gate";
};
export type NftGate = {
    kind: "nft_gate";
};
export type Credential = {
    credentialName: string;
    issuerCanisterId: string;
    issuerOrigin: string;
    credentialType: string;
    credentialArguments?: Record<string, string | number>;
};
export type CredentialGate = {
    kind: "credential_gate";
    credential: Credential;
};
export type VerifiedCredentialArgs = {
    userIIPrincipal: string;
    iiOrigin: string;
    credentialJwts: string[];
};
export type NeuronGate = {
    kind: "neuron_gate";
    governanceCanister: string;
    minStakeE8s?: number;
    minDissolveDelay?: number;
};
export type PaymentGateApproval = {
    amount: bigint;
    approvalFee: bigint;
};
export type PaymentGateApprovals = Map<string, PaymentGateApproval>;
export type PaymentGate = {
    kind: "payment_gate";
    ledgerCanister: string;
    amount: bigint;
    fee: bigint;
};
export type TokenBalanceGate = {
    kind: "token_balance_gate";
    ledgerCanister: string;
    minBalance: bigint;
};
export declare function isLeafGate(gate: AccessGate): gate is LeafGate;
export declare function shouldPreprocessGate(gate: AccessGate): gate is PreprocessedGate;
export declare function isLocked(gate: AccessGate | undefined): boolean;
export declare function isCompositeGate(gate: AccessGate): gate is CompositeGate;
export declare function isNeuronGate(gate: AccessGate): gate is NeuronGate;
export declare function isPaymentGate(gate: AccessGate): gate is PaymentGate;
export declare function isBalanceGate(gate: AccessGate): gate is TokenBalanceGate;
export declare function isCredentialGate(gate: AccessGate): gate is CredentialGate;
export declare function isUniquePersonGate(gate: AccessGate): gate is UniquePersonGate;
export declare function isLifetimeDiamondGate(gate: AccessGate): gate is LifetimeDiamondGate;
export declare function isDiamondGate(gate: AccessGate): gate is DiamondGate;
export type DiamondGate = {
    kind: "diamond_gate";
};
export type LifetimeDiamondGate = {
    kind: "lifetime_diamond_gate";
};
export type UniquePersonGate = {
    kind: "unique_person_gate";
};
export type AccessControlled = {
    gateConfig: AccessGateConfig;
    public: boolean;
    frozen: boolean;
    historyVisible: boolean;
};
export type VersionedRules = Rules & {
    version: number;
};
export type Rules = {
    text: string;
    enabled: boolean;
};
export type UpdatedRules = Rules & {
    newVersion: boolean;
};
export declare function defaultChatRules(level: Level): VersionedRules;
export type GateCheckSucceeded = {
    credentials: string[];
    paymentApprovals: PaymentGateApprovals;
};
