import React, { useEffect } from 'react'
import { string, bool, object, func, oneOfType, shape, array } from 'prop-types'
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

const OnboardingLayout = ({
  loading,
  error,
  findRegisterError,
  setType,
  clearError,
  clearRegisterUserError,
  location: { pathname },
  match: {
    path,
    params: { type },
  },
}) => {
  useEffect(
    () => {
      window.scrollTo(0, 0)
      setTitle(`Onboarding - ${type}`)
      setType(type)
    },
    [type],
  )

  useEffect(
    () => {
      clearError()
      clearRegisterUserError()
    },
    [pathname],
  )

  const hasStep = RegExp('/step/([0-9]+)')
  const showSidebar = hasStep.test(pathname)

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

          <TopError>{findRegisterError || error}</TopError>
        </div>

        <div className={theme.appHeader}>
          <div className={theme.logo}>
            <Logo width="63px" largeTxt />
          </div>

          <div className={clsx(theme.stepSidebar, theme.stepSidebarMobile)}>
            <Route path={`${path}/step/:step(\\d)`} component={Nav} />
          </div>
        </div>

        <div
          className={clsx(
            theme.appContent,
            (pathname === '/onboarding/' || pathname === '/onboarding') && theme.noType,
            /complete/.test(pathname) && theme.appContentComplete,
          )}
        >
          <div className={clsx(theme.box, showSidebar && theme.showSidebar)}>
            <div className={theme.stepContent}>
              <div className={theme.stepLinksHolder}>
                <Route path={`${path}/step/:step(\\d)`} component={Nav} />
              </div>

              <div className={theme.stepContentHolder}>
                <Route path={`${path}`} exact component={GetStarted} />
                <Route path={`${path}/step/:step`} component={Steps} />
              </div>
            </div>

            <div className={clsx(theme.stepSidebar, showSidebar && theme.show)}>
              <Route path={`${path}/step/:step(\\d)`} component={StepsSidebar} />
            </div>

            <div className={theme.stepNav}>
              <Switch>
                <Route path={`${path}`} exact component={GetStartedNav} />
                <Route path={`${path}/step/complete`} component={CompleteNav} />
                <Route path={`${path}/step/:step`} component={ActionNav} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

OnboardingLayout.propTypes = {
  error: oneOfType([bool, string, array]),
  findRegisterError: oneOfType([bool, string, array]),
  loading: oneOfType([bool, string]),
  location: object.isRequired,
  match: shape({
    path: string.isRequired,
    params: shape({
      type: string,
    }),
  }),
  setType: func.isRequired,
  clearError: func.isRequired,
  clearRegisterUserError: func.isRequired,
}

OnboardingLayout.defaultProps = {
  error: false,
  loading: false,
}

export default OnboardingLayout
