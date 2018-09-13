import React from 'react'
import { shape, string, array, func, oneOfType, bool } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Card from '@component/card'

import theme from '../app/theme.css'

import { getResults, findResults, findLoading, findError } from './store'

class Search extends React.Component {
  static propTypes = {
    location: shape({
      search: string.isRequired,
    }).isRequired,
    results: array.isRequired,
    getResults: func.isRequired,
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
  }

  componentDidMount() {
    setTitle('Search')

    this.props.getResults()
  }

  getQueryParams = (queryString = '', defaultValues = {}) => {
    const splitStart = queryString.split('?')

    if (!splitStart[1]) {
      return {}
    }

    return splitStart[1].split('&').reduce((prevQuery, currentQuery) => {
      const [key, val = defaultValues[key] || true] = currentQuery.split('=')
      return {
        ...prevQuery,
        [key]: val,
      }
    }, {})
  }

  render = () => (
    <div className={classnames(theme.pageContent)}>
      <header className={theme.searchFilters}>
        <p>filters go here</p>
      </header>

      <div className={theme.searchResults}>
        {this.props.loading ? (
          <p>Loading</p>
        ) : (
          <React.Fragment>
            <div className={theme.searchResultsMeta}>
              <p>Salt Lake City, UT</p>
              <p>{this.props.results.length} job posts in your area.</p>
            </div>

            <div className={theme.searchResultsList}>
              {this.props.results.map(job => (
                <Card key={job.location}>{job.location}</Card>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export const mapStateToProps = state => ({
  results: findResults(state),
  loading: findLoading(state),
  error: findError(state),
})

export const mapActionsToProps = { getResults }

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(Search),
)
