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
        backgroundColor: selected ? 'white' : 'transparent',
        borderRadius: 10,
        border: '1px solid white',
        content: '""',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
      },
    })

    const customStyles = {
      option: (base, state) => ({
        ...base,
        ...dot(state.isSelected),
        color: 'white',
        background: state.isFocused ? 'teal' : '#0072FF',
        padding: 5,
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      }),
      menu: styles => ({
        ...styles,
        background: '#0072FF',
        borderRadius: '0 0 20px 20px',
        paddingBottom: 20,
      }),
      control: (styles, state) => ({
        ...styles,
        background: state.isFocused ? '#0072FF' : 'rgb(187, 193, 209);',
        color: 'white',
        borderRadius: '20px',
      }),
      value: styles => ({ ...styles, background: '#0072FF', color: 'white' }),
      dropdownIndicator: (styles, { isFocused }) => ({
        ...styles,
        color: isFocused ? 'white' : 'black',
      }),
      indicatorSeparator: () => ({ display: 'none' }),
    }
    // placeholder: styles => ({ ...styles, color: 'white', }),
    // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })

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
