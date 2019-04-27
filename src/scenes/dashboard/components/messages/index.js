import React from 'react'
import { func, bool, array, number, string, shape, arrayOf, oneOfType } from 'prop-types'
import { connect } from 'react-redux'
import Textarea from 'react-textarea-autosize'
import map from 'lodash/map'
import get from 'lodash/get'
import find from 'lodash/find'
import clsx from 'clsx'
import moment from 'moment'

import ErrorBoundry from '@sdog/components/error_boundry'
import Card from '@sdog/components/card'
import ProfilePhotoSVG from '@sdog/components/svg/ProfilePhoto'
// import ReplySVG from '@sdog/components/svg/Reply'
import Arrow from '@sdog/components/svg/Arrow'
import SendIcon from '@sdog/components/svg/Send'
import MessagesIcon from '@sdog/components/svg/Chat'
import Button from '@sdog/components/button'
import Dropdown from '@sdog/components/dropdown'
import {
  getUserThreads,
  getMessageFriendList,
  sendUserMessage,
  findThreads,
  findThreadsLoading,
  findThreadsError,
  findFriendList,
  findFriendListLoading,
  findFriendListError,
} from '@sdog/store/messages'
import { findUserId } from '@sdog/store/user'

import theme from './theme.css'

class Messages extends React.Component {
  static propTypes = {
    getUserThreads: func.isRequired,
    getMessageFriendList: func.isRequired,
    sendUserMessage: func.isRequired,
    threads: arrayOf(
      shape({
        id: oneOfType([string, number]),
        messages: array,
      }),
    ).isRequired,
    threadsLoading: bool,
    threadsError: oneOfType([string, bool]),
    userId: string.isRequired,
    friendList: array,
  }

  static deafultProps = {
    friendList: [],
  }

  state = {
    active: false,
    message: '',
    quickReply: null,
    users: '',
    selectedUser: '',
  }

  componentDidMount() {
    this.props.getUserThreads()
    this.props.getMessageFriendList()
  }

  viewThread = threadId => this.setState({ active: threadId, quickReply: null })

  goBack = () => this.setState({ active: false, message: '' })

  quickReply = (e, quickReply) => {
    e.stopPropagation()
    if (quickReply === this.state.quickReply) {
      return this.setState({ quickReply: null, message: '' })
    }
    return this.setState({ quickReply, message: '' })
  }

  showNewMessage = () => this.setState({ active: 'new', quickReply: null })

  submitMessage = () => {
    const {
      message,
      selectedUser: { value: friendId = false },
    } = this.state

    const threadId = this.state.active

    const success = () => {
      if (this.state.active === 'new') {
        this.viewThread('')
        // this.viewThread(this.props.threads)
        setTimeout(() => {
          this.props.getUserThreads()
        }, 500)
      }
      this.setState({ message: '' })
    }

    this.props.sendUserMessage(
      {
        message,
        ...(threadId === 'new' ? { friendId } : { threadId }),
      },
      success(),
    )
  }

  handleChange = message => this.setState({ message })

  handleUsersChange = selectedUser => this.setState({ selectedUser })

  render() {
    const { active } = this.state
    const { threads } = this.props
    const activeThread = active ? find(threads, thread => thread.id === active) : {}
    const messages = (activeThread && activeThread.recent) || []

    const selectUserOptions = this.props.friendList.map(user => ({
      label: `${user.contact_first_name || user.first_name} ${user.contact_last_name ||
        user.last_name}${user.practice_name ? ' - ' : ''}${
        user.practice_name ? user.practice_name : ''
      }`,
      value: user.user_id,
    }))

    return (
      <ErrorBoundry>
        <Card
          title="Messages"
          icon={MessagesIcon}
          action="New Message"
          actionCb={this.showNewMessage}
          actionProps={{ round: true, secondary: true, short: true }}
          type="overflowHidden"
        >
          <div className={clsx(theme.threadsContainer, active && theme.active)}>
            <div className={theme.threads}>
              {threads && threads.length ? (
                map(threads, thread => {
                  const findOtherUserIsParticipant =
                    thread &&
                    thread.initiator &&
                    thread.initiator.id === this.props.userId

                  const findOtherUser = !findOtherUserIsParticipant
                    ? `${thread.initiator &&
                        thread.initiator.first_name} ${thread.initiator &&
                        thread.initiator.last_name}`
                    : `${thread.participant &&
                        thread.participant.first_name} ${thread.participant &&
                        thread.participant.last_name}`

                  const practiceName = !findOtherUserIsParticipant
                    ? get(thread, 'initiator.practice_name', false)
                    : get(thread, 'participant.practice_name', false)

                  return (
                    <div
                      key={`threads-${thread.id}`}
                      className={clsx(
                        theme.threadContainer,
                        this.state.quickReply === thread.id && theme.quickReplyActive,
                      )}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => this.viewThread(thread.id)}
                        className={clsx(theme.thread, !thread.read && theme.unread)}
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
                            <h6>{findOtherUser}</h6>
                            {practiceName && <span>{practiceName}</span>}
                          </div>
                          <div className={theme.short}>
                            <p>{get(thread.recent, '[0].message', '')}</p>
                          </div>
                        </div>

                        <div className={theme.right}>
                          <div className={theme.date}>
                            {moment(thread.recent[0].sent_at).format('DD/MM/YYYY')}
                          </div>
                          {thread.recent &&
                            thread.recent.length &&
                            thread.recent.length > 1 && (
                              <div className={theme.threadCount}>
                                {thread.recent.length}
                              </div>
                            )}
                          {/* <button
                            type="button"
                            className={theme.reply}
                            onClick={e => this.quickReply(e, thread.id)}
                          >
                            <ReplySVG />
                          </button> */}
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
                            <Button primary round onClick={this.submitMessage}>
                              Send
                              <SendIcon />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <div className={theme.empty}>
                  <h4>No Messages</h4>
                </div>
              )}
            </div>

            <div className={theme.messages}>
              <button type="button" className={theme.back} onClick={this.goBack}>
                <Arrow direction="left" />
              </button>

              {this.state.active === 'new' && this.props.friendList.length >= 1 && (
                <div className={theme.users}>
                  <Dropdown
                    value={this.state.selectedUser}
                    placeholder="Select User..."
                    onChange={this.handleUsersChange}
                    options={selectUserOptions}
                  />
                </div>
              )}

              {messages && messages.length
                ? map(messages, message => {
                    const sentByInitiator =
                      activeThread.initiator &&
                      activeThread.initiator.id === message.sent_by
                    // const sentByParticipant =
                    //   activeThread.participant &&
                    //   activeThread.participant.id === message.sent_by

                    const sentByName = sentByInitiator
                      ? `${activeThread.initiator.first_name} ${
                          activeThread.initiator.last_name
                        }`
                      : `${activeThread.participant.first_name} ${
                          activeThread.participant.last_name
                        }`

                    // const sentByNameLocation = sentByInitiator
                    // ? `${activeThread.initiator.first_name} ${
                    //     activeThread.initiator.last_name
                    //   }`
                    // : `${activeThread.participant.first_name} ${
                    //     activeThread.participant.last_name
                    //   }`

                    return (
                      <div
                        key={`message-${message.sent_by}-${message.sent_at}`}
                        className={clsx(theme.message, !message.read && theme.unread)}
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
                            <h6>{sentByName}</h6>
                            {message.location && <span>{message.location}</span>}
                          </div>

                          <div className={theme.short}>
                            <p>{message.message && message.message}</p>
                          </div>
                        </div>

                        <div className={theme.right}>
                          <div className={theme.date}>
                            {moment(message.sent_at).format('DD/MM/YYYY')}
                          </div>

                          {message.threadCount && message.threadCount > 1 && (
                            <div className={theme.threadCount}>{message.threadCount}</div>
                          )}
                        </div>
                      </div>
                    )
                  })
                : null}

              {this.props.friendList.length ? (
                <div className={theme.respond}>
                  <Textarea
                    placeholder="Type message here"
                    value={this.state.message}
                    onChange={e => this.handleChange(e.target.value)}
                  />
                  <Button primary round onClick={this.submitMessage}>
                    Send
                    <SendIcon />
                  </Button>
                </div>
              ) : (
                <div className={theme.empty}>
                  <h4 style={{ maxWidth: '80%' }}>
                    Once you have accepted a job you be able to message with the office of
                    the job.
                  </h4>
                </div>
              )}
            </div>
          </div>
        </Card>
      </ErrorBoundry>
    )
  }
}

export const mapStateToProps = state => ({
  threads: findThreads(state),
  threadsLoading: findThreadsLoading(state),
  threadsError: findThreadsError(state),
  userId: findUserId(state),
  friendList: findFriendList(state),
  friendListLoading: findFriendListLoading(state),
  friendListError: findFriendListError(state),
})

export const mapActionsToProps = { getUserThreads, getMessageFriendList, sendUserMessage }

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Messages)
