export const idlFactory = ({ IDL }) => {
  const Tokens = IDL.Record({ e8s: IDL.Nat64 });
  const Participant = IDL.Record({
    reward_claimed: IDL.Bool,
    user_id: IDL.Principal,
    is_verified: IDL.Bool,
  });
  const Principal = IDL.Principal;
  const CreateCampaignRequirements = IDL.Record({
    retweet: IDL.Bool,
    like: IDL.Bool,
    quote_retweet: IDL.Bool,
    tweet_reply: IDL.Bool,
    follow: IDL.Bool,
  });
  const Campaign = IDL.Record({
    reward: Tokens,
    participants: IDL.Vec(Participant),
    tweet_id: IDL.Text,
    starts_at: IDL.Nat64,
    selected_winners: IDL.Vec(Participant),
    reward_token: Principal,
    is_deposited: IDL.Bool,
    ends_at: IDL.Nat64,
    user_id: IDL.Principal,
    is_verified: IDL.Bool,
    requirements: CreateCampaignRequirements,
    campaign_id: IDL.Nat64,
    project_name: IDL.Text,
    winners: IDL.Nat64,
    total_withdrawn: IDL.Nat64,
  });
  const CommonResultCampaign = IDL.Variant({
    Ok: Campaign,
    Err: IDL.Text,
  });
  const CommonResult = IDL.Variant({ Ok: IDL.Bool, Err: IDL.Text });
  const CreateCampaignArgs = IDL.Record({
    reward: Tokens,
    tweet_id: IDL.Text,
    starts_at: IDL.Nat64,
    reward_token: Principal,
    ends_at: IDL.Nat64,
    user_id: IDL.Principal,
    requirements: CreateCampaignRequirements,
    project_name: IDL.Text,
    winners: IDL.Nat64,
  });
  const CampaignResult = IDL.Variant({ Ok: IDL.Nat64, Err: IDL.Text });
  const Settings = IDL.Record({
    platform_fees: IDL.Nat64,
    min_winners: IDL.Nat64,
    max_winners: IDL.Nat64,
    platform_fee_owner: Principal,
  });
  const Users = IDL.Record({
    id: IDL.Principal,
    name: IDL.Text,
    twitter_username: IDL.Text,
  });
  const CommonResultUser = IDL.Variant({ Ok: Users, Err: IDL.Text });
  const WhiteListedToken = IDL.Record({
    token: Principal,
    min_reward: IDL.Nat64,
    token_type: IDL.Text,
  });
  const PaginationArgs = IDL.Record({
    page_size: IDL.Nat64,
    page_number: IDL.Nat64,
  });
  const CampaignStatus = IDL.Variant({
    Ended: IDL.Null,
    Live: IDL.Null,
    Upcoming: IDL.Null,
  });
  const CampaignFilter = IDL.Record({
    status: IDL.Opt(CampaignStatus),
    reward_token: IDL.Opt(IDL.Principal),
    my_participated_campaigns: IDL.Opt(IDL.Principal),
    to_be_verified: IDL.Opt(IDL.Bool),
    my_created_campaigns: IDL.Opt(IDL.Principal),
    project_name: IDL.Opt(IDL.Text),
    my_unclaimed_campaigns: IDL.Opt(IDL.Principal),
    my_claimed_campaigns: IDL.Opt(IDL.Principal),
  });
  const UserCampaign = IDL.Record({
    won: IDL.Bool,
    participated: IDL.Bool,
    campaign: Campaign,
    total_participants: IDL.Nat64,
  });
  const WhiteListedTokenResult = IDL.Variant({
    Ok: IDL.Bool,
    Err: IDL.Text,
  });
  return IDL.Service({
    am_i_a_winner: IDL.Func([IDL.Nat64], [IDL.Bool], []),
    campaign_by_id: IDL.Func([IDL.Nat64], [CommonResultCampaign], []),
    claimReward: IDL.Func([IDL.Nat64], [CommonResult], []),
    clear: IDL.Func([], [], ["oneway"]),
    create_campaign: IDL.Func([CreateCampaignArgs], [CampaignResult], []),
    current_time: IDL.Func([], [IDL.Nat64], []),
    deposit_campaign: IDL.Func([IDL.Nat64], [CommonResult], []),
    getDepositAddress: IDL.Func([], [IDL.Text], []),
    get_settings: IDL.Func([], [Settings], []),
    get_user: IDL.Func([Principal], [CommonResultUser], []),
    get_whitelisted_tokens: IDL.Func([], [IDL.Vec(WhiteListedToken)], []),
    greet: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
    have_i_participated: IDL.Func([IDL.Nat64], [CommonResult], []),
    is_owner: IDL.Func([], [IDL.Bool], []),
    is_token_whitelisted: IDL.Func([Principal], [IDL.Bool], []),
    paginate_campaigns: IDL.Func(
      [PaginationArgs, CampaignFilter],
      [IDL.Vec(UserCampaign)],
      [],
    ),
    paginate_participants: IDL.Func(
      [IDL.Nat64, PaginationArgs],
      [IDL.Vec(Participant), IDL.Vec(Users)],
      [],
    ),
    paginate_users: IDL.Func([PaginationArgs], [IDL.Vec(Users)], ["query"]),
    paginate_winners: IDL.Func(
      [IDL.Nat64, PaginationArgs],
      [IDL.Vec(Participant)],
      [],
    ),
    participate_in_campaign: IDL.Func([IDL.Nat64], [CommonResult], []),
    register_user: IDL.Func([Users], [CommonResult], []),
    search_campaigns_by_project_name: IDL.Func(
      [IDL.Text],
      [IDL.Vec(Campaign)],
      [],
    ),
    select_winners: IDL.Func([IDL.Nat64], [CommonResult], []),
    submit_participants: IDL.Func(
      [IDL.Nat64, IDL.Vec(IDL.Principal)],
      [CommonResult],
      [],
    ),
    total_campaigns: IDL.Func([], [IDL.Nat64], []),
    total_users: IDL.Func([], [IDL.Nat64], []),
    transfer_owner: IDL.Func([Principal], [CommonResult], []),
    transfer_service_account: IDL.Func([Principal], [CommonResult], []),
    unwhitelist_token: IDL.Func([Principal], [CommonResult], []),
    update_max_winners: IDL.Func([IDL.Nat64], [CommonResult], []),
    update_min_reward_amount: IDL.Func(
      [Principal, IDL.Nat64, IDL.Text],
      [CommonResult],
      [],
    ),
    update_min_winners: IDL.Func([IDL.Nat64], [CommonResult], []),
    update_platform_fee_owner: IDL.Func([Principal], [CommonResult], []),
    update_platform_fees: IDL.Func([IDL.Nat64], [CommonResult], []),
    update_user: IDL.Func([Users], [CommonResult], []),
    whitelist_token: IDL.Func(
      [Principal, IDL.Nat64, IDL.Text],
      [WhiteListedTokenResult],
      [],
    ),
  });
};
