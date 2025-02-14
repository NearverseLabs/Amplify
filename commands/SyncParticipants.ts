import { BaseCommand } from '@adonisjs/core/build/standalone'
import { alice, backend } from 'App/Handlers/Actor'
import Env from '@ioc:Adonis/Core/Env'
import Campaign from 'App/Models/Campaign'
import Participation from 'App/Models/Participation'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import { openchatAgent } from 'App/Handlers/GetOpenChatSDK'
import { loadPTaggrPosts, TaggrAPI, TaggrUser } from 'App/Handlers/Taggr'
import { Principal } from '@dfinity/principal';
(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}
export default class SyncParticipants extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'sync:participants'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: true,
  }

  public async run() {
    const backendActor = backend(
      Env.get('CANISTER_ID_AMPLIFY_SC_RUST_BACKEND'),
      alice,
      Env.get('ICP_HOST')
    )
    while (true) {
      this.logger.info('Starting to Sync')

      const campaigns = await Campaign.query()
        .where('startsAt', '<', DateTime.now().toJSDate())
        .where('endsAt', '>', DateTime.now().toJSDate())
        .where('finalised', false)
        .where('is_deposited', true)
        .limit(50)
      console.log('campaigns', campaigns.length, DateTime.now().toJSDate())
      for (const campaign of campaigns) {
        console.log('campaign id', campaign.id)
        let current_page = 1n
        const per_page = 1000n
        while (current_page > 0n) {
          const participants = await backendActor.paginate_participants(
            BigInt(campaign.campaign_id),
            {
              page_number: current_page,
              page_size: per_page,
            }
          )
          for (const participant of participants[0]) {
            const i = participants[0].indexOf(participant)
            const user = participants[1][i]
            console.log('participant', participant, user.id.toString())
            const dbUser = await User.firstOrCreate(
              {
                address: user.id.toString(),
              },
              {}
            )
            let requirements = {
              follow: false,
              like: false,
              comment: false,
              repost: false,

              join_group: false,
              join_community: false,
              active_in_group_time: false,
              messages_in_group: false,
              active_in_community_time: false,
              messages_in_community: false,
            }

            if (campaign.platform === 'Openchat') {
              if (campaign.requirements.join_group) {
                const summ = await openchatAgent.getPublicGroupSummary({
                  kind: 'group_chat',
                  groupId: campaign.join_group,
                })
                if (summ.kind === 'success') {
                  const ocGroupCampaignLastEventId = Number(
                    campaign.oc_group_campaign_last_event_id
                  )
                  const lastUpdated = summ.group.latestEventIndex
                  console.log(`Processing Total: ${ocGroupCampaignLastEventId} to ${lastUpdated}`)
                  for (let start = ocGroupCampaignLastEventId; start <= lastUpdated; start += 100) {
                    const end = Math.min(start + 99, lastUpdated)
                    console.log(`Processing range: ${start} to ${end}`)
                    const groupJoins = await openchatAgent.chatEvents(
                      {
                        kind: 'group_chat',
                        groupId: campaign.join_group,
                      },
                      [start, end],
                      start,
                      true,
                      undefined,
                      summ.group.lastUpdated
                    )
                    console.log('groupJoins', JSON.stringify(groupJoins))
                    if (groupJoins !== 'events_failed') {
                      if (
                        groupJoins.events.find(
                          (u) =>
                            u.event.kind == 'member_joined' &&
                            u.event.userId === user.openchat_principal.toString()
                        ) ||
                        groupJoins.events.find(
                          (u) =>
                            u.event.kind == 'message' &&
                            u.event.sender === user.openchat_principal.toString()
                        )
                      )
                        requirements.join_group = true
                      if (
                        groupJoins.events.find(
                          (u) =>
                            u.event.kind == 'message' &&
                            u.event.sender === user.openchat_principal.toString()
                        )
                      )
                        requirements.messages_in_group = true
                    }
                  }
                  // await campaign
                  //   .merge({
                  //     oc_group_campaign_last_event_id: lastUpdated,
                  //   })
                  //   .save()
                }
              }

              if (campaign.requirements.join_community) {
                const summ = await openchatAgent.getChannelSummary({
                  kind: 'channel',
                  communityId: campaign.join_community.split(':')[0],
                  channelId: campaign.join_community.split(':')[1],
                })
                if (summ.kind === 'channel') {
                  const ocGroupCampaignLastEventId = Number(
                    campaign.oc_community_campaign_last_event_id
                  )
                  const lastUpdated = summ?.latestEventIndex || 0
                  for (let start = ocGroupCampaignLastEventId; start <= lastUpdated; start += 100) {
                    const end = Math.min(start + 99, lastUpdated)
                    console.log(`Processing range: ${start} to ${end}`)
                    const groupJoins = await openchatAgent.chatEvents(
                      {
                        kind: 'channel',
                        communityId: campaign.join_community.split(':')[0],
                        channelId: campaign.join_community.split(':')[1],
                      },
                      [start, end],
                      start,
                      true,
                      undefined,
                      summ.lastUpdated
                    )
                    console.log('groupJoins', JSON.stringify(groupJoins))
                    if (groupJoins !== 'events_failed') {
                      if (
                        groupJoins.events.find(
                          (u) =>
                            u.event.kind == 'member_joined' &&
                            u.event.userId === user.openchat_principal.toString()
                        ) ||
                        groupJoins.events.find(
                          (u) =>
                            u.event.kind == 'message' &&
                            u.event.sender === user.openchat_principal.toString()
                        )
                      )
                        requirements.join_community = true
                      if (
                        groupJoins.events.find(
                          (u) =>
                            u.event.kind == 'message' &&
                            u.event.sender === user.openchat_principal.toString()
                        )
                      )
                        requirements.messages_in_community = true
                    }
                  }
                  // await campaign
                  //   .merge({
                  //     oc_community_campaign_last_event_id: lastUpdated,
                  //   })
                  //   .save()
                }
              }
            }

            if (campaign.platform === 'Taggr') {
              const currentUserId = Number(user.taggr_principal)
              const postDetails = (await loadPTaggrPosts([Number(campaign.join_group)]))[0]
              console.log('postDetails', postDetails, campaign.join_group)
              const reactions = Object.values(postDetails.reactions).flatMap((u) => u)
              console.log('reactions', reactions)
              const creatorProfile = await TaggrAPI.query<TaggrUser>('user', [
                postDetails.user.toString(),
              ])
              if (campaign.requirements.follow) {
                const followed = creatorProfile?.followers?.includes(currentUserId)
                if (followed) requirements.follow = true
              }
              if (campaign.requirements.like) {
                const liked = reactions?.includes(currentUserId)
                if (liked) requirements.like = true
              }
              if (campaign.requirements.comment) {
                const comments = await loadPTaggrPosts(postDetails.children)
                const commented = comments.map((c) => c.user)?.includes(currentUserId)
                if (commented) requirements.comment = true
              }
              if (campaign.requirements.repost) {
                const reposts = await loadPTaggrPosts(postDetails.reposts)
                const reposted = reposts.map((c) => c.user)?.includes(currentUserId)
                if (reposted) requirements.repost = true
              }
            }

            let verified = false
            for (const key of Object.keys(campaign.requirements)) {
              verified = !(campaign.requirements[key] === true && !requirements[key])
              if (!verified) break
            }
            console.log('verified', verified)
            if (verified) {
              const submitted = await backendActor.submit_participants(
                BigInt(campaign.campaign_id),
                [Principal.fromText(dbUser.address)]
              )

              if ('Ok' in submitted) {
                await Participation.updateOrCreate(
                  {
                    campaignId: campaign.id,
                    userId: dbUser.id,
                  },
                  {
                    requirements,
                    submitted: true,
                  }
                )
              }
            } else {
              await Participation.updateOrCreate(
                {
                  campaignId: campaign.id,
                  userId: dbUser.id,
                },
                {
                  requirements: requirements,
                }
              )
            }
          }

          if (participants.length >= per_page) {
            current_page = current_page + 1n
          } else {
            current_page = 0n
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  }
}
