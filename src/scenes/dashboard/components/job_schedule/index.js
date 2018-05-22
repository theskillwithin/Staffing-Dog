import React from 'react'
import Card from '@component/card'
import Switch from '@component/switch'
import Dropdown from '@component/dropdown'

import WeekRow from './weeks'
import Event from './event'
import theme from './theme.css'


class JobSchedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.handleScheduleChange = this.handleScheduleChange.bind(this)
  }

  updateSchedule = () => console.log('update schedule')

  days = [
    { label: '30 Days', value: '30' },
    { label: '60 Days', value: '60' },
    { label: '90 Days', value: '90' },
    { label: '120 Days', value: '120' },
  ]

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  events = [
    { date: '10', location: 'APX Dental', time: '9:30 AM - 5:00 PM', address: '641 W 900 S, STE 1 Sandy UT 84070', type: 'red' },
    { date: '19', location: 'APEX Dental', time: '10:30 AM - 6 PM', address: '286 East 12200 South Draper, UT 84020', type: 'blue' },
    { date: '31', location: 'APEX Dental', time: '9:30 AM - 5 PM', address: '286 East 12200 South Draper, UT 84020', type: 'grey' },
  ]

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
          <div className={theme.dropdown}>
            <Dropdown
              value={state.daysScheduled}
              onChange={value => this.handleChange('daysScheduled', value)}
              options={this.days}
              box={false}
            />
          </div>
        </div>
        <div className={theme.scheduler}>
          {this.daysOfWeek.map((day, index) => (
            <WeekRow
              key={`${index + 1}`}
              day={day.toLowerCase()}
              schedule={state.form.schedule[day.toLowerCase()]}
              onChange={this.handleScheduleChange}
            />
          ))}
        </div>
        <hr className={theme.divider} />
        <div className={theme.events}>
          {this.events.map((event, index) => (
            <Event key={`${index + 1}`} event={event} />
          ))}
        </div>
      </Card>
    )
  }
}

export default JobSchedule
