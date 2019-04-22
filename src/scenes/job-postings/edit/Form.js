import React, { useState } from 'react'
import { bool, shape, string, func, object, array } from 'prop-types'
import find from 'lodash/find'
import get from '@sdog/utils/get'
import Button from '@sdog/components/button'
import Input from '@sdog/components/input'
import DatePicker from '@sdog/components/date_picker'
import Dropdown from '@sdog/components/dropdown'
import Spinner from '@sdog/components/spinner'
import Arrow from '@sdog/components/svg/Arrow'
import Alert from '@sdog/components/alert'

import theme from '../new/theme.css'

const requiredFields = [
  'office_id',
  'criteria.duration.start_date',
  'criteria.duration.end_date',
  'criteria.title',
  'criteria.description',
  'meta.full_description',
  'criteria.position',
  'meta.salary_type',
  'criteria.hourly_rate',
  'criteria.experience_min',
  'criteria.experience_preferred',
]

const JobPostForm = ({ loading, onSubmit, date, setFormValue, options, form, type }) => {
  const [inValidFields, setInvalidFields] = useState([])

  const handleSetFormValue = (field, value) => {
    if (inValidFields.includes(field)) {
      setInvalidFields(inValidFields.filter(f => f !== field))
    }
    setFormValue(field, value)
  }

  const submit = (e, formType) => {
    const findRequireds = requiredFields
      .map(requiredField => {
        const findRequiredField = get(form, requiredField, '')
        if (
          findRequiredField === 0 ||
          (findRequiredField &&
            (findRequiredField.length || findRequiredField.toString().length) > 0)
        ) {
          return false
        }
        return requiredField
      })
      .filter(Boolean)

    if (findRequireds.length) {
      setInvalidFields(findRequireds)
    } else {
      onSubmit(e, formType)
    }
  }

  const isInvalid = field => {
    return inValidFields.includes(field)
  }

  return (
    <form className={theme.form}>
      {'new' === type ? (
        <>
          <h2>New Job Posting</h2>

          <p className={theme.changePostingType}>
            <Button
              type="button"
              onClick={() => setFormValue('criteria.employment_type', null)}
            >
              <Arrow direction="left" color="white" small />
              Change job posting type
            </Button>
          </p>
        </>
      ) : (
        <h2>Edit Job Posting</h2>
      )}

      <div className={theme.row}>
        <Dropdown
          value={find(
            options.offices,
            office => office.value === get(form, 'office_id', false),
          )}
          options={options.offices}
          onChange={value => handleSetFormValue('office_id', value.value)}
          label="Office Location"
          placeholder="Office Location"
          disabled={'edit' === type && form.id && Boolean(form.office_id)}
          invalid={isInvalid('options.offices')}
        />

        <DatePicker
          value={get(form, 'criteria.duration.start_date', date)}
          onChange={value => handleSetFormValue('criteria.duration.start_date', value)}
          label="Start Date"
          className={theme.startDate}
        />

        <DatePicker
          value={get(form, 'criteria.duration.end_date', date)}
          onChange={value => handleSetFormValue('criteria.duration.end_date', value)}
          label="End Date"
          className={theme.endDate}
        />
      </div>

      <div className={theme.row}>
        <Input
          value={get(form, 'criteria.title', '')}
          onChange={value => handleSetFormValue('criteria.title', value)}
          label="Job Title"
          invalid={isInvalid('criteria.title')}
        />
      </div>

      <div className={theme.row}>
        <Input
          value={get(form, 'criteria.description', '')}
          onChange={value => handleSetFormValue('criteria.description', value)}
          label="Short Description. ( max characters 580 )"
          textarea
          className={theme.shortDescription}
          maxlength={580}
          invalid={isInvalid('criteria.description')}
        />
      </div>

      <div className={theme.row}>
        <Input
          value={get(form, 'meta.full_description', '')}
          onChange={value => handleSetFormValue('meta.full_description', value)}
          label="Full Description"
          textarea
          className={theme.fullDescription}
          invalid={isInvalid('meta.full_description')}
        />
      </div>

      <div className={theme.row}>
        <Dropdown
          value={find(
            options.positions,
            position => position.value === get(form, 'criteria.position', null),
          )}
          onChange={value => handleSetFormValue('criteria.position', value.value)}
          placeholder="Provider Type"
          options={options.positions}
          invalid={isInvalid('criteria.position')}
        />

        <Dropdown
          value={find(
            options.positionTypes,
            jobType => jobType.value === get(form, 'criteria.specialty', null),
          )}
          disabled={!get(form, 'criteria.position', null)}
          onChange={value => handleSetFormValue('criteria.specialty', value.value)}
          placeholder="Job Type"
          options={options.positionTypes}
        />
      </div>

      <div className={theme.row}>
        <Dropdown
          value={find(
            options.salaryTypes,
            salaryType => salaryType.value === get(form, 'meta.salary_type', null),
          )}
          onChange={value => handleSetFormValue('meta.salary_type', value.value)}
          placeholder="Salary Type"
          options={options.salaryTypes}
          invalid={isInvalid('meta.salary_type')}
        />

        <Input
          value={get(form, 'criteria.hourly_rate', 0)}
          onChange={value =>
            handleSetFormValue(
              'criteria.hourly_rate',
              parseFloat(value.replace(/[^\d.-]/g, '')),
            )
          }
          label={
            get(form, 'meta.salary_type', false) === 'salary'
              ? 'Salary Rate'
              : 'Hourly Rate'
          }
          invalid={isInvalid('criteria.hourly_rate')}
        />
      </div>

      <div className={theme.row}>
        <Input
          value={get(form, 'criteria.experience_min', 1)}
          onChange={value => handleSetFormValue('criteria.experience_min', value)}
          label="Minimum Experience"
          type="number"
          invalid={isInvalid('criteria.experience_min')}
        />

        <Input
          value={get(form, 'criteria.experience_preferred', 3)}
          onChange={value => handleSetFormValue('criteria.experience_preferred', value)}
          label="Preferred Experience"
          type="number"
          invalid={isInvalid('criteria.experience_preferred')}
        />
      </div>

      {'new' === type ? (
        <div className={theme.submitBtns}>
          <Button
            type="button"
            primary
            className={theme.submitBtn}
            onClick={e => submit(e, 'open')}
            disabled={loading}
          >
            Publish Job Live {loading && <Spinner inverted size={20} center={false} />}
          </Button>

          <Button
            type="button"
            secondary
            className={theme.submitBtn}
            onClick={e => submit(e, 'draft')}
            disabled={loading}
          >
            Save Job as Draft {loading && <Spinner inverted size={20} center={false} />}
          </Button>
        </div>
      ) : (
        <Button
          disabled={loading}
          type="button"
          className={theme.submitBtn}
          onClick={submit}
        >
          Update Job Posting {loading && <Spinner inverted size={20} center={false} />}
        </Button>
      )}
      {inValidFields.length ? (
        <Alert error>Please fill out the required fields</Alert>
      ) : null}
    </form>
  )
}

JobPostForm.propTypes = {
  type: string.isRequired,
  setFormValue: func.isRequired,
  date: string.isRequired,
  form: object.isRequired,
  options: shape({
    salaryTypes: array.isRequired,
    offices: array.isRequired,
    positions: array.isRequired,
    positionTypes: array.isRequired,
  }).isRequired,
  clearCache: func.isRequired,
  onSubmit: func.isRequired,
  loading: bool,
}

JobPostForm.defaultProps = {
  loading: false,
}

export default JobPostForm
