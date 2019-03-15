import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout as logoutAction } from '@sdog/store/user'

const LogoutScene = ({ logout, history }) => {
  useEffect(() => {
    logout(() => history.push('/login'))
  }, [])

  return null
}

export default withRouter(
  connect(
    null,
    { logout: logoutAction },
  )(LogoutScene),
)