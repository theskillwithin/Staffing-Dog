import React from 'react'
import { bool, node, oneOfType } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

class Alert extends React.Component {
  state = { stage: this.props.simple ? 2 : 0, isClose: false }

  componentDidMount() {
    if (this.props.autoClose) {
      setTimeout(() => {
        this.setState({ isClose: true })
      }, 10000)
    }
    if (this.props.simple) return

    setTimeout(() => {
      if (this.unmounted) return
      requestAnimationFrame(() => {
        this.setState({ stage: 1 })
      })
      setTimeout(() => {
        if (this.unmounted) return
        requestAnimationFrame(() => {
          this.setState({ stage: 2 })
        })
      }, 300)
    }, 10)
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  render() {
    const { error, success, inline, closeButton, children } = this.props
    const { isClose } = this.state
    if (!children) return null
    if (isClose) return null

    return (
      <div
        className={clsx(
          theme.root,
          error && theme.error,
          success && theme.success,
          inline && theme.inline,
          theme[`stage${this.state.stage}`],
        )}
      >
        <span>{children}</span>
        {closeButton ? (
          <button
            className={theme.closeButton}
            onClick={() => this.setState({ isClose: true })}
            type="button"
          >
            &times;
          </button>
        ) : null}
      </div>
    )
  }
}

Alert.defaultProps = {
  simple: false,
  autoClose: false,
  closeButton: false,
  error: false,
  success: false,
  inline: false,
  children: null,
}

Alert.propTypes = {
  simple: bool,
  autoClose: bool,
  closeButton: bool,
  error: bool,
  success: bool,
  inline: bool,
  children: oneOfType([null, node]),
}

export default Alert
