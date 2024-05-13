import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Campaign {
  'reward' : Tokens,
  'participants' : Array<Participant>,
  'tweet_id' : string,
  'starts_at' : bigint,
  'selected_winners' : Array<Participant>,
  'reward_token' : Principal,
  'is_deposited' : boolean,
  'ends_at' : bigint,
  'user_id' : Principal,
  'is_verified' : boolean,
  'requirements' : CreateCampaignRequirements,
  'campaign_id' : bigint,
  'project_name' : string,
  'winners' : bigint,
  'total_withdrawn' : bigint,
}
export interface CampaignFilter {
  'status' : [] | [CampaignStatus],
  'reward_token' : [] | [Principal],
  'my_participated_campaigns' : [] | [Principal],
  'to_be_verified' : [] | [boolean],
  'my_created_campaigns' : [] | [Principal],
  'project_name' : [] | [string],
  'my_unclaimed_campaigns' : [] | [Principal],
  'my_claimed_campaigns' : [] | [Principal],
}
export type CampaignResult = { 'Ok' : bigint } |
  { 'Err' : string };
export type CampaignStatus = { 'Ended' : null } |
  { 'Live' : null } |
  { 'Upcoming' : null };
export type CommonResult = { 'Ok' : boolean } |
  { 'Err' : string };
export type CommonResultCampaign = { 'Ok' : Campaign } |
  { 'Err' : string };
export type CommonResultCampaigns = { 'Ok' : Array<Campaign> } |
  { 'Err' : string };
export type CommonResultUser = { 'Ok' : Users } |
  { 'Err' : string };
export type CommonResultUsers = { 'Ok' : Array<Users> } |
  { 'Err' : string };
export interface CreateCampaignArgs {
  'reward' : Tokens,
  'tweet_id' : string,
  'starts_at' : bigint,
  'reward_token' : Principal,
  'ends_at' : bigint,
  'user_id' : Principal,
  'requirements' : CreateCampaignRequirements,
  'project_name' : string,
  'winners' : bigint,
}
export interface CreateCampaignRequirements {
  'retweet' : boolean,
  'like' : boolean,
  'quote_retweet' : boolean,
  'tweet_reply' : boolean,
  'follow' : boolean,
}
export type Memo = bigint;
export interface PaginationArgs { 'page_size' : bigint, 'page_number' : bigint }
export interface Participant {
  'reward_claimed' : boolean,
  'user_id' : Principal,
  'is_verified' : boolean,
}
export type Principal = Principal;
export interface Settings {
  'platform_fees' : bigint,
  'min_winners' : bigint,
  'max_winners' : bigint,
  'platform_fee_owner' : Principal,
}
export interface Tokens { 'e8s' : bigint }
export interface UserCampaign {
  'won' : boolean,
  'participated' : boolean,
  'campaign' : Campaign,
  'total_participants' : bigint,
}
export interface Users {
  'id' : Principal,
  'name' : string,
  'twitter_username' : string,
}
export interface WhiteListedToken {
  'token' : Principal,
  'min_reward' : bigint,
  'token_type' : string,
}
export type WhiteListedTokenResult = { 'Ok' : boolean } |
  { 'Err' : string };
export interface Winner { 'reward_claimed' : boolean, 'user_id' : Principal }
export interface _SERVICE {
  'am_i_a_winner' : ActorMethod<[bigint], boolean>,
  'campaign_by_id' : ActorMethod<[bigint], CommonResultCampaign>,
  'claimReward' : ActorMethod<[bigint], CommonResult>,
  'clear' : ActorMethod<[], undefined>,
  'create_campaign' : ActorMethod<[CreateCampaignArgs], CampaignResult>,
  'current_time' : ActorMethod<[], bigint>,
  'deposit_campaign' : ActorMethod<[bigint], CommonResult>,
  'getDepositAddress' : ActorMethod<[], string>,
  'get_settings' : ActorMethod<[], Settings>,
  'get_user' : ActorMethod<[Principal], CommonResultUser>,
  'get_whitelisted_tokens' : ActorMethod<[], Array<WhiteListedToken>>,
  'greet' : ActorMethod<[string], string>,
  'have_i_participated' : ActorMethod<[bigint], CommonResult>,
  'is_owner' : ActorMethod<[], boolean>,
  'is_token_whitelisted' : ActorMethod<[Principal], boolean>,
  'paginate_campaigns' : ActorMethod<
    [PaginationArgs, CampaignFilter],
    Array<UserCampaign>
  >,
  'paginate_participants' : ActorMethod<
    [bigint, PaginationArgs],
    [Array<Participant>, Array<Users>]
  >,
  'paginate_users' : ActorMethod<[PaginationArgs], Array<Users>>,
  'paginate_winners' : ActorMethod<
    [bigint, PaginationArgs],
    Array<Participant>
  >,
  'participate_in_campaign' : ActorMethod<[bigint], CommonResult>,
  'register_user' : ActorMethod<[Users], CommonResult>,
  'search_campaigns_by_project_name' : ActorMethod<[string], Array<Campaign>>,
  'select_winners' : ActorMethod<[bigint], CommonResult>,
  'submit_participants' : ActorMethod<[bigint, Array<Principal>], CommonResult>,
  'total_campaigns' : ActorMethod<[], bigint>,
  'total_users' : ActorMethod<[], bigint>,
  'transfer_owner' : ActorMethod<[Principal], CommonResult>,
  'transfer_service_account' : ActorMethod<[Principal], CommonResult>,
  'unwhitelist_token' : ActorMethod<[Principal], CommonResult>,
  'update_max_winners' : ActorMethod<[bigint], CommonResult>,
  'update_min_reward_amount' : ActorMethod<
    [Principal, bigint, string],
    CommonResult
  >,
  'update_min_winners' : ActorMethod<[bigint], CommonResult>,
  'update_platform_fee_owner' : ActorMethod<[Principal], CommonResult>,
  'update_platform_fees' : ActorMethod<[bigint], CommonResult>,
  'update_user' : ActorMethod<[Users], CommonResult>,
  'whitelist_token' : ActorMethod<
    [Principal, bigint, string],
    WhiteListedTokenResult
  >,
}
