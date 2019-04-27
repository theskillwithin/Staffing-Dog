import React, { useEffect } from 'react'
import { shape, func, string, oneOfType, array, bool } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import clsx from 'clsx'
import find from 'lodash/find'

import { setTitle } from '@sdog/utils/document'
import { useFilterQueryParams, useNonEmptyParams } from '@sdog/utils/queryParams'
import ProfessionalCard from '@sdog/components/professional_card'
import Spinner from '@sdog/components/spinner'
import Filter from '@sdog/components/filter'
import Alert from '@sdog/components/alert'
import LocationOnIcon from '@sdog/components/svg/Location'
import {
  jobTypes,
  positions,
  distance,
  getPositionTypesByPosition,
} from '@sdog/definitions/jobs'
import {
  getProfessionals as getProfessionalsAction,
  findState,
} from '@sdog/store/professionals'

import appTheme from '../app/theme.css'

import theme from './theme.css'

const ProfessionalsView = ({ history, location, professionals, getProfessionals }) => {
  useEffect(() => void setTitle('Job Postings'), [])

  const [filters, setFilters] = useFilterQueryParams(location.search)
  const handleFilterChange = (field, value) => setFilters({ ...filters, [field]: value })

  useEffect(() => {
    const filteredFilters = useNonEmptyParams(filters)

    if (Object.keys(filteredFilters).length) {
      history.push(`${location.pathname}?${qs.stringify(filteredFilters)}`)
    }

    getProfessionals({
      criteria: { ...filteredFilters },
    })
  }, Object.keys(filters).map(filter => filters[filter]))

  return (
    <div className={clsx(appTheme.pageContent, theme.container)}>
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

      {professionals.loading ? (
        <Spinner />
      ) : (
        <>
          <div className={theme.professionalResultsMeta}>
            <p className={theme.cityMeta}>
              <LocationOnIcon />
              Salt Lake City, UT
            </p>
            <p>
              <strong>{professionals.results.length}</strong>
              &nbsp;{' '}
              {`Professional${
                professionals.results.length === 1 ? ' was' : 's were'
              } found.`}
            </p>
          </div>
          <div className={theme.professionals}>
            {professionals.error && (
              <Alert inline error>
                {professionals.error}
              </Alert>
            )}

            {!professionals.results.length ? (
              <p>No Professionals were found. Try adjusting your filters above.</p>
            ) : (
              professionals.results.map(applicant => (
                <ProfessionalCard
                  key={`applicant-card-${applicant.id}`}
                  applicant={applicant}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

ProfessionalsView.propTypes = {
  professionals: shape({
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
    results: array.isRequired,
  }).isRequired,
  getProfessionals: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired, search: string.isRequired }),
}

export const mapStateToProps = state => ({
  professionals: findState(state),
})

export const mapActionsToProps = { getProfessionals: getProfessionalsAction }

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(ProfessionalsView),
)
