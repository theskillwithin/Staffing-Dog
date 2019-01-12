import React from 'react'
import { bool, number } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'

const Spinner = ({ center, size, zIndex }) => (
  <svg
    className={classnames(theme.spinner, center && theme.center)}
    width={size}
    height={size}
    viewBox="0 0 50 50"
    style={{ zIndex }}
  >
    <circle className={theme.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
  </svg>
)

Spinner.defaultProps = {
  center: true,
  size: 50,
  zIndex: 2,
}

Spinner.propTypes = {
  center: bool,
  size: number,
  zIndex: number,
}

export default Spinner
