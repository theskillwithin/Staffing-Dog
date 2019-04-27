import React, { useEffect } from 'react'
import { bool, string, object, oneOfType, shape, func } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import get from 'lodash/get'
import clsx from 'clsx'

import Button from '@sdog/components/button'
import LocationOnIcon from '@sdog/components/svg/Location'
import Spinner from '@sdog/components/spinner'
import Avatar from '@sdog/components/Avatar'
import {
  getSingleJob as getSingleJobAction,
  findSingleJob,
  findSingleJobLoading,
  findSingleJobError,
  findApplyingForJob,
  applyForJob as applyForJobAction,
} from '@sdog/store/jobs'
import { defineJob } from '@sdog/definitions/jobs'

import appTheme from '../../../app/theme.css'

import theme from './theme.css'

const ViewJob = ({
  getSingleJob,
  applyForJob,
  applyingForJobs,
  match,
  job,
  loading,
  error,
}) => {
  useEffect(() => void getSingleJob(match.params.id), [match.params.id])

  const onClickApplyForJob = (e, jobId) => {
    e.preventDefault()

    applyForJob(jobId)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <article className={theme.container}>
      <div className={clsx(appTheme.pageContent, theme.pageContent)}>
        {error ? (
          <p>{error || 'Could not find job'}</p>
        ) : (
          <>
            <section className={theme.title}>
              <div className={theme.avatar} />
              <Avatar
                url={get(job, 'criteria.practice_details.profile_image_url')}
                size="128"
                alt="Avatar"
              />

              <div className={theme.titles}>
                <h2>{get(job, 'criteria.title')}</h2>
                <h4>{get(job, 'criteria.practice_details.name')}</h4>
              </div>
            </section>

            <section>
              <p>{get(job, 'criteria.description')}</p>

              <div className={theme.location}>
                <LocationOnIcon />

                <strong>
                  {get(job, 'criteria.practice_details.address.city')},{' '}
                  {get(job, 'criteria.practice_details.address.state')}
                </strong>
              </div>

              <div className={theme.details}>
                <dl>
                  <dt>Job Type</dt>
                  <dd>{defineJob('type', get(job, 'criteria.employment_type'))}</dd>
                  <dt>Position</dt>
                  <dd>{defineJob('position', get(job, 'criteria.position'))}</dd>
                  <dt>Rate</dt>
                  <dd>${get(job, 'criteria.hourly_rate')} hr</dd>
                  <dt>Experience</dt>
                  <dd>
                    {get(job, 'criteria.experience_min', 0)}-
                    {get(job, 'criteria.experience_preferred', 1)} Years
                  </dd>
                </dl>
              </div>

              <div className={theme.apply}>
                <Button
                  round
                  secondary={job.applied}
                  disabled={
                    job.applied || get(applyingForJobs, `[${job.id}].loading`, false)
                  }
                  onClick={e => onClickApplyForJob(e, job.id)}
                >
                  {get(applyingForJobs, `[${job.id}].loading`, false) ? (
                    <span>
                      Applying <Spinner inverted size={20} center={false} />
                    </span>
                  ) : get(job, 'applied', false) ? (
                    'Applied'
                  ) : (
                    'Apply Now'
                  )}
                </Button>
              </div>
            </section>

            <section className={theme.details}>
              <div
                className={theme.rawDescription}
                dangerouslySetInnerHTML={{ __html: get(job, 'meta.long_description') }}
              />
            </section>
          </>
        )}
      </div>
    </article>
  )
}

ViewJob.propTypes = {
  loading: bool.isRequired,
  error: oneOfType([bool, string]).isRequired,
  job: oneOfType([bool, object]).isRequired,
  match: shape({
    params: shape({
      id: string.isRequired,
    }),
  }),
  getSingleJob: func.isRequired,
  applyForJob: func.isRequired,
  applyingForJobs: object.isRequired,
}

export const mapStateToProps = state => ({
  job: findSingleJob(state),
  loading: findSingleJobLoading(state),
  error: findSingleJobError(state),
  applyingForJobs: findApplyingForJob(state),
})

export const mapActionsToProps = {
  getSingleJob: getSingleJobAction,
  applyForJob: applyForJobAction,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(ViewJob),
)
