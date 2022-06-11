import * as fst from 'fastify'

const createApp = (opts) => {
  const app = fst.fastify(opts)

  /* eslint-disable */
  app.register(import('./resources/nf'))
  /* eslint-enable */
  return app
}

export {
  createApp
}
