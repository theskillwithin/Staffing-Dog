import React from 'react'
import { bool, func, node, string, oneOfType } from 'prop-types'

import theme from './theme.css'

const id = `input-id-${Math.random()
  .toString()
  .slice(2)}`

const Switch = ({ checked, onChange, children, label, ...props }) => (
  <div className={theme.root}>
    {label ||
      (children && (
        <label className={theme.label} htmlFor={id}>
          {label || children}
        </label>
      ))}
    <input
      id={id}
      type="checkbox"
      className={theme.checkbox}
      onChange={e => onChange(e.target.checked)}
      checked={checked}
      {...props}
    />
    <div className={theme.knobs} />
    <div className={theme.layer} />
  </div>
)

Switch.defaultProps = {
  children: null,
  label: null,
}

Switch.propTypes = {
  label: string,
  checked: bool.isRequired,
  onChange: func.isRequired,
  children: oneOfType([string, node]),
}

export default Switch
