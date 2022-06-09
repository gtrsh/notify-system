import * as fst from 'fastify'

const createApp = (opts) => {
  const app = fst.fastify(opts)

  const rateLimitOptions = {
    max: opts.MAX_REQUESTS,
    timeWindow: opts.TIME_WINDOW_MS
  }
  /* eslint-disable */
  app.register(import('@fastify/rate-limit'), rateLimitOptions)
  app.register(import('./resources/notification'))
  /* eslint-enable */
  return app
}

export {
  createApp
}
