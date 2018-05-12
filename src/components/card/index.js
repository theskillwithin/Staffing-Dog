import React from 'react'
import { node, string, func, object, number } from 'prop-types'
import Icon from '@sd/components/icon'
import Button from '@sd/components/button'
import LoadingBar from '@sd/components/loading_bar'

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
}) => (
  <div className={theme.card}>
    {(title || header) && (
      <header className={theme.cardHeader}>
        {icon && !header && <div className={theme.icon}><Icon primary use={icon} /></div>}
        {title && !header && <h2 className={theme.title}>{title}</h2>}
        {header && !title && header({ style: theme })}
        {action && actionCb &&
          (<Button {...actionProps} onClick={() => actionCb()}>{action}</Button>)
        }
        {progress && (
          <h2 className={theme.progress}>
            {progress * 100}%
           &nbsp;
            <span>Complete</span>
          </h2>
        )}
      </header>
    )}

    <section className={theme.cardContent}>
      {progress && <LoadingBar className={theme.loadingBar} progress={progress} determinate />}
      {children}
    </section>
  </div>
)

Card.defaultProps = {
  title: '',
}

Card.propTypes = {
  title: string,
  icon: string,
  header: func,
  children: node.isRequired,
  actionCb: func,
  action: string,
  actionProps: object,
  progress: number,
}

export default Card
