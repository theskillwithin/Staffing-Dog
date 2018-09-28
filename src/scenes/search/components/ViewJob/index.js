import React from 'react'
import classnames from 'classnames'

import appTheme from '../../../app/theme.css'

import theme from './theme.css'

const ViewJob = () => (
  <div className={classnames(appTheme.pageContent, theme.pageContent)}>
    <p>Single Job View</p>
  </div>
)

export default ViewJob
