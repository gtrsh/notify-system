import { db } from '../db'

await db.schema
  .dropTableIfExists('notifications')
  .createTable('notifications', (table) => {
    table.increments()
    table.text('name')
    table.text('text_template')
    table.text('status')
    table.jsonb('data')
    table.timestamp('created_at', { useTz: false }).defaultTo(db.fn.now())
    table.timestamp('updated_at', { useTz: false }).defaultTo(db.fn.now())
  })
  .then(() => {
    console.log('[INFO] Table notifications created')
    process.exit(0)
  })
  .catch((err) => {
    console.log(`[ERROR] Error while creating table notifications: ${err}`)
    process.exit(1)
  })
