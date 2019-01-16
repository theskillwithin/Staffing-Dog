import get from 'lodash/get'
import startCase from 'lodash/startCase'

export const definitions = {
  type: {
    working_interview: 'Working Interview',
  },
}

export const defineJob = (definekey, key) =>
  get(definitions, `${definekey}.${key}`, startCase(key))
