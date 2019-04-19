import React from 'react'
import { string, shape } from 'prop-types'
import { Link } from 'react-router-dom'
import Card from '@sdog/components/card'
// import Button from '@sdog/components/button'
import get from '@sdog/utils/get'
import { defineJob } from '@sdog/definitions/jobs'
import ProfilePhotoSVG from '@sdog/components/svg/ProfilePhoto'

import theme from './theme.css'

const ProfessionalCard = ({ applicant }) => (
  <Card type="large">
    <div className={theme.proCard}>
      <div className={theme.img}>
        {!get(applicant, 'preferences.profile_image.url', false) ? (
          <ProfilePhotoSVG inline size={100} color="purple" />
        ) : (
          <img
            src={get(applicant, 'preferences.profile_image_url', '')}
            alt={`${get(applicant, 'user.first_name', 'FirstName')} ${get(
              applicant,
              'user.last_name',
              'LastName',
            )}`}
          />
        )}
      </div>

      <div className={theme.content}>
        <Link to={`/professional/${applicant.id}`} className={theme.title}>
          {get(applicant, 'user.first_name', 'FirstName')}{' '}
          {get(applicant, 'user.last_name', 'LastName')}
        </Link>

        <div className={theme.location}>
          <span>
            {get(applicant, 'addresses.city', 'City')},{' '}
            {get(applicant, 'addresses.state', 'State')}
          </span>
        </div>

        <div className={theme.short}>{get(applicant, 'meta.summary.excerpt', '')}</div>

        <div className={theme.details}>
          <div className={theme.position}>
            {defineJob('position', get(applicant, 'meta.summary.profession.type'))}
          </div>

          <div className={theme.type}>
            {defineJob('type', get(applicant, 'meta.summary.profession.specialty'))}
          </div>
        </div>

        <div className={theme.actions}>
          <div>{get(applicant, 'meta.capacity.hourly_wage')}/hr</div>

          {/* <Link
            to={`/search/professional/${get(applicant, 'id', '')}`}
            className={theme.readMore}
          >
            Read More
          </Link> */}

          {/* <Link to={`/search/professional/${get(applicant, 'id', '')}`}>
            <Button round>Quick Hire</Button>
          </Link> */}
        </div>
      </div>
    </div>
  </Card>
)

ProfessionalCard.propTypes = {
  applicant: shape({ id: string.isRequired }).isRequired,
}

export default ProfessionalCard
