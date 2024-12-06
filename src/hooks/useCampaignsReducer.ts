import { UserCampaign } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import { useReducer } from "react";

export interface PaginatedCampaigns {
  meta: Meta;
  data: PaginatedCampaign[];
}

export interface PaginatedCampaign {
  id: number;
  user_id: null;
  project_name: string;
  tweet_id: string;
  campaign_id: number;
  winners: number;
  reward_token: string;
  reward: string;
  is_deposited: number;
  requirements: Requirements;
  starts_at: Date;
  ends_at: Date;
  created_at: Date;
  updated_at: Date;
  participated: boolean;
  winner: boolean;
  finalised: boolean;
  total_participants: number;
}

export interface Requirements {
  follow: boolean;
  like: boolean;
  comment: boolean;
  repost: boolean;
  join_group: boolean;
  join_community: boolean;
  active_in_group_time: boolean;
  messages_in_group: boolean;
  active_in_community_time: boolean;
  messages_in_community: boolean;
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: null;
  previous_page_url: null;
}

export interface CreateCampaignInput {
  project_name: string;
  platform: string;
  user_id: string;
  // tweet_id: string;
  winners: string;
  reward_token: string;
  reward: string;
  messages_in_community: number;
  messages_in_group: number;
  active_in_community_time: number;
  active_in_group_time: number;
  join_group?: string | null;
  join_community?: string | null;
  requirements: Requirements;
  startsAt: string;
  endsAt: string;
}

// export interface PaginatedCampaign extends UserCampaign {}

type Action =
  | { type: "ADD_CAMPAIGN"; campaign: PaginatedCampaign }
  | { type: "ADD_OR_UPDATE_CAMPAIGNS"; campaign: PaginatedCampaign[] }
  | { type: "CLEAR_CAMPAIGNS" }
  | { type: "ADD_CAMPAIGNS"; campaign: PaginatedCampaign[] }
  | {
      type: "UPDATE_CAMPAIGN";
      campaignId: number;
      updatedCampaign: PaginatedCampaign;
    }
  | { type: "DELETE_CAMPAIGN"; campaignId: number };

export const initialCampaignsState: PaginatedCampaign[] = [];

export function campaignReducer(
  state: PaginatedCampaign[],
  action: Action,
): PaginatedCampaign[] {
  switch (action.type) {
    case "CLEAR_CAMPAIGNS":
      return [];

    case "ADD_CAMPAIGN":
      return [...state, action.campaign];

    case "ADD_CAMPAIGNS":
      return [...state, ...action.campaign];

    case "ADD_OR_UPDATE_CAMPAIGNS":
      // If the state is empty, simply return the action.campaigns
      if (state.length === 0) {
        return action.campaign;
      } else {
        const updatedCampaigns = state.map((existingCampaign) => {
          const paginatedCampaign = action.campaign.find(
            (newCampaign) => newCampaign.id === existingCampaign.id,
          );

          return paginatedCampaign || existingCampaign;
        });
        // Remove campaigns that are not present in action.campaign
        const campaignIdsInAction = action.campaign.map(
          (newCampaign) => newCampaign.id,
        );
        const filteredCampaigns = updatedCampaigns.filter((existingCampaign) =>
          campaignIdsInAction.includes(existingCampaign.id),
        );

        return filteredCampaigns;
      }

    case "UPDATE_CAMPAIGN":
      return state.map((campaign) =>
        campaign.id === action.campaignId
          ? { ...campaign, ...action.updatedCampaign }
          : campaign,
      );

    case "DELETE_CAMPAIGN":
      return state.filter((campaign) => campaign.id !== action.campaignId);

    default:
      return state;
  }
}

export const useCampaignsReducer = () => {
  const [campaigns, dispatch] = useReducer(
    campaignReducer,
    initialCampaignsState,
  );

  const addCampaign = (newCampaign: PaginatedCampaign) => {
    dispatch({ type: "ADD_CAMPAIGN", campaign: newCampaign });
  };

  const addCampaigns = (newCampaign: PaginatedCampaign[]) => {
    dispatch({ type: "ADD_CAMPAIGNS", campaign: newCampaign });
  };

  const addOrUpdateCampaigns = (newCampaign: PaginatedCampaign[]) => {
    dispatch({ type: "ADD_OR_UPDATE_CAMPAIGNS", campaign: newCampaign });
  };

  const clearCampaigns = () => {
    dispatch({ type: "CLEAR_CAMPAIGNS" });
  };

  const updateCampaign = (
    campaignId: number,
    updatedCampaign: PaginatedCampaign,
  ) => {
    dispatch({ type: "UPDATE_CAMPAIGN", campaignId, updatedCampaign });
  };

  const deleteCampaign = (campaignId: number) => {
    dispatch({ type: "DELETE_CAMPAIGN", campaignId });
  };

  return {
    campaigns,
    dispatch,
    addCampaign,
    addOrUpdateCampaigns,
    updateCampaign,
    deleteCampaign,
    addCampaigns,
    clearCampaigns,
  };
};
