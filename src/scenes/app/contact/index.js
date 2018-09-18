import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import classnames from 'classnames'
import ContactSVG from '@component/svg/Contact'
import HeadsetSVG from '@component/svg/Headset'
import EmailUsSVG from '@component/svg/EmailUs'
import LiveChatSVG from '@component/svg/LiveChat'
import Icon from '@component/icon'
import { Link } from 'react-router-dom'

import theme from './theme.css'

class Contact extends React.Component {
  state = {
    mobileActive: false,
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
            {this.state.mobileActive ? <Icon use="close" /> : <Icon use="menu" />}
          </button>
        </div>
        <div
          className={classnames(
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
          </div>
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside(Contact)
