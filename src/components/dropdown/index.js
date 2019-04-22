import React, { useState } from 'react'
import { bool, func, string, object, array, number, oneOfType } from 'prop-types'
import Select from 'react-select'

const Dropdown = ({ onChange, value, invalid, ...props }) => {
  const [isOpen, setOpen] = useState(false)

  const internalOnChange = dropdownValue => {
    if (onChange) onChange(dropdownValue)
  }

  const customStyles = {
    option: (base, state) => ({
      ...base,
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      minWidth: 'auto',
    }),
    control: styles => ({
      ...styles,
      cursor: 'pointer',
      height: props.height,
      zIndex: isOpen ? 90 : 'inherit',
      minWidth: 'auto',
      minHeight: props.height ? props.height : 38,
      width: props.width ? props.width : 'auto',
      border: invalid ? '1px solid #ed4f32' : '1px solid rgba(152, 160, 178, 0.54)',
      borderRadius: 3,
      boxShadow: 0,
      fontWeight: 500,
      ':hover': {
        border: invalid ? '1px solid #ed4f32' : styles.border,
      },
    }),
    value: styles => ({ ...styles, background: '#0072FF', color: 'rgb(31, 39, 64)' }),
    selectContainer: styles => ({ ...styles, minWidth: 'auto' }),
    valueContainer: styles => ({
      ...styles,
      paddingLeft: '1em',
      minWidth: 'auto',
      width: props.width ? props.width : 'auto',
    }),
    placeholder: styles => ({
      ...styles,
      color: invalid ? '#ed4f32' : 'rgb(187, 193, 209)',
    }),
    dropdownIndicator: styles => ({
      ...styles,
      padding: props.small ? 4 : 8,
      color: invalid ? '#ed4f32' : styles.color,
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    singleValue: styles => ({
      ...styles,
      marginLeft: props.small ? '-4px' : '0',
      fontWeight: 400,
      color: 'rgb(31, 39, 64)',
      minWidth: 'auto',
    }),
  }

  return (
    <Select
      styles={customStyles}
      onChange={internalOnChange}
      placeholder={props.placeholder || props.label}
      onMenuOpen={() => setOpen(true)}
      onMenuClose={() => setOpen(false)}
      value={value}
      isDisabled={props.disabled}
      isMulti={props.isMulti}
      {...props}
    />
  )
}

Dropdown.propTypes = {
  onChange: func,
  outlined: bool,
  value: oneOfType([string, object, array]),
  height: number,
  width: oneOfType([bool, number]),
  small: bool,
  isMulti: bool,
  placeholder: string,
  label: string,
  disabled: bool,
  invalid: bool,
}

Dropdown.defaultProps = {
  outlined: true,
  value: '',
  height: 48,
  width: false,
  small: false,
  isMulti: false,
  placeholder: '',
  label: 'Select...',
  disabled: false,
  invalid: false,
}

export default Dropdown
