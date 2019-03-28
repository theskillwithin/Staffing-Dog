import React, { useEffect } from 'react'
import { oneOfType, shape, string, func, bool } from 'prop-types'
import { findToken } from '@sdog/store/user'

import { Header, Content } from '../components/layout'
import GetStarted from '../components/get_started'
import GetStartedNav from '../components/get_started/nav'
import styles from '../theme.css'

const OnboardingRootScene = ({ match, history, token }) => {
  useEffect(
    () => {
      if (token) {
        history.replace(`${match.url}/step/2`)
      }
    },
    [token],
  )

  return (
    <>
      <Header />
      <Content>
        <div className={styles.stepContent}>
          <div className={styles.stepLinksHolder} />
          <div className={styles.stepContentHolder}>
            <GetStarted chooseType />
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

OnboardingRootScene.propTypes = {
  token: oneOfType([bool, string]),
  history: shape({ replace: func }).isRequired,
  match: shape({ url: string }).isRequired,
}

OnboardingRootScene.defaultProps = {
  token: false,
}

export const mapStateToProps = state => ({
  token: findToken(state),
})

export default OnboardingRootScene
