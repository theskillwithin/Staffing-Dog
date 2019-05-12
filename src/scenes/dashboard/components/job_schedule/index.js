import React, { useState, useEffect } from 'react'
import { func, string, array, object, shape, oneOfType, bool } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import includes from 'lodash/includes'
import find from 'lodash/find'

import get from '@sdog/utils/get'
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
import EventCalendar from '@sdog/components/EventCalendar'

import Exceptions from './exceptions'
// import WeekRow from './weeks'
import WeekRow from './days'
import EventList from './event/List'
import theme from './theme.css'

const defaultSchedule = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => ({
  day,
  active: true,
  from: '8:00',
  to: '17:00',
}))

const availability = [
  { label: 'Full Time', value: 'full_time' },
  { label: 'Part Time', value: 'part_time' },
  { label: 'Temporary', value: 'temporary' },
]

const JobSchedule = ({
  getUserJobs,
  autoSaveUserProfile,
  jobs,
  userProfile: { meta, user },
}) => {
  const [activeTabIndex, setActiveTab] = useState(0)
  const [showSchedule, setShowSchedule] = useState(false)

  useEffect(() => void getUserJobs(), [])

  const schedule = defaultSchedule.map(currentDay => {
    const matchingDay = find(
      get(meta, 'capacity.default_hours', []) || [],
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

  const customStyles = {
    control: styles => ({
      ...styles,
      minHeight: 40,
    }),
  }

  const userType = get(user, 'type', 'professional')
  const isNotPractice = userType !== 'practice'

  const onUpdateExceptions = exceptions =>
    autoSaveUserProfile('meta.capacity.exceptions', exceptions)

  return (
    <Card
      icon={CalendarIcon}
      title="Job Schedule"
      action={isNotPractice && `${showSchedule ? 'Hide' : 'Show'} Schedule`}
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
                    styles={customStyles}
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

              {/* <div className={theme.inputRow}>
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
              </div> */}

              <h5 className={theme.schedulerTitle}>
                Days of the week you are available:
              </h5>

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

          {activeTabIndex === 1 && (
            <Exceptions
              exceptions={get(meta, 'capacity.exceptions', [])}
              onUpdate={onUpdateExceptions}
            />
          )}

          <hr className={theme.divider} />
        </>
      )}

      <EventCalendar
        userType={userType}
        jobs={jobs}
        exceptions={get(meta, 'capacity.exceptions', [])}
      />

      {isNotPractice && (
        <div className={theme.events}>
          <EventList userType={userType} jobs={jobs} />
        </div>
      )}
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
