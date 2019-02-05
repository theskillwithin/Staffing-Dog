import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'
import map from 'lodash/map'

import Circle from '../svg/Circle'
import Star from '../svg/Star'

import theme from './theme.css'

const stars = [
  { type: 'star', color: 'blue' },
  { type: 'star', color: 'green' },
  { type: 'star', color: 'blue' },
  { type: 'star', color: 'orange' },
]
const circles = [
  { type: 'circle', color: 'gray' },
  { type: 'circle', color: 'orange' },
  { type: 'circle', color: 'blue' },
  { type: 'circle', color: 'purple' },
  { type: 'circle', color: 'gray' },
  { type: 'circle', color: 'green' },
]

const StarTitle = ({ title }) => (
  <h2 className={clsx(theme.starTitle, theme.title)}>
    <span className={theme.text}>{title}</span>
    <span className={theme.stars}>
      {map(stars, (star, i) => (
        <Star className={theme.star} key={`circle:${i + 1}`} color={star.color} />
      ))}
    </span>

    <span className={theme.circles}>
      {map(circles, (circle, i) => (
        <Circle className={theme.circle} key={`circle:${i + 1}`} color={circle.color} />
      ))}
    </span>
  </h2>
)

StarTitle.defaultProps = {
  title: '',
}

StarTitle.propTypes = {
  title: string,
}

export default StarTitle
