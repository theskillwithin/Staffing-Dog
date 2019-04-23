import React, { useMemo } from 'react'
import { string, oneOfType, object, array } from 'prop-types'
import isArray from 'lodash/isArray'

import Event from './index'

export function getJobsByUserType({ userType, jobs }) {
  if (isArray(jobs)) {
    return jobs
  }

  if ('professional' === userType) {
    return jobs.scheduled
  }

  if ('practice' === userType) {
    return jobs.posts || []
  }

  return []
}

export const EventList = ({ userType, jobs }) => {
  const jobList = useMemo(() => getJobsByUserType({ userType, jobs }, [userType, jobs]))

  return jobList.map((event, eventIndex) => (
    <Event userType={userType} key={event.id} event={event} open={eventIndex === 0} />
  ))
}

EventList.propTypes = {
  userType: string.isRequired,
  jobs: oneOfType([object, array]),
}

export default EventList
