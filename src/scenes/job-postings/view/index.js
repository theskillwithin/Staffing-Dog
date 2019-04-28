import React, { useEffect } from 'react'
import { array, bool, shape, string, oneOfType, func, arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import get from 'lodash/get'
import clsx from 'clsx'

import { useDocumentTitle } from '@sdog/utils/document'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'
import Spinner from '@sdog/components/spinner'
import { defineJob } from '@sdog/definitions/jobs'
import {
  findSingleJob,
  findSingleJobLoading,
  findSingleJobError,
  findUpdateJob,
  getSingleJob as getSingleJobAction,
  updateJobPost as updateJobPostAction,
  findJobApplicants,
  getJobApplicants as getJobApplicantsAction,
  findJobSelectedApplicants,
  getJobSelectedApplicants as getJobSelectedApplicantsAction,
  findSelectingUserForJob,
  addUserToJob as addUserToJobAction,
} from '@sdog/store/jobs'
import {
  getPracticeOffices as getPracticeOfficesAction,
  findPracticeOffices,
} from '@sdog/store/user'
import {
  getProfessionals as getProfessionalsAction,
  findState as findProfessionalsState,
} from '@sdog/store/professionals'

import appTheme from '../../app/theme.css'

import JobApplicants from './Applicants'
import theme from './theme.css'

const JobPostingsView = ({
  match,
  location,
  history,
  job,
  jobLoading,
  update,
  getSingleJob,
  updateJobPost,
  getPracticeOffices,
}) => {
  useDocumentTitle('View Job Posting')
  useEffect(() => void getPracticeOffices(), [])
  useEffect(
    () => {
      if (match.params.id) {
        getSingleJob(match.params.id)
      }
    },
    [match.params.id],
  )

  const onClickDeleteJob = e => {
    e.preventDefault()

    updateJobPost({ ...job, status: 'deleted' })
  }

  const jobStatus = get(job, 'status', false)
  const isOpen = 'open' === jobStatus
  const isDraft = 'draft' === jobStatus

  return (
    <div className={clsx(appTheme.pageContent, theme.container)}>
      {jobLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <div className={theme.job}>
            <Card key={`job-posting-${job.id}`} type="large">
              <Link
                to={`${match.url}/view/${job.id}`}
                className={clsx(theme.title, job.new && theme.new)}
              >
                {get(job, 'criteria.title', 'Job')}
              </Link>

              <div className={clsx(theme.status, theme[job.status])}>{job.status}</div>

              <div className={theme.location}>
                <strong>{get(job, 'criteria.practice_details.name', 'Office')}</strong>
                <span>
                  {get(job, 'criteria.practice_details.address.city', 'city')},{' '}
                  {get(job, 'criteria.practice_details.address.state', 'state')}
                </span>
              </div>

              <div className={theme.short}>{get(job, 'criteria.description')}</div>

              <div className={theme.details}>
                <dl>
                  <dt>Experience</dt>
                  <dd>{get(job, 'criteria.experience_preferred')}</dd>
                </dl>
              </div>

              <div className={theme.edit}>
                {(isDraft || isOpen) && (
                  <Button red onClick={onClickDeleteJob}>
                    Delete Post{' '}
                    {update.loading && <Spinner inverted size={20} center={false} />}
                  </Button>
                )}

                {isDraft && (
                  <Link to={`/job-postings/edit/${job.id}`}>
                    <Button secondary>Edit Post</Button>
                  </Link>
                )}
              </div>

              <div className={theme.actions}>
                <div className={theme.info}>
                  <div>{defineJob('type', get(job, 'criteria.employment_type'))}</div>
                  <div>-</div>
                  <div>{defineJob('position', get(job, 'criteria.position'))}</div>
                  <div className={theme.at}>@</div>
                  <div>{get(job, 'criteria.hourly_rate')} hr</div>
                </div>
              </div>
            </Card>
          </div>

          <JobApplicants job={job} location={location} history={history} />
        </div>
      )}
    </div>
  )
}

JobPostingsView.propTypes = {
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
  getJobApplicants: func.isRequired,
  getJobSelectedApplicants: func.isRequired,
  jobApplicants: object.isRequired,
  jobSelectedApplicants: object.isRequired,
  professionals: shape({
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
    results: array.isRequired,
  }),
  getProfessionals: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired, search: string.isRequired }),
  selectingUserForJob: object.isRequired,
  addUserToJob: func.isRequired,
}

export const mapStateToProps = state => ({
  job: findSingleJob(state),
  jobLoading: findSingleJobLoading(state),
  jobError: findSingleJobError(state),
  offices: findPracticeOffices(state),
  update: findUpdateJob(state),
  jobApplicants: findJobApplicants(state),
  jobSelectedApplicants: findJobSelectedApplicants(state),
  professionals: findProfessionalsState(state),
  selectingUserForJob: findSelectingUserForJob(state),
})

export const mapActionsToProps = {
  getPracticeOffices: getPracticeOfficesAction,
  getSingleJob: getSingleJobAction,
  updateJobPost: updateJobPostAction,
  getJobApplicants: getJobApplicantsAction,
  getJobSelectedApplicants: getJobSelectedApplicantsAction,
  getProfessionals: getProfessionalsAction,
  addUserToJob: addUserToJobAction,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(JobPostingsView),
)
