import React from 'react'

import init from '../../utils/init'

import theme from './theme.css'


const App = () => (
  <div className={theme.app}>
    <header className={theme.appHeader}>
      <div className={theme.appHeaderInner}>
        logo
      </div>
    </header>

    <div className={theme.appContent}>
      {[...new Array(100)].map(() => (
        <p>This is the content for the page.</p>
      ))}
    </div>
  </div>
)

init(App)
