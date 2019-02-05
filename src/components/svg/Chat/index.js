import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGChat from '../files/messages.svg'

import theme from './theme.css'

const Chat = ({ className }) => (
  <span
    className={clsx(className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGChat }}
  />
)

Chat.defaultProps = {
  className: '',
}

Chat.propTypes = {
  className: string,
}

export default Chat
