import React from 'react'
import { string } from 'prop-types'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { findUserType } from '@sdog/store/user'
import { useHtmlClass, useDocumentTitle } from '@sdog/utils/document'

import theme from '../app/theme.css'

import ToDoList from './components/to_do_list'
import Messages from './components/messages'
import JobSchedule from './components/job_schedule'
import Jobs from './components/jobs'

const Dashboard = ({ userType }) => {
  useDocumentTitle('Dashboard')
  useHtmlClass('html-app')

  return (
    <div className={clsx(theme.pageContent, theme.columns)}>
      <div className={theme.columnA}>
        <ToDoList />
        {userType !== 'practice' && <Jobs />}
        <Messages />
      </div>

      <div className={theme.columnB}>
        <JobSchedule />
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  userType: string.isRequired,
}

export const mapStateToProps = state => ({ userType: findUserType(state) })

export default connect(mapStateToProps)(Dashboard)
