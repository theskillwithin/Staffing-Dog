import { SIM, IS_DEV } from '@util/env'

export { SIM }
export const API_VERSION = 'v1'
export const SIM_TTL = 100
export const LOCAL_API_ROOT = `https://api.sdog.local:8080/${API_VERSION}`
export const PROD_API_ROOT = `https://api.staffing.dog/${API_VERSION}`
export const API_ROOT = IS_DEV ? LOCAL_API_ROOT : PROD_API_ROOT

export const fakePromise = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, SIM_TTL)
  })
}

export const fakePromiseFail = data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(data)
    }, SIM_TTL)
  })
}
