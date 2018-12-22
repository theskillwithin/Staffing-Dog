import React, { Component } from 'react'
import moment from 'moment'
import chrono from 'chrono-node'
import Select, { components as SelectComponents } from 'react-select'

const createCalendarOptions = (date = new Date()) => {
  // const makeArray = Array.apply(null, {
  //   length: moment(date).daysInMonth(),
  // })
  const makeArray = (Array.length = moment(date).daysInMonth())
  const daysInMonth = makeArray.map((_, i) => {
    const d = moment(date).date(i + 1)
    return { ...this.props.createOptionForDate(d), display: 'calendar' }
  })
  return {
    label: moment(date).format('MMMM YYYY'),
    options: daysInMonth,
  }
}

this.props.defaultOptions.push(createCalendarOptions())

const suggestions = [
  'sunday',
  'saturday',
  'friday',
  'thursday',
  'wednesday',
  'tuesday',
  'monday',
  'december',
  'november',
  'october',
  'september',
  'august',
  'july',
  'june',
  'may',
  'april',
  'march',
  'february',
  'january',
  'yesterday',
  'tomorrow',
  'today',
].reduce((acc, str) => {
  for (let i = 1; i < str.length; i++) {
    acc[str.substr(0, i)] = str
  }
  return acc
}, {})

const suggest = str =>
  str
    .split(/\b/)
    .map(i => suggestions[i] || i)
    .join('')

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const daysHeaderStyles = {
  marginTop: '5px',
  paddingTop: '5px',
  paddingLeft: '2%',
  borderTop: '1px solid #eee',
}
const daysHeaderItemStyles = {
  color: '#999',
  cursor: 'default',
  fontSize: '75%',
  fontWeight: '500',
  display: 'inline-block',
  width: '12%',
  margin: '0 1%',
  textAlign: 'center',
}
const daysContainerStyles = {
  paddingTop: '5px',
  paddingLeft: '2%',
}

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
    <div aria-label={label} css={getStyles('group', props)} {...innerProps}>
      <Heading theme={theme} getStyles={getStyles} cx={cx} {...headingProps}>
        {label}
      </Heading>
      <div css={daysHeaderStyles}>
        {days.map((day, i) => (
          <span key={`${i + 1}-${day}`} css={daysHeaderItemStyles}>
            {day}
          </span>
        ))}
      </div>
      <div css={daysContainerStyles}>{children}</div>
    </div>
  )
}

const getOptionStyles = defaultStyles => ({
  ...defaultStyles,
  display: 'inline-block',
  width: '12%',
  margin: '0 1%',
  textAlign: 'center',
  borderRadius: '4px',
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
      <span {...innerProps} css={styles} ref={innerRef}>
        {data.date.format('D')}
      </span>
    )
  }
  return <SelectComponents.Option {...props} />
}

class DatePicker extends Component {
  state = {
    options: this.props.defaultOptions,
  }

  handleInputChange = value => {
    if (!value) {
      this.setState({ options: this.props.defaultOptions })
      return
    }
    const date = chrono.parseDate(suggest(value.toLowerCase()))
    if (date) {
      this.setState({
        options: [this.props.createOptionForDate(date), createCalendarOptions(date)],
      })
    } else {
      this.setState({
        options: [],
      })
    }
  }

  render() {
    const { value } = this.props
    const { options } = this.state
    return (
      <Select
        {...this.props}
        components={{ Group, Option }}
        filterOption={null}
        isMulti={false}
        isOptionSelected={(o, v) => v.some(i => i.date.isSame(o.date, 'day'))}
        maxMenuHeight={380}
        onChange={this.props.onChange}
        onInputChange={this.handleInputChange}
        options={options}
        value={value}
      />
    )
  }
}

export default DatePicker
