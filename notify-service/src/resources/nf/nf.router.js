const router = (fastify, opts, done) => {
  fastify.get('/', {}, async (req, rep) => {
    rep.code(200).send('nf route')
  })

  done()
}

export {
  router
}
