import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGClose from '../files/close.svg'

import theme from './theme.css'

const Close = ({ className }) => (
  <span
    className={clsx(className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGClose }}
  />
)

Close.defaultProps = {
  className: '',
}

Close.propTypes = {
  className: string,
}

export default Close
