import React from 'react'
import classnames from 'classnames'
import Card from '@component/card'
import { setTitle } from '@util/document'

import theme from '../app/theme.css'

import ToDoList from './components/to_do_list'
import Messages from './components/messages'
import JobSchedule from './components/job_schedule'

class Dashboard extends React.Component {
  componentDidMount() {
    setTitle('Dashboard')
  }

  newMessage = () => {
    console.log('New Message')
  }

  render() {
    return (
      <div className={classnames(theme.pageContent, theme.columns)}>
        <div className={theme.column}>
          <ToDoList />

          <Card
            title="Messages"
            icon="chat"
            action="New Message"
            actionCb={this.newMessage}
            actionProps={{ round: true, secondary: true, short: true }}
          >
            <Messages />
          </Card>
        </div>

        <div className={theme.column}>
          <JobSchedule />
        </div>
      </div>
    )
  }
}

export default Dashboard
