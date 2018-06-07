import React from 'react'
import { object, func } from 'prop-types'
import moment from 'moment'

const Day = ({ currentDate, date, startDate, endDate, onClick }) => {
  const className = []

  if (moment().isSame(date, 'day')) {
    className.push('active')
  }

  if (date.isSame(startDate, 'day')) {
    className.push('start')
  }

  if (date.isBetween(startDate, endDate, 'day')) {
    className.push('between')
  }

  if (date.isSame(endDate, 'day')) {
    className.push('end')
  }

  if (!date.isSame(currentDate, 'month')) {
    className.push('muted')
  }

  return (
    <span
      onClick={() => onClick(date)}
      currentdate={date}
      className={className.join(' ')}
      role="button"
      tabIndex={0}
    >
      {date.date()}
    </span>
  )
}

Day.propTypes = {
  currentDate: object,
  date: object,
  startDate: object,
  endDate: object,
  onClick: func,
}

export default Day
