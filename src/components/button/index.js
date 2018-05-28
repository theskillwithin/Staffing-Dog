import React from 'react'
import { bool } from 'prop-types'
import { Button as MButton } from 'rmwc/Button'
import classnames from 'classnames'

// import './styles.css'
import theme from './theme.css'

const Button = ({ primary, secondary, round, short, ...props }) => (
  <MButton
    className={classnames(theme.button, round && theme.round, short && theme.short)}
    unelevated={primary || secondary}
    theme={secondary ? 'secondary-bg' : ''}
    {...props}
  />
)

Button.defaultProps = {
  primary: true,
  secondary: false,
  round: false,
  short: false,
}

Button.propTypes = {
  primary: bool,
  secondary: bool,
  round: bool,
  short: bool,
}

export default Button
