import React from 'react'
import { array } from 'prop-types'
import clsx from 'clsx'

import Check from '../svg/Check'

import theme from './theme.css'

const Checklist = ({ list }) => (
  <ul className={theme.ul}>
    {list.map((li, i) => (
      <li
        key={`li-${li.name}${i + 1}`}
        className={clsx(theme.li, li.checked && theme.checked)}
      >
        {li.name}
        <Check color="white" className={theme.check} width={16} />
      </li>
    ))}
  </ul>
)

Checklist.propTypes = {
  list: array.isRequired,
}

export default Checklist
