import React from 'react'
import { string, number } from 'prop-types'
import { Link } from 'react-router-dom'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'

import theme from './theme.css'

const ProfessionalCard = ({
  id,
  name,
  city,
  state,
  distance,
  position,
  type,
  hourlyRate,
  description,
  img,
}) => (
  <Card type="large">
    <div className={theme.proCard}>
      <div className={theme.img}>
        <img src={img} alt={name} />
      </div>
      <div className={theme.content}>
        <Link to={`/professional/${id}`} className={theme.title}>
          {name}
        </Link>
        <div className={theme.location}>
          <span>
            {city}, {state}
          </span>
          <span>{distance} miles away</span>
        </div>
        <div className={theme.short}>{description}</div>
        <div className={theme.details}>
          <div className={theme.position}>{position}</div>
          <div className={theme.type}>{type}</div>
        </div>
        <div className={theme.actions}>
          <div>{hourlyRate} /hr</div>
          <Link to={`/search/professional/${id}`} className={theme.readMore}>
            Read More
          </Link>
          <Button round>Quick Hire</Button>
        </div>
      </div>
    </div>
  </Card>
)

ProfessionalCard.propTypes = {
  name: string.isRequired,
  city: string.isRequired,
  state: string.isRequired,
  distance: number.isRequired,
  position: string.isRequired,
  type: string.isRequired,
  hourlyRate: string.isRequired,
  description: string.isRequired,
  id: number.isRequired,
  img: string.isRequired,
}

export default ProfessionalCard
