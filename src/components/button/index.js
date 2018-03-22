import React from 'react'
import { bool } from 'prop-types'
import { Button as MButton } from 'rmwc/Button'

// import './styles.css'
import theme from './theme.css'


const Button = ({ primary, secondary, ...props }) => (
  <MButton
    className={theme.button}
    unelevated={primary || secondary}
    theme={secondary ? 'secondary-bg' : ''}
    {...props}
  />
)

Button.defaultProps = {
  primary: true,
  secondary: false,
}

Button.propTypes = {
  primary: bool,
  secondary: bool,
}

export default Button
