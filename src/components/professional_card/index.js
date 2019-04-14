import React from 'react'
import { string, number, shape, object } from 'prop-types'
import { Link } from 'react-router-dom'
import Card from '@sdog/components/card'
import Button from '@sdog/components/button'

import theme from './theme.css'

const ProfessionalCard = ({ applicant }) => (
  <Card type="large">
    <div className={theme.proCard}>
      <div className={theme.img}>
        <img src={applicant.img} alt={applicant.name} />
      </div>
      <div className={theme.content}>
        <Link to={`/professional/${applicant.id}`} className={theme.title}>
          {applicant.name}
        </Link>
        <div className={theme.location}>
          <span>
            {applicant.address.city}, {applicant.address.city}
          </span>
          <span>{applicant.miles} miles away</span>
        </div>
        <div className={theme.short}>{applicant.description}</div>
        <div className={theme.details}>
          <div className={theme.position}>{applicant.position}</div>
          <div className={theme.type}>{applicant.employment_type}</div>
        </div>
        <div className={theme.actions}>
          <div>{applicant.hourly_rate} /hr</div>
          <Link to={`/search/professional/${applicant.id}`} className={theme.readMore}>
            Read More
          </Link>
          <Link to={`/search/professional/${applicant.id}`}>
            <Button round>Quick Hire</Button>
          </Link>
        </div>
      </div>
    </div>
  </Card>
)

ProfessionalCard.propTypes = {
  applicant: shape({
    name: string.isRequired,
    address: object.isRequired,
    miles: number.isRequired,
    position: string.isRequired,
    employment_type: string.isRequired,
    hourly_rate: string.isRequired,
    description: string.isRequired,
    id: number.isRequired,
    img: string.isRequired,
  }).isRequired,
}

export default ProfessionalCard
