import React from 'react'
import { string, oneOf } from 'prop-types'
import clsx from 'clsx'

import ChevronSVG from '../files/chevron.svg'

import theme from './theme.css'

const Chevron = ({ className, color, direction }) => (
  <span
    className={clsx(
      className,
      theme.svg,
      color && theme[color],
      direction && theme[direction],
    )}
    dangerouslySetInnerHTML={{ __html: ChevronSVG }}
  />
)

Chevron.defaultProps = {
  className: '',
  color: 'gray',
  direction: 'right',
}

Chevron.propTypes = {
  className: string,
  color: oneOf(['gray', 'white']),
  direction: oneOf(['up', 'right', 'bottom', 'left']),
}

export default Chevron
