import * as fst from 'fastify'

const createApp = (opts) => {
  const app = fst.fastify(opts)

  const rateLimitOptions = {
    max: opts.MAX_REQUESTS,
    timeWindow: opts.TIME_WINDOW_MS,
    errorResponseBuilder: (request, context) => {
      return {
        code: 1,
        description: 'Too frequently',
        message: `Servive only allow ${context.max} requests per ${context.after} to this endpoint`
      }
    }
  }
  /* eslint-disable */
  app.register(import('@fastify/rate-limit'), rateLimitOptions)
  app.register(import('./resources/vk'))
  app.setErrorHandler(async (error, req, rep) => {
    rep
      .status(500)
      .send({
        code: 2,
        description: 'Server error'
      })
  })
  /* eslint-enable */
  return app
}

export {
  createApp
}
