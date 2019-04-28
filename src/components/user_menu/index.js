import React, { useState, useRef } from 'react'
import { string, bool, oneOfType } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import clsx from 'clsx'
import { findUserInfo, findUserMeta, findUserPreferences } from '@sdog/store/user'
import useOutsideClick from '@sdog/utils/useOutsideClick'
import Arrow from '@sdog/components/svg/Arrow'
import Chevron from '@sdog/components/svg/Chevron'
import Avatar from '@sdog/components/Avatar'
import Hamburger from '@sdog/components/hamburger'

import theme from './theme.css'

const UserMenu = ({ type, first, last, office, photo }) => {
  const [mobileActive, setMobileActive] = useState(false)
  const pRef = useRef()
  const handleMobileToggle = () => setMobileActive(!mobileActive)
  const handleClickOutside = () => {
    if (mobileActive) {
      return handleMobileToggle()
    }
    return false
  }
  useOutsideClick(pRef, handleClickOutside)

  if (!type || !first || !last) return null // TEMP FIX

  const displayUserName = `${first} ${last.trim().charAt(0)}.`

  return (
    <div className={theme.userMenu}>
      <div className={theme.userMenuInner} ref={pRef}>
        <div className={theme.userMenuDesktop}>
          <div className={theme.photo}>
            <Avatar color="purple" size="48px" url={photo} alt="avatar" />
          </div>
          <div className={theme.user}>
            <div>{displayUserName}</div>
            {type === 'practice' && office && (
              <div>
                <span className={theme.office}>{office}</span>
              </div>
            )}
          </div>
          <div className={theme.chevron}>
            <Chevron direction="down" />
          </div>
        </div>
        <button
          onClick={handleMobileToggle}
          className={theme.userMenuMobile}
          type="button"
        >
          <Hamburger active={mobileActive} />
        </button>
      </div>
      <div className={clsx(theme.userMenuActive, mobileActive && theme.mobileActive)}>
        <div className={theme.userMenuActiveInner}>
          <div className={theme.mobileOption}>
            {displayUserName} {type === 'practice' && office && office}
          </div>
          <Link to="/settings">Profile</Link>
          {/* {type === 'practice' && (
            <>
              <Link to="/settings">Billing</Link>
              <Link to="/settings">Users</Link>
            </>
          )} 
          <Link to="/settings">Account</Link> */}
          <Link to="/logout" className={theme.logout}>
            Logout <Arrow />
          </Link>
        </div>
      </div>
    </div>
  )
}

UserMenu.propTypes = {
  type: string,
  first: string,
  last: string,
  office: oneOfType([string, bool]),
  photo: oneOfType([bool, string]),
}

UserMenu.defaultProps = {
  type: '',
  first: '',
  last: '',
  office: '',
  photo: '',
}

const mapState = state => ({
  type: findUserInfo(state).type,
  first: findUserInfo(state).first_name,
  last: findUserInfo(state).last_name,
  office: get(findUserMeta(state), 'summary.practice_name', false),
  photo: get(findUserPreferences(state), 'profile_image_url', false),
})

export default connect(mapState)(UserMenu)
