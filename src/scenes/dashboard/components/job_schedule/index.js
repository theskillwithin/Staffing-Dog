import React from 'react'
import Card from '@component/card'
import Switch from '@component/switch'


class JobSchedule extends React.Component {
  state = {
    switch: false,
  }

  updateSchedule = () => console.log('update schedule')

  handleToggle() {
    this.setState({ switch: !this.state.switch })
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
        <p>Job Schedule</p>
        <Switch checked={state.switch} onChange={() => this.handleToggle()}>No</Switch>
      </Card>
    )
  }
}

export default JobSchedule
