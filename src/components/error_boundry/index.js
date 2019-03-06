import React from 'react'
import * as Sentry from '@sentry/browser'
import { node, bool } from 'prop-types'

class ErrorBoundry extends React.Component {
  state = { hasErorr: null }

  static getDerivedStateFromError(hasErorr) {
    return { hasErorr }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })

      Sentry.captureException(error)
    })
  }

  render() {
    if (this.state.hasErorr && !this.props.hideFallback) {
      return (
        <div className="snap">
          <p>sorry — something wrong.</p>
          <p>Our team has been notified, but click below fill out a report.</p>

          <button type="button" onClick={() => Sentry.showReportDialog()}>
            Report feeback
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundry.propTypes = {
  children: node.isRequired,
  hideFallback: bool,
}

ErrorBoundry.defaultProps = {
  hideFallback: false,
}

export default ErrorBoundry
