import React from 'react'
import { object, bool } from 'prop-types'
import classnames from 'classnames'
import NearMeIcon from '@component/svg/NearMe'
import Map from '@component/map'

import theme from './theme.css'

class JobScheduleEvent extends React.Component {
  static propTypes = {
    event: object.isRequired,
    open: bool,
  }

  static defaultProps = {
    open: false,
  }

  state = { open: this.props.open || false }

  handleClick = () => this.setState(state => ({ open: !state.open }))

  render() {
    const {
      handleClick,
      state,
      props: { event },
    } = this

    if (!event) return null

    return (
      <div>
        <button type="button" className={theme.event} onClick={handleClick}>
          <h2 className={event.type && theme[event.type]}>{event.date}</h2>

          <div className={theme.eventDetails}>
            <h5>
              {event.location} @ {event.time}
            </h5>
            <h6>{event.address}</h6>
          </div>

          <NearMeIcon />
        </button>

        <div className={classnames(theme.map, state.open && theme.open)}>
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

export default JobScheduleEvent
