import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import { TextField } from 'rmwc/TextField'

import './styles.css'

class Input extends Component {
  onChange = e => {
    if (this.props.onChange) {
      const ref = this.inputRef

      this.props.onChange(ref ? ref.value : null, ref, e)
    }
  }

  render() {
    const { onChange, ...props } = this.props

    return (
      <TextField
        inputRef={input => {
          this.inputRef = input
        }}
        onChange={this.onChange}
        {...props}
      />
    )
  }
}

Input.defaultProps = {
  outlined: true,
}

Input.propTypes = {
  outlined: bool,
  onChange: func,
}

export default Input
