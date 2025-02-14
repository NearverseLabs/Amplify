import { Principal } from '@dfinity/principal'
import {
  Certificate,
  HttpAgent,
  HttpAgentOptions,
  Identity,
  lookupResultToBuffer,
  polling,
} from '@dfinity/agent'
import { bufFromBufLike, IDL, JsonValue } from '@dfinity/candid'
import { IcrcLedgerCanister, IcrcTransferError, IcrcAccount } from '@dfinity/ledger-icrc'

export const TAGGR_CANISTER_ID = '6qfxa-ryaaa-aaaai-qbhsq-cai'
export const ICP_LEDGER_ID = Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
export const ICP_DEFAULT_FEE = 10000
const CANISTER_ID = TAGGR_CANISTER_ID

export type PostId = number
export type UserId = number
export type RealmId = string

export type ICP = {
  e8s: BigInt | number
}

export type PFP = {
  nonce: number
  palette_nonce: number
  colors: number
  genesis: boolean
}

export type Bid = {
  user: UserId
  amount: number
  e8s_per_token: number
  timestamp: number
}

export type Auction = {
  amount: number
  bids: Bid[]
}

export type Poll = {
  options: string[]
  votes: { [option: number]: UserId[] }
  voters: UserId[]
  deadline: number
  weighted_by_karma: { [key: number]: number }
  weighted_by_tokens: { [key: number]: number }
}

export type Summary = {
  title: string
  description: string
  items: string[]
}

export type Mode = 'Mining' | 'Rewards' | 'Credits'

export type Feature = {
  supporters: UserId[]
  status: number
}

export type Extension =
  | {
      ['Poll']: Poll
    }
  | {
      ['Repost']: PostId
    }
  | {
      ['Proposal']: number
    }
  | 'Feature'

export type Rewards = {
  receiver: string
  minted: number
}

export type Release = {
  commit: string
  hash: string
  binary: Uint8Array
  closed_features: PostId[]
}

export type Payload =
  | { ['Noop']: any }
  | {
      ['Release']: Release
    }
  | {
      ['Funding']: [string, number]
    }
  | {
      ['ICPTransfer']: [number[], ICP]
    }
  | {
      ['AddRealmController']: [RealmId, UserId]
    }
  | {
      ['Rewards']: Rewards
    }

export type Proposal = {
  id: number
  proposer: UserId
  timestamp: BigInt
  post_id: PostId
  status: 'Open' | 'Rejected' | 'Executed' | 'Cancelled'
  payload: Payload
  bulletins: [UserId, boolean, number][]
  voting_power: number
}

export type Realm = {
  comments_filtering: boolean
  adult_content: boolean
  created: number
  cleanup_penalty: number
  controllers: UserId[]
  description: string
  filter: UserFilter
  label_color: string
  logo: string
  num_members: number
  num_posts: number
  theme: string
  whitelist: UserId[]
  last_update: number
  last_setting_update: number
  revenue: number
  posts: PostId[]
}

export type Meta = {
  author_name: string
  author_filters: UserFilter
  viewer_blocked: boolean
  realm_color: string
  nsfw: boolean
}

export type Post = {
  id: PostId
  parent?: PostId
  watchers: UserId[]
  children: PostId[]
  reposts: PostId[]
  user: UserId
  report?: Report
  body: string
  effBody: string
  reactions: { [id: number]: UserId[] }
  files: { [id: string]: [number, number] }
  patches: [BigInt, string][]
  tips: [UserId, BigInt][]
  hashes: string[]
  realm?: string
  timestamp: BigInt
  extension: Extension
  tree_size: number
  tree_update: BigInt
  meta: Meta
  encrypted: boolean
}

export type BlogTitle = {
  author: string
  realm?: string
  created: BigInt
  length: number
  background: string
}

export type Account = {
  owner: string
  subaccount: number[]
}

export type Transaction = {
  timestamp: number
  from: Account
  to: Account
  amount: number
  fee: number
  memo?: number[]
}

type Filters = {
  users: UserId[]
  tags: string[]
  realms: string[]
  noise: UserFilter
}

export type Predicate =
  | {
      ['ReportOpen']: PostId
    }
  | {
      ['UserReportOpen']: UserId
    }
  | {
      ['Proposal']: PostId
    }

export type Notification =
  | {
      ['Generic']: string
    }
  | {
      ['WatchedPostEntries']: [PostId, PostId[]]
    }
  | {
      ['Conditional']: [string, Predicate]
    }
  | {
      ['NewPost']: [string, PostId]
    }

export type UserFilter = {
  age_days: number
  safe: boolean
  balance: number
  num_followers: number
}

// OG: User
export type TaggrUser = {
  name: string
  id: UserId
  account: string
  invites_budget: number
  show_posts_in_realms: boolean
  treasury_e8s: BigInt
  principal: string
  bookmarks: number[]
  last_activity: BigInt
  governance: boolean
  settings: {
    [key: string]: string
  }
  realms: string[]
  previous_names: string[]
  report?: Report
  post_reports: { [id: PostId]: bigint }
  stalwart: boolean
  followees: UserId[]
  followers: UserId[]
  feeds: string[][]
  accounting: [number, string, number, string][]
  timestamp: bigint
  active_weeks: number
  invited_by?: UserId
  controlled_realms: RealmId[]
  about: string
  rewards: number
  cycles: number
  num_posts: number
  balance: number
  cold_balance: number
  cold_wallet: string
  controllers: string[]
  filters: Filters
  blacklist: UserId[]
  notifications: { [key: number]: [Notification, boolean] }
  mode: Mode
  pfp: PFP
  deactivated: boolean
}

export type Report = {
  reason: string
  reporter: UserId
  confirmed_by: UserId[]
  rejected_by: UserId[]
  closed: boolean
  timestamp: bigint
}

export type LastReleaseInfo = {
  post_id: PostId
  timestamp: number
  commit: string
}

export type Stats = {
  fees_burned: number
  volume_day: number
  volume_week: number
  users: number
  active_users: number
  users_online: number
  credits: number
  burned_credits: BigInt
  circulating_supply: number
  total_rewards_shared: BigInt
  total_revenue_shared: BigInt
  canister_cycle_balance: BigInt
  last_release: LastReleaseInfo
  domains: string[]
  bots: UserId[]
  weekly_karma_leaders: [UserId, number][]
  invited_users: number
  posts: number
  comments: number
  bootcamp_users: number
  state_size: number
  account: string
  last_weekly_chores: BigInt
  e8s_for_one_xdr: BigInt
  e8s_revenue_per_1k: BigInt
  canister_id: string
  vesting_tokens_of_x: [number, number]
  buckets: [string, number][]
  stalwarts: UserId[]
}

export type Config = {
  siwe_statement: string
  staging: string
  weekly_auction_size_tokens: number
  user_report_validity_days: number
  downvote_counting_period_days: number
  max_report_length: number
  credits_per_xdr: number
  max_funding_amount: number
  min_stalwart_karma: number
  min_credits_for_inviting: number
  max_credits_mint_kilos: number
  logo: string
  poll_revote_deadline_hours: number
  feature_cost: number
  blob_cost: number
  poll_cost: number
  max_post_length: number
  max_blob_size_bytes: number
  identity_change_cost: number
  max_realm_name: number
  max_realm_logo_len: number
  post_cost: number
  post_deletion_penalty_factor: number
  token_symbol: string
  transaction_fee: number
  maximum_supply: number
  proposal_approval_threshold: number
  name: string
  proposal_rejection_penalty: number
  voting_power_activity_weeks: number
  trusted_user_min_karma: number
  trusted_user_min_age_weeks: number
  min_stalwart_account_age_weeks: number
  min_stalwart_activity_weeks: number
  feed_page_size: number
  reactions: [number, number][]
  token_decimals: number
  domains: string[]
  reporting_penalty_post: number
  reporting_penalty_misbehaviour: number
}

export type Theme = { [name: string]: any }
export type UserData = { [id: UserId]: string }

export type Backend = {
  query: <T>(
    methodName: string,
    arg0?: unknown,
    arg1?: unknown,
    arg2?: unknown,
    arg3?: unknown,
    arg4?: unknown
  ) => Promise<T | null>

  query_raw: (
    canisterId: string,
    methodName: string,
    arg: ArrayBuffer
  ) => Promise<ArrayBuffer | null>

  call: <T>(
    methodName: string,
    arg0?: unknown,
    arg1?: unknown,
    arg2?: unknown,
    arg3?: unknown,
    arg4?: unknown,
    arg5?: unknown,
    arg6?: unknown,
    arg7?: unknown,
    arg8?: unknown
  ) => Promise<T | null>

  set_emergency_release: (blob: Uint8Array) => Promise<JsonValue | null>

  unlink_cold_wallet: () => Promise<JsonValue | null>

  propose_release: (
    postId: PostId,
    commit: string,
    features: PostId[],
    blob: Uint8Array
  ) => Promise<JsonValue | null>

  add_post: (
    text: string,
    blobs: [string, Uint8Array][],
    parent: number[],
    realm: string[],
    extension: Uint8Array[]
  ) => Promise<JsonValue | null>

  add_post_data: (text: string, realm: string[], extension: Uint8Array[]) => Promise<null>

  add_post_blob: (id: string, blob: Uint8Array) => Promise<JsonValue | null>

  commit_post: () => Promise<JsonValue | null>

  edit_post: (
    id: number,
    text: string,
    blobs: [string, Uint8Array][],
    patch: string,
    realm: string[]
  ) => Promise<JsonValue | null>

  icp_account_balance: (address: string) => Promise<BigInt>

  cycle_balance: (principal: string) => Promise<JsonValue>

  account_balance: (token: Principal, account: IcrcAccount) => Promise<bigint>

  icp_transfer: (account: string, e8s: number) => Promise<JsonValue>

  icrc_transfer: (
    token: Principal,
    recipient: Principal,
    amount: number,
    fee: number
  ) => Promise<string | number>
}

export const ApiGenerator = (mainnetMode: boolean, identity?: Identity): Backend => {
  const defaultPrincipal = Principal.fromText(CANISTER_ID)
  const options: HttpAgentOptions = { identity }
  if (mainnetMode) options.host = `https://${CANISTER_ID}.ic0.app`
  const agent = new HttpAgent(options)
  if (!mainnetMode)
    agent.fetchRootKey().catch((err) => {
      console.warn('Unable to fetch root key. Check to ensure that your local replica is running')
      console.error(err)
    })

  const query_raw = async (
    canisterId = CANISTER_ID,
    methodName: string,
    arg = new ArrayBuffer(0)
  ): Promise<ArrayBuffer | null> => {
    try {
      let response = await agent.query(canisterId, { methodName, arg }, identity)
      if (response.status != 'replied') {
        console.error(methodName, response)
        return null
      }
      return response.reply.arg
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const query = async <T>(
    methodName: string,
    arg0?: unknown,
    arg1?: unknown,
    arg2?: unknown,
    arg3?: unknown,
    arg4?: unknown
  ): Promise<T | null> => {
    let effParams = getEffParams([arg0, arg1, arg2, arg3, arg4])
    const arg = Buffer.from(JSON.stringify(effParams))

    const response = await query_raw(undefined, methodName, arg)
    if (!response) {
      return null
    }
    return JSON.parse(Buffer.from(response).toString('utf8'))
  }

  const call_raw = async (
    canisterId = defaultPrincipal,
    methodName: string,
    arg: ArrayBuffer
  ): Promise<ArrayBuffer | null> => {
    try {
      let { response, requestId } = await agent.call(
        canisterId,
        { methodName, arg, callSync: true },
        identity
      )
      if (!response.ok) {
        console.error(`Call error: ${response.statusText}`)
        return null
      }

      let certificate: Certificate | undefined
      if (response.body && 'certificate' in response.body) {
        const cert = response.body.certificate
        certificate = await Certificate.create({
          certificate: bufFromBufLike(cert),
          rootKey: agent.rootKey,
          canisterId: Principal.from(canisterId),
        })
        const path = [new TextEncoder().encode('request_status'), requestId]
        const status = new TextDecoder().decode(
          lookupResultToBuffer(certificate.lookup([...path, 'status']))
        )

        switch (status) {
          case 'replied':
            return lookupResultToBuffer(certificate.lookup([...path, 'reply'])) || null
          case 'rejected':
            console.error(`Call rejected: ${response.statusText}`)
            return null
        }
      }

      return (
        await polling.pollForResponse(agent, canisterId, requestId, polling.defaultStrategy())
      ).reply
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const call = async <T>(
    methodName: string,
    arg0?: unknown,
    arg1?: unknown,
    arg2?: unknown,
    arg3?: unknown,
    arg4?: unknown,
    arg5?: unknown,
    arg6?: unknown,
    arg7?: unknown,
    arg8?: unknown
  ): Promise<T | null> => {
    const effParams = getEffParams([arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8])
    const responseBytes = await call_raw(
      undefined,
      methodName,
      Buffer.from(JSON.stringify(effParams))
    )
    if (!responseBytes || !responseBytes.byteLength) {
      return null
    }
    return JSON.parse(Buffer.from(responseBytes).toString('utf8'))
  }

  return {
    query,
    query_raw,
    call,

    set_emergency_release: async (blob: Uint8Array): Promise<JsonValue | null> => {
      const arg = IDL.encode([IDL.Vec(IDL.Nat8)], [blob])
      const response = await call_raw(undefined, 'set_emergency_release', arg)
      if (!response) {
        return null
      }
      return IDL.decode([], response)[0]
    },

    unlink_cold_wallet: async (): Promise<JsonValue | null> => {
      const arg = IDL.encode([], [])
      let response = await call_raw(undefined, 'unlink_cold_wallet', arg)
      if (!response) {
        return null
      }
      return IDL.decode([IDL.Variant({ Ok: IDL.Null, Err: IDL.Text })], response)[0]
    },

    propose_release: async (
      postId: PostId,
      commit: string,
      features: PostId[],
      blob: Uint8Array
    ): Promise<JsonValue | null> => {
      const arg = IDL.encode(
        [IDL.Nat64, IDL.Text, IDL.Vec(IDL.Nat64), IDL.Vec(IDL.Nat8)],
        [postId, commit, features, blob]
      )
      const response = await call_raw(undefined, 'propose_release', arg)
      if (!response) {
        return null
      }
      return IDL.decode([IDL.Variant({ Ok: IDL.Nat32, Err: IDL.Text })], response)[0]
    },

    add_post: async (
      text: string,
      blobs: [string, Uint8Array][],
      parent: number[],
      realm: string[],
      extension: Uint8Array[]
    ): Promise<JsonValue | null> => {
      const arg = IDL.encode(
        [
          IDL.Text,
          IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Nat8))),
          IDL.Opt(IDL.Nat64),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Vec(IDL.Nat8)),
        ],
        [text, blobs, parent, realm, extension]
      )
      const response = await call_raw(undefined, 'add_post', arg)
      if (!response) {
        return null
      }
      return IDL.decode([IDL.Variant({ Ok: IDL.Nat64, Err: IDL.Text })], response)[0]
    },
    add_post_data: async (
      text: string,
      realm: string[],
      extension: Uint8Array[]
    ): Promise<null> => {
      const arg = IDL.encode(
        [IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Vec(IDL.Nat8))],
        [text, realm, extension]
      )
      const response = await call_raw(undefined, 'add_post_data', arg)
      if (!response) {
        return null
      }
      return null
    },
    add_post_blob: async (id: string, blob: Uint8Array): Promise<JsonValue | null> => {
      const arg = IDL.encode([IDL.Text, IDL.Vec(IDL.Nat8)], [id, blob])
      const response = await call_raw(undefined, 'add_post_blob', arg)
      if (!response) {
        return null
      }
      return IDL.decode([IDL.Variant({ Ok: IDL.Null, Err: IDL.Text })], response)[0]
    },
    commit_post: async (): Promise<JsonValue | null> => {
      const arg = IDL.encode([], [])
      const response = await call_raw(undefined, 'commit_post', arg)
      if (!response) {
        return null
      }
      return IDL.decode([IDL.Variant({ Ok: IDL.Nat64, Err: IDL.Text })], response)[0]
    },
    edit_post: async (
      id: number,
      text: string,
      blobs: [string, Uint8Array][],
      patch: string,
      realm: string[]
    ): Promise<JsonValue | null> => {
      const arg = IDL.encode(
        [
          IDL.Nat64,
          IDL.Text,
          IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Nat8))),
          IDL.Text,
          IDL.Opt(IDL.Text),
        ],
        [id, text, blobs, patch, realm]
      )
      const response = await call_raw(undefined, 'edit_post', arg)
      if (!response) {
        return null
      }
      return IDL.decode([IDL.Variant({ Ok: IDL.Null, Err: IDL.Text })], response)[0]
    },

    cycle_balance: async (bucket_id: string): Promise<JsonValue> => {
      const arg = IDL.encode([], [])
      const response = await query_raw(bucket_id, 'balance', arg)

      if (!response) {
        return -1
      }
      return IDL.decode([IDL.Nat64], response)[0]
    },

    icp_account_balance: async (address: string): Promise<BigInt> => {
      const arg = IDL.encode(
        [IDL.Record({ account: IDL.Vec(IDL.Nat8) })],
        [{ account: hexToBytes(address) }]
      )
      const response = await query_raw(ICP_LEDGER_ID.toString(), 'account_balance', arg)

      if (!response) {
        return BigInt(-1)
      }
      return (IDL.decode([IDL.Record({ e8s: IDL.Nat64 })], response)[0] as any).e8s
    },

    icrc_transfer: async (token: Principal, recipient: Principal, amount: number, fee: number) => {
      try {
        const canister = IcrcLedgerCanister.create({
          canisterId: Principal.from(token),
          agent,
        })
        await canister.transfer({
          to: { owner: recipient, subaccount: [] },
          amount: BigInt(amount),
          fee: BigInt(fee),
        })
        return amount
      } catch (e) {
        let err = e as unknown as IcrcTransferError<string>
        return err.message
      }
    },

    icp_transfer: async (account: string, e8s: number) => {
      const arg = IDL.encode(
        [
          IDL.Record({
            to: IDL.Vec(IDL.Nat8),
            amount: IDL.Record({ e8s: IDL.Nat64 }),
            fee: IDL.Record({ e8s: IDL.Nat64 }),
            memo: IDL.Nat64,
          }),
        ],
        [
          {
            to: hexToBytes(account),
            amount: { e8s },
            fee: { e8s: ICP_DEFAULT_FEE },
            memo: 0,
          },
        ]
      )
      const response = await call_raw(ICP_LEDGER_ID, 'transfer', arg)
      if (!response) {
        return null
      }
      return IDL.decode([IDL.Variant({ Ok: IDL.Nat64, Err: IDL.Unknown })], response)[0] as any
    },

    account_balance: async (token: Principal, account: IcrcAccount): Promise<bigint> => {
      const canister = IcrcLedgerCanister.create({
        canisterId: Principal.from(token),
        agent,
      })
      return await canister.balance({
        certified: false,
        owner: account.owner,
        subaccount: account.subaccount,
      })
    },
  }
}

const getEffParams = <T>(args: T[]): T | T[] | null => {
  const values = args.filter((val) => typeof val != 'undefined')
  if (values.length == 0) return null
  if (values.length == 1) {
    return values[0]
  }
  return values
}

const hexToBytes = (hex: string): Buffer => {
  const bytes: number[] = []
  for (let c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.slice(c, c + 2), 16))
  return Buffer.from(bytes)
}

export const TaggrAPI = ApiGenerator(true)
export const loadTaggrFeed = async (ids: PostId[]) =>
  await TaggrAPI.query<[Post, Meta][]>('posts', ids)

export const loadPTaggrPosts = async (ids: PostId[]) =>
  ((await loadTaggrFeed(ids)) || []).map(expandMeta)

export const expandMeta = ([post, meta]: [Post, Meta]) => {
  post.meta = meta
  return post
}
