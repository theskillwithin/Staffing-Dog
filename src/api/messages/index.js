import axios from 'axios'

import { SIM, fakePromise } from '../config'

import { threads, messages } from './mock'

export const getThreads = () => {
  return SIM ? fakePromise({ threads }) : axios.get('/messages/threads')
}

export const getMessages = threadId => {
  return SIM
    ? fakePromise({ messages })
    : axios.get(`/messages/threads/${threadId}/messages`)
}

export default { getThreads, getMessages }
