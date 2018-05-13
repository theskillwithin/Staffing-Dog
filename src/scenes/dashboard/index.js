import React from 'react'
import classnames from 'classnames'
import filter from 'lodash/filter'
import Card from '@sd/components/card'
import Checklist from '@sd/components/checklist'
import Switch from '@sd/components/switch'

import theme from '../app/theme.css'


const list = [
  { name: 'Verify Phone Number', checked: true },
  { name: 'Verify Email Address', checked: true },
  { name: 'Complete Profile', checked: false },
  { name: 'Add Background Check', checked: false },
]

const updateSchedule = () => console.log('update schedule')

const progressPercent = (collection, search) => {
  const divisor = list.length
  if (!list || divisor === 0) return 0
  const divident = filter(collection, search).length
  const result = divident / divisor
  return result
}

const Dashboard = () => (
  <div className={classnames(theme.pageContent, theme.columns)}>
    <div className={theme.column}>
      <Card
        title="To Do List"
        icon="list"
        progress={progressPercent(list, { checked: true })}
      >
        <Checklist list={list} />
      </Card>

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
      <Card
        icon="date_range"
        title="Job Schedule"
        action="Update Schedule"
        actionCb={updateSchedule}
        actionProps={{ round: true, secondary: true, short: true }}
      >
        <p>Job Schedule</p>
        <Switch />
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
