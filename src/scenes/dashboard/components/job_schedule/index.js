import React from 'react'
import Card from '@component/card'
import Switch from '@component/switch'
import Dropdown from '@component/Dropdown'

import theme from './theme.css'


class JobSchedule extends React.Component {
  state = {
    form: {
      switch: false,
      daysScheduled: false,
    },
  }

  updateSchedule = () => console.log('update schedule')

  days = [
    { label: '30 Days', value: '30' },
    { label: '60 Days', value: '60' },
    { label: '90 Days', value: '90' },
    { label: '120 Days', value: '120' },
  ]

  handleToggle() {
    this.setState({ form: { ...this.state.form, switch: !this.state.switch } })
  }

  handleChange(input, value) {
    this.setState({ form: { ...this.state.form, [input]: value } })
  }

  render() {
    const { state } = this
    return (
      <Card
        icon="date_range"
        title="Job Schedule"
        action="Update Schedule"
        actionCb={this.updateSchedule}
        actionProps={{ round: true, secondary: true, short: true }}
      >
        <div className={theme.inputRow}>
          <span>Same day job requests</span>
          <Switch
            checked={state.form.switch}
            onChange={() => this.handleToggle()}
            flip
          >
            No
          </Switch>
        </div>
        <div className={theme.inputRow}>
          <span>Days out I can be scheduled</span>
          <Dropdown
            value={state.daysScheduled}
            onChange={value => this.handleChange('daysScheduled', value)}
            options={this.days}
          />
        </div>
      </Card>
    )
  }
}

export default JobSchedule
