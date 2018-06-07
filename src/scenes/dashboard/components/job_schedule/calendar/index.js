import React from 'react'
import moment from 'moment'

import Heading from './heading'
import Days from './days'
import theme from './theme.css'

class Calendar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: moment(),
      startDate: moment().subtract(5, 'day'),
      endDate: moment().add(3, 'day'),
    }
  }

  resetDate() {
    this.setState({
      date: moment(),
    })
  }

  changeMonth(month) {
    const { date } = this.state

    date.month(month)

    this.setState(date)
  }

  changeDate(date) {
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

  render() {
    const { date, startDate, endDate } = this.state

    return (
      <div className={theme.calendar}>
        <Heading
          date={date}
          changeMonth={month => this.changeMonth(month)}
          resetDate={() => this.resetDate()}
        />

        <Days
          onClick={dateM => this.changeDate(dateM)}
          date={date}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    )
  }
}

export default Calendar
