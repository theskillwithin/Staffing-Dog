import React from 'react'
import { shape, string, array, func, oneOfType, bool } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Card from '@component/card'
import Filter from '@component/filter'
import Button from '@component/button'
import Star from '@component/svg/FavStar'
import LocationOnIcon from '@component/svg/location'

import appTheme from '../../../app/theme.css'
import { getResults, findResults, findLoading, findError } from '../../store'

import theme from './theme.css'

class Search extends React.Component {
  state = {
    distance: '',
    types: '',
    position: '',
  }

  static propTypes = {
    location: shape({
      search: string.isRequired,
    }).isRequired,
    results: array.isRequired,
    getResults: func.isRequired,
    loading: bool.isRequired,
    error: oneOfType([bool, string]).isRequired,
    meta: array.isRequired,
  }

  componentDidMount() {
    setTitle('Search')

    this.props.getResults()
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
    console.log(id)
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
                  <strong>
                    {(this.props.meta &&
                      this.props.meta.count &&
                      this.props.meta.count) ||
                      '0'}
                  </strong>
                  &nbsp; job posts in your area.
                </p>
              </div>

              <div className={theme.searchResultsList}>
                {this.props.results && this.props.results.length ? (
                  <>
                    {this.props.results.map(job => (
                      <Card key={job.location + job.id} type="large">
                        <Link
                          to={`/search/job/${job.slug}`}
                          className={classnames(theme.title, job.new && theme.new)}
                        >
                          {job.title}
                        </Link>
                        <div className={classnames(theme.star, job.star && theme.active)}>
                          <button onClick={() => this.toggleFav(job.id)} type="button">
                            <Star active={job.star} />
                          </button>
                        </div>
                        <div className={theme.location}>
                          <span>{job.location}</span>
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
                          <Link to={`/search/job/${job.slug}`} className={theme.readMore}>
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
  results: findResults(state),
  loading: findLoading(state),
  error: findError(state),
  meta: [],
})

export const mapActionsToProps = { getResults }

export default withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )(Search),
)
