import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { setTitle } from '@sdog/utils/document'
import Tabs from '@sdog/components/tab_bar'
import Card from '@sdog/components/card'

import appTheme from '../app/theme.css'

import Header from './components/header'
import AboutMe from './components/about_me'

const Settings = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  useEffect(() => void setTitle('Settings'), [])

  return (
    <div className={clsx(appTheme.pageContent)}>
      <Card type="large">
        <Header />

        <Tabs
          activeTabIndex={activeTabIndex}
          onSelect={setActiveTabIndex}
          underline
          exactWidthTab
          left
          settingsTabs
          fw500
        >
          {[<div key="tempkey">About Me</div>]}
          {/* <div>References</div>
          <div>Notifications</div>
          <div>Security</div> */}
        </Tabs>

        {activeTabIndex === 0 && <AboutMe />}
        {activeTabIndex === 1 && <h1>References</h1>}
        {activeTabIndex === 2 && <h1>Notifications</h1>}
        {activeTabIndex === 3 && <h1>Security</h1>}
      </Card>
    </div>
  )
}

export default Settings
