import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('users', (table) => {
      table.string('email').nullable().alter()
      table.string('name').nullable().alter()
      table.string('username').nullable().alter()
      table.string('password').nullable().alter()
      table.string('account_id').nullable().alter()
    })
  }

  public async down() {}
}
