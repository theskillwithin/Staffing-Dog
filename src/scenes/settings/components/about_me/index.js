import React from 'react'
import Dropzone from 'react-dropzone'
import ProfilePhotoSVG from '@component/svg/ProfilePhoto'

import theme from './theme.css'


class SettingsAboutMe extends React.Component {
  state = {
    form: {
      files: [],
    },
    filesError: false,
  }

  onDrop = (files, rejected) => {
    if (rejected && rejected.length) {
      return this.setState({ filesError: 'must be a jpeg or png' })
    }

    this.setState({ filesError: false })

    return this.setState(
      ({ form }) => ({ form: { ...form, files } }),
    )
  }

  render() {
    const { form } = this.state
    return (
      <div className={theme.about}>
        <div className={theme.photo}>
          <Dropzone
            className={theme.dropzone}
            accept="image/jpeg, image/png"
            onDrop={this.onDrop}
          >
            <h5>Profile Photo</h5>
            {form.files && form.files.length
              ? (<img src={form.files[0].preview} alt={form.files[0].name} />)
              : <ProfilePhotoSVG />
            }
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
            <p>{this.state.filesError}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsAboutMe
