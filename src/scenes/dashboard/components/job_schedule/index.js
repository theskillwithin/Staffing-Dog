import React from 'react'
import { func, array } from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import Tabs from '@component/tab_bar'
import Card from '@component/card'
import Switch from '@component/switch'
import Dropdown from '@component/dropdown'
import { findScheduledEvents, getScheduledEvents } from '@store/jobs'
import { findSchedule, getSchedule } from '@store/user'
import CalendarIcon from '@component/svg/Calendar'
import Calendar from '@component/calendar'

import Excpetions from './exceptions'
import WeekRow from './weeks'
import Event from './event'
import theme from './theme.css'

class JobSchedule extends React.Component {
  backoutDates = [
    {
      startDate: '2018-11-29',
      endDate: '2018-12-04',
      blackout: true,
    },
  ]

  days = [
    { label: '30 Days', value: '30' },
    { label: '60 Days', value: '60' },
    { label: '90 Days', value: '90' },
    { label: '120 Days', value: '120' },
  ]

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  state = {
    activeTabIndex: 0,
    showSchedule: false,
    form: {
      switch: false,
      daysScheduled: false,
      schedule: {
        sun: {
          active: false,
          from: { label: '06:00', value: '06:00' },
          to: { label: '17:00', value: '17:00' },
        },
        mon: {
          active: true,
          from: { label: '06:00', value: '06:00' },
          to: { label: '17:00', value: '17:00' },
        },
        tue: {
          active: true,
          from: { label: '06:00', value: '06:00' },
          to: { label: '17:00', value: '17:00' },
        },
        wed: {
          active: true,
          from: { label: '06:00', value: '06:00' },
          to: { label: '17:00', value: '17:00' },
        },
        thu: {
          active: true,
          from: { label: '06:00', value: '06:00' },
          to: { label: '17:00', value: '17:00' },
        },
        fri: {
          active: true,
          from: { label: '06:00', value: '06:00' },
          to: { label: '17:00', value: '17:00' },
        },
        sat: {
          active: true,
          from: { label: '06:00', value: '06:00' },
          to: { label: '17:00', value: '17:00' },
        },
      },
    },
  }

  componentDidMount = () => this.getCalendarEvents(new Date())

  updateSchedule = () => {
    this.setState(({ showSchedule }) => ({ showSchedule: !showSchedule }))
  }

  getCalendarEvents = date => {
    this.props.getScheduledEvents(moment(date).format())
    this.props.getSchedule(moment(date).format())
  }

  handleToggle = value => {
    this.setState(state => ({ form: { ...state.form, switch: value } }))
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
    const {
      days,
      daysOfWeek,
      state,
      updateSchedule,
      handleToggle,
      handleChange,
      handleScheduleChange,
    } = this

    return (
      <Card
        icon={CalendarIcon}
        title="Job Schedule"
        action={`${state.showSchedule ? 'Hide' : 'Show'} Schedule`}
        actionCb={updateSchedule}
        actionProps={{ round: true, secondary: true, short: true }}
        overflowHidden
      >
        {state.showSchedule && (
          <>
            <div className={theme.tabsContainer}>
              <Tabs
                activeTabIndex={this.state.activeTabIndex}
                onSelect={tab => this.setState({ activeTabIndex: tab })}
                underline
                exactWidthTab
                jobSchedule
                fw500
              >
                <div>Schedule</div>
                <div>Exceptions</div>
              </Tabs>
            </div>
            {this.state.activeTabIndex === 0 && (
              <div className={theme.schedule}>
                <div className={theme.inputRow}>
                  <span>Same day job requests</span>
                  <Switch checked={state.form.switch} onChange={handleToggle}>
                    {state.form.switch ? 'Yes' : 'No'}
                  </Switch>
                </div>
                <div className={theme.inputRow}>
                  <span>Days out I can be scheduled</span>
                  <div className={theme.dropdown}>
                    <Dropdown
                      value={state.form.daysScheduled}
                      onChange={value => handleChange('daysScheduled', value)}
                      options={days}
                      height={33}
                      width={120}
                    />
                  </div>
                </div>
                <div className={theme.scheduler}>
                  {daysOfWeek.map(day => (
                    <WeekRow
                      key={day}
                      day={day.toLowerCase()}
                      schedule={state.form.schedule[day.toLowerCase()]}
                      onChange={handleScheduleChange}
                    />
                  ))}
                </div>
              </div>
            )}
            {this.state.activeTabIndex === 1 && <Excpetions />}
            <hr className={theme.divider} />
          </>
        )}

        <Calendar
          activeDates={this.props.events}
          blackoutDates={this.backoutDates}
          onChangeMonth={this.getCalendarEvents}
        />

        <div className={theme.events}>
          {this.props.events.map((event, eventIndex) => (
            <Event key={event.id} event={event} open={eventIndex === 0} />
          ))}
        </div>
      </Card>
    )
  }
}

JobSchedule.propTypes = {
  getScheduledEvents: func.isRequired,
  getSchedule: func.isRequired,
  events: array.isRequired,
}

export default connect(
  state => ({
    events: findScheduledEvents(state),
    schedule: findSchedule(state),
  }),
  { getScheduledEvents, getSchedule },
)(JobSchedule)
