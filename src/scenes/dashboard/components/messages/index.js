import React from 'react'
import map from 'lodash/map'
import classnames from 'classnames'
import ProfilePhotoSVG from '@component/svg/ProfilePhoto'
import ReplySVG from '@component/svg/Reply'
import Icon from '@component/icon'

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

  threads = [
    {
      id: 1111,
      threadId: 111,
      from: 'Wes Bos',
      location: 'React Dental',
      date: '5/16/18',
      order: 0,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi asperiores error cupiditate doloribus obcaecati sint blanditiis, maxime quae delectus quibusdam aperiam nam ab? Minus repellendus aut, asperiores facere delectus blanditiis!',
      read: false,
    },
    {
      id: 2222,
      threadId: 222,
      from: 'Me',
      date: '5/16/18',
      order: 0,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi asperiores error cupiditate doloribus obcaecati sint blanditiis, maxime quae delectus quibusdam aperiam nam ab? Minus repellendus aut, asperiores facere delectus blanditiis!',
      read: false,
    },
    {
      id: 3333,
      threadId: 333,
      from: 'Wes Bos',
      location: 'React Dental',
      date: '5/16/18',
      order: 0,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi asperiores error cupiditate doloribus obcaecati sint blanditiis, maxime quae delectus quibusdam aperiam nam ab? Minus repellendus aut, asperiores facere delectus blanditiis!',
      read: false,
    },
  ]

  handleClick = active => {
    // retrieve selected msg data
    this.setState({ active })
  }

  back = () => {
    this.setState({ active: false })
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
        <div className={theme.threads}>
          <button className={theme.back} onClick={this.back}>
            <Icon use="arrow_back" />
          </button>
          {map(this.threads, thread => (
            <div
              key={thread.id}
              className={classnames(theme.thread, !thread.read && theme.unread)}
            >
              <div className={theme.avatar}>
                {thread.avatar ? (
                  <img src={thread.avatar} alt="avatar" />
                ) : (
                  <ProfilePhotoSVG />
                )}
              </div>
              <div className={theme.middle}>
                <div className={theme.title}>
                  <h6>{thread.from}</h6>
                  {thread.location && <span>{thread.location}</span>}
                </div>
                <div className={theme.short}>
                  <p>{thread.message && thread.message}</p>
                </div>
              </div>
              <div className={theme.right}>
                <div className={theme.date}>{thread.date}</div>
                {thread.threadCount &&
                  thread.threadCount > 1 && (
                    <div className={theme.threadCount}>{thread.threadCount}</div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Messages
