import React from 'react'
import { node, number, func, bool } from 'prop-types'
import classnames from 'classnames'

import theme from './theme.css'

class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.myRefs = this.props.children.map(() => React.createRef())
    this.underlineRef = React.createRef()
    this.tabs = React.Children.toArray(this.props.children).filter(Boolean)
  }

  componentDidMount() {
    const { activeTabIndex } = this.props
    this.calculateTab(activeTabIndex)
  }

  handleOnClick = i => {
    const { onSelect } = this.props
    onSelect(i)
    this.calculateTab(i)
  }

  calculateTab(index) {
    const { left } = this.props
    const totalWidth = this.myRefs
      .slice(0, index)
      .map(x => x.current.offsetWidth)
      .reduce((a, b) => a + b, 0)

    const width = left
      ? `${this.myRefs[index].current.offsetWidth}px`
      : `${100 / this.tabs.length}%`

    const leftOffset = left ? `${totalWidth}px` : `${(100 / this.tabs.length) * index}%`

    this.underlineRef.current.style.width = width
    this.underlineRef.current.style.left = leftOffset
  }

  render() {
    const { activeTabIndex, underline, left } = this.props
    return (
      <div
        className={classnames(
          theme.root,
          underline && theme.hasUnderline,
          left && theme.left,
        )}
      >
        <div className={theme.tab}>
          {this.tabs.map((x, i) => (
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
