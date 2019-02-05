import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGHeadset from '../files/headset.svg'

import theme from './theme.css'

const HeadsetSVG = props => (
  <span
    className={clsx(props.className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGHeadset }}
  />
)

HeadsetSVG.defaultProps = {
  className: '',
}

HeadsetSVG.propTypes = {
  className: string,
}

export default HeadsetSVG
