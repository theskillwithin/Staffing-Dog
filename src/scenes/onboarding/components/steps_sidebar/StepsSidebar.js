import React from 'react'
import { string, array, shape } from 'prop-types'
import clsx from 'clsx'
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
      return (
        <h2
          className={clsx(theme.itemElement, theme[key])}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )
    case 'svg':
      return <Svg name={value} className={clsx(theme.svg, theme[`svg_${value}`])} />
    case 'hr':
      return <div className={clsx(theme.itemElement, theme.hr)} />
    case 'description':
      return (
        <p
          className={clsx(theme.itemElement, theme.description)}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )
    case 'packages':
      return (
        <div className={theme.packages}>
          <h2>Packages</h2>
          <div className={theme.dayHirePackage}>
            <h4>DayHire Limited Pass</h4>
            <p>$34.95 per use</p>
          </div>
          <div className={theme.threeMonthPackage}>
            <h4>3 Month Hiring Plan</h4>
            <p>$728 billed in full</p>
          </div>
          <div className={theme.fullPackage}>
            <h4>Full Access</h4>
            <p>$1,488 billed annually</p>
          </div>
        </div>
      )
  }

  return null
}

const StepsSidebar = ({ match, steps }) => {
  const currentStep = find(steps, step => step.step === match.params.step)

  return (
    <div className={theme.sidebar}>
      <Nav className={theme.sidebarNav} />

      <div
        className={clsx(
          theme.sidebarContent,
          parseInt(match.params.step, 10) === 1 && theme.stepOne,
          parseInt(match.params.step, 10) === 2 && theme.stepTwo,
          parseInt(match.params.step, 10) === 3 && theme.stepThree,
        )}
      >
        {map(currentStep.sidebar.order, (item, i) => (
          <div className={theme.item} key={`item:${i + 1}`}>
            {renderItem(item, currentStep.sidebar[item])}
          </div>
        ))}
      </div>
    </div>
  )
}

StepsSidebar.defaultProps = {}

StepsSidebar.propTypes = {
  steps: array.isRequired,
  match: shape({
    params: shape({
      step: string.isRequired,
    }),
  }),
}

export default StepsSidebar
