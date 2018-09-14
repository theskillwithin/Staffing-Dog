import React, { Component } from 'react'
import { func, array } from 'prop-types'
import Select from 'react-select'

class Filter extends Component {
  onChange = value => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    const { onChange, ...props } = this.props

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
      control: (styles, state) => ({
        ...styles,
        background: state.isFocused ? '#0072FF' : 'rgb(187, 193, 209);',
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
      dropdownIndicator: (styles, { isFocused }) => ({
        ...styles,
        color: isFocused ? 'white' : 'black',
        paddingRight: '1em',
      }),
      indicatorSeparator: () => ({ display: 'none' }),
      placeholder: styles => ({ ...styles, color: 'rgb(31, 39, 64)' }),
      singleValue: (styles, { isFocused }) => ({
        ...styles,
        color: isFocused ? 'white' : 'rgb(31, 39, 64)',
      }),
    }

    return (
      <Select
        options={this.props.options}
        styles={customStyles}
        placeholder="Distance"
        onChange={value => this.onChange(value)}
        {...props}
      />
    )
  }
}

Filter.propTypes = {
  onChange: func.isRequired,
  options: array.isRequired,
}

export default Filter
