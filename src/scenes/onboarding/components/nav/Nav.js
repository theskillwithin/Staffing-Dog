import React, { useState, useEffect } from 'react'
import { string, array, object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import map from 'lodash/map'
import indexOf from 'lodash/indexOf'
import find from 'lodash/find'

import theme from './theme.css'

const pInt = n => parseInt(n, 10)

const stepLinkClasses = (currentStep, step, visited, disabled) =>
  clsx(
    pInt(currentStep) === pInt(step) && theme.stepButtonActive,
    theme.stepButton,
    visited >= pInt(step) && theme.visited,
    disabled && theme.disabled,
  )

const Nav = ({ steps, goToStep, exclude, history, className, match: { params } }) => {
  const [visited, setVisited] = useState(params.step || 1)

  useEffect(
    () => {
      if (params.step > visited) {
        setVisited(params.step)
      }
    },
    [params.step],
  )

  const isStepDisabled = stepToCheck => {
    if (pInt(params.step) > 1 && pInt(stepToCheck) === 1) {
      return true
    }

    const previousStep =
      stepToCheck.previousStep &&
      find(steps, checkStep => checkStep.step === stepToCheck.previousStep)

    return previousStep && !previousStep.complete
  }

  return (
    <ul className={clsx(theme.stepLinks, className)}>
      {map(steps, step =>
        indexOf(exclude, step.step) === -1 ? (
          <li key={`stepNav:item:${step.step}`} className={theme.stepLinksItem}>
            <Link
              to={`/step/${step.step}`}
              className={stepLinkClasses(
                params.step,
                step.step,
                visited,
                isStepDisabled(step.step),
              )}
              onClick={e => {
                e.preventDefault()

                if (isStepDisabled(step.step)) {
                  return false
                }

                return goToStep({
                  currentStep: params.step,
                  nextStep: step.step,
                  history,
                })
              }}
            >
              {step.step}
            </Link>
          </li>
        ) : null,
      )}
    </ul>
  )
}

Nav.defaultProps = {
  exclude: ['complete'],
  className: '',
}

Nav.propTypes = {
  className: string,
  steps: array.isRequired,
  match: object.isRequired,
  history: object.isRequired,
  goToStep: func.isRequired,
  exclude: array,
}

export default Nav
