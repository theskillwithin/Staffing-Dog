import React from 'react'
import { shape, string } from 'prop-types'
import loadable from 'loadable-components'
import { Switch, Route } from 'react-router-dom'

const SearchResults = loadable(() =>
  import(/* webpackChunkName: "searchResults" */ './components/Results'),
)
const ViewJob = loadable(() =>
  import(/* webpackChunkName: "searchViewJob" */ './components/ViewJob'),
)

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
