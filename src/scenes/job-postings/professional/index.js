import React from 'react'
import { string, shape, func, bool } from 'prop-types'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import get from '@sdog/utils/get'
import { defineJob } from '@sdog/definitions/jobs'
import ProfilePhotoSVG from '@sdog/components/svg/ProfilePhoto'
import Button from '@sdog/components/button'

import theme from './theme.css'

const ProfessionalCard = ({
  applicant,
  action,
  actionText,
  actionColor,
  shortCard,
  cn,
}) => (
  <div className={clsx(theme.proCard, shortCard && theme.shortCard, cn && cn)}>
    <div className={theme.img}>
      {!get(applicant, 'preferences.profile_image_url', false) ? (
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
      <div className={theme.top}>
        <div>
          <Link to={`/professional/${applicant.id}`} className={theme.title}>
            {get(applicant, 'user.first_name', 'FirstName')}{' '}
            {/*  {get(applicant, 'user.last_name', 'LastName')} */}
          </Link>

          <div className={theme.location}>
            <span>
              {get(applicant, 'addresses.city', 'City')},{' '}
              {get(applicant, 'addresses.state', 'State')}
            </span>
            {/* <span>0 miles</span> */}
          </div>
        </div>
        <div className={theme.details}>
          <div className={theme.position}>
            {defineJob('position', get(applicant, 'meta.summary.profession.type'))}
          </div>

          <div className={theme.type}>
            {defineJob('type', get(applicant, 'meta.summary.profession.specialty'))}
          </div>
        </div>
        <div className={theme.wage}>{get(applicant, 'meta.capacity.hourly_wage')}/hr</div>
      </div>
      {!shortCard && (
        <>
          <div className={theme.short}>{get(applicant, 'meta.summary.excerpt', '')}</div>

          <div className={theme.experience}>
            <div className={theme.experienceLabel}>Experience</div>

            <div className={theme.experienceValue}>
              {defineJob('type', get(applicant, 'experience'))}
            </div>
          </div>
        </>
      )}
      <div className={theme.action}>
        <Button
          onClick={() => action(applicant.id)}
          green={actionColor === 'green'}
          red={actionColor === 'red'}
          secondaryDark={actionColor === 'secondaryDark'}
          secondary={actionColor === 'secondary'}
        >
          {actionText}
        </Button>
      </div>
    </div>
  </div>
)

ProfessionalCard.defaultProps = {
  actionText: 'Quick Hire',
  actionColor: 'primary',
  shortCard: false,
  cn: null,
}

ProfessionalCard.propTypes = {
  applicant: shape({ id: string.isRequired }).isRequired,
  action: func,
  actionText: string,
  actionColor: string,
  shortCard: bool,
  cn: string,
}

export default ProfessionalCard
