import { DateTime } from 'luxon'
import {
  afterFetch,
  afterFind,
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ModelPaginatorContract,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Campaign, { Requirements } from 'App/Models/Campaign'
import { afterPaginate } from '@adonisjs/lucid/build/src/Orm/Decorators'
type ParticipationPaginator = ModelPaginatorContract<Participation>

export default class Participation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public campaignId: number

  @belongsTo(() => Campaign)
  public campaign: BelongsTo<typeof Campaign>

  @column()
  public requirements: Requirements

  @column()
  public winner: boolean

  @column()
  public submitted: boolean

  @column()
  public claimed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterFetch()
  public static async getParticipationChecks(campaigns: Participation[]) {
    await Promise.all(
      campaigns.map(async (campaign) => {
        return await Participation.mapValues(campaign)
      })
    )
  }

  @afterFind()
  public static async getParticipationCheck(campaign: Participation) {
    return await Participation.mapValues(campaign)
  }

  @afterPaginate()
  public static async processMarkdown(paginator: ParticipationPaginator) {
    await Promise.all(
      paginator.all().map((post) => {
        return Participation.mapValues(post)
      })
    )
  }

  public static async mapValues(campaign: Participation) {
    if (!campaign?.user) {
      await campaign.load('user')
    }
    return campaign
  }
}
