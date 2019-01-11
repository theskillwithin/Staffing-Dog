import React from 'react'
import { shape, string, array, func, oneOfType, bool } from 'prop-types'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import classnames from 'classnames'
import { getUserJobs, findJobs, findJobsLoading, findJobsError } from '@sdog/store/jobs'
import { setTitle } from '@sdog/utils/document'
import Card from '@sdog/components/card'
import Filter from '@sdog/components/filter'
import Button from '@sdog/components/button'
import Star from '@sdog/components/svg/FavStar'
import LocationOnIcon from '@sdog/components/svg/Location'

import appTheme from '../../../app/theme.css'

import theme from './theme.css'

class SearchResults extends React.Component {
  state = {
    distance: '',
    types: '',
    position: '',
  }

  static propTypes = {
    location: shape({
      search: string.isRequired,
    }).isRequired,
    results: shape({
      applied: array,
      recommended: array,
      scheduled: array,
      posts: array,
      preferred: array,
    }).isRequired,
    getUserJobs: func.isRequired,
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
    meta: array.isRequired,
  }

  componentDidMount() {
    setTitle('Search')

    this.props.getUserJobs()
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value })
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

  toggleFav = id => {
    // this.props.fav(id)
    console.log('fav', id)
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

    const jobTypes = [
      { label: 'hygienist', value: 'hygienist' },
      { label: 'Dentist', value: 'Dentist' },
      { label: 'Dentist2', value: 'Dentist2' },
      { label: 'Dentist3', value: 'Dentist3' },
      { label: 'Dentist4', value: 'Dentist4' },
    ]

    const jobPositions = [
      { label: 'hygienist', value: 'hygienist' },
      { label: 'Dentist', value: 'Dentist' },
      { label: 'Dentist2', value: 'Dentist2' },
      { label: 'Dentist3', value: 'Dentist3' },
      { label: 'Dentist4', value: 'Dentist4' },
    ]

    return (
      <div className={classnames(appTheme.pageContent, theme.pageContent)}>
        <header className={theme.searchFilters}>
          <Filter
            onChange={value => this.handleChange('position', value)}
            value={this.state.position}
            options={jobPositions}
            placeholder="All Position Types"
          />
          <Filter
            onChange={value => this.handleChange('types', value)}
            value={this.state.types}
            options={jobTypes}
            placeholder="All Job Types"
          />
          <Filter
            onChange={value => this.handleChange('distance', value)}
            value={this.state.distance}
            options={options}
            placeholder="Distance"
          />
        </header>

        <div className={theme.searchResults}>
          {this.props.loading ? (
            <p>Loading</p>
          ) : (
            <>
              <div className={theme.searchResultsMeta}>
                <p className={theme.cityMeta}>
                  <LocationOnIcon />
                  Salt Lake City, UT
                </p>
                <p>
                  <strong>{get(this.props.results, 'recommended.length', 0)}</strong>
                  &nbsp; job posts in your area.
                </p>
              </div>

              <div className={theme.searchResultsList}>
                {this.props.results.recommended &&
                this.props.results.recommended.length ? (
                  <>
                    {this.props.results.recommended.map(job => (
                      <Card key={job.location + job.id} type="large">
                        <Link
                          to={`/search/job/${job.slug}`}
                          className={classnames(theme.title, job.new && theme.new)}
                        >
                          {job.criteria.title}
                        </Link>
                        <div className={classnames(theme.star, job.star && theme.active)}>
                          <button onClick={() => this.toggleFav(job.id)} type="button">
                            <Star active={job.star} />
                          </button>
                        </div>
                        <div className={theme.location}>
                          <span>{job.criteria.provider_details.geocode.lat}</span>
                          <span>{job.criteria.provider_details.geocode.lng}</span>
                          <span>{job.distance || 'unkown'} miles away</span>
                        </div>
                        <div className={theme.details}>
                          <dl>
                            <dt>Position</dt>
                            <dd>{job.criteria.position}</dd>
                            <dt>Experience</dt>
                            <dd>{job.criteria.experience_preferred}</dd>
                            <dt>Job Type</dt>
                            <dd>{job.criteria.employment_type}</dd>
                          </dl>
                        </div>
                        <div className={theme.short}>{job.criteria.description}</div>
                        <div className={theme.actions}>
                          <div>{job.criteria.hourly_rate}</div>
                          <Link to={`/search/job/${job.id}`} className={theme.readMore}>
                            Read More
                          </Link>
                          <Button round secondary={job.applied} disabled={job.applied}>
                            {job.applied ? 'Applied' : 'Quick Apply'}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </>
                ) : (
                  <div className={theme.empty}>
                    <h2>No Search Results</h2>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  results: findJobs(state),
  loading: findJobsLoading(state),
  error: findJobsError(state),
  meta: [],
})

export const mapActionsToProps = { getUserJobs }

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(SearchResults),
)
