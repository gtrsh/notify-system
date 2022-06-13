import EventEmitter from 'emittery'
import { fetch } from 'undici'
import { config } from '../../config'
import { unwrap } from '../../utils'
import { STATUSES } from './nf.const'
import * as model from './nf.model'

const splitUsers = (arr, splitNum) => {
  const ch1 = arr.splice(0, splitNum)
  const ch2 = arr.splice(0, splitNum)
  const ch3 = arr.splice(0, splitNum)
  const ch4 = arr.splice(0, splitNum)
  const ch5 = arr.splice(0, splitNum)

  return [ch1, ch2, ch3, ch4, ch5]
}

class NotificationService extends EventEmitter {
  constructor(data, opts = {}) {
    super()

    this.nf = null
    this.simple_template = null
    this.opts = opts
    this.status = STATUSES.CREATED
    this.data = {
      ...data,
      status: this.status
    }
    this.counter = {
      all: 0,
      current: 0,
      step: 500
    }
  }

  async init() {
    this.data.text_template.includes("'{user_name}'") ?
      this.simple_template = false :
      this.simple_template = true

    try {
      const dbResponse = await this.saveInput()
      const dbCount = await this.getPlayersCount()

      this.nf = unwrap(dbResponse)
      this.counter.all = Number(unwrap(dbCount).count)
    } catch (err) {
      console.log(`[ERROR] Can't create notification distribution: ${err}`)
      throw err
    }

  }

  async saveInput() {
    return model.addNotificationData(this.opts.db, this.data)
  }

  async updateStatus(status) {
    const dbResponse = await model.updateNotification(this.opts.db, this.nf.id, 'status', status)
    this.nf.status = dbResponse.status

    return dbResponse
  }

  async getPlayersCount() {
    return model.getPlayersCount(this.opts.db)
  }

  async getPlayersData(limitNum, offsetNum) {
    return model.getPlayers(this.opts.db, limitNum, offsetNum)
  }

  async runNotificationSending() {
    try {
      await this.updateStatus(STATUSES.RUNNING)

      do {
        const { current, step } = this.counter
        const allUserDataChunks = await this.getPlayersData(step, current)
        const allUsersArr = splitUsers(allUserDataChunks, 100)
        const promises = allUsersArr.map((usersArr) => fetch(config.API_VK, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            ids: usersArr,
            text: this.nf.text_template
          })
        }).catch((err) => ({
          error: true,
          message: `Error while making api call: ${err}`
        })))

        const apiResponseArr = await Promise.all(promises)

        for (const response of apiResponseArr) {
          const data = await response.json()
          console.log('[INFO] Players who\'s got notification: ', data)
        }

        await this.updateCurrentOffset(step)
        await this.delay(1000)
      } while (this.counter.current < this.counter.all)

      await this.updateStatus(STATUSES.COMPLETED)
    } catch (err) {
      console.log(`[ERROR] Error while sending notification: ${err}`)
      throw err
    }
  }

  async delay(ms) {
    return new Promise(r => setTimeout(r, ms))
  }

  async updateCurrentOffset(offsetNum) {
    this.counter.current += offsetNum
  }

  static async create(data, opts) {
    const newObj = new NotificationService(data, opts)
    await newObj.init()
    return newObj
  }
}

export {
  NotificationService
}
