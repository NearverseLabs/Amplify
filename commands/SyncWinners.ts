import { BaseCommand } from '@adonisjs/core/build/standalone'
import { alice, backend } from 'App/Handlers/Actor'
import Env from '@ioc:Adonis/Core/Env'
import Campaign from 'App/Models/Campaign'
import Participation from 'App/Models/Participation'

export default class SyncWinners extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'sync:winners'

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
        .leftJoin('participations', (q) => {
          q.on('participations.campaign_id', '=', 'campaigns.id')
            .andOnVal('participations.winner', '=', false)
            .andOnVal('participations.claimed', '=', false)
        })
        .select('campaigns.*')
        .count('participations.id', 'total_participants')
        .where('finalised', true)
        .having((q) => {
          q.where('total_participants', '=', 0).orWhere('total_participants', '<', 'winners')
        })
        .limit(10)

      for (const campaign of campaigns) {
        const winners = await backendActor.paginate_winners(BigInt(campaign.campaign_id), {
          page_number: 1n,
          page_size: 1000n,
        })
        console.log('winners', winners.length, campaign.id)
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
      }
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  }
}
