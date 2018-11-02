import React from 'react'
import { node, number, func, bool } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'

class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.myRefs = this.props.children.map(() => React.createRef())
    this.underlineRef = React.createRef()
  }

  componentDidMount() {
    const { activeTabIndex, left, children } = this.props
    const tabs = React.Children.toArray(children).filter(Boolean)

    const totalWidth = this.myRefs
      .slice(0, activeTabIndex)
      .map(x => x.current.offsetWidth)
      .reduce((a, b) => a + b, 0)

    const width = left
      ? `${this.myRefs[activeTabIndex].current.offsetWidth}px`
      : `${100 / tabs.length}%`

    const leftOffset = left
      ? `${totalWidth}px`
      : `${(100 / tabs.length) * activeTabIndex}%`

    this.underlineRef.current.style.width = width
    this.underlineRef.current.style.left = leftOffset
  }

  handleOnClick = i => {
    const { left, onSelect, children } = this.props
    const tabs = React.Children.toArray(children).filter(Boolean)
    onSelect(i)

    const totalWidth = this.myRefs
      .slice(0, i)
      .map(x => x.current.offsetWidth)
      .reduce((a, b) => a + b, 0)

    const width = left
      ? `${this.myRefs[i].current.offsetWidth}px`
      : `${100 / tabs.length}%`

    const leftOffset = left ? `${totalWidth}px` : `${(100 / tabs.length) * i}%`

    this.underlineRef.current.style.width = width
    this.underlineRef.current.style.left = leftOffset
  }

  render() {
    const { activeTabIndex, children, underline, left } = this.props
    const tabs = React.Children.toArray(children).filter(Boolean)
    return (
      <div
        className={classnames(
          theme.root,
          underline && theme.hasUnderline,
          left && theme.left,
        )}
      >
        <div className={theme.tab}>
          {tabs.map((x, i) => (
            <div
              key={x.key}
              onClick={() => this.handleOnClick(i)}
              className={i === activeTabIndex ? theme.active : null}
              role="button"
              tabIndex={i}
              ref={this.myRefs[i]}
            >
              {x}
            </div>
          ))}
        </div>
        <div className={theme.underline} ref={this.underlineRef} />
      </div>
    )
  }
}

Tabs.propTypes = {
  underline: false,
  left: false,
}

Tabs.propTypes = {
  activeTabIndex: number.isRequired,
  onSelect: func.isRequired,
  children: node.isRequired,
  underline: bool,
  left: bool,
}

export default Tabs
