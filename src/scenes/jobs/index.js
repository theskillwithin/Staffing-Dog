import React, { useEffect } from 'react'
import { shape, func, oneOfType, bool, string } from 'prop-types'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { findUserType } from '@sdog/store/user'
import Spinner from '@sdog/components/spinner'

import SearchJobs from './components/Results'
import ViewJob from './components/ViewJob'

const JobsScene = ({ userType, match: { path }, history }) => {
  useEffect(
    () => {
      if (userType && 'practice' === userType) {
        history.replace('/job-postings')
      }
    },
    [userType],
  )

  if (!userType) {
    return <Spinner />
  }

  return (
    <Switch>
      <Route exact path={path} component={SearchJobs} />
      <Route path={`${path}/view/:id`} component={ViewJob} />
    </Switch>
  )
}

JobsScene.propTypes = {
  match: shape({
    path: string.isRequired,
  }).isRequired,
  userType: oneOfType([bool, string]),
  history: shape({ replace: func.isRequired }).isRequired,
}

JobsScene.defaultProps = {
  userType: false,
}

export const mapStateToProps = state => ({
  userType: findUserType(state),
})

export default withRouter(connect(mapStateToProps)(JobsScene))
