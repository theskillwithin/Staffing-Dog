import React from 'react'
import { string, func } from 'prop-types'
import DatePicker from 'react-date-picker'
import 'react-datepicker/dist/react-datepicker.css'

const ControlledDatePicker = ({ value, onChange, ...props }) => (
  <DatePicker selected={value} onChange={onChange} {...props} />
)

ControlledDatePicker.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
}

export default ControlledDatePicker
