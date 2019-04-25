import React, { useReducer, useState, useEffect } from 'react'
import { func, array } from 'prop-types'
import moment from 'moment'
import clsx from 'clsx'
import DatePicker from '@sdog/components/date_picker'
// import Dropdown from '@sdog/components/dropdown'
import Switch from '@sdog/components/switch'
import Button from '@sdog/components/button'
import Arrow from '@sdog/components/svg/Arrow'
// import { timesOfDay, minBy15 } from '@sdog/utils/dates'

import theme from './theme.css'

const exceptionsReducer = (state, action) => {
  switch (action.type) {
    case 'delete':
      return {
        ...state,
        lastUpdated: new Date().getTime(),
        listOfExceptions: state.listOfExceptions.filter(({ id }) => id !== action.id),
      }
    case 'add':
      return {
        ...state,
        lastUpdated: new Date().getTime(),
        listOfExceptions: [
          ...state.listOfExceptions,
          { ...action.exception, id: new Date().getTime() },
        ],
      }
    default:
      return state
  }
}

const Exceptions = ({ exceptions, onUpdate }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [availability, setAvailability] = useState(true)
  const [deleteId, setDeleteExceptionId] = useState(false)
  const [{ listOfExceptions, lastUpdated }, dispatch] = useReducer(exceptionsReducer, {
    lastUpdated: false,
    listOfExceptions: exceptions,
  })

  useEffect(
    () => {
      if (lastUpdated) {
        onUpdate(listOfExceptions)
      }
    },
    [lastUpdated],
  )

  const submitNewException = () => {
    dispatch({
      type: 'add',
      exception: {
        start_date: moment(startDate)
          .utc()
          .format(),
        end_date: moment(endDate)
          .utc()
          .format(),
        dispostiion: availability ? 'blue' : 'red',
      },
    })

    setStartDate('')
    setEndDate('')
    setAvailability(true)
  }

  const deleteException = (id = false) => {
    if (id) {
      dispatch({ type: 'delete', id })
    }

    setDeleteExceptionId(false)
  }

  return (
    <div className={theme.root}>
      <h4>Add a new availability exception</h4>

      <div className={theme.exceptionRow}>
        <DatePicker label="Exception Start" onChange={setStartDate} value={startDate} />
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

        <DatePicker label="Exception End" onChange={setEndDate} value={endDate} />
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

      {listOfExceptions && listOfExceptions.length
        ? listOfExceptions.map(exception => (
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
                      deleteException(exception.id)
                    }}
                  >
                    Confirm Delete
                  </Button>
                </div>
              )}
              <span className={theme.startDate}>
                {moment(exception.start_date)
                  .utc()
                  .format('D/M/Y')}
              </span>
              {/* <span className={theme.startTime}>{exception.startTime}</span> */}
              <Arrow />
              <span className={theme.endDate}>
                {moment(exception.end_date)
                  .utc()
                  .format('D/M/Y')}
              </span>
              {/* <span className={theme.endTime}>{exception.endTime}</span> */}
              <button
                className={theme.close}
                type="button"
                onClick={() => setDeleteExceptionId(exception.id)}
              >
                &times;
              </button>
            </div>
          ))
        : null}
    </div>
  )
}

Exceptions.propTypes = {
  exceptions: array.isRequired,
  onUpdate: func.isRequired,
}

export default Exceptions
