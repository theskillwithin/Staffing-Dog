import React from 'react'
import { string } from 'prop-types'
import classnames from 'classnames'

import SVGCheck from '../files/calendar.svg'

import theme from './theme.css'

const Calendar = ({ className }) => (
  <span
    className={classnames(className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGCheck }}
  />
)

Calendar.defaultProps = {
  className: '',
}

Calendar.propTypes = {
  className: string,
}

export default Calendar
