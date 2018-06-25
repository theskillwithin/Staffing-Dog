import React from 'react'
import { object, func } from 'prop-types'

import theme from './theme.css'

const Heading = ({ date, changeMonth, resetDate }) => (
  <nav className={theme.nav}>
    <button
      type="button"
      className={theme.left}
      onClick={() => changeMonth(date.month() - 1)}
    >
      &#8249;
    </button>
    <button type="button" onClick={() => resetDate()}>
      <h1>
        <strong>{date.format('MMMM')} </strong>
        {date.format('YYYY')}
      </h1>
    </button>
    <button
      type="button"
      className={theme.right}
      onClick={() => changeMonth(date.month() + 1)}
    >
      &#8250;
    </button>
  </nav>
)

Heading.propTypes = {
  date: object,
  changeMonth: func,
  resetDate: func,
}

export default Heading
