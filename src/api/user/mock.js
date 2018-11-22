import moment from 'moment'
import mockBuilder from '@api/mockBuilder'
import * as userApi from '@sdog/api/user'

const randomDayOfMonth = () => Math.floor(Math.random() * (28 - 1 + 1) + 1)

export const schedule = [
  {
    id: `${new Date().getTime()}-1`,
    date: randomDayOfMonth(),
    type: 'schedule',
  },
  {
    id: `${new Date().getTime()}-2`,
    date: randomDayOfMonth(),
    type: 'schedule',
  },
  {
    id: `${new Date().getTime()}-3`,
    date: randomDayOfMonth(),
    type: 'schedule',
  },
  {
    id: `${new Date().getTime()}-4`,
    date: randomDayOfMonth(),
    type: 'schedule',
  },
]

export const mock = {
  getSchedule: config => {
    const date = moment(config.data.date)

    return {
      events: schedule.map(event => ({
        ...event,
        date: date.date(event.date).format(),
      })),
    }
  },
  updateProfile: {
    status: 'success',
  },
}

export const apiMocks = mockBuilder(userApi, mock)

export default apiMocks
