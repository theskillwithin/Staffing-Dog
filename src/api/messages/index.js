import axios from 'axios'

import { SIM, API_ROOT, fakePromise } from '../config'

import { threads, messages } from './mock'

export const getThreads = () => {
  return SIM ? fakePromise({ threads }) : axios.get(`${API_ROOT}/message`)
}

export const getMessages = threadId => {
  return SIM
    ? fakePromise({ messages })
    : axios.get(`${API_ROOT}/threads/${threadId}/messages`)
}

export const sendMessage = data => {
  return SIM ? fakePromise({}) : axios.post(`${API_ROOT}/message/send`, data)
}

export const deleteMessage = data => {
  return SIM ? fakePromise({}) : axios.post(`${API_ROOT}/message/delete`, data)
}

export default { getThreads, getMessages }
