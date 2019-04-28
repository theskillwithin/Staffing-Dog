import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { oneOfType, bool, object, string } from 'prop-types'
import clsx from 'clsx'
import { findUserType, findUserPlanTier } from '@sdog/store/user'

import theme from './theme.css'

const MainMenu = ({ location, type, planTier }) => {
  const isActive = page => {
    const { pathname } = location
    return page.test(pathname)
  }

  if (!type) {
    return null
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
          {planTier && 'day_hire' !== planTier ? (
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
          ) : null}
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
            className={clsx(theme.navItemLink, isActive(/jobs/) && theme.active)}
            to="/jobs"
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
  type: oneOfType([bool, string]),
  planTier: oneOfType([bool, string]),
}

MainMenu.defaultProps = { type: false, planTier: false }

const mapState = state => ({
  type: findUserType(state),
  planTier: findUserPlanTier(state),
})

export default connect(mapState)(MainMenu)
