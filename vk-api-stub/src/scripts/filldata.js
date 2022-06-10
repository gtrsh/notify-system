import * as fs from 'node:fs/promises'
import db from '../db'
import { join } from '../utils'

const dataPath = join(import.meta.url, '..', '..', '..', 'data', 'players-small-set.json')
const data = await fs.readFile(dataPath, 'utf-8').then((data) => JSON.parse(data))

const clearTable = async () => (
  db('players')
    .del()
    .then(() => {
      console.log('[INFO]: Clear table complete')
      process.exit(0)
    })
    .catch((err) => {
      console.error(`[ERROR]: Error while clear data: ${err}`)
    })
)

await Promise.all(data.map((item) => db('players').insert(item)))
  .then(() => {
    console.log('[INFO]: Insert data complete!')
    process.exit(0)
  })
  .catch((err) => {
    console.error(`[ERROR]: Error while inserting data: ${err}`)
    process.exit(1)
  })
