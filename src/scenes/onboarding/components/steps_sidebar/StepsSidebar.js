import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import map from 'lodash/map'
import find from 'lodash/find'

import Svg from '../../../../components/svg'
import Nav from '../nav'

import theme from './theme.css'


const renderItem = (key, value) => {
  switch (key) {
    case 'title':
    case 'subTitle':
    case 'subTitleLarge':
      return <h2 className={classnames(theme.itemElement, theme[key])}>{value}</h2>
    case 'svg':
      return <Svg name={value} className={classnames(theme.svg, theme[`svg_${value}`])} />
    case 'hr':
      return <div className={classnames(theme.itemElement, theme.hr)} />
    case 'description':
      return <p className={classnames(theme.itemElement, theme.description)}>{value}</p>
  }

  return null
}

const StepsSidebar = ({ match, steps }) => {
  const currentStep = find(steps, step => step.step === match.params.step)

  return (
    <div className={theme.sidebar}>
      <Nav className={theme.sidebarNav} />

      <div className={theme.sidebarContent}>
        {map(currentStep.sidebar.order, (item, i) => (
          <div className={theme.item} key={`item:${i + 1}`}>
            {renderItem(item, currentStep.sidebar[item])}
          </div>
        ))}
      </div>
    </div>
  )
}

StepsSidebar.defaultProps = {
  steps: [],
  match: {},
}

StepsSidebar.propTypes = {
  steps: PropTypes.array,
  match: PropTypes.object,
}

export default StepsSidebar
