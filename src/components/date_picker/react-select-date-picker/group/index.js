import React from 'react'
import { node, func, object, array, string } from 'prop-types'

import s from './theme.css'

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const Group = props => {
  const {
    Heading,
    getStyles,
    children,
    label,
    innerProps,
    headingProps,
    cx,
    theme,
  } = props
  return (
    <div aria-label={label} style={getStyles('group', props)} {...innerProps}>
      <Heading theme={theme} getStyles={getStyles} cx={cx} {...headingProps}>
        {label}
      </Heading>
      <div className={s.daysHeaderStyles}>
        {days.map((day, i) => (
          <span key={`${i + 1}-${day}`} className={s.daysHeaderItemStyles}>
            {day}
          </span>
        ))}
      </div>
      <div className={s.daysContainerStyles}>{children}</div>
    </div>
  )
}

Group.propTypes = {
  Heading: node.isRequired,
  getStyles: func.isRequired,
  label: string.isRequired,
  innerProps: array,
  headingProps: object,
  cx: func,
  theme: object,
  children: node.isRequired,
}

export default Group
