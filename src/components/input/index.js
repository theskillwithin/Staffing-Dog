import React, { Component } from 'react'
import { func, string, object, bool } from 'prop-types'
import classnames from 'classnames'

import s from './theme.css'

class Input extends Component {
  onChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const { label, id, theme, outlined, textarea, ...props } = this.props

    return (
      <div className={theme}>
        {!textarea ? (
          <React.Fragment>
            <input
              id={id || label.replace(/\s/g, '')}
              className={classnames(s.input, outlined && s.outlined)}
              onChange={this.onChange}
              {...props}
            />
            <label className={s.root} htmlFor={id || label.replace(/\s/g, '')}>
              {label}
            </label>
          </React.Fragment>
        ) : (
          <textarea />
        )}
      </div>
    )
  }
}

Input.defaultProps = {
  outlined: true,
  textarea: false,
}

Input.propTypes = {
  label: string.isRequired,
  id: string,
  onChange: func,
  theme: object,
  outlined: bool,
  textarea: bool,
}

export default Input
