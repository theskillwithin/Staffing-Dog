import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'

class MainMenu extends React.Component {
  state = {
    mobileActive: false,
  }

  isActive(page) {
    const { pathname } = this.props.location
    return page.test(pathname)
  }

  render() {
    return (
      <ul className={theme.nav}>
        <li className={theme.navItem}>
          <Link
            className={classnames(
              theme.navItemLink,
              this.isActive(/^\/$/) && theme.active,
            )}
            to="/"
          >
            Dashboard
          </Link>
        </li>
        <li className={theme.navItem}>
          <Link
            className={classnames(
              theme.navItemLink,
              this.isActive(/search/) && theme.active,
            )}
            to="/search"
          >
            Job&nbsp;Search
          </Link>
        </li>
        <li className={theme.navItem}>
          <Link
            className={classnames(
              theme.navItemLink,
              this.isActive(/settings/) && theme.active,
            )}
            to="/settings"
          >
            My&nbsp;Profile
          </Link>
        </li>
      </ul>
    )
  }
}

MainMenu.propTypes = {
  location: object.isRequired,
}

export default MainMenu
