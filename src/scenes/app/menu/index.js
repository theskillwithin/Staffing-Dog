import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

const MainMenu = ({ location }) => {
  const isActive = page => {
    const { pathname } = location
    return page.test(pathname)
  }

  return (
    <div className={theme.navContainer}>
      <ul className={theme.nav}>
        <li className={theme.navItem}>
          <Link
            className={clsx(theme.navItemLink, isActive(/^\/$/) && theme.active)}
            to="/"
          >
            Dashboard
          </Link>
        </li>
        <li className={theme.navItem}>
          <Link
            className={clsx(theme.navItemLink, isActive(/search/) && theme.active)}
            to="/search"
          >
            Job&nbsp;Search
          </Link>
        </li>
        <li className={theme.navItem}>
          <Link
            className={clsx(theme.navItemLink, isActive(/settings/) && theme.active)}
            to="/settings"
          >
            My&nbsp;Profile
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
