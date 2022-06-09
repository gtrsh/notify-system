import knex from 'knex'
import { dbConfig as config } from './config'

export default knex(config)
