import React, { useEffect } from 'react'
import { object, array, bool } from 'prop-types'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import clsx from 'clsx'
import { setTitle } from '@sdog/utils/document'
import ProfessionalCard from '@sdog/components/professional_card'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'
import Spinner from '@sdog/components/spinner'
import { defineJob } from '@sdog/definitions/jobs'

import appTheme from '../../app/theme.css'

import theme from './theme.css'

const JobPostingsView = ({ job, applicants, loading }) => {
  useEffect(() => void setTitle('Job Postings'), [])

  return (
    <div className={clsx(appTheme.pageContent, theme.container)}>
      {loading ? (
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
                <Button red>Delete Post</Button>
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
              </div>
            </Card>
          </div>
          <h1>applicants go here</h1>
          <div className={theme.applicants}>
            {applicants.map(applicant => (
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

JobPostingsView.defaultProps = {
  job: {
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
  applicants: [
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

JobPostingsView.propTypes = {
  job: object,
  applicants: array,
  loading: bool,
}

export default JobPostingsView
