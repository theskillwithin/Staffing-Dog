import React from 'react'
import { shape, string, array } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Card from '@component/card'

import theme from '../app/theme.css'

class Search extends React.Component {
  static propTypes = {
    location: shape({
      search: string.isRequired,
    }).isRequired,
    results: array.isRequired,
  }

  componentDidMount() {
    setTitle('Search')
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

  render() {
    const { results } = this.props

    return (
      <div className={classnames(theme.pageContent)}>
        <header className={theme.searchFilters}>
          <p>filters go here</p>
        </header>

        <div className={theme.searchResults}>
          <div className={theme.searchResultsMeta}>
            <p>Salt Lake City, UT</p>
            <p>5 job posts in your area.</p>
          </div>

          <div className={theme.searchResultsList}>
            {results.map(job => (
              <Card key={job.title}>{job.title}</Card>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = () => ({
  results: [
    { title: 'first job' },
    { title: 'second job' },
    { title: 'third job' },
    { title: 'fourth job' },
  ],
})

export default withRouter(connect(mapStateToProps)(Search))
