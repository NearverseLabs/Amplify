import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'campaigns'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('project_name')
      table.string('tweet_id')
      table.integer('winners')
      table.string('reward_token')
      table.string('reward')
      table.boolean('is_deposited').defaultTo(false)
      table.json('requirements')
      table.timestamp('starts_at')
      table.timestamp('ends_at')
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
