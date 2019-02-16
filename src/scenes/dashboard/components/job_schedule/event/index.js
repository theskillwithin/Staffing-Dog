import React, { useState } from 'react'
import { object, bool } from 'prop-types'
import get from 'lodash/get'
import clsx from 'clsx'
import NearMeIcon from '@sdog/components/svg/NearMe'
import Map from '@sdog/components/map'

import theme from './theme.css'

const JobScheduleEvent = ({ open, event }) => {
  const [isOpen, setIsOpen] = useState(open)

  if (!event) return null

  const practice = get(event, 'criteria.practice_details', {})

  return (
    <div>
      <button type="button" className={theme.event} onClick={() => setIsOpen(!isOpen)}>
        <h2 className={theme.red}>{event.date}</h2>

        <div className={theme.eventDetails}>
          <h5>
            {practice.name} @ {event.time || 'n/a'}
          </h5>
          <h6>
            {practice.address.line_1} {practice.address.city}, {practice.address.state}{' '}
            {practice.address.zip}
          </h6>
        </div>

        <NearMeIcon />
      </button>

      <div className={clsx(theme.map, isOpen && theme.open)}>
        <Map
          isMarkerShown
          position={{ lat: 40.764411, lng: -111.891559 }}
          defaultCenter={{ lat: 40.764411, lng: -111.891559 }}
        />
      </div>
    </div>
  )
}

JobScheduleEvent.propTypes = {
  event: object.isRequired,
  open: bool,
}

JobScheduleEvent.defaultProps = {
  open: false,
}

export default JobScheduleEvent
