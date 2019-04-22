import React, { useEffect } from 'react'
import { func, bool, string, arrayOf, oneOfType, shape } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import get from '@sdog/utils/get'
import { useDocumentTitle } from '@sdog/utils/document'
import SVG from '@sdog/components/svg'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'
import Alert from '@sdog/components/alert'
import {
  getPracticeOffices as getPracticeOfficesAction,
  findPracticeOffices,
} from '@sdog/store/user'
import { postNewJob as postNewJobAction, findCreateJob } from '@sdog/store/jobs'

import { useJobPostForm } from '../useJobPostForm'
import appTheme from '../../app/theme.css'
import JobPostForm from '../edit/Form'

import theme from './theme.css'

const JobPostings = ({ history, getPracticeOffices, offices, create, postNewJob }) => {
  useDocumentTitle('Job Postings')
  useEffect(() => void getPracticeOffices(), [])

  const { form, setFormValue, clearCache, getFormProps, date } = useJobPostForm(
    null,
    offices.results,
  )

  const onSubmit = (e, status = 'draft') => {
    e.preventDefault()

    console.log({ form })

    postNewJob(
      {
        ...form,
        status,
        available_date: get(form, 'criteria.duration.start_date', date),
        criteria: {
          ...form.criteria,
          hourly_rate:
            'salary' === get(form, 'meta.salary_type', false)
              ? parseInt(get(form, 'criteria.hourly_rate', 0), 10) / 52 / 40
              : get(form, 'criteria.hourly_rate', 0),
        },
      },
      {
        success: () => {
          clearCache()
          history.push(`/job-postings`)
        },
      },
    )
  }

  if (!form.criteria.employment_type) {
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

          <Button
            onClick={() => setFormValue('criteria.employment_type', 'temporary')}
            size="medium"
          >
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

          <Button
            onClick={() => setFormValue('criteria.employment_type', 'full_time')}
            size="medium"
          >
            I want this option
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className={clsx(appTheme.pageContent, theme.container, theme.new)}>
      <Card type="large">
        <JobPostForm onSubmit={onSubmit} {...getFormProps()} />

        {create.error && (
          <Alert inline error={create.error}>
            {create.error}
          </Alert>
        )}
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
  history: shape({ push: func.isRequired }).isRequired,
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
