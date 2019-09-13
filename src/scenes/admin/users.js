import React from 'react'
import { object } from 'prop-types'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
// import { graphql, compose } from 'react-apollo'
import { LineChart } from 'react-chartkick'
import 'chart.js'
import compose from 'lodash/flowright'
import countBy from 'lodash/countBy'
import moment from 'moment'
import clsx from 'classnames'

import theme from './theme.css'

export const getUsersQuerygql = gql`
  {
    signups_by_date(
      date_start: "2016-05-24T00:00:00Z"
      date_end: "2020-10-01T23:59:59Z"
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
  const isReporting = type => type === 'sdog_reporting'
  const isSDEmail = email => email.includes('@staffing.dog')

  if (getUsersQuery.loading) return <div>Loading...</div>

  const signupsByDate = !getUsersQuery.loading && getUsersQuery.signups_by_date
  const signupsByDateSansTime = signupsByDate.map(item => ({
    ...item,
    signup_at: item.signup_at.split('T')[0],
  }))
  const count = countBy(signupsByDateSansTime, 'signup_at')

  return (
    <div>
      <header className={theme.header}>
        <h1>Users</h1>
        <h3>length: {signupsByDate.length}</h3>
        {/* <h4>(log button prints out user history to browser console)</h4> */}
      </header>
      <div>
        <h4 className={theme.signupsByDate}>signups by date</h4>
        <LineChart data={count} />
      </div>
      <div className={theme.legend}>
        <span>legend for table below:</span>
        <span className={theme.isReporting}>reporting type acccount</span>
        <span className={theme.isSDEmail}>email contains @staffing.dog</span>
      </div>
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
        {signupsByDate.map(user => (
          <div
            key={user.user_id}
            className={clsx(
              theme.user,
              isReporting(user.type) && theme.isReporting,
              isSDEmail(user.email) && theme.isSDEmail,
            )}
          >
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
