import { db } from '../../db'
import { NotificationService } from './nf.service'
import * as models from './nf.model'

const getAllNotifications = async (req, rep) => {
  return models.getNotifications(db)
}

const createNotification = async (req, rep) => {
  try {
    const notification = await NotificationService.create({
      name: req.body.name,
      text_template: req.body.text_template
    }, { db })

    notification.runNotificationSending()

    return rep.code(200)
      .send({
        id: notification.nf.id,
        name: notification.nf.name,
        status: notification.nf.status
      })
  } catch (err) {
    throw err
  }
}

export {
  getAllNotifications,
  createNotification
}
