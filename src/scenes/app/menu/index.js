import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import clsx from 'clsx'
import CloseIcon from '@sdog/components/svg/Close'
import Hambuger from '@sdog/components/svg/Hamburger'

import theme from './theme.css'

class MainMenu extends React.Component {
  state = {
    mobileActive: false,
  }

  componentDidMount() {
    if ('ontouchstart' in document.documentElement) {
      document.body.style.cursor = 'pointer'
    }
  }

  handleMobileToggle = () => {
    this.setState(state => ({ mobileActive: !state.mobileActive }))
  }

  handleClickOutside = () => {
    if (this.state.mobileActive) {
      return this.handleMobileToggle()
    }
    return false
  }

  isActive(page) {
    const { pathname } = this.props.location
    return page.test(pathname)
  }

  render() {
    return (
      <div className={theme.navContainer}>
        <button
          onClick={this.handleMobileToggle}
          className={theme.contactMobile}
          type="button"
        >
          {this.state.mobileActive ? <CloseIcon /> : <Hambuger />}
        </button>
        <ul
          className={clsx(theme.nav, this.state.mobileActive && theme.mobileActive)}
        >
          <li className={theme.navItem}>
            <Link
              className={clsx(
                theme.navItemLink,
                this.isActive(/^\/$/) && theme.active,
              )}
              to="/"
              onClick={this.handleClickOutside}
            >
              Dashboard
            </Link>
          </li>
          <li className={theme.navItem}>
            <Link
              className={clsx(
                theme.navItemLink,
                this.isActive(/search/) && theme.active,
              )}
              to="/search"
              onClick={this.handleClickOutside}
            >
              Job&nbsp;Search
            </Link>
          </li>
          <li className={theme.navItem}>
            <Link
              className={clsx(
                theme.navItemLink,
                this.isActive(/settings/) && theme.active,
              )}
              to="/settings"
              onClick={this.handleClickOutside}
            >
              My&nbsp;Profile
            </Link>
          </li>
          <li className={clsx(theme.navItem, theme.mobileOnly)}>
            <Link
              className={clsx(
                theme.navItemLink,
                this.isActive(/contact/) && theme.active,
              )}
              to="/contact"
              onClick={this.handleClickOutside}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

MainMenu.propTypes = {
  location: object.isRequired,
}

export default enhanceWithClickOutside(MainMenu)
