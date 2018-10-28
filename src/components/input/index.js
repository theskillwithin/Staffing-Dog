import React, { Component } from 'react'
import { func, string, bool, number, oneOfType } from 'prop-types'
import classnames from 'classnames'

import s from './theme.css'

class Input extends Component {
  id = `input-id-${Math.random()
    .toString()
    .slice(2)}`

  onChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const {
      label,
      id,
      theme,
      outlined,
      textarea,
      onChange,
      type,
      invalid,
      valid,
      value,
      disabled,
      ...props
    } = this.props

    return (
      <div
        className={classnames(
          s.root,
          theme,
          invalid && s.invalid,
          valid && s.valid,
          (textarea || type === 'textarea') && s.textarea,
          disabled && s.disabled,
        )}
      >
        <input
          id={this.id}
          className={classnames(
            s.input,
            outlined && s.outlined,
            value && value.length > 0 && s.filled,
          )}
          onChange={this.onChange}
          type={textarea ? 'textarea' : type}
          value={value}
          {...props}
        />
        <label className={s.label} htmlFor={this.id}>
          {label}
        </label>
      </div>
    )
  }
}

Input.defaultProps = {
  outlined: true,
  textarea: false,
  type: 'text',
  invalid: false,
  valid: false,
  disabled: false,
}

Input.propTypes = {
  label: string.isRequired,
  id: string,
  onChange: func,
  theme: string,
  outlined: bool,
  textarea: bool,
  type: string,
  invalid: bool,
  valid: bool,
  value: oneOfType([string, number]),
  disabled: bool,
}

export default Input
