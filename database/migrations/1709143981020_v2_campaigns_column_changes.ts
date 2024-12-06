import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('campaigns', (table) => {
      table.string('platform').nullable()
      table.integer('messages_in_community').nullable()
      table.integer('messages_in_group').nullable()
      table.integer('active_in_community_time').nullable()
      table.integer('active_in_group_time').nullable()
      table.string('join_group').nullable()
      table.string('join_community').nullable()
      table.bigInteger('oc_group_campaign_last_event_id').nullable().unsigned()
      table.bigInteger('oc_community_campaign_last_event_id').nullable().unsigned()
    })
    this.schema.alterTable('users', (table) => {
      table.string('taggr_principal').nullable()
      table.string('openchat_principal').nullable()
    })
  }

  public async down() {
    this.schema.alterTable('campaigns', (table) => {
      table.dropColumn('platform')

      table.dropColumn('messages_in_community')
      table.dropColumn('messages_in_group')
      table.dropColumn('active_in_community_time')
      table.dropColumn('active_in_group_time')
      table.dropColumn('join_group')
      table.dropColumn('join_community')
      table.dropColumn('oc_group_campaign_last_event_id')
      table.dropColumn('oc_community_campaign_last_event_id')
    })
    this.schema.alterTable('users', (table) => {
      table.dropColumn('taggr_principal')
      table.dropColumn('openchat_principal')
    })
  }
}
