import React from 'react'
import { oneOfType, string, bool, object, func } from 'prop-types'
import classnames from 'classnames'
import Dropdown from '@component/dropdown'
import Button from '@component/button'
import Icon from '@component/icon'

import theme from './theme.css'


const time = [
  { label: '7:00 am', value: '7:00' },
  { label: '7:30 am', value: '7:30' },
  { label: '8:00 am', value: '8:00' },
  { label: '8:30 am', value: '8:30' },
]

const WeekRow = ({ day, schedule, onChange }) => {
  return (
    <div
      className={
        classnames(theme.day, schedule.active && theme.active)
      }
    >
      <div>
        <Button
          onClick={() => onChange('active', !schedule.active, day)}
          secondary={!schedule.active}
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
            box={false}
          />
        </div>
        <Icon secondary use="arrow_forward" />
        <div className={theme.dropdown}>
          <Dropdown
            value={schedule.to}
            onChange={value => onChange('to', value, day)}
            options={time}
            box={false}
          />
        </div>
      </div>
    </div>
  )
}

WeekRow.defaultProps = ({
  day: false,
  schedule: false,
  onChange: false,
})

WeekRow.propTypes = ({
  day: oneOfType([
    string,
    bool,
  ]),
  schedule: oneOfType([
    object,
    bool,
  ]),
  onChange: oneOfType([
    func,
    bool,
  ]),
})

export default WeekRow
