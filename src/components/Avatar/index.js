import React from 'react'
import { oneOfType, object, bool, string, number, shape } from 'prop-types'

import get from '@sdog/utils/get'
import ProfilePhotoSVG from '@sdog/components/svg/ProfilePhoto'

import theme from './theme.css'

const Avatar = ({ user, url, size, alt, color }) => {
  const imageSrc = url || get(user, 'criteria.practice_details.profiel_image_url', false)
  const width = get(size, 'width', size)
  const height = get(size, 'height', size)

  if (imageSrc) {
    return (
      <img className={theme.img} src={imageSrc} width={width} height={height} alt={alt} />
    )
  }

  return <ProfilePhotoSVG inline size={parseInt(width, 0)} color={color} />
}

Avatar.propTypes = {
  user: oneOfType([object, bool]),
  url: oneOfType([bool, string]),
  size: oneOfType([
    string,
    number,
    shape({ width: oneOfType([number, string]), height: oneOfType([number, string]) }),
  ]),
  alt: string.isRequired,
  color: string,
}

Avatar.defaultProps = {
  user: false,
  url: false,
  size: 32,
  color: 'purple',
}

export default Avatar
