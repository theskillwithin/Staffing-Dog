import React from 'react'
import { string, number } from 'prop-types'
import clsx from 'clsx'

import SVGProfilePhoto from '../files/profile-photo.svg'

import theme from './theme.css'

const ProfilePhotoSVG = ({ size, color, className }) => (
  <span
    className={clsx(className, theme.svg, color && theme[color])}
    dangerouslySetInnerHTML={{ __html: SVGProfilePhoto }}
    style={{ width: size, height: size }}
  />
)

ProfilePhotoSVG.defaultProps = {
  className: '',
  size: 122,
  color: 'grey',
}

ProfilePhotoSVG.propTypes = {
  className: string,
  size: number,
  color: string,
}

export default ProfilePhotoSVG
