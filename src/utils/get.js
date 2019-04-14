import _get from 'lodash/get'

export const get = (object, path, defaultValue) => {
  const value = _get(object, path, defaultValue)

  return null === value ? defaultValue : value
}

export default get
