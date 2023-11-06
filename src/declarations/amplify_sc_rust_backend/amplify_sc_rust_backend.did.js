export const idlFactory = ({ IDL }) => {
  const Tokens = IDL.Record({ 'e8s' : IDL.Nat64 });
  const Principal = IDL.Principal;
  const CreateCampaignArgs = IDL.Record({
    'reward' : Tokens,
    'tweet_id' : IDL.Text,
    'starts_at' : IDL.Nat64,
    'reward_token' : Principal,
    'ends_at' : IDL.Nat64,
    'user_id' : IDL.Principal,
    'project_name' : IDL.Text,
    'winners' : IDL.Nat64,
  });
  const CampaignResult = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text });
  const CommonResult = IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : IDL.Text });
  const Participant = IDL.Record({
    'reward_claimed' : IDL.Bool,
    'user_id' : IDL.Principal,
    'is_verified' : IDL.Bool,
  });
  const Campaign = IDL.Record({
    'reward' : Tokens,
    'participants' : IDL.Vec(Participant),
    'tweet_id' : IDL.Text,
    'starts_at' : IDL.Nat64,
    'selected_winners' : IDL.Vec(Participant),
    'reward_token' : Principal,
    'ends_at' : IDL.Nat64,
    'user_id' : IDL.Principal,
    'campaign_id' : IDL.Nat64,
    'project_name' : IDL.Text,
    'winners' : IDL.Nat64,
  });
  const PaginationArgs = IDL.Record({
    'page_size' : IDL.Nat64,
    'page_number' : IDL.Nat64,
  });
  const Users = IDL.Record({
    'id' : IDL.Principal,
    'name' : IDL.Text,
    'twitter_username' : IDL.Text,
  });
  const UsersArgs = IDL.Record({
    'name' : IDL.Text,
    'twitter_username' : IDL.Text,
  });
  return IDL.Service({
    'am_i_a_winner' : IDL.Func([IDL.Nat64], [IDL.Bool], []),
    'clear' : IDL.Func([], [], ['oneway']),
    'create_campaign' : IDL.Func([CreateCampaignArgs], [CampaignResult], []),
    'get_whitelisted_tokens' : IDL.Func([], [IDL.Vec(Principal)], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'have_i_participated' : IDL.Func([IDL.Nat64], [CommonResult], []),
    'is_token_whitelisted' : IDL.Func([Principal], [IDL.Bool], []),
    'my_claimed_campaigns' : IDL.Func([], [IDL.Vec(Campaign)], []),
    'my_unclaimed_campaigns' : IDL.Func([], [IDL.Vec(Campaign)], []),
    'paginate_campaigns' : IDL.Func([PaginationArgs], [IDL.Vec(Campaign)], []),
    'paginate_users' : IDL.Func([PaginationArgs], [IDL.Vec(Users)], ['query']),
    'paginate_winners' : IDL.Func(
        [IDL.Nat64, PaginationArgs],
        [IDL.Vec(Participant)],
        [],
      ),
    'participate_in_campaign' : IDL.Func([IDL.Nat64], [CommonResult], []),
    'register_user' : IDL.Func([UsersArgs], [CommonResult], []),
    'search_campaigns_by_project_name' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Campaign)],
        [],
      ),
    'select_winners' : IDL.Func([IDL.Nat64], [CommonResult], []),
    'submit_participants' : IDL.Func(
        [IDL.Nat64, IDL.Vec(IDL.Principal)],
        [CommonResult],
        [],
      ),
    'unwhitelist_token' : IDL.Func([Principal], [CommonResult], []),
    'update_max_winners' : IDL.Func([IDL.Nat64], [CommonResult], []),
    'update_min_reward_amount' : IDL.Func([IDL.Nat64], [CommonResult], []),
    'update_min_winners' : IDL.Func([IDL.Nat64], [CommonResult], []),
    'update_platform_fees' : IDL.Func([IDL.Nat64], [CommonResult], []),
    'whitelist_token' : IDL.Func([Principal], [CommonResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
