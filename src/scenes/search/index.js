import React from 'react'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Card from '@component/card'
import Filter from '@component/filter'

import theme from '../app/theme.css'

class Search extends React.Component {
  state = {
    value: 'test',
  }

  componentDidMount() {
    setTitle('Search')
  }

  handleChange = value => {
    this.setState({ value })
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
      <div className={classnames(theme.pageContent)}>
        <Card>
          <h2>Search</h2>
          <Filter
            onChange={value => this.handleChange(value)}
            value={this.state.value}
            options={options}
          />
        </Card>
      </div>
    )
  }
}

export default Search
