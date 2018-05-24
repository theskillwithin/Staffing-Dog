import React from 'react'
import { bool, node, number, func } from 'prop-types'
import { TabBar as MTabBar, Tab } from 'rmwc/Tabs'
import classnames from 'classnames'

// import './styles.css'
import theme from './theme.css'


const TabBar = ({ activeTabIndex, onChange, underline, left, ...props }) => (
  <MTabBar
    className={classnames(theme.tabBar, underline && theme.underline, left && theme.left)}
    activeTabIndex={activeTabIndex}
    onChange={evt => onChange(evt.target.value)}
    {...props}
  >
    {props.children}
  </MTabBar>
)

Tab.propTypes = {
  children: node.isRequired,
}

TabBar.defaultProps = {
  underline: true,
  left: true,
}

TabBar.propTypes = {
  underline: bool,
  secondary: bool,
  left: bool,
  children: node.isRequired,
  activeTabIndex: number.isRequired,
  onChange: func.isRequired,
}

export { TabBar, Tab }
