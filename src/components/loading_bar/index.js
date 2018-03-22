import React from 'react'
import { LinearProgress } from 'rmwc/LinearProgress'

// import './styles.css'


const LoadingBar = props => (
  <LinearProgress
    determinate={false}
    {...props}
  />
)

export default LoadingBar
