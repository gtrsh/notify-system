import * as app from './app'

const appInstance = app.createApp({})

await appInstance.listen(3010).catch((err) => {
  console.error(`[ERROR]: App start Exception: ${err.message}`)
  process.exit(1)
})

process.on('uncaughtException', err => {
  console.error(`[ERROR]: Uncaught Exception: ${err.message}`)
  process.exit(1)
})
