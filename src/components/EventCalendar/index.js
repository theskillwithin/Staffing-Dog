import React from 'react'
import { oneOfType, object, string, array } from 'prop-types'
import { getJobsByUserType } from '@sdog/utils/jobs'
import get from '@sdog/utils/get'
import Calendar from '@sdog/components/calendar'

const EventCalendar = ({ userType, jobs, exceptions }) => {
  const activeDates = getJobsByUserType({ userType, jobs }).map(job => ({
    start_date: get(job, 'criteria.duration.start_date'),
    end_date: get(
      job,
      'criteria.duaration.end_date',
      get(job, 'criteria.duration.start_date'),
    ),
  }))

  const blackoutDates = exceptions.map(exception => ({
    start_date: get(exception, 'start_date'),
    end_date: get(exception, 'end_date', get(exception, 'start_date')),
  }))

  return <Calendar activeDates={activeDates} blackoutDates={blackoutDates} />
}

EventCalendar.propTypes = {
  userType: string.isRequired,
  jobs: oneOfType([array, object]).isRequired,
  exceptions: array.isRequired,
}

export default EventCalendar
