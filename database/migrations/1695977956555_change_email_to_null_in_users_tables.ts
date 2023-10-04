import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('email', 255).nullable().alter()
      table.dropUnique(['email']);
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('email', 255).notNullable().unique().alter()
    })
  }
}
