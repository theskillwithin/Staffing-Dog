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

export const positionTypes = [
  { label: 'Family & General Dentistry', value: 'family_general_dentist' },
  { label: 'Anesthesiology', value: 'anesthesiology' },
  { label: 'Endodontics', value: 'endodontics' },
  { label: 'Oral & Maxillofacial Surgery', value: 'oral_maxillofacial_surgery' },
  { label: 'Orthodontics', value: 'orthodontics' },
  { label: 'Pedodontics', value: 'pedodontics' },
  { label: 'Periodontics', value: 'periodontics' },
  { label: 'Prosthodontics', value: 'prosthodontics' },
  { label: 'Radiology', value: 'radiology' },
  { label: 'Other', value: 'other' },
]

export const positionTypesDentist = [
  { label: 'Family & General Dentist', value: 'family_general_dentist' },
  { label: 'Anesthesiologist', value: 'anesthesiologist' },
  { label: 'Endodontist', value: 'endodontist' },
  { label: 'Oral & Maxillofacial Surgeon', value: 'oral_maxillofacial_surgeon' },
  { label: 'Orthodontist', value: 'orthodontist' },
  { label: 'Pedodontist', value: 'pedodontist' },
  { label: 'Periodontist', value: 'periodontist' },
  { label: 'Prosthodontist', value: 'prosthodontist' },
  { label: 'Radiologist', value: 'radiologist' },
  { label: 'Other', value: 'other' },
]

export const positionTypesByPostion = {
  default: [...positionTypes],
  dentist: [...positionTypesDentist],
}

export const getPositionTypesByPosition = position =>
  positionTypesByPostion[position] || positionTypesByPostion.default

export const defineJob = (definekey, key) =>
  get(definitions, `${definekey}.${key}`, startCase(key))
