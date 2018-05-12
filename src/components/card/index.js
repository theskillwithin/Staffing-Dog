import React from 'react'
import { node, string, func } from 'prop-types'

import Button from '../button'
import Icon from '../icon'

import theme from './theme.css'


const Card = ({ title, icon, children, header, actionCb, action }) => (
  <div className={theme.card}>
    {(title || header) && (
      <header className={theme.cardHeader}>
        {icon && !header && <div className={theme.icon}><Icon primary use={icon} /></div>}
        {title && !header && <h2 className={theme.title}>{title}</h2>}
        {header && !title && header({ style: theme })}
        {action && actionCb && <Button primary onClick={() => actionCb()}>{action}</Button>}
      </header>
    )}

    <section className={theme.cardContent}>
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
}

export default Card
