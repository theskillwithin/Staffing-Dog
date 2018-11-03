import React from 'react'
import { string } from 'prop-types'
import classnames from 'classnames'

import SVGNearMe from '../files/nearme.svg'

import theme from './theme.css'

const NearMe = ({ className }) => (
  <span
    className={classnames(className, theme.svg)}
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
