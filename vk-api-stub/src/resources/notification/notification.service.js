import db from '../../db'
import { getUsers } from './notification.model'

const notificationService = async (userIds) => {
  const data = await getUsers(userIds, db)
  return data.map((i) => i.vk_id)
}

export {
  notificationService
}
