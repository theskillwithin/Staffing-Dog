import React from 'react'
import { node, func, object, array, string } from 'prop-types'

import styles from './theme.css'

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
    emotion,
  } = props
  return (
    <div aria-label={label} style={getStyles('group', props)} {...innerProps}>
      <Heading
        emotion={emotion}
        theme={theme}
        getStyles={getStyles}
        cx={cx}
        {...headingProps}
      >
        {label}
      </Heading>
      <div className={styles.daysHeaderStyles}>
        {days.map((day, i) => (
          <span key={`${i + 1}-${day}`} className={styles.daysHeaderItemStyles}>
            {day}
          </span>
        ))}
      </div>
      <div className={styles.daysContainerStyles}>{children}</div>
    </div>
  )
}

Group.propTypes = {
  Heading: func.isRequired,
  getStyles: func.isRequired,
  label: string.isRequired,
  innerProps: array,
  headingProps: object,
  cx: func,
  theme: object,
  children: node.isRequired,
  emotion: object,
}

export default Group
