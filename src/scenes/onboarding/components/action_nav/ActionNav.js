import React from 'react'
import { object, array, bool, func } from 'prop-types'
import find from 'lodash/find'
import classnames from 'classnames'

import Button from '../../../../components/button'
import Icon from '../../../../components/icon'

import theme from './theme.css'


const ActionNav = ({
  match,
  history,
  steps,
  goToStep,
  savingStep,
  loadingNextStep,
}) => {
  const { step } = match.params
  const currentStep = find(steps, s => s.step === step)
  const previousStep = find(steps, s => s.nextStep === currentStep.step)

  return (
    <div className={theme.actionNav}>
      {previousStep && previousStep.step
        ? (
          <div className={classnames(theme.step, theme.previousStep)}>
            <Button
              onClick={() => goToStep({
                currentStep: currentStep.step,
                nextStep: previousStep.step,
                history,
              })}
              disabled={savingStep || loadingNextStep}
              secondary
            >
              <span><Icon inButton="left" use="arrow_back" /> Previous Step</span>
            </Button>
          </div>
        )
        : null
      }
      {currentStep.nextStep
        ? (
          <div className={classnames(theme.step, theme.nextStep)}>
            <Button
              onClick={() => goToStep({
                currentStep: currentStep.step,
                nextStep: currentStep.nextStep,
                history,
              })}
              disabled={savingStep || loadingNextStep}
            >
              <span>Next Step <Icon inButton="right" use="arrow_forward" /></span>
            </Button>
          </div>
        )
        : null
      }
    </div>
  )
}

ActionNav.defaultProps = {
  savingStep: false,
  loadingNextStep: false,
}

ActionNav.propTypes = {
  match: object.isRequired,
  history: object.isRequired,
  steps: array.isRequired,
  savingStep: bool,
  loadingNextStep: bool,
  goToStep: func.isRequired,
}

export default ActionNav
