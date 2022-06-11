import S from 'fluent-json-schema'
import envSchema from 'env-schema'
import { join } from './utils'

const schema = S.object()
  .prop('PG_DB', S.string().required())
  .prop('APP_PORT', S.integer().required())
  .prop('API_VK', S.string().required())

const config = envSchema({
  schema,
  dotenv: { path: join(import.meta.url, '..', '.env') }
})

const dbConfig = {
  client: 'pg',
  connection: config.PG_DB
}

export {
  config,
  dbConfig,
  dbConfig as default
}
