import React from 'react'
import { string, bool, oneOf } from 'prop-types'
import clsx from 'clsx'

import SVGArrow from '../files/arrow.svg'
import SVGArrowSmall from '../files/arrowSmall.svg'

import theme from './theme.css'

const Arrow = ({ className, color, direction, small }) => (
  <span
    className={clsx(
      className,
      theme.svg,
      color && theme[color],
      direction && theme[direction],
    )}
    dangerouslySetInnerHTML={{ __html: small ? SVGArrowSmall : SVGArrow }}
  />
)

Arrow.defaultProps = {
  className: '',
  color: 'gray',
  direction: 'right',
  small: false,
}

Arrow.propTypes = {
  className: string,
  color: oneOf(['gray', 'white']),
  direction: oneOf(['up', 'right', 'bottom', 'left']),
  small: bool,
}

export default Arrow
