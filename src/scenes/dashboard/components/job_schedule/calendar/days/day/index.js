import React from 'react'
import { object, func, array } from 'prop-types'
import filter from 'lodash/filter'
import moment from 'moment'
import classnames from 'classnames'

import theme from './theme.css'

const Day = ({ currentDate, date, startDate, endDate, activeDates, onClick }) => {
  const active = moment().isSame(date, 'day')

  const editStart = date.isSame(startDate, 'day')
  const activeStart = filter(activeDates, x => date.isSame(x.startDate, 'day'))
  const start = editStart || activeStart.length > 0

  const editBetween = date.isBetween(startDate, endDate, 'day')
  const activeBetween = filter(activeDates, x =>
    date.isBetween(x.startDate, x.endDate, 'day'),
  )
  const between = editBetween || activeBetween.length > 0

  const editEnd = date.isSame(endDate, 'day')
  const activeEnd = filter(activeDates, x => date.isSame(x.endDate, 'day'))
  const end = editEnd || activeEnd.length > 0

  const muted = !date.isSame(currentDate, 'month')

  const primary =
    filter(activeBetween, x => x.primary === true).length > 0 ||
    filter(activeStart, x => x.primary === true).length > 0 ||
    filter(activeEnd, x => x.primary === true).length > 0
  console.log(primary)
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
        primary && theme.primary,
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
