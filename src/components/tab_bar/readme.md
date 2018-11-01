# TabBar

usage:

```
<Tabs
  activeTabIndex={this.state.activeTabIndex}
  onSelect={tab => this.setState({ activeTabIndex: tab })}
>
  <div>About Me</div>
  <div>My Resume</div>
  <div>References</div>
  <div>Notifications</div>
  <div>Security</div>
</Tabs>

{this.state.activeTabIndex === 0 && <AboutMe />}
{this.state.activeTabIndex === 1 && <h1>My Resume</h1>}
{this.state.activeTabIndex === 2 && <h1>References</h1>}
{this.state.activeTabIndex === 3 && <h1>Notifications</h1>}
{this.state.activeTabIndex === 4 && <h1>Security</h1>}
```
