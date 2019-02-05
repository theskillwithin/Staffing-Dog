import React from 'react'
import { string, number, oneOf } from 'prop-types'
import clsx from 'clsx'

import SVGCheck from '../files/check.svg'

import theme from './theme.css'

const Check = ({ className, color, width }) => (
  <span
    className={clsx(className, theme.svg, color && theme[color])}
    dangerouslySetInnerHTML={{ __html: SVGCheck }}
    style={{ width: `${width}px` }}
  />
)

Check.defaultProps = {
  className: '',
  color: null,
  width: 13,
}

Check.propTypes = {
  className: string,
  color: oneOf(['green', 'white']),
  width: number,
}

export default Check
