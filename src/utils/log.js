export default (...args) => {
  if (console && console.log) { // eslint-disable-line
    console.log(...args) // eslint-disable-line no-console
  }
}
