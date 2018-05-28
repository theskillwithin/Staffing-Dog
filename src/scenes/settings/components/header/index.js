import React from 'react'
import { number } from 'prop-types'
import LoadingBar from '@component/loading_bar'

import theme from './theme.css'

const SettingsHeader = ({ progress }) => (
  <div className={theme.header}>
    <h2>My Profile</h2>
    <div className={theme.progress}>
      <h4>
        {progress * 100}% <span>Complete</span>
      </h4>
      <LoadingBar determinate progress={progress} className={theme.loadingBar} />
    </div>
  </div>
)

SettingsHeader.defaultProps = {
  progress: 0.85,
}

SettingsHeader.propTypes = {
  progress: number,
}

export default SettingsHeader
