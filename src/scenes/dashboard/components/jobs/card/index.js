import React from 'react'
import { object } from 'prop-types'
import moment from 'moment'
import get from 'lodash/get'

import Avatar from '@sdog/components/Avatar'

import theme from './theme.css'

const JobCard = ({ data }) => {
  const image = get(data, 'criteria.practice_details.profile_image_url', false)
  const description = get(data, 'criteria.title', '')
  const practice = get(data, 'criteria.practice_details.name', '')
  const city = get(data, 'criteria.practice_details.address.city', '')
  const state = get(data, 'criteria.practice_details.address.state', '')
  return (
    <div className={theme.card}>
      <div className={theme.avatar}>
        <Avatar size={48} url={image} alt="Practice" color="grey" />
      </div>
      <div className={theme.details}>
        <div>
          <strong>{description}</strong>
        </div>
        <div>
          <span>{practice}</span>
          <span>
            {city}, {state}
          </span>
        </div>
        <div className={theme.date}>
          {moment(data.criteria.available_date).format('MMM DD YYYY')}
        </div>
      </div>
    </div>
  )
}

JobCard.propTypes = {
  data: object.isRequired,
}

export default JobCard
