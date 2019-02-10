import React, { Component } from 'react'
import { string, bool, object, func, oneOfType, shape } from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import clsx from 'clsx'
import TopError from '@sdog/components/top_error'

import Logo from '../../../../components/logo'
import LoadingBar from '../../../../components/loading_bar'
import Contact from '../../../../components/contact'
import { setTitle } from '../../../../utils/document'
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
  static propTypes = {
    error: oneOfType([bool, string]),
    loading: oneOfType([bool, string]),
    location: object.isRequired,
    match: shape({
      path: string.isRequired,
      params: shape({
        type: string.isRequired,
      }),
    }),
    setType: func.isRequired,
  }

  static defaultProps = {
    error: false,
    loading: false,
  }

  componentDidMount() {
    // TODO: Check if the user has already completed any steps. Go to the next step required
    window.scrollTo(0, 0)

    const {
      match: {
        params: { type },
      },
      setType,
    } = this.props

    setTitle(`Onboarding - set - ${type}`)
    setType(type)
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { type },
      },
      setType,
    } = this.props

    if (prevProps.match.params.type !== type) {
      setType(type)
      setTitle(`Onboarding - ${type}`)
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { loading, error, location, match } = this.props

    const hasStep = RegExp('/step/([0-9]+)')
    const showSidebar = hasStep.test(location.pathname)

    return (
      <div className={theme.app}>
        <div className={theme.appInner}>
          <div className={clsx(theme.appTop, loading && theme.appTopLoading)}>
            <div className={theme.appTopInner}>
              <LoadingBar />
            </div>

            <div className={theme.contactUs}>
              <Contact />
            </div>

            <TopError>{error}</TopError>
          </div>

          <div className={theme.appHeader}>
            <div className={theme.logo}>
              <Logo />
            </div>

            <div className={clsx(theme.stepSidebar, theme.stepSidebarMobile)}>
              <Route path={`${match.path}/step/:step(\\d)`} component={Nav} />
            </div>
          </div>

          <div
            className={clsx(
              theme.appContent,
              /complete/.test(location.pathname) && theme.appContentComplete,
            )}
          >
            <div className={clsx(theme.box, showSidebar && theme.showSidebar)}>
              <div className={theme.stepContent}>
                <div className={theme.stepLinksHolder}>
                  <Route path={`${match.path}/step/:step(\\d)`} component={Nav} />
                </div>

                <div className={theme.stepContentHolder}>
                  <Route path={`${match.path}`} exact component={GetStarted} />
                  <Route path={`${match.path}/step/:step`} component={Steps} />
                </div>
              </div>

              <div className={clsx(theme.stepSidebar, showSidebar && theme.show)}>
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
            <span className={theme.footerCenter}>
              Copyright &copy; 2018 Staffing Dog&nbsp;
            </span>
            <span className={theme.footerRight}>
              <a href="/legal">Legal</a>
            </span>
          </footer>
        </div>
      </div>
    )
  }
}

export default Onboarding
