import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { alice, backend } from 'App/Handlers/Actor'
import Env from '@ioc:Adonis/Core/Env'
import { Principal } from '@dfinity/principal'
import Campaign from 'App/Models/Campaign'
import { DateTime } from 'luxon'
import {
  extractUsernameAndTweetIdFromUrl,
  postLike,
  postReTweet,
  postTweet,
} from 'App/Handlers/Twitter'
import AllyToken from 'App/Models/AllyToken'
import Participation from 'App/Models/Participation'

export default class CampaignsController {
  public async create({ request, auth }: HttpContextContract) {
    const newCampaignSchema = schema.create({
      project_name: schema.string(),
      tweet_id: schema.string(),
      winners: schema.number(),
      reward_token: schema.string(),
      reward: schema.string(),
      requirements: schema.object().members({
        follow: schema.boolean(),
        like: schema.boolean(),
        retweet: schema.boolean(),
        quote_retweet: schema.boolean(),
        tweet_reply: schema.boolean(),
      }),
      startsAt: schema.number(),
      endsAt: schema.number(),
    })
    const payload = await request.validate({ schema: newCampaignSchema })
    const user = auth.use('web').user!

    const backendActor = backend(
      Env.get('CANISTER_ID_AMPLIFY_SC_RUST_BACKEND'),
      alice,
      Env.get('ICP_HOST')
    )
    const done = await backendActor.create_campaign({
      project_name: payload.project_name,
      tweet_id: payload.tweet_id,
      requirements: payload.requirements,
      winners: BigInt(payload.winners),
      reward_token: Principal.fromText(payload.reward_token),
      reward: {
        e8s: BigInt(payload.reward),
      },
      starts_at: BigInt(payload.startsAt),
      ends_at: BigInt(payload.endsAt),
      user_id: Principal.fromText(user.address),
    })
    if ('Err' in done) {
      if (done.Err) throw Error(`Campaign Failed: ${done.Err}`)
    }
    if ('Ok' in done) {
      if (!done.Ok) throw Error(`Campaign Failed: Something went wrong`)
      return await Campaign.create({
        ...payload,
        campaign_id: done.Ok.toString(),
        startsAt: DateTime.fromMillis(Number(payload.startsAt) / 1000000),
        endsAt: DateTime.fromMillis(Number(payload.endsAt) / 1000000),
      })
    }
    throw Error(`Campaign Failed: Something went wrong`)
  }

  public async participate({ request, auth, response }: HttpContextContract) {
    const newCampaignSchema = schema.create({
      campaign_id: schema.number(),
      text: schema.string.optional(),
      reply: schema.string.optional(),
    })
    const payload = await request.validate({ schema: newCampaignSchema })
    const campaign = await Campaign.findOrFail(payload.campaign_id)
    const user = auth.use('web').user!
    const token = await AllyToken.query()
      .where('user_id', user.id)
      .where('expires_at', '>', DateTime.now().toJSDate())
      .first()
    if (!token) {
      return response.abort('Please login again', 403)
    }

    const existing = await Participation.query()
      .where('user_id', user.id)
      .where('campaign_id', campaign.id)
      .first()

    const requirements = {
      // follow: !!existing?.requirements?.follow,
      follow: true,
      like: !!existing?.requirements?.like,
      retweet: !!existing?.requirements?.retweet,
      quote_retweet: !!existing?.requirements?.quote_retweet,
      tweet_reply: !!existing?.requirements?.tweet_reply,
    }
    const tweet_id = extractUsernameAndTweetIdFromUrl(campaign.tweet_id)
    if (!tweet_id.tweetId) {
      return response.abort('Invalid Tweet', 422)
    }
    // let userId
    // if (campaign.requirements.follow && !requirements.follow) {
    //   console.log('tweet_id.username', tweet_id.username, tweet_id)
    //   const followUser = await User.query()
    //     .where('username', tweet_id.username || '')
    //     .first()
    //   userId = followUser?.account_id
    //   if (!userId) userId = await getUser(tweet_id.username || '', token.token)
    //   if (!userId) return response.abort('User ID not found for follow', 422)
    // }
    if (campaign.requirements.tweet_reply && !requirements.tweet_reply) {
      if (!payload.reply) {
        return response.abort('Invalid Reply text', 422)
      }
    }
    if (campaign.requirements.quote_retweet && !requirements.quote_retweet) {
      if (!payload.text) {
        return response.abort('Invalid Tweet text', 422)
      }
    }

    if (campaign.requirements.retweet && !requirements.retweet) {
      requirements.retweet = !!(await postReTweet(user.account_id, tweet_id.tweetId, token.token))
      await Participation.updateOrCreate(
        {
          campaignId: campaign.id,
          userId: user.id,
        },
        {
          requirements,
        }
      )
    }

    if (campaign.requirements.quote_retweet && !requirements.quote_retweet) {
      if (payload.text) {
        requirements.quote_retweet = !!(await postTweet(
          payload.text,
          token.token,
          tweet_id.tweetId
        ))
        await Participation.updateOrCreate(
          {
            campaignId: campaign.id,
            userId: user.id,
          },
          {
            requirements,
          }
        )
      } else {
        return response.abort('Invalid Tweet text', 422)
      }
    }

    if (campaign.requirements.like && !requirements.like) {
      requirements.like = !!(await postLike(user.account_id, tweet_id.tweetId, token.token))
      await Participation.updateOrCreate(
        {
          campaignId: campaign.id,
          userId: user.id,
        },
        {
          requirements,
        }
      )
    }

    // if (campaign.requirements.follow && !requirements.follow) {
    //   requirements.follow = !!(await postFollow(userId, tweet_id.tweetId, token.token))
    //   await Participation.updateOrCreate(
    //     {
    //       campaignId: campaign.id,
    //       userId: user.id,
    //     },
    //     {
    //       requirements,
    //     }
    //   )
    // }
    if (campaign.requirements.tweet_reply && !requirements.tweet_reply) {
      if (payload.reply) {
        requirements.tweet_reply = !!(await postTweet(
          payload.reply,
          token.token,
          undefined,
          tweet_id.tweetId
        ))
      } else {
        return response.abort('Invalid Reply text', 422)
      }
    }

    await Participation.updateOrCreate(
      {
        campaignId: campaign.id,
        userId: user.id,
      },
      {
        requirements,
      }
    )

    for (const key of Object.keys(campaign.requirements)) {
      if (campaign.requirements[key] === true && !requirements[key]) {
        return response.abort(`Requirement ${key} not full filled`, 422)
      }
    }
    const backendActor = backend(
      Env.get('CANISTER_ID_AMPLIFY_SC_RUST_BACKEND'),
      alice,
      Env.get('ICP_HOST')
    )
    const submitted = await backendActor.submit_participants(BigInt(campaign.campaign_id), [
      Principal.fromText(user.address),
    ])
    if ('Ok' in submitted) {
      await Participation.updateOrCreate(
        {
          campaignId: campaign.id,
          userId: user.id,
        },
        {
          requirements,
          submitted: true,
        }
      )
    } else {
      return response.abort(`Unable Verify Campaign ${campaign.id}, Error: ${submitted.Err}`, 422)
    }
    return true
  }

  public async index({ request, response }: HttpContextContract) {
    const { page = 1, limit = 10, ...input } = request.qs()
    return response
      .status(200)
      .json(
        (
          await Campaign.filter(input)
            .withCount('participants')
            .orderBy('createdAt', 'desc')
            .paginate(page, limit)
        ).toJSON()
      )
  }
  public async winners({ request, response }: HttpContextContract) {
    const { page = 1, limit = 10 } = request.qs()
    return response.status(200).json(
      (
        await Participation.query()
          .preload('user')
          .where('campaignId', request.param('campaign_id'))
          .where('winner', true)
          .paginate(page, limit)
      ).serialize({
        fields: {
          omit: ['user_id'],
        },
        relations: {
          user: {
            fields: ['username', 'address'],
          },
        },
      })
    )
  }
}
