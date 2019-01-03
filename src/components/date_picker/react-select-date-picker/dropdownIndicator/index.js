import React from 'react'
import { bool } from 'prop-types'
import CalSVG from '@sdog/components/svg/Cal'

import s from './theme.css'

const DropdownIndicator = ({ isFocused }) => (
  <span className={s.icon}>
    <CalSVG active={isFocused} />
  </span>
)

DropdownIndicator.propTypes = {
  isFocused: bool,
}

export default DropdownIndicator
