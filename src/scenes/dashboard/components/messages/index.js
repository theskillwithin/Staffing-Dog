import React from 'react'
import map from 'lodash/map'
import classnames from 'classnames'
import ProfilePhotoSVG from '@component/svg/ProfilePhoto'
import ReplySVG from '@component/svg/Reply'

import theme from './theme.css'

class Messages extends React.Component {
  state = {
    active: false,
  }

  messages = [
    {
      id: 111,
      from: 'Wes Bos',
      location: 'React Dental',
      date: '4:00 PM',
      short:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
      read: false,
      threadCount: 4,
    },
    {
      id: 1,
      from: 'Wes Bos',
      location: 'React Dental',
      date: 'Monday',
      short:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
      read: false,
      threadCount: null,
    },
    {
      id: 2,
      from: 'Wes Bos',
      location: 'React Dental',
      date: '5/16/18',
      short:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
      read: true,
      threadCount: null,
    },
    {
      id: 3,
      from: 'Wes Bos',
      date: '5/16/18',
      short:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
      read: true,
      threadCount: null,
    },
    {
      id: 4,
      from: 'Wes Bos',
      location: 'React Dental',
      date: '5/16/18',
      short:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
      read: true,
      threadCount: null,
      avatar: 'https://fillmurray.com/48/48',
    },
    {
      id: 5,
      from: 'Wes Bos',
      location: 'React Dental',
      date: '5/16/18',
      short:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
      read: true,
      threadCount: 4,
    },
    {
      id: 6,
      from: 'Wes Bos',
      location: 'React Dental',
      date: '5/16/18',
      short:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
      read: true,
      threadCount: null,
    },
  ]

  handleClick = active => {
    this.setState({ active })
  }

  render() {
    const { active } = this.state
    return (
      <div className={classnames(theme.messagesContainer, active && theme.active)}>
        <div className={theme.messages}>
          {map(this.messages, message => (
            <div
              key={message.id}
              className={classnames(theme.message, !message.read && theme.unread)}
              role="button"
              tabIndex={0}
              onClick={() => this.handleClick(message.id)}
            >
              <div className={theme.avatar}>
                {message.avatar ? (
                  <img src={message.avatar} alt="avatar" />
                ) : (
                  <ProfilePhotoSVG />
                )}
              </div>
              <div className={theme.middle}>
                <div className={theme.title}>
                  <h6>{message.from}</h6>
                  {message.location && <span>{message.location}</span>}
                </div>
                <div className={theme.short}>
                  <p>{message.short && message.short}</p>
                </div>
              </div>
              <div className={theme.right}>
                <div className={theme.date}>{message.date}</div>
                {message.threadCount &&
                  message.threadCount > 1 && (
                    <div className={theme.threadCount}>{message.threadCount}</div>
                  )}
                <div className={theme.reply}>
                  <ReplySVG />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={theme.singleMessage}>
          <h1>Test</h1>
        </div>
      </div>
    )
  }
}

export default Messages
