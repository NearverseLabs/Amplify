import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Campaign from 'App/Models/Campaign'
import { DateTime } from 'luxon'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class CampaignFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Campaign, Campaign>

  // Blacklisted methods
  static blacklist: string[] = []

  // Dropped `_id` from the end of the input
  // Doing this would allow you to have a `company()` filter method as well as a `companyId()` filter method.
  static dropId: boolean = true

  // Doing this would allow you to have a mobile_phone() filter method instead of mobilePhone().
  // By default, mobilePhone() filter method can be called thanks to one of the following input key:
  // mobile_phone, mobilePhone, mobile_phone_id, mobilePhoneId
  static camelCase: boolean = true

  name(value: string) {
    this.$query.where('project_name', 'ILIKE', `%${value}%`)
  }

  ready(value: boolean) {
    this.$query.where('is_deposited', value)
  }
  my(value: boolean) {
    const ctx = HttpContext.get()!
    let isCurrentUser = ctx?.auth?.use('web').user?.id
    if (value) {
      this.$query.where('user_id', isCurrentUser || 0)
    }
  }

  upcoming(value: boolean) {
    if (value) this.$query.where('startsAt', '>', DateTime.now().toJSDate())
  }

  ongoing(value: boolean) {
    if (value)
      this.$query
        .where('startsAt', '<', DateTime.now().toJSDate())
        .where('endsAt', '>', DateTime.now().toJSDate())
  }

  ended(value: boolean) {
    if (value)
      this.$query
        .where('startsAt', '<', DateTime.now().toJSDate())
        .where('endsAt', '<', DateTime.now().toJSDate())
  }
  claimed(value: boolean) {
    const ctx = HttpContext.get()!
    let isCurrentUser = ctx?.auth?.use('web').user?.id
    if (value) {
      this.$query.whereHas('participants', (q) => {
        q.where('user_id', isCurrentUser || 0)
          .where('winner', true)
          .where('claimed', true)
      })
    }
  }
  unclaimed(value: boolean) {
    const ctx = HttpContext.get()!
    let isCurrentUser = ctx?.auth?.use('web').user?.id
    if (value) {
      this.$query.whereHas('participants', (q) => {
        q.where('user_id', isCurrentUser || 0)
          .where('winner', true)
          .where('claimed', false)
      })
    }
  }
}
