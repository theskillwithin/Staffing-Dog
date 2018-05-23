import React from 'react'
import { array } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'


const Checklist = ({ list }) => (
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

Checklist.propTypes = {
  list: array.isRequired,
}

export default Checklist
