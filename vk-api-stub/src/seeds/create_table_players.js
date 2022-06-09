export const seed = async (db) => {
  await db.schema.createTable('players', (table) => {
    table.increments()
    table.text('vk_id')
    table.text('first_name')
    table.timestamp('created_at', { useTz: false }).defaultTo(db.fn.now())
    table.timestamp('updated_at', { useTz: false }).defaultTo(db.fn.now())
  })
}
