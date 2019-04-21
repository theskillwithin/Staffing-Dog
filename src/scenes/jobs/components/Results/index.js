import React, { useState, useEffect } from 'react'
import { shape, string, array, func, oneOfType, bool } from 'prop-types'
import qs from 'qs'
import find from 'lodash/find'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import clsx from 'clsx'
import {
  getUserJobs as getUserJobsAction,
  findJobs,
  findJobsLoading,
  findJobsError,
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

const JobSearch = ({ location, history, jobs, loading, getUserJobs, userProfile }) => {
  useDocumentTitle('Job Search')

  const searchParams = pickBy(
    qs.parse((location.search || '').substr(1)),
    (_value, key) =>
      includes(key, ['employment_type', 'specialty', 'job_type', 'radius']),
  )

  const [filters, setFilters] = useState({
    employment_type: null,
    specialty: null,
    job_type: null,
    radius: null,
    ...searchParams,
  })

  const handleFilterChange = (field, value) => setFilters({ ...filters, [field]: value })

  useEffect(() => {
    const filteredFilters = pickBy(filters, value => value !== null && value !== '')
    if (Object.keys(filteredFilters).length) {
      history.push(`${location.pathname}?${qs.stringify(filteredFilters)}`)
    }

    // call api
    getUserJobs({ search: filteredFilters })
  }, Object.keys(filters).map(filter => filters[filter]))

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
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={theme.searchResultsMeta}>
              <p className={theme.cityMeta}>
                <LocationOnIcon />
                {`${get(userProfile, 'address.city')}, ${get(
                  userProfile,
                  'address.state',
                )}`}
              </p>
              <p>
                <strong>{get(jobs, 'recommended.length', 0)}</strong>
                &nbsp; job posts in your area.
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
                        to={`/search/job/${job.slug}`}
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
                        <Link to={`/search/job/${job.id}`} className={theme.readMore}>
                          Read More
                        </Link>
                        <Button round secondary={job.applied} disabled={job.applied}>
                          {job.applied ? 'Applied' : 'Quick Apply'}
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
}

export const mapStateToProps = state => ({
  jobs: findJobs(state),
  loading: findJobsLoading(state),
  error: findJobsError(state),
  userProfile: findUserProfile(state),
})

export const mapActionsToProps = { getUserJobs: getUserJobsAction }

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(JobSearch),
)
