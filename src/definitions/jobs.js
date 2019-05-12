import get from 'lodash/get'
import startCase from 'lodash/startCase'
import find from 'lodash/find'

export const definitions = {
  type: {
    working_interview: 'Working Interview',
  },
}

// TODO: deprecate this name
export const jobTypes = [
  { label: 'Full Time', value: 'full_time' },
  { label: 'Part Time', value: 'part_time' },
  { label: 'Temp', value: 'temporary' },
  { label: 'All Job Types', value: 'any' },
]

export const employmentTypes = jobTypes

export const positions = [
  { label: 'Dental Hygienist', value: 'dental_hygienist' },
  { label: 'Dental Assistant', value: 'dental_assistant' },
  { label: 'Dentist', value: 'dentist' },
  { label: 'Front Office', value: 'front_office' },
  { label: 'Other', value: 'other' },
  { label: 'All Job Positions', value: 'any' },
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
  { label: 'All Specialty Types', value: 'any' },
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
  { label: 'All Specialty Types', value: 'any' },
]

export const positionTypesByPostion = {
  default: [...positionTypes],
  dentist: [...positionTypesDentist],
}

export const distance = [
  { label: 'Within 5 miles', value: '5' },
  { label: 'Within 10 miles', value: '10' },
  { label: 'Within 25 miles', value: '25' },
  { label: 'Within 50 miles', value: '50' },
  { label: 'Within 100 miles', value: '100' },
  { label: 'Any Distance', value: 'any' },
]

export const getPositionTypesByPosition = position =>
  positionTypesByPostion[position] || positionTypesByPostion.default

export const defineJob = (definekey, key) =>
  get(definitions, `${definekey}.${key}`, startCase(key))

export const getPositionLabel = position =>
  find(
    positions,
    (value, option) => (option.value === position ? option.label : value),
    startCase(position),
  )

export const getSpecialtyLabel = specialty =>
  find(
    [...positionTypes, ...positionTypesDentist],
    (value, option) => (option.value === specialty ? option.label : value),
    startCase(specialty),
  )

export const getEmploymentType = type =>
  find(
    jobTypes,
    (value, option) => (option.value === type ? option.label : value),
    startCase(type),
  )
