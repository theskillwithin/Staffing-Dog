import React from 'react'
import { shape, string, array, func, oneOfType, bool } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Card from '@component/card'
import Filter from '@component/filter'
import Button from '@component/button'
import Star from '@component/svg/FavStar'

import appTheme from '../app/theme.css'

import theme from './theme.css'
import { getResults, findResults, findLoading, findError } from './store'

class Search extends React.Component {
  state = {
    value: 'test',
  }

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

  handleChange = value => {
    this.setState({ value })
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
    const options = [
      { label: 'Within 5 miles', value: '5' },
      { label: 'Within 10 miles', value: '10' },
      { label: 'Within 25 miles', value: '25' },
      { label: 'Within 50 miles', value: '50' },
      { label: 'Within 100 miles', value: '100' },
      { label: 'Any Distance', value: '0' },
    ]

    return (
      <div className={classnames(appTheme.pageContent)}>
        <header className={theme.searchFilters}>
          <Filter
            onChange={value => this.handleChange(value)}
            value={this.state.value}
            options={options}
          />
          <Filter
            onChange={value => this.handleChange(value)}
            value={this.state.value}
            options={options}
          />
          <Filter
            onChange={value => this.handleChange(value)}
            value={this.state.value}
            options={options}
          />
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
                {this.props.results && this.props.results.length ? (
                  <React.Fragment>
                    {this.props.results.map(job => (
                      <Card key={job.location}>
                        <a
                          href={job.slug}
                          className={classnames(theme.title, job.new && theme.new)}
                        >
                          {job.title}
                        </a>
                        <div className={theme.star}>
                          <Star active={job.star} />
                        </div>
                        <div className={theme.location}>
                          <strong>{job.location}</strong>
                          <span>{job.city}</span>
                          <span>{job.distance} miles away</span>
                        </div>
                        <div className={theme.details}>
                          <dl>
                            <dt>Position</dt>
                            <dd>{job.position}</dd>
                            <dt>Experience</dt>
                            <dd>{job.experience}</dd>
                            <dt>Job Type</dt>
                            <dd>{job.jobType}</dd>
                          </dl>
                        </div>
                        <div className={theme.short}>{job.short}</div>
                        <div className={theme.actions}>
                          <div>{job.pay}</div>
                          <a href={job.slug} className={theme.readMore}>
                            Read More
                          </a>
                          <Button round>Quick Apply</Button>
                        </div>
                      </Card>
                    ))}
                  </React.Fragment>
                ) : (
                  <div className={theme.empty}>
                    <h2>No Search Results</h2>
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }
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
