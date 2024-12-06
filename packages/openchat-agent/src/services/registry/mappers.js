"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatesResponse = void 0;
const mapping_1 = require("../../utils/mapping");
const openchat_shared_1 = require("openchat-shared");
const chat_1 = require("../../utils/chat");
function updatesResponse(value, blobUrlPattern, registryCanisterId) {
    if (value === "SuccessNoUpdates") {
        return {
            kind: "success_no_updates",
        };
    }
    if ("Success" in value) {
        const communityId = "txydz-jyaaa-aaaaf-bifea-cai";
        const channelId = "3564534936";
        const channelName = "December airdrop";
        const communityName = "CHIT for CHAT";
        return {
            kind: "success",
            lastUpdated: value.Success.last_updated,
            tokenDetails: (0, mapping_1.mapOptional)(value.Success.token_details, (tokens) => tokens.map((t) => tokenDetails(t, blobUrlPattern, registryCanisterId))) ?? [],
            nervousSystemSummary: value.Success.nervous_system_details.map(nervousSystemSummary),
            swapProviders: (0, mapping_1.mapOptional)(value.Success.swap_providers, (r) => r.map(swapProvider)),
            messageFiltersAdded: value.Success.message_filters_added,
            messageFiltersRemoved: value.Success.message_filters_removed,
            currentAirdropChannel: {
                id: {
                    kind: "channel",
                    communityId,
                    channelId,
                },
                channelName,
                communityName,
                url: `/community/${communityId}/channel/${channelId}`,
            },
        };
    }
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiUpdatesResponse type received", value);
}
exports.updatesResponse = updatesResponse;
function tokenDetails(value, blobUrlPattern, registryCanisterId) {
    const ledger = (0, mapping_1.principalBytesToString)(value.ledger_canister_id);
    return {
        ledger,
        name: value.name,
        symbol: value.symbol,
        decimals: value.decimals,
        transferFee: value.fee,
        logo: value.logo_id !== undefined
            ? (0, chat_1.buildTokenLogoUrl)(blobUrlPattern, registryCanisterId, ledger, BigInt(value.logo_id))
            : value.logo,
        infoUrl: value.info_url,
        howToBuyUrl: value.how_to_buy_url,
        transactionUrlFormat: value.transaction_url_format,
        supportedStandards: value.supported_standards,
        added: value.added,
        enabled: value.enabled,
        lastUpdated: value.last_updated,
    };
}
function nervousSystemSummary(value) {
    return {
        rootCanisterId: (0, mapping_1.principalBytesToString)(value.root_canister_id),
        governanceCanisterId: (0, mapping_1.principalBytesToString)(value.governance_canister_id),
        ledgerCanisterId: (0, mapping_1.principalBytesToString)(value.ledger_canister_id),
        indexCanisterId: (0, mapping_1.principalBytesToString)(value.index_canister_id),
        isNns: value.is_nns,
        proposalRejectionFee: value.proposal_rejection_fee,
        submittingProposalsEnabled: value.submitting_proposals_enabled,
    };
}
function swapProvider(value) {
    if (value === "ICPSwap")
        return "icpswap";
    if (value === "Sonic")
        return "sonic";
    if (value === "KongSwap")
        return "kongswap";
    throw new openchat_shared_1.UnsupportedValueError("Unexpected ApiSwapProvider type received", value);
}
