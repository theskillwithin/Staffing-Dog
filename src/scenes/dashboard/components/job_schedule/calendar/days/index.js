import React from 'react'
import { object, func } from 'prop-types'
import moment from 'moment'

import Day from './day'
import theme from './theme.css'

const Days = ({ date, startDate, endDate, onClick }) => {
  const thisDate = moment(date)
  const daysInMonth = moment(date).daysInMonth()
  const firstDayDate = moment(date).startOf('month')
  const previousMonth = moment(date).subtract(1, 'month')
  const previousMonthDays = previousMonth.daysInMonth()
  const nextsMonth = moment(date).add(1, 'month')
  const days = []
  const labels = []

  for (let i = 1; i <= 7; i++) {
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
      />,
    )
  }

  const daysCount = days.length
  for (let i = 1; i <= 42 - daysCount; i++) {
    nextsMonth.date(i)
    days.push(
      <Day
        key={moment(nextsMonth).format('DD MM YYYY')}
        onClick={dateM => onClick(dateM)}
        currentDate={date}
        date={moment(nextsMonth)}
        startDate={startDate}
        endDate={endDate}
      />,
    )
  }

  return (
    <nav className={theme.days}>
      {labels.concat()}
      {days.concat()}
    </nav>
  )
}

Days.propTypes = {
  date: object,
  startDate: object,
  endDate: object,
  onClick: func,
}

export default Days
