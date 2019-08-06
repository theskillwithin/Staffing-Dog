import React from 'react'
import { object } from 'prop-types'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import moment from 'moment'

import theme from './theme.css'

export const getUsersQuerygql = gql`
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
      plan_tier
    }
  }
`

export const getUserLogsQuerygql = gql`
  query($id: ID!) {
    userLogs(user_id: $id) {
      details
      id
      insertedAt
      ipAddress
      userAgent
      userId
    }
  }
`
const UsersList = ({ getUsersQuery, client }) => {
  const getUserLogs = async id => {
    // const yay = getUserLogsQuery({
    //   variables: {
    //     id,
    //   },
    // })

    const {
      data: { userLogs },
    } = await client.query({
      query: getUserLogsQuerygql,
      variables: { id },
    })

    console.log({ id })
    console.log(userLogs)
    // .then(res => console.log(res))
    // .catch(err => console.log(err.message))
  }
  if (getUsersQuery.loading) return <div>Loading...</div>
  return (
    <div>
      <header className={theme.header}>
        <h1>Users</h1>
        <h3>length: {getUsersQuery.signups_by_date.length}</h3>
        <h4>(log button prints out user history to browser console)</h4>
      </header>
      <div className={theme.grid}>
        <div className={theme.user}>
          <div>email</div>
          <div>first</div>
          <div>last</div>
          <div>practice</div>
          <div>signup date</div>
          <div>type</div>
          <div>tier</div>
        </div>
        {getUsersQuery.signups_by_date.map(user => (
          <div key={user.user_id} className={theme.user}>
            <div>{user.email}</div>
            <div>{user.f_name}</div>
            <div>{user.l_name}</div>
            <div>{user.practice_name}</div>
            <div>{moment(user.signup_at).format('DD-MMM-YYYY')}</div>
            <div>{user.type}</div>
            <div>{user.plan_tier}</div>
            <button onClick={() => getUserLogs(user.user_id)} type="button">
              logs
            </button>
            <pre className={theme.id}>{user.user_id}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}

UsersList.propTypes = {
  getUsersQuery: object.isRequired,
  getUserLogsQuery: object.isRequired,
  client: object.isRequired,
}

export default compose(
  graphql(getUsersQuerygql, { name: 'getUsersQuery' }),
  graphql(getUserLogsQuerygql, { name: 'getUserLogsQuery' }),
)(UsersList)
