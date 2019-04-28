import React from 'react'
import { node, string, func, object, number, bool, oneOfType } from 'prop-types'
import clsx from 'clsx'

import ErrorBoundry from '@sdog/components/error_boundry'
import Button from '@sdog/components/button'
import LoadingBar from '@sdog/components/loading_bar'

import theme from './theme.css'

const Card = ({
  title,
  icon,
  children,
  header,
  action,
  actionCb,
  actionProps,
  progress,
  type,
  overflowHidden,
}) => {
  const IconComponent = icon
  return (
    <ErrorBoundry>
      <div
        className={clsx(
          theme.card,
          type && theme[type],
          overflowHidden && theme.overflowHidden,
        )}
      >
        {(title || header) && (
          <header className={theme.cardHeader}>
            {icon && !header && (
              <div className={theme.icon}>
                <IconComponent />
              </div>
            )}
            {title && !header && <h2 className={theme.title}>{title}</h2>}
            {header && !title && header({ style: theme })}
            {action && actionCb && (
              <Button {...actionProps} onClick={() => actionCb()}>
                {action}
              </Button>
            )}
            {progress !== false && (
              <h2 className={theme.progress}>
                {progress * 100}% &nbsp;
                <span>Complete</span>
              </h2>
            )}
          </header>
        )}

        <section className={theme.cardContent}>
          {progress !== false && (
            <LoadingBar className={theme.loadingBar} progress={progress} />
          )}
          {children}
        </section>
      </div>
    </ErrorBoundry>
  )
}

Card.defaultProps = {
  title: '',
  icon: null,
  header: false,
  action: false,
  actionCb: false,
  actionProps: false,
  progress: false,
  type: false,
  overflowHidden: false,
}

Card.propTypes = {
  title: string,
  icon: oneOfType([func, node]),
  header: oneOfType([func, bool]),
  children: node.isRequired,
  actionCb: oneOfType([func, bool]),
  action: oneOfType([string, bool]),
  actionProps: oneOfType([object, bool]),
  progress: oneOfType([number, bool]),
  type: oneOfType([string, bool]),
  overflowHidden: bool,
}

export default Card
