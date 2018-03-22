import React from 'react'
import PropTypes from 'prop-types'
import find from 'lodash/find'

import Button from '../../../../components/button'
import Icon from '../../../../components/icon'


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
    <div>
      {previousStep && previousStep.step
        ? (
          <p>
            <Button
              onClick={() => goToStep(previousStep.step, history)}
              disabled={savingStep || loadingNextStep}
            >
              <span><Icon inButton="left" use="arrow_back" /> Previous Step</span>
            </Button>
          </p>
        )
        : null
      }
      {currentStep.nextStep
        ? (
          <p>
            <Button
              onClick={() => goToStep(currentStep.nextStep, history)}
              disabled={savingStep || loadingNextStep}
            >
              <span>Next Step <Icon inButton="right" use="arrow_forward" /></span>
            </Button>
          </p>
        )
        : null
      }
    </div>
  )
}

ActionNav.defaultProps = {
  match: {},
  history: {},
  steps: [],
  savingStep: false,
  loadingNextStep: false,
}

ActionNav.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  steps: PropTypes.array,
  savingStep: PropTypes.bool,
  loadingNextStep: PropTypes.bool,
  goToStep: PropTypes.func,
}

export default ActionNav
