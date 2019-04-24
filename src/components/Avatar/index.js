import React from 'react'
import { oneOfType, object, bool, string, number, shape } from 'prop-types'
import get from '@sdog/utils/get'
import ProfilePhotoSVG from '@sdog/components/svg/ProfilePhoto'

const Avatar = ({ user, url, size, alt }) => {
  const imageSrc = url || get(user, 'criteria.practice_details.profiel_image_url', false)
  const width = get(size, 'width', size)
  const height = get(size, 'height', size)

  if (imageSrc) {
    return <img src={imageSrc} width={width} height={height} alt={alt} />
  }

  return <ProfilePhotoSVG inline size={parseInt(width, 0)} color="purple" />
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
}

Avatar.defaultProps = {
  user: false,
  url: false,
  size: 32,
}

export default Avatar
