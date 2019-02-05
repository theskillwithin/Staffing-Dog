import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGNearMe from '../files/nearme.svg'

import theme from './theme.css'

const NearMe = ({ className }) => (
  <span
    className={clsx(className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGNearMe }}
  />
)

NearMe.defaultProps = {
  className: '',
}

NearMe.propTypes = {
  className: string,
}

export default NearMe
