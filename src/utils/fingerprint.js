const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

export default () =>
  `${new Date().getTime()}${Array(32)
    .fill(0)
    .reduce(p => `${p}${s4()}`, '')}}`.slice(0, 32)
