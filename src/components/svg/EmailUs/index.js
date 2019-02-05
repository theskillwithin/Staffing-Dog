import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGEmailUs from '../files/emailus.svg'

import theme from './theme.css'

const EmailUsSVG = props => (
  <span
    className={clsx(props.className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGEmailUs }}
  />
)

EmailUsSVG.defaultProps = {
  className: '',
}

EmailUsSVG.propTypes = {
  className: string,
}

export default EmailUsSVG
