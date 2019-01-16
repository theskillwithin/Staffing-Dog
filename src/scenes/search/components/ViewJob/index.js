import React from 'react'
import { bool, string, object, oneOfType, shape, func } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Button from '@sdog/components/button'
import LocationOnIcon from '@sdog/components/svg/Location'
import {
  getSingleJob,
  findSingleJob,
  findSingleJobLoading,
  findSingleJobError,
} from '@sdog/store/jobs'
import { defineJob } from '@sdog/definitions/jobs'

import appTheme from '../../../app/theme.css'

import theme from './theme.css'

class ViewJob extends React.Component {
  static propTypes = {
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
    job: oneOfType([bool, object]).isRequired,
    match: shape({
      params: shape({
        id: string.isRequired,
      }),
    }),
    getSingleJob: func.isRequired,
  }

  componentDidMount() {
    this.props.getSingleJob(this.props.match.params.id)
  }

  render() {
    const { job, loading, error } = this.props

    if (loading) {
      return null
    }

    return (
      <div className={classnames(appTheme.pageContent, theme.pageContent)}>
        {error ? (
          <p>{error || 'Could not find job'}</p>
        ) : (
          <>
            <section className={theme.title}>
              <img src="http://fillmurray.com/133/92" alt="Job Logo" />
              <div>
                <h2>{job.criteria.title}</h2>
                <h4>{job.criteria.provider_details.practice_name}</h4>
              </div>
            </section>
            <section>
              <p>{job.criteria.description}</p>
              <div className={theme.location}>
                <LocationOnIcon />
                <strong>
                  {job.criteria.provider_details.city},{' '}
                  {job.criteria.provider_details.state}
                </strong>
              </div>
              <div className={theme.details}>
                <dl>
                  <dt>Job Type</dt>
                  <dd>{defineJob('type', job.criteria.employment_type)}</dd>
                  <dt>Position</dt>
                  <dd>{defineJob('position', job.criteria.position)}</dd>
                  <dt>Rate</dt>
                  <dd>${job.criteria.hourly_rate} hr</dd>
                  <dt>Experience</dt>
                  <dd>
                    {job.criteria.experience_min}-{job.criteria.experience_preferred}{' '}
                    Years
                  </dd>
                </dl>
              </div>
              <div className={theme.apply}>
                <Button primary round>
                  Apply Now
                </Button>
              </div>
            </section>
            <section className={theme.details}>
              <p className={theme.notice}>
                The following information is intended to be representative of the
                essential functions performed by incumbents in this position and is not
                all-inclusive. The omission of a specific task or function will not
                preclude it from the position if the work is similar, related or a logical
                extension of position responsibilities.
              </p>

              <div
                className={theme.rawDescription}
                dangerouslySetInnerHTML={{ __html: job.meta.raw }}
              />
            </section>
          </>
        )}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  job: findSingleJob(state),
  loading: findSingleJobLoading(state),
  error: findSingleJobError(state),
})

export const mapActionsToProps = { getSingleJob }

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(ViewJob),
)
