# TabBar

https://jamesmfriedman.github.io/rmwc/tabs

usage:
```
import { TabBar, Tab } from '@component/tab_bar'

  <TabBar
    activeTabIndex={this.state.activeTabIndex}
    onChange={tab => this.setState({ activeTabIndex: tab })}
  >
    <Tab>Hello</Tab>
    <Tab>World</Tab>
  </TabBar>

  {this.state.activeTabIndex === 0 && <h1>Hello</h1>}
  {this.state.activeTabIndex === 1 && <h1>World</h1>}
```
