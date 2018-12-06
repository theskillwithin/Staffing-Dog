import React from 'react'
import { string, object, func } from 'prop-types'
import classnames from 'classnames'
import Dropdown from '@component/dropdown'
import Button from '@component/button'
import Arrow from '@component/svg/Arrow'
import { timesOfDay } from '@sdog/utils/dates'

import theme from './theme.css'

const time = timesOfDay().map(hour => ({ label: hour, value: hour }))

const WeekRow = ({ day, schedule, onChange }) => (
  <div className={classnames(theme.day, schedule.active && theme.active)}>
    <div className={theme.dayButton}>
      <Button
        onClick={() => onChange('active', !schedule.active, day)}
        secondaryDark={!schedule.active}
        width="67px"
        round
      >
        {day.toUpperCase()}
      </Button>
    </div>
    <div className={theme.dropdowns}>
      <div className={theme.dropdown}>
        <Dropdown
          value={schedule.from}
          onChange={value => onChange('from', value, day)}
          options={time}
          disabled={!schedule.active}
          height={33}
          small
        />
      </div>
      <Arrow />
      <div className={theme.dropdown}>
        <Dropdown
          value={schedule.to}
          onChange={value => onChange('to', value, day)}
          options={time}
          disabled={!schedule.active}
          height={33}
          small
        />
      </div>
    </div>
  </div>
)

WeekRow.propTypes = {
  day: string.isRequired,
  schedule: object.isRequired,
  onChange: func.isRequired,
}

export default WeekRow
