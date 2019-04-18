import React, { useState, useEffect } from 'react'
import { func, bool, string, oneOfType, shape, array } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@sdog/utils/document'
import get from 'lodash/get'
import clsx from 'clsx'
import Card from '@sdog/components/card'
import Filter from '@sdog/components/filter'
import Button from '@sdog/components/button'
import Spinner from '@sdog/components/spinner'
import Chevron from '@sdog/components/svg/Chevron'
import { defineJob } from '@sdog/definitions/jobs'
import {
  findJobs,
  findJobsError,
  findJobsLoading,
  getUserJobs as getUserJobsAction,
} from '@sdog/store/jobs'

import appTheme from '../../app/theme.css'

import theme from './theme.css'

const JobPostings = ({ getUserJobs, jobs, loading }) => {
  useDocumentTitle('Job Postings')
  const [filter, setFilter] = useState({ label: 'Active', value: 'Active' })

  useEffect(() => void getUserJobs(), [])

  const filterOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ]

  return (
    <div className={clsx(appTheme.pageContent, theme.container)}>
      <header className={theme.pageActions}>
        <Filter
          onChange={value => setFilter(value)}
          value={filter}
          options={filterOptions}
        />
        <Link to="/job-postings/create">
          <Button>Post New Job</Button>
        </Link>
      </header>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className={theme.jobs}>
          {jobs && jobs.posts && jobs.posts.length ? (
            jobs.posts.map(job => (
              <Card key={`job-posting-${job.id}`} type="large">
                <Link
                  to={`/search/job/${job.slug}`}
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
                    <dd>
                      {get(job, 'criteria.experience_min', 0)}-
                      {get(job, 'criteria.experience_preferred', 0)} years
                    </dd>
                  </dl>
                </div>
                <div className={theme.edit}>
                  <Link to={`/job-postings/${job.id}/edit`}>
                    <Button secondary>Edit Post</Button>
                  </Link>
                </div>
                <div className={theme.actions}>
                  <div className={theme.info}>
                    <div>{defineJob('type', get(job, 'criteria.employment_type'))}</div>
                    <div>-</div>
                    <div>{defineJob('position', get(job, 'criteria.position'))}</div>
                    <div className={theme.at}>@</div>
                    <div>
                      {get(job, 'criteria.hourly_rate')}{' '}
                      {'salary' === get(job, 'meta.salary_type', false) ? 'yearly' : 'hr'}
                    </div>
                  </div>
                  <div className={theme.applicants}>
                    <Link to={`/job-postings/${job.id}`}>
                      <span className={theme.blue}>{job.applicantsNumber || 0}</span>{' '}
                      Applicants
                      <span className={theme.chevron}>
                        <Chevron />
                      </span>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <h4>
              No job postings. <Link to="/job-postings/create">Create one now!</Link>
            </h4>
          )}
        </div>
      )}
    </div>
  )
}

JobPostings.propTypes = {
  jobs: shape({ posts: array }).isRequired,
  loading: bool.isRequired,
  error: oneOfType([bool, string]),
  getUserJobs: func.isRequired,
}

export const mapStateToProps = state => ({
  jobs: findJobs(state),
  loading: findJobsLoading(state),
  error: findJobsError(state),
})

export const mapActionsToProps = { getUserJobs: getUserJobsAction }

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(JobPostings)
