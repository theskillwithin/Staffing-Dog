import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { object, bool } from 'prop-types'
import Card from '@sdog/components/card'
import Spinner from '@sdog/components/spinner'
import Alert from '@sdog/components/alert'
import { findJobsLoading, findJobsError, findJobs } from 'store/jobs'

import theme from './theme.css'

const userJobsList = ({ loading, error, jobs }) => {
  console.log({ jobs })
  return (
    <Card title="Job List">
      <div className={theme.jobList}>
        {loading && <Spinner />}
        {error && <Alert error>an error has occured</Alert>}
        {!error && !loading && (
          <>
            {jobs && jobs.applied && jobs.applied.length ? (
              <div className={theme.jobs}>
                <h3>Applied Jobs</h3>
                {jobs &&
                  jobs.applied.map(app => (
                    <div key={app.id}>
                      <div>{app.criteria.practice_details.name}</div>
                      <div>{app.criteria.position}</div>
                      <div>${app.criteria.hourly_rate || app.criteria.salary}/hr</div>
                      <div>{app.criteria.specialty}</div>
                      <div>
                        {moment(app.criteria.available_date).format('MM/DD/YYYY')}
                      </div>
                      <div>View Job Post</div>
                    </div>
                  ))}
              </div>
            ) : (
              <div>no applied jobs</div>
            )}
          </>
        )}
      </div>
    </Card>
  )
}

userJobsList.defaultProps = {
  loading: true,
  error: false,
}

userJobsList.propTypes = {
  jobs: object.isRequired,
  loading: bool,
  error: bool,
}

const mapState = state => ({
  loading: findJobsLoading(state),
  error: findJobsError(state),
  jobs: findJobs(state),
})

export default connect(mapState)(userJobsList)
