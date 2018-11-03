import React from 'react'
import { string } from 'prop-types'
import classnames from 'classnames'

import SVGClose from '../files/close.svg'

import theme from './theme.css'

const Close = ({ className }) => (
  <span
    className={classnames(className, theme.svg)}
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
