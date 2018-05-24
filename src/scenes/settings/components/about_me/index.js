import React from 'react'
import ProfilePhotoSVG from '@component/svg/ProfilePhoto'

import theme from './theme.css'


class SettingsAboutMe extends React.Component {
  state = {
    form: {},
  }

  render() {
    return (
      <div className={theme.about}>
        <ProfilePhotoSVG />
      </div>
    )
  }
}

export default SettingsAboutMe
