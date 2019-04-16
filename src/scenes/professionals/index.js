import React, { useState, useEffect } from 'react'
import { array, bool } from 'prop-types'
import clsx from 'clsx'
import { setTitle } from '@sdog/utils/document'
import ProfessionalCard from '@sdog/components/professional_card'
import Spinner from '@sdog/components/spinner'
import Filter from '@sdog/components/filter'
import LocationOnIcon from '@sdog/components/svg/Location'

import appTheme from '../app/theme.css'

import theme from './theme.css'

const ProfessionalsView = ({ professionals, loading }) => {
  useEffect(() => void setTitle('Job Postings'), [])

  const [filters, setFilters] = useState({
    jobType: null,
    jobSpecialty: null,
    specialtyTypes: null,
    radius: null,
  })

  const options = [
    { label: 'Within 5 miles', value: '5' },
    { label: 'Within 10 miles', value: '10' },
    { label: 'Within 25 miles', value: '25' },
    { label: 'Within 50 miles', value: '50' },
    { label: 'Within 100 miles', value: '100' },
    { label: 'Any Distance', value: '0' },
  ]

  const jobTypes = [
    { label: 'dental_hygienist', value: 'dental_hygienist' },
    { label: 'Dentist', value: 'Dentist' },
  ]

  const specialtyTypes = [
    { label: 'dental_hygienist', value: 'dental_hygienist' },
    { label: 'Dentist', value: 'Dentist' },
  ]

  const jobPositions = [
    { label: 'Full Time', value: 'full_time' },
    { label: 'Part Time', value: 'part_time' },
    { label: 'Temp', value: 'temporary' },
  ]

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  return (
    <div className={clsx(appTheme.pageContent, theme.container)}>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <div className={theme.filters}>
            <Filter
              onChange={value => handleFilterChange('jobType', value)}
              value={filters.jobType}
              options={jobPositions}
              placeholder="All Position Types"
              className={theme.jobType}
            />
            <Filter
              onChange={value => handleFilterChange('jobSpecialty', value)}
              value={filters.jobSpecialty}
              options={jobTypes}
              placeholder="All Job Types"
              className={theme.jobSpecialty}
            />
            <Filter
              onChange={value => handleFilterChange('specialtyTypes', value)}
              value={filters.specialtyTypes}
              options={specialtyTypes}
              placeholder="All Speciality Types"
              className={theme.specialtyTypes}
            />
            <Filter
              onChange={value => handleFilterChange('radius', value)}
              value={filters.radius}
              options={options}
              placeholder="Distance"
              className={theme.distance}
            />
          </div>
          <div className={theme.professionalResultsMeta}>
            <p className={theme.cityMeta}>
              <LocationOnIcon />
              Salt Lake City, UT
            </p>
            <p>
              <strong>0</strong>
              &nbsp; job posts in your area.
            </p>
          </div>
          <div className={theme.professionals}>
            {professionals.map(applicant => (
              <ProfessionalCard
                key={`applicant-card-${applicant.id}`}
                applicant={applicant}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

ProfessionalsView.defaultProps = {
  professionals: [
    {
      id: 11235813,
      name: 'Debbie',
      address: {
        city: 'Salt Lake City',
        state: 'UT',
      },
      miles: 7,
      description:
        '22 years practicing Dental Hygiene all in the Salt Lake City area. I am certified in Nitrous Oxide, Dental Laser, Sealants, Yoga, Walking …',
      employment_type: 'Temporary',
      position: 'Dental Hygienist',
      hourly_rate: '$15',
      img: 'http://fillmurray.com/146/182',
    },
    {
      id: 1123581321,
      name: 'Debbie',
      address: {
        city: 'Salt Lake City',
        state: 'UT',
      },
      miles: 7,
      description:
        '22 years practicing Dental Hygiene all in the Salt Lake City area. I am certified in Nitrous Oxide, Dental Laser, Sealants, Yoga, Walking …',
      employment_type: 'Temporary',
      position: 'Dental Hygienist',
      hourly_rate: '$15',
      img: 'http://placecage.com/146/182',
    },
  ],
  loading: false,
}

ProfessionalsView.propTypes = {
  professionals: array,
  loading: bool,
}

export default ProfessionalsView
