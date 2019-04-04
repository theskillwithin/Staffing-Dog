import React from 'react'

import { Header, Content } from '../components/layout'
import GetStarted from '../components/get_started'
import GetStartedNav from '../components/get_started/nav'
import styles from '../theme.css'

const OnboardingRootScene = () => (
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

export default OnboardingRootScene
