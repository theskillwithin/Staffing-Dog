import { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import get from '@sdog/utils/get'
import set from 'lodash/set'
import { positions, getPositionTypesByPosition } from '@sdog/definitions/jobs'

let jobPostFormCache = null

export const formatOffices = offices =>
  offices.map(office => ({
    label: get(
      office,
      'meta.summary.office_name',
      `${get(office, 'addresses.line_1')} ${get(office, 'addresses.city')}`,
    ),
    value: office.id,
  }))

export const salaryTypeOptions = [
  { label: 'Hourly', value: 'hourly' },
  { label: 'Salary', value: 'salary' },
]

export const getInitialState = date => ({
  available_date: '',
  office_id: null,
  criteria: {
    title: '',
    description: '',
    employment_type: null,
    position: null,
    specialty: null,
    hourly_rate: 0.0,
    experience_min: 1,
    experience_preferred: 3,
    applicant_selection: ['closed'],
    duration: {
      start_date: date,
      end_date: date,
    },
  },
  meta: {
    full_description: '',
  },
  misc: {
    applicant_list: [],
  },
})

export function useJobPostForm(
  initialState = null,
  offices = [],
  type = 'new',
  updateArgs = [],
) {
  // set up a non-mutable date
  const date = useRef(
    moment()
      .add(1, 'days')
      .utc()
      .format(),
  )

  // create state for form
  const valueForInitialState =
    'new' === type ? jobPostFormCache || initialState : initialState
  const [state, setState] = useState(
    valueForInitialState || getInitialState(date.current),
  )
  // create state for formating offices
  const [formatedOffices, setOffices] = useState(formatOffices(offices))

  // create method to directly edit the form values by path
  const setFormValue = (path, value) => {
    // set is mutable, so we have to do it this way
    const newState = { ...state }
    set(newState, path, value)
    setState(newState)
  }

  // update job data if it changes
  useEffect(() => void setState({ ...state, ...initialState }), updateArgs)

  // update formated offices when the list of offices change
  useEffect(
    () => {
      const officeOptions = formatOffices(offices)
      setOffices(officeOptions)

      if (!state.office_id) {
        setFormValue('office_id', get(officeOptions, '[0]', null))
      }
    },
    [offices],
  )

  // update cache
  useEffect(() => {
    if ('new' === type) {
      jobPostFormCache = state
    }
  })

  // return values to be used
  const props = {
    type,
    setFormValue,
    date: date.current,
    form: state,
    setForm: setState,
    options: {
      salaryTypes: salaryTypeOptions,
      offices: formatedOffices,
      positions,
      positionTypes: getPositionTypesByPosition(
        get(state, 'criteria.position', 'default'),
      ),
    },
    clearCache: () => {
      jobPostFormCache = null
    },
  }

  return {
    ...props,
    getFormProps: () => props,
  }
}
