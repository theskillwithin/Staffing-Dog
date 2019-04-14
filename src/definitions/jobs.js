import get from 'lodash/get'
import startCase from 'lodash/startCase'

export const definitions = {
  type: {
    working_interview: 'Working Interview',
  },
}

export const positions = [
  { label: 'Dental Hygienist', value: 'dental_hygienist' },
  { label: 'Dental Assistant', value: 'dental_assistant' },
  { label: 'Dentist', value: 'dentist' },
  { label: 'Front Office', value: 'front_office' },
  { label: 'Other', value: 'other' },
]

export const defineJob = (definekey, key) =>
  get(definitions, `${definekey}.${key}`, startCase(key))
