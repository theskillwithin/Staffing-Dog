import React from 'react'
import { object } from 'prop-types'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'

import theme from './theme.css'

export const getUsersQuery = gql`
  {
    signups_by_date(
      date_start: "2016-05-24T00:00:00Z"
      date_end: "2019-10-01T23:59:59Z"
    ) {
      user_id
      email
      f_name
      l_name
      type
      practice_name
      signup_at
    }
  }
`
// eslint-disable-next-line
const UsersList = ({ getUsersQuery }) => {
  if (getUsersQuery.loading) return <div>Loading...</div>
  return (
    <div>
      <h1>Users - length: {getUsersQuery.signups_by_date.length}</h1>
      <div className={theme.grid}>
        <div className={theme.user}>
          <div>email</div>
          <div>first</div>
          <div>last</div>
          <div>practice</div>
          <div>signup date</div>
          <div>type</div>
        </div>
        {getUsersQuery.signups_by_date.map(user => (
          <div key={user.user_id} className={theme.user}>
            <div>{user.email}</div>
            <div>{user.f_name}</div>
            <div>{user.l_name}</div>
            <div>{user.practice_name}</div>
            <div>{moment(user.signup_at).format('MMMM/DD/YYYY')}</div>
            <div>{user.type}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

UsersList.propTypes = {
  getUsersQuery: object.isRequired,
}

export default compose(graphql(getUsersQuery, { name: 'getUsersQuery' }))(UsersList)
