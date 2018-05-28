import React from 'react'
import classnames from 'classnames'
import Dropzone from 'react-dropzone'
import ProfilePhotoSVG from '@component/svg/ProfilePhoto'
import Input from '@component/input'
import Button from '@component/button'
import Dropdown from '@component/dropdown'

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
      state: 'CA',
      postal: '',
      profession: '',
      availability: '0',
      wage: '',
      description: '',
      dentalLicenseNumber: '',
      specialty: '0',
      insuranceExpiration: '',
    },
    filesError: false,
    verified: true,
  }

  onDrop = (files, rejected) => {
    if (rejected && rejected.length) {
      return this.setState({ filesError: 'must be a jpeg or png' })
    }

    return this.setState(({ form }) => ({ filesError: false, form: { ...form, files } }))
  }

  states = [
    { label: 'CA', value: 'CA' },
    { label: 'UT', value: 'UT' },
    { label: 'OR', value: 'OR' },
  ]

  availabilitys = [{ label: 'Never', value: '0' }, { label: 'Forever', value: '1' }]

  specialties = [
    { label: 'good with kids', value: '1' },
    { label: 'bad with kids', value: '0' },
  ]

  handleChange = (field, value) => {
    this.setState(({ form }) => ({ form: { ...form, [field]: value } }))
  }

  render() {
    const { form } = this.state
    return (
      <div>
        <div className={theme.photo}>
          <Dropzone
            className={theme.dropzone}
            accept="image/jpeg, image/png"
            onDrop={this.onDrop}
          >
            <h5>Profile Photo</h5>
            {form.files && form.files.length ? (
              <img src={form.files[0].preview} alt={form.files[0].name} />
            ) : (
              <ProfilePhotoSVG />
            )}
            <span>Add Photo</span>
          </Dropzone>
          <div>
            <ul>
              <li>
                Having a complete rich profile will help you stand out from the crowd and
                attract more employers.
              </li>
              <li>
                This information is visible to employers. Your information is not shared
                with anyone without your explicit consent.
              </li>
            </ul>
            <p>{this.state.filesError}</p>
          </div>
        </div>
        <form className={theme.formContainer}>
          <div className={theme.inputRow}>
            <Input
              label="First Name"
              value={form.firstName}
              onChange={value => this.handleChange('firstName', value)}
            />
            <Input
              label="Last Name"
              value={form.lastName}
              onChange={value => this.handleChange('lastName', value)}
            />
          </div>
          <div className={theme.inputRow}>
            <Input
              label="Email"
              value={form.email}
              onChange={value => this.handleChange('email', value)}
            />
            <EmailVerified verified={this.state.verified} />
          </div>
          <div className={theme.inputRow}>
            <Input
              label="Phone Number"
              value={form.phone}
              onChange={value => this.handleChange('phone', value)}
            />
            <Button primary round className={theme.verifyPhone}>
              Verify Phone #
            </Button>
          </div>
          <div className={theme.inputRow}>
            <Input
              label="Street Address"
              value={form.street}
              onChange={value => this.handleChange('street', value)}
            />
          </div>
          <div className={theme.inputRow}>
            <Input
              label="City"
              value={form.city}
              onChange={value => this.handleChange('city', value)}
            />
            <Dropdown
              label="State"
              value={form.state}
              onChange={value => this.handleChange('state', value)}
              options={this.states}
            />
            <Input
              label="Postal Code"
              value={form.postal}
              onChange={value => this.handleChange('postal', value)}
            />
          </div>
          <div className={theme.spacer} />
          <div className={theme.inputRow}>
            <Input
              label="Profession"
              value={form.profession}
              onChange={value => this.handleChange('profession', value)}
            />
            <Dropdown
              label="Availability"
              value={form.availability}
              onChange={value => this.handleChange('availability', value)}
              options={this.availabilitys}
            />
            <Input
              label="Hourly Wage"
              value={form.wage}
              onChange={value => this.handleChange('wage', value)}
            />
          </div>
          <div className={theme.inputRow}>
            <Input
              label="Profile Description"
              value={form.description}
              onChange={value => this.handleChange('description', value)}
              textarea
              outlined={false}
            />
          </div>
          <div className={theme.spacer} />
          <div className={theme.inputRow}>
            <Input
              label="Dental License Number"
              value={form.dentalLicenseNumber}
              onChange={value => this.handleChange('dentalLicenseNumber', value)}
            />
            <Dropdown
              label="Specialty"
              value={form.specialty}
              onChange={value => this.handleChange('specialty', value)}
              options={this.specialties}
            />
          </div>
          <div className={classnames(theme.inputRow, theme.withButton)}>
            <Input
              label="Insurance Expiration"
              value={form.insuranceExpiration}
              onChange={value => this.handleChange('insuranceExpiration', value)}
            />
            <Button primary round>
              Upload Insurance Declaration
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default SettingsAboutMe
