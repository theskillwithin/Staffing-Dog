import React from 'react'
import { bool, node, number, func } from 'prop-types'
import { TabBar as MTabBar, Tab } from 'rmwc/Tabs'
import classnames from 'classnames'

// import './styles.css'
import theme from './theme.css'


const TabBar = ({ activeTabIndex, onChange, underline, left, exact, ...props }) => (
  <MTabBar
    className={
        classnames(
          theme.tabBar,
          underline && theme.underline,
          left && theme.left,
          exact && theme.exact,
        )
    }
    activeTabIndex={activeTabIndex}
    onChange={evt => onChange(evt.target.value)}
    {...props}
  >
    {props.children}
  </MTabBar>
)

TabBar.defaultProps = {
  underline: true,
  left: true,
  exact: true,
}

TabBar.propTypes = {
  underline: bool,
  secondary: bool,
  left: bool,
  exact: bool,
  children: node.isRequired,
  activeTabIndex: number.isRequired,
  onChange: func.isRequired,
}

export { TabBar, Tab }
