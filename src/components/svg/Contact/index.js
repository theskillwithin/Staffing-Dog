import React from 'react'
import { string } from 'prop-types'
import classnames from 'classnames'

import SVGContact from '../files/contact.svg'

import theme from './theme.css'

const ContactSVG = props => (
  <span
    className={classnames(props.className, theme.svg)}
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
