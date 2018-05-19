import React, { Component } from 'react'
import { string, bool, object, oneOfType } from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import classnames from 'classnames'
import Logo from '@sd/components/logo'
import LoadingBar from '@sd/components/loading_bar'

import Steps from './components/steps'
import StepsSidebar from './components/steps_sidebar'
import GetStarted from './components/get_started'
import GetStartedNav from './components/get_started/nav'
import CompleteNav from './components/complete_nav'
import Nav from './components/nav'
import ActionNav from './components/action_nav'
import './styles.css'
import theme from './theme.css'


class Onboarding extends Component {
  componentDidMount() {
    document.title = 'Staffing Dog - Onboarding'
  }

  render() {
    const { loading, error, location, match } = this.props

    console.log('match', match.url)

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
                  <Route path="/step/:step(\d)" component={Nav} />
                </div>

                <div className={theme.stepContentHolder}>
                  <Route path={`${match.url}`} exact component={GetStarted} />
                  <Route path={`${match.url}/step/:step`} component={Steps} />
                </div>
              </div>

              <div
                className={classnames(
                  theme.stepSidebar,
                  showSidebar && theme.show,
                )}
              >
                <Route path={`${match.url}/step/:step(\\d)`} component={StepsSidebar} />
              </div>

              <div className={theme.stepNav}>
                <Switch>
                  <Route path={`${match.url}`} exact component={GetStartedNav} />
                  <Route path={`${match.url}/step/complete`} component={CompleteNav} />
                  <Route path={`${match.url}/step/:step`} component={ActionNav} />
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
  match: object.isRequired,
}

export default Onboarding
