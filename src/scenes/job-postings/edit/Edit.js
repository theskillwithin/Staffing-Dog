import React, { useEffect } from 'react'
import { shape, arrayOf, oneOfType, bool, string } from 'prop-types'
import get from '@sdog/utils/get'
import find from 'lodash/find'
import clsx from 'clsx'
import appTheme from '@sdog/scenes/app/theme.css'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'
import Input from '@sdog/components/input'
import DatePicker from '@sdog/components/date_picker'
import Dropdown from '@sdog/components/dropdown'
import Spinner from '@sdog/components/spinner'

import { useJobPostForm } from '../useJobPostForm'
import theme from '../new/theme.css'

const JobPostingEditView = ({ job, jobLoading, offices }) => {
  useEffect(() => {
    console.log('mounted')
  }, [])
  const { form, setFormValue, options } = useJobPostForm(job, offices.results, [
    get(job, 'id', false),
  ])

  const onSubmit = e => {
    e.preventDefault()

    console.log('update post', form)
  }

  return (
    <div className={clsx(appTheme.pageContent, theme.container, theme.new)}>
      <Card type="large">
        {jobLoading && !job.id ? (
          <Spinner />
        ) : (
          <form className={theme.form} onSubmit={onSubmit}>
            <h2>Edit Job Posting</h2>

            <p>
              <Button
                clear
                type="button"
                onClick={() => setFormValue('criteria.employment_type', null)}
              >
                Change job posting type.
              </Button>
            </p>

            <div className={theme.row}>
              <Dropdown
                value={find(
                  options.offices,
                  office => office.office_id === form.criteria.office_id,
                )}
                options={options.offices}
                onChange={value => setFormValue('office_id', value.value)}
                label="Office Location"
                placeholder="Office Location"
                disabled={form.criteria.office_id}
              />

              <DatePicker
                value={form.criteria.duration.start_date}
                onChange={value => setFormValue('criteria.duration.start_date', value)}
                label="Start Date"
                className={theme.startDate}
              />

              <DatePicker
                value={form.criteria.duration.end_date}
                onChange={value => setFormValue('criteria.duration.end_date', value)}
                label="End Date"
                className={theme.endDate}
              />
            </div>

            <div className={theme.row}>
              <Input
                value={form.criteria.title}
                onChange={value => setFormValue('criteria.title', value)}
                label="Job Title"
              />
            </div>

            <div className={theme.row}>
              <Input
                value={form.criteria.description}
                onChange={value => setFormValue('criteria.description', value)}
                label="Short Description. ( max char ? )"
                textarea
                className={theme.shortDescription}
              />
            </div>

            <div className={theme.row}>
              <Input
                value={form.full_description}
                onChange={value => setFormValue('meta.full_description', value)}
                label="Full Description"
                textarea
                className={theme.full_description}
              />
            </div>

            <div className={theme.row}>
              <Dropdown
                value={find(
                  options.positions,
                  position => position.value === form.criteria.position,
                )}
                onChange={value => setFormValue('criteria.position', value.value)}
                placeholder="Provider Type"
                options={options.positions}
              />

              <Dropdown
                value={find(
                  options.positionTypes,
                  jobType => jobType.value === form.criteria.specialty,
                )}
                disabled={!form.criteria.position}
                onChange={value => setFormValue('criteria.specialty', value.value)}
                placeholder="Job Type"
                options={options.positionTypes}
              />
            </div>

            <div className={theme.row}>
              <Dropdown
                value={find(
                  options.salaryTypes,
                  salaryType => salaryType.value === form.meta.salary_type,
                )}
                onChange={value => setFormValue('meta.salary_type', value.value)}
                placeholder="Salary Type"
                options={options.salaryTypes}
              />

              <Input
                value={form.criteria.hourly_rate}
                onChange={value =>
                  setFormValue(
                    'criteria.hourly_rate',
                    parseFloat(value.replace(/[^\d.-]/g, '')),
                  )
                }
                label={
                  get(form, 'meta.salary_type', false) === 'salary'
                    ? 'Salary Rate'
                    : 'Hourly Rate'
                }
              />
            </div>

            <div className={theme.row}>
              <Input
                value={form.criteria.experience_min}
                onChange={value => setFormValue('criteria.experience_min', value)}
                label="Minimum Experience"
                type="number"
              />

              <Input
                value={form.criteria.experience_preferred}
                onChange={value => setFormValue('criteria.experience_preferred', value)}
                label="Preferred Experience"
                type="number"
              />
            </div>

            <Button type="submit" className={theme.submitBtn}>
              Update Job Posting
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}

JobPostingEditView.propTypes = {
  job: shape({ id: string }).isRequired,
  jobLoading: bool.isRequired,
  jobError: oneOfType([bool, string]),
  offices: shape({
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
    results: arrayOf(shape({ id: string })),
  }).isRequired,
}

export default JobPostingEditView
