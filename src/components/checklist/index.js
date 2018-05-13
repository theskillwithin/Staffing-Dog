import React from 'react'
import { array, bool, oneOfType } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'


const Checklist = ({ list }) => {
  if (!list) return null
  return (
    <ul className={theme.ul}>
      {list.map((li, i) => (
        <li
          key={`li-${li.name}${i + 1}`}
          className={classnames(theme.li, li.checked && theme.checked)}
        >
          {li.name}
        </li>
      ))}
    </ul>
  )
}

Checklist.defaultProps = {
  list: false,
}

Checklist.propTypes = {
  list: oneOfType([
    array,
    bool,
  ]),
}

export default Checklist
