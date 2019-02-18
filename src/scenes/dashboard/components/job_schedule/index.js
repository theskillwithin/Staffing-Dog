import React, { useState, useEffect } from 'react'
import { func, string, array, object, shape, oneOfType, bool } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import includes from 'lodash/includes'
import find from 'lodash/find'
import Tabs from '@sdog/components/tab_bar'
import Card from '@sdog/components/card'
// import Switch from '@sdog/components/switch'
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

const defaultSchedule = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => ({
  day,
  active: true,
  from: '8:00',
  to: '17:00',
}))

const blackoutDates = [
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

const availability = [
  { label: 'Full Time', value: 'full_time' },
  { label: 'Part Time', value: 'part_time' },
  { label: 'Temporary', value: 'temporary' },
]

const JobSchedule = ({
  getUserJobs,
  autoSaveUserProfile,
  jobs,
  userProfile: { meta },
}) => {
  const [activeTabIndex, setActiveTab] = useState(0)
  const [showSchedule, setShowSchedule] = useState(false)

  useEffect(() => {
    getUserJobs()
  }, false)

  const schedule = defaultSchedule.map(currentDay => {
    const matchingDay = find(
      meta.capacity.default_hours || [],
      ({ day }) => day === currentDay.day,
    )

    return matchingDay ? { ...currentDay, ...matchingDay } : currentDay
  })

  const updateSchdule = ({ day, value, type }) => {
    autoSaveUserProfile(
      'meta.capacity.default_hours',
      schedule.map(daySchedule => ({
        ...daySchedule,
        ...(daySchedule.day === day ? { [type]: value } : {}),
      })),
    )
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
              <div className={clsx(theme.inputRow, theme.availability)}>
                <span>Availability</span>

                <div className={theme.dropdown}>
                  <Dropdown
                    isMulti
                    isClearable={false}
                    value={availability.reduce(
                      (values, avail) => [
                        ...values,
                        ...(includes(meta.capacity.availability || [], avail.value)
                          ? [avail]
                          : []),
                      ],
                      [],
                    )}
                    onChange={values =>
                      autoSaveUserProfile(
                        'meta.capacity.availability',
                        values.map(({ value }) => value),
                      )
                    }
                    options={availability}
                  />
                </div>
              </div>

              {/* <div className={theme.inputRow}>
                <span>Same day job requests</span>
                <Switch
                  checked={meta.capacity.same_day_jobs}
                  onChange={value =>
                    autoSaveUserProfile('meta.capacity.same_day_jobs', value)
                  }
                >
                  {meta.capacity.same_day_jobs ? 'Yes' : 'No'}
                </Switch>
              </div> */}

              <div className={theme.inputRow}>
                <span>Days out I can be scheduled</span>

                <div className={theme.dropdown}>
                  <Dropdown
                    value={daysOut.find(({ value }) => value === meta.capacity.days_out)}
                    onChange={({ value }) =>
                      autoSaveUserProfile('meta.capacity.days_out', value)
                    }
                    options={daysOut}
                    width={120}
                  />
                </div>
              </div>

              <div className={theme.scheduler}>
                {schedule.map(daySchedule => (
                  <WeekRow
                    key={daySchedule.day}
                    schedule={daySchedule}
                    onChange={updateSchdule}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTabIndex === 1 && <Exceptions />}

          <hr className={theme.divider} />
        </>
      )}

      <Calendar activeDates={[]} blackoutDates={blackoutDates} />

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
