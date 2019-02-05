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
