import React, { useState, useReducer, useEffect } from 'react'
import { func, string, array, object, shape, oneOfType, bool } from 'prop-types'
import { connect } from 'react-redux'
import Tabs from '@sdog/components/tab_bar'
import Card from '@sdog/components/card'
import Switch from '@sdog/components/switch'
import Dropdown from '@sdog/components/dropdown'
import {
  getUserJobs as getUserJobsAction,
  findJobs,
  findJobsLoading,
  findJobsError,
} from '@sdog/store/jobs'
import {
  findUserProfile,
  autoSaveUserProfile as autoSaveUserProfileAction,
} from '@sdog/store/user'
import CalendarIcon from '@sdog/components/svg/Calendar'
import Calendar from '@sdog/components/calendar'

import Exceptions from './exceptions'
import WeekRow from './weeks'
import Event from './event'
import theme from './theme.css'

const formInitialState = {
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
}

const scheduleReducer = (state, { payload, type }) => {
  switch (type) {
    case 'update':
      return {
        ...state,
        [payload.day]: {
          ...state[payload.day],
          [payload.type]: payload.value,
        },
      }
    default:
      return state
  }
}

const JobSchedule = ({
  getUserJobs,
  autoSaveUserProfile,
  jobs,
  userProfile: { meta },
}) => {
  const backoutDates = [
    {
      startDate: '2018-11-29',
      endDate: '2018-12-04',
      blackout: true,
    },
  ]

  const daysOut = [
    { label: '30 Days', value: '30' },
    { label: '60 Days', value: '60' },
    { label: '90 Days', value: '90' },
    { label: '120 Days', value: '120' },
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const availability = [
    { label: 'Full Time', value: 'full_time' },
    { label: 'Part Time', value: 'part_time' },
    { label: 'Temporary', value: 'temporary' },
  ]

  const [activeTabIndex, setActiveTab] = useState(0)
  const [showSchedule, setShowSchedule] = useState(false)
  const [schedule, dispatch] = useReducer(scheduleReducer, formInitialState)

  useEffect(() => {
    getUserJobs()
  }, false)

  const handleScheduleChange = (type, value, day) => {
    dispatch({
      type: 'update',
      payload: { type, value, day },
    })
  }

  return (
    <Card
      icon={CalendarIcon}
      title="Job Schedule"
      action={`${showSchedule ? 'Hide' : 'Show'} Schedule`}
      actionCb={() => setShowSchedule(!showSchedule)}
      actionProps={{ round: true, secondary: true, short: true }}
      overflowHidden
    >
      {showSchedule && (
        <>
          <div className={theme.tabsContainer}>
            <Tabs
              activeTabIndex={activeTabIndex}
              onSelect={setActiveTab}
              underline
              exactWidthTab
              jobSchedule
              fw500
            >
              <div>Schedule</div>
              <div>Exceptions</div>
            </Tabs>
          </div>

          {activeTabIndex === 0 && (
            <div className={theme.schedule}>
              <div className={theme.inputRow}>
                <span>Availability</span>

                <div className={theme.dropdown}>
                  <Dropdown
                    value={availability.find(
                      ({ value }) => value === meta.capacity.availability,
                    )}
                    onChange={({ value }) =>
                      autoSaveUserProfile('meta.capacity.availability', value)
                    }
                    options={availability}
                    height={33}
                    width={120}
                  />
                </div>
              </div>

              <div className={theme.inputRow}>
                <span>Same day job requests</span>
                <Switch
                  checked={meta.capacity.same_day_jobs}
                  onChange={value =>
                    autoSaveUserProfile('meta.capacity.same_day_jobs', value)
                  }
                >
                  {meta.capacity.same_day_jobs ? 'Yes' : 'No'}
                </Switch>
              </div>

              <div className={theme.inputRow}>
                <span>Days out I can be scheduled</span>

                <div className={theme.dropdown}>
                  <Dropdown
                    value={daysOut.find(({ value }) => value === meta.capacity.days_out)}
                    onChange={({ value }) =>
                      autoSaveUserProfile('meta.capacity.days_out', value)
                    }
                    options={daysOut}
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
                    schedule={schedule[day.toLowerCase()]}
                    onChange={handleScheduleChange}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTabIndex === 1 && <Exceptions />}
          <hr className={theme.divider} />
        </>
      )}

      <Calendar activeDates={[]} blackoutDates={backoutDates} />

      <div className={theme.events}>
        {jobs.scheduled.map((event, eventIndex) => (
          <Event key={event.id} event={event} open={eventIndex === 0} />
        ))}
      </div>
    </Card>
  )
}

JobSchedule.propTypes = {
  getUserJobs: func.isRequired,
  autoSaveUserProfile: func.isRequired,
  jobs: shape({
    scheduled: array,
  }).isRequired,
  jobsLoading: bool.isRequired,
  jobsError: oneOfType([bool, string]).isRequired,
  userProfile: shape({
    meta: object,
  }).isRequired,
}

export const mapStateToProps = state => ({
  jobs: findJobs(state),
  jobsLoading: findJobsLoading(state),
  jobsError: findJobsError(state),
  userProfile: findUserProfile(state),
})

export const mapActionsToProps = {
  getUserJobs: getUserJobsAction,
  autoSaveUserProfile: autoSaveUserProfileAction,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(JobSchedule)
