import * as controller from './nf.controller'
import { postNotificationSchema as schema } from './nf.validator'

const router = (fastify, opts, done) => {
  fastify.get('/api/nf', {}, controller.getAllNotifications)
  fastify.post('/api/nf', { schema }, controller.createNotification)

  done()
}

export {
  router
}
