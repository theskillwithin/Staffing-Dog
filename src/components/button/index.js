import React from 'react'
import { bool, string, oneOfType, func, node, oneOf } from 'prop-types'
import clsx from 'clsx'
import Spinner from '@sdog/components/spinner'

import theme from './theme.css'

const Button = ({
  clear,
  primary,
  secondary,
  secondaryDark,
  red,
  round,
  short,
  className,
  onClick,
  disabled,
  loading,
  children,
  type,
  size,
  width,
  ...props
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    className={clsx(
      theme.button,
      round && theme.round,
      short && theme.short,
      clear
        ? theme.clear
        : [
            primary && theme.primary,
            secondary && theme.secondary,
            secondaryDark && theme.secondary,
            secondaryDark && theme.secondaryDark,
          ],
      red && theme.red,
      className && className,
      size && theme[size],
      width && theme.width,
      disabled && theme.disabled,
      loading && theme.loading,
    )}
    onClick={onClick}
    type={type}
    disabled={disabled || loading}
    style={{ width }}
    {...props}
  >
    {children}
    {loading && (
      <span className={theme.spinner}>
        <Spinner inverted size={20} center={false} />
      </span>
    )}
  </button>
)

Button.defaultProps = {
  type: 'submit',
  primary: true,
  secondary: false,
  secondaryDark: false,
  round: false,
  short: false,
  className: false,
  disabled: false,
  loading: false,
  size: 'mediumSmall',
  width: null,
  red: false,
  clear: false,
}

Button.propTypes = {
  onClick: func,
  primary: bool,
  secondary: bool,
  secondaryDark: bool,
  round: bool,
  short: bool,
  className: oneOfType([string, bool]),
  children: oneOfType([string, node]),
  disabled: bool,
  type: oneOf(['button', 'submit', 'reset']),
  loading: bool,
  size: oneOf(['small', 'mediumSmall', 'medium', 'large']),
  width: string,
  red: bool,
  clear: bool,
}

export default Button
