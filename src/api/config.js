import { SIM } from '@util/env'

export { SIM }
export const SIM_TTL = 1000

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
