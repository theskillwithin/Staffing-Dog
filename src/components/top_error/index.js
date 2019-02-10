import React from 'react'
import { string, array, number, oneOfType } from 'prop-types'

import theme from './theme.css'

const distanceToTop = 30
const heightOfError = 49
const marginBetween = 10

export const TopError = ({ children, multiple }) => {
  if (!children) return null
  const top = multiple
    ? distanceToTop + (multiple * heightOfError + multiple * marginBetween)
    : distanceToTop
  return (
    <div className={theme.topError} style={{ top }}>
      <p>{children}</p>
    </div>
  )
}

TopError.defaultProps = {
  children: null,
  multiple: null,
}

TopError.propTypes = {
  children: string,
  multiple: number,
}

const MultipleTopError = ({ children }) => {
  if (!children) return null

  if (typeof children === 'string' || (children.length && children.length === 1)) {
    return <TopError>{children}</TopError>
  }

  return (
    <>
      {test.map((singleChild, index) => (
        <TopError key={`toperror-${singleChild.charAt(0)}-${index + 1}`} multiple={index}>
          {singleChild}
        </TopError>
      ))}
    </>
  )
}

MultipleTopError.defaultProps = {
  children: null,
}

MultipleTopError.propTypes = {
  children: oneOfType([string, array]),
}

export default MultipleTopError
