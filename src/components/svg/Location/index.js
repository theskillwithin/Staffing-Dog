import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGLocationOn from '../files/location_on.svg'

import theme from './theme.css'

const LocationOn = ({ className }) => (
  <span
    className={clsx(className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGLocationOn }}
  />
)

LocationOn.defaultProps = {
  className: '',
}

LocationOn.propTypes = {
  className: string,
}

export default LocationOn
