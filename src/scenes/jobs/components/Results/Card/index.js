import React from 'react'
import { object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import get from 'lodash/get'

import Card from '@sdog/components/card'
import Button from '@sdog/components/button'
import Spinner from '@sdog/components/spinner'
// import Star from '@sdog/components/svg/FavStar'

import theme from './theme.css'

const JobCard = ({ job, match, applyingForJobs, applyForJob, defineJob }) => {
  const onClickApplyForJob = (e, jobId) => {
    e.preventDefault()

    applyForJob(jobId)
  }

  return (
    <Card type="large">
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
        <span>{get(job, 'criteria.practice_details.address.city', 'city')}, </span>
        <span>{get(job, 'criteria.practice_details.address.state', 'state')}</span>
        <span>
          {get(job, 'criteria.practice_details.origin_distance', 'unkown')} miles away
        </span>
      </div>
      <div className={theme.details}>
        <dl>
          <dt>Position</dt>
          <dd>{defineJob('position', get(job, 'criteria.position'))}</dd>
          <dt>Experience</dt>
          <dd>{get(job, 'criteria.experience_preferred')}</dd>
          <dt>Job Type</dt>
          <dd>{defineJob('type', get(job, 'criteria.employment_type'))}</dd>
        </dl>
      </div>

      <div className={theme.short}>{get(job, 'criteria.description')}</div>

      <div className={theme.actions}>
        <div>{get(job, 'criteria.hourly_rate')}/hr</div>

        <Link to={`${match.url}/view/${job.id}`} className={theme.readMore}>
          Read More
        </Link>

        <Button
          round
          secondary={job.applied}
          disabled={job.applied || get(applyingForJobs, `[${job.id}].loading`, false)}
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
  )
}

JobCard.propTypes = {
  job: object.isRequired,
  match: object.isRequired,
  applyingForJobs: object.isRequired,
  applyForJob: func.isRequired,
  defineJob: func.isRequired,
}

export default JobCard
