import React from 'react'
import { string, number, bool } from 'prop-types'
import clsx from 'clsx'

import SVGProfilePhoto from '../files/profile-photo.svg'

import theme from './theme.css'

const ProfilePhotoSVG = ({ size, color, className, inline }) => (
  <span
    className={clsx(className, theme.svg, inline && theme.inline, color && theme[color])}
    dangerouslySetInnerHTML={{ __html: SVGProfilePhoto }}
    style={{ width: size, height: size }}
  />
)

ProfilePhotoSVG.defaultProps = {
  className: '',
  size: 122,
  color: 'grey',
  inline: false,
}

ProfilePhotoSVG.propTypes = {
  className: string,
  size: number,
  color: string,
  inline: bool,
}

export default ProfilePhotoSVG
