import React from 'react'
import { object, func, array } from 'prop-types'
import filter from 'lodash/filter'
import moment from 'moment'
import classnames from 'classnames'

import theme from './theme.css'

const Day = ({ currentDate, date, startDate, endDate, activeDates, onClick }) => {
  const active = moment().isSame(date, 'day')
  const start =
    date.isSame(startDate, 'day') ||
    filter(activeDates, x => date.isSame(x.startDate, 'day')).length > 0
  const between =
    date.isBetween(startDate, endDate, 'day') ||
    filter(activeDates, x => date.isBetween(x.startDate, x.endDate, 'day')).length > 0
  const end =
    date.isSame(endDate, 'day') ||
    filter(activeDates, x => date.isSame(x.endDate, 'day')).length > 0
  const muted = !date.isSame(currentDate, 'month')
  return (
    <span
      onClick={() => onClick(date)}
      currentdate={date}
      className={classnames(
        active && theme.active,
        start && theme.start,
        between && theme.between,
        end && theme.end,
        muted && theme.muted,
      )}
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
  activeDates: array,
  onClick: func,
}

export default Day
