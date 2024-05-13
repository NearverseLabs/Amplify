import { BaseCommand } from '@adonisjs/core/build/standalone'
import Campaign from 'App/Models/Campaign'
import { DateTime } from 'luxon'
import { alice, backend } from 'App/Handlers/Actor'
import Env from '@ioc:Adonis/Core/Env'

export default class SyncPendingCampaigns extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'sync:pending_campaigns'

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
        .where('createdAt', '>', DateTime.now().minus({ minute: 10 }).toJSDate())
        .where('is_deposited', false)
        .limit(10)

      for (const campaign of campaigns) {
        const selected = await backendActor.campaign_by_id(BigInt(campaign.campaign_id))
        if ('Ok' in selected) {
          if (selected.Ok.is_deposited === true) {
            await campaign
              .merge({
                is_deposited: true,
              })
              .save()
            this.logger.info(`Campaign Deposit Submitted ${campaign.id}`)
          }
        } else {
          this.logger.error(`Unable Deposit Verify Campaign ${campaign.id}, Error: ${selected.Err}`)
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  }
}
