import { DateTime } from 'luxon'
import {
  afterFetch,
  afterFind,
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import CampaignFilter from 'App/Filters/CampaignFilter'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import { computed, hasMany } from '@adonisjs/lucid/build/src/Orm/Decorators'
import Participation from 'App/Models/Participation'

export interface Requirements {
  follow: boolean
  like: boolean
  retweet: boolean
  quote_retweet: boolean
  tweet_reply: boolean
}
export default class Campaign extends compose(BaseModel, Filterable) {
  static $filter = () => CampaignFilter

  public serializeExtras() {
    return {
      total_participants: this?.$extras?.participants_count || 0,
    }
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Participation)
  public participants: HasMany<typeof Participation>

  @column()
  public project_name: string

  @column()
  public tweet_id: string

  @column()
  public is_deposited: boolean

  @column()
  public winners: number

  @column()
  public campaign_id: string

  @column()
  public reward_token: string

  @column()
  public reward: string

  @column()
  public finalised: boolean

  @column({
    prepare: (v) => {
      try {
        return JSON.stringify(v)
      } catch (e) {
        return ''
      }
    },
    consume: (v) => {
      try {
        return JSON.parse(v)
      } catch (e) {
        return {
          follow: false,
          like: false,
          retweet: false,
          quote_retweet: false,
          tweet_reply: false,
        }
      }
    },
  })
  public requirements: Requirements

  @column.dateTime()
  public startsAt: DateTime

  @column.dateTime()
  public endsAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public participated: boolean

  @computed()
  public winner: boolean

  @afterFetch()
  public static async getParticipationChecks(campaigns: Campaign[]) {
    await Promise.all(
      campaigns.map(async (campaign) => {
        return await Campaign.mapValues(campaign)
      })
    )
  }

  @afterFind()
  public static async getParticipationCheck(campaign: Campaign) {
    return await Campaign.mapValues(campaign)
  }
  public static async mapValues(campaign: Campaign) {
    const ctx = HttpContext.get()!
    let isCurrentUser = ctx?.auth?.use('web').user?.id
    if (isCurrentUser) {
      const participated = await Participation.query()
        .where('user_id', isCurrentUser)
        .where('campaignId', campaign.id)
        .first()
      campaign.participated = !!participated
      campaign.winner = !!participated?.winner
    } else {
      campaign.participated = false
      campaign.winner = false
    }
    return campaign
  }
}
