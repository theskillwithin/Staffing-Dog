import React from 'react'
import { string } from 'prop-types'
import classnames from 'classnames'

import SVGhamburger from '../files/hamburger.svg'

import theme from './theme.css'

const Hamburger = ({ className }) => (
  <span
    className={classnames(className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGhamburger }}
  />
)

Hamburger.defaultProps = {
  className: '',
}

Hamburger.propTypes = {
  className: string,
}

export default Hamburger
