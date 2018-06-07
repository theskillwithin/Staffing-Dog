import React from 'react'
import { object, func } from 'prop-types'

const Heading = ({ date, changeMonth, resetDate }) => (
  <nav className="calendar--nav">
    <button onClick={() => changeMonth(date.month() - 1)}>&#8249;</button>
    <button onClick={() => resetDate()}>
      <h1>
        <strong>{date.format('MMMM')} </strong>
        {date.format('YYYY')}
      </h1>
    </button>
    <button onClick={() => changeMonth(date.month() + 1)}>&#8250;</button>
  </nav>
)

Heading.propTypes = {
  date: object,
  changeMonth: func,
  resetDate: func,
}

export default Heading
