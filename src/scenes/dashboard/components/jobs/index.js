import React, { useState } from 'react'
import { object, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { findJobsLoading, findJobsError, findJobs } from 'store/jobs'
import Card from '@sdog/components/card'
import Spinner from '@sdog/components/spinner'
import Alert from '@sdog/components/alert'
import Tabs from '@sdog/components/tab_bar'

import JobCard from './card'
import theme from './theme.css'

const UserJobsList = ({ loading, error, jobs }) => {
  const [activeTabIndex, setActiveTab] = useState(0)
  const chosenJobs = jobs && activeTabIndex === 1 ? jobs.scheduled : jobs.applied
  const which = jobs && activeTabIndex === 1 ? 'Scheduled' : 'Applied'

  return (
    <Card title="Jobs">
      <div className={theme.jobList}>
        {loading && <Spinner />}
        {error && <Alert error>an error has occured</Alert>}
        {!error && !loading && (
          <div>
            <div className={theme.tabs}>
              <Tabs
                activeTabIndex={activeTabIndex}
                onSelect={setActiveTab}
                underline
                exactWidthTab
                fw500
              >
                <div>Applied</div>
                <div>Scheduled</div>
              </Tabs>
            </div>

            {jobs && chosenJobs && chosenJobs.length ? (
              <div className={theme.jobs}>
                {jobs &&
                  chosenJobs.map(app => (
                    <div key={app.id}>
                      <JobCard data={app} />
                    </div>
                  ))}
                <div className={theme.bottom}>
                  <span>{chosenJobs.length}</span> {which}
                </div>
              </div>
            ) : (
              <div className={theme.empty}>
                {'Applied' === which && (
                  <span>
                    No jobs to show. <Link to="/jobs">Find and apply to a job here!</Link>
                  </span>
                )}
                {'Scheduled' === which && (
                  <span>
                    You do not have any scheduled jobs.{' '}
                    <Link to="/jobs">Find a job here!</Link>
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

UserJobsList.defaultProps = {
  loading: true,
  error: false,
}

UserJobsList.propTypes = {
  jobs: object.isRequired,
  loading: bool,
  error: bool,
}

const mapState = state => ({
  loading: findJobsLoading(state),
  error: findJobsError(state),
  jobs: findJobs(state),
})

export default connect(mapState)(UserJobsList)
