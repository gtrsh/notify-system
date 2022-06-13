const getNotifications = async (db, limit, offset) => {
  return db('notifications')
}

const getNotificationData = async (db, id) => {
  return  db('notifications')
}

const addNotificationData = async (db, data) => {
  return db('notifications')
    .returning('*')
    .insert(data)
}

const getPlayers = async (db, limitNum, offsetNum) => {
  return db('players')
    .select('vk_id')
    .limit(limitNum)
    .offset(offsetNum)
    .then((data) => data.map((user) => user.vk_id))
}

const updateNotification = async (db, id, fileld, data) => {
  return db('notifications')
    .update(fileld, data)
    .where('id', id)
    .returning('*')
    .then((data) => data[0])
}

const getPlayersCount = async (db) => db('players').count()

export {
  addNotificationData,
  getNotificationData,
  getNotifications,
  getPlayers,
  updateNotification,
  getPlayersCount
}
