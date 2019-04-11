import React from 'react'
import { Route, Switch } from 'react-router-dom'

const JobPostingsSceneNew = React.lazy(() => import('./new'))
const JobPostingsSceneView = React.lazy(() => import('./view'))
const JobPostingsList = React.lazy(() => import('./list'))

const JobPostingsScene = () => (
  <Switch>
    <Route path="/job-postings/create" component={JobPostingsSceneNew} />
    <Route path="/job-postings/:id" component={JobPostingsSceneView} />
    <Route path="/job-postings/:id/edit" component={JobPostingsSceneNew} />
    <Route exact path="/job-postings" component={JobPostingsList} />
  </Switch>
)

export default JobPostingsScene
