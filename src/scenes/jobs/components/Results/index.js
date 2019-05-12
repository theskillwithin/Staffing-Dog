import React, { useEffect } from 'react'
import { shape, object, string, array, func, oneOfType, bool } from 'prop-types'
import qs from 'qs'
import find from 'lodash/find'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import clsx from 'clsx'

import { useFilterQueryParams, useNonEmptyParams } from '@sdog/utils/queryParams'
import get from '@sdog/utils/get'
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
import FilterDropdown from '@sdog/components/filter'
import Spinner from '@sdog/components/spinner'
import LocationOnIcon from '@sdog/components/svg/Location'
import {
  defineJob,
  jobTypes,
  // positions,
  distance,
  // getPositionTypesByPosition,
} from '@sdog/definitions/jobs'

import appTheme from '../../../app/theme.css'

import JobCard from './Card'

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
  const [filters, setFilters] = useFilterQueryParams(location.search, [
    'employment_type',
    'radius',
  ])

  const handleFilterChange = (field, value) => setFilters({ ...filters, [field]: value })

  useEffect(() => {
    const filteredFilters = useNonEmptyParams(filters)
    if (Object.keys(filteredFilters).length) {
      history.push(`${location.pathname}?${qs.stringify(filteredFilters)}`)
    } else {
      history.push(`${location.pathname}`)
    }

    // call api
    getUserJobs({ search: filters })
  }, Object.keys(filters).map(f => filters[f]))

  // const showRecommended = Boolean(jobs.recommended.length)

  const getJobs = () => {
    if (jobs.preferred.length) {
      return jobs.preferred || []
    }
    // if (jobs.posts.length) {
    //   return jobs.posts || []
    // }

    // if (showRecommended) {
    //   return jobs.recommended || []
    // }

    return []
  }

  return (
    <div className={clsx(appTheme.pageContent, theme.pageContent)}>
      <header className={theme.searchFilters}>
        <FilterDropdown
          onChange={value => handleFilterChange('employment_type', value.value)}
          value={find(jobTypes, ({ value }) => value === filters.employment_type)}
          options={jobTypes}
          placeholder="All Job Types"
          className={theme.jobType}
        />
        {/* <Filter
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
        /> */}
        <FilterDropdown
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
                <strong>{jobs.preferred.length}</strong>
                {` job post${jobs.preferred.length === 1 ? '' : 's'} in your area.`}
              </p>
            </div>

            <div>
              {getJobs().length || jobs.posts.length ? (
                <div className={theme.searchResultsList}>
                  {/* {showRecommended && (
                    <Alert>
                      We could not find any jobs that matched perfectly with your search
                      requirements. Below are some recommended jobs you might consider.
                    </Alert>
                  )} */}

                  {getJobs().map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      applyingForJobs={applyingForJobs}
                      applyForJob={applyForJob}
                      match={match}
                      defineJob={defineJob}
                    />
                  ))}

                  {jobs.posts && jobs.posts.length && (
                    <>
                      <h3>non preffered jobs</h3>
                      {jobs.posts.map(job => (
                        <JobCard
                          key={job.id}
                          job={job}
                          applyingForJobs={applyingForJobs}
                          applyForJob={applyForJob}
                          match={match}
                          defineJob={defineJob}
                        />
                      ))}
                    </>
                  )}
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
