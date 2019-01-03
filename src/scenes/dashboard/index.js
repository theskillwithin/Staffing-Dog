import React from 'react'
import classnames from 'classnames'
import { setTitle, setHtmlClass, removeHtmlClass } from '@sdog/utils/document'

import theme from '../app/theme.css'

import ToDoList from './components/to_do_list'
import Messages from './components/messages'
import JobSchedule from './components/job_schedule'

class Dashboard extends React.Component {
  componentDidMount() {
    setTitle('Dashboard')
    setHtmlClass('html-app')
  }

  componentWillUnmount() {
    removeHtmlClass('html-app')
  }

  render() {
    return (
      <div className={classnames(theme.pageContent, theme.columns)}>
        <div className={theme.columnA}>
          <ToDoList />
          <Messages />
        </div>

        <div className={theme.columnB}>
          <JobSchedule />
        </div>
      </div>
    )
  }
}

export default Dashboard
