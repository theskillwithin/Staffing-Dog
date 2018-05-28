import React, { Component } from 'react'
import { string, bool, object, func, oneOfType, shape } from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import classnames from 'classnames'
import Logo from '@sd/components/logo'
import LoadingBar from '@sd/components/loading_bar'
import { setTitle } from '@util/document'

import Steps from '../steps'
import StepsSidebar from '../steps_sidebar'
import GetStarted from '../get_started'
import GetStartedNav from '../get_started/nav'
import CompleteNav from '../complete_nav'
import Nav from '../nav'
import ActionNav from '../action_nav'
import '../../styles.css'
import theme from '../../theme.css'


class Onboarding extends Component {
  componentDidMount() {
    setTitle(`Onboarding - ${this.props.match.params.type}`)

    this.props.setType(this.props.match.params.type)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.props.setType(this.props.match.params.type)
      setTitle(`Onboarding - ${this.props.match.params.type}`)
    }
  }

  render() {
    const { loading, error, location, match } = this.props

    const hasStep = RegExp('/step/([0-9]+)')
    const showSidebar = hasStep.test(location.pathname)

    return (
      <div className={theme.app}>
        <div className={theme.appInner}>
          <div className={classnames(theme.appTop, loading && theme.appTopLoading)}>
            <div className={theme.appTopInner}>
              <LoadingBar />
            </div>

            {error && <div className={theme.topError}><p>{error}</p></div>}
          </div>

          <div className={theme.appHeader}>
            <div className={theme.logo}>
              <Logo />
            </div>
          </div>

          <div className={theme.appContent}>
            <div className={classnames(theme.box, showSidebar && theme.showSidebar)}>
              <div className={theme.stepContent}>
                <div className={theme.stepLinksHolder}>
                  <Route path={`${match.path}/step/:step(\\d)`} component={Nav} />
                </div>

                <div className={theme.stepContentHolder}>
                  <Route path={`${match.path}`} exact component={GetStarted} />
                  <Route path={`${match.path}/step/:step`} component={Steps} />
                </div>
              </div>

              <div
                className={classnames(
                  theme.stepSidebar,
                  showSidebar && theme.show,
                )}
              >
                <Route path={`${match.path}/step/:step(\\d)`} component={StepsSidebar} />
              </div>

              <div className={theme.stepNav}>
                <Switch>
                  <Route path={`${match.path}`} exact component={GetStartedNav} />
                  <Route path={`${match.path}/step/complete`} component={CompleteNav} />
                  <Route path={`${match.path}/step/:step`} component={ActionNav} />
                </Switch>
              </div>
            </div>
          </div>

          <footer className={theme.appFooter}>
            <span className={theme.footerLeft}>&nbsp;</span>
            <span className={theme.footerCenter}>Copyright &copy; 2018 Staffing Dog&nbsp;</span>
            <span className={theme.footerRight}><a href="#/legal">Legal</a></span>
          </footer>
        </div>
      </div>
    )
  }
}

Onboarding.defaultProps = {
  error: false,
  loading: false,
}

Onboarding.propTypes = {
  error: oneOfType([
    bool,
    string,
  ]),
  loading: oneOfType([
    bool,
    string,
  ]),
  location: object.isRequired,
  match: shape({
    path: string.isRequired,
    params: shape({
      type: string.isRequired,
    }),
  }),
  setType: func.isRequired,
}

export default Onboarding
