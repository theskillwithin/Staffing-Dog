import React, { Component } from 'react'
import { func, array, string } from 'prop-types'
import Select from 'react-select'

class Filter extends Component {
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
    const dot = selected => ({
      alignItems: 'center',
      display: 'flex',
      ':before': {
        fontFamily: selected ? 'Material Icons' : 'Inherit',
        backgroundColor: selected ? 'white' : 'transparent',
        borderRadius: 10,
        border: '2px solid white',
        content: selected ? '"check"' : '""',
        WebkitFontFeatureSettings: 'liga',
        display: 'block',
        marginRight: '1em',
        height: 18,
        width: 18,
        color: '#0072FF',
      },
    })

    const customStyles = {
      option: (base, state) => ({
        ...base,
        ...dot(state.isSelected),
        color: 'white',
        background: state.isFocused ? 'rgb(0, 175, 253)' : '#0072FF',
        padding: 5,
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        paddingLeft: '1em',
      }),
      menu: styles => ({
        ...styles,
        background: '#0072FF',
        borderRadius: '0 0 20px 20px',
        paddingBottom: 20,
        paddingTop: 20,
        marginTop: -20,
      }),
      control: styles => ({
        ...styles,
        background: this.state.open ? '#0072FF' : 'rgb(187, 193, 209);',
        color: 'white',
        borderRadius: '20px',
        cursor: 'pointer',
        zIndex: 5,
        boxShadow: 'none',
        borderWidth: 0,
        minHeight: 40,
      }),
      value: styles => ({ ...styles, background: '#0072FF', color: 'white' }),
      valueContainer: styles => ({ ...styles, paddingLeft: '1em' }),
      dropdownIndicator: styles => ({
        ...styles,
        color: this.state.open ? 'white' : 'black',
        paddingRight: '1em',
      }),
      indicatorSeparator: () => ({ display: 'none' }),
      placeholder: styles => ({
        ...styles,
        color: this.state.open ? 'white' : 'rgb(31, 39, 64)',
      }),
      singleValue: styles => ({
        ...styles,
        color: this.state.open ? 'white' : 'rgb(31, 39, 64)',
      }),
    }

    return (
      <Select
        options={this.props.options}
        styles={customStyles}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        onMenuOpen={this.open}
        onMenuClose={this.close}
        {...this.props}
      />
    )
  }
}

Filter.propTypes = {
  onChange: func.isRequired,
  options: array.isRequired,
  placeholder: string,
}

export default Filter
