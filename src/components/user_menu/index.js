import React, { useState, useRef } from 'react'
import useOutsideClick from '@sdog/utils/useOutsideClick'
import clsx from 'clsx'
import Arrow from '@sdog/components/svg/Arrow'
import CloseIcon from '@sdog/components/svg/Close'
import Hambuger from '@sdog/components/svg/Hamburger'
import { Link } from 'react-router-dom'

import theme from './theme.css'

const UserMenu = () => {
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
          <Link to="/contact">
            <Arrow /> Contact Us
          </Link>
        </div>
        <button
          onClick={handleMobileToggle}
          className={theme.userMenuMobile}
          type="button"
        >
          {mobileActive ? <CloseIcon /> : <Hambuger />}
        </button>
      </div>
      <div className={clsx(theme.userMenuActive, mobileActive && theme.mobileActive)}>
        <div className={theme.userMenuActiveInner}>
          <div className={theme.mobileOption}>
            <Link to="/contact">
              <Arrow /> Debbie B.
            </Link>
          </div>
          <a href="/test">Profile</a>
          <a href="/test">Billing</a>
          <a href="/test">Users</a>
          <a href="/test">Account</a>
          <a href="/test">Logout</a>
        </div>
      </div>
    </div>
  )
}

export default UserMenu
