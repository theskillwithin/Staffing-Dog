import React, { Component } from 'react'
import { bool, func, string, object, number, oneOfType } from 'prop-types'
import Select from 'react-select'

class Dropdown extends Component {
  static propTypes = {
    onChange: func,
    outlined: bool,
    value: oneOfType([string, object]),
    height: number,
    width: oneOfType([bool, number]),
    small: bool,
  }

  static defaultProps = {
    outlined: true,
    value: '',
    height: 48,
    width: false,
    small: false,
  }

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
        border: '1px solid rgba(152, 160, 178, 0.54)',
        borderRadius: 3,
        boxShadow: 0,
        fontWeight: 500,
      }),
      value: styles => ({ ...styles, background: '#0072FF', color: 'rgb(31, 39, 64)' }),

      valueContainer: styles => ({
        ...styles,
        paddingLeft: '1em',
      }),
      placeholder: styles => ({
        ...styles,
        color: 'rgb(187, 193, 209)',
      }),
      dropdownIndicator: styles => ({
        ...styles,
        padding: this.props.small ? 4 : 8,
      }),
      indicatorSeparator: () => ({ display: 'none' }),
      singleValue: styles => ({
        ...styles,
        marginLeft: this.props.small ? '-4px' : '0',
        fontWeight: 500,
        color: 'rgb(31, 39, 64)',
      }),
    }

    return (
      <Select
        styles={customStyles}
        onChange={this.onChange}
        placeholder={props.placeholder || props.label}
        onMenuOpen={this.open}
        onMenuClose={this.close}
        value={value}
        isDisabled={props.disabled}
        {...props}
      />
    )
  }
}

export default Dropdown
