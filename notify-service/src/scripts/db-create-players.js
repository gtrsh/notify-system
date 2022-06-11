import { db } from '../db'

await db.schema
  .dropTableIfExists('players')
  .createTable('players', (table) => {
    table.increments()
    table.text('vk_id')
    table.text('first_name')
    table.timestamp('created_at', { useTz: false }).defaultTo(db.fn.now())
    table.timestamp('updated_at', { useTz: false }).defaultTo(db.fn.now())
  })
  .then(() => {
    console.log('[INFO] Table players created')
    process.exit(0)
  })
  .catch((err) => {
    console.log(`[ERROR] Error while creating table players: ${err}`)
    process.exit(1)
  })
