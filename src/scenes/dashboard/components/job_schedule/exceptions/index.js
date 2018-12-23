import React from 'react'
import DatePicker from '@component/date_picker'
import Switch from '@component/switch'

import theme from './theme.css'

class Exceptions extends React.Component {
  state = {
    form: {
      switch: false,
    },
  }

  handleToggle = value => {
    this.setState(state => ({ form: { ...state.form, switch: value } }))
  }

  render() {
    return (
      <div className={theme.root}>
        <h4>Add a new availability exception</h4>

        <DatePicker />

        <div className={theme.inputRow}>
          <span>Available</span>
          <Switch checked={this.state.form.switch} onChange={this.handleToggle}>
            {this.state.form.switch ? 'Yes' : 'No'}
          </Switch>
        </div>
      </div>
    )
  }
}

export default Exceptions
