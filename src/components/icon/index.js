import React from 'react'
import PropTypes from 'prop-types'
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
  inButton: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  strategy: PropTypes.string,
}

export default Icon
