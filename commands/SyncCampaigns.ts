import { BaseCommand } from '@adonisjs/core/build/standalone'
import { alice, backend } from 'App/Handlers/Actor'
import Env from '@ioc:Adonis/Core/Env'
// import {
//   extractUsernameAndTweetIdFromUrl,
//   getAccessToken,
//   getComments,
//   getLikingUsers,
//   getQuoteTweets,
//   getRetweetedUsers,
//   VerifiedUserType,
// } from 'App/Handlers/Twitter'
// import { Principal } from '@dfinity/principal'
import Campaign from 'App/Models/Campaign'
import { DateTime } from 'luxon'
import Participation from 'App/Models/Participation'

export default class SyncCampaigns extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'sync:campaigns'

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
    // let current_page = 1n
    while (true) {
      this.logger.info('Starting to Sync')

      const campaigns = await Campaign.query()
        .where('endsAt', '<', DateTime.now().toJSDate())
        .where('finalised', false)
        .limit(10)

      for (const campaign of campaigns) {
        const selected = await backendActor.select_winners(BigInt(campaign.campaign_id))
        console.log('selected', selected)
        if ('Ok' in selected) {
          await campaign
            .merge({
              finalised: true,
            })
            .save()
          const winners = await backendActor.paginate_winners(BigInt(campaign.campaign_id), {
            page_number: 1n,
            page_size: 1000n,
          })
          await Participation.query()
            .whereHas('user', (q) => {
              q.whereIn(
                'address',
                winners.map((w) => w.user_id.toText())
              )
            })
            .where('campaignId', campaign.id)
            .update({
              winner: true,
            })

          this.logger.info(`Campaign Winners Selected ${campaign.id}`)
        } else {
          this.logger.error(`Unable Verify Campaign ${campaign.id}, Error: ${selected.Err}`)
        }
      }

      // const access_token = await getAccessToken(
      //   Env.get('TWITTER_API_KEY'),
      //   Env.get('TWITTER_API_KEY_SECRET'),
      // );
      // if (access_token === "error") throw "Access Token not found";
      //
      // this.logger.info(`Current Page ${current_page}`)
      // const campaigns = await backendActor.paginate_campaigns({
      //   page_number: current_page, page_size: 100n
      // }, {
      //   my_claimed_campaigns: [],
      //   my_created_campaigns: [],
      //   my_participated_campaigns: [],
      //   my_unclaimed_campaigns: [],
      //   project_name: [],
      //   to_be_verified: [true],
      //   reward_token: [],
      //   status: []
      // })
      // console.log('campaigns', campaigns)
      // current_page++;
      // if(campaigns.length == 0) current_page = 1n
      // for (const {campaign} of campaigns) {
      //   this.logger.info(`Verifying Campaign ${campaign.campaign_id}`)
      //   const winners = await backendActor.paginate_winners(campaign.campaign_id,{
      //     page_number: 1n, page_size: 1n
      //   })
      //   if(winners.length > 0) {
      //     this.logger.info(`Campaign Already Verified ${campaign.campaign_id}`)
      //     continue;
      //   }
      //   if(campaign.ends_at > (BigInt(+new Date) * 1_000_000n)) {
      //     this.logger.info(`Campaign Not Ended Yet ${campaign.campaign_id}`)
      //     continue;
      //   }
      //   let current_participants_page = 1n
      //   const participants = await backendActor.paginate_participants(campaign.campaign_id,{
      //     page_number: current_participants_page, page_size: 100n
      //   })
      //   this.logger.debug(`participants ${JSON.stringify(participants)}`,)
      //   const selected = await backendActor.select_winners(campaign.campaign_id)
      //   if("Ok" in selected) {
      //     this.logger.info(`Campaign Winners Selected ${campaign.campaign_id}, Total Verified: 0`)
      //   } else {
      //     this.logger.error(`Unable Verify Campaign ${campaign.campaign_id}, Error: ${selected.Err}`)
      //   }
      //   await (new Promise(resolve => setTimeout(resolve, 30000)))
      // }
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  }
}
