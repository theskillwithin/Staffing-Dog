import React, { useState, useEffect } from 'react'
import { bool, shape, string, oneOfType, func, arrayOf, object } from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import get from 'lodash/get'
import find from 'lodash/find'
import clsx from 'clsx'
import { useDocumentTitle } from '@sdog/utils/document'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'
import Spinner from '@sdog/components/spinner'
import Filter from '@sdog/components/filter'
import Tabs from '@sdog/components/tab_bar'
import SVG from '@sdog/components/svg'
import Alert from '@sdog/components/alert'
import StarTitle from '@sdog/components/star_title'
import {
  defineJob,
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
  getJobApplicants as getJobApplicantsActions,
} from '@sdog/store/jobs'
import {
  getPracticeOffices as getPracticeOfficesAction,
  findPracticeOffices,
} from '@sdog/store/user'

import ProfessionalCard from '../professional'
import appTheme from '../../app/theme.css'

import theme from './theme.css'

const JobPostingsView = ({
  match,
  job,
  jobLoading,
  update,
  getSingleJob,
  updateJobPost,
  getPracticeOffices,
  jobApplicants,
  getJobApplicants,
}) => {
  useDocumentTitle('View Job Posting')
  useEffect(() => void getPracticeOffices(), [])
  useEffect(
    () => {
      getSingleJob(match.params.id)
      getJobApplicants(match.params.id)
    },
    [match.params.id],
  )

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const [filters, setFilters] = useState({
    jobType: null,
    jobSpecialty: null,
    specialtyTypes: null,
    radius: null,
  })

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const onClickDeleteJob = e => {
    e.preventDefault()

    updateJobPost({
      ...job,
      status: 'deleted',
    })
  }

  const jobStatus = get(job, 'status', false)
  const isOpen = 'open' === jobStatus
  const isDraft = 'draft' === jobStatus

  const applicants = get(jobApplicants, job.id, {})
  const listOfApplicants = get(applicants, 'results', [])
  const listOfApplicantsLoading = get(applicants, 'loading', false)
  const listOfApplicantsError = get(applicants, 'error', false)

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

          <div className={theme.search}>
            <Card type="large">
              <div className={theme.searchInner}>
                <h2>Searching for Day Hire...</h2>
                <SVG name="desktop_search" className={theme.desktopSearchSVG} />

                {get(listOfApplicants, '[0].id', false) && (
                  <>
                    <StarTitle title="Congradulations Day Hire Found" />
                    <ProfessionalCard
                      applicant={listOfApplicants[0]}
                      className={theme.first}
                    />
                  </>
                )}
              </div>
            </Card>
          </div>

          <div className={theme.applicants}>
            <Card type="large">
              <h2>Applicants</h2>

              {listOfApplicantsError && (
                <Alert error inline>
                  {listOfApplicantsError}
                </Alert>
              )}
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
                  {listOfApplicantsLoading ? (
                    <Spinner />
                  ) : (
                    listOfApplicants.map((applicant, index) => (
                      <ProfessionalCard
                        key={`applicant-selected-card-${applicant.id}`}
                        applicant={applicant}
                        shortCard
                        className={index === 0 && theme.first}
                      />
                    ))
                  )}
                </div>
              )}
              {activeTabIndex === 1 && (
                <div className={theme.applicantTab}>
                  {listOfApplicantsLoading ? (
                    <Spinner />
                  ) : (
                    listOfApplicants.map((applicant, index) => (
                      <ProfessionalCard
                        key={`applicant-applied-card-${applicant.id}`}
                        applicant={applicant}
                        shortCard
                        className={index === 0 && theme.first}
                      />
                    ))
                  )}
                </div>
              )}
              {activeTabIndex === 2 && (
                <div className={theme.applicantTab}>
                  <div className={theme.filters}>
                    <Filter
                      onChange={value =>
                        handleFilterChange('employment_type', value.value)
                      }
                      value={find(
                        jobTypes,
                        ({ value }) => value === filters.employment_type,
                      )}
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
                    listOfApplicants.map(applicant => (
                      <ProfessionalCard
                        key={`applicant-search-card-${applicant.id}`}
                        applicant={applicant}
                      />
                    ))
                  )}
                </div>
              )}
              <div className={theme.bottom}>
                <div>
                  <span>4</span> Selected
                </div>
                <div>
                  <span>124</span> Applied
                </div>
              </div>
            </Card>
          </div>
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
  jobApplicants: object.isRequired,
  // (
  //   shape({
  //     loading: bool,
  //     error: oneOfType([bool, string]),
  //     results: arrayOf(
  //       shape({
  //         applicant_details: shape({ id: string }),
  //         id: string,
  //         status: string,
  //       }),
  //     ),
  //   }),
  // ).isRequired,
}

export const mapStateToProps = state => ({
  job: findSingleJob(state),
  jobLoading: findSingleJobLoading(state),
  jobError: findSingleJobError(state),
  offices: findPracticeOffices(state),
  update: findUpdateJob(state),
  jobApplicants: findJobApplicants(state),
})

export const mapActionsToProps = {
  getPracticeOffices: getPracticeOfficesAction,
  getSingleJob: getSingleJobAction,
  updateJobPost: updateJobPostAction,
  getJobApplicants: getJobApplicantsActions,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(JobPostingsView),
)
