import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import find from 'lodash/find'
import map from 'lodash/map'

import Input from '../../../../components/input'
import Dropdown from '../../../../components/dropdown'

import theme from './theme.css'


class Steps extends Component {
  static formatDropdownOptions(options) {
    return map(options, option => ({
      label: option.label || option.value || option,
      value: option.value || option.label || option,
    }))
  }

  onChange = (name, value) => {
    this.props.setValue(name, value)
  }

  getValue = (name) => {
    return this.props.stepValues[name] || ''
  }

  renderComplete = () => {
    return (
      <div className={theme.completeVideo}>
        <span>Video</span>
      </div>
    )
  }

  renderFields = (fields, key = 'row') => {
    const { renderFields, renderField } = this

    return map(fields, (field, i) => (
      <div
        key={`form:field:${key}:${i + 1}`}
        className={classnames(
          theme.formRow,
          field.fields && theme.hasMany,
          !field.fields && 'dropdown' === field.type && theme.hasDropdown,
        )}
      >
        {field.fields
          ? renderFields(field.fields, `${key}:${i + 1}`)
          : renderField(field)
        }
      </div>
    ))
  }

  renderField = (field) => {
    const { getValue, onChange } = this
    const props = {
      value: getValue(field.name),
      onChange: v => onChange(field.name, v),
      label: field.label,
      className: theme.element,
    }

    if (field.fullWidth) {
      props.fullWidth = field.fullWidth
    }

    switch (field.type) {
      case 'input':
        return (
          <Input
            type={field.formType || 'text'}
            {...props}
          />
        )
      case 'dropdown':
        return (
          <Dropdown
            options={Steps.formatDropdownOptions(field.options)}
            {...props}
          />
        )
    }

    return null
  }

  render() {
    const {
      match: {
        params: { step },
      },
      steps,
    } = this.props

    const currentStep = find(steps, s => s.step === step)
    const isComplete = 'complete' === currentStep.step

    return (
      <div className={theme.steps}>
        <div className={theme.stepsContent}>
          <h2 className={theme.stepTitle}>{currentStep.title}</h2>

          <div className={theme.stepForm}>
            {isComplete
              ? this.renderComplete(currentStep)
              : this.renderFields(currentStep.fields)
            }
          </div>
        </div>
      </div>
    )
  }
}

Steps.defaultProps = {
  match: {},
  steps: [],
  stepValues: {},
}

Steps.propTypes = {
  match: PropTypes.object,
  steps: PropTypes.array,
  stepValues: PropTypes.object,
  setValue: PropTypes.func,
  setStep: PropTypes.func,
}

export default Steps
