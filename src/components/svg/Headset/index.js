import React from 'react'
import { string } from 'prop-types'
import classnames from 'classnames'

import SVGHeadset from '../files/headset.svg'

import theme from './theme.css'

const HeadsetSVG = props => (
  <span
    className={classnames(props.className, theme.svg)}
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
