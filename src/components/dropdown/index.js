import React, { Component } from 'react'
import { bool, func, string, object, number, oneOfType } from 'prop-types'
import Select from 'react-select'

class Dropdown extends Component {
  state = {
    open: false,
  }

  onChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  open = () => {
    this.setState({ open: true })
  }

  close = () => {
    this.setState({ open: false })
  }

  render() {
    const { onChange, ...props } = this.props

    const value =
      this.props.value && typeof this.props.value === 'string'
        ? { label: this.props.value, value: this.props.value }
        : value

    const customStyles = {
      option: (base, state) => ({
        ...base,
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      }),
      control: styles => ({
        ...styles,
        cursor: 'pointer',
        height: this.props.height,
        zIndex: this.state.open ? 90 : 'inherit',
        minWidth: 100,
        width: this.props.width ? this.props.width : 'auto',
      }),
      value: styles => ({ ...styles, background: '#0072FF', color: 'white' }),
      valueContainer: styles => ({ ...styles, paddingLeft: '1em' }),
      dropdownIndicator: styles => ({
        ...styles,
        padding: this.props.small ? 0 : 8,
      }),
      indicatorSeparator: () => ({ display: 'none' }),
      singleValue: styles => ({ ...styles, top: this.props.small ? '54%' : '51%' }),
    }

    return (
      <Select
        styles={customStyles}
        onChange={this.onChange}
        placeholder={props.placeholder || props.label}
        onMenuOpen={this.open}
        onMenuClose={this.close}
        value={value}
        {...props}
      />
    )
  }
}

Dropdown.defaultProps = {
  outlined: true,
  value: '',
  height: 48,
}

Dropdown.propTypes = {
  onChange: func,
  outlined: bool,
  value: oneOfType([string, object]),
  height: number,
}

export default Dropdown
