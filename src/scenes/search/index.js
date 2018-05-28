import React from 'react'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Card from '@component/card'

import theme from '../app/theme.css'

class Search extends React.Component {
  componentDidMount() {
    setTitle('Search')
  }

  render() {
    return (
      <div className={classnames(theme.pageContent)}>
        <Card>
          <h2>Search</h2>
        </Card>
      </div>
    )
  }
}

export default Search
