import React from 'react'
import { string, number, bool } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

const LoadingBar = ({ className, progress, round }) => (
  <div
    className={clsx(
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
