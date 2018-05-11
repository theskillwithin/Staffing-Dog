import React from 'react'
import classnames from 'classnames'

import Card from '../../components/card'
import theme from '../app/theme.css'


const Settings = () => (
  <div className={classnames(theme.pageContent)}>
    <Card><h2>Settings</h2></Card>
  </div>
)

export default Settings
