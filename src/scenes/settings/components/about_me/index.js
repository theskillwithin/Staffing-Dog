import React from 'react'
import Dropzone from 'react-dropzone'
import ProfilePhotoSVG from '@component/svg/ProfilePhoto'
import Input from '@component/input'
import Button from '@component/button'

import EmailVerified from './email_verified'
import theme from './theme.css'


class SettingsAboutMe extends React.Component {
  state = {
    form: {
      files: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postal: '',
      profession: '',
      availability: '',
      wage: '',
      description: '',
      dentalLicenseNumber: '',
      specialty: '',
      insuranceExpiration: '',
    },
    filesError: false,
    verified: true,
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

  handleChange = (field, value) => {
    this.setState(
      ({ form }) => ({ form: { ...form, [field]: value } }),
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
        <div className={theme.formContainer}>
          <div className={theme.inputRow}>
            <Input
              placeholder="First Name"
              value={form.firstName}
              onChange={value => this.handleChange('firstName', value)}
            />
            <Input
              placeholder="Last Name"
              value={form.lastName}
              onChange={value => this.handleChange('lastName', value)}
            />
          </div>
          <div className={theme.inputRow}>
            <Input
              placeholder="Email"
              value={form.email}
              onChange={value => this.handleChange('email', value)}
            />
            <EmailVerified verified={this.state.verified} />
          </div>
          <div className={theme.inputRow}>
            <Input
              placeholder="Phone Number"
              value={form.phone}
              onChange={value => this.handleChange('phone', value)}
            />
            <Button primary round>Verify Phone #</Button>
          </div>
          <div className={theme.inputRow}>
            <Input
              placeholder="Street Address"
              value={form.street}
              onChange={value => this.handleChange('street', value)}
            />
          </div>
          <div className={theme.inputRow}>
            <Input
              placeholder="City"
              value={form.city}
              onChange={value => this.handleChange('city', value)}
            />
            <Input
              placeholder="State"
              value={form.state}
              onChange={value => this.handleChange('state', value)}
            />
            <Input
              placeholder="Postal Code"
              value={form.postal}
              onChange={value => this.handleChange('postal', value)}
            />
          </div>
          <div className={theme.spacer} />
          <div className={theme.inputRow}>
            <Input
              placeholder="Profession"
              value={form.profession}
              onChange={value => this.handleChange('profession', value)}
            />
            <Input
              placeholder="Availability"
              value={form.availability}
              onChange={value => this.handleChange('availability', value)}
            />
            <Input
              placeholder="Hourly Wage"
              value={form.wage}
              onChange={value => this.handleChange('wage', value)}
            />
          </div>
          <div className={theme.inputRow}>
            <Input
              placeholder="Profile Description"
              value={form.description}
              onChange={value => this.handleChange('description', value)}
              textarea
            />
          </div>
          <div className={theme.spacer} />
          <div className={theme.inputRow}>
            <Input
              placeholder="Dental License Number"
              value={form.dentalLicenseNumber}
              onChange={value => this.handleChange('dentalLicenseNumber', value)}
            />
            <Input
              placeholder="Specialty"
              value={form.specialty}
              onChange={value => this.handleChange('specialty', value)}
            />
          </div>
          <div className={theme.inputRow}>
            <Input
              placeholder="Insurance Expiration"
              value={form.insuranceExpiration}
              onChange={value => this.handleChange('insuranceExpiration', value)}
            />
            <Button primary round>Upload Insurance Declaration</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsAboutMe
