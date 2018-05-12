import React from 'react'
import { oneOfType, bool, string } from 'prop-types'
import classnames from 'classnames'
import { Icon as MIcon } from 'rmwc/Icon'

import theme from './theme.css'


const Icon = ({ inButton, strategy, primary, ...props }) => (
  <MIcon
    strategy={strategy}
    className={classnames(
      inButton && 'mdc-button__icon',
      'left' === inButton && theme.left,
      'right' === inButton && theme.right,
      primary && theme.primary,
    )}
    {...props}
  />
)

Icon.defaultProps = {
  inButton: false,
  strategy: 'ligature',
}

Icon.propTypes = {
  inButton: oneOfType([
    bool,
    string,
  ]),
  strategy: string,
  primary: bool,
}

export default Icon
