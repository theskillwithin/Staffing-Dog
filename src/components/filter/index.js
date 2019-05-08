import React, { useState } from 'react'
import { func, array, string } from 'prop-types'
import Select from 'react-select'

import theme from './theme.css'

const Filter = ({ onChange, options, placeholder, ...props }) => {
  const [open, setOpen] = useState(false)

  const handleOnChange = value => {
    if (onChange) {
      onChange(value)
    }
  }

  const openMenu = () => {
    setOpen(true)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  const dot = selected => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      content: selected ? `url('/images/check.svg')` : '""',
      display: 'block',
      marginRight: '0.8em',
      height: 18,
      width: 11,
      color: 'white',
    },
  })

  const customStyles = {
    option: (base, state) => ({
      ...base,
      ...dot(state.isSelected),
      color: 'white',
      background: state.isFocused || state.isSelected ? 'rgb(0, 152, 253)' : '#0072FF',
      padding: 5,
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      paddingLeft: '1em',
      fontWeight: 500,
      fontSize: 14,
      ':active': {
        backgroundColor: 'rgb(0, 159, 253)',
      },
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
      background: open ? '#0072FF' : 'rgb(187, 193, 209);',
      color: 'white',
      borderRadius: '20px',
      cursor: 'pointer',
      zIndex: 5,
      boxShadow: 'none',
      borderWidth: 0,
      minHeight: 40,
      fontWeight: 500,
      fontSize: 14,
    }),
    value: styles => ({ ...styles, background: '#0072FF', color: 'white' }),
    valueContainer: styles => ({ ...styles, paddingLeft: '1.4em' }),
    dropdownIndicator: styles => ({
      ...styles,
      color: open ? 'white !important' : 'black !important',
      paddingRight: '1em',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    placeholder: styles => ({
      ...styles,
      color: open ? 'white' : 'rgb(31, 39, 64)',
    }),
    singleValue: styles => ({
      ...styles,
      color: open ? 'white' : 'rgb(31, 39, 64)',
    }),
  }

  return (
    <div className={theme.container}>
      <Select
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        onChange={handleOnChange}
        onMenuOpen={openMenu}
        onMenuClose={closeMenu}
        isSearchable={false}
        maxMenuHeight={320}
        {...props}
      />
    </div>
  )
}

Filter.propTypes = {
  onChange: func.isRequired,
  options: array.isRequired,
  placeholder: string,
}

export default Filter
