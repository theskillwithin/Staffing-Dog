import React from 'react'
import { bool, func, node, string, oneOfType } from 'prop-types'
import { Switch as MSwitch } from 'rmwc/Switch'

// import './styles.css'
// import theme from './theme.css'


const Switch = ({ checked, onChange, children, left, flip, ...props }) => (
  <div className={flip && 'mdc-switch-flip'}>
    <MSwitch
      checked={checked}
      onChange={onChange}
      {...props}
    >
      {children && children}
    </MSwitch>
  </div>
)

Switch.defaultProps = {
  checked: false,
  onChange: false,
  children: false,
  left: false,
  flip: false,
}

Switch.propTypes = {
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
  flip: bool,
}

export default Switch
