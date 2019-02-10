import React from 'react'
import { string } from 'prop-types'

import theme from './theme.css'

const TopError = ({ children }) => {
  if (!children) return null
  return (
    <div className={theme.topError}>
      <p>{children}</p>
    </div>
  )
}

TopError.defaultProps = {
  children: null,
}

TopError.propTypes = {
  children: string,
}

export default TopError
