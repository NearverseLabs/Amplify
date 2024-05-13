import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'campaigns'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('campaign_id').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('campaign_id')
    })
  }
}
