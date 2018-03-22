export const SIM = true
export const SIM_TTL = 2000

export const fakePromise = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, SIM_TTL)
  })
}
