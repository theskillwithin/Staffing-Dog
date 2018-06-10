import axios from 'axios'

import { SIM, API_ROOT, fakePromise } from '../config'

export const registerUser = data => {
  return SIM ? fakePromise({}) : axios.post(`${API_ROOT}/registration/new`, data)
}

export const updateProfile = (data, type = 'professional') => {
  return SIM ? fakePromise({}) : axios.post(`${API_ROOT}/${type}_profile/update`, data)
}

export const getProfile = (type = 'professional') => {
  return SIM ? fakePromise({}) : axios.get(`${API_ROOT}/${type}_profile`)
}

export const getUser = () => {
  return SIM ? fakePromise({}) : axios.get(`${API_ROOT}/user`)
}

export const updateUser = data => {
  return SIM ? fakePromise({}) : axios.post(`${API_ROOT}/user/update`, data)
}

export default {
  registerUser,
  updateProfile,
  getProfile,
  getUser,
  updateUser,
}
