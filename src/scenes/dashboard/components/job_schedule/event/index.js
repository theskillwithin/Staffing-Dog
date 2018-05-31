import React from 'react'
import { object } from 'prop-types'
import classnames from 'classnames'
import Icon from '@component/icon'
import Map from '@component/map'

import theme from './theme.css'

class JobScheduleEvent extends React.Component {
  state = {
    open: false,
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { event } = this.props
    if (!event) return null
    return (
      <div>
        <button className={theme.event} onClick={this.handleClick}>
          <h2 className={event.type && theme[event.type]}>{event.date}</h2>
          <div className={theme.eventDetails}>
            <h5>
              {event.location} @ {event.time}
            </h5>
            <h6>{event.address}</h6>
          </div>
          <Icon primary use="near_me" />
        </button>
        <div className={classnames(theme.map, this.state.open && theme.open)}>
          <Map coordinates={[-111.891559, 40.764411]} />
        </div>
      </div>
    )
  }
}

JobScheduleEvent.propTypes = {
  event: object.isRequired,
}

export default JobScheduleEvent
