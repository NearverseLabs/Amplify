import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Campaign {
  'reward' : Tokens,
  'participants' : Array<Participant>,
  'tweet_id' : string,
  'starts_at' : bigint,
  'selected_winners' : Array<Participant>,
  'reward_token' : Principal,
  'ends_at' : bigint,
  'user_id' : Principal,
  'campaign_id' : bigint,
  'project_name' : string,
  'winners' : bigint,
}
export type CampaignResult = { 'Ok' : bigint } |
  { 'Err' : string };
export type CommonResult = { 'Ok' : boolean } |
  { 'Err' : string };
export interface CreateCampaignArgs {
  'reward' : Tokens,
  'tweet_id' : string,
  'starts_at' : bigint,
  'reward_token' : Principal,
  'ends_at' : bigint,
  'user_id' : Principal,
  'project_name' : string,
  'winners' : bigint,
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
  'min_reward_amount' : bigint,
  'platform_fees' : bigint,
  'min_winners' : bigint,
  'max_winners' : bigint,
}
export interface Tokens { 'e8s' : bigint }
export interface Users {
  'id' : Principal,
  'name' : string,
  'twitter_username' : string,
}
export interface UsersArgs { 'name' : string, 'twitter_username' : string }
export interface Winner { 'reward_claimed' : boolean, 'user_id' : Principal }
export interface _SERVICE {
  'am_i_a_winner' : ActorMethod<[bigint], boolean>,
  'clear' : ActorMethod<[], undefined>,
  'create_campaign' : ActorMethod<[CreateCampaignArgs], CampaignResult>,
  'get_whitelisted_tokens' : ActorMethod<[], Array<Principal>>,
  'greet' : ActorMethod<[string], string>,
  'have_i_participated' : ActorMethod<[bigint], CommonResult>,
  'is_token_whitelisted' : ActorMethod<[Principal], boolean>,
  'my_claimed_campaigns' : ActorMethod<[], Array<Campaign>>,
  'my_unclaimed_campaigns' : ActorMethod<[], Array<Campaign>>,
  'paginate_campaigns' : ActorMethod<[PaginationArgs], Array<Campaign>>,
  'paginate_users' : ActorMethod<[PaginationArgs], Array<Users>>,
  'paginate_winners' : ActorMethod<
    [bigint, PaginationArgs],
    Array<Participant>
  >,
  'participate_in_campaign' : ActorMethod<[bigint], CommonResult>,
  'register_user' : ActorMethod<[UsersArgs], CommonResult>,
  'search_campaigns_by_project_name' : ActorMethod<[string], Array<Campaign>>,
  'select_winners' : ActorMethod<[bigint], CommonResult>,
  'submit_participants' : ActorMethod<[bigint, Array<Principal>], CommonResult>,
  'unwhitelist_token' : ActorMethod<[Principal], CommonResult>,
  'update_max_winners' : ActorMethod<[bigint], CommonResult>,
  'update_min_reward_amount' : ActorMethod<[bigint], CommonResult>,
  'update_min_winners' : ActorMethod<[bigint], CommonResult>,
  'update_platform_fees' : ActorMethod<[bigint], CommonResult>,
  'whitelist_token' : ActorMethod<[Principal], CommonResult>,
}
