import React, { useState, useRef } from 'react'
// import enhanceWithClickOutside from 'react-click-outside'
// import enhanceWithClickOutside from '@sdog/utils/enhanceWithClickOutside'
import useOutsideClick from '@sdog/utils/useOutsideClick'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import clsx from 'clsx'
import CloseIcon from '@sdog/components/svg/Close'
import Hambuger from '@sdog/components/svg/Hamburger'

import theme from './theme.css'

const MainMenu = ({ location }) => {
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

  const isActive = page => {
    const { pathname } = location
    return page.test(pathname)
  }

  return (
    <div className={theme.navContainer} ref={pRef}>
      <button onClick={handleMobileToggle} className={theme.contactMobile} type="button">
        {mobileActive ? <CloseIcon /> : <Hambuger />}
      </button>
      <ul className={clsx(theme.nav, mobileActive && theme.mobileActive)}>
        <li className={theme.navItem}>
          <Link
            className={clsx(theme.navItemLink, isActive(/^\/$/) && theme.active)}
            to="/"
            onClick={handleClickOutside}
          >
            Dashboard
          </Link>
        </li>
        <li className={theme.navItem}>
          <Link
            className={clsx(theme.navItemLink, isActive(/search/) && theme.active)}
            to="/search"
            onClick={handleClickOutside}
          >
            Job&nbsp;Search
          </Link>
        </li>
        <li className={theme.navItem}>
          <Link
            className={clsx(theme.navItemLink, isActive(/settings/) && theme.active)}
            to="/settings"
            onClick={handleClickOutside}
          >
            My&nbsp;Profile
          </Link>
        </li>
        <li className={clsx(theme.navItem, theme.mobileOnly)}>
          <Link
            className={clsx(theme.navItemLink, isActive(/contact/) && theme.active)}
            to="/contact"
            onClick={handleClickOutside}
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  )
}

MainMenu.propTypes = {
  location: object.isRequired,
}

export default MainMenu
