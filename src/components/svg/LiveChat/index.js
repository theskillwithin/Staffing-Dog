import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGLiveChat from '../files/livechat.svg'

import theme from './theme.css'

const LiveChatSVG = props => (
  <span
    className={clsx(props.className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGLiveChat }}
  />
)

LiveChatSVG.defaultProps = {
  className: '',
}

LiveChatSVG.propTypes = {
  className: string,
}

export default LiveChatSVG
