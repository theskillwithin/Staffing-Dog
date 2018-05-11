import React from 'react'
import { node, string, func } from 'prop-types'

import Icon from '../icon'

import theme from './theme.css'


const Card = ({ title, icon, children, header }) => (
  <div className={theme.card}>
    {(title || header) && (
      <header className={theme.cardHeader}>
        {icon && !header && <div className={theme.icon}><Icon use={icon} /></div>}
        {title && !header && <h2 className={theme.title}>{title}</h2>}
        {header && !title && header({ style: theme })}
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
}

export default Card
