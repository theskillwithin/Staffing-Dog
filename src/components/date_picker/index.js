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
      nextWeek: '[Next] dddd (Do MMM YYYY)',
      lastDay: '[Yesterday] (Do MMM YYYY)',
      lastWeek: '[Last] dddd (Do MMM YYYY)',
      sameElse: 'Do MMMM YYYY',
    }),
  }
}

const defaultOptions = ['today', 'tomorrow', 'yesterday'].map(i =>
  createOptionForDate(chrono.parseDate(i)),
)

const createCalendarOptions = (date = new Date()) => {
  // eslint-disable-next-line
  const makeArray = Array.apply(null, {
    length: moment(date).daysInMonth(),
  })
  // const makeArray = new Array(moment(date).daysInMonth())
  const daysInMonth = makeArray.map((_, i) => {
    const d = moment(date).date(i + 1)
    return { ...createOptionForDate(d), display: 'calendar' }
  })
  return {
    label: moment(date).format('MMMM YYYY'),
    options: daysInMonth,
  }
}

export default class Experimental extends Component {
  constructor(props) {
    super(props)
    defaultOptions.push(createCalendarOptions())
    this.state = {
      value: defaultOptions[0],
    }
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    const displayValue = value && value.value ? value.value.toString() : 'null'
    return (
      <div>
        <div>Value: {displayValue}</div>
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
