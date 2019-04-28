import React from 'react'
import { arrayOf, shape, oneOf, oneOfType, string, number, func } from 'prop-types'
import { connect } from 'react-redux'

import { SingleToaster } from '@sdog/components/toaster'
import {
  findGlobalAlerts,
  clearGlobalAlert as clearGlobalAlertAction,
} from '@sdog/store/alerts'

import theme from './theme.css'

const GlobalAlerts = ({ errors, clearGlobalAlert }) => {
  if (!errors.length) {
    return null
  }

  const alerts = errors.map(({ message, type, id }, index) => (
    <SingleToaster
      key={id}
      type={type}
      autoClose
      closeButton
      hasContainer
      multiple={index}
      onClose={() => clearGlobalAlert(id)}
    >
      {message}
    </SingleToaster>
  ))

  return <div className={theme.globalAlerts}>{alerts}</div>
}

GlobalAlerts.propTypes = {
  errors: arrayOf(
    shape({
      message: string,
      id: oneOfType([number, string]),
      type: oneOf(['error', 'warning', 'success', 'info']),
    }),
  ).isRequired,
  clearGlobalAlert: func.isRequired,
}

export const mapStateToProps = state => ({
  errors: findGlobalAlerts(state),
})

export const mapActionsToProps = { clearGlobalAlert: clearGlobalAlertAction }

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(GlobalAlerts)
