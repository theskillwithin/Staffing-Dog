import React from 'react'
import { oneOfType, func, shape, object, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import find from 'lodash/find'
import includes from 'lodash/includes'
import Dropzone from 'react-dropzone'

import get from '@sdog/utils/get'
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
  findUpdateProfile,
} from '@sdog/store/user'
import { stateOptions } from '@sdog/definitions/locations'
import {
  positions,
  getPositionTypesByPosition,
  employmentTypes,
} from '@sdog/definitions/jobs'

import EmailVerified from './email_verified'
import PhoneVerified from './phone_verified'
import theme from './theme.css'

const FormSpacer = () => <div className={theme.spacer} />

const SettingsAboutMe = ({
  saveProfile,
  uploadUserPhoto,
  profile,
  photoError,
  photoLoading,
  updateProfile,
}) => {
  if (profile.loading) {
    return (
      <div className={theme.loading}>
        <Spinner />
      </div>
    )
  }

  const isNotPractice = get(profile, 'user.type', 'professional') !== 'practice'

  const findInitTypeDropdown = find(positions, {
    value: get(profile, 'meta.summary.profession.type', ''),
  })

  const typeDropdownInit = findInitTypeDropdown
    ? {
        label: findInitTypeDropdown ? findInitTypeDropdown.label : {},
        value: get(profile, 'meta.summary.profession.type', ''),
      }
    : ''

  const getSpecialty = get(profile, 'meta.summary.profession.specialty', [])

  const findInitSpecialtyDropdown = s =>
    find(getPositionTypesByPosition(get(profile, 'meta.summary.profession.type', '')), {
      value: s,
    })

  const specialtyDropdownInit =
    getSpecialty && getSpecialty.length
      ? getSpecialty.map(s => findInitSpecialtyDropdown(s))
      : []

  const [form, setForm] = React.useState({
    profile: {
      user: {
        first_name: profile.user.first_name,
        last_name: profile.user.last_name,
        email: profile.user.email,
        phone: profile.user.phone,
      },
      addresses: {
        line_1: profile.addresses.line_1,
        city: profile.addresses.city,
        state: find(stateOptions, state => state.value === profile.addresses.state) || '',
        zip: profile.addresses.zip,
      },
      meta: {
        capacity: {
          availability: employmentTypes.reduce(
            (values, avail) => [
              ...values,
              ...(includes(get(profile, 'meta.capacity.availability', []), avail.value)
                ? [avail]
                : []),
            ],
            [],
          ),
          hourly_wage: get(profile, 'meta.capacity.hourly_wage', ''),
        },
        summary: {
          dental_license_number: get(profile, 'meta.summary.dental_license_number', ''),
          excerpt: get(profile, 'meta.summary.excerpt', ''),
          profession: {
            type: typeDropdownInit,
            specialty: specialtyDropdownInit,
          },
        },
      },
    },
  })

  const getProfileDataToSave = () => ({
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
            type: form.profile.meta.summary.profession.type.value,
            specialty:
              get(form, 'profile.meta.summary.profession.specialty', []) &&
              get(form, 'profile.meta.summary.profession.specialty', []).length
                ? get(form, 'profile.meta.summary.profession.specialty', []).map(
                    s => s && s.value,
                  )
                : [],
          },
        },
      },
    },
  })

  const submit = e => {
    e.preventDefault()

    const modifyDropdownsData = getProfileDataToSave()
    saveProfile(modifyDropdownsData)
  }

  const uplodateFile = files => {
    if (files[0]) {
      uploadUserPhoto(files[0])
    }
  }

  return (
    <div>
      {profile.error && <Alert error>{profile.error}</Alert>}

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
          {photoError && <Alert error>{photoError}</Alert>}
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
          <EmailVerified verified={get(profile, 'user.verified_email', false)} />
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
          <PhoneVerified
            verified={get(profile, 'user.verified_phone', false)}
            updateProfileData={getProfileDataToSave()}
          />
        </div>
        {isNotPractice && (
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
        )}
        {isNotPractice && (
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
              options={stateOptions}
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
        )}
        {isNotPractice && <FormSpacer />}
        {isNotPractice && (
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
              options={employmentTypes}
            />
          </div>
        )}
        {isNotPractice && (
          <div className={theme.inputRow}>
            <Dropdown
              label="Profession"
              placeholder="Profession"
              value={form.profile.meta.summary.profession.type}
              options={positions}
              onChange={value => {
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
                          specialty: [],
                        },
                      },
                    },
                  },
                })
              }}
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
        )}
        {isNotPractice && (
          <div className={theme.inputRow}>
            <Dropdown
              label="Speciailty"
              placeholder="Speciailty"
              value={form.profile.meta.summary.profession.specialty}
              options={getPositionTypesByPosition(
                get(form, 'profile.meta.summary.profession.type.value', ''),
              )}
              isMulti
              height={120}
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
            />
          </div>
        )}
        {isNotPractice && <FormSpacer />}
        {isNotPractice && (
          <div className={theme.inputRow}>
            <Input
              label="Profile Description"
              value={form.profile.meta.summary.excerpt}
              onChange={value =>
                setForm({
                  ...form,
                  profile: {
                    ...form.profile,
                    meta: {
                      ...form.profile.meta,
                      summary: {
                        ...form.profile.meta.summary,
                        excerpt: value,
                      },
                    },
                  },
                })
              }
              textarea
            />
          </div>
        )}
        {isNotPractice && <FormSpacer />}
        <div className={theme.inputRow}>
          {isNotPractice && (
            <Input
              label="Dental License Number"
              value={form.profile.meta.summary.dental_license_number}
              onChange={value =>
                setForm({
                  ...form,
                  profile: {
                    ...form.profile,
                    meta: {
                      ...form.profile.meta,
                      summary: {
                        ...form.profile.meta.summary,
                        dental_license_number: value,
                      },
                    },
                  },
                })
              }
            />
          )}
          {/* <Dropdown
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
          /> */}
        </div>
        {/* <div className={clsx(theme.inputRow, theme.withButton)}>
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
        </div> */}
        <hr />
        <Button type="submit" className={theme.submit} loading={updateProfile.loading}>
          {updateProfile.loading ? 'Saving' : 'Save'}
        </Button>
        {updateProfile.error && <Alert error>{updateProfile.error}</Alert>}
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
  updateProfile: shape({ loading: bool, error: oneOfType([bool, string]) }),
}

export const mapStateToProps = state => ({
  profile: findUserProfile(state),
  photoLoading: loadingUserProfile(state),
  photoError: loadingUserProfileError(state),
  updateProfile: findUpdateProfile(state),
})

export const mapActionsToProps = {
  saveProfile: saveUserProfile,
  uploadUserPhoto: uploadUserPhotoAction,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(SettingsAboutMe)
