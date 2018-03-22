import React from 'react'
import PropTypes from 'prop-types'
import { Button as MButton } from 'rmwc/Button'

// import './styles.css'
import theme from './theme.css'


const Button = ({ primary, secondary, ...props }) => (
  <MButton
    className={theme.button}
    unelevated={primary}
    {...props}
  />
)

Button.defaultProps = {
  primary: true,
  secondary: false,
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
}

export default Button
