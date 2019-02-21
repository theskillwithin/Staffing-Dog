import React, { useState, useRef } from 'react'
import { string } from 'prop-types'
import useOutsideClick from '@sdog/utils/useOutsideClick'
import clsx from 'clsx'
import Arrow from '@sdog/components/svg/Arrow'
import Chevron from '@sdog/components/svg/Chevron'
import ProfilePhotoSVG from '@sdog/components/svg/ProfilePhoto'
import Hamburger from '@sdog/components/hamburger'

import theme from './theme.css'

const UserMenu = ({ type }) => {
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

  return (
    <div className={theme.userMenu}>
      <div className={theme.userMenuInner} ref={pRef}>
        <div className={theme.userMenuDesktop}>
          <div className={theme.photo}>
            <ProfilePhotoSVG color="purple" />
          </div>
          <div className={theme.user}>
            <div>Name L.</div>
            <div>
              <span>Office</span>
            </div>
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
          <div className={theme.mobileOption}>Name L. Office</div>
          <a href="/test">Profile</a>
          {type === 'provider' && (
            <>
              <a href="/test">Billing</a>
              <a href="/test">Users</a>
            </>
          )}
          <a href="/test">Account</a>
          <a href="/test" className={theme.logout}>
            Logout <Arrow />
          </a>
        </div>
      </div>
    </div>
  )
}

UserMenu.propTypes = {
  type: string.isRequired,
}

export default UserMenu
