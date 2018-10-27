import React from 'react'
import { func, array } from 'prop-types'
import { connect } from 'react-redux'
import Card from '@component/card'
import Switch from '@component/switch'
import Dropdown from '@component/dropdown'
import { findScheduledEvents, getScheduledEvents } from '@store/jobs'
import Calendar from '@component/calendar'

import WeekRow from './weeks'
import Event from './event'
import theme from './theme.css'

class JobSchedule extends React.Component {
  days = [
    { label: '30 Days', value: '30' },
    { label: '60 Days', value: '60' },
    { label: '90 Days', value: '90' },
    { label: '120 Days', value: '120' },
  ]

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  state = {
    form: {
      switch: false,
      daysScheduled: false,
      schedule: {
        sun: {
          active: false,
          from: { label: '7:00', value: '7:00' },
          to: { label: '7:00', value: '7:00' },
        },
        mon: {
          active: true,
          from: { label: '7:00', value: '7:00' },
          to: { label: '7:00', value: '7:00' },
        },
        tue: {
          active: true,
          from: { label: '7:00', value: '7:00' },
          to: { label: '7:00', value: '7:00' },
        },
        wed: {
          active: true,
          from: { label: '7:00', value: '7:00' },
          to: { label: '7:00', value: '7:00' },
        },
        thu: {
          active: true,
          from: { label: '7:00', value: '7:00' },
          to: { label: '7:00', value: '7:00' },
        },
        fri: {
          active: true,
          from: { label: '7:00', value: '7:00' },
          to: { label: '7:00', value: '7:00' },
        },
        sat: {
          active: true,
          from: { label: '7:00', value: '7:00' },
          to: { label: '7:00', value: '7:00' },
        },
      },
    },
  }

  componentDidMount() {
    this.props.getScheduledEvents()
  }

  updateSchedule = () => {
    this.setState({ updateSchedule: new Date().time() })
  }

  handleToggle = () => {
    this.setState(state => ({ form: { ...state.form, switch: !state.form.switch } }))
  }

  handleScheduleChange = (type, value, day) => {
    this.setState(({ form, form: { schedule } }) => ({
      form: {
        ...form,
        schedule: { ...schedule, [day]: { ...schedule[day], [type]: value } },
      },
    }))
  }

  handleChange(input, value) {
    this.setState(state => ({ form: { ...state.form, [input]: value } }))
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
          <Switch checked={state.form.switch} onChange={this.handleToggle} flip>
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
          {this.daysOfWeek.map(day => (
            <WeekRow
              key={day}
              day={day.toLowerCase()}
              schedule={state.form.schedule[day.toLowerCase()]}
              onChange={this.handleScheduleChange}
            />
          ))}
        </div>
        <hr className={theme.divider} />
        <Calendar activeDates={this.props.events} />
        <hr className={theme.divider} />
        <div className={theme.events}>
          {this.props.events.map(event => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      </Card>
    )
  }
}

JobSchedule.propTypes = {
  getScheduledEvents: func.isRequired,
  events: array.isRequired,
}

export default connect(
  state => ({
    events: findScheduledEvents(state),
  }),
  { getScheduledEvents },
)(JobSchedule)
