import React from 'react'
import classnames from 'classnames'
import DatePicker from '@sdog/components/date_picker'
import Dropdown from '@sdog/components/dropdown'
import Switch from '@sdog/components/switch'
import Button from '@sdog/components/button'
import Arrow from '@sdog/components/svg/Arrow'
import { timesOfDay, minBy15 } from '@sdog/utils/dates'

import theme from './theme.css'

const time = timesOfDay(false, true).map(hour => ({ label: hour, value: hour }))
const min = minBy15.map(hour => ({ label: hour, value: hour }))

class Exceptions extends React.Component {
  list = [
    {
      id: 1,
      startDate: '7/4/2019',
      startTime: '5:00 am',
      endDate: '7/4/2019',
      endTime: '7:15 pm',
      type: 'blue',
    },
    {
      id: 2,
      startDate: '7/4/2019',
      startTime: '5:00 am',
      endDate: '7/4/2019',
      endTime: '7:15 pm',
      type: 'red',
    },
    {
      id: 3,
      startDate: '7/4/2019',
      startTime: '5:00 am',
      endDate: '7/4/2019',
      endTime: '7:15 pm',
      type: 'red',
    },
    {
      id: 4,
      startDate: '7/4/2019',
      startTime: '5:00 am',
      endDate: '7/4/2019',
      endTime: '7:15 pm',
      type: 'red',
    },
  ]

  state = {
    form: {
      switch: false,
      startTime: time[0],
      startMin: min[0],
      endTime: time[0],
      endMin: min[0],
    },
    delete: null,
  }

  handleChange = (input, value) => {
    this.setState(state => ({ form: { ...state.form, [input]: value } }))
  }

  toggleDelete = index => {
    this.setState({ delete: index })
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
          <div className={theme.available}>
            <span>Available</span>
            <Switch
              checked={this.state.form.switch}
              onChange={value => this.handleChange('switch', value)}
            >
              {this.state.form.switch ? 'Yes' : 'No'}
            </Switch>
          </div>
          <Button primary>Add Exception</Button>
        </div>
        {this.list &&
          this.list.length &&
          this.list.map(exception => (
            <div
              index={exception.id}
              className={classnames(
                theme.exception,
                exception.type && theme[exception.type],
              )}
            >
              {this.state.delete === exception.id && (
                <div className={theme.delete}>
                  <Button red>Confirm Delete</Button>
                </div>
              )}
              <span className={theme.startDate}>{exception.startDate}</span>
              <span className={theme.startTime}>{exception.startTime}</span>
              <Arrow />
              <span className={theme.endDate}>{exception.endDate}</span>
              <span className={theme.endTime}>{exception.endTime}</span>
              <button
                className={theme.close}
                type="button"
                onClick={() => this.toggleDelete(exception.id)}
              >
                &times;
              </button>
            </div>
          ))}
      </div>
    )
  }
}

export default Exceptions
