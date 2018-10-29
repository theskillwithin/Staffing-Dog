import React from 'react'
import { string } from 'prop-types'
import classnames from 'classnames'

import SVGInvalid from '../files/invalid.svg'

import theme from './theme.css'

const Circle = props => (
  <span
    className={classnames(props.className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGInvalid }}
  />
)

Circle.defaultProps = {
  className: '',
}

Circle.propTypes = {
  className: string,
}

export default Circle
