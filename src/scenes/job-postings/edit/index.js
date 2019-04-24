import React, { useEffect } from 'react'
import { shape, arrayOf, oneOfType, bool, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import get from '@sdog/utils/get'
import clsx from 'clsx'
import { useDocumentTitle } from '@sdog/utils/document'
import {
  getPracticeOffices as getPracticeOfficesAction,
  findPracticeOffices,
} from '@sdog/store/user'
import {
  findSingleJob,
  findSingleJobLoading,
  findSingleJobError,
  findUpdateJob,
  getSingleJob as getSingleJobAction,
  updateJobPost as updateJobPostAction,
} from '@sdog/store/jobs'
import appTheme from '@sdog/scenes/app/theme.css'
import Card from '@sdog/components/card'
import Spinner from '@sdog/components/spinner'
import Alert from '@sdog/components/alert'

import { useJobPostForm } from '../useJobPostForm'
import theme from '../new/theme.css'

import JobPostForm from './Form'

const JobPostingEdit = ({
  match,
  job,
  jobLoading,
  getPracticeOffices,
  offices,
  getSingleJob,
  updateJobPost,
  update,
}) => {
  useDocumentTitle(`Edit Job ${job.title || ''}`, [job.id])

  useEffect(() => void getPracticeOffices(), [])
  useEffect(() => void getSingleJob(match.params.id), [match.params.id])

  const { form, getFormProps, clearCache } = useJobPostForm(
    job,
    offices.results,
    'edit',
    [get(job, 'id', false)],
  )

  const onSubmit = e => {
    e.preventDefault()

    updateJobPost(form, { success: () => clearCache() })
  }

  return (
    <div className={clsx(appTheme.pageContent, theme.container, theme.new)}>
      <Card type="large">
        {jobLoading ? (
          <Spinner />
        ) : (
          <JobPostForm loading={update.loading} onSubmit={onSubmit} {...getFormProps()} />
        )}

        {update.error && (
          <Alert inline error={update.error}>
            {update.error}
          </Alert>
        )}
      </Card>
    </div>
  )
}

JobPostingEdit.propTypes = {
  match: shape({ params: shape({ id: string }) }),
  job: shape({ id: string }).isRequired,
  jobLoading: bool.isRequired,
  jobError: oneOfType([bool, string]),
  getPracticeOffices: func.isRequired,
  getSingleJob: func.isRequired,
  offices: shape({
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
    results: arrayOf(shape({ id: string })),
  }).isRequired,
  updateJobPost: func.isRequired,
  update: shape({
    jobId: oneOfType([bool, string]).isRequired,
    loading: bool.isRequired,
    error: oneOfType([bool, string]),
  }),
}

export const mapStateToProps = state => ({
  job: findSingleJob(state),
  jobLoading: findSingleJobLoading(state),
  jobError: findSingleJobError(state),
  offices: findPracticeOffices(state),
  update: findUpdateJob(state),
})

export const mapActionsToProps = {
  getPracticeOffices: getPracticeOfficesAction,
  getSingleJob: getSingleJobAction,
  updateJobPost: updateJobPostAction,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(JobPostingEdit),
)
