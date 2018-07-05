import React from 'react'
import classnames from 'classnames'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Contact from '@scene/app/contact'

import appTheme from '../app/theme.css'

import theme from './theme.css'

class Login extends React.Component {
  componentDidMount() {
    setTitle('Login')
    setHtmlClass('html-login')
  }

  componentWillUnmount() {
    removeHtmlClass('html-login')
  }

  render = () => (
    <div className={classnames(appTheme.pageContent, appTheme.columns)}>
      <header className={theme.header}>
        <Contact />
      </header>
      <div className={theme.signin}>
        <h2>Sign In</h2>
      </div>
    </div>
  )
}

export default Login
