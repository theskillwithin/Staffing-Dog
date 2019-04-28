import React from 'react'
import { object, bool, func, array, string, shape, oneOfType } from 'prop-types'
import find from 'lodash/find'
import clsx from 'clsx'

import Arrow from '@sdog/components/svg/Arrow'
import Spinner from '@sdog/components/spinner'

import Button from '../../../../components/button'

import theme from './theme.css'

const ActionNav = ({
  match,
  history,
  steps,
  goToStep,
  savingStep,
  loadingNextStep,
  token,
}) => {
  const { step } = match.params
  const currentStep = find(steps, s => s.step === step)
  const previousStep = find(steps, s => s.nextStep === currentStep.step)

  const hidePreviousStep = previousStep && parseInt(previousStep.step, 10) === 1 && token

  return (
    <div className={theme.actionNav}>
      {!hidePreviousStep && previousStep && previousStep.step && (
        <div className={clsx(theme.step, theme.previousStep)}>
          <Button
            onClick={() =>
              goToStep({
                currentStep: currentStep.step,
                nextStep: previousStep.step,
                history,
              })
            }
            disabled={savingStep || loadingNextStep}
            size="medium"
            secondary
            round
          >
            <span className={theme.iconLeft}>
              <span>
                <Arrow small direction="left" color="white" />
              </span>{' '}
              Previous
            </span>
          </Button>
        </div>
      )}

      {currentStep.nextStep && (
        <div className={clsx(theme.step, theme.nextStep)}>
          <Button
            onClick={() =>
              goToStep({
                currentStep: currentStep.step,
                nextStep: currentStep.nextStep,
                history,
              })
            }
            disabled={savingStep || loadingNextStep}
            size="medium"
            round
          >
            <span className={theme.iconRight}>
              Next Step{' '}
              <span
                className={clsx({ [theme.spinnerRight]: savingStep || loadingNextStep })}
              >
                {savingStep || loadingNextStep ? (
                  <Spinner inverted size={20} center={false} />
                ) : (
                  <Arrow small color="white" />
                )}
              </span>
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}

ActionNav.defaultProps = {
  savingStep: false,
  loadingNextStep: false,
}

ActionNav.propTypes = {
  match: shape({
    params: shape({
      step: string.isRequired,
    }),
  }),
  history: object.isRequired,
  steps: array.isRequired,
  savingStep: bool,
  loadingNextStep: bool,
  goToStep: func.isRequired,
  token: oneOfType([bool, string]),
}

export default ActionNav
