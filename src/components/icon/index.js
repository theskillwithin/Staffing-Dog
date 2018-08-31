import React from 'react'
import { oneOfType, bool, string, object } from 'prop-types'
import classnames from 'classnames'
import { Icon as MIcon } from 'rmwc/Icon'

import theme from './theme.css'

const Icon = ({ inButton, strategy, primary, secondary, size, ...props }) => (
  <MIcon
    iconOptions={{
      strategy,
    }}
    className={classnames(
      theme.root,
      inButton && 'mdc-button__icon',
      'left' === inButton && theme.left,
      'right' === inButton && theme.right,
      primary && theme.primary,
      secondary && theme.secondary,
      size && theme[`size-${size}`],
    )}
    {...props}
  />
)

Icon.defaultProps = {
  inButton: false,
  strategy: 'ligature',
  iconOptions: {},
  primary: false,
  size: false,
  secondary: false,
}

Icon.propTypes = {
  inButton: oneOfType([bool, string]),
  iconOptions: object,
  strategy: string,
  primary: bool,
  secondary: bool,
  size: oneOfType([string, bool]),
}

export default Icon
