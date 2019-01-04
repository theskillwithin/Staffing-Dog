import React from 'react'
import { func, object } from 'prop-types'
import { components as SelectComponents } from 'react-select'

const getOptionStyles = defaultStyles => ({
  ...defaultStyles,
  display: 'inline-block',
  width: '12%',
  margin: '0 1%',
  textAlign: 'center',
  borderRadius: '4px',
  padding: '5px',
})

const Option = props => {
  const { data, getStyles, innerRef, innerProps } = props
  if (data.display === 'calendar') {
    const defaultStyles = getStyles('option', props)
    const styles = getOptionStyles(defaultStyles)

    if (data.date.date() === 1) {
      const indentBy = data.date.day()
      if (indentBy) {
        styles.marginLeft = `${indentBy * 14 + 1}%`
      }
    }
    return (
      <span {...innerProps} style={styles} ref={innerRef}>
        {data.date.format('D')}
      </span>
    )
  }
  return <SelectComponents.Option {...props} />
}

Option.propTypes = {
  data: object.isRequired,
  getStyles: func.isRequired,
  innerProps: object,
  innerRef: func,
}

export default Option
