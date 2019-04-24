import React, { useState, useEffect } from 'react'
import { shape, object, string, array, func, oneOfType, bool } from 'prop-types'
import qs from 'qs'
import find from 'lodash/find'
import get from '@sdog/utils/get'
import { useQueryParamsOnlyWith, useNonEmptyParams } from '@sdog/utils/queryParams'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import clsx from 'clsx'
import {
  getUserJobs as getUserJobsAction,
  findJobs,
  findJobsLoading,
  findJobsError,
  findApplyingForJob,
  applyForJob as applyForJobAction,
} from '@sdog/store/jobs'
import { findUserProfile } from '@sdog/store/user'
import { useDocumentTitle } from '@sdog/utils/document'
import Card from '@sdog/components/card'
import Filter from '@sdog/components/filter'
import Button from '@sdog/components/button'
import Alert from '@sdog/components/alert'
import Spinner from '@sdog/components/spinner'
// import Star from '@sdog/components/svg/FavStar'
import LocationOnIcon from '@sdog/components/svg/Location'
import {
  defineJob,
  jobTypes,
  positions,
  distance,
  getPositionTypesByPosition,
} from '@sdog/definitions/jobs'

import appTheme from '../../../app/theme.css'

import theme from './theme.css'

const JobSearch = ({
  match,
  location,
  history,
  jobs,
  loading,
  getUserJobs,
  userProfile,
  applyingForJobs,
  applyForJob,
}) => {
  useDocumentTitle('Job Search')

  const searchParams = useQueryParamsOnlyWith(location.search, [
    'employment_type',
    'specialty',
    'job_type',
    'radius',
  ])

  const [filters, setFilters] = useState({
    employment_type: null,
    specialty: null,
    job_type: null,
    radius: null,
    ...searchParams,
  })

  const handleFilterChange = (field, value) => setFilters({ ...filters, [field]: value })

  useEffect(() => {
    const filteredFilters = useNonEmptyParams(filters)
    if (Object.keys(filteredFilters).length) {
      history.push(`${location.pathname}?${qs.stringify(filteredFilters)}`)
    }

    // call api
    getUserJobs({ search: filteredFilters })
  }, Object.keys(filters).map(filter => filters[filter]))

  const onClickApplyForJob = (e, jobId) => {
    e.preventDefault()

    applyForJob(jobId)
  }

  const showRecommended = Boolean(jobs.recommended.length)

  const getJobs = () => {
    if (showRecommended) {
      return jobs.recommended || []
    }

    if (jobs.preferred.length) {
      return jobs.preferred || []
    }

    return []
  }

  return (
    <div className={clsx(appTheme.pageContent, theme.pageContent)}>
      <header className={theme.searchFilters}>
        <Filter
          onChange={value => handleFilterChange('employment_type', value.value)}
          value={find(jobTypes, ({ value }) => value === filters.employment_type)}
          options={jobTypes}
          placeholder="All Job Types"
          className={theme.jobType}
        />
        <Filter
          onChange={value => handleFilterChange('job_type', value.value)}
          value={find(positions, ({ value }) => value === filters.job_type)}
          options={positions}
          placeholder="All Job Positions"
          className={theme.jobSpecialty}
        />
        <Filter
          onChange={value => handleFilterChange('specialty', value.value)}
          value={find(
            getPositionTypesByPosition(filters.position),
            ({ value }) => value === filters.specialty,
          )}
          options={getPositionTypesByPosition(filters.position)}
          placeholder="All Speciality Types"
          className={theme.specialtyTypes}
        />
        <Filter
          onChange={value => handleFilterChange('radius', value.value)}
          value={find(distance, ({ value }) => value === filters.radius)}
          options={distance}
          placeholder="Any Distance"
          className={theme.distance}
        />
      </header>

      <div className={theme.searchResults}>
        {!getJobs().length && loading ? (
          <Spinner />
        ) : (
          <>
            <div className={theme.searchResultsMeta}>
              <p className={theme.cityMeta}>
                <LocationOnIcon />
                {`${get(userProfile, 'addresses.city', 'unkown')}, ${get(
                  userProfile,
                  'addresses.state',
                  'N/A',
                )}`}
              </p>
              <p>
                <strong>{getJobs().length}</strong>
                {` job post${getJobs().length === 1 ? '' : 's'} in your area.`}
              </p>
            </div>

            <div>
              {getJobs().length ? (
                <div className={theme.searchResultsList}>
                  {showRecommended && (
                    <Alert>
                      We could not find any jobs that matched perfectly with your search
                      requirements. Below are some recommended jobs you might consider.
                    </Alert>
                  )}

                  {getJobs().map(job => (
                    <Card key={job.id} type="large">
                      <Link
                        to={`${match.url}/view/${job.id}`}
                        className={clsx(theme.title, job.new && theme.new)}
                      >
                        {get(job, 'criteria.title', 'Job')}
                      </Link>
                      {/* <div className={clsx(theme.star, job.star && theme.active)}>
                        <button onClick={() => this.toggleFav(job.id)} type="button">
                          <Star active={job.star} />
                        </button>
                      </div> */}
                      <div className={theme.location}>
                        <span>
                          {get(job, 'criteria.practice_details.address.city', 'city')},{' '}
                        </span>
                        <span>
                          {get(job, 'criteria.practice_details.address.state', 'state')}
                        </span>
                        <span>
                          {get(
                            job,
                            'criteria.practice_details.origin_distance',
                            'unkown',
                          )}{' '}
                          miles away
                        </span>
                      </div>
                      <div className={theme.details}>
                        <dl>
                          <dt>Position</dt>
                          <dd>{defineJob('position', get(job, 'criteria.position'))}</dd>
                          <dt>Experience</dt>
                          <dd>{get(job, 'criteria.experience_preferred')}</dd>
                          <dt>Job Type</dt>
                          <dd>
                            {defineJob('type', get(job, 'criteria.employment_type'))}
                          </dd>
                        </dl>
                      </div>

                      <div className={theme.short}>
                        {get(job, 'criteria.description')}
                      </div>

                      <div className={theme.actions}>
                        <div>{get(job, 'criteria.hourly_rate')}/hr</div>

                        <Link
                          to={`${match.url}/view/${job.id}`}
                          className={theme.readMore}
                        >
                          Read More
                        </Link>

                        <Button
                          round
                          secondary={job.applied}
                          disabled={
                            job.applied ||
                            get(applyingForJobs, `[${job.id}].loading`, false)
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
                            'Quick Apply'
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className={theme.empty}>
                  <h2>No Jobs were found. Please try changing your filters.</h2>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

JobSearch.propTypes = {
  location: shape({
    pathname: string,
    search: string.isRequired,
  }).isRequired,
  match: shape({ url: string.isRequired }).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
  jobs: shape({
    applied: array,
    recommended: array,
    scheduled: array,
    posts: array,
    preferred: array,
  }).isRequired,
  getUserJobs: func.isRequired,
  loading: bool.isRequired,
  error: oneOfType([bool, string]).isRequired,
  userProfile: object.isRequired,
  applyForJob: func.isRequired,
  applyingForJobs: object.isRequired,
}

export const mapStateToProps = state => ({
  jobs: findJobs(state),
  loading: findJobsLoading(state),
  error: findJobsError(state),
  userProfile: findUserProfile(state),
  applyingForJobs: findApplyingForJob(state),
})

export const mapActionsToProps = {
  applyForJob: applyForJobAction,
  getUserJobs: getUserJobsAction,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(JobSearch),
)
