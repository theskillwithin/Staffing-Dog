import React from 'react'

import { Header, Content } from '../components/layout'
import CompleteNav from '../components/complete_nav'
import Steps from '../components/steps'
import styles from '../theme.css'

const OnboardingCompleteScene = () => (
  <>
    <Header />
    <Content showBox>
      <div className={styles.stepContent}>
        <div className={styles.stepLinksHolder} />
        <div className={styles.stepContentHolder}>
          <Steps />
        </div>
      </div>

      <div className={styles.stepSidebar} />

      <div className={styles.stepNav}>
        <CompleteNav />
      </div>
    </Content>
  </>
)

export default OnboardingCompleteScene
