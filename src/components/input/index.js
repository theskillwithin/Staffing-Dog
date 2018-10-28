import React, { Component } from 'react'
import { func, string, object, bool } from 'prop-types'
import classnames from 'classnames'

import s from './theme.css'

class Input extends Component {
  id = `input-atom-id-${Math.random()
    .toString()
    .slice(2)}`

  onChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const { label, id, theme, outlined, textarea, onChange, type, ...props } = this.props

    return (
      <div className={theme}>
        <input
          id={this.id}
          className={classnames(s.input, outlined && s.outlined)}
          onChange={this.onChange}
          type={textarea ? 'textarea' : type}
          {...props}
        />
        <label className={s.root} htmlFor={this.id}>
          {label}
        </label>
      </div>
    )
  }
}

Input.defaultProps = {
  outlined: true,
  textarea: false,
  type: 'input',
}

Input.propTypes = {
  label: string.isRequired,
  id: string,
  onChange: func,
  theme: object,
  outlined: bool,
  textarea: bool,
  type: string,
}

export default Input
