import React from 'react'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'

class Login extends React.Component {
  componentDidMount() {
    setTitle('Login')
    setHtmlClass('html-login')
  }

  componentWillUnmount() {
    removeHtmlClass('html-login')
  }

  render = () => (
    <div>
      <h2>Login</h2>
    </div>
  )
}

export default Login
