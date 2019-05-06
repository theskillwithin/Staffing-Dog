import React, { useState, useEffect } from 'react'
import { array, bool, shape, string, oneOfType, func, arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import find from 'lodash/find'
import qs from 'qs'

import get from '@sdog/utils/get'
import { useFilterQueryParams, useNonEmptyParams } from '@sdog/utils/queryParams'
import {
  positions,
  jobTypes,
  getPositionTypesByPosition,
  distance,
} from '@sdog/definitions/jobs'
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
import Filter from '@sdog/components/filter'
import Tabs from '@sdog/components/tab_bar'
import SVG from '@sdog/components/svg'
import Alert from '@sdog/components/alert'
import StarTitle from '@sdog/components/star_title'
import Card from '@sdog/components/card'
import Spinner from '@sdog/components/spinner'

import ProfessionalCard from '../professional'

import theme from './theme.css'

const tabCache = {}

const JobApplicantsView = ({
  job,
  jobApplicants,
  jobSelectedApplicants,
  getProfessionals,
  getJobApplicants,
  professionals,
  addUserToJob,
  selectingUserForJob,
  location,
  history,
  getJobSelectedApplicants,
}) => {
  useEffect(
    () => {
      if (job.id) {
        getJobApplicants(job.id)
      }
    },
    [job.id],
  )

  const preferredApplicants = get(job, 'misc.preferred_applicants', [])

  useEffect(
    () => {
      if (job.id && preferredApplicants.length) {
        getJobSelectedApplicants(job.id, preferredApplicants)
      }
    },
    [job.id, preferredApplicants],
  )

  const [activeTabIndex, setActiveTabIndex] = useState(tabCache[job.id] || 0)
  const [filters, setFilters] = useFilterQueryParams(location.search)

  useEffect(() => {
    tabCache[job.id] = activeTabIndex
  })

  useEffect(() => {
    const filteredFilters = useNonEmptyParams(filters)

    if (Object.keys(filteredFilters).length) {
      history.push(`${location.pathname}?${qs.stringify(filteredFilters)}`)
    }

    getProfessionals({
      criteria: { ...filteredFilters },
    })
  }, Object.keys(filters).map(filter => filters[filter]))

  const handleFilterChange = (field, value) => setFilters({ ...filters, [field]: value })

  const isDayHire = get(job, 'criteria.employment_type', 'temporary') === 'temporary'

  const selectedApplicants = get(jobSelectedApplicants, job.id, {})
  const listOfSelectedApplicants = get(selectedApplicants, 'results', [])
  const listOfSelectedApplicantsLoading = get(selectedApplicants, 'loading', false)
  const listOfSelectedApplicantsError = get(selectedApplicants, 'error', false)

  const applicants = get(jobApplicants, job.id, {})
  const listOfApplicants = get(applicants, 'results', [])
  const listOfApplicantsLoading = get(applicants, 'loading', false)
  const listOfApplicantsError = get(applicants, 'error', false)
  const userIsSelected = userId =>
    find(listOfSelectedApplicants, ({ id }) => id === userId)
  const userHasApplied = userId => find(listOfApplicants, ({ id }) => id === userId)

  const onClickAddUserToJob = userId => {
    if (!userIsSelected(userId) && !userHasApplied(userId)) {
      addUserToJob({ userId, jobId: job.id })
    }
  }

  const getAddUserActionText = userId => {
    if (userIsSelected(userId)) {
      return 'Pending'
    }

    if (userHasApplied(userId)) {
      return 'Applied'
    }

    if (get(selectingUserForJob, `[${job.id}][${userId}].loading`, false)) {
      return 'Offering'
    }

    return 'Offer Job'
  }

  const getAddUserActionColor = userId => {
    if (userIsSelected(userId)) {
      return 'secondary'
    }

    if (userHasApplied(userId)) {
      return 'secondary'
    }

    if (get(selectingUserForJob, `[${job.id}][${userId}].loading`, false)) {
      return 'primary'
    }

    return 'primary'
  }

  if (isDayHire) {
    return (
      <div className={theme.search}>
        <Card type="large">
          {get(listOfApplicants, '[0].id', false) ? (
            <div className={theme.searchInner}>
              <StarTitle title="Congradulations DayHire&trade; Found" />
              <ProfessionalCard applicant={listOfApplicants[0]} className={theme.first} />
            </div>
          ) : (
            <div className={theme.searchInner}>
              <h2>Searching for DayHire&trade;...</h2>
              <SVG name="desktop_search" className={theme.desktopSearchSVG} />
            </div>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className={theme.applicants}>
      <Card type="large">
        <h2>Applicants</h2>

        <Tabs
          activeTabIndex={activeTabIndex}
          onSelect={setActiveTabIndex}
          underline
          exactWidthTab
          left
          settingsTabs
          fw500
        >
          <div>Selected</div>
          <div>Applied</div>
          <div>Search</div>
        </Tabs>

        {activeTabIndex === 0 && (
          <div className={theme.applicantTab}>
            {listOfSelectedApplicantsError && (
              <Alert error inline>
                {listOfSelectedApplicantsError}
              </Alert>
            )}

            {listOfSelectedApplicantsLoading ? (
              <Spinner />
            ) : listOfSelectedApplicants.length ? (
              listOfSelectedApplicants.map((applicant, index) => (
                <ProfessionalCard
                  key={`applicant-selected-card-${applicant.id}`}
                  applicant={applicant}
                  shortCard
                  className={clsx(index === 0 && theme.first)}
                  actionText="Offered"
                  actionColor="secondary"
                />
              ))
            ) : (
              <p>No Selected Applicants.</p>
            )}
          </div>
        )}

        {activeTabIndex === 1 && (
          <div className={theme.applicantTab}>
            {listOfApplicantsError && (
              <Alert error inline>
                {listOfApplicantsError}
              </Alert>
            )}

            {listOfApplicantsLoading ? (
              <Spinner />
            ) : listOfApplicants.length ? (
              listOfApplicants.map((applicant, index) => (
                <ProfessionalCard
                  key={`applicant-applied-card-${applicant.id}`}
                  applicant={applicant.applicant_details}
                  shortCard
                  className={index === 0 && theme.first}
                  actionText="Applied"
                  actionColor="secondary"
                />
              ))
            ) : (
              <p>No Applicants have applied.</p>
            )}
          </div>
        )}

        {activeTabIndex === 2 && (
          <div className={theme.applicantTab}>
            <div className={theme.filters}>
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
                className={theme.jobPosition}
              />

              <Filter
                onChange={value => handleFilterChange('specialty', value.value)}
                value={find(
                  getPositionTypesByPosition(filters.position),
                  ({ value }) => value === filters.specialty,
                )}
                options={getPositionTypesByPosition(filters.position)}
                placeholder="All Speciality Types"
                className={theme.jobSpecialty}
              />

              <Filter
                onChange={value => handleFilterChange('radius', value.value)}
                value={find(distance, ({ value }) => value === filters.radius)}
                options={distance}
                placeholder="Any Distance"
                className={theme.jobDistance}
              />
            </div>

            {listOfApplicantsLoading ? (
              <Spinner />
            ) : (
              <>
                {professionals.error && (
                  <Alert inline error>
                    {professionals.error}
                  </Alert>
                )}

                {!professionals.results.length ? (
                  <p>No results were found. Try adjusting your filters above.</p>
                ) : (
                  professionals.results.map(applicant => (
                    <ProfessionalCard
                      key={`applicant-search-card-${applicant.id}`}
                      applicant={applicant}
                      action={onClickAddUserToJob}
                      actionText={getAddUserActionText(applicant.id)}
                      actionColor={getAddUserActionColor(applicant.id)}
                    />
                  ))
                )}
              </>
            )}
          </div>
        )}

        <div className={theme.bottom}>
          <div>
            <span>{listOfSelectedApplicants.length || 0}</span> Selected
          </div>
          <div>
            <span>{listOfApplicants.length || 0}</span> Applied
          </div>
        </div>
      </Card>
    </div>
  )
}

JobApplicantsView.propTypes = {
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

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(JobApplicantsView)
