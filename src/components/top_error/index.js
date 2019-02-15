import React, { useState, useEffect } from 'react'
import { string, array, number, bool, oneOfType } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

export const SingleTopError = ({
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

SingleTopError.defaultProps = {
  children: null,
  multiple: null,
  autoClose: false,
  closeButton: false,
  hasContainer: false,
}

SingleTopError.propTypes = {
  children: string,
  multiple: number,
  autoClose: bool,
  closeButton: bool,
  hasContainer: bool,
}

const TopError = ({ children, autoClose, closeButton, maxDisplayErrors }) => {
  if (!children) return null

  if (typeof children === 'string') {
    return (
      <SingleTopError autoClose={autoClose} closeButton={closeButton}>
        {children}
      </SingleTopError>
    )
  }

  const kids = children.slice(0, maxDisplayErrors)

  return (
    <div className={theme.topErrorContainer}>
      {kids.map((kid, index) => (
        <SingleTopError
          key={`toperror-${kid.charAt(0)}-${index + 1}`}
          multiple={index}
          autoClose={autoClose}
          closeButton={kids.length > 1}
          hasContainer
        >
          {kid}
        </SingleTopError>
      ))}
    </div>
  )
}

TopError.defaultProps = {
  children: false,
  autoClose: false,
  closeButton: false,
  maxDisplayErrors: 5,
}

TopError.propTypes = {
  children: oneOfType([string, array, bool]),
  autoClose: bool,
  closeButton: bool,
  maxDisplayErrors: number,
}

export default TopError
