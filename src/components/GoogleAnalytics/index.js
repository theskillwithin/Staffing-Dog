import React, { useEffect } from 'react'
import { shape, string, bool } from 'prop-types'
import reactGa from 'react-ga'
import { Route } from 'react-router-dom'

let gaIsInitialized = false

export const GoogleAnalytics = ({ location }) => {
  useEffect(
    () => {
      const page = `${location.pathname}${location.search}`

      reactGa.set({
        page,
        location: `${location.origin}${page}`,
      })
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

export const initGA = (enable = true) => {
  if (enable && !gaIsInitialized) {
    gaIsInitialized = true
    reactGa.initialize('GA-CODE-HERE')
  }

  return enable
}

export const RouteTracker = ({ enable, ...props }) =>
  initGA(enable) && <Route component={GoogleAnalytics} {...props} />

RouteTracker.propTypes = { enable: bool }
RouteTracker.defaultProps = { enable: true }
