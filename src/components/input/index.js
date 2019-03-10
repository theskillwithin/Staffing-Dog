import React from 'react'
import { func, string, bool, number, oneOfType } from 'prop-types'
import clsx from 'clsx'
import Check from '@sdog/components/svg/Check'
import Invalid from '@sdog/components/svg/Invalid'

import s from './theme.css'

const Input = ({
  label,
  theme,
  outlined,
  textarea,
  onChange,
  type,
  thumbprint,
  invalid,
  valid,
  value,
  disabled,
  subLabel,
  ...props
}) => {
  const id = `input-id-${Math.random()
    .toString()
    .slice(2)}`

  const handleOnChange = e => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <>
      <div
        className={clsx(
          s.root,
          theme,
          invalid && s.invalid,
          valid && s.valid,
          (textarea || type === 'textarea') && s.textarea,
          disabled && s.disabled,
          !invalid && !valid && thumbprint && s.password,
        )}
      >
        {textarea ? (
          <textarea
            id={id}
            className={clsx(
              s.input,
              outlined && s.outlined,
              value && value.length > 0 && s.filled,
            )}
            onChange={handleOnChange}
            value={value}
            {...props}
          />
        ) : (
          <input
            id={id}
            className={clsx(
              s.input,
              outlined && s.outlined,
              value && value.length > 0 && s.filled,
            )}
            onChange={handleOnChange}
            type={type}
            value={value}
            {...props}
          />
        )}
        <label className={s.label} htmlFor={id}>
          {label}
        </label>
        {valid && (
          <div className={s.check}>
            <Check color="green" />
          </div>
        )}
        {invalid && (
          <div className={s.invalidStar}>
            <Invalid />
          </div>
        )}
      </div>
      {subLabel && <div className={s.subLabel}>{subLabel}</div>}
    </>
  )
}

Input.defaultProps = {
  outlined: true,
  textarea: false,
  type: 'text',
  invalid: false,
  valid: false,
  disabled: false,
  thumbprint: false,
  subLabel: false,
}

Input.propTypes = {
  label: string.isRequired,
  onChange: func,
  theme: string,
  outlined: bool,
  textarea: bool,
  type: string,
  invalid: bool,
  valid: bool,
  value: oneOfType([string, number]),
  disabled: bool,
  thumbprint: bool,
  subLabel: bool,
}

export default Input
