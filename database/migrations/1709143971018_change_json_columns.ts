import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'participations'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('requirements').alter()
    })
    this.schema.alterTable('campaigns', (table) => {
      table.text('requirements').alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('requirements').alter()
    })
    this.schema.alterTable('campaigns', (table) => {
      table.json('requirements').alter()
    })
  }
}
