import React, { useEffect } from 'react'
import { object, func, array, string, shape, oneOfType, bool } from 'prop-types'
import clsx from 'clsx'
import find from 'lodash/find'
import map from 'lodash/map'
import includes from 'lodash/includes'

import Input from '../../../../components/input'
import Dropdown from '../../../../components/dropdown'

import theme from './theme.css'

const Steps = ({
  setValue,
  stepValues,
  errorFields,
  match: {
    params: { step, type },
  },
  steps,
  history,
  goToStep,
  token,
}) => {
  useEffect(
    () => {
      if (step === '1' && token) {
        history.replace(`/onboarding/${type}/step/2`)
      }
    },
    [step],
  )

  const currentStep = find(steps, s => s.step === step)
  const isComplete = 'complete' === currentStep.step

  const formatDropdownOptions = options =>
    map(options, option => ({
      label: option.label || option.value || option,
      value: option.value || option.label || option,
    }))

  const onChange = (name, value) => setValue(name, value)
  const getValue = name => stepValues[name] || ''

  const renderFields = (fields, key = 'row') =>
    map(fields, (field, i) => (
      <div
        key={`form:field:${key}:${i + 1}`}
        className={clsx(
          theme.formRow,
          field.fields && theme.hasMany,
          !field.fields && 'dropdown' === field.type && theme.hasDropdown,
        )}
      >
        {field.fields
          ? renderFields(field.fields, `${key}:${i + 1}`)
          : renderField(field)}
      </div>
    ))

  const renderField = field => {
    const fieldProps = {
      value: getValue(field.name),
      theme: theme.element,
    }

    if (field.fullWidth) {
      fieldProps.fullWidth = field.fullWidth
    }

    switch (field.type) {
      case 'input':
        return (
          <Input
            type={field.formType || 'text'}
            label={field.label}
            onChange={v => onChange(field.name, v)}
            invalid={errorFields && includes(errorFields, field.name)}
            subLabel={field.subLabel}
            {...fieldProps}
          />
        )
      case 'dropdown':
        if (field.optionsByValue) {
          const value = field.optionsByValue.name && getValue(field.optionsByValue.name)

          fieldProps.options = formatDropdownOptions(
            value ? field.optionsByValue.options[value] : [],
          )

          if (!value) {
            fieldProps.disabled = true
          }
        } else {
          fieldProps.options = formatDropdownOptions(field.options)
        }

        return (
          <Dropdown
            invalid={errorFields && includes(errorFields, field.name)}
            onChange={v => onChange(field.name, v.value)}
            placeholder={field.label}
            {...fieldProps}
            value={find(fieldProps.options, option => option.value === fieldProps.value)}
          />
        )
    }

    return null
  }

  return (
    <div className={theme.steps}>
      <div
        className={clsx(
          theme.stepsContent,
          /complete/.test(currentStep.step) && theme.stepsContentComplete,
        )}
      >
        <h2 className={theme.stepTitle}>{currentStep.title}</h2>

        <div className={theme.stepForm}>
          {isComplete ? (
            <div className={theme.completeVideo}>
              <span>Video / Welcome Graphic</span>
            </div>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault()

                goToStep({
                  currentStep: currentStep.step,
                  nextStep: currentStep.nextStep,
                  history,
                })
              }}
            >
              <button type="submit" style={{ display: 'none' }} />
              {renderFields(currentStep.fields)}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

Steps.propTypes = {
  match: shape({
    params: shape({
      step: string.isRequired,
    }),
  }),
  history: object.isRequired,
  steps: array.isRequired,
  stepValues: object.isRequired,
  setValue: func.isRequired,
  setStep: func.isRequired,
  goToStep: func.isRequired,
  errorFields: oneOfType([array, bool]),
  token: oneOfType([bool, string]),
}

export default Steps
