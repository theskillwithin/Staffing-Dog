import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'

import SVGContact from '../files/contact.svg'

import theme from './theme.css'

const ContactSVG = props => (
  <span
    className={clsx(props.className, theme.svg)}
    dangerouslySetInnerHTML={{ __html: SVGContact }}
  />
)

ContactSVG.defaultProps = {
  className: '',
}

ContactSVG.propTypes = {
  className: string,
}

export default ContactSVG
