import React from 'react'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'
import Contact from '@scene/app/contact'
import Logo from '@component/logo'

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
    <div className={appTheme.pageContent}>
      <header className={theme.header}>
        <Contact />
      </header>
      <div className={theme.signinContainer}>
        <div className={theme.logo}>
          <Logo />
        </div>
        <div className={theme.signin}>
          <h2>Sign In</h2>
        </div>
      </div>
    </div>
  )
}

export default Login
