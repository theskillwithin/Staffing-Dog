import React from 'react'
import { object, func, array } from 'prop-types'

import Button from '../../../../../components/button'

const Nav = ({ steps, goToStep, history }) => (
  <Button
    onClick={() =>
      goToStep({
        currentStep: false,
        nextStep: steps[0].step,
        history,
      })
    }
    round
  >
    Get Started
  </Button>
)

Nav.propTypes = {
  steps: array.isRequired,
  history: object.isRequired,
  goToStep: func.isRequired,
}

export default Nav
