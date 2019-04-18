import React from 'react'
import { bool, shape, string, func, object, array } from 'prop-types'
import find from 'lodash/find'
import get from '@sdog/utils/get'
import Button from '@sdog/components/button'
import Input from '@sdog/components/input'
import DatePicker from '@sdog/components/date_picker'
import Dropdown from '@sdog/components/dropdown'
import Spinner from '@sdog/components/spinner'

import theme from '../new/theme.css'

const JobPostForm = ({ loading, onSubmit, date, setFormValue, options, form, type }) => (
  <form className={theme.form}>
    {'new' === type ? (
      <>
        <h2>New Job Posting</h2>

        <p>
          <Button
            clear
            type="button"
            onClick={() => setFormValue('criteria.employment_type', null)}
          >
            Change job posting type.
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
        onChange={value => setFormValue('office_id', value.value)}
        label="Office Location"
        placeholder="Office Location"
        disabled={'edit' === type && form.id && Boolean(form.office_id)}
      />

      <DatePicker
        value={get(form, 'criteria.duration.start_date', date)}
        onChange={value => setFormValue('criteria.duration.start_date', value)}
        label="Start Date"
        className={theme.startDate}
      />

      <DatePicker
        value={get(form, 'criteria.duration.end_date', date)}
        onChange={value => setFormValue('criteria.duration.end_date', value)}
        label="End Date"
        className={theme.endDate}
      />
    </div>

    <div className={theme.row}>
      <Input
        value={get(form, 'criteria.title', '')}
        onChange={value => setFormValue('criteria.title', value)}
        label="Job Title"
      />
    </div>

    <div className={theme.row}>
      <Input
        value={get(form, 'criteria.description', '')}
        onChange={value => setFormValue('criteria.description', value)}
        label="Short Description. ( max char ? )"
        textarea
        className={theme.shortDescription}
      />
    </div>

    <div className={theme.row}>
      <Input
        value={get(form, 'meta.full_description', '')}
        onChange={value => setFormValue('meta.full_description', value)}
        label="Full Description"
        textarea
        className={theme.fullDescription}
      />
    </div>

    <div className={theme.row}>
      <Dropdown
        value={find(
          options.positions,
          position => position.value === get(form, 'criteria.position', null),
        )}
        onChange={value => setFormValue('criteria.position', value.value)}
        placeholder="Provider Type"
        options={options.positions}
      />

      <Dropdown
        value={find(
          options.positionTypes,
          jobType => jobType.value === get(form, 'criteria.specialty', null),
        )}
        disabled={!get(form, 'criteria.position', null)}
        onChange={value => setFormValue('criteria.specialty', value.value)}
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
        onChange={value => setFormValue('meta.salary_type', value.value)}
        placeholder="Salary Type"
        options={options.salaryTypes}
      />

      <Input
        value={get(form, 'criteria.hourly_rate', 0)}
        onChange={value =>
          setFormValue('criteria.hourly_rate', parseFloat(value.replace(/[^\d.-]/g, '')))
        }
        label={
          get(form, 'meta.salary_type', false) === 'salary'
            ? 'Salary Rate'
            : 'Hourly Rate'
        }
      />
    </div>

    <div className={theme.row}>
      <Input
        value={get(form, 'criteria.experience_min', 1)}
        onChange={value => setFormValue('criteria.experience_min', value)}
        label="Minimum Experience"
        type="number"
      />

      <Input
        value={get(form, 'criteria.experience_preferred', 3)}
        onChange={value => setFormValue('criteria.experience_preferred', value)}
        label="Preferred Experience"
        type="number"
      />
    </div>

    {'new' === type ? (
      <div className={theme.row}>
        <Button
          type="button"
          primary
          className={theme.submitBtn}
          onClick={e => onSubmit(e, 'open')}
          disabled={loading}
        >
          Publish Job Live {loading && <Spinner inverted size={20} center={false} />}
        </Button>

        <Button
          type="button"
          secondary
          className={theme.submitBtn}
          onClick={e => onSubmit(e, 'draft')}
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
        onClick={onSubmit}
      >
        Update Job Posting {loading && <Spinner inverted size={20} center={false} />}
      </Button>
    )}
  </form>
)

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
