import React from 'react'
import { object, func, array } from 'prop-types'
import Arrow from '@sdog/components/svg/Arrow'

import theme from './theme.css'

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
    className={theme.letsGetStartedButton}
  >
    Let&apos;s Get Started{' '}
    <span>
      <Arrow small color="white" />
    </span>
  </Button>
)

Nav.propTypes = {
  steps: array.isRequired,
  history: object.isRequired,
  goToStep: func.isRequired,
}

export default Nav
