import React from 'react'
import { string, number, oneOf } from 'prop-types'
import classnames from 'classnames'

import SVGCheck from '../files/check.svg'

import theme from './theme.css'

const Circle = ({ className, color, width }) => (
  <span
    className={classnames(className, theme.svg, color && theme[color])}
    dangerouslySetInnerHTML={{ __html: SVGCheck }}
    style={{ width: `${width}px` }}
  />
)

Circle.defaultProps = {
  className: '',
  color: null,
  width: 13,
}

Circle.propTypes = {
  className: string,
  color: oneOf(['green', 'white']),
  width: number,
}

export default Circle
