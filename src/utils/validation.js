const isInvalid = (value, name, validation, required = false, pwMatch = false, label) => {
  if ((required && !value) || (required && value === '')) {
    return `${label || name} is a required field`
  }
  if (validation === 'email') {
    return !/@/.test(value) && 'Not a valid email.'
  }
  // prettier-ignore
  if (validation === 'password') {
    return (
      !(value && value.length >= 8 && (new Set(value)).size >= 6) &&
      'Password requires 8 + characters containing and 6 + unique characters'
    )
  }
  if (validation === 'passwordMatch' && pwMatch) {
    return !(value === pwMatch) && 'Password and Verify Password must match.'
  }
  if (/minDigits/.test(validation)) {
    const minChars = /minDigits(\d*)/.exec(validation)[1]
    return (
      value.length < parseInt(minChars, 10) &&
      `${label || name} must be contain ${minChars} digits`
    )
  }
  if (/minChars/.test(validation)) {
    const minChars = /minChars(\d*)/.exec(validation)[1]
    return (
      value.length < parseInt(minChars, 10) &&
      `${label || name} must be contain ${minChars} characters`
    )
  }
  return false
}

export default isInvalid
