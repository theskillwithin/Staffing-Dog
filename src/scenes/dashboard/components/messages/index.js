import React from 'react'

import theme from './theme.css'

class Messages extends React.Component {
  state = {
    active: 0,
  }

  render() {
    return (
      <div className={theme.messages}>
        <h1>Hello World</h1>
      </div>
    )
  }
}

export default Messages
