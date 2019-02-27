import React, { useEffect } from 'react'
import { func, shape, object } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import find from 'lodash/find'
import includes from 'lodash/includes'
import debounce from 'lodash/debounce'
import Dropzone from 'react-dropzone'
import ProfilePhotoSVG from '@sdog/components/svg/ProfilePhoto'
import Input from '@sdog/components/input'
import Button from '@sdog/components/button'
import Dropdown from '@sdog/components/dropdown'
import {
  findUserProfile,
  autoSaveUserProfile as autoSaveUserProfileAction,
  uploadUserPhoto as uploadUserPhotoAction,
} from '@sdog/store/user'

import EmailVerified from './email_verified'
import theme from './theme.css'

const states = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
].map(state => ({ label: state, value: state }))

const availability = [
  { label: 'Full Time', value: 'full_time' },
  { label: 'Part Time', value: 'part_time' },
  { label: 'Temporary', value: 'temporary' },
]

const specialties = [
  { label: 'I can fly!', value: '1' },
  { label: 'I run fast', value: '0' },
]

let debouncedAutoSaveUserProfile = null

const FormSpacer = () => <div className={theme.spacer} />

const SettingsAboutMe = ({ autoSaveUserProfile, uploadUserPhoto, profile }) => {
  if (profile.loading) {
    return <p>Loading</p>
  }

  useEffect(() => {
    if (debouncedAutoSaveUserProfile === null) {
      debouncedAutoSaveUserProfile = debounce(autoSaveUserProfile, 1000)
    }

    return () => {
      debouncedAutoSaveUserProfile = null
    }
  }, false)

  const saveForm = (name, value) => {
    // save in redux only
    autoSaveUserProfile(name, value, false)
    // debounce saving with the api
    debouncedAutoSaveUserProfile(name, value)
  }

  const uplodateFile = files => {
    if (files[0]) {
      uploadUserPhoto(files[0])
    }
  }

  return (
    <div>
      <div className={theme.photo}>
        <Dropzone accept="image/jpeg, image/png" onDrop={files => uplodateFile(files)}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={clsx(theme.dropzone, {
                'dropzone--isActive': isDragActive,
              })}
            >
              <h5>Profile Photo</h5>
              <input {...getInputProps()} />
              {profile.preferences.profile_image_url ? (
                <img src={profile.preferences.profile_image_url} alt="Profile" />
              ) : (
                <ProfilePhotoSVG />
              )}

              <span>{isDragActive ? 'Add Photo...' : 'Add Photo'}</span>
            </div>
          )}
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
        </div>
      </div>
      <form className={theme.formContainer}>
        <div className={theme.inputRow}>
          <Input
            label="First Name"
            value={profile.user.first_name}
            onChange={value => saveForm('user.first_name', value)}
          />
          <Input
            label="Last Name"
            value={profile.user.last_name}
            onChange={value => saveForm('user.last_name', value)}
          />
        </div>
        <div className={theme.inputRow}>
          <Input
            label="Email"
            value={profile.user.email}
            onChange={value => saveForm('user.email', value)}
          />
          <EmailVerified verified={profile.verified || false} />
        </div>
        <div className={theme.inputRow}>
          <Input
            label="Phone Number"
            value={profile.user.phone}
            onChange={value => saveForm('user.phone', value)}
          />
          <Button primary round className={theme.verifyPhone}>
            Verify Phone #
          </Button>
        </div>
        <div className={theme.inputRow}>
          <Input
            label="Street Address"
            value={profile.addresses.line_1}
            onChange={value => saveForm('addresses.line_1', value)}
          />
        </div>
        <div className={theme.inputRow}>
          <Input
            label="City"
            value={profile.addresses.city}
            onChange={value => saveForm('addresses.city', value)}
          />
          <Dropdown
            label="State"
            value={find(states, state => state.value === profile.addresses.state) || ''}
            onChange={value => autoSaveUserProfile('addresses.state', value)}
            options={states}
          />
          <Input
            label="Postal Code"
            value={profile.addresses.zip}
            onChange={value => saveForm('addresses.zip', value)}
          />
        </div>
        <FormSpacer />
        <div className={theme.inputRow}>
          <Dropdown
            label="Availability"
            placeholder="Availability"
            isMulti
            isClearable={false}
            value={availability.reduce(
              (values, avail) => [
                ...values,
                ...(includes(profile.meta.capacity.availability || [], avail.value)
                  ? [avail]
                  : []),
              ],
              [],
            )}
            onChange={values =>
              autoSaveUserProfile(
                'meta.capacity.availability',
                values.map(({ value }) => value),
              )
            }
            options={availability}
          />
        </div>
        <div className={theme.inputRow}>
          <Input
            label="Profession"
            value={profile.meta.summary.profession.type}
            onChange={value => saveForm('meta.summary.profession.type', value)}
          />
          <Input
            label="Hourly Wage"
            value={profile.meta.capacity.hourly_wage}
            onChange={value => saveForm('meta.capacity.hourly_wage', value)}
          />
        </div>
        <FormSpacer />
        <div className={theme.inputRow}>
          <Input
            label="Profile Description"
            value={profile.description}
            onChange={value => saveForm('description', value)}
            textarea
          />
        </div>
        <FormSpacer />
        <div className={theme.inputRow}>
          <Input
            label="Dental License Number"
            value={profile.dentalLicenseNumber}
            onChange={value => saveForm('dentalLicenseNumber', value)}
          />
          <Dropdown
            label="Specialty"
            value={profile.meta.summary.profession.specialty}
            onChange={value =>
              autoSaveUserProfile('meta.summary.profession.specialty', value)
            }
            options={specialties}
          />
        </div>
        <div className={clsx(theme.inputRow, theme.withButton)}>
          <Input
            label="Insurance Expiration"
            value={profile.insuranceExpiration}
            onChange={value => saveForm('insuranceExpiration', value)}
          />
          <Button primary round>
            Upload Insurance Declaration
          </Button>
        </div>
      </form>
    </div>
  )
}

SettingsAboutMe.propTypes = {
  autoSaveUserProfile: func.isRequired,
  uploadUserPhoto: func.isRequired,
  profile: shape({
    preferences: object,
  }).isRequired,
}

export const mapStateToProps = state => ({
  profile: findUserProfile(state),
})

export const mapActionsToProps = {
  autoSaveUserProfile: autoSaveUserProfileAction,
  uploadUserPhoto: uploadUserPhotoAction,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(SettingsAboutMe)
