import axios from 'axios'

import { SIM, fakePromise } from '../config'

import { events, scheduledEvents } from './mock'

export const getScheduledEvents = () => {
  return SIM
    ? fakePromise({ events: scheduledEvents })
    : axios.get('/jobs/scheduled-events')
}

export const getEvents = () => {
  return SIM ? fakePromise({ events }) : axios.get('/jobs')
}

export default { getScheduledEvents, getEvents }
