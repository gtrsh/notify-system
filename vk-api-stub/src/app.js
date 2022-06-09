import * as fst from 'fastify'

const createApp = (opts) => {
  const app = fst.fastify(opts)

  app.register(import('./resources/notification')) // eslint-disable-line
  return app
}

export {
  createApp
}
