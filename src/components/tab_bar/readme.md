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


## left
will left align the tabs and takes min width off of tabs to allow them to move more left

## underline
will provide a gray underline under tabs

## exact
makes tab with mostly the same size as the text inside of it and has margin so the end of one tab isn't touching the start of another tab.
