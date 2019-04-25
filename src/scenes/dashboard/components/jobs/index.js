import React, { useState } from 'react'
import { connect } from 'react-redux'
import { object, bool } from 'prop-types'
import Card from '@sdog/components/card'
import Spinner from '@sdog/components/spinner'
import Alert from '@sdog/components/alert'
import { findJobsLoading, findJobsError, findJobs } from 'store/jobs'
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
              <div>no applied jobs</div>
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
