import { postNotificationSchema as schema } from './notification.schema'

const router = (fastify, opts, done) => {
  fastify.post('/api/notification', { schema }, async (req) => {
    return {
      data: []
    }
  })

  done()
}

export default router
