import knex from 'knex'
import { dbConfig as config } from './config'

const db = knex(config)

export {
  db
}
