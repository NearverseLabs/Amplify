import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'participations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.bigInteger('campaign_id').unsigned().references('id').inTable('campaigns').onDelete('CASCADE')

      table.json('requirements')
      table.boolean('winner').defaultTo(false)
      table.boolean('submitted').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
