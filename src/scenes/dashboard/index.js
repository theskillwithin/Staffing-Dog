import React from 'react'
import clsx from 'clsx'
import { useHtmlClass, useDocumentTitle } from '@sdog/utils/document'

import theme from '../app/theme.css'

import ToDoList from './components/to_do_list'
import Messages from './components/messages'
import JobSchedule from './components/job_schedule'

const Dashboard = () => {
  useDocumentTitle('Dashboard')
  useHtmlClass('html-app')

  return (
    <div className={clsx(theme.pageContent, theme.columns)}>
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

export default Dashboard
