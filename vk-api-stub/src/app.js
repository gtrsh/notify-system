import * as fst from 'fastify'

const createApp = (opts) => {
  const app = fst.fastify(opts)

  return app
}

export {
  createApp
}
