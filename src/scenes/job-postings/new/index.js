import React, { useEffect, useState } from 'react'
import { bool, array } from 'prop-types'
import clsx from 'clsx'
import { setTitle } from '@sdog/utils/document'
import SVG from '@sdog/components/svg'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'
import Dropdown from '@sdog/components/dropdown'
import Input from '@sdog/components/input'
import Spinner from '@sdog/components/spinner'

import appTheme from '../../app/theme.css'

import theme from './theme.css'

const JobPostings = ({ loading, officeLocationOptions }) => {
  useEffect(() => void setTitle('Job Postings'), [])
  const [form, setForm] = useState({
    office_location: '',
    start_date: '',
    end_date: '',
    job_title: '',
    short_description: '',
    provider_type: '',
    job_type: '',
    salary_type: '',
    rate: '',
  })

  const [type, setType] = useState(false)

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value })
  }

  const providerTypeOptions = [
    { label: 'Dentist', value: 'dentist ' },
    { label: 'Dental hygienist', value: 'Dental hygienist ' },
  ]

  const jobTypeOptions = [
    { label: 'Dentist', value: 'dentist ' },
    { label: 'Dental hygienist', value: 'Dental hygienist ' },
  ]

  const salaryTypeOptions = [
    { label: 'Hourly', value: 'hourly ' },
    { label: 'Salary', value: 'salary ' },
  ]

  const yearsOfExperienceOptions = [
    { label: '0-1', value: '0-1 ' },
    { label: '1-2', value: '1-2 ' },
    { label: '2-3', value: '1-3 ' },
  ]

  const salaryRateTypeOptions = [{ label: '100k', value: '100k ' }]

  const hourRateTypeOptions = [{ label: '50/hr', value: '50 ' }]

  const submit = e => {
    e.preventDefault()
    console.log('Submit')
  }

  if (!type) {
    console.log('wtf')
    return (
      <div className={clsx(appTheme.pageContent, theme.container, theme.choose)}>
        <Card>
          <SVG name="mobile" className={theme.mobileSVG} />
          <h1>
            DayHire <sup>&trade;</sup>
          </h1>
          <h4>Choose for immediate results</h4>
          <p>
            DayHire&trade; automatically matches you with professionals in your area,
            ready to work in minutes. A lifesaver when you need a temp.
          </p>
          <Button onClick={() => setType('dayHire')} size="medium">
            I want this option
          </Button>
        </Card>
        <Card>
          <SVG name="desktop_search" className={theme.desktopSearchSVG} />
          <h1>Job Board</h1>
          <h4>Choose for long range planning</h4>
          <p>
            Advanced job board brings highly qualified professionals together with smart
            match technology, making your hiring decisions easy.
          </p>
          <Button onClick={() => setType('dayHire')} size="medium">
            I want this option
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className={clsx(appTheme.pageContent, theme.container, theme.new)}>
      <Card type="large">
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <form className={theme.form} onSubmit={submit}>
            <h1>New Job Posting</h1>
            <div className={theme.row}>
              <Dropdown
                value={form.office_location}
                options={officeLocationOptions}
                onChange={value => handleChange('office_location', value)}
                label="Office Location"
                placeholder="Office Location"
              />
              <Input
                value={form.start_date}
                onChange={value => handleChange('start_date', value)}
                label="Start Date"
                className={theme.startDate}
              />
              <Input
                value={form.end_date}
                onChange={value => handleChange('end_date', value)}
                label="End Date"
                className={theme.endDate}
              />
            </div>
            <div className={theme.row}>
              <Input
                value={form.job_title}
                onChange={value => handleChange('job_title', value)}
                label="Job Title"
              />
            </div>
            <div className={theme.row}>
              <Input
                value={form.short_description}
                onChange={value => handleChange('short_description', value)}
                label="Short Description. ( max char ? )"
                textarea
                className={theme.shortDescription}
              />
            </div>
            <div className={theme.row}>
              <Input
                value={form.full_description}
                onChange={value => handleChange('full_description', value)}
                label="Full Description"
                textarea
                className={theme.fullDescription}
              />
            </div>
            <div className={theme.row}>
              <Dropdown
                value={form.provider_type}
                onChange={value => handleChange('provider_type', value)}
                placeholder="Provider Type"
                options={providerTypeOptions}
              />
              <Dropdown
                value={form.job_type}
                onChange={value => handleChange('job_type', value)}
                placeholder="Job Type"
                options={jobTypeOptions}
              />
            </div>
            <div className={theme.row}>
              <Dropdown
                value={form.salary_type}
                onChange={value => handleChange('salary_type', value)}
                placeholder="Salary Type"
                options={salaryTypeOptions}
              />
              {form.salary_type && form.salary_type.value === 'salary' ? (
                <Dropdown
                  value={form.rate}
                  onChange={value => handleChange('rate', value)}
                  placeholder="Salary Rate"
                  options={salaryRateTypeOptions}
                />
              ) : (
                <Dropdown
                  value={form.rate}
                  onChange={value => handleChange('rate', value)}
                  placeholder="Hourly Rate"
                  options={hourRateTypeOptions}
                />
              )}
            </div>
            <div className={theme.halfRow}>
              <Dropdown
                value={form.years_of_experience}
                onChange={value => handleChange('years_of_experience', value)}
                placeholder="Years of Experience"
                options={yearsOfExperienceOptions}
              />
            </div>
            <Button type="submit" className={theme.submitBtn}>
              Create Job Posting
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}

JobPostings.defaultProps = {
  loading: false,
  officeLocationOptions: [{ label: 'the matrix', value: 'the matrix' }],
}

JobPostings.propTypes = {
  loading: bool,
  officeLocationOptions: array,
}

export default JobPostings
