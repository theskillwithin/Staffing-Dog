import React from 'react'
import classnames from 'classnames'
import Card from '@component/card'
import Switch from '@component/switch'
import Dropdown from '@component/Dropdown'

import theme from './theme.css'


class JobSchedule extends React.Component {
  state = {
    form: {
      switch: false,
      daysScheduled: false,
      schedule: {
        sun: {
          active: false,
          from: '7:00',
          to: '8:00',
        },
        mon: {
          active: true,
          from: '7:00',
          to: '7:00',
        },
        tue: {
          active: true,
          from: '7:00',
          to: '7:00',
        },
        wed: {
          active: true,
          from: '7:00',
          to: '7:00',
        },
        thu: {
          active: true,
          from: '7:00',
          to: '7:00',
        },
        fri: {
          active: true,
          from: '7:00',
          to: '7:00',
        },
        sat: {
          active: true,
          from: '7:00',
          to: '7:00',
        },
      },
    },
  }

  updateSchedule = () => console.log('update schedule')

  days = [
    { label: '30 Days', value: '30' },
    { label: '60 Days', value: '60' },
    { label: '90 Days', value: '90' },
    { label: '120 Days', value: '120' },
  ]

  time = [
    { label: '7:00 am', value: '7:00' },
    { label: '7:30 am', value: '7:30' },
    { label: '8:00 am', value: '8:00' },
    { label: '8:30 am', value: '8:30' },
  ]

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  handleToggle() {
    this.setState({ form: { ...this.state.form, switch: !this.state.form.switch } })
  }

  handleChange(input, value) {
    this.setState({ form: { ...this.state.form, [input]: value } })
  }

  handleScheduleChange(type, value, day) {
    const { form, form: { schedule } } = this.state
    this.setState({
      form: {
        ...form, schedule: { ...schedule, [day]: { ...schedule[day], [type]: value } },
      },
    })
  }

  render() {
    const { state } = this
    return (
      <Card
        icon="date_range"
        title="Job Schedule"
        action="Update Schedule"
        actionCb={this.updateSchedule}
        actionProps={{ round: true, secondary: true, short: true }}
      >
        <div className={theme.inputRow}>
          <span>Same day job requests</span>
          <Switch
            checked={state.form.switch}
            onChange={() => this.handleToggle()}
            flip
          >
            {state.form.switch ? 'Yes' : 'No'}
          </Switch>
        </div>
        <div className={theme.inputRow}>
          <span>Days out I can be scheduled</span>
          <Dropdown
            value={state.daysScheduled}
            onChange={value => this.handleChange('daysScheduled', value)}
            options={this.days}
            box={false}
          />
        </div>
        <div className={theme.scheduler}>
          {this.daysOfWeek.map((day, index) => (
            <div
              key={`${index + 1}`}
              className={
                classnames(theme.day, state.form.schedule[day.toLowerCase()].active && theme.active)
              }
            >
              <button
                onClick={() => this.handleScheduleChange('active', !state.form.schedule[day.toLowerCase()].active, day.toLowerCase())}
              >
                {day}
              </button>
              <Dropdown
                value={state.form.schedule[day.toLowerCase()].from}
                onChange={value => this.handleScheduleChange('from', value, day.toLowerCase())}
                options={this.time}
                box={false}
              />
              Arrow
              <Dropdown
                value={state.form.schedule[day.toLowerCase()].to}
                onChange={value => this.handleScheduleChange('to', value, day.toLowerCase())}
                options={this.time}
                box={false}
              />
            </div>
          ))}
        </div>
      </Card>
    )
  }
}

export default JobSchedule
