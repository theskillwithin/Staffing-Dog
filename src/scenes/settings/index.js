import React from 'react'
import classnames from 'classnames'
import Card from '@component/card'

import theme from '../app/theme.css'

import Header from './components/header'


const Settings = () => (
  <div className={classnames(theme.pageContent)}>
    <Card>
      <Header />
    </Card>
  </div>
)

export default Settings
