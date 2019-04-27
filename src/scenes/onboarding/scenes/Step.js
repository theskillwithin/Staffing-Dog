import React, { useEffect } from 'react'
import { oneOfType, bool, func, shape, string } from 'prop-types'
import clsx from 'clsx'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setTitle } from '@sdog/utils/document'
import { findToken } from '@sdog/store/user'

import { setType as setTypeAction } from '../store/steps'
import { Header, Content } from '../components/layout'
import Steps from '../components/steps'
import StepsSidebar from '../components/steps_sidebar'
import ActionNav from '../components/action_nav'
import Nav from '../components/nav'
import styles from '../theme.css'

const OnboardingStepScene = ({
  match: {
    params: { type, step },
  },
  history,
  token,
  setType,
}) => {
  useEffect(() => void setType(type), [type])

  useEffect(
    () => {
      // don't allow access to the first step if they have already registered
      if (step === '1' && token) {
        history.replace(`/onboarding/${type}/step/2`)
      }

      window.scrollTo(0, 0)
      setTitle(`Onboarding - ${type} - Step ${step}`)
    },
    [type, step],
  )

  return (
    <>
      <Header>
        <div className={clsx(styles.stepSidebar, styles.stepSidebarMobile)}>
          <Nav />
        </div>
      </Header>

      <Content showBox showSidebar>
        <div className={styles.stepContent}>
          <div className={styles.stepLinksHolder}>
            <Nav />
          </div>
          <div className={styles.stepContentHolder}>
            <Steps />
          </div>
        </div>

        <div className={clsx(styles.stepSidebar, styles.show)}>
          <StepsSidebar />
        </div>

        <div className={styles.stepNav}>
          <ActionNav />
        </div>
      </Content>
    </>
  )
}

OnboardingStepScene.propTypes = {
  match: shape({ params: shape({ type: string, step: string }) }).isRequired,
  history: shape({ repalce: func }).isRequired,
  token: oneOfType([bool, string]),
  setType: func.isRequired,
}

const mapStateToProps = state => ({ token: findToken(state) })

export default withRouter(
  connect(
    mapStateToProps,
    { setType: setTypeAction },
  )(OnboardingStepScene),
)
