import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'

import theme from './theme.css'

const Calendar = ({ className, date }) => (
  <svg
    className={clsx(className, theme.svg)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 20"
  >
    <g id="Group_421" data-name="Group 421" transform="translate(-829 -135)">
      <text
        id="_21"
        data-name="21"
        className={clsx(theme.fill, theme.text)}
        transform="translate(829 152)"
        x="50%"
        y="-3px"
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {date}
      </text>
      <rect
        id="Rectangle_76"
        data-name="Rectangle 76"
        className={theme.fill}
        width="100%"
        height="2"
        rx="1"
        transform="translate(829 135)"
      />
    </g>
  </svg>
)

Calendar.defaultProps = {
  className: '',
  date: moment().format('DD') || '21',
}

Calendar.propTypes = {
  className: string,
  date: string,
}

export default Calendar
