import React from 'react'
import { object, func } from 'prop-types'
import moment from 'moment'
import classnames from 'classnames'

import theme from './theme.css'

const Day = ({ currentDate, date, startDate, endDate, onClick }) => (
  <span
    onClick={() => onClick(date)}
    currentdate={date}
    className={classnames(
      moment().isSame(date, 'day') && theme.active,
      date.isSame(startDate, 'day') && theme.start,
      date.isBetween(startDate, endDate, 'day') && theme.between,
      date.isSame(endDate, 'day') && theme.end,
      !date.isSame(currentDate, 'month') && theme.muted,
    )}
    role="button"
    tabIndex={0}
  >
    {date.date()}
  </span>
)

Day.propTypes = {
  currentDate: object,
  date: object,
  startDate: object,
  endDate: object,
  onClick: func,
}

export default Day
