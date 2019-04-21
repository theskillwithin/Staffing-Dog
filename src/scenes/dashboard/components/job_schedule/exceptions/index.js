import React, { useReducer, useState } from 'react'
import clsx from 'clsx'
import DatePicker from '@sdog/components/date_picker'
// import Dropdown from '@sdog/components/dropdown'
import Switch from '@sdog/components/switch'
import Button from '@sdog/components/button'
import Arrow from '@sdog/components/svg/Arrow'
// import { timesOfDay, minBy15 } from '@sdog/utils/dates'

import theme from './theme.css'

// const time = timesOfDay(false, true).map(hour => ({ label: hour, value: hour }))
// const min = minBy15.map(hour => ({ label: hour, value: hour }))

const listOfDefaultExceptions = [
  {
    id: 1,
    startDate: '7/4/2019',
    startTime: '5:00 am',
    endDate: '7/4/2019',
    endTime: '7:15 pm',
    type: 'blue',
  },
  {
    id: 2,
    startDate: '7/4/2019',
    startTime: '5:00 am',
    endDate: '7/4/2019',
    endTime: '7:15 pm',
    type: 'red',
  },
  {
    id: 3,
    startDate: '7/4/2019',
    startTime: '5:00 am',
    endDate: '7/4/2019',
    endTime: '7:15 pm',
    type: 'red',
  },
  {
    id: 4,
    startDate: '7/4/2019',
    startTime: '5:00 am',
    endDate: '7/4/2019',
    endTime: '7:15 pm',
    type: 'red',
  },
]

const exceptionsReducer = (state, action) => {
  switch (action.type) {
    case 'delete':
      return state.filter(({ id }) => id !== action.id)
    case 'add':
      return [...state, { ...action.exception, id: new Date().getTime() }]
    default:
      return state
  }
}

const Exceptions = () => {
  const [startTime, setStartTime] = useState('')
  const [startMin, setStartMin] = useState('')
  const [endTime, setEndTime] = useState('')
  const [endMin, setEndMin] = useState('')
  const [availability, setAvailability] = useState(true)
  const [deleteId, deleteException] = useState(false)
  const [exceptions, dispatch] = useReducer(exceptionsReducer, listOfDefaultExceptions)

  const submitNewException = () => {
    dispatch({
      type: 'add',
      exception: {
        startTime,
        startMin,
        endTime,
        endMin,
        type: availability ? 'blue' : 'red',
      },
    })

    setStartTime('')
    setStartMin('')
    setEndTime('')
    setEndMin('')
    setAvailability(true)
  }

  return (
    <div className={theme.root}>
      <h4>Add a new availability exception</h4>

      <div className={theme.exceptionRow}>
        <DatePicker label="Exception Start" />
        {/* <Dropdown
          value={startTime}
          onChange={setStartTime}
          options={time}
          height={33}
          width={84}
          small
        />
        <span>:</span>
        <Dropdown
          value={startMin}
          onChange={setStartMin}
          options={min}
          height={33}
          width={61}
          small
        /> */}
      </div>

      <div className={theme.exceptionRow}>
        <DatePicker label="Exception End" />
        {/* <Dropdown
          value={endTime}
          onChange={setEndTime}
          options={time}
          height={33}
          width={84}
          small
        />
        <span>:</span>
        <Dropdown
          value={endMin}
          onChange={setEndMin}
          options={min}
          height={33}
          width={61}
          small
        /> */}
      </div>

      <div className={theme.inputRow}>
        <div className={theme.available}>
          <span>Available</span>
          <Switch checked={availability} onChange={setAvailability}>
            {availability ? 'Yes' : 'No'}
          </Switch>
        </div>
        <Button primary onClick={submitNewException}>
          Add Exception
        </Button>
      </div>

      {exceptions &&
        exceptions.length &&
        exceptions.map(exception => (
          <div
            key={exception.id}
            className={clsx(theme.exception, exception.type && theme[exception.type])}
          >
            {deleteId === exception.id && (
              <div className={theme.delete}>
                <Button secondary onClick={() => deleteException(false)}>
                  Cancel Delete
                </Button>
                <Button
                  red
                  onClick={() => {
                    dispatch({ type: 'delete', id: deleteId })
                    deleteException(false)
                  }}
                >
                  Confirm Delete
                </Button>
              </div>
            )}
            <span className={theme.startDate}>{exception.startDate}</span>
            <span className={theme.startTime}>{exception.startTime}</span>
            <Arrow />
            <span className={theme.endDate}>{exception.endDate}</span>
            <span className={theme.endTime}>{exception.endTime}</span>
            <button
              className={theme.close}
              type="button"
              onClick={() => deleteException(exception.id)}
            >
              &times;
            </button>
          </div>
        ))}
    </div>
  )
}

export default Exceptions
