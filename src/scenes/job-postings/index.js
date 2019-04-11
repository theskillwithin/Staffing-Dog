import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { shape, string } from 'prop-types'

const JobPostingsSceneNew = React.lazy(() => import('./new'))
const JobPostingsSceneView = React.lazy(() => import('./view'))
const JobPostingsList = React.lazy(() => import('./list'))

const JobPostingsScene = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/create`} component={JobPostingsSceneNew} />
    <Route path={`${match.url}/:id"`} component={JobPostingsSceneView} />
    <Route path={`${match.url}/:id/edit`} component={JobPostingsSceneNew} />
    <Route exact path={match.url} component={JobPostingsList} />
  </Switch>
)

JobPostingsScene.propTypes = {
  match: shape({ url: string }).isRequired,
}

export default withRouter(JobPostingsScene)
