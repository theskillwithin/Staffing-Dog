import React from 'react'
import { object, bool, func, array, string, shape } from 'prop-types'
import find from 'lodash/find'
import classnames from 'classnames'
import Arrow from '@component/svg/Arrow'

import Button from '../../../../components/button'

import theme from './theme.css'

const ActionNav = ({ match, history, steps, goToStep, savingStep, loadingNextStep }) => {
  const { step } = match.params
  const currentStep = find(steps, s => s.step === step)
  const previousStep = find(steps, s => s.nextStep === currentStep.step)

  return (
    <div className={theme.actionNav}>
      {previousStep && previousStep.step && (
        <div className={classnames(theme.step, theme.previousStep)}>
          <Button
            onClick={() =>
              goToStep({
                currentStep: currentStep.step,
                nextStep: previousStep.step,
                history,
              })
            }
            disabled={savingStep || loadingNextStep}
            secondary
            round
          >
            <span className={theme.iconLeft}>
              <span>
                <Arrow small direction="left" color="white" />
              </span>{' '}
              Previous Step
            </span>
          </Button>
        </div>
      )}
      {currentStep.nextStep && (
        <div className={classnames(theme.step, theme.nextStep)}>
          <Button
            onClick={() =>
              goToStep({
                currentStep: currentStep.step,
                nextStep: currentStep.nextStep,
                history,
              })
            }
            disabled={savingStep || loadingNextStep}
            round
          >
            <span className={theme.iconRight}>
              Next Step{' '}
              <span>
                <Arrow small color="white" />
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
}

export default ActionNav
