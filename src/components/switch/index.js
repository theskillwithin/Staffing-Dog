import React from 'react'
import { bool, func, node, string, oneOfType } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'

const id = `inputs-id-${Math.random()
  .toString()
  .slice(2)}`

const Switch = ({ checked, onChange, children, label, disabled, ...props }) => (
  <div className={classnames(theme.root, disabled && theme.disabled)}>
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
      disabled={disabled}
      {...props}
    />
    <div className={theme.knobs} />
    <div className={theme.layer} />
  </div>
)

Switch.defaultProps = {
  children: null,
  label: null,
  disabled: false,
}

Switch.propTypes = {
  label: string,
  checked: bool.isRequired,
  onChange: func.isRequired,
  children: oneOfType([string, node]),
  disabled: bool,
}

export default Switch
