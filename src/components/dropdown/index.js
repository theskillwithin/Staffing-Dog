import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import { Select } from 'rmwc/Select'

// import './styles.css'


class Dropdown extends Component {
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(
        e.target.value,
        e,
      )
    }
  }

  render() {
    const { onChange, ...props } = this.props

    return (
      <Select
        onChange={this.onChange}
        {...props}
      />
    )
  }
}

Dropdown.defaultProps = {
  box: true,
}

Dropdown.propTypes = {
  onChange: func,
  box: bool,
}

export default Dropdown
