import React from 'react'
import { shape, string } from 'prop-types'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Card from '@component/card'

import theme from '../app/theme.css'

class Search extends React.Component {
  static propTypes = {
    location: shape({
      search: string.isRequired,
    }).isRequired,
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
    const {
      props: {
        location: { search: searchQuery },
      },
      getQueryParams,
    } = this

    return (
      <div className={classnames(theme.pageContent)}>
        <Card>
          <h2>Search</h2>

          {searchQuery &&
            Array.entries(getQueryParams(searchQuery)).map(([key, val]) => (
              <li key={key}>
                {key}:{val}
              </li>
            ))}
        </Card>
      </div>
    )
  }
}

export default Search
