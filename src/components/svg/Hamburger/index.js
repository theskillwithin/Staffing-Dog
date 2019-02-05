import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGhamburger from '../files/hamburger.svg'

import theme from './theme.css'

const Hamburger = ({ className }) => (
  <span
    className={clsx(className, theme.svg)}
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
