import React from 'react'
import { string, shape, func } from 'prop-types'
import clsx from 'clsx'
import find from 'lodash/find'
import Dropdown from '@sdog/components/dropdown'
import Button from '@sdog/components/button'
import Arrow from '@sdog/components/svg/Arrow'
import { timesOfDay } from '@sdog/utils/dates'

import theme from './theme.css'

const time = timesOfDay().map(hour => ({ label: hour, value: hour }))
const getTimeValue = timeValue => find(time, ({ value }) => value === timeValue)

const WeekRow = ({ schedule, onChange }) => (
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

    <div className={theme.dropdowns}>
      <div className={theme.dropdown}>
        <Dropdown
          value={getTimeValue(schedule.from)}
          onChange={({ value }) => onChange({ type: 'from', value, day: schedule.day })}
          options={time}
          disabled={!schedule.active}
          height={33}
          width={100}
          small
        />
      </div>

      <Arrow />

      <div className={theme.dropdown}>
        <Dropdown
          value={getTimeValue(schedule.to)}
          onChange={({ value }) => onChange({ type: 'to', value, day: schedule.day })}
          options={time}
          disabled={!schedule.active}
          height={33}
          width={100}
          small
        />
      </div>
    </div>
  </div>
)

WeekRow.propTypes = {
  schedule: shape({
    day: string.isRequired,
    from: string.isRequired,
    to: string.isRequired,
  }).isRequired,
  onChange: func.isRequired,
}

export default WeekRow
