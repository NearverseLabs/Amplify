import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";

export default class AllyToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({ serializeAs: null})
  public token: string

  @column({ serializeAs: null})
  public secret: string | null

  @column()
  public type: string | null

  @column()
  public driver: string

  @column()
  public refreshToken: string | null

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
        return {}
      }
    },
  })
  public raw: object | null

  @column.dateTime()
  public expires_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
