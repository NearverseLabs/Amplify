import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'participations'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('claimed').defaultTo(false)
    })
    this.schema.alterTable('campaigns', (table) => {
      table.boolean('finalised').defaultTo(false)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('claimed')
    })
    this.schema.alterTable('campaigns', (table) => {
      table.dropColumn('finalised')
    })
  }
}
