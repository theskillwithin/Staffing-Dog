import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../../../../components/button'


const Nav = ({ steps, goToStep, history }) => (
  <Button
    onClick={() => goToStep(steps[0].step, history)}
  >
    Get Started
  </Button>
)

Nav.defaultProps = {
  steps: [],
  history: {},
}

Nav.propTypes = {
  steps: PropTypes.array,
  history: PropTypes.object,
  goToStep: PropTypes.func,
}

export default Nav
