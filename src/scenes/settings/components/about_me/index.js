import React from 'react'
import Dropzone from 'react-dropzone'
import ProfilePhotoSVG from '@component/svg/ProfilePhoto'

import theme from './theme.css'


class SettingsAboutMe extends React.Component {
  state = {
    form: {},
  }

  render() {
    return (
      <div className={theme.about}>
        <div className={theme.photo}>
          <Dropzone className={theme.dropzone}>
            <h5>Profile Photo</h5>
            <ProfilePhotoSVG />
            <span>Add Photo</span>
          </Dropzone>
          <div>
            <ul>
              <li>
              Having a complete rich profile will help you stand out from{' '}
              the crowd and attract more employers.
              </li>
              <li>
              This information is visible to employers. Your information is{' '}
              not shared with anyone without your explicit consent.
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsAboutMe
