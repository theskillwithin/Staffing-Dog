import React from 'react'
import { shape, string } from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const SearchResults = React.lazy(() => import('./components/Results'))
const ViewJob = React.lazy(() => import('./components/ViewJob'))

const Search = ({ match: { path } }) => (
  <Switch>
    <Route exact path={path} component={SearchResults} />
    <Route path={`${path}/job/:id`} component={ViewJob} />
  </Switch>
)

Search.propTypes = {
  match: shape({
    path: string.isRequired,
  }).isRequired,
}

export default Search
