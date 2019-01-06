import React from 'react'
import { node, func, object, array, string } from 'prop-types'
import Arrow from '@sdog/components/svg/Arrow'

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
    selectProps,
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
        <div className={styles.month}>
          <button type="button" onClick={() => selectProps.gotoPrevMonth()}>
            <Arrow direction="left" />
          </button>
          {label}
          <button type="button" onClick={() => selectProps.gotoNextMonth()}>
            <Arrow />
          </button>
        </div>
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
  selectProps: object,
}

export default Group
