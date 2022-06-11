import * as app from './app'
import { config } from './config'

const appInstance = app.createApp(config)

await appInstance.listen(config.APP_PORT).catch((err) => {
  console.error(`[ERROR]: App start Exception: ${err.message}`)
  process.exit(1)
})

process.on('uncaughtException', err => {
  console.error(`[ERROR]: Uncaught Exception: ${err.message}`)
  process.exit(1)
})
