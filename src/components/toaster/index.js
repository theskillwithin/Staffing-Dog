import React, { useState, useEffect, useRef } from 'react'
import { func, string, array, number, bool, oneOfType, oneOf } from 'prop-types'
import clsx from 'clsx'

import theme from './theme.css'

export const SingleToaster = ({
  children,
  multiple,
  closeButton,
  autoClose,
  hasContainer,
  type,
  onClose,
}) => {
  if (!children) return null
  const autoCloseTimeout = useRef(null)
  const delayedTimeout = useRef(null)
  const [delayed, setDelayed] = useState(multiple)
  const [isClose, setClose] = useState(false)

  useEffect(() => {
    if (autoClose) {
      autoCloseTimeout.current = setTimeout(() => {
        if (onClose) {
          onClose({ setClose })
        } else {
          setClose(true)
        }
      }, 10000)
    }
    if (!multiple) {
      return () => {
        clearTimeout(autoCloseTimeout.current)
      }
    }

    delayedTimeout.current = setTimeout(() => {
      setDelayed(false)
    }, multiple * 300)

    return () => {
      clearTimeout(autoCloseTimeout.current)
      clearTimeout(delayedTimeout.current)
    }
  }, [])

  if (isClose) return null
  if (delayed) return null

  return (
    <div
      className={clsx(
        !hasContainer && theme.toasterContainer,
        theme.toaster,
        theme[type],
      )}
    >
      <p>{children}</p>
      {closeButton ? (
        <button
          className={theme.closeButton}
          onClick={() => {
            if (onClose) {
              onClose({ setClose })
            } else {
              setClose(true)
            }
          }}
          type="button"
        >
          &times;
        </button>
      ) : null}
    </div>
  )
}

SingleToaster.defaultProps = {
  children: null,
  multiple: null,
  autoClose: false,
  closeButton: false,
  hasContainer: false,
  type: null,
  onClose: false,
}

SingleToaster.propTypes = {
  children: string,
  multiple: number,
  autoClose: bool,
  closeButton: bool,
  hasContainer: bool,
  type: oneOf(['error', 'success']),
  onClose: oneOfType([bool, func]),
}

const Toaster = ({ children, autoClose, closeButton, maxDisplayErrors, type }) => {
  if (!children) return null

  if (typeof children === 'string') {
    return (
      <SingleToaster autoClose={autoClose} closeButton={closeButton} type={type}>
        {children}
      </SingleToaster>
    )
  }

  const kids = children.slice(0, maxDisplayErrors)

  return (
    <div className={theme.toasterContainer}>
      {kids.map((kid, index) => (
        <SingleToaster
          key={`toaster-${kid.charAt(0)}-${index + 1}`}
          multiple={index}
          autoClose={autoClose}
          closeButton={kids.length > 1}
          hasContainer
          type={type}
        >
          {kid}
        </SingleToaster>
      ))}
    </div>
  )
}

Toaster.defaultProps = {
  children: false,
  autoClose: false,
  closeButton: false,
  maxDisplayErrors: 5,
  type: 'error',
}

Toaster.propTypes = {
  children: oneOfType([string, array, bool]),
  autoClose: bool,
  closeButton: bool,
  maxDisplayErrors: number,
  type: oneOf(['error', 'success']),
}

export default Toaster
