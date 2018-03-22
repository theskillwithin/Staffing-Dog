import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import map from 'lodash/map'
import indexOf from 'lodash/indexOf'

import theme from './theme.css'


const pInt = n => parseInt(n, 10)

const stepLinkClasses = (currentStep, step) => {
  return classnames(
    pInt(currentStep) === pInt(step) && theme.stepButtonActive,
    theme.stepButton,
  )
}

const Nav = ({ steps, goToStep, exclude, match, history, className }) => (
  <ul className={classnames(theme.stepLinks, className)}>
    {map(steps, step => (
      indexOf(exclude, step.step) === -1
        ? (
          <li
            key={`stepNav:item:${step.step}`}
            className={theme.stepLinksItem}
          >
            <Link
              to={`/step/${step.step}`}
              className={stepLinkClasses(match.params.step, step.step)}
              onClick={(e) => {
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
        )
        : null
    ))}
  </ul>
)

Nav.defaultProps = {
  steps: [],
  match: {},
  history: {},
  exclude: ['complete'],
  className: '',
}

Nav.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.array,
  match: PropTypes.object,
  history: PropTypes.object,
  goToStep: PropTypes.func,
  exclude: PropTypes.array,
}

export default Nav
