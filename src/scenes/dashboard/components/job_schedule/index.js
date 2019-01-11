import React from 'react'
import { func, string, array, shape, oneOfType, bool } from 'prop-types'
import { connect } from 'react-redux'
import Tabs from '@sdog/components/tab_bar'
import Card from '@sdog/components/card'
import Switch from '@sdog/components/switch'
import Dropdown from '@sdog/components/dropdown'
import { getUserJobs, findJobs, findJobsLoading, findJobsError } from '@sdog/store/jobs'
import CalendarIcon from '@sdog/components/svg/Calendar'
import Calendar from '@sdog/components/calendar'

import Exceptions from './exceptions'
import WeekRow from './weeks'
import Event from './event'
import theme from './theme.css'

class JobSchedule extends React.Component {
  static propTypes = {
    getUserJobs: func.isRequired,
    jobs: shape({
      scheduled: array,
    }).isRequired,
    jobsLoading: bool.isRequired,
    jobsError: oneOfType([bool, string]).isRequired,
  }

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
          from: { label: '6:00 am', value: '6:00 am' },
          to: { label: '7:00 pm', value: '7:00 pm' },
        },
        mon: {
          active: true,
          from: { label: '6:00 am', value: '6:00 am' },
          to: { label: '7:00 pm', value: '7:00 pm' },
        },
        tue: {
          active: true,
          from: { label: '6:00 am', value: '6:00 am' },
          to: { label: '7:00 pm', value: '7:00 pm' },
        },
        wed: {
          active: true,
          from: { label: '6:00 am', value: '6:00 am' },
          to: { label: '7:00 pm', value: '7:00 pm' },
        },
        thu: {
          active: true,
          from: { label: '6:00 am', value: '6:00 am' },
          to: { label: '7:00 pm', value: '7:00 pm' },
        },
        fri: {
          active: true,
          from: { label: '6:00 am', value: '6:00 am' },
          to: { label: '7:00 pm', value: '7:00 pm' },
        },
        sat: {
          active: true,
          from: { label: '6:00 am', value: '6:00 am' },
          to: { label: '7:00 pm', value: '7:00 pm' },
        },
      },
    },
  }

  componentDidMount = () => {
    this.props.getUserJobs()
  }

  updateSchedule = () => {
    this.setState(({ showSchedule }) => ({ showSchedule: !showSchedule }))
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
    this.setState(state => ({
      form: {
        ...state.form,
        [input]: value,
      },
    }))
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
            {this.state.activeTabIndex === 1 && <Exceptions />}
            <hr className={theme.divider} />
          </>
        )}

        <Calendar
          activeDates={[]}
          blackoutDates={this.backoutDates}
          onChangeMonth={this.getCalendarEvents}
        />

        <div className={theme.events}>
          {this.props.jobs.scheduled.map((event, eventIndex) => (
            <Event key={event.id} event={event} open={eventIndex === 0} />
          ))}
        </div>
      </Card>
    )
  }
}

export const mapStateToProps = state => ({
  jobs: findJobs(state),
  jobsLoading: findJobsLoading(state),
  jobsError: findJobsError(state),
})

export const mapActionsToProps = { getUserJobs }

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(JobSchedule)
