import { useReducer } from 'react';
import {WhiteListedToken} from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import {Allowance} from "@/declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";

export interface RewardToken extends WhiteListedToken {
    name: string;
    symbol: string;
    decimal: number;
    fee: bigint;
    balance?: bigint;
    allowance?: Allowance;
    internal_token_name?: string;
}

type RewardTokenAction =
    | { type: 'ADD_REWARD_TOKEN'; tokenId: string; rewardToken: RewardToken }
    | { type: 'REMOVE_REWARD_TOKEN'; tokenId: string };

function rewardTokenReducer(state: Record<string, RewardToken>, action: RewardTokenAction): Record<string, RewardToken> {
    switch (action.type) {
        case 'ADD_REWARD_TOKEN':
            let oldState = { ...state };
            oldState[action.tokenId] = action.rewardToken;
            return oldState;

        case 'REMOVE_REWARD_TOKEN':
            const newState = { ...state };
            delete newState[action.tokenId];
            return newState;

        default:
            return state;
    }
}

export const useRewardToken = () => {
    const [rewardTokens, dispatchRewardToken] = useReducer(rewardTokenReducer, {});

    const addRewardToken = (tokenId: string, token: RewardToken) => {
        dispatchRewardToken({ type: 'ADD_REWARD_TOKEN', tokenId, rewardToken: token });
    };

    // Example of removing a reward token for a campaign
    const removeRewardToken = (tokenId: string) => {
        dispatchRewardToken({ type: 'REMOVE_REWARD_TOKEN', tokenId });
    };
    return {rewardTokens, addRewardToken, removeRewardToken}
}
