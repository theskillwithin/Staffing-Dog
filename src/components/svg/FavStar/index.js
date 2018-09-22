import React from 'react'
import { string, bool } from 'prop-types'
import classnames from 'classnames'

import SVGStar from '../files/star.svg'

import theme from './theme.css'

const Star = props => (
  <span
    className={classnames(props.className, theme.svg, props.active && theme.active)}
    dangerouslySetInnerHTML={{ __html: SVGStar }}
  />
)

Star.defaultProps = {
  className: '',
  active: false,
}

Star.propTypes = {
  className: string,
  active: bool,
}

export default Star
