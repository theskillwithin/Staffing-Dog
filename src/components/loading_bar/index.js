import React from 'react'
import { string, number, bool } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'

const LoadingBar = ({ className, progress, round }) => (
  <div
    className={classnames(
      theme.bar,
      className,
      round && theme.round,
      progress === 1 && theme.complete,
    )}
  >
    <span
      className={theme.progress}
      style={{
        width: `${progress * 100}%`,
      }}
    />
  </div>
)

LoadingBar.defaultProps = {
  progress: 0,
  className: null,
  round: false,
}

LoadingBar.propTypes = {
  className: string,
  progress: number,
  round: bool,
}

export default LoadingBar
