import React from 'react'
import { oneOfType, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { findUserId, findUserInfo } from 'store/user'
import { Link } from 'react-router-dom'
import Button from '@sdog/components/button'
import Arrow from '@sdog/components/svg/Arrow'

import theme from './theme.css'

const Logout = ({ userId, first, last }) => {
  if (!userId || !first || !last) return null
  return (
    <div className={theme.logout}>
      <Link to="/logout">
        <Button>
          <span className={theme.user}>
            First Last <Arrow small color="white" />
          </span>
          <span className={theme.hover}>Sign Out</span>
        </Button>
      </Link>
    </div>
  )
}

Logout.propTypes = {
  userId: oneOfType([string, bool]).isRequired,
  first: oneOfType([string, bool]),
  last: oneOfType([string, bool]),
}

const mapState = state => ({
  userId: findUserId(state),
  first: findUserInfo(state) && findUserInfo(state).first_name,
  last: findUserInfo(state) && findUserInfo(state).last_name,
})

export default connect(mapState)(Logout)
