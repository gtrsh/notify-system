import { postNotificationSchema as schema } from './notification.validator'

const router = (fastify, opts, done) => {
  fastify.post('/api/notification', { schema, attachValidation: true }, async (req, rep) => {
    if (req.validationError) {
      rep
        .code(400)
        .send({
          code: 3,
          description: 'Invalid data'
        })
    }

    return {
      data: []
    }
  })

  done()
}

export default router
