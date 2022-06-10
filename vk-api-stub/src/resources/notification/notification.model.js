const getUsers = async (users, db) => (
  await db('players')
    .select('vk_id')
    .whereIn('vk_id', users)
)

export {
  getUsers
}
