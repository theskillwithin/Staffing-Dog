import React from 'react'
import { func, shape, object, string } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import find from 'lodash/find'
import includes from 'lodash/includes'
import Dropzone from 'react-dropzone'
import Spinner from '@sdog/components/spinner'
import Alert from '@sdog/components/alert'
import ProfilePhotoSVG from '@sdog/components/svg/ProfilePhoto'
import Input from '@sdog/components/input'
import Button from '@sdog/components/button'
import Dropdown from '@sdog/components/dropdown'
import {
  findUserProfile,
  saveUserProfile,
  loadingUserProfile,
  loadingUserProfileError,
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

const FormSpacer = () => <div className={theme.spacer} />

const SettingsAboutMe = ({
  saveProfile,
  uploadUserPhoto,
  profile,
  photoError,
  photoLoading,
}) => {
  if (profile.loading) {
    return (
      <div className={theme.loading}>
        <Spinner />
      </div>
    )
  }

  const [form, setForm] = React.useState({
    profile: {
      description: profile.description,
      dentalLicenseNumber: profile.dentalLicenseNumber,
      insuranceExpiration: profile.insuranceExpiration,
      user: {
        first_name: profile.user.first_name,
        last_name: profile.user.last_name,
        email: profile.user.email,
        phone: profile.user.phone,
      },
      addresses: {
        line_1: profile.addresses.line_1,
        city: profile.addresses.city,
        state: find(states, state => state.value === profile.addresses.state) || '',
        zip: profile.addresses.zip,
      },
      meta: {
        capacity: {
          availability: availability.reduce(
            (values, avail) => [
              ...values,
              ...(includes(profile.meta.capacity.availability || [], avail.value)
                ? [avail]
                : []),
            ],
            [],
          ),
          hourly_wage: profile.meta.capacity.hourly_wage,
        },
        summary: {
          profession: {
            type: profile.meta.summary.profession.type,
            specialty: profile.meta.summary.profession.specialty,
          },
        },
      },
    },
  })

  const submit = e => {
    e.preventDefault()
    const modifyDropdownsData = {
      profile: {
        ...form.profile,
        addresses: {
          ...form.profile.addresses,
          state: form.profile.addresses.state.value,
        },
        meta: {
          ...form.profile.meta,
          capacity: {
            ...form.profile.meta.capacity,
            availability: form.profile.meta.capacity.availability.map(avil => avil.value),
          },
          summary: {
            ...form.profile.meta.summary,
            profession: {
              ...form.profile.meta.summary.profession,
              type: profile.meta.summary.profession.type.value,
              specailty: profile.meta.summary.profession.type.value,
            },
          },
        },
      },
    }
    saveProfile(modifyDropdownsData)
  }

  const uplodateFile = files => {
    if (files[0]) {
      uploadUserPhoto(files[0])
    }
  }

  return (
    <div>
      <div className={theme.photo}>
        {photoLoading && (
          <div className={theme.photoLoading}>
            <Spinner center={false} />
          </div>
        )}
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
                <img
                  src={profile.preferences.profile_image_url}
                  alt="Profile"
                  width="122"
                  height="122"
                />
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
          <Alert error>{photoError}</Alert>
        </div>
      </div>
      <form className={theme.formContainer} onSubmit={e => submit(e)}>
        <div className={theme.inputRow}>
          <Input
            label="First Name"
            value={form.profile.user.first_name}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  user: {
                    ...form.profile.user,
                    first_name: value,
                  },
                },
              })
            }
          />
          <Input
            label="Last Name"
            value={form.profile.user.last_name}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  user: {
                    ...form.profile.user,
                    last_name: value,
                  },
                },
              })
            }
          />
        </div>
        <div className={theme.inputRow}>
          <Input
            label="Email"
            value={form.profile.user.email}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  user: {
                    ...form.profile.user,
                    email: value,
                  },
                },
              })
            }
          />
          <EmailVerified verified={profile.verified || false} />
        </div>
        <div className={theme.inputRow}>
          <Input
            label="Phone Number"
            value={form.profile.user.phone}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  user: {
                    ...form.profile.user,
                    phone: value,
                  },
                },
              })
            }
          />
          <Button primary round className={theme.verifyPhone}>
            Verify Phone #
          </Button>
        </div>
        <div className={theme.inputRow}>
          <Input
            label="Street Address"
            value={form.profile.addresses.line_1}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  addresses: {
                    ...form.profile.addresses,
                    line_1: value,
                  },
                },
              })
            }
          />
        </div>
        <div className={theme.inputRow}>
          <Input
            label="City"
            value={form.profile.addresses.city}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  addresses: {
                    ...form.profile.addresses,
                    city: value,
                  },
                },
              })
            }
          />
          <Dropdown
            label="State"
            value={form.profile.addresses.state}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  addresses: {
                    ...form.profile.addresses,
                    state: value,
                  },
                },
              })
            }
            options={states}
          />
          <Input
            label="Postal Code"
            value={form.profile.addresses.zip}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  addresses: {
                    ...form.profile.addresses,
                    zip: value,
                  },
                },
              })
            }
          />
        </div>
        <FormSpacer />
        <div className={theme.inputRow}>
          <Dropdown
            label="Availability"
            placeholder="Availability"
            isMulti
            isClearable={false}
            value={form.profile.meta.capacity.availability}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  meta: {
                    ...form.profile.meta,
                    capacity: {
                      ...form.profile.meta.capacity,
                      availability: value,
                    },
                  },
                },
              })
            }
            options={availability}
          />
        </div>
        <div className={theme.inputRow}>
          <Input
            label="Profession"
            value={form.profile.meta.summary.profession.type}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  meta: {
                    ...form.profile.meta,
                    summary: {
                      ...form.profile.meta.summary,
                      profession: {
                        ...form.profile.meta.summary.profession,
                        type: value,
                      },
                    },
                  },
                },
              })
            }
          />
          <Input
            label="Hourly Wage"
            value={form.profile.meta.capacity.hourly_wage}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  meta: {
                    ...form.profile.meta,
                    capacity: {
                      ...form.profile.meta.capacity,
                      hourly_wage: value,
                    },
                  },
                },
              })
            }
          />
        </div>
        <FormSpacer />
        <div className={theme.inputRow}>
          <Input
            label="Profile Description"
            value={form.profile.description}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  description: value,
                },
              })
            }
            textarea
          />
        </div>
        <FormSpacer />
        <div className={theme.inputRow}>
          <Input
            label="Dental License Number"
            value={form.profile.dentalLicenseNumber}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  dentalLicenseNumber: value,
                },
              })
            }
          />
          <Dropdown
            label="Specialty"
            value={form.profile.meta.summary.profession.specialty}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  meta: {
                    ...form.profile.meta,
                    summary: {
                      ...form.profile.meta.summary,
                      profession: {
                        ...form.profile.meta.summary.profession,
                        specialty: value,
                      },
                    },
                  },
                },
              })
            }
            options={specialties}
          />
        </div>
        <div className={clsx(theme.inputRow, theme.withButton)}>
          <Input
            label="Insurance Expiration"
            value={form.profile.insuranceExpiration}
            onChange={value =>
              setForm({
                ...form,
                profile: {
                  ...form.profile,
                  insuranceExpiration: value,
                },
              })
            }
          />
          <Button primary round>
            Upload Insurance Declaration
          </Button>
        </div>
        <hr />
        <Button type="submit" className={theme.submit}>
          Save
        </Button>
        <Alert error>{profile.error}</Alert>
      </form>
    </div>
  )
}

SettingsAboutMe.propTypes = {
  saveProfile: func.isRequired,
  uploadUserPhoto: func.isRequired,
  profile: shape({
    preferences: object,
  }).isRequired,
  photoLoading: string,
  photoError: string,
}

export const mapStateToProps = state => ({
  profile: findUserProfile(state),
  photoLoading: loadingUserProfile(state),
  photoError: loadingUserProfileError(state),
})

export const mapActionsToProps = {
  saveProfile: saveUserProfile,
  uploadUserPhoto: uploadUserPhotoAction,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(SettingsAboutMe)
