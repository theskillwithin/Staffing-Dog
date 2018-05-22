import React from 'react'
import { oneOfType, object, bool } from 'prop-types'
import Icon from '@component/Icon'

import theme from './theme.css'


class JobScheduleEvent extends React.Component {
  render() {
    const { event } = this.props
    if (!event) return null
    return (
      <div>
        <div className={theme.event}>
          <h2 className={event.type && theme[event.type]}>{event.date}</h2>
          <div className={theme.eventDetails}>
              <h5>{event.location} @ {event.time}</h5>
              <h6>{event.address}</h6>
          </div>
          <Icon primary use="near_me" />
        </div>
        <div className={theme.map}>
          MAP
        </div>
      </div>
    )
  }
}

JobScheduleEvent.defaultProps = ({
  event: false,
})

JobScheduleEvent.propTypes = ({
  event: oneOfType({
    object,
    bool,
  }),
})

export default JobScheduleEvent
