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

export default class Experimental extends Component {
  state = {
    value: defaultOptions[0],
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    const displayValue = value && value.value ? value.value.toString() : 'null'
    return (
      <div>
        <pre>Value: {displayValue}</pre>
        <DatePicker
          value={value}
          onChange={this.handleChange}
          defaultOptions={defaultOptions}
          createOptionForDate={createOptionForDate}
        />
      </div>
    )
  }
}
