import React from 'react'
import { string, shape, func } from 'prop-types'
import clsx from 'clsx'

import Button from '@sdog/components/button'

import theme from './theme.css'

const DaysOfWeekRow = ({ schedule, onChange }) => (
  <div className={clsx(theme.day, schedule.active && theme.active)}>
    <div className={theme.dayButton}>
      <Button
        onClick={() => onChange('active', !schedule.active, schedule.day)}
        secondaryDark={!schedule.active}
        width="67px"
        round
      >
        {schedule.day.toUpperCase()}
      </Button>
    </div>
  </div>
)

DaysOfWeekRow.propTypes = {
  schedule: shape({
    day: string.isRequired,
    from: string.isRequired,
    to: string.isRequired,
  }).isRequired,
  onChange: func.isRequired,
}

export default DaysOfWeekRow
