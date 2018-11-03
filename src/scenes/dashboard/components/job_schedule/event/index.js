import React from 'react'
import { object } from 'prop-types'
import classnames from 'classnames'
import NearMeIcon from '@component/svg/NearMe'
import Map from '@component/map'

import theme from './theme.css'

class JobScheduleEvent extends React.Component {
  state = {
    open: false,
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    const { event } = this.props
    if (!event) return null
    return (
      <div>
        <button type="button" className={theme.event} onClick={this.handleClick}>
          <h2 className={event.type && theme[event.type]}>{event.date}</h2>
          <div className={theme.eventDetails}>
            <h5>
              {event.location} @ {event.time}
            </h5>
            <h6>{event.address}</h6>
          </div>
          <NearMeIcon />
        </button>
        <div className={classnames(theme.map, this.state.open && theme.open)}>
          <Map
            isMarkerShown
            position={{ lat: 40.764411, lng: -111.891559 }}
            defaultCenter={{ lat: 40.764411, lng: -111.891559 }}
          />
        </div>
      </div>
    )
  }
}

JobScheduleEvent.propTypes = {
  event: object.isRequired,
}

export default JobScheduleEvent
