import React, { useEffect, useState, useRef } from 'react'
import { func, bool, string, arrayOf, oneOfType, shape } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import moment from 'moment'
import get from '@sdog/utils/get'
import set from 'lodash/set'
import find from 'lodash/find'
import { setTitle } from '@sdog/utils/document'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'
import Dropdown from '@sdog/components/dropdown'
import Input from '@sdog/components/input'
import DatePicker from '@sdog/components/date_picker'
import Spinner from '@sdog/components/spinner'
import {
  getPracticeOffices as getPracticeOfficesAction,
  findPracticeOffices,
} from '@sdog/store/user'
import { postNewJob as postNewJobAction, findCreateJob } from '@sdog/store/jobs'
import { positions } from '@sdog/definitions/jobs'

import appTheme from '../../app/theme.css'

import theme from './theme.css'

const getInitialState = date => ({
  available_date: '',
  office_id: '',
  criteria: {
    title: '',
    description: '',
    employment_type: '',
    position: '',
    job_category: '',
    hourly_rate: '',
    experience_min: 1,
    experience_preferred: 10,
    applicant_selection: [],
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

const JobPostings = ({ getPracticeOffices, offices, create, postNewJob }) => {
  useEffect(() => void setTitle('Job Postings'), [])
  useEffect(() => void getPracticeOffices(), [])

  const date = useRef(
    moment()
      .add(1, 'days')
      .format(),
  )
  const [form, setForm] = useState(getInitialState(date.current))

  const handleChange = (name, value) => {
    const state = { ...form }

    set(state, name, value)
    setForm(state)
  }

  const jobTypeOptions = [
    { label: 'Dentist', value: 'dentist ' },
    { label: 'Dental hygienist', value: 'Dental hygienist ' },
  ]
  const salaryTypeOptions = [
    { label: 'Hourly', value: 'hourly ' },
    { label: 'Salary', value: 'salary ' },
  ]
  const salaryRateTypeOptions = [{ label: '100k', value: '100k ' }]
  const hourRateTypeOptions = [{ label: '50/hr', value: '50 ' }]

  const submit = e => {
    e.preventDefault()

    postNewJob(form, {
      success: () => {
        setForm(getInitialState(date.current))
      },
    })
  }

  const dropdownOffices = offices.results.map(office => ({
    label: get(office, 'meta.summary.office_name', 'Office'),
    value: office.id,
  }))

  return (
    <div className={clsx(appTheme.pageContent, theme.container, theme.new)}>
      <Card type="large">
        <form className={theme.form} onSubmit={submit}>
          <h2>New Job Posting</h2>

          <div className={theme.row}>
            <Dropdown
              value={find(
                dropdownOffices,
                office => office.office_id === form.criteria.office_id,
              )}
              options={dropdownOffices}
              onChange={value => handleChange('office_id', value.value)}
              label="Office Location"
              placeholder="Office Location"
            />
            <DatePicker
              value={form.criteria.duration.start_date}
              onChange={value => handleChange('criteria.duration.start_date', value)}
              label="Start Date"
              className={theme.startDate}
            />
            <DatePicker
              value={form.criteria.duration.end_date}
              onChange={value => handleChange('criteria.duration.end_date', value)}
              label="End Date"
              className={theme.endDate}
            />
          </div>

          <div className={theme.row}>
            <Input
              value={form.criteria.title}
              onChange={value => handleChange('criteria.title', value)}
              label="Job Title"
            />
          </div>

          <div className={theme.row}>
            <Input
              value={form.criteria.description}
              onChange={value => handleChange('criteria.description', value)}
              label="Short Description. ( max char ? )"
              textarea
              className={theme.shortDescription}
            />
          </div>

          <div className={theme.row}>
            <Input
              value={form.full_description}
              onChange={value => handleChange('meta.full_description', value)}
              label="Full Description"
              textarea
              className={theme.fullDescription}
            />
          </div>

          <div className={theme.row}>
            <Dropdown
              value={find(positions, position => position.value === form.provider_type)}
              onChange={value => handleChange('criteria.position', value.value)}
              placeholder="Provider Type"
              options={positions}
            />
            <Dropdown
              value={find(jobTypeOptions, jobType => jobType.value === form.job_type)}
              onChange={value => handleChange('criteria.job_type', value.value)}
              placeholder="Job Type"
              options={jobTypeOptions}
            />
          </div>

          <div className={theme.row}>
            <Dropdown
              value={find(
                salaryTypeOptions,
                salaryType => salaryType.value === form.salary_type,
              )}
              onChange={value => handleChange('salary_type', value.value)}
              placeholder="Salary Type"
              options={salaryTypeOptions}
            />
            {get(form, 'criteria.salary_type', false) === 'salary' ? (
              <Dropdown
                value={find(
                  salaryRateTypeOptions,
                  hourRate => hourRate.value === form.rate,
                )}
                onChange={value => handleChange('criteria.rate', value.value)}
                placeholder="Salary Rate"
                options={salaryRateTypeOptions}
              />
            ) : (
              <Dropdown
                value={find(
                  hourRateTypeOptions,
                  hourRate => hourRate.value === form.rate,
                )}
                onChange={value => handleChange('criteria.rate', value.value)}
                placeholder="Hourly Rate"
                options={hourRateTypeOptions}
              />
            )}
          </div>

          <div className={theme.row}>
            <Input
              value={form.criteria.experience_min}
              onChange={value => handleChange('criteria.experience_min', value)}
              label="Minimum Experience"
              type="number"
            />

            <Input
              value={form.criteria.experience_preferred}
              onChange={value => handleChange('criteria.experience_preferred', value)}
              label="Preferred Experience"
              type="number"
            />
          </div>
          <Button type="submit" className={theme.submitBtn}>
            Create Job Posting {create.loading && <Spinner />}
          </Button>

          {create.error && <p>{create.error}</p>}
        </form>
      </Card>
    </div>
  )
}

JobPostings.propTypes = {
  offices: shape({
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
    results: arrayOf(shape({ id: string })),
  }).isRequired,
  getPracticeOffices: func.isRequired,
  create: shape({
    loading: bool,
    error: oneOfType([bool, string]),
  }).isRequired,
  postNewJob: func.isRequired,
}

export const mapStateToProps = state => ({
  offices: findPracticeOffices(state),
  create: findCreateJob(state),
})
export const mapActionsToProps = {
  getPracticeOffices: getPracticeOfficesAction,
  postNewJob: postNewJobAction,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(JobPostings)
