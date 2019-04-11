import React, { useEffect, useState } from 'react'
import { array, bool } from 'prop-types'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import clsx from 'clsx'
import { setTitle } from '@sdog/utils/document'
import Card from '@sdog/components/card'
import Filter from '@sdog/components/filter'
import Button from '@sdog/components/button'
import Spinner from '@sdog/components/spinner'
import Chevron from '@sdog/components/svg/Chevron'
import { defineJob } from '@sdog/definitions/jobs'

import appTheme from '../app/theme.css'

import theme from './theme.css'

const JobPostings = ({ jobs, loading }) => {
  useEffect(() => void setTitle('Job Postings'), [])
  const [filter, setFilter] = useState({ label: 'Active', value: 'Active' })

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
        <Link to="/job-postings/new">
          <Button>Post New Job</Button>
        </Link>
      </header>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className={theme.jobs}>
          {jobs && jobs.length ? (
            jobs.map(job => (
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
                  <Link to={`/job-postings/edit/${job.id}`}>
                    <Button secondary>Edit Post</Button>
                  </Link>
                </div>
                <div className={theme.actions}>
                  <div className={theme.info}>
                    <div>{defineJob('type', get(job, 'criteria.employment_type'))}</div>
                    <div>-</div>
                    <div>{defineJob('position', get(job, 'criteria.position'))}</div>
                    <div className={theme.at}>@</div>
                    <div>{get(job, 'criteria.hourly_rate')} hr</div>
                  </div>
                  <div className={theme.applicants}>
                    <Link to={`/job-postings/view/${job.id}`}>
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
            <h4>No job postings</h4>
          )}
        </div>
      )}
    </div>
  )
}

JobPostings.defaultProps = {
  jobs: [
    {
      id: 112358,
      applicantsNumber: 2,
      status: 'open',
      criteria: {
        title: 'Temporary Hygienist Needed for Maternity Leave',
        experience_preferred: '4- 7 Years',
        hourly_rate: '$15',
        employment_type: 'Temporary',
        position: 'Dental Hygienist',
        description:
          'We are in need of a RDH for the months of December, January and February for maternity leave. Possibly turning into a part-time permanet position. Dentrix knowlege is preferred',
        practice_details: {
          name: 'APEX Dental',
          address: {
            city: 'Salt Lake City',
            state: 'UT',
          },
        },
      },
    },
  ],
  loading: false,
}

JobPostings.propTypes = {
  jobs: array,
  loading: bool,
}

export default JobPostings
