import React, { Component } from 'react'
import { func, string, object } from 'prop-types'

import s from './theme.css'

class Input extends Component {
  onChange = e => {
    if (this.props.onChange) {
      const ref = this.inputRef

      this.props.onChange(ref ? ref.value : null, ref, e)
    }
  }

  render() {
    const { label, id, theme, ...props } = this.props

    return (
      <div className={theme}>
        <input
          id={id || label.replace(/\s/g, '')}
          inputRef={input => {
            this.inputRef = input
          }}
          className={s.input}
          onChange={this.onChange}
          {...props}
        />
        <label className={s.root} htmlFor={id || label.replace(/\s/g, '')}>
          {label}
        </label>
      </div>
    )
  }
}

Input.propTypes = {
  label: string.isRequired,
  id: string,
  onChange: func,
  theme: object,
}

export default Input
