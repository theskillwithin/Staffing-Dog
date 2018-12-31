import React from 'react'
import DatePicker from '@component/date_picker'
import Dropdown from '@component/Dropdown'
import Switch from '@component/switch'
import { timesOfDay, minBy15 } from '@sdog/utils/dates'

import theme from './theme.css'

const time = timesOfDay(false, true).map(hour => ({ label: hour, value: hour }))
const min = minBy15.map(hour => ({ label: hour, value: hour }))

class Exceptions extends React.Component {
  state = {
    form: {
      switch: false,
      startTime: time[0],
      startMin: min[0],
      endTime: time[0],
      endMin: min[0],
    },
  }

  handleChange(input, value) {
    this.setState(state => ({ form: { ...state.form, [input]: value } }))
  }

  render() {
    return (
      <div className={theme.root}>
        <h4>Add a new availability exception</h4>

        <div className={theme.exceptionRow}>
          <DatePicker label="Exception Start" />
          <Dropdown
            value={this.state.form.startTime}
            onChange={value => this.handleChange('startTime', value)}
            options={time}
            height={33}
            width={84}
            small
          />
          <span>:</span>
          <Dropdown
            value={this.state.form.startMin}
            onChange={value => this.handleChange('startMin', value)}
            options={min}
            height={33}
            width={61}
            small
          />
        </div>

        <div className={theme.exceptionRow}>
          <DatePicker label="Exception End" />
          <Dropdown
            value={this.state.form.endTime}
            onChange={value => this.handleChange('endTime', value)}
            options={time}
            height={33}
            width={84}
            small
          />
          <span>:</span>
          <Dropdown
            value={this.state.form.endMin}
            onChange={value => this.handleChange('endMin', value)}
            options={min}
            height={33}
            width={61}
            small
          />
        </div>

        <div className={theme.inputRow}>
          <span>Available</span>
          <Switch
            checked={this.state.form.switch}
            onChange={value => this.handleChange('switch', value)}
          >
            {this.state.form.switch ? 'Yes' : 'No'}
          </Switch>
        </div>
      </div>
    )
  }
}

export default Exceptions
