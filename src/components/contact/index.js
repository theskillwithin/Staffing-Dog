import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import clsx from 'clsx'
import ContactSVG from '@sdog/components/svg/Contact'
import HeadsetSVG from '@sdog/components/svg/Headset'
import EmailUsSVG from '@sdog/components/svg/EmailUs'
import LiveChatSVG from '@sdog/components/svg/LiveChat'
import CloseIcon from '@sdog/components/svg/Close'
import Hambuger from '@sdog/components/svg/Hamburger'
import { Link } from 'react-router-dom'

import theme from './theme.css'

class Contact extends React.Component {
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

  render() {
    return (
      <div className={theme.contact}>
        <div className={theme.contactInner}>
          <div className={theme.contactDesktop}>
            <Link to="/contact">
              <ContactSVG className={theme.contactSVG} /> Contact Us
            </Link>
          </div>
          <button
            onClick={this.handleMobileToggle}
            className={theme.contactMobile}
            type="button"
          >
            {this.state.mobileActive ? <CloseIcon /> : <Hambuger />}
          </button>
        </div>
        <div
          className={clsx(
            theme.contactActive,
            this.state.mobileActive && theme.mobileActive,
          )}
        >
          <div className={theme.contactActiveInner}>
            <div className={theme.mobileOption}>
              <Link to="/contact">
                <ContactSVG className={theme.contactSVG} /> Contact Us
              </Link>
            </div>
            <a href="/test">
              <HeadsetSVG />
              (385) 707-0156
            </a>
            <a href="/test">
              <EmailUsSVG />
              Email Us
            </a>
            <a href="/test">
              <LiveChatSVG />
              Live Chat
            </a>
            <a href="/legal" className={theme.legal}>
              Legal
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Contact)
