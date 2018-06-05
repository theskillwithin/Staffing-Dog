import React from 'react'
import { func, array, number, string, shape, arrayOf, oneOfType } from 'prop-types'
import { connect } from 'react-redux'
import Card from '@component/card'
import Textarea from 'react-textarea-autosize'
import map from 'lodash/map'
import find from 'lodash/find'
import classnames from 'classnames'
import ProfilePhotoSVG from '@component/svg/ProfilePhoto'
import ReplySVG from '@component/svg/Reply'
import Icon from '@component/icon'
import Button from '@component/button'
import Dropdown from '@component/dropdown'
import { getThreads, getMessages, findThreads } from '@store/messages'

import theme from './theme.css'

class Messages extends React.Component {
  state = {
    active: false,
    message: '',
    quickReply: null,
    users: undefined,
  }

  componentDidMount() {
    this.props.getThreads()
  }

  usersList = [
    { label: 'cointilt', value: 'cointilt' },
    { label: 'goot', value: 'goot' },
    { label: 'theskillwithin', value: 'theskillwithin' },
  ]

  handleClick = threadId => {
    // retrieve selected msg data
    this.props.getMessages(threadId)
    this.setState({ active: threadId, quickReply: null })
  }

  back = () => {
    this.setState({ active: false, message: '' })
  }

  quickReply = (e, quickReply) => {
    e.stopPropagation()
    if (quickReply === this.state.quickReply) {
      return this.setState({ quickReply: null, message: '' })
    }
    return this.setState({ quickReply, message: '' })
  }

  newMessage = () => {
    this.setState({ active: 'new', quickReply: null })
  }

  handleChange = message => {
    this.setState({ message })
  }

  handleUsersChange = users => {
    this.setState({ users })
  }

  render() {
    const { active } = this.state
    const { threads } = this.props
    const activeThread = active ? find(threads, thread => thread.id === active) : {}
    const messages = (activeThread && activeThread.messages) || []

    return (
      <Card
        title="Messages"
        icon="chat"
        action="New Message"
        actionCb={this.newMessage}
        actionProps={{ round: true, secondary: true, short: true }}
        type="overflowHidden"
      >
        <div className={classnames(theme.threadsContainer, active && theme.active)}>
          <div className={theme.threads}>
            {map(threads, thread => (
              <div
                key={thread.id}
                className={classnames(
                  theme.threadContainer,
                  this.state.quickReply === thread.id && theme.quickReplyActive,
                )}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => this.handleClick(thread.id)}
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
                      <p>{thread.short && thread.short}</p>
                    </div>
                  </div>
                  <div className={theme.right}>
                    <div className={theme.date}>{thread.date}</div>
                    {thread.threadCount &&
                      thread.threadCount > 1 && (
                        <div className={theme.threadCount}>{thread.threadCount}</div>
                      )}
                    <button
                      className={theme.reply}
                      onClick={e => this.quickReply(e, thread.id)}
                    >
                      <ReplySVG />
                    </button>
                  </div>
                </div>
                {this.state.quickReply === thread.id && (
                  <div className={theme.quickReply}>
                    <div className={theme.respond}>
                      <Textarea
                        placeholder="Type message here"
                        value={this.state.message}
                        onChange={e => this.handleChange(e.target.value)}
                      />
                      <Button primary round>
                        <Icon use="send" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={theme.messages}>
            <button className={theme.back} onClick={this.back}>
              <Icon use="arrow_back" />
            </button>
            {this.state.active === 'new' && (
              <div className={theme.users}>
                <h3>Send To: </h3>
                <Dropdown
                  value={this.state.users}
                  onChange={value => this.handleUsersChange(value)}
                  options={this.usersList}
                  box={false}
                />
              </div>
            )}
            {map(messages, message => (
              <div
                key={message.id}
                className={classnames(theme.message, !message.read && theme.unread)}
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
                    <p>{message.message && message.message}</p>
                  </div>
                </div>
                <div className={theme.right}>
                  <div className={theme.date}>{message.date}</div>
                  {message.threadCount &&
                    message.threadCount > 1 && (
                      <div className={theme.threadCount}>{message.threadCount}</div>
                    )}
                </div>
              </div>
            ))}
            <div className={theme.respond}>
              <Textarea
                placeholder="Type message here"
                value={this.state.message}
                onChange={e => this.handleChange(e.target.value)}
              />
              <Button primary round>
                <Icon use="send" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

Messages.propTypes = {
  getThreads: func.isRequired,
  getMessages: func.isRequired,
  threads: arrayOf(
    shape({
      id: oneOfType([string, number]),
      messages: array,
    }),
  ).isRequired,
}

export default connect(
  state => ({
    threads: findThreads(state),
  }),
  { getThreads, getMessages },
)(Messages)
