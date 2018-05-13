import React from 'react'
import { bool, func, node, string, oneOfType } from 'prop-types'
import { Switch as MSwitch } from 'rmwc/Switch'
import classnames from 'classnames'

// import './styles.css'
import theme from './theme.css'


const Button = ({ checked, onChange, children, left, ...props }) => (
  <MSwitch
    checked={checked}
    className={classnames(theme.switch)}
    onChange={onChange}
    {...props}
  >
    {children && children}
  </MSwitch>
)

Button.defaultProps = {
  checked: false,
  onChange: false,
  children: false,
  left: false,
}

Button.propTypes = {
  checked: bool,
  left: bool,
  onChange: oneOfType([
    func,
    bool,
  ]),
  children: oneOfType([
    string,
    node,
    bool,
  ]),
}

export default Button
