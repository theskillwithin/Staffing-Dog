import React from 'react'
import classnames from 'classnames'

import Card from '../../components/card'
import theme from '../app/theme.css'


const Search = () => (
  <div className={classnames(theme.pageContent)}>
    <Card><h2>Search</h2></Card>
  </div>
)

export default Search
