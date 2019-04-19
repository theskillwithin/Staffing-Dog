import React, { useState, useEffect } from 'react'
import { shape, func, string, oneOfType, array, bool } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import clsx from 'clsx'
import find from 'lodash/find'
import { setTitle } from '@sdog/utils/document'
import ProfessionalCard from '@sdog/components/professional_card'
import Spinner from '@sdog/components/spinner'
import Filter from '@sdog/components/filter'
import Alert from '@sdog/components/alert'
import LocationOnIcon from '@sdog/components/svg/Location'
import { jobTypes, positions, getPositionTypesByPosition } from '@sdog/definitions/jobs'
import {
  getProfessionals as getProfessionalsAction,
  findState,
} from '@sdog/store/professionals'

import appTheme from '../app/theme.css'

import theme from './theme.css'

const ProfessionalsView = ({ history, location, professionals, getProfessionals }) => {
  useEffect(() => void setTitle('Job Postings'), [])

  const [filters, setFilters] = useState({
    employment_type: null,
    specialty: null,
    job_type: null,
    radius: null,
    ...qs.parse((location.search || '').substr(1)),
  })

  const distanceOptions = [
    { label: 'Within 5 miles', value: '5' },
    { label: 'Within 10 miles', value: '10' },
    { label: 'Within 25 miles', value: '25' },
    { label: 'Within 50 miles', value: '50' },
    { label: 'Within 100 miles', value: '100' },
    { label: 'Any Distance', value: '0' },
  ]

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  useEffect(() => {
    const filteredFilters = Object.keys(filters).reduce(
      (list, filter) => ({
        ...list,
        ...(filters[filter] ? { [filter]: filters[filter] } : {}),
      }),
      {},
    )

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
          value={find(distanceOptions, ({ value }) => value === filters.radius)}
          options={distanceOptions}
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
              {`job post${professionals.results.length === 1 ? '' : 's'} in your area.`}
            </p>
          </div>
          <div className={theme.professionals}>
            {professionals.error && (
              <Alert inline error>
                {professionals.error}
              </Alert>
            )}

            {professionals.results.map(applicant => (
              <ProfessionalCard
                key={`applicant-card-${applicant.id}`}
                applicant={applicant}
              />
            ))}
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
