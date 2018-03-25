import React from 'react'
import { oneOfType, bool, string } from 'prop-types'
import classnames from 'classnames'
import { Icon as MIcon } from 'rmwc/Icon'

import theme from './theme.css'


const Icon = ({ inButton, strategy, ...props }) => (
  <MIcon
    strategy={strategy}
    className={classnames(
      inButton && 'mdc-button__icon',
      'left' === inButton && theme.left,
      'right' === inButton && theme.right,
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
}

export default Icon
