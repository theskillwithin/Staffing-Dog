import React from 'react'
import { node, number, func } from 'prop-types'

import theme from './theme.css'

class Tabs extends React.Component {
  render() {
    const { activeTabIndex, children, onSelect } = this.props
    const tabs = React.Children.toArray(children).filter(Boolean)
    return (
      <div className={theme.root}>
        <div className={theme.tab}>
          {tabs.map((x, i) => (
            <div
              key={x}
              onClick={() => onSelect(i)}
              className={i === activeTabIndex ? theme.active : null}
              role="button"
              tabIndex={i}
            >
              {x}
            </div>
          ))}
        </div>
        <div
          className={theme.underline}
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(100 / tabs.length) * activeTabIndex}%`,
          }}
        />
      </div>
    )
  }
}

Tabs.propTypes = {
  activeTabIndex: number.isRequired,
  onSelect: func.isRequired,
  children: node.isRequired,
}

export default Tabs
