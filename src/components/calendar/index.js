import React from 'react'
import { bool, array } from 'prop-types'
import moment from 'moment'

import Heading from './heading'
import Days from './days'
import theme from './theme.css'

class Calendar extends React.Component {
  state = {
    date: moment(),
    startDate: null,
    endDate: null,
  }

  resetDate = () => {
    this.setState({
      date: moment(),
    })
  }

  changeMonth = month => {
    const { date } = this.state

    date.month(month)

    this.setState(date)
  }

  changeDate = date => {
    if (this.props.editable) {
      let { startDate, endDate } = this.state

      if (
        startDate === null ||
        date.isBefore(startDate, 'day') ||
        !startDate.isSame(endDate, 'day')
      ) {
        startDate = moment(date)
        endDate = moment(date)
      } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
        startDate = null
        endDate = null
      } else if (date.isAfter(startDate, 'day')) {
        endDate = moment(date)
      }

      this.setState({
        startDate,
        endDate,
      })
    }
  }

  render() {
    const { date, startDate, endDate } = this.state

    return (
      <div className={theme.calendar}>
        <Heading date={date} changeMonth={this.changeMonth} resetDate={this.resetDate} />

        <Days
          onClick={this.changeDate}
          date={date}
          startDate={startDate}
          endDate={endDate}
          activeDates={this.props.activeDates}
          editable={this.props.editable}
        />
      </div>
    )
  }
}

Calendar.defaultProps = {
  editable: false,
}

Calendar.propTypes = {
  editable: bool,
  activeDates: array.isRequired,
}

export default Calendar
