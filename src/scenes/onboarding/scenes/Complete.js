import React from 'react'

import { Header, Content } from '../components/layout'
import styles from '../theme.css'

const OnboardingCompleteScene = () => (
  <>
    <Header />
    <Content showBox>
      <div className={styles.stepContent}>
        <div className={styles.stepLinksHolder} />
        <div className={styles.stepContentHolder}>complete page</div>
      </div>

      <div className={styles.stepSidebar} />

      <div className={styles.stepNav}>complete nav</div>
    </Content>
  </>
)

export default OnboardingCompleteScene
