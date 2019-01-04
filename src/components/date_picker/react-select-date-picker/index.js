import React, { Component } from 'react'
import { bool, array, func, number, object } from 'prop-types'
import chrono from 'chrono-node'
import Select from 'react-select'

import Group from './group'
import Option from './option'
import DropdownIndicator from './dropdownIndicator'

const suggestions = [
  'sunday',
  'saturday',
  'friday',
  'thursday',
  'wednesday',
  'tuesday',
  'monday',
  'december',
  'november',
  'october',
  'september',
  'august',
  'july',
  'june',
  'may',
  'april',
  'march',
  'february',
  'january',
  'tomorrow',
  'today',
].reduce((acc, str) => {
  for (let i = 1; i < str.length; i++) {
    acc[str.substr(0, i)] = str
  }
  return acc
}, {})

const suggest = str =>
  str
    .split(/\b/)
    .map(i => suggestions[i] || i)
    .join('')

class DatePicker extends Component {
  state = {
    options: this.props.defaultOptions,
    open: false,
  }

  open = () => {
    this.setState({ open: true })
  }

  close = () => {
    this.setState({ open: false })
  }

  handleInputChange = value => {
    if (!value) {
      this.setState({ options: this.props.defaultOptions })
      return
    }
    const date = chrono.parseDate(suggest(value.toLowerCase()))
    if (date) {
      this.setState({
        options: [
          this.props.createOptionForDate(date),
          this.props.createCalendarOptions(date),
        ],
      })
    } else {
      this.setState({
        options: [],
      })
    }
  }

  render() {
    const { value } = this.props
    const { options } = this.state
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
      menu: styles => ({
        ...styles,
        zIndex: 20,
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
      indicatorSeparator: () => ({ display: 'none' }),
      singleValue: styles => ({
        ...styles,
        marginLeft: this.props.small ? '-4px' : '0',
        fontWeight: 500,
        maxWidth: 'calc(100% - 2.7em)',
        color: 'rgb(31, 39, 64)',
      }),
    }
    return (
      <Select
        {...this.props}
        components={{ Group, Option, DropdownIndicator }}
        filterOption={null}
        isMulti={false}
        isOptionSelected={(o, v) => v.some(i => i.date.isSame(o.date, 'day'))}
        maxMenuHeight={380}
        onChange={this.props.onChange}
        onInputChange={this.handleInputChange}
        options={options}
        value={value}
        styles={customStyles}
        onMenuOpen={this.open}
        onMenuClose={this.close}
      />
    )
  }
}

DatePicker.propTypes = {
  defaultOptions: array.isRequired,
  createOptionForDate: func.isRequired,
  createCalendarOptions: func.isRequired,
  value: object.isRequired,
  height: number,
  width: number,
  small: bool,
  onChange: func.isRequired,
}

export default DatePicker
