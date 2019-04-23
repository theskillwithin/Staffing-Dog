import React, { useState } from 'react'
import { object, bool, string } from 'prop-types'
import moment from 'moment'
import get from 'lodash/get'
import clsx from 'clsx'
import NearMeIcon from '@sdog/components/svg/NearMe'
import Map from '@sdog/components/map'

import theme from './theme.css'

const JobScheduleEvent = ({ open, event, userType }) => {
  const [isOpen, setIsOpen] = useState(open)

  if (!event) return null

  const isPractice = userType === 'practice'
  const practice = get(event, 'criteria.practice_details', {})
  const startDate = moment(get(event, 'criteria.duration.start_date')).utc()
  const geoLocation = get(practice, 'geocode', {})

  return (
    <div>
      <button type="button" className={theme.event} onClick={() => setIsOpen(!isOpen)}>
        <h2 className={theme.red}>{startDate.format('D')}</h2>

        <div className={theme.eventDetails}>
          <h5>
            {isPractice ? 'user' : practice.name} @ {startDate.format('M/D/YY')}
          </h5>
          <h6>
            {practice.address.line_1} {practice.address.city}, {practice.address.state}{' '}
            {practice.address.zip}
          </h6>
        </div>

        <NearMeIcon />
      </button>

      <div className={clsx(theme.map, isOpen && theme.open)}>
        <Map isMarkerShown position={geoLocation} defaultCenter={geoLocation} />
      </div>
    </div>
  )
}

JobScheduleEvent.propTypes = {
  event: object.isRequired,
  open: bool,
  userType: string.isRequired,
}

JobScheduleEvent.defaultProps = {
  open: false,
}

export default JobScheduleEvent
