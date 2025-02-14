import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { alice, backend } from 'App/Handlers/Actor'
import Env from '@ioc:Adonis/Core/Env'
import { Principal } from '@dfinity/principal'
import Campaign from 'App/Models/Campaign'
import { DateTime } from 'luxon'
import Participation from 'App/Models/Participation'
import { openchatAgent } from 'App/Handlers/GetOpenChatSDK'
import User from 'App/Models/User'

export default class CampaignsController {
  public async create({ request }: HttpContextContract) {
    const newCampaignSchema = schema.create({
      project_name: schema.string(),
      platform: schema.enum(['Openchat', 'Taggr'] as const),

      // tweet_id: schema.string(),
      winners: schema.number(),
      reward_token: schema.string(),
      reward: schema.string(),
      user_id: schema.string(),
      startsAt: schema.number(),
      endsAt: schema.number(),

      join_group: schema.string.optional([
        rules.requiredWhenTaggrOrFieldIsTrue('requirements.join_group'),
      ]),

      /**
       * The following fields are required when platform = 'Openchat'
       */
      join_community: schema.string.optional([
        rules.requiredWhenFieldIsTrue('requirements.join_community'),
      ]),

      messages_in_community: schema.number.optional([
        rules.requiredWhenFieldIsTrue('requirements.messages_in_community'),
      ]),

      messages_in_group: schema.number.optional([
        rules.requiredWhenFieldIsTrue('requirements.messages_in_group'),
      ]),

      active_in_community_time: schema.number.optional([
        rules.requiredWhenFieldIsTrue('requirements.active_in_community_time'),
      ]),

      active_in_group_time: schema.number.optional([
        rules.requiredWhenFieldIsTrue('requirements.active_in_group_time'),
      ]),

      /**
       * requirements object
       */
      requirements: schema.object().members({
        // Openchat-only
        join_group: schema.boolean([rules.allowedWhenTrue(['Openchat'])]),
        join_community: schema.boolean([rules.allowedWhenTrue(['Openchat'])]),
        messages_in_group: schema.boolean([rules.allowedWhenTrue(['Openchat'])]),
        active_in_group_time: schema.boolean([rules.allowedWhenTrue(['Openchat'])]),
        messages_in_community: schema.boolean([rules.allowedWhenTrue(['Openchat'])]),
        active_in_community_time: schema.boolean([rules.allowedWhenTrue(['Openchat'])]),

        // Taggr-only
        follow: schema.boolean([rules.allowedWhenTrue(['Taggr'])]),
        like: schema.boolean([rules.allowedWhenTrue(['Taggr'])]),
        comment: schema.boolean([rules.allowedWhenTrue(['Taggr'])]),
        repost: schema.boolean([rules.allowedWhenTrue(['Taggr'])]),
      }),
    })

    const payload = await request.validate({ schema: newCampaignSchema })
    console.log('payload', payload.requirements.join_community, payload?.join_community)
    // const user = auth.use('web').user!
    const user = await User.firstOrCreate(
      {
        address: payload.user_id,
      },
      {
        // email: payload.user_id,
        // name: payload.user_id,
        // username: payload.user_id,
        // password: payload.user_id,
        // account_id: payload.user_id,
      }
    )
    const backendActor = backend(
      Env.get('CANISTER_ID_AMPLIFY_SC_RUST_BACKEND'),
      alice,
      Env.get('ICP_HOST')
    )
    let done
    if (Env.get('NODE_ENV') !== 'test') {
      done = await backendActor.create_campaign({
        project_name: payload.project_name,
        platform: payload.platform === 'Taggr' ? { Taggr: null } : { OpenChat: null },
        requirements: payload.requirements,
        join_group: payload.join_group ? [payload.join_group] : [],
        join_community: payload.join_community ? [payload.join_community] : [],
        messages_in_community: BigInt(payload.messages_in_community || BigInt(0)),
        messages_in_group: BigInt(payload.messages_in_group || BigInt(0)),
        active_in_community_time: BigInt(payload.active_in_community_time || BigInt(0)),
        active_in_group_time: BigInt(payload.active_in_group_time || BigInt(0)),
        winners: BigInt(payload.winners),
        reward_token: Principal.fromText(payload.reward_token),
        reward: {
          e8s: BigInt(payload.reward),
        },
        starts_at: BigInt(payload.startsAt),
        ends_at: BigInt(payload.endsAt),
        user_id: Principal.fromText(payload.user_id),
      })
    } else {
      done = {
        Ok: true,
      }
    }
    if ('Err' in done) {
      if (done.Err) throw Error(`Campaign Failed: ${done.Err}`)
    }
    if ('Ok' in done) {
      if (!done.Ok) throw Error(`Campaign Failed: Something went wrong`)

      let oc_group_campaign_last_event_id = 0
      let oc_community_campaign_last_event_id = 0
      if (payload?.join_group) {
        const groupSummary = await openchatAgent.getPublicGroupSummary({
          kind: 'group_chat',
          groupId: payload.join_group,
        })
        if (groupSummary.kind === 'success') {
          oc_group_campaign_last_event_id = groupSummary.group.latestEventIndex
        }
      }
      if (payload?.join_community) {
        const [communityId, channelId] = payload.join_community.split(':')
        const groupSummary = await openchatAgent.getCommunitySummary(communityId)
        if (groupSummary.kind === 'community') {
          oc_community_campaign_last_event_id =
            groupSummary.channels.find((c) => c.id.channelId === channelId)?.latestEventIndex || 0
        }
      }
      return await Campaign.create({
        ...payload,
        user_id: user.id,
        oc_group_campaign_last_event_id,
        oc_community_campaign_last_event_id,
        campaign_id: done.Ok.toString(),
        startsAt: DateTime.fromMillis(Number(payload.startsAt) / 1000000),
        endsAt: DateTime.fromMillis(Number(payload.endsAt) / 1000000),
      })
    }
    throw Error(`Campaign Failed: Something went wrong`)
  }

  public async participate({ request }: HttpContextContract) {
    const newCampaignSchema = schema.create({
      campaign_id: schema.number(),
      user_id: schema.string(),
      text: schema.string.optional(),
      reply: schema.string.optional(),
    })
    const payload = await request.validate({ schema: newCampaignSchema })
    const campaign = await Campaign.findOrFail(payload.campaign_id)
    // const user = auth.use('web').user!
    const user = await User.firstOrCreate(
      {
        address: payload.user_id,
      },
      {
        email: payload.user_id,
        name: payload.user_id,
        username: payload.user_id,
        password: payload.user_id,
        account_id: payload.user_id,
      }
    )
    const existing = await Participation.query()
      .where('user_id', user.id)
      .where('campaign_id', campaign.id)
      .first()

    const requirements = {
      follow: !!existing?.requirements?.follow,
      comment: !!existing?.requirements?.comment,
      repost: !!existing?.requirements?.repost,
      join_group: !!existing?.requirements?.join_group,
      join_community: !!existing?.requirements?.join_community,
      active_in_group_time: !!existing?.requirements?.active_in_group_time,
      messages_in_group: !!existing?.requirements?.messages_in_group,
      active_in_community_time: !!existing?.requirements?.active_in_community_time,
      messages_in_community: !!existing?.requirements?.messages_in_community,
      like: !!existing?.requirements?.like,

      // follow: true,
      // comment: true,
      // repost: true,
      // join_group: true,
      // join_community: true,
      // active_in_group_time: true,
      // messages_in_group: true,
      // active_in_community_time: true,
      // messages_in_community: true,
      // like: true,
    }
    // const tweet_id = extractUsernameAndTweetIdFromUrl(campaign.tweet_id)
    // if (!tweet_id.tweetId) {
    //   return response.abort('Invalid Tweet', 422)
    // }
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

    await Participation.updateOrCreate(
      {
        campaignId: campaign.id,
        userId: user.id,
      },
      {
        requirements,
      }
    )

    // for (const key of Object.keys(campaign.requirements)) {
    //   if (campaign.requirements[key] === true && !requirements[key]) {
    //     return response.abort(`Requirement ${key} not full filled`, 422)
    //   }
    // }
    // const backendActor = backend(
    //   Env.get('CANISTER_ID_AMPLIFY_SC_RUST_BACKEND'),
    //   alice,
    //   Env.get('ICP_HOST')
    // )
    // const submitted = await backendActor.submit_participants(BigInt(campaign.campaign_id), [
    //   Principal.fromText(user.address),
    // ])
    // if ('Ok' in submitted) {
    //   await Participation.updateOrCreate(
    //     {
    //       campaignId: campaign.id,
    //       userId: user.id,
    //     },
    //     {
    //       requirements,
    //       submitted: true,
    //     }
    //   )
    // } else {
    //   return response.abort(`Unable Verify Campaign ${campaign.id}, Error: ${submitted.Err}`, 422)
    // }
    return true
  }

  public async index({ request, response }: HttpContextContract) {
    const { page = 1, limit = 10, ...input } = request.qs()
    return response.status(200).json(
      (
        await Campaign.filter(input)
          .withCount('participants')
          .preload('user', (a) => {
            a.select('address')
          })
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
