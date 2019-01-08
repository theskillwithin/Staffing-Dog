const hMM = (hours, minutes, is24h = false, hourOnly = false) =>
  `${String(is24h ? hours % 24 : (hours % 12) + 1)}${
    !hourOnly ? `:${String(minutes).padStart(2, '0')}` : ''
  }${is24h ? '' : hours >= 12 ? ' pm' : ' am'}`

export const timesOfDay = (is24h = false, hourOnly = false) =>
  Array.from({ length: 24 }, (_, i) => i)
    .map(x =>
      [hMM(x, 0, is24h, hourOnly), !hourOnly && hMM(x, 30, is24h)].filter(Boolean),
    )
    .reduce((xs, ys) => xs.concat(ys), [])

export const minBy15 = ['00', '15', '30', '45']

export default timesOfDay
