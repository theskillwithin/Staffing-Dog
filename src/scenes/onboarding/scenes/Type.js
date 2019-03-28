import React, { useEffect } from 'react'
import { shape, string, func, oneOfType, bool } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setTitle } from '@sdog/utils/document'
import { findToken } from '@sdog/store/user'

import { setType as setTypeAction } from '../store/steps'
import { Header, Content } from '../components/layout'
import GetStarted from '../components/get_started'
import GetStartedNav from '../components/get_started/nav'
import styles from '../theme.css'

const OnboardingTypeScene = ({
  match: {
    params: { url, type },
  },
  setType,
  token,
  history,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    setTitle(`Onboarding - ${type}`)

    setType(type)
  }, type)

  useEffect(
    () => {
      if (token) {
        history.push(`${url}/step/2`)
      }
    },
    [token, url],
  )

  return (
    <>
      <Header />
      <Content showBox>
        <div className={styles.stepContent}>
          <div className={styles.stepLinksHolder} />
          <div className={styles.stepContentHolder}>
            <GetStarted type={type} />
          </div>
        </div>

        <div className={styles.stepSidebar} />

        <div className={styles.stepNav}>
          <GetStartedNav />
        </div>
      </Content>
    </>
  )
}

OnboardingTypeScene.propTypes = {
  match: shape({ params: shape({ type: string }) }).isRequired,
  history: shape({ push: func }).isRequired,
  setType: func.isRequired,
  token: oneOfType([bool, string]),
}

export const mapStateToProps = state => ({ token: findToken(state) })

export default withRouter(
  connect(
    mapStateToProps,
    { setType: setTypeAction },
  )(OnboardingTypeScene),
)
