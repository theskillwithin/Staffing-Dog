import React from 'react'
import { connect } from 'react-redux'
import { findUserType } from '@sdog/store/user'
import { Link } from 'react-router-dom'
import { object, string } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

const MainMenu = ({ location, type }) => {
  const isActive = page => {
    const { pathname } = location
    return page.test(pathname)
  }

  if (type === 'practice') {
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
              className={clsx(
                theme.navItemLink,
                isActive(/professionals/) && theme.active,
              )}
              to="/professionals"
            >
              Professionals
            </Link>
          </li>
          <li className={theme.navItem}>
            <Link
              className={clsx(theme.navItemLink, isActive(/job-posting/) && theme.active)}
              to="/job-postings"
            >
              Job&nbsp;Postings
            </Link>
          </li>
        </ul>
      </div>
    )
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
  type: string.isRequired,
}

const mapState = state => ({
  type: findUserType(state),
})

export default connect(mapState)(MainMenu)
