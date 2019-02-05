import React from 'react'
import { string, array, object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import map from 'lodash/map'
import indexOf from 'lodash/indexOf'

import theme from './theme.css'

const pInt = n => parseInt(n, 10)

const stepLinkClasses = (currentStep, step, visited) => {
  return clsx(
    pInt(currentStep) === pInt(step) && theme.stepButtonActive,
    theme.stepButton,
    visited >= pInt(step) && theme.visited,
  )
}

class Nav extends React.Component {
  state = {
    visited: 1,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.step > prevState.visited) {
      return { visited: nextProps.match.params.step }
    }
    return null
  }

  render() {
    const { steps, goToStep, exclude, match, history, className } = this.props

    return (
      <ul className={clsx(theme.stepLinks, className)}>
        {map(steps, step =>
          indexOf(exclude, step.step) === -1 ? (
            <li key={`stepNav:item:${step.step}`} className={theme.stepLinksItem}>
              <Link
                to={`/step/${step.step}`}
                className={stepLinkClasses(
                  match.params.step,
                  step.step,
                  this.state.visited,
                )}
                onClick={e => {
                  e.preventDefault()
                  goToStep({
                    currentStep: match.params.step,
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
