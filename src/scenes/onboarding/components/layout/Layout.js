import React from 'react'
import { string, bool, object, oneOfType } from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import classnames from 'classnames'

import Logo from '../../../../components/logo'
import LoadingBar from '../../../../components/loading_bar'
import Steps from '../steps'
import StepsSidebar from '../steps_sidebar'
import GetStarted from '../get_started'
import GetStartedNav from '../get_started/nav'
import CompleteNav from '../complete_nav'
import Nav from '../nav'
import ActionNav from '../action_nav'

import './styles.css'
import theme from './theme.css'


const Layout = ({ loading, error, location }) => {
  const hasStep = RegExp('/step/([0-9]+)')
  const showSidebar = hasStep.test(location.pathname)

  return (
    <div className={theme.app}>
      <div className={theme.appInner}>
        <div className={classnames(theme.appTop, loading && theme.appTopLoading)}>
          <div className={theme.appTopInner}>
            <LoadingBar />
          </div>

          {error
            ? <div className={theme.topError}><p>{error}</p></div>
            : null
          }
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
                <Switch>
                  <Route path="/step/complete" render={() => null} />
                  <Route path="/step/:step" component={Nav} />
                </Switch>
              </div>

              <div className={theme.stepContentHolder}>
                <Route
                  exact
                  path="/"
                  component={GetStarted}
                />

                <Route
                  path="/step/:step"
                  component={Steps}
                />
              </div>
            </div>

            <div
              className={classnames(
                theme.stepSidebar,
                showSidebar && theme.show,
              )}
            >
              <Switch>
                <Route exact path="/step/complete" render={() => null} />
                <Route
                  path="/step/:step"
                  component={StepsSidebar}
                />
              </Switch>
            </div>

            <div className={theme.stepNav}>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={GetStartedNav}
                />

                <Route
                  path="/step/complete"
                  component={CompleteNav}
                />

                <Route
                  path="/step/:step"
                  component={ActionNav}
                />
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

Layout.defaultProps = {
  error: false,
  loading: false,
}

Layout.propTypes = {
  error: oneOfType([
    bool,
    string,
  ]),
  loading: oneOfType([
    bool,
    string,
  ]),
  location: object.isRequired,
}

export default Layout
