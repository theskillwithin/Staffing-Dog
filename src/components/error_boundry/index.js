import React from 'react'
import { node } from 'prop-types'

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
    // if (window.location.hostname !== 'localhost') {
    //   Raven.config(
    //     'https://994f29befea14fa290b422f2903557bb@sentry.io/1186797',
    //   ).install();
    // }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    this.setState({ errorInfo })
    // if (window.location.hostname !== 'localhost') {
    //   Raven.captureException(error, { extra: errorInfo });
    // }
  }

  // handleOnClick() {
  //   return Raven.lastEventId() && Raven.showReportDialog();
  // }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <div className="snap">
          <p>sorry — something wrong.</p>
          <p>Our team has been notified, but click here fill out a report.</p>
          <p>{this.state.error}</p>
          <p>{this.state.errorInfo}</p>
        </div>
      )
    }
    // when there's not an error, render children untouched
    return this.props.children
  }
}

ErrorBoundry.propTypes = {
  children: node.isRequired,
}

export default ErrorBoundry
