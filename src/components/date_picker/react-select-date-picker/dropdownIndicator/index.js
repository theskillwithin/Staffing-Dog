import React from 'react'
import { bool } from 'prop-types'
import CalSVG from '@sdog/components/svg/Cal'

import styles from './theme.css'

const DropdownIndicator = ({ isFocused }) => (
  <span className={styles.icon}>
    <CalSVG active={isFocused} />
  </span>
)

DropdownIndicator.propTypes = {
  isFocused: bool,
}

export default DropdownIndicator
