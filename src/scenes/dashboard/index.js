import React from 'react'
import classnames from 'classnames'


import Card from '../../components/card'
import theme from '../app/theme.css'


const updateSchedule = () => console.log('update schedule')

const Dashboard = () => (
  <div className={classnames(theme.pageContent, theme.columns)}>
    <div className={theme.column}>
      <Card
        title="To Do List"
        icon="list"
      >
        <p>Body Goes Here</p>
      </Card>

      <Card
        title="Testing Title Prop"
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
      <Card
        icon="date_range"
        title="Testing Title Prop"
        action="Update Schedule"
        actionCb={updateSchedule}
      >
        <p>Job Schedule</p>
      </Card>

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
