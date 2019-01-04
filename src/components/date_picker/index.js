import React, { Component } from 'react'
import moment from 'moment'
import chrono from 'chrono-node'

import DatePicker from './react-select-date-picker'

const createOptionForDate = d => {
  const date = moment.isMoment(d) ? d : moment(d)
  return {
    date,
    value: date.toDate(),
    label: date.calendar(null, {
      sameDay: '[Today] (Do MMM YYYY)',
      nextDay: '[Tomorrow] (Do MMM YYYY)',
      nextWeek: '[Next] (Do MMM YYYY)',
      lastDay: 'Do MMM YYYY',
      lastWeek: 'Do MMM YYYY',
      sameElse: 'Do MMMM YYYY',
    }),
  }
}

const dayOptions = ['today', 'tomorrow'].map(i =>
  createOptionForDate(chrono.parseDate(i)),
)

const createCalendarOptions = (date = new Date()) => {
  const makeArray = Array.from({
    length: moment(date).daysInMonth(),
  })
  const daysInMonth = makeArray.map((_, i) => {
    const d = moment(date).date(i + 1)
    return { ...createOptionForDate(d), display: 'calendar' }
  })
  return {
    label: moment(date).format('MMMM YYYY'),
    options: daysInMonth,
  }
}

const defaultOptions = [...dayOptions, createCalendarOptions()]

class DatePickerWrapper extends Component {
  state = {
    value: defaultOptions[0],
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    // const displayValue = value && value.value ? value.value.toString() : 'null'
    return (
      <div>
        {/* <div>Value: {displayValue}</div> */}
        <DatePicker
          value={value}
          onChange={this.handleChange}
          defaultOptions={defaultOptions}
          createOptionForDate={createOptionForDate}
          createCalendarOptions={createCalendarOptions}
          width={222}
        />
      </div>
    )
  }
}

export default DatePickerWrapper
