import React from 'react'
import { bool } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

const Hamburger = ({ active }) => (
  <div className={clsx(theme.hamburger)}>
    <div className={clsx(theme.lines, active && theme.active)} />
  </div>
)

Hamburger.defualtProps = {
  active: false,
}

Hamburger.propTypes = {
  active: bool,
}

export default Hamburger
