const hMM = (hours, minutes, is24h = false) =>
  `${String(is24h ? hours % 24 : (hours % 12) + 1)}:${String(minutes).padStart(2, '0')}${
    is24h ? '' : hours >= 12 ? ' pm' : ' am'
  }`

export const timesOfDay = (is24h = false) =>
  Array.from({ length: 24 }, (_, i) => i)
    .map(x => [hMM(x, 0, is24h), hMM(x, 30, is24h)])
    .reduce((xs, ys) => xs.concat(ys), [])

export const minBy15 = ['00', '15', '30', '45', '60']

export default timesOfDay
