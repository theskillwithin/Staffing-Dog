import React from 'react'
import ContactSVG from '@component/svg/Contact'
import HeadsetSVG from '@component/svg/Headset'
import EmailUsSVG from '@component/svg/EmailUs'
import LiveChatSVG from '@component/svg/LiveChat'
import Icon from '@component/icon'
import { Link } from 'react-router-dom'

import theme from './theme.css'

const Contact = () => (
  <div className={theme.contact}>
    <div className={theme.contactInner}>
      <div className={theme.contactDesktop}>
        <Link to="/contact">
          <ContactSVG className={theme.contactSVG} /> Contact Us
        </Link>
      </div>
      <div className={theme.contactMobile}>
        <Icon use="menu" />
      </div>
    </div>
    <div className={theme.contactActive}>
      <div className={theme.contactActiveInner}>
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

export default Contact
