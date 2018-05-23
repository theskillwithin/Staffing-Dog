import React from 'react'
import classnames from 'classnames'
import Card from '@component/card'

import theme from '../app/theme.css'

import ToDoList from './components/to_do_list'
import JobSchedule from './components/job_schedule'


const Dashboard = () => (
  <div className={classnames(theme.pageContent, theme.columns)}>
    <div className={theme.column}>
      <ToDoList />

      <Card
        title="Messages"
        icon="chat"
      >
        <p>Body Goes Here</p>
      </Card>

      <Card
        title="Suggested Jobs"
        icon="lightbulb_outline"
      >
        <p>Body Goes Here</p>
      </Card>
    </div>

    <div className={theme.column}>
      <JobSchedule />

      <Card
        icon="star_border"
        title="Reviews"
      >
        <p>Body Goes Here</p>
      </Card>
    </div>
  </div>
)

export default Dashboard
