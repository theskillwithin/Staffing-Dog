import React from 'react'
import classnames from 'classnames'
import { setTitle } from '@util/document'
import Card from '@component/card'

import theme from '../app/theme.css'


class Settings extends React.Component {
  componentDidMount() {
    setTitle('Settings')
  }

  render() {
    return (
      <div className={classnames(theme.pageContent)}>
        <Card><h2>Settings</h2></Card>
      </div>
    )
  }
}

export default Settings
