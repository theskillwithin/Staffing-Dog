import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGReply from '../files/reply.svg'

import theme from './theme.css'

const ReplySVG = props => (
  <span
    className={clsx(props.className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGReply }}
  />
)

ReplySVG.defaultProps = {
  className: '',
}

ReplySVG.propTypes = {
  className: string,
}

export default ReplySVG
