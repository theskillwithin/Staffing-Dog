import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'
import capitalize from 'lodash/capitalize'

import SVGStarX from '../files/star_x.svg'

import theme from './theme.css'

const StarX = props => (
  <span
    className={clsx(props.className, theme.svg, theme[`color${capitalize(props.color)}`])}
    dangerouslySetInnerHTML={{ __html: SVGStarX }}
  />
)

StarX.defaultProps = {
  color: 'gray',
  className: '',
}

StarX.propTypes = {
  color: string,
  className: string,
}

export default StarX
