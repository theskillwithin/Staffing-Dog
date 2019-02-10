import React, { useState, useEffect } from 'react'
import { string, array, number, bool, oneOfType } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

export const TopError = ({
  children,
  multiple,
  closeButton,
  autoClose,
  hasContainer,
}) => {
  if (!children) return null
  const [delayed, setDelayed] = useState(multiple)
  const [isClose, setClose] = useState(false)

  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        setClose(true)
      }, 10000)
    }
    if (!multiple) return

    setTimeout(() => {
      setDelayed(false)
    }, multiple * 300)
  })

  if (isClose) return null
  if (delayed) return null

  return (
    <div className={clsx(!hasContainer && theme.topErrorContainer, theme.topError)}>
      <p>{children}</p>
      {closeButton ? (
        <button
          className={theme.closeButton}
          onClick={() => setClose(true)}
          type="button"
        >
          &times;
        </button>
      ) : null}
    </div>
  )
}

TopError.defaultProps = {
  children: null,
  multiple: null,
  autoClose: false,
  closeButton: false,
  hasContainer: false,
}

TopError.propTypes = {
  children: string,
  multiple: number,
  autoClose: bool,
  closeButton: bool,
  hasContainer: bool,
}

const MultipleTopError = ({ children, autoClose, closeButton, MAX_DISPLAY_ERRORS }) => {
  if (!children) return null

  if (typeof children === 'string') {
    return (
      <TopError autoClose={autoClose} closeButton={closeButton}>
        {children}
      </TopError>
    )
  }

  const kids = children.slice(0, MAX_DISPLAY_ERRORS)

  return (
    <div className={theme.topErrorContainer}>
      {kids.map((kid, index) => (
        <TopError
          key={`toperror-${kid.charAt(0)}-${index + 1}`}
          multiple={index}
          autoClose={autoClose}
          closeButton={kids.length > 1}
          hasContainer
        >
          {kid}
        </TopError>
      ))}
    </div>
  )
}

MultipleTopError.defaultProps = {
  children: false,
  autoClose: false,
  closeButton: false,
  MAX_DISPLAY_ERRORS: 5,
}

MultipleTopError.propTypes = {
  children: oneOfType([string, array, bool]),
  autoClose: bool,
  closeButton: bool,
  MAX_DISPLAY_ERRORS: number,
}

export default MultipleTopError
