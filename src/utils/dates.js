export const convertToHour = (hour, timeType = '24h') => {
  const hourNumber = parseInt(hour, 10)
  const hourString = `${hourNumber}`

  if ('24h' === timeType) {
    return hourNumber < 10 ? `0${hourNumber}` : hourString
  }

  return hourNumber > 12 ? `${hourNumber - 12}` : hourString
}

export const timesOfDay = (timeType = '24h') => {
  return Array(24)
    .fill(0)
    .reduce(
      (times, _value, index) => [
        ...times,
        `${convertToHour(index, timeType)}:00`,
        `${convertToHour(index, timeType)}:30`,
      ],
      [],
    )
}

export const hoursOfDay = (timeType = '24h') => {
  const am = Array(12)
    .fill(0)
    .reduce(
      (times, _value, index) => [
        ...times,
        `${parseInt(convertToHour(index, timeType), 10) + 1} am`,
      ],
      [],
    )
  const pm = Array(12)
    .fill(0)
    .reduce(
      (times, _value, index) => [
        ...times,
        `${parseInt(convertToHour(index, timeType), 10) + 1} am`,
      ],
      [],
    )
  return [...am, ...pm]
}

export const minBy15 = ['00', '15', '30', '45', '60']

export default timesOfDay
