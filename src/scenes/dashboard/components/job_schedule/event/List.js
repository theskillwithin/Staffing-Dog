import React from 'react'
import { string, oneOfType, object, array } from 'prop-types'
import { getJobsByUserType } from '@sdog/utils/jobs'

import Event from './index'

export const EventList = ({ userType, jobs }) => {
  const jobList = getJobsByUserType({ userType, jobs })

  return jobList.map((event, eventIndex) => (
    <Event userType={userType} key={event.id} event={event} open={eventIndex === 0} />
  ))
}

EventList.propTypes = {
  userType: string.isRequired,
  jobs: oneOfType([object, array]),
}

export default EventList
