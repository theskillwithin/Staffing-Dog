import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import capitalize from 'lodash/capitalize'

import SVGCircle from '../files/circle.svg'

import theme from './theme'


const Circle = props => (
  <span
    className={classnames(props.className, theme.svg, theme[`color${capitalize(props.color)}`])}
    dangerouslySetInnerHTML={{ __html: SVGCircle }}
  />
)

Circle.defaultProps = {
  color: 'gray',
  className: '',
}

Circle.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
}

export default Circle
