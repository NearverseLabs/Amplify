import axios from 'axios'
import Logger from '@ioc:Adonis/Core/Logger'

export type TwitterTokenResponse = {
  token_type: 'bearer'
  expires_in: 7200
  access_token: string
  scope: string
  refresh_token?: string
}

export interface TwitterUser {
  id: string
  name: string
  username: string
  profile_image_url?: string
  description?: string
  created_at?: string
}

export interface VerifiedUserType {
  _id: string
  account_id: string
  comment: boolean
  like: boolean
  retweet: boolean
  quote_retweet: boolean
  follow: boolean
}

export type ReqType = 'like' | 'retweet' | 'quote_retweet' | 'comment' | 'follow'

const tweetUrlRegex = /\/(\w+)\/status\/(\d+)/

export function extractUsernameAndTweetIdFromUrl(url: string): {
  username: string | null
  tweetId: string | null
} {
  const match = url.match(tweetUrlRegex)
  if (match && match[1] && match[2]) {
    return { username: match[1], tweetId: match[2] }
  } else {
    return { username: null, tweetId: null }
  }
}

export const getAccessToken = async (api_key: string, secret: string) => {
  try {
    const resp = await axios.post('https://api.twitter.com/oauth2/token', '', {
      params: {
        grant_type: 'client_credentials',
      },
      auth: {
        username: api_key,
        password: secret,
      },
    })

    return resp.data.access_token
  } catch (err: any) {
    console.error(err)
    return 'error'
  }
}

export async function getTwitterUser(userId: string, accessToken: string) {
  const apiUrl = `https://api.twitter.com/2/users/${userId}?user.fields=created_at,description,id,location,name,profile_image_url,url`
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error: any) {
    console.log('Error:', error.response)
  }
}

export async function getTweetData(
  id: string,
  accessToken: string
): Promise<TwitterUser | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/tweets/${id}?tweet.fields=created_at&expansions=author_id&user.fields=created_at,profile_image_url`
    const res = await axios.get(endpointURL, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    return res?.data
  } catch (err: any) {
    console.error(err)

    return null
  }
}

const getResult = async (data: TwitterUser[], users: VerifiedUserType[], key: ReqType) => {
  const verified = users.filter((user: VerifiedUserType) => user[key] === true)
  const unverified = users.filter((user: VerifiedUserType) => user[key] === false)

  const checkedUsers = unverified.map((user: VerifiedUserType) => {
    const verify = data.find((row: TwitterUser) => row.username === user.account_id)
    return { ...user, [key]: !!verify }
  })
  return [...verified, ...checkedUsers]
}

async function sleep(seconds) {
  await new Promise((r) => setTimeout(r, seconds * 1000))
}

export async function getLikingUsers(
  tweet_id: string,
  accessToken: string,
  users: VerifiedUserType[],
  next_token?: string
): Promise<VerifiedUserType[] | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/tweets/${tweet_id}/liking_users?max_results=100${
      next_token ? `&pagination_token=${next_token}` : ''
    }`
    const res: any = await axios.get(endpointURL, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    const data = res?.data

    if (res?.errors?.length) return null

    if (!data || data.meta.result_count === 0 || !data.data) return null
    const result = await getResult(data.data, users, 'like')

    const unverified = result.filter((user: VerifiedUserType) => user['like'] === false)
    if (unverified.length === 0 && data.meta.result_count < 100) return result

    if (data.meta.result_count === 100) {
      await sleep(20)
      return getLikingUsers(tweet_id, accessToken, result, data.meta.next_token)
    }
    return result

    // {
    //     "data": [
    //         {
    //             "id": "1696575851532349447",
    //             "name": "Shock🫨",
    //             "username": "Shockit0"
    //         },
    //         {
    //             "id": "1688905556856102912",
    //             "name": "Director of Vibes",
    //             "username": "idirectvibes"
    //         },
    //     ],
    //     "meta": {
    //         "result_count": 2,
    //         "next_token": "7140dibdnow9c7btw483gkea3l821r6in8t649dsuwsvl"
    //     }
    // }
  } catch (err: any) {
    console.error(err.data)
    return 'error'
  }
}

export async function getRetweetedUsers(
  tweet_id: string,
  accessToken: string,
  users: VerifiedUserType[],
  next_token?: string
): Promise<VerifiedUserType[] | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/tweets/${tweet_id}/retweeted_by?max_results=100${
      next_token ? `&pagination_token=${next_token}` : ''
    }`
    const res: any = await axios.get(endpointURL, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    const data = res?.data
    if (res?.errors?.length) return null

    if (!data || data.meta.result_count === 0 || !data.data) return null
    const result = await getResult(data.data, users, 'retweet')

    const unverified = result.filter((user: VerifiedUserType) => user['retweet'] === false)
    if (unverified.length === 0 && data.meta.result_count < 100) return result

    if (data.meta.result_count === 100) {
      await sleep(20)
      return getRetweetedUsers(tweet_id, accessToken, result, data.meta.next_token)
    }
    return result

    // {
    //     "data": [
    //         {
    //             "id": "1696575851532349447",
    //             "name": "Shock🫨",
    //             "username": "Shockit0"
    //         },
    //         {
    //             "id": "1688905556856102912",
    //             "name": "Director of Vibes",
    //             "username": "idirectvibes"
    //         },
    //     ],
    //     "meta": {
    //         "result_count": 2,
    //         "next_token": "7140dibdnow9c7btw483gkea3l821r6in8t649dsuwsvl"
    //     }
    // }
  } catch (err: any) {
    console.error('getRetweetedUsers error', err)
    return 'error'
  }
}

export async function getUserId(
  userName: string,
  accessToken: string
): Promise<string | null | undefined | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/users/by/username/${userName}`
    const { data } = await axios.get<{
      data: {
        id: string
        name: string
        username: string
      }
    }>(endpointURL, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return data.data.id

    // {
    //   "data": {
    //     "id": "2244994945",
    //     "name": "Twitter Dev",
    //     "username": "TwitterDev"
    //   }
    // }
  } catch (err: any) {
    console.error(err.data)
    return 'error'
  }
}
export async function getUserFollowers(
  userId: string,
  accessToken: string,
  users: VerifiedUserType[],
  next_token?: string
): Promise<VerifiedUserType[] | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/users/${userId}/followers?max_results=100${
      next_token ? `&pagination_token=${next_token}` : ''
    }`
    const { data } = await axios.get<
      | {
          data: {
            id: string
            name: string
            username: string
          }[]
          meta: {
            result_count: number
            next_token: string
          }
        }
      | { errors?: string[] }
    >(endpointURL, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    if ('errors' in data) return null

    if ('data' in data && 'meta' in data) {
      if (!data || data.meta.result_count === 0 || !data.data) return null
      const result = await getResult(data.data, users, 'follow')

      const unverified = result.filter((user: VerifiedUserType) => user['retweet'] === false)
      if (unverified.length === 0) return result

      if (data.meta.result_count === 100) {
        await sleep(20)
        return getUserFollowers(userId, accessToken, result, data.meta.next_token)
      }
      return result
    }
    return null
    // {
    //   "data": [
    //     {
    //       "id": "6253282",
    //       "name": "Twitter API",
    //       "username": "TwitterAPI"
    //     },
    //     {
    //       "id": "2244994945",
    //       "name": "Twitter Dev",
    //       "username": "TwitterDev"
    //     },
    //     {
    //       "id": "783214",
    //       "name": "Twitter",
    //       "username": "Twitter"
    //     },
    //     {
    //       "id": "95731075",
    //       "name": "Twitter Safety",
    //       "username": "TwitterSafety"
    //     },
    //     {
    //       "id": "3260518932",
    //       "name": "Twitter Moments",
    //       "username": "TwitterMoments"
    //     },
    //     {
    //       "id": "373471064",
    //       "name": "Twitter Music",
    //       "username": "TwitterMusic"
    //     },
    //     {
    //       "id": "791978718",
    //       "name": "Twitter Official Partner",
    //       "username": "OfficialPartner"
    //     },
    //     {
    //       "id": "17874544",
    //       "name": "Twitter Support",
    //       "username": "TwitterSupport"
    //     },
    //     {
    //       "id": "234489024",
    //       "name": "Twitter Comms",
    //       "username": "TwitterComms"
    //     },
    //     {
    //       "id": "1526228120",
    //       "name": "Twitter Data",
    //       "username": "TwitterData"
    //     }
    //   ],
    //     "meta": {
    //     "result_count": 10,
    //       "next_token": "DFEDBNRFT3MHCZZZ"
    //   }
    // }
  } catch (err: any) {
    console.error(err.data)
    return 'error'
  }
}

export async function getQuoteTweets(
  tweet_id: string,
  accessToken: string,
  users: VerifiedUserType[],
  next_token?: string
): Promise<VerifiedUserType[] | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/tweets/${tweet_id}/quote_tweets?expansions=author_id&max_results=100${
      next_token ? `&pagination_token=${next_token}` : ''
    }`
    const res: any = await axios.get(endpointURL, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    const data = res?.data
    if (res?.errors?.length) return null

    if (!data || data?.meta?.result_count === 0 || !data?.includes?.users) return null
    const result = await getResult(data.includes.users, users, 'quote_retweet')

    const unverified = result.filter((user: VerifiedUserType) => user['quote_retweet'] === false)
    if (unverified.length === 0 && data.meta.result_count < 100) return result

    if (data.meta.result_count === 100) {
      await sleep(20)
      return getQuoteTweets(tweet_id, accessToken, result, data.meta.next_token)
    }
    return result

    // {
    //     "data": [
    //         {
    //             "author_id": "516696943",
    //             "edit_history_tweet_ids": [
    //                 "1721544682226819420"
    //             ],
    //             "text": "Moeen Ali is brainy👍 https://t.co/StZATz4NUh",
    //             "id": "1721544682226819420"
    //         },
    //         {
    //             "author_id": "899615865896804352",
    //             "edit_history_tweet_ids": [
    //                 "1721475421655781769"
    //             ],
    //             "text": "RT @Pradhyoth1: Unlike buttler, stokes, Roy, bairstow, Rashid, woakes, mooen is just an ordinary cricketer. Averaged under 25 with the bat…",
    //             "id": "1721475421655781769"
    //         },
    //     ],
    //     "includes": {
    //         "users": [
    //             {
    //                 "id": "516696943",
    //                 "name": "Advanced Apps",
    //                 "username": "WebprogrPRO"
    //             },
    //             {
    //                 "id": "899615865896804352",
    //                 "name": "😿/ #SackButtler",
    //                 "username": "krishna__offl"
    //             }
    //         ]
    //     },
    //     "meta": {
    //         "result_count": 10,
    //         "next_token": "d2trjv0qn1jg"
    //     }
    // }
  } catch (err: any) {
    console.error(err.data)
    return 'error'
  }
}

export async function getComments(
  tweet_id: string,
  accessToken: string,
  users: VerifiedUserType[],
  next_token?: string
): Promise<VerifiedUserType[] | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${tweet_id}&tweet.fields=conversation_id&expansions=author_id&max_results=100${
      next_token ? `&pagination_token=${next_token}` : ''
    }`

    const res: any = await axios.get(endpointURL, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    const data = res?.data
    if (res?.errors?.length) {
      console.log('getComments res?.errors?.length', res?.errors?.length)
      return null
    }

    if (!data || data?.meta?.result_count === 0 || !data?.includes?.users) return null
    const result = await getResult(data.includes.users, users, 'comment')

    const unverified = result.filter((user: VerifiedUserType) => user['comment'] === false)
    if (unverified.length === 0 && data.meta.result_count < 100) return result

    if (data.meta.result_count === 100) {
      await sleep(20)
      return getComments(tweet_id, accessToken, result, data.meta.next_token)
    }
    return result

    // {
    //     "data": [
    //         {
    //             "author_id": "516696943",
    //             "edit_history_tweet_ids": [
    //                 "1721544682226819420"
    //             ],
    //             "text": "Moeen Ali is brainy👍 https://t.co/StZATz4NUh",
    //             "id": "1721544682226819420"
    //         },
    //         {
    //             "author_id": "899615865896804352",
    //             "edit_history_tweet_ids": [
    //                 "1721475421655781769"
    //             ],
    //             "text": "RT @Pradhyoth1: Unlike buttler, stokes, Roy, bairstow, Rashid, woakes, mooen is just an ordinary cricketer. Averaged under 25 with the bat…",
    //             "id": "1721475421655781769"
    //         },
    //     ],
    //     "includes": {
    //         "users": [
    //             {
    //                 "id": "516696943",
    //                 "name": "Advanced Apps",
    //                 "username": "WebprogrPRO"
    //             },
    //             {
    //                 "id": "899615865896804352",
    //                 "name": "😿/ #SackButtler",
    //                 "username": "krishna__offl"
    //             }
    //         ]
    //     },
    //     "meta": {
    //         "result_count": 10,
    //         "next_token": "d2trjv0qn1jg"
    //     }
    // }
  } catch (err: any) {
    console.error('getComments error', err)
    console.error('getComments error', JSON.stringify(err))
    return 'error'
  }
}

export async function postTweet(
  text: string,
  accessToken: string,
  quote_tweet_id?: string,
  reply_tweet_id?: string
): Promise<TwitterUser | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/tweets`
    let payload: {
      text: string
      quote_tweet_id?: string
      reply?: {
        in_reply_to_tweet_id?: string
      }
    } = {
      text,
    }
    if (quote_tweet_id) {
      payload = {
        ...payload,
        quote_tweet_id,
      }
    }
    if (reply_tweet_id) {
      payload = {
        ...payload,
        reply: {
          in_reply_to_tweet_id: reply_tweet_id,
        },
      }
    }
    const res = await axios.post(endpointURL, payload, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    return res?.data
  } catch (err: any) {
    console.error(err)

    return null
  }
}

export async function postReTweet(
  account_id: string,
  tweet_id: string,
  accessToken: string
): Promise<TwitterUser | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/users/${account_id}/retweets`
    const payload: {
      tweet_id: string
    } = {
      tweet_id,
    }
    const res = await axios.post(endpointURL, payload, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    return res?.data
  } catch (err: any) {
    console.error(err)
    Logger.error(err)

    return null
  }
}

export async function postLike(
  account_id: string,
  tweet_id: string,
  accessToken: string
): Promise<TwitterUser | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/users/${account_id}/likes`
    const payload: {
      tweet_id: string
    } = {
      tweet_id,
    }
    const res = await axios.post(endpointURL, payload, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    return res?.data
  } catch (err: any) {
    console.error(err)
    Logger.error(err)

    return null
  }
}

export async function postFollow(
  account_id: string,
  target_user_id: string,
  accessToken: string
): Promise<TwitterUser | null | 'error'> {
  try {
    const endpointURL = `https://api.twitter.com/2/users/${account_id}/following`
    const payload: {
      target_user_id: string
    } = {
      target_user_id,
    }
    const res = await axios.post(endpointURL, payload, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    return res?.data
  } catch (err: any) {
    console.error(err)
    Logger.error(err)

    return null
  }
}

export async function getUser(
  target_user_name: string,
  accessToken: string
): Promise<string | undefined> {
  try {
    const endpointURL = `https://api.twitter.com/2/users/by/username/${target_user_name}`
    const res = await axios.get(endpointURL, {
      headers: {
        'Content-type': 'application/json',
        // put the access token in the Authorization Bearer token
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    return res?.data.id
  } catch (err: any) {
    console.error(err)
    Logger.error(err)

    return undefined
  }
}
