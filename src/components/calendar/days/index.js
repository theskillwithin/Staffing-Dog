import React from 'react'
import { object, func, array, bool } from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'

import Day from './day'
import theme from './theme.css'

const Days = ({ date, startDate, endDate, activeDates, editable, onClick }) => {
  const DAYS_IN_WEEK = 7
  const thisDate = moment(date)
  const daysInMonth = moment(date).daysInMonth()
  const firstDayDate = moment(date).startOf('month')
  const previousMonth = moment(date).subtract(1, 'month')
  const previousMonthDays = previousMonth.daysInMonth()
  const nextsMonth = moment(date).add(1, 'month')
  const days = []
  const labels = []

  for (let i = 1; i <= DAYS_IN_WEEK; i++) {
    labels.push(
      <span key={i} className={theme.label}>
        {moment()
          .day(i)
          .format('ddd')}
      </span>,
    )
  }

  for (let i = firstDayDate.day(); i > 1; i--) {
    previousMonth.date(previousMonthDays - i + 2)

    days.push(
      <Day
        key={moment(previousMonth).format('DD MM YYYY')}
        onClick={dateM => onClick(dateM)}
        currentDate={date}
        date={moment(previousMonth)}
        startDate={startDate}
        endDate={endDate}
        activeDates={activeDates}
      />,
    )
  }

  for (let i = 1; i <= daysInMonth; i++) {
    thisDate.date(i)

    days.push(
      <Day
        key={moment(thisDate).format('DD MM YYYY')}
        onClick={dateM => onClick(dateM)}
        currentDate={date}
        date={moment(thisDate)}
        startDate={startDate}
        endDate={endDate}
        activeDates={activeDates}
      />,
    )
  }

  const daysCount = days.length
  const MAX_COLUMNS = 6
  const MAX_DAYS = DAYS_IN_WEEK * MAX_COLUMNS

  for (let i = 1; i <= MAX_DAYS - daysCount; i++) {
    nextsMonth.date(i)
    days.push(
      <Day
        key={moment(nextsMonth).format('DD MM YYYY')}
        onClick={dateM => onClick(dateM)}
        currentDate={date}
        date={moment(nextsMonth)}
        startDate={startDate}
        endDate={endDate}
        activeDates={activeDates}
      />,
    )
  }

  return (
    <nav className={classnames(theme.days, editable && theme.editable)}>
      {labels.concat()}
      {days.concat()}
    </nav>
  )
}

Days.defaultProps = {
  startDate: null,
  endDate: null,
}

Days.propTypes = {
  date: object.isRequired,
  startDate: object,
  endDate: object,
  onClick: func.isRequired,
  activeDates: array.isRequired,
  editable: bool.isRequired,
}

export default Days
