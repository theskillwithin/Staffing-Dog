import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import useOutsideClick from '@sdog/utils/useOutsideClick'
import ContactSVG from '@sdog/components/svg/Contact'
// import HeadsetSVG from '@sdog/components/svg/Headset'
import EmailUsSVG from '@sdog/components/svg/EmailUs'
import LiveChatSVG from '@sdog/components/svg/LiveChat'
import Hamburger from '@sdog/components/hamburger'

import theme from './theme.css'

const Contact = () => {
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
    <div className={theme.contact}>
      <div className={theme.contactInner} ref={pRef}>
        <div className={theme.contactDesktop}>
          <Link to="/contact">
            <ContactSVG className={theme.contactSVG} /> Contact Us
          </Link>
        </div>
        <button
          onClick={handleMobileToggle}
          className={theme.contactMobile}
          type="button"
        >
          <Hamburger active={mobileActive} />
        </button>
      </div>
      <div className={clsx(theme.contactActive, mobileActive && theme.mobileActive)}>
        <div className={theme.contactActiveInner}>
          <div className={theme.mobileOption}>
            <Link to="/contact">
              <ContactSVG className={theme.contactSVG} /> Contact Us
            </Link>
          </div>
          {/* <a href="/test">
            <HeadsetSVG />
            (385) 707-0156
          </a> */}
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

export default Contact
