import React from 'react'
import { array, object, func } from 'prop-types'

import Button from '../../../../../components/button'


const Nav = ({ steps, goToStep, history }) => (
  <Button
    onClick={() => goToStep({
      currentStep: false,
      nextStep: steps[0].step,
      history,
    })}
  >
    Get Started
  </Button>
)

Nav.defaultProps = {}

Nav.propTypes = {
  steps: array.isRequired,
  history: object.isRequired,
  goToStep: func.isRequired,
}

export default Nav
