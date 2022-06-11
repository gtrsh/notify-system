import { postNotificationSchema as schema } from './notification.validator'
import { notificationService } from './notification.service'

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

    const usersNotified = await notificationService(req.body.ids)
    return {
      data: usersNotified
    }
  })

  done()
}

export default router
