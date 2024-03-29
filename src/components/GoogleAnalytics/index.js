import React, { useEffect } from 'react'
import { shape, string, bool } from 'prop-types'
import reactGa from 'react-ga'
import { Route } from 'react-router-dom'

let gaIsInitialized = false

export const GoogleAnalytics = ({ location }) => {
  useEffect(
    () => {
      const page = `${location.pathname}${location.search}`

      reactGa.pageview(page)
    },
    [location.pathname, location.search],
  )

  return null
}

GoogleAnalytics.propTypes = {
  location: shape({
    pathname: string.isRequired,
    search: string,
  }).isRequired,
}

export const initGA = (enable = true, code) => {
  if (enable && !gaIsInitialized) {
    gaIsInitialized = true
    reactGa.initialize(code)
  }

  return enable
}

export const RouteTracker = ({ enable, code, ...props }) =>
  initGA(enable, code) && <Route component={GoogleAnalytics} {...props} />

RouteTracker.propTypes = { enable: bool, code: string }
RouteTracker.defaultProps = { enable: true, code: '' }
